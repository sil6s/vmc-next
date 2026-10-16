import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenText, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { guides } from "@/data/guides";
import { absoluteUrl } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

const seo = {
  title: "Pet Owner Guides: Choosing a Vet in Cincinnati & NKY | VMC",
  description:
    "Guides for Cincinnati and Northern Kentucky pet owners: comparing local vets, cat-friendly clinics, independent vs. corporate practices, and booking fast."
};

export const metadata: Metadata = pageMetadata({ ...seo, path: "/guides/" });

export default function GuidesIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides/" }]} />
      <section className="section section-cream team-page-intro">
        <Container>
          <p className="eyebrow">Pet owner guides</p>
          <h1>Choosing a vet in Cincinnati &amp; Northern Kentucky, <em>made simple.</em></h1>
          <p>Practical, fact-checked guides from Veterinary Medical Centers to help you compare local veterinarians, book faster, and find the right fit for your dog or cat.</p>
        </Container>
      </section>
      <Section tone="white" eyebrow="All guides" title={<>Start with <em>the question you have.</em></>}>
        <div className="guide-index">
          {guides.map((guide) => (
            <Link className="guide-index-card" href={`/guides/${guide.slug}/`} key={guide.slug}>
              <BookOpenText aria-hidden="true" size={22} />
              <h2>{guide.h1} <em>{guide.emphasis}</em></h2>
              <p>{guide.summary}</p>
              <span><Clock aria-hidden="true" size={13} /> {guide.readMinutes} min read · Read the guide →</span>
            </Link>
          ))}
        </div>
      </Section>
      <FinalInvitation actions={<><Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link><Link className="btn btn-ghost" href="/locations/">Our Locations</Link></>} />
      <JsonLd
        data={[
          { ...webpageSchema("/guides/", seo.title, seo.description), "@type": "CollectionPage" },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Veterinary Medical Centers pet owner guides",
            itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/guides/${guide.slug}/`), name: `${guide.h1} ${guide.emphasis}` }))
          }
        ]}
      />
    </>
  );
}
