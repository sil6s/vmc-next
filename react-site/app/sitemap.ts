import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { getCityPageSlugs } from "@/data/cityPages";
import { cityLandings } from "@/data/cityLandings";
import { site } from "@/data/site";
import { veterinarians } from "@/data/veterinarians";
import { guides } from "@/data/guides";
import { sitemapStaticRoutes } from "@/lib/routes";
import { getBlogPosts } from "@/sanity/posts";
import { getServiceDetailSlugs } from "@/sanity/services";

function priority(route: string): number {
  if (route === "/") return 1.0;
  if (["/about/", "/services/", "/locations/", "/contact/", "/new-patients/"].includes(route)) return 0.9;
  if (route.startsWith("/locations/vet-in-")) return 0.85;
  if (route.startsWith("/services/")) return 0.8;
  if (route.startsWith("/locations/vet-")) return 0.75;
  if (route.startsWith("/resources/")) return 0.65;
  return 0.7;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, serviceSlugs] = await Promise.all([getBlogPosts(500), getServiceDetailSlugs()]);

  const citySlugs = Array.from(new Set([...getCityPageSlugs(), ...cityLandings.map((page) => page.slug)]));
  const cityRoutes = citySlugs.map((slug) => `/locations/${slug}/`);
  const locationRoutes = locations.map((location) => `/locations/${location.slug}/`);
  const serviceRoutes = serviceSlugs.map((slug) => `/services/${slug}/`);
  const teamRoutes = veterinarians.map((vet) => `/team/${vet.slug}/`);
  const guideRoutes = ["/guides/", ...guides.map((guide) => `/guides/${guide.slug}/`)];
  const resourceRoutes = posts.map((post) => `/resources/${post.slug}/`);

  const allRoutes = [
    ...sitemapStaticRoutes,
    ...teamRoutes,
    ...guideRoutes,
    ...locationRoutes,
    ...cityRoutes,
    ...serviceRoutes,
    ...resourceRoutes
  ];

  const postLastModified = new Map(posts.map((post) => [`/resources/${post.slug}/`, post.updatedAt || post.date]));

  return allRoutes.map((route) => ({
    url: new URL(route, site.siteUrl).toString(),
    ...(postLastModified.get(route) ? { lastModified: new Date(postLastModified.get(route)!) } : {}),
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/resources/") ? "monthly" : "monthly",
    priority: priority(route)
  }));
}
