import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { getCityPageSlugs } from "@/data/cityPages";
import { site } from "@/data/site";
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

  const cityRoutes = getCityPageSlugs().map((slug) => `/locations/${slug}/`);
  const locationRoutes = locations.map((location) => `/locations/${location.slug}/`);
  const serviceRoutes = serviceSlugs.map((slug) => `/services/${slug}/`);
  const resourceRoutes = posts.map((post) => `/resources/${post.slug}/`);

  const allRoutes = [
    ...sitemapStaticRoutes,
    ...locationRoutes,
    ...cityRoutes,
    ...serviceRoutes,
    ...resourceRoutes
  ];

  return allRoutes.map((route) => ({
    url: new URL(route, site.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : route.startsWith("/resources/") ? "monthly" : "monthly",
    priority: priority(route)
  }));
}
