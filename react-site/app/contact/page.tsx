import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, CalendarCheck, FileText, MessageCircle, Phone, Pill, Stethoscope } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.contact.seo, path: "/contact/" });

const contactFaqs = [
  {
    question: "What is the easiest way to contact Veterinary Medical Center?",
    answer:
      "For most general questions, chat support is the easiest and most convenient way to get started. You can use it for appointment guidance, location questions, patient portal help, pharmacy direction, and new patient next steps. For urgent pet health concerns, please call the clinic directly."
  },
  {
    question: "Can I use chat support for medical emergencies?",
    answer:
      "No. Chat support is for general questions and guidance. If your pet is sick, injured, having trouble breathing, bleeding, in severe pain, or experiencing anything urgent, call the clinic directly or seek emergency veterinary care."
  },
  {
    question: "Which location should I contact?",
    answer:
      "Fort Thomas is convenient for families near Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, and Cold Spring. Independence is convenient for families near Independence, Covington, Taylor Mill, Latonia, Erlanger, and Florence. If you are not sure which location is best, chat support can help point you in the right direction."
  },
  {
    question: "Do you accept new patients?",
    answer:
      "Yes. Veterinary Medical Center welcomes new dog and cat patients at both the Fort Thomas and Independence locations. You can book an appointment, complete the new patient form, or use chat support for help getting started."
  },
  {
    question: "Can I use the contact form for urgent pet health concerns?",
    answer:
      "No. The contact form is for non-urgent messages only. If your pet needs same-day care or you are concerned about a possible emergency, call the clinic directly."
  },
  {
    question: "How do I request medication refills?",
    answer:
      "Existing clients can use the online pharmacy for approved medications, preventives, and refill support. You can also contact the clinic if you need help choosing the right next step."
  },
  {
    question: "Where are your veterinary clinics located?",
    answer:
      "Veterinary Medical Center has two Northern Kentucky locations: Fort Thomas at 2000 Memorial Parkway and Independence at 4147 Madison Pike."
  },
  {
    question: "Are you open on Saturdays?",
    answer:
      "The Fort Thomas location has a rotating Saturday schedule, so please call ahead. The Independence location is closed on Saturdays."
  },
  {
    question: "Can I access my pet's records online?",
    answer:
      "Existing clients can use the patient portal for available records, appointment tools, and account resources."
  },
  {
    question: "What should I do if I am not sure whether my pet needs an appointment?",
    answer:
      "For general guidance, chat support can help you choose the right next step. If your pet seems sick, injured, or needs same-day help, call the clinic directly."
  }
];

const contactOptions = [
  {
    title: "Start with chat support",
    badge: "Recommended",
    text: "The easiest way to ask a quick question, get help choosing a location, find the right form, or understand your next step.",
    micro: "Best for general questions, appointment guidance, portal help, pharmacy questions, and new patient next steps.",
    cta: "Start Chat Support",
    href: "#chat-support",
    icon: MessageCircle,
    featured: true
  },
  {
    title: "Book an appointment",
    text: "Ready to schedule care for wellness, vaccines, sick visits, dental concerns, surgery consults, or new pet appointments?",
    cta: "Book Appointment",
    href: "/contact/#message-form",
    icon: CalendarCheck
  },
  {
    title: "Call Fort Thomas",
    text: "Best for families near Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby river city communities.",
    cta: "Call (859) 442-4420",
    href: `tel:${site.locations[0].tel}`,
    icon: Phone
  },
  {
    title: "Call Independence",
    text: "Best for families near Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and central Northern Kentucky.",
    cta: "Call (859) 356-2242",
    href: `tel:${site.locations[1].tel}`,
    icon: Phone
  },
  {
    title: "Patient portal",
    text: "Access existing client tools, pet records, appointment information, and account resources.",
    cta: "Open Patient Portal",
    href: "/patient-portal-online-booking/",
    icon: FileText
  },
  {
    title: "Online pharmacy",
    text: "Order approved medications, preventives, food, and refills through the online pharmacy.",
    cta: "Visit Online Pharmacy",
    href: "/online-vet-pharmacy-northern-kentucky-cincinnati/",
    icon: Pill
  }
];

export default async function ContactPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <Hero
        eyebrow="Contact Veterinary Medical Center"
        title="Contact Your Northern Kentucky Vet Team"
        body="Need to schedule a visit, ask a quick question, choose the right location, or get help with your pet's care? Chat support is the easiest way to get started, and our Fort Thomas and Independence teams are here to help you find the right next step."
        image="/images/independence-clinic.jpg"
        imageAlt="Northern Kentucky veterinary contact options for dog and cat owners"
        badgeTitle="Message-first support"
        badgeSub="Non-urgent help made easier"
        primaryCta={{ label: "Start Chat Support", href: "#chat-support" }}
        secondaryCta={{ label: "Book Appointment", href: "#message-form" }}
        tertiaryCta={{ label: "Call a Location", href: "#locations" }}
      />

      <div className="home-trust-row" aria-label="Contact page highlights">
        {["Easiest way to ask a quick question", "Two Northern Kentucky locations", "Dogs and cats", "Independently owned", "Patient portal and pharmacy help"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <Section tone="white" eyebrow="Contact Options" title="What do you need help with?" intro="Choose the option that fits best. For most general questions, chat support is the fastest and most convenient place to start.">
        <div className="contact-option-grid">
          {contactOptions.map(({ title, badge, text, micro, cta, href, icon: Icon, featured }) => (
            <article className={featured ? "contact-option-card is-featured" : "contact-option-card"} key={title}>
              {badge && <span className="contact-badge">{badge}</span>}
              <Icon aria-hidden="true" size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
              {micro && <small>{micro}</small>}
              <Link className={featured ? "btn btn-primary" : "btn btn-ghost"} href={href}>{cta}</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="chat-support" tone="cream" eyebrow="Recommended" title="The easiest way to get help: chat support">
        <div className="contact-support-grid">
          <div className="contact-support-card">
            <MessageCircle aria-hidden="true" size={30} />
            <h3>Have a quick question? Start here.</h3>
            <p>Not every question needs a phone call. Chat support is a convenient way to ask general questions, get pointed to the right location, find the right form, or understand what to do next.</p>
            <ul>
              {["Choosing Fort Thomas vs. Independence", "Appointment guidance", "New patient questions", "Patient portal help", "Online pharmacy and refill direction", "General clinic information"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="btn btn-primary" href="#message-form">Start Chat Support</Link>
          </div>
          <div className="contact-call-card">
            <AlertTriangle aria-hidden="true" size={24} />
            <h3>Please call directly for urgent concerns.</h3>
            <p>Call the clinic for same-day illness questions, medication reactions, severe pain, breathing concerns, collapse, bleeding, or anything that feels time-sensitive.</p>
            <div className="inline-actions">
              <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
              <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="message-form" tone="white" eyebrow="Non-Urgent Messages" title="Send a non-urgent message" intro="Prefer a form? Tell us what you need in a few quick steps. For the fastest help with general questions, chat support is usually the most convenient option.">
        <div className="contact-form-layout">
          <div className="form-panel">
            <div className="form-callout">
              <strong>Need help deciding what to do?</strong>
              <span>Start with chat support instead.</span>
              <Link href="#chat-support">Start Chat Support</Link>
            </div>
            <ContactForm />
          </div>
          <aside className="contact-sticky-card">
            <Stethoscope aria-hidden="true" size={24} />
            <h3>Need faster help?</h3>
            <p>For quick questions, chat support is usually the easiest option. For urgent or same-day pet health concerns, call the clinic directly.</p>
            <Link className="btn btn-primary" href="#chat-support">Start Chat Support</Link>
            <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
            <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
          </aside>
        </div>
      </Section>

      <Section id="locations" tone="cream" eyebrow="Locations" title="Choose the location closest to you" intro="Both VMC locations share the same independently owned, relationship-focused approach to veterinary care for dogs and cats.">
        <div className="contact-location-grid">
          {locations.map((location, index) => (
            <article className="contact-location-card" key={location.slug}>
              <Image src={location.image} alt={location.imageAlt} width={720} height={420} />
              <div>
                <h3>{location.shortName} Veterinary Medical Center</h3>
                <address>{location.address}</address>
                <a className="services-phone" href={`tel:${location.tel}`}>{location.phone}</a>
                <ul>{(settings.publicLocations[index]?.hours || site.locations[index].hours).map((hour) => <li key={hour}>{hour}</li>)}</ul>
                <p><strong>Nearby:</strong> {location.quickFacts.nearby}</p>
                <div className="inline-actions">
                  <a className="btn btn-primary" href={`tel:${location.tel}`}>Call {location.shortName}</a>
                  <a className="btn btn-ghost" href={settings.publicLocations[index]?.mapUrl || site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                  <Link className="text-link" href={`/locations/${location.slug}/`}>View {location.shortName} Location</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="Urgent Questions" title="When to call the clinic directly">
        <div className="contact-call-list">
          <p>Chat support and the contact form are helpful for general questions, but some situations need a phone call. For the fastest help with time-sensitive pet health concerns, call Fort Thomas or Independence directly.</p>
          <ul>
            {["Your pet seems sick or injured", "You need same-day guidance", "Your pet may have eaten something unsafe", "Your pet is having medication side effects", "You need to change or cancel an appointment soon", "You are unsure whether your pet needs to be seen", "The issue feels urgent or time-sensitive"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="inline-actions">
            <a className="btn btn-primary" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
            <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
          </div>
        </div>
      </Section>

      <Section tone="cream" eyebrow="New Patients" title="New to Veterinary Medical Center?">
        <div className="contact-new-patient-card">
          <p>We would love to welcome you and your pet. Start with our new patient resources, request an appointment, or use chat support if you are not sure which location or next step is right for you.</p>
          <div className="inline-actions">
            <Link className="btn btn-primary" href="/new-patient-registration-form/">New Patient Form</Link>
            <Link className="btn btn-ghost" href="#message-form">Book Appointment</Link>
            <Link className="text-link" href="#chat-support">Start Chat Support</Link>
          </div>
        </div>
      </Section>

      <FAQSection faqs={contactFaqs} title="Contact questions" />

      <Section tone="red">
        <div className="cta-panel">
          <p className="eyebrow">Next Steps</p>
          <h2>Not sure where to start?</h2>
          <p>Chat support is the easiest way to ask a quick question, choose the right location, or find the right next step. For urgent pet health concerns, call Fort Thomas or Independence directly.</p>
          <div className="hero-actions">
            <Link className="btn btn-secondary" href="#chat-support">Start Chat Support</Link>
            <Link className="btn btn-ghost" href="#message-form">Book Appointment</Link>
            <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
            <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          webpageSchema("/contact/", pages.contact.seo.title, pages.contact.seo.description),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: pages.contact.seo.title,
            description: pages.contact.seo.description,
            url: `${site.siteUrl}/contact/`
          },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]),
          faqSchema(contactFaqs),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
