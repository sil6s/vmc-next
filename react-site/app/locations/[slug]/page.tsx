import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { getLocation, locations } from "@/data/locations";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return pageMetadata({ ...location.seo, path: `/locations/${location.slug}/`, image: location.image });
}

export default async function LocationPage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: location.title, path: `/locations/${location.slug}/` }
  ];

  return (
    <>
      <Hero
        eyebrow="Our Locations"
        title={location.title}
        body={location.intro}
        image={location.image}
        imageAlt={location.imageAlt}
        badgeTitle={location.phone}
        badgeSub={location.address}
        primaryCta={{ label: "Call This Location", href: `tel:${location.tel}` }}
        secondaryCta={{ label: "Book Appointment", href: "/contact/" }}
      />
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />
      <div className="prose-page">
        <Container>
          <article>
            <p className="eyebrow">{location.keyword}</p>
            <h1>{location.title}</h1>
            {location.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>Nearby communities we serve</h2>
            <ul>
              {location.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <h2>Why families choose this location</h2>
            <ul>
              {location.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        </Container>
      </div>
      <FAQSection faqs={location.faqs} title={`Questions about ${location.title}.`} />
      <CTASection title={`Ready to visit VMC ${location.slug === "fort-thomas" ? "Fort Thomas" : "Independence"}?`} />
      <JsonLd data={[webpageSchema(`/locations/${location.slug}/`, location.seo.title, location.seo.description), breadcrumbSchema(crumbs), faqSchema(location.faqs)]} />
    </>
  );
}
