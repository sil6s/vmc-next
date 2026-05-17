import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.pharmacy.seo, path: "/online-vet-pharmacy-northern-kentucky-cincinnati/" });

export default async function PharmacyPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <Hero
        eyebrow="Online Pharmacy"
        title="Northern Kentucky & Cincinnati online vet pharmacy."
        body="Request eligible refills, browse trusted products, and coordinate medications through a veterinary source connected to your local VMC care team."
        image="/images/vmc-social-media.jpg"
        imageAlt="Online vet pharmacy access for Veterinary Medical Center clients"
        primaryCta={{ label: "Open Online Pharmacy", href: settings.externalLinks.pharmacyUrl }}
        secondaryCta={{ label: "Contact the Clinic", href: "/contact/" }}
      />
      <Section tone="white" eyebrow="Medication Support" title="Online convenience with local veterinary coordination.">
        <div className="card-grid compact">
          <article className="card">
            <h3>Refills and preventives</h3>
            <p>Use the pharmacy for eligible medication refills, prevention products, and shipped items when available.</p>
            <a href={settings.externalLinks.pharmacyUrl} target="_blank" rel="noopener noreferrer">Visit pharmacy</a>
          </article>
          <article className="card">
            <h3>Questions or delays</h3>
            <p>If something looks delayed, unavailable, or confusing, contact our team before changing medication plans.</p>
            <a href="/contact/">Contact VMC</a>
          </article>
        </div>
      </Section>
      <CTASection />
      <JsonLd data={[webpageSchema("/online-vet-pharmacy-northern-kentucky-cincinnati/", pages.pharmacy.seo.title, pages.pharmacy.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Online Pharmacy", path: "/online-vet-pharmacy-northern-kentucky-cincinnati/" }])]} />
    </>
  );
}
