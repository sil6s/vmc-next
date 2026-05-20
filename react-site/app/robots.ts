import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login/", "/not-authorized/", "/studio/"]
      }
    ],
    sitemap: `${site.siteUrl}/sitemap.xml`
  };
}
