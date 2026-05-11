import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { staticRoutes } from "@/lib/routes";
import { getBlogPosts } from "@/sanity/posts";
import { getServiceDetailSlugs } from "@/sanity/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts(50);
  const serviceSlugs = await getServiceDetailSlugs();
  const routes = [
    ...staticRoutes,
    ...services.map((service) => `/services/${service.slug}/`),
    ...serviceSlugs.map((slug) => `/veterinary-services/${slug}/`),
    ...locations.map((location) => `/locations/${location.slug}/`),
    ...posts.map((post) => `/blog/${post.slug}/`)
  ];

  return routes.map((route) => ({
    url: new URL(route, site.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.75
  }));
}
