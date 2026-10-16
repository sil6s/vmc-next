import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Languages, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { absoluteUrl } from "@/data/site";
import { veterinarians } from "@/data/veterinarians";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, personSchema, webpageSchema } from "@/lib/schema";

const seo = {
  title: "Our Vets: Dr. Baker, Dr. Golatzki & Dr. Dib-Vázquez | VMC",
  description:
    "Meet the veterinarians at Veterinary Medical Centers in Fort Thomas and Independence, KY: Dr. Kristi Baker, Dr. Rebecca Golatzki, and Dr. Valeria Dib-Vázquez."
};

const teamFaqs = [
  {
    question: "Who are the veterinarians at Veterinary Medical Centers?",
    answer:
      "Our veterinarians are Dr. Kristi Baker, DVM (practice owner), Dr. Rebecca Golatzki, DVM, and Dr. Valeria Dib-Vázquez, DVM. They care for dogs and cats at our Fort Thomas and Independence, KY clinics."
  },
  {
    question: "Do you have a veterinarian who focuses on cats?",
    answer:
      "Yes. Dr. Valeria Dib-Vázquez at our Fort Thomas clinic has a special interest in feline medicine and low-stress handling. She previously practiced at a cat-only hospital in Cincinnati."
  },
  {
    question: "Do you have a Spanish-speaking veterinarian?",
    answer: "Yes. Dr. Valeria Dib-Vázquez is fluent in English and Spanish."
  },
  {
    question: "Can I request a specific veterinarian?",
    answer:
      "Yes. Let us know which doctor you would like to see when you book online or call the clinic, and we'll do our best to schedule you with them."
  }
];

const teamValues = [
  { icon: Stethoscope, title: "Experience you can lean on", text: "From emergency medicine to feline-only practice, our doctors bring decades of combined experience to everyday care." },
  { icon: HeartHandshake, title: "Familiar faces, year after year", text: "We'd rather know your pet over many years than meet them once. Continuity makes small changes easier to catch." },
  { icon: Languages, title: "Care in English & Spanish", text: "Dr. Dib-Vázquez is fluent in Spanish, so more Northern Kentucky families can talk through care in their first language." }
];

export const metadata: Metadata = pageMetadata({ ...seo, path: "/team/" });

export default function TeamPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }, { label: "Our Team", href: "/team/" }]} />

      <section className="section section-white team-page-intro">
        <Container>
          <p className="eyebrow">Our veterinarians</p>
          <h1>Meet the doctors who <em>know your pet by name.</em></h1>
          <p>Meet the doctors caring for dogs and cats at Veterinary Medical Centers in Fort Thomas and Independence, KY. Each one brings a different background, and they share the same belief: good care starts with listening.</p>
        </Container>
      </section>

      <TeamSection
        id="veterinarians"
        eyebrow="Meet the doctors"
        title={<>The people behind <em>your pet&rsquo;s care.</em></>}
        intro="Tap any doctor to read their full bio, education, and experience."
        showTeamLink={false}
      />

      <Section tone="white" eyebrow="The VMC difference" title={<>Different backgrounds. <em>One standard of care.</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <p>Behind every doctor is a team of registered veterinary technicians, assistants, and client care staff who keep each visit calm, organized, and easy to understand.</p>
          <div className="home-little-things-list">
            {teamValues.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon aria-hidden="true" size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </Section>

      <FAQSection faqs={teamFaqs} title="Questions about our veterinarians" />

      <Section tone="warm" eyebrow="More than a visit" title={<>A relationship built on <em>care.</em></>} className="home-relationship-section">
        <div className="home-relationship-layout">
          <p>Want to know more about how we practice, where we&rsquo;re located, and what makes an independent clinic different?</p>
          <Link className="text-link" href="/about/">About Veterinary Medical Centers →</Link>
        </div>
      </Section>

      <CTASection title="Ready to meet us in person?" secondary={{ label: "Our Locations", href: "/locations/" }} />

      <JsonLd
        data={[
          webpageSchema("/team/", seo.title, seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }, { name: "Our Team", path: "/team/" }]),
          faqSchema(teamFaqs),
          ...veterinarians.map((vet) =>
            personSchema({
              name: vet.name,
              jobTitle: vet.role,
              credentials: vet.credentials,
              path: `/team/${vet.slug}/`,
              url: `/team/${vet.slug}/`,
              image: vet.image ? absoluteUrl(vet.image) : undefined,
              description: vet.summary
            })
          )
        ]}
      />
    </>
  );
}
