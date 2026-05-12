import type { FAQ } from "@/data/faqs";
import type { LocationPage } from "@/data/locations";
import type { ServiceDetail } from "@/data/serviceHub";
import { absoluteUrl, site } from "@/data/site";

const ORG_ID = `${site.siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": ORG_ID,
    name: site.name,
    url: site.siteUrl,
    email: site.email,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/vmc-social-media.jpg"),
      width: 1200,
      height: 630
    },
    image: absoluteUrl("/images/vmc-social-media.jpg"),
    description:
      "Veterinary Medical Center is a locally owned veterinary practice serving dogs and cats in Northern Kentucky with two convenient locations in Fort Thomas and Independence.",
    areaServed: [
      "Fort Thomas, KY",
      "Independence, KY",
      "Newport, KY",
      "Bellevue, KY",
      "Dayton, KY",
      "Highland Heights, KY",
      "Taylor Mill, KY",
      "Covington, KY",
      "Erlanger, KY",
      "Florence, KY",
      "Cold Spring, KY",
      "Alexandria, KY",
      "Northern Kentucky",
      "Greater Cincinnati"
    ],
    address: site.locations.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: "US"
    })),
    telephone: site.locations.map((location) => location.tel),
    sameAs: [
      site.locations[0].mapUrl,
      site.locations[1].mapUrl
    ]
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.siteUrl}/#website`,
    name: site.name,
    url: site.siteUrl,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.siteUrl}/blog/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function webpageSchema(path: string, name: string, description: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${path}#webpage`),
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@id": `${site.siteUrl}/#website` },
    about: { "@id": ORG_ID },
    ...(dateModified ? { dateModified } : {})
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${items[items.length - 1]?.path || "/"}#breadcrumb`),
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
        provider: { "@id": ORG_ID }
      }
    }))
  };
}

export function veterinaryServiceSchema(service: ServiceDetail, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name: service.title,
    description: service.metaDescription || service.shortDescription,
    serviceType: "Veterinary care",
    areaServed: service.locationRelevance.length
      ? service.locationRelevance
      : ["Northern Kentucky", "Fort Thomas KY", "Independence KY"],
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID }
  };
}

export function locationVeterinaryCareSchema(location: LocationPage, path: string) {
  const isFortThomas = location.shortName === "Fort Thomas";
  const officialName = isFortThomas
    ? "Veterinary Medical Center of Fort Thomas"
    : "Veterinary Medical Center of Independence";
  const siteLocation = isFortThomas
    ? { zip: "41075", mapUrl: "https://www.google.com/maps/search/?api=1&query=2000%20Memorial%20Parkway%20Fort%20Thomas%20KY%2041075" }
    : { zip: "41051", mapUrl: "https://www.google.com/maps/search/?api=1&query=4147%20Madison%20Pike%20Independence%20KY%2041051" };

  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": absoluteUrl(`${path}#location`),
    name: officialName,
    url: absoluteUrl(path),
    image: absoluteUrl(location.image),
    telephone: location.tel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.split(",")[0].trim(),
      addressLocality: location.address.split(",")[1]?.trim() ?? location.shortName,
      addressRegion: "KY",
      postalCode: siteLocation.zip,
      addressCountry: "US"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      }
    ],
    areaServed: location.communities,
    parentOrganization: { "@id": ORG_ID },
    sameAs: [siteLocation.mapUrl],
    priceRange: "$$"
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage?: string;
  author?: { name: string; title?: string };
}) {
  const postUrl = absoluteUrl(`/blog/${post.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${postUrl}#webpage`
    },
    image: post.featuredImage ? absoluteUrl(post.featuredImage) : absoluteUrl(site.socialImage),
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: post.author?.name || site.name
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/vmc-social-media.jpg")
      }
    },
    isPartOf: { "@id": `${site.siteUrl}/#website` }
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
