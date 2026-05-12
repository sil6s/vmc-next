import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { serviceHubServices } from "@/data/serviceHub";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { type BlogPost, getBlogPosts } from "@/sanity/posts";
import { getServiceDetailSlugs } from "@/sanity/services";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const HIGH_PRIORITY_STATIC: { url: string; priority: number; changeFrequency: ChangeFreq }[] = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/about/", priority: 0.8, changeFrequency: "monthly" },
  { url: "/contact/", priority: 0.85, changeFrequency: "monthly" },
  { url: "/services/", priority: 0.85, changeFrequency: "monthly" },
  { url: "/locations/", priority: 0.85, changeFrequency: "monthly" },
  { url: "/blog/", priority: 0.75, changeFrequency: "weekly" },
  { url: "/new-patients/", priority: 0.8, changeFrequency: "monthly" },
  { url: "/new-patient-registration-form/", priority: 0.7, changeFrequency: "monthly" },
  { url: "/patient-portal-online-booking/", priority: 0.65, changeFrequency: "monthly" },
  { url: "/online-vet-pharmacy-northern-kentucky-cincinnati/", priority: 0.65, changeFrequency: "monthly" },
  { url: "/vet-near-me/", priority: 0.75, changeFrequency: "monthly" },
  { url: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts(50);
  const sanitySlugs = await getServiceDetailSlugs();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = HIGH_PRIORITY_STATIC.map(({ url, priority, changeFrequency }) => ({
    url: new URL(url, site.siteUrl).toString(),
    lastModified: now,
    changeFrequency,
    priority
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((location) => ({
    url: new URL(`/locations/${location.slug}/`, site.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.9
  }));

  const serviceHubSlugs = serviceHubServices.map((s) => s.slug);
  const allServiceSlugs = Array.from(new Set([...serviceHubSlugs, ...sanitySlugs]));
  const serviceHubEntries: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: new URL(`/veterinary-services/${slug}/`, site.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8
  }));

  const legacyServiceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: new URL(`/services/${service.slug}/`, site.siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.6
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post: BlogPost) => ({
    url: new URL(`/blog/${post.slug}/`, site.siteUrl).toString(),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7
  }));

  return [
    ...staticEntries,
    ...locationEntries,
    ...serviceHubEntries,
    ...legacyServiceEntries,
    ...blogEntries
  ];
}
