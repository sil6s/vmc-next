import {
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  HeartHandshake,
  HeartPulse,
  HelpCircle,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { NewPatientsExperience } from "@/components/sections/NewPatientsExperience";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, organizationSchema, webpageSchema } from "@/lib/schema";
import { getPublicSettings } from "@/lib/settings/public";

const seo = {
  title: "New Patient Vet Appointment in Northern Kentucky | Veterinary Medical Center",
  description:
    "New to Veterinary Medical Center? Request your first vet appointment at our Fort Thomas or Independence, KY locations for dogs and cats."
};

const crumbs = [
  { name: "Home", path: "/" },
  { name: "New Patients", path: "/new-patients/" }
];

const timeline: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Check in", text: "We confirm your request, contact details, and any records you already have.", Icon: ClipboardCheck },
  { title: "Meet your care team", text: "Your pet gets time with a local team focused on calm, relationship-based care.", Icon: HeartHandshake },
  { title: "Exam and conversation", text: "We review history, symptoms, lifestyle, and the questions that matter most to you.", Icon: Stethoscope },
  { title: "Clear recommendations", text: "Your veterinarian explains findings and next steps in clear, practical language.", Icon: FileText },
  { title: "Checkout and next steps", text: "You leave with a plan, follow-up guidance, and a team you can contact.", Icon: CalendarCheck }
];

const bringCards: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Photo ID", text: "Bring an ID for owner verification and account setup.", Icon: ShieldCheck },
  { title: "Vaccine records", text: "Helpful if available, but not required before requesting your visit.", Icon: FileText },
  { title: "Medical history", text: "Prior exams, medications, lab work, or adoption paperwork.", Icon: Stethoscope },
  { title: "Leash or carrier", text: "Dogs should arrive on leash. Cats should arrive in a secure carrier.", Icon: MapPin },
  { title: "Payment method", text: "Payment is expected at the time services are rendered.", Icon: CreditCard }
];

const prepCards: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Faster check-in", text: "Your contact details and pet basics are already organized before you arrive.", Icon: CalendarClock },
  { title: "Better medical history review", text: "Our care team can review vaccine history, current concerns, lifestyle, medications, and prior records.", Icon: ClipboardList },
  { title: "Easier record transfer", text: "Upload records now or reply to your confirmation email later if you find them after submitting.", Icon: FileText },
  { title: "More prepared care team", text: "The appointment request helps us understand whether your pet needs wellness care, dental care, surgery guidance, diagnostics, or sick-visit support.", Icon: Stethoscope },
  { title: "Less stress on visit day", text: "A prepared first visit helps dogs, cats, and their people settle in with fewer surprises.", Icon: HeartPulse }
];

const independentCards: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Locally led decisions", text: "Decisions are made close to the pets, clients, and communities we serve.", Icon: HeartHandshake },
  { title: "No confusing package pressure", text: "We explain options clearly without pushing confusing, one-size-fits-all packages.", Icon: ClipboardCheck },
  { title: "Recommendations built around your pet", text: "Recommendations are based on your pet’s health, history, lifestyle, and comfort.", Icon: HeartPulse },
  { title: "Familiar care over time", text: "Continuity of care helps our team understand the small details that matter.", Icon: UsersRound }
];

const faqs = [
  {
    question: "How do I become a new patient at Veterinary Medical Center?",
    answer:
      "Start by submitting the new patient request on this page. Our team will review your information and follow up to help schedule your first vet appointment at Fort Thomas or Independence."
  },
  {
    question: "Do I need previous veterinary records before scheduling?",
    answer: "No. Submit the request now, and you can reply to your confirmation email with vaccine records, health records, or adoption paperwork later."
  },
  {
    question: "Can I choose between the Fort Thomas and Independence locations?",
    answer: "Yes. Choose the Veterinary Medical Center location that works best for you, or select no preference and our team can help."
  },
  {
    question: "What should I bring to my pet’s first appointment?",
    answer:
      "Bring a photo ID, any vaccine or medical records you have, medication details, a secure leash or carrier, and a payment method. If records are not available yet, you can still request an appointment."
  },
  {
    question: "Do you see both dogs and cats?",
    answer: "Yes. Veterinary Medical Center welcomes new dog and cat patients at both Northern Kentucky locations."
  },
  {
    question: "What if my pet needs urgent care?",
    answer:
      "Do not use this form for emergencies. Call the clinic directly during business hours or visit the nearest emergency veterinary hospital if your pet needs immediate care."
  },
  {
    question: "Can existing clients use this form?",
    answer: "Existing clients can use faster options on this page, including calling, the patient portal, contact form, or chat when available."
  },
  {
    question: "How soon will your team contact me after I submit the form?",
    answer: "Our team reviews new patient vet appointment requests during regular business hours and follows up with next steps as soon as possible."
  },
  {
    question: "Is Veterinary Medical Center independently owned?",
    answer:
      "Yes. Veterinary Medical Center is locally and independently owned. Care decisions are made close to the pets, families, and Northern Kentucky communities we serve."
  },
  {
    question: "What makes independent veterinary care different?",
    answer:
      "Independent care means our team can focus on practical recommendations, continuity of care, and your pet’s best interest without corporate package pressure or one-size-fits-all care plans."
  },
  {
    question: "What services can my pet receive as a new patient?",
    answer:
      "New patients can establish care for wellness exams, preventive care, sick visits, dental care, diagnostics, surgery consultations, senior pet care, and ongoing wellness guidance."
  },
  {
    question: "Do you offer puppy and kitten care?",
    answer:
      "Yes. Veterinary Medical Center helps puppies and kittens get started with exams, vaccines, parasite prevention, nutrition guidance, behavior questions, and planning for long-term care."
  }
];

export const metadata = pageMetadata({ ...seo, path: "/new-patients/" });

function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="np-location-map">
      <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}

export default async function NewPatientsPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <NewPatientsExperience
        portalUrl={settings.externalLinks.onlinePortalUrl}
        pharmacyUrl={settings.externalLinks.pharmacyUrl}
      />
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <Section tone="cream" eyebrow="Independent Care" title="Independent veterinary care, built around your pet">
        <div className="np-independent-panel">
          <figure className="np-editorial-image">
            <Image
              src="/images/2149143893 (1).jpg"
              alt="Veterinary team caring for a cat at Veterinary Medical Center in Northern Kentucky"
              width={900}
              height={600}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </figure>
          <div>
            <h3>Veterinary care that feels <span className="np-accent">personal, not packaged.</span></h3>
            <p>
              Veterinary Medical Center is locally and independently owned, which means our care is guided by the pets and families in front of us,
              not by a corporate script. We focus on clear recommendations, practical next steps, and long-term relationships with the dogs, cats,
              and people we serve across Northern Kentucky.
            </p>
            <p>
              From your first visit forward, we want you to understand what we recommend, why it matters, and what options make sense for your pet.
            </p>
            <ul className="np-simple-checklist">
              {independentCards.map(({ title, Icon }) => (
                <li key={title}><Icon aria-hidden="true" size={18} /> {title}</li>
              ))}
            </ul>
            <Button href="/about/" variant="ghost">Learn more about Veterinary Medical Center</Button>
          </div>
        </div>
      </Section>

      <Section
        tone="white"
        eyebrow="First Visit"
        title="What to expect at your first visit"
        intro="Your first visit helps our team understand your pet’s health history, personality, lifestyle, and current needs so we can recommend the right next steps."
      >
        <div className="np-timeline">
          {timeline.map(({ title, text, Icon }, index) => (
            <article key={title}>
              <span><Icon aria-hidden="true" size={21} /> {String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="cream"
        eyebrow="Northern Kentucky New Patients"
        title="New patient veterinary care in Northern Kentucky"
        intro="Veterinary Medical Center welcomes new clients from Fort Thomas, Independence, Highland Heights, Newport, Bellevue, Dayton, Alexandria, and surrounding Northern Kentucky communities."
      >
        <div className="np-seo-panel">
          <div>
            <h3>Two local clinics for dogs, cats, and the people who love them.</h3>
            <p>
              Veterinary Medical Center welcomes new clients from Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights,
              Alexandria, and nearby Northern Kentucky communities. Whether your pet is due for preventive care or you are looking for a
              long-term local vet, our team helps make the first step clear.
            </p>
            <p>
              During a new patient visit, we take time to understand your dog or cat’s medical history, vaccines, medications, lifestyle,
              behavior, and any concerns you want to discuss. That context helps us provide care that feels practical, personal, and easier to follow.
            </p>
            <p>
              Our clinics support wellness exams, sick visits, dental care, diagnostics, surgery, senior pet care, puppy and kitten care,
              and ongoing guidance for every stage of your pet’s life.
            </p>
          </div>
          <figure className="np-editorial-image np-seo-image">
            <Image
              src="/images/fort-thomas-clinic.jpg"
              alt="Locally owned Veterinary Medical Center clinic serving dogs and cats in Northern Kentucky"
              width={900}
              height={454}
              sizes="(max-width: 900px) 100vw, 32vw"
            />
          </figure>
          <nav aria-label="Helpful new patient links">
            <strong>Helpful links</strong>
            <Link href="/services/">View Services</Link>
            <Link href="/about/">Meet Veterinary Medical Center</Link>
            <Link href="/contact/">Contact Our Team</Link>
            <Link href="/locations/vet-in-fort-thomas-ky/">Fort Thomas Location</Link>
            <Link href="/locations/vet-in-independence-ky/">Independence Location</Link>
            <Link href="/patient-portal-online-booking/">Patient Portal</Link>
            <Link href="/online-vet-pharmacy-northern-kentucky-cincinnati/">Online Pharmacy</Link>
          </nav>
        </div>
      </Section>

      <Section tone="white" eyebrow="Why Submit First" title="Why complete your new patient request before your visit?">
        <div className="np-benefit-split">
          <div>
            <h3>A little preparation makes the first visit easier.</h3>
            <p>Submitting your request ahead of time gives our team a chance to review your information, understand your pet’s needs, and make your first visit smoother.</p>
            <Button href="#start-new-patient-request">Start New Patient Request</Button>
          </div>
          <ul className="np-benefit-list">
          {prepCards.map(({ title, text, Icon }) => (
            <li key={title}>
              <Icon aria-hidden="true" size={23} />
              <span><strong>{title}</strong><small>{text}</small></span>
            </li>
          ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream" eyebrow="What to Bring" title="A few helpful things for your first visit">
        <div className="np-visit-checklist">
          {bringCards.map(({ title, text, Icon }) => (
            <div key={title}>
              <Icon aria-hidden="true" size={23} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="np-records-callout">
          <strong>Do not have records yet? No worries.</strong>
          <p>Submit the request now, and we can help confirm what is needed before your visit.</p>
        </div>
      </Section>

      <Section
        tone="white"
        eyebrow="Choose Your Location"
        title="Choose the location that works best for you"
        intro="Both Veterinary Medical Center locations provide the same relationship-based care for dogs and cats. Choose the clinic that is most convenient for your family."
      >
        <div className="np-location-grid">
          {settings.publicLocations.map((location) => (
            <article key={location.id}>
              <MapEmbed src={location.mapEmbedUrl} title={`Map to Veterinary Medical Center ${location.name}`} />
              <MapPin aria-hidden="true" size={24} />
              <h3>{location.name}</h3>
              <p>{location.id === "fort-thomas" ? "Convenient for Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby Cincinnati neighborhoods." : "Convenient for Independence, Taylor Mill, Covington, Latonia, Erlanger, Florence, and central Northern Kentucky."}</p>
              <address>{location.address}</address>
              <a href={`tel:${location.tel}`}><Phone aria-hidden="true" size={16} /> {location.phone}</a>
              <p className="np-location-hours"><CalendarClock aria-hidden="true" size={16} /> {location.hours[0] || "Call for current appointment availability."}</p>
              <div className="inline-actions">
                <a className="btn btn-primary" href={location.mapUrl} target="_blank" rel="noopener noreferrer"><Navigation aria-hidden="true" size={16} /> Get Directions</a>
                <a className="btn btn-ghost" href={`tel:${location.tel}`}><Phone aria-hidden="true" size={16} /> Call Location</a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="cream"
        eyebrow="Questions"
        title="Common new patient questions"
        intro="Here are a few things new clients often ask before scheduling their first visit."
      >
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary><HelpCircle aria-hidden="true" size={18} /> {faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="red">
        <div className="cta-panel np-final-cta">
          <p className="eyebrow">Next Steps</p>
          <h2>Ready to get your pet’s first visit started?</h2>
          <p>Complete the new patient request form, and our team will follow up to help schedule your visit at the location that works best for you.</p>
          <div className="hero-actions">
            <Button href="#start-new-patient-request" variant="secondary">Start New Patient Request</Button>
            <Button href="#existing-patient-options" variant="ghost">Existing Client Options</Button>
          </div>
        </div>
      </Section>

      <JsonLd data={[webpageSchema("/new-patients/", seo.title, seo.description), breadcrumbSchema(crumbs), faqSchema(faqs), organizationSchema(settings)]} />
    </>
  );
}
