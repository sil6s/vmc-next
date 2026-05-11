import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import {
  getStaticRelatedServices,
  getStaticServiceDetail,
  serviceHubServices,
  type ServiceAuthor,
  type ServiceCard,
  type ServiceCategory,
  type ServiceDetail,
  type ServiceFaq,
  type ServiceIncludedCare,
  type ServiceReason,
  type ServiceStep
} from "@/data/serviceHub";
import { client } from "./client";
import {
  FEATURED_SERVICES_QUERY,
  SERVICE_QUERY,
  SERVICE_SLUGS_QUERY,
  SERVICES_BY_CATEGORY_QUERY,
  SERVICES_QUERY
} from "./queries";
import { sanityEnabled } from "./env";

type SanityCta = {
  label?: string;
  href?: string;
};

type SanityServiceCard = {
  _id?: string;
  title: string;
  slug: string;
  serviceCategory?: ServiceCategory;
  shortDescription?: string;
  bestFor?: string[];
  featured?: boolean;
  cardIcon?: string;
  cta?: string;
};

type SanityServiceDetail = SanityServiceCard & {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: SanityImageSource;
  heroImageAlt?: string;
  primaryCTA?: SanityCta;
  secondaryCTA?: SanityCta;
  overview?: PortableTextBlock[];
  symptomsOrReasons?: ServiceReason[];
  whatToExpect?: ServiceStep[];
  includedCare?: ServiceIncludedCare[];
  whenToSchedule?: PortableTextBlock[];
  relatedServices?: SanityServiceCard[];
  faqs?: ServiceFaq[];
  author?: ServiceAuthor;
  reviewedBy?: ServiceAuthor;
  publishedAt?: string;
  updatedAt?: string;
  cardImage?: SanityImageSource;
  cardImageAlt?: string;
  locationRelevance?: string[];
};

const options = { next: { revalidate: 30 } };

function normalizeCta(cta?: SanityCta) {
  return cta?.label && cta.href ? { label: cta.label, href: cta.href } : undefined;
}

function normalizeCard(service: SanityServiceCard): ServiceCard {
  return {
    id: service.slug,
    title: service.title,
    slug: service.slug,
    serviceCategory: service.serviceCategory || "preventiveCare",
    shortDescription: service.shortDescription || "Veterinary care for dogs and cats in Northern Kentucky.",
    bestFor: service.bestFor?.length ? service.bestFor : ["Dogs and cats", "Northern Kentucky pets"],
    cta: service.cta || `Learn about ${service.title.toLowerCase()}`,
    cardIcon: service.cardIcon || "stethoscope",
    featured: service.featured
  };
}

function normalizeDetail(service: SanityServiceDetail): ServiceDetail {
  const card = normalizeCard(service);
  const fallback = getStaticServiceDetail(service.slug);
  const relatedSlugs = service.relatedServices?.map((related) => related.slug).filter(Boolean) || fallback?.relatedServiceSlugs || [];

  return {
    ...card,
    metaTitle: service.metaTitle || fallback?.metaTitle,
    metaDescription: service.metaDescription || fallback?.metaDescription || card.shortDescription,
    focusKeyword: service.focusKeyword || fallback?.focusKeyword,
    heroEyebrow: service.heroEyebrow || fallback?.heroEyebrow || "Veterinary Services in Northern Kentucky",
    heroTitle: service.heroTitle || service.title,
    heroDescription: service.heroDescription || card.shortDescription,
    heroImage: fallback?.heroImage,
    heroImageSource: service.heroImage,
    heroImageAlt: service.heroImageAlt || fallback?.heroImageAlt || `${service.title} at Veterinary Medical Center in Northern Kentucky`,
    primaryCTA: normalizeCta(service.primaryCTA) || fallback?.primaryCTA,
    secondaryCTA: normalizeCta(service.secondaryCTA) || fallback?.secondaryCTA,
    overview: service.overview,
    overviewText: fallback?.overviewText || [],
    symptomsOrReasons: service.symptomsOrReasons?.length ? service.symptomsOrReasons : fallback?.symptomsOrReasons || [],
    whatToExpect: service.whatToExpect?.length ? service.whatToExpect : fallback?.whatToExpect || [],
    includedCare: service.includedCare?.length ? service.includedCare : fallback?.includedCare || [],
    whenToSchedule: service.whenToSchedule,
    whenToScheduleText: fallback?.whenToScheduleText || [],
    relatedServiceSlugs: relatedSlugs,
    relatedServices: service.relatedServices?.map(normalizeCard),
    faqs: service.faqs?.length ? service.faqs : fallback?.faqs || [],
    author: service.author || fallback?.author,
    reviewedBy: service.reviewedBy || fallback?.reviewedBy,
    publishedAt: service.publishedAt || fallback?.publishedAt,
    updatedAt: service.updatedAt || fallback?.updatedAt,
    locationRelevance: service.locationRelevance?.length ? service.locationRelevance : fallback?.locationRelevance || ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: fallback?.appointmentType || "Veterinary appointment"
  };
}

async function fetchSanityServiceCards(query: string, params: Record<string, unknown> = {}) {
  if (!sanityEnabled) return [];

  try {
    const services = await client.fetch<SanityServiceCard[]>(query, params, options);
    return services.map(normalizeCard);
  } catch {
    return [];
  }
}

export async function getServiceHubCards() {
  const sanityServices = await fetchSanityServiceCards(SERVICES_QUERY);
  return sanityServices.length ? sanityServices : serviceHubServices.map((service) => normalizeCard(service));
}

export async function getFeaturedServiceCards(limit = 6) {
  const sanityServices = await fetchSanityServiceCards(FEATURED_SERVICES_QUERY, { limit });
  const fallback = serviceHubServices.filter((service) => service.featured).slice(0, limit).map((service) => normalizeCard(service));
  return sanityServices.length ? sanityServices : fallback;
}

export async function getServiceCardsByCategory(category: ServiceCategory) {
  const sanityServices = await fetchSanityServiceCards(SERVICES_BY_CATEGORY_QUERY, { category });
  const fallback = serviceHubServices.filter((service) => service.serviceCategory === category).map((service) => normalizeCard(service));
  return sanityServices.length ? sanityServices : fallback;
}

export async function getServiceDetail(slug: string) {
  if (sanityEnabled) {
    try {
      const service = await client.fetch<SanityServiceDetail | null>(SERVICE_QUERY, { slug }, options);
      if (service) return normalizeDetail(service);
    } catch {
      // Static fallbacks keep Vercel builds working before Sanity content is published.
    }
  }

  return getStaticServiceDetail(slug);
}

export async function getServiceDetailSlugs() {
  if (sanityEnabled) {
    try {
      const slugs = await client.fetch<{ slug: string }[]>(SERVICE_SLUGS_QUERY, {}, options);
      if (slugs.length) return slugs.map((item) => item.slug);
    } catch {
      // Static fallback below.
    }
  }

  return serviceHubServices.map((service) => service.slug);
}

export async function getRelatedServiceCards(service: ServiceDetail) {
  if (service.relatedServices?.length) return service.relatedServices.slice(0, 4);

  if (service.relatedServiceSlugs.length) {
    return getStaticRelatedServices(service.relatedServiceSlugs).map((related) => normalizeCard(related));
  }

  const allServices = await getServiceHubCards();
  return allServices
    .filter((candidate) => candidate.slug !== service.slug && candidate.serviceCategory === service.serviceCategory)
    .slice(0, 4);
}
