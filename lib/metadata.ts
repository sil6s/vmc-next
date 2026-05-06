import type { Metadata } from 'next';
import { absoluteUrl, site, type Seo } from './content';

export function buildMetadata(seo: Seo, path = '/'): Metadata {
  const canonical = seo.canonical ?? absoluteUrl(path);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: site.name,
      type: 'website',
      images: [seo.ogImage ?? absoluteUrl('/uploads/hero-placeholder.jpg')],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage ?? absoluteUrl('/uploads/hero-placeholder.jpg')],
    },
  };
}
