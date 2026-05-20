import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { getDashboardSettings } from "@/lib/settings/settings";
import { legacyStaffToPersonProfiles, normalizeProfileName, profileSlugFromName, type PersonProfile } from "@/sanity/personProfiles";
import { sanityConfig } from "@/sanity/env";

type Mutation = {
  createIfNotExists?: Record<string, unknown>;
  createOrReplace?: Record<string, unknown>;
  patch?: { id: string; set?: Record<string, unknown>; unset?: string[] };
  delete?: { id: string };
};

function compact<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== "")) as T;
}

function profileDoc(input: Partial<PersonProfile> & { name: string; profileType: "doctor" | "team"; role: string }) {
  const slug = input.slug || profileSlugFromName(input.name);
  return compact({
    _id: input._id || `person-${input.profileType}-${slug}`,
    _type: "personProfile",
    name: input.name,
    slug: { _type: "slug", current: slug },
    profileType: input.profileType,
    role: input.role,
    credentials: input.credentials,
    image: input.image,
    imageUrl: input.imageUrl,
    imageAlt: input.imageAlt,
    bio: input.bio,
    briefDescription: input.briefDescription,
    education: input.education,
    specialties: input.specialties || [],
    carePhilosophy: input.carePhilosophy,
    professionalInterests: input.professionalInterests,
    locationsServed: input.locationsServed || [],
    yearsExperience: input.yearsExperience,
    displayOnHomepage: input.displayOnHomepage ?? true,
    displayOnAboutPage: input.displayOnAboutPage ?? true,
    visible: input.visible ?? true,
    sortOrder: input.sortOrder ?? 100,
    featured: input.featured ?? false,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    ctaLabel: input.ctaLabel,
    ctaLink: input.ctaLink
  });
}

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  const token = sanityConfig.writeToken || sanityConfig.token;
  if (!token) throw new Error("Missing Sanity token.");
  const search = new URLSearchParams({ query });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const response = await fetch(`https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?${search}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error?.description || "Sanity query failed.");
  return data.result as T;
}

async function mutateSanity(mutations: Mutation[]) {
  const token = sanityConfig.writeToken;
  if (!token) {
    return { ok: false, status: 500, data: { error: "Missing SANITY_API_WRITE_TOKEN. Add a Sanity token with write access." } };
  }
  const response = await fetch(`https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/mutate/${sanityConfig.dataset}?returnDocuments=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations })
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

async function existingProfileId(name: string, profileType: "doctor" | "team") {
  const normalized = normalizeProfileName(name);
  return sanityFetch<string | null>(
    `*[_type == "personProfile" && profileType == $profileType && lower(name) match $match][0]._id`,
    { profileType, match: `*${normalized.replace(/\s+/g, "*")}*` }
  ).catch(() => null);
}

export async function POST(request: Request) {
  await requireAdminSession("/dashboard/staff/");
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const token = sanityConfig.writeToken;
    if (!token) return NextResponse.json({ error: "Missing SANITY_API_WRITE_TOKEN. Add a Sanity token with write access." }, { status: 500 });

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Image upload failed. Choose an image file." }, { status: 400 });
    }

    const response = await fetch(
      `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/assets/images/${sanityConfig.dataset}?filename=${encodeURIComponent(file.name)}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": file.type },
        body: file
      }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok) return NextResponse.json(data, { status: response.status });
    return NextResponse.json({
      assetId: data.document?._id,
      url: data.document?.url,
      image: data.document?._id ? { _type: "image", asset: { _type: "reference", _ref: data.document._id } } : undefined
    });
  }

  const payload = (await request.json().catch(() => null)) as { action?: string; profile?: PersonProfile; id?: string } | null;
  const action = payload?.action;

  if (action === "migrate") {
    const settings = await getDashboardSettings();
    const profiles = legacyStaffToPersonProfiles(settings.staff);
    const mutations: Mutation[] = [];
    let skipped = 0;

    for (const profile of profiles) {
      const existingId = await existingProfileId(profile.name, profile.profileType);
      if (existingId) {
        skipped += 1;
        continue;
      }
      mutations.push({ createIfNotExists: profileDoc(profile) });
    }

    if (!mutations.length) {
      return NextResponse.json({ created: 0, skipped, failed: 0 });
    }

    const result = await mutateSanity(mutations);
    if (!result.ok) return NextResponse.json(result.data, { status: result.status });
    return NextResponse.json({ created: mutations.length, skipped, failed: 0, sanity: result.data });
  }

  if (action === "archive" && payload?.id) {
    const result = await mutateSanity([{ patch: { id: payload.id, set: { visible: false } } }]);
    return NextResponse.json(result.data, { status: result.ok ? 200 : result.status });
  }

  if (action === "delete" && payload?.id) {
    const result = await mutateSanity([{ delete: { id: payload.id } }]);
    return NextResponse.json(result.data, { status: result.ok ? 200 : result.status });
  }

  if ((action === "create" || action === "update") && payload?.profile) {
    const profile = payload.profile;
    if (!profile.name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!profile.role?.trim()) return NextResponse.json({ error: "Role is required." }, { status: 400 });
    if (!profile.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(profile.slug)) {
      return NextResponse.json({ error: "Slug must use lowercase letters, numbers, and hyphens." }, { status: 400 });
    }

    if (action === "create") {
      const existingId = await existingProfileId(profile.name, profile.profileType);
      if (existingId) return NextResponse.json({ error: "Duplicate profile name found." }, { status: 409 });
    }

    const result = await mutateSanity([{ createOrReplace: profileDoc(profile) }]);
    return NextResponse.json(result.data, { status: result.ok ? 200 : result.status });
  }

  return NextResponse.json({ error: "Unsupported person profile action." }, { status: 400 });
}
