import type { Metadata } from "next";
import { absoluteUrl, canonicalUrl as toCanonicalUrl, site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  canonicalUrl?: string;
  type?: "website" | "article";
  languages?: Record<string, string>;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path = "/",
  image = site.socialImage,
  canonicalUrl,
  type = "website",
  languages,
  noIndex = false
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const canonical = toCanonicalUrl(canonicalUrl || url);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical,
      languages
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${site.name} — ${title}` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: `${site.name} — ${title}` }]
    }
  };
}
