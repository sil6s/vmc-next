import type { StaffSettings } from "@/lib/settings/types";
import { client } from "./client";
import { sanityEnabled } from "./env";

export type PersonProfileType = "doctor" | "team";

export type PersonProfile = {
  _id: string;
  name: string;
  slug: string;
  profileType: PersonProfileType;
  role: string;
  credentials?: string;
  image?: unknown;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  bio?: string;
  briefDescription?: string;
  education?: string;
  specialties?: string[];
  carePhilosophy?: string;
  professionalInterests?: string;
  locationsServed?: string[];
  yearsExperience?: string;
  displayOnHomepage?: boolean;
  displayOnAboutPage?: boolean;
  visible?: boolean;
  sortOrder?: number;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  ctaLabel?: string;
  ctaLink?: string;
  updatedAt?: string;
};

export type PublicPersonProfile = PersonProfile & {
  resolvedImageUrl?: string;
  resolvedImageAlt?: string;
};

const options = { next: { revalidate: 30 } };

const PERSON_PROFILE_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  profileType,
  role,
  credentials,
  image,
  "resolvedImageUrl": image.asset->url,
  "imageCaption": image.caption,
  imageUrl,
  "imageAlt": coalesce(image.alt, imageAlt),
  bio,
  briefDescription,
  education,
  specialties,
  carePhilosophy,
  professionalInterests,
  locationsServed,
  yearsExperience,
  displayOnHomepage,
  displayOnAboutPage,
  visible,
  sortOrder,
  featured,
  seoTitle,
  seoDescription,
  ctaLabel,
  ctaLink,
  "updatedAt": _updatedAt
`;

export const PERSON_PROFILES_QUERY = `*[_type == "personProfile"]|order(profileType asc, sortOrder asc, name asc){${PERSON_PROFILE_FIELDS}}`;

export const HOMEPAGE_PERSON_PROFILES_QUERY = `*[
  _type == "personProfile"
  && visible == true
  && displayOnHomepage == true
]|order(profileType asc, sortOrder asc, name asc){${PERSON_PROFILE_FIELDS}}`;

export const ABOUT_PERSON_PROFILES_QUERY = `*[
  _type == "personProfile"
  && visible == true
  && displayOnAboutPage == true
]|order(profileType asc, sortOrder asc, name asc){${PERSON_PROFILE_FIELDS}}`;

export function profileSlugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/^dr\.?\s+/i, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function normalizeProfileName(name: string) {
  return name.toLowerCase().replace(/^dr\.?\s+/i, "").replace(/[^a-z0-9]+/g, " ").trim();
}

export function profileImageUrl(profile: PublicPersonProfile | PersonProfile) {
  return ("resolvedImageUrl" in profile && profile.resolvedImageUrl) || profile.imageUrl || "";
}

export function profileImageAlt(profile: PublicPersonProfile | PersonProfile) {
  return profile.imageAlt || `${profile.name}, ${profile.role} at Veterinary Medical Centers`;
}

export async function fetchPersonProfiles() {
  if (!sanityEnabled) return [];
  try {
    return await client.fetch<PersonProfile[]>(PERSON_PROFILES_QUERY, {}, options);
  } catch {
    return [];
  }
}

export async function fetchHomepagePersonProfiles() {
  if (!sanityEnabled) return [];
  try {
    return await client.fetch<PublicPersonProfile[]>(HOMEPAGE_PERSON_PROFILES_QUERY, {}, options);
  } catch {
    return [];
  }
}

export async function fetchAboutPersonProfiles() {
  if (!sanityEnabled) return [];
  try {
    return await client.fetch<PublicPersonProfile[]>(ABOUT_PERSON_PROFILES_QUERY, {}, options);
  } catch {
    return [];
  }
}

export function legacyStaffToPersonProfiles(staff: StaffSettings): PersonProfile[] {
  const doctors = staff.doctors.map((doctor, index) => ({
    _id: `person-doctor-${profileSlugFromName(doctor.name) || doctor.id}`,
    name: doctor.name.replace(/^Dr\.\s+/i, ""),
    slug: profileSlugFromName(doctor.name) || doctor.id,
    profileType: "doctor" as const,
    role: doctor.role,
    credentials: doctor.education.some((item) => /doctor|dvm/i.test(item)) ? "DVM" : undefined,
    imageUrl: doctor.imageUrl,
    imageAlt: doctor.imageAlt,
    bio: doctor.bio,
    briefDescription: doctor.bio,
    education: doctor.education.join("\n"),
    visible: doctor.isVisible,
    displayOnHomepage: true,
    displayOnAboutPage: true,
    sortOrder: index + 1,
    featured: index === 0
  }));

  const team = staff.staffMembers.map((member, index) => ({
    _id: `person-team-${profileSlugFromName(member.name) || member.id}`,
    name: member.name,
    slug: profileSlugFromName(member.name) || member.id,
    profileType: "team" as const,
    role: member.role,
    imageUrl: member.imageUrl,
    imageAlt: member.imageAlt,
    bio: member.bio,
    briefDescription: member.bio,
    visible: member.isVisible,
    displayOnHomepage: true,
    displayOnAboutPage: true,
    sortOrder: index + 1
  }));

  return [...doctors, ...team];
}
