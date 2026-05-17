import { CreditCard, FileText, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { NewPatientsExperience } from "@/components/sections/NewPatientsExperience";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, organizationSchema, webpageSchema } from "@/lib/schema";
import { getPublicSettings } from "@/lib/settings/public";

const seo = {
  title: "New Patients | First Vet Visit in Northern Kentucky",
  description:
    "New to Veterinary Medical Center? Request an appointment, complete your new patient registration, and prepare for your first visit in Fort Thomas or Independence, KY."
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "New Patients", path: "/new-patients/" }
];

const timeline = [
  ["Check in", "We confirm your request, contact details, and any records you already have."],
  ["Meet your care team", "Your pet gets time with a local team focused on calm, relationship-based care."],
  ["Exam and conversation", "We review history, symptoms, lifestyle, and the questions that matter most to you."],
  ["Recommendations", "Your veterinarian explains findings and next steps in clear, practical language."],
  ["Checkout and next steps", "You leave with a plan, follow-up guidance, and a team you can contact."]
];

const bringCards: { title: string; text: string; Icon: typeof ShieldCheck }[] = [
  { title: "Photo ID", text: "Bring an ID for owner verification and account setup.", Icon: ShieldCheck },
  { title: "Vaccine records", text: "Helpful if available, but not required before requesting your visit.", Icon: FileText },
  { title: "Medical history", text: "Prior exams, medications, lab work, or adoption paperwork.", Icon: Stethoscope },
  { title: "Leash or carrier", text: "Dogs should arrive on leash. Cats should arrive in a secure carrier.", Icon: MapPin },
  { title: "Payment method", text: "Payment is expected at the time services are rendered.", Icon: CreditCard }
];

const faqs = [
  {
    question: "Do I need previous records before booking?",
    answer: "No. Submit the request now, and you can reply to your confirmation email with vaccine records or health records later."
  },
  {
    question: "Can I choose Fort Thomas or Independence?",
    answer: "Yes. Choose the location that works best for you, or select no preference and our team can help."
  },
  {
    question: "What if I have more than one pet?",
    answer: "Start with one pet in the request and add the other pets in the notes. Our team can help gather the rest."
  },
  {
    question: "How soon will someone contact me?",
    answer: "Our team reviews new patient requests during regular business hours and follows up with next steps as soon as possible."
  },
  {
    question: "Can existing clients use this form?",
    answer: "Existing clients can use faster options on this page, including calling, the patient portal, contact form, or chat when available."
  },
  {
    question: "Is payment due at the visit?",
    answer: "Yes. Payment is expected at the time services are rendered."
  }
];

export const metadata = pageMetadata({ ...seo, path: "/new-patients/" });

export default async function NewPatientsPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <NewPatientsExperience
        portalUrl={settings.externalLinks.onlinePortalUrl}
        liveChatEnabled={settings.liveChat.liveChatEnabled}
      />
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <Section tone="white" eyebrow="First Visit" title="What to expect at your first visit">
        <div className="np-timeline">
          {timeline.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="What to Bring" title="A few helpful things for your first visit">
        <div className="np-bring-grid">
          {bringCards.map(({ title, text, Icon }) => (
            <article key={title}>
              <Icon aria-hidden="true" size={23} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="np-records-callout">
          <strong>If you do not have records yet, no worries.</strong>
          <p>Submit the request now, and you can reply to your confirmation email with records later.</p>
        </div>
      </Section>

      <Section tone="white" eyebrow="Choose Your Location" title="Fort Thomas or Independence, whichever works best">
        <div className="np-location-grid">
          {settings.publicLocations.map((location) => (
            <article key={location.id}>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <a href={`tel:${location.tel}`}>{location.phone}</a>
              <div className="inline-actions">
                <a className="btn btn-ghost" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Map / directions</a>
                <Button href={settings.externalLinks.bookAppointmentUrl || "/contact/"}>Request appointment</Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Questions" title="Common new patient FAQs">
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready to get your first visit started?"
        body="Complete the new patient request and registration form, and our team will follow up with the next step."
        primary={{ label: "Start New Patient Request", href: "#start-new-patient-request" }}
        secondary={{ label: "I’m an Existing Patient", href: "#existing-patient-options" }}
      />

      <JsonLd data={[webpageSchema("/new-patients/", seo.title, seo.description), breadcrumbSchema(crumbs), faqSchema(faqs), organizationSchema(settings)]} />
    </>
  );
}
