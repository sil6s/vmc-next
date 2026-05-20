import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { parseResourcePacket, validateResourcePacket, type ResourcePacket } from "@/lib/resource-packet-parser";
import { sanityConfig } from "@/sanity/env";

type Mutation = {
  createOrReplace?: Record<string, unknown>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function compact<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== "")) as T;
}

function markdownLinks(value: string) {
  const links: Array<{ _key: string; label: string; href: string; source?: string }> = [];
  const matcher = /\[([^\]]+)]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = matcher.exec(value))) {
    const [, label, href] = match;
    if (!label || !href) continue;
    index += 1;
    links.push({
      _key: `link-${index}-${slugify(label).slice(0, 24) || "item"}`,
      label: label.trim(),
      href: href.trim(),
      source: href.startsWith("http") ? new URL(href).hostname.replace(/^www\./, "") : undefined
    });
  }

  return links;
}

async function findAuthorById(id: string) {
  const token = sanityConfig.writeToken || sanityConfig.token;
  if (!token) return null;

  const query = encodeURIComponent('*[_type == "author" && _id == $id][0]{_id, name}');
  const params = encodeURIComponent(JSON.stringify(id));
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${query}&%24id=${params}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  if (!response.ok) return null;
  const data = (await response.json().catch(() => null)) as { result?: { _id: string; name?: string } } | null;
  return data?.result || null;
}

function postDoc(packet: ResourcePacket, authorId: string) {
  const externalLinks = markdownLinks(packet.sourcesMarkdown).filter((link) => link.href.startsWith("http"));
  const internalLinks = markdownLinks(packet.suggestedInternalLinksMarkdown).filter((link) => link.href.startsWith("/"));
  const featuredImageAltText = packet.featuredImageAlt || packet.ogImageAlt;
  const ogImageAlt = packet.ogImageAlt || packet.featuredImageAlt;

  return compact({
    _id: `post-${packet.slug}`,
    _type: "post",
    title: packet.title,
    resourceType: packet.resourceType,
    contentMode: "advanced",
    slug: { _type: "slug", current: packet.slug },
    excerpt: packet.excerpt,
    author: { _type: "reference", _ref: authorId },
    category: packet.category,
    tags: packet.tags,
    secondaryKeywords: packet.secondaryKeywords,
    readingTime: packet.readingTime,
    featuredImagePrompt: packet.featuredImagePrompt,
    featuredImageAltText,
    featuredImageCaptionText: packet.featuredImageCaption,
    bodyMarkdown: packet.bodyMarkdown,
    faqMarkdown: packet.faqMarkdown,
    sourcesMarkdown: packet.sourcesMarkdown,
    internalLinks,
    externalLinks,
    seoTitle: packet.seoTitle,
    seoDescription: packet.seoDescription,
    focusKeyword: packet.focusKeyword,
    ogImageAlt,
    canonicalUrl: packet.canonicalUrl || undefined,
    publishedAt: new Date().toISOString()
  });
}

async function mutateSanity(mutations: Mutation[]) {
  const token = sanityConfig.writeToken;
  if (!token) {
    return {
      ok: false,
      status: 500,
      data: { error: "Missing SANITY_API_WRITE_TOKEN. Add a Sanity token with write access before importing packets." }
    };
  }

  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/mutate/${sanityConfig.dataset}?returnDocuments=true`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mutations })
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export async function POST(request: Request) {
  await requireAdminSession("/dashboard/resources/");

  const payload = (await request.json().catch(() => null)) as { markdown?: string; authorId?: string } | null;
  const markdown = payload?.markdown || "";
  const authorId = payload?.authorId?.trim() || "";
  const packet = parseResourcePacket(markdown);
  const missing = validateResourcePacket(packet);

  if (missing.length) {
    return NextResponse.json({ error: `Missing required packet fields: ${missing.join(", ")}`, missing }, { status: 400 });
  }

  if (!authorId) {
    return NextResponse.json({ error: "Choose an existing Sanity author before importing this resource packet." }, { status: 400 });
  }

  const author = await findAuthorById(authorId);
  if (!author) {
    return NextResponse.json({ error: "Selected author was not found in Sanity. Refresh the dashboard and choose an existing author." }, { status: 400 });
  }

  const mutations: Mutation[] = [{ createOrReplace: postDoc(packet, author._id) }];

  const result = await mutateSanity(mutations);
  if (!result.ok) {
    return NextResponse.json(result.data, { status: result.status });
  }

  return NextResponse.json({
    postId: `post-${packet.slug}`,
    slug: packet.slug,
    title: packet.title,
    studioUrl: `/studio/structure/post;post-${packet.slug}`,
    publicUrl: `/resources/${packet.slug}/`,
    sanity: result.data
  });
}
