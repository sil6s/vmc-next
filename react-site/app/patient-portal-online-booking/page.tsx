import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.portal.seo, path: "/patient-portal-online-booking/" });

export default async function PortalPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <Hero
        eyebrow="Patient Portal"
        title="Northern Kentucky & Cincinnati patient portal and online booking."
        body="Use this secure access page to sign in, request appointments, review reminders, and continue care communication with Veterinary Medical Center."
        image="/images/veterinary-care-hero.jpg"
        imageAlt="Veterinary patient portal and online booking for VMC clients"
        primaryCta={{ label: "Open Patient Portal", href: settings.externalLinks.onlinePortalUrl }}
        secondaryCta={{ label: "New Patients", href: "/new-patients/" }}
      />
      <Section tone="white" eyebrow="Online Access" title="Fast, secure online booking for VMC clients.">
        <div className="card-grid compact">
          <article className="card">
            <h3>Current patients</h3>
            <p>Open the portal to request appointments, manage account resources, and follow the next step in your pet&apos;s care plan.</p>
            <a href={settings.externalLinks.onlinePortalUrl} target="_blank" rel="noopener noreferrer">Open portal</a>
          </article>
          <article className="card">
            <h3>New to VMC</h3>
            <p>Start with the new patient page and registration form so your first visit is smoother.</p>
            <a href="/new-patients/">New patient information</a>
          </article>
        </div>
      </Section>
      <CTASection />
      <JsonLd data={[webpageSchema("/patient-portal-online-booking/", pages.portal.seo.title, pages.portal.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Patient Portal", path: "/patient-portal-online-booking/" }])]} />
    </>
  );
}
