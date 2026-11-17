import type { Metadata } from "next";
import { absoluteUrl, canonicalUrl as toCanonicalUrl, site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  canonicalUrl?: string;
  type?: "website" | "article" | "profile";
  languages?: Record<string, string>;
  noIndex?: boolean;
};

/**
 * Page titles should lead with the page topic, not repeat the abbreviated brand
 * after every result. The full practice name is already supplied through the
 * site name, structured data, and the visible page identity.
 */
export function cleanSeoTitle(title: string) {
  return title.replace(/\s*\|\s*VMC(?:\s+(?:Fort Thomas|Northern Kentucky))?\s*$/iu, "").trim();
}

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
  const cleanTitle = cleanSeoTitle(title);

  return {
    title: cleanTitle,
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
      title: cleanTitle,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${site.name} — ${cleanTitle}` }]
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description,
      images: [{ url: imageUrl, alt: `${site.name} — ${cleanTitle}` }]
    }
  };
}
