import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.newPatients.seo, path: "/new-patients/" });

export default function NewPatientsPage() {
  return (
    <>
      <Hero
        eyebrow="New Patients"
        title="New patients are welcome at both VMC locations."
        body="Looking for a new veterinarian in Northern Kentucky? Our team makes it clear how to start, what to bring, and how to prepare for your first visit."
        image="/images/vmc-social-media.jpg"
        imageAlt="Veterinary Medical Center team welcoming a pet family"
        primaryCta={{ label: "Request Appointment", href: "/contact/" }}
        secondaryCta={{ label: "Complete Form", href: "/new-patient-registration-form/" }}
      />
      <Section tone="white" eyebrow="Getting Started" title="Your first visit, step by step.">
        <div className="card-grid">
          {[
            ["1. Request a visit", "Call either clinic, send a message, or use online booking if available."],
            ["2. Send records", "Ask your previous vet to share records, vaccine history, medications, and lab results."],
            ["3. Complete the form", "Fill out the new patient registration form before your appointment."],
            ["4. Share concerns", "Tell us about symptoms, behavior changes, goals, budget concerns, and visit preferences."],
            ["5. Build a plan", "Your veterinarian will explain findings and next steps in plain language."]
          ].map(([title, text]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="cream" eyebrow="Choose a Location" title="Call the clinic that fits your day.">
        <div className="card-grid compact">
          {site.locations.map((location) => (
            <article className="card" key={location.id}>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <p>{location.hours.join(". ")}</p>
              <a href={`tel:${location.tel}`}>{location.phone}</a>
            </article>
          ))}
        </div>
      </Section>
      <CTASection
        title="Book, call, or message us, then complete your new patient form."
        body="If anything feels unclear, contact either clinic. We would love to welcome you and your pet."
        primary={{ label: "Complete New Patient Form", href: "/new-patient-registration-form/" }}
        secondary={{ label: "Contact Us", href: "/contact/" }}
      />
      <JsonLd data={[webpageSchema("/new-patients/", pages.newPatients.seo.title, pages.newPatients.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "New Patients", path: "/new-patients/" }])]} />
    </>
  );
}
