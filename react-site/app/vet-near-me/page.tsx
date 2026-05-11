import Link from "next/link";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { LocationCards } from "@/components/sections/LocationCards";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.nearMe.seo, path: "/vet-near-me/" });

export default function VetNearMePage() {
  return (
    <>
      <Hero
        eyebrow="Vet Near Me in Northern Kentucky"
        title="Looking for a vet near you in Northern Kentucky?"
        body="Veterinary Medical Center is a locally owned veterinary practice with convenient offices in Fort Thomas and Independence, KY. We care for dogs and cats from Northern Kentucky, nearby Greater Cincinnati, and communities just across the river."
        image="/images/vmc-social-media.jpg"
        imageAlt="Vet near me at Veterinary Medical Center in Northern Kentucky"
        primaryCta={{ label: "Request Appointment", href: "/contact/" }}
        secondaryCta={{ label: "Choose a Location", href: "/locations/" }}
      />
      <Section tone="white" eyebrow="Local Veterinary Care" title="A nearby vet should be easy to reach and easy to trust.">
        <div className="card-grid">
          {[
            ["Locally owned", "VMC is shaped by this community instead of a remote corporate model."],
            ["Close to Cincinnati and NKY neighborhoods", "Our Fort Thomas office is just across the river, and Independence serves central Northern Kentucky."],
            ["Fear-Free and cat-friendly care", "We work to make visits calmer for nervous pets and the people who love them."],
            ["Full-service medicine", "Wellness, dentistry, surgery, medical care, behavior support, and comfort-focused guidance."],
            ["Clear next steps", "We explain findings, options, and pricing in practical language."],
            ["Two clinic choices", "Pick the location that works best for your commute, schedule, and household."]
          ].map(([title, text]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <LocationCards />
      <Section tone="cream" eyebrow="Fast Links" title="Useful pages for pet owners comparing a vet near me.">
        <div className="card-grid compact">
          <article className="card">
            <h3>Services</h3>
            <p>Review wellness, dental, surgery, behavior, urgent care, and cat-friendly appointments.</p>
            <Link href="/services/">Explore services</Link>
          </article>
          <article className="card">
            <h3>New Patients</h3>
            <p>Learn what to bring and complete the registration form before your first visit.</p>
            <Link href="/new-patients/">Start here</Link>
          </article>
        </div>
      </Section>
      <FAQSection faqs={homeFaqs} title="Vet near me questions." />
      <CTASection />
      <JsonLd data={[webpageSchema("/vet-near-me/", pages.nearMe.seo.title, pages.nearMe.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Vet Near Me", path: "/vet-near-me/" }]), faqSchema(homeFaqs)]} />
    </>
  );
}
