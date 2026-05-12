import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path = "/", image = site.socialImage, noIndex = false }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: site.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} | Veterinary Medical Center` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}
