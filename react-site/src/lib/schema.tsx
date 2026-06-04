import type { FAQ } from "@/data/faqs";
import type { LocationPage } from "@/data/locations";
import type { ServiceDetail } from "@/data/serviceHub";
import { absoluteUrl, canonicalUrl, site } from "@/data/site";
import type { PublicSettings } from "@/lib/settings/public";

export function organizationSchema(settings?: PublicSettings) {
  const locations = settings?.publicLocations || site.locations;
  const sameAs = settings?.seo.sameAsSocialLinks?.length
    ? settings.seo.sameAsSocialLinks
    : site.sameAs;

  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${settings?.siteUrl || site.siteUrl}/#organization`,
    name: site.name,
    url: settings?.siteUrl || site.siteUrl,
    email: site.email,
    image: absoluteUrl(site.socialImage),
    priceRange: "$$",
    areaServed: [
      "Northern Kentucky",
      "Fort Thomas KY",
      "Independence KY",
      "Campbell County KY",
      "Kenton County KY",
      "Greater Cincinnati"
    ],
    ...(sameAs ? { sameAs } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      }
    ],
    address: locations.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: "US"
    })),
    telephone: locations.map((location) => location.tel)
  };
}

export function websiteSchema(siteUrl = site.siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`
    }
  };
}

export function webpageSchema(path: string, name: string, description: string) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: {
      "@id": `${site.siteUrl}/#website`
    }
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
      "@id": `${site.siteUrl}/#organization`,
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
      "@id": `${site.siteUrl}/#organization`,
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

export function locationVeterinaryCareSchema(location: LocationPage, path: string) {
  const officialName =
    location.shortName === "Fort Thomas"
      ? "Veterinary Medical Centers of Fort Thomas"
      : "Veterinary Medical Centers of Independence";

  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${absoluteUrl(path)}#location`,
    name: officialName,
    url: absoluteUrl(path),
    image: absoluteUrl(location.image),
    telephone: location.tel,
    parentOrganization: {
      "@id": `${site.siteUrl}/#organization`
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.split(",")[0],
      addressLocality: location.shortName,
      addressRegion: "KY",
      postalCode: location.shortName === "Fort Thomas" ? "41075" : "41051",
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
    hasMap: site.locations.find((siteLocation) => siteLocation.name === location.shortName)?.mapUrl
  };
}

export function cityPageVeterinaryCareSchema(opts: {
  locationName: string;
  address: string;
  tel: string;
  phone: string;
  path: string;
  city: string;
  state: string;
}) {
  const { locationName, address, tel, phone, path, city, state } = opts;
  const isIndependence = locationName === "Independence";
  const officialName = isIndependence
    ? "Veterinary Medical Centers of Independence"
    : "Veterinary Medical Centers of Fort Thomas";
  const zip = isIndependence ? "41051" : "41075";
  const streetAddress = address.split(",")[0];

  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${absoluteUrl(path)}#location`,
    name: officialName,
    url: absoluteUrl(path),
    telephone: tel,
    parentOrganization: {
      "@id": `${site.siteUrl}/#organization`
    },
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: locationName,
      addressRegion: "KY",
      postalCode: zip,
      addressCountry: "US"
    },
    areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "State", name: state } },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      }
    ]
  };
}

export function personSchema(person: {
  name: string;
  jobTitle: string;
  path: string;
  image?: string;
  credentials?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${absoluteUrl(person.path)}#${person.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
    name: person.name,
    jobTitle: person.jobTitle,
    image: person.image,
    description: person.description,
    honorificSuffix: person.credentials,
    worksFor: {
      "@id": `${site.siteUrl}/#organization`
    }
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  date: string;
  updatedAt?: string;
  excerpt: string;
  featuredImage?: string;
  schemaImage?: string;
  canonicalUrl?: string;
  author?: { name?: string };
  category?: string;
  tags?: string[];
}) {
  const articleUrl = canonicalUrl(post.canonicalUrl || `/resources/${post.slug}/`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    description: post.excerpt,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    image: post.schemaImage || (post.featuredImage ? absoluteUrl(post.featuredImage) : undefined),
    articleSection: post.category,
    keywords: post.tags?.join(", "),
    author: {
      "@type": post.author?.name ? "Person" : "Organization",
      name: post.author?.name || site.name
    },
    publisher: {
      "@type": "Organization",
      "@id": `${site.siteUrl}/#organization`,
      name: site.name,
      url: site.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.png")
      }
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
