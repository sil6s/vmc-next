import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
};

export function pageMetadata({ title, description, path = "/", image = site.socialImage, canonicalUrl, type = "website" }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const canonical = canonicalUrl || url;
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: site.name }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}
