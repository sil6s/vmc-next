import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { sitemapStaticRoutes } from "@/lib/routes";
import { getBlogPosts } from "@/sanity/posts";
import { getServiceDetailSlugs } from "@/sanity/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts(200);
  const serviceSlugs = await getServiceDetailSlugs();
  const routes = [
    ...sitemapStaticRoutes,
    ...serviceSlugs.map((slug) => `/veterinary-services/${slug}/`),
    ...locations.map((location) => `/locations/${location.slug}/`),
    ...posts.map((post) => `/resources/${post.slug}/`)
  ];

  return routes.map((route) => ({
    url: new URL(route, site.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.75
  }));
}
