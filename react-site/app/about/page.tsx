import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { LocationCards } from "@/components/sections/LocationCards";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.about.seo, path: "/about/" });

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About VMC"
        title="Independently owned veterinary care for Northern Kentucky pets."
        body="Veterinary Medical Center is a women-led, locally owned veterinary practice serving dogs and cats from Fort Thomas, Independence, and nearby Greater Cincinnati communities."
        image="/images/vmc-social-media.jpg"
        imageAlt="Veterinary Medical Center team caring for a pet"
        badgeTitle="Locally owned"
        badgeSub="Relationship-based care"
        primaryCta={{ label: "Meet Our Locations", href: "/locations/" }}
        secondaryCta={{ label: "New Patients", href: "/new-patients/" }}
      />
      <Section
        tone="white"
        eyebrow="Our Approach"
        title="Care should feel personal, understandable, and grounded in trust."
        intro="We combine full-service veterinary medicine with clear recommendations, gentle handling, and practical next steps. Families should leave knowing what matters now, what can wait, and who to call if something changes."
      >
        <div className="card-grid">
          {[
            ["Independent ownership", "Care decisions are made by a local team that knows this community."],
            ["Fear-Free handling", "We plan visits around comfort, patience, and reduced stress."],
            ["Dogs and cats", "Wellness, dental care, surgery, behavior, urgent care, and senior support."],
            ["Continuity", "Our team focuses on long-term relationships rather than one-off transactions."]
          ].map(([title, text]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="cream" eyebrow="Our Clinics" title="Fort Thomas and Independence, one standard of care.">
        <div className="location-grid">
          <article className="location-card">
            <Image src="/images/fort-thomas-clinic.jpg" alt="Veterinary Medical Center Fort Thomas exterior" width={720} height={480} />
            <div>
              <h3>Fort Thomas</h3>
              <p>Convenient care on Memorial Parkway for Fort Thomas, Highland Heights, Bellevue, Newport, and nearby river city families.</p>
              <Link className="btn btn-primary" href="/locations/fort-thomas/">View Fort Thomas</Link>
            </div>
          </article>
          <article className="location-card">
            <Image src="/images/independence-clinic.jpg" alt="Veterinary Medical Center Independence exterior" width={720} height={480} />
            <div>
              <h3>Independence</h3>
              <p>Full-service veterinary care on Madison Pike for Independence, Taylor Mill, Covington, Latonia, Erlanger, and Kenton County.</p>
              <Link className="btn btn-primary" href="/locations/independence/">View Independence</Link>
            </div>
          </article>
        </div>
      </Section>
      <LocationCards />
      <FAQSection faqs={homeFaqs.slice(2)} title="About Veterinary Medical Center." />
      <CTASection />
      <JsonLd data={[webpageSchema("/about/", pages.about.seo.title, pages.about.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])]} />
    </>
  );
}
