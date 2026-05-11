import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function pageMetadata({ title, description, path = "/", image = site.socialImage }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
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
