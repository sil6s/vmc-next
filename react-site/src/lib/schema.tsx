import type { FAQ } from "@/data/faqs";
import type { ServiceDetail } from "@/data/serviceHub";
import { absoluteUrl, site } from "@/data/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: site.name,
    url: site.siteUrl,
    email: site.email,
    areaServed: ["Northern Kentucky", "Fort Thomas KY", "Independence KY", "Greater Cincinnati"],
    address: site.locations.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: "US"
    })),
    telephone: site.locations.map((location) => location.tel)
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.siteUrl
  };
}

export function webpageSchema(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path)
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function serviceListSchema(items: { name: string; description: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        serviceType: "Veterinary care",
        areaServed: ["Northern Kentucky", "Fort Thomas KY", "Independence KY", "Greater Cincinnati"],
        url: absoluteUrl(item.path || "/services/"),
        provider: {
          "@type": "VeterinaryCare",
          name: site.name,
          url: site.siteUrl
        }
      }
    }))
  };
}

export function veterinaryServiceSchema(service: ServiceDetail, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription || service.shortDescription,
    serviceType: "Veterinary care",
    areaServed: service.locationRelevance.length ? service.locationRelevance : ["Northern Kentucky", "Fort Thomas KY", "Independence KY"],
    url: absoluteUrl(path),
    provider: {
      "@type": "VeterinaryCare",
      name: site.name,
      url: site.siteUrl,
      telephone: site.locations.map((location) => location.tel),
      address: site.locations.map((location) => ({
        "@type": "PostalAddress",
        streetAddress: location.street,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.zip,
        addressCountry: "US"
      }))
    }
  };
}

export function articleSchema(post: { title: string; slug: string; date: string; excerpt: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}/`),
    author: {
      "@type": "Organization",
      name: site.name
    },
    publisher: {
      "@type": "Organization",
      name: site.name
    }
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
