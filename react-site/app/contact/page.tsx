import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactHelpCenter } from "@/components/sections/ContactHelpCenter";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { onlineHelpPath, type OnlineHelpLocationSlug } from "@/lib/online-help";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";
import { getPublicSettings, type PublicLocation } from "@/lib/settings/public";

export const metadata: Metadata = pageMetadata({ ...pages.contact.seo, path: "/contact/" });

const contactFaqs = [
  {
    question: "What if I don't know which option to choose?",
    answer:
      "Start with the VMC Help Center and choose the option that sounds closest. If you are unsure or your pet needs help soon, call Fort Thomas or Independence directly."
  },
  {
    question: "Do appointment requests go through Otto?",
    answer:
      "Yes. Online appointment requests, refill requests, records requests, virtual consult requests, and general care-team messages route through Otto so our team can review and respond."
  },
  {
    question: "Which clinic should I choose?",
    answer:
      "Choose the Fort Thomas or Independence clinic that is easiest for your family. Both locations care for dogs and cats and can help you find the right next step."
  },
  {
    question: "Can I still call a real person?",
    answer:
      "Yes. For urgent, same-day, or time-sensitive concerns, calling your preferred clinic is the best path."
  },
  {
    question: "What should I do for an emergency?",
    answer:
      "If your pet is having trouble breathing, collapsing, bleeding heavily, seizuring, or seems in severe pain, contact an emergency veterinary hospital right away."
  }
];

function publicLocationById(publicLocations: PublicLocation[], id: string) {
  return publicLocations.find((location) => location.id === id);
}

function onlineLocationSlug(shortName: string): OnlineHelpLocationSlug {
  return shortName === "Fort Thomas" ? "fort-thomas" : "independence";
}

function LocationHelpCard({
  location,
  publicLocation
}: {
  location: (typeof locations)[number];
  publicLocation: PublicLocation;
}) {
  const helpSlug = onlineLocationSlug(location.shortName);
  const hours = publicLocation.hours.length ? publicLocation.hours : site.locations.find((item) => item.name.includes(location.shortName))?.hours || [];

  return (
    <article className="contact-clinic-help-card">
      <div className="contact-clinic-help-image">
        <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 860px) 100vw, 560px" />
      </div>
      <div className="contact-clinic-help-body">
        <p className="eyebrow">{location.shortName} Clinic</p>
        <h3>{location.shortName === "Fort Thomas" ? "Fort Thomas Veterinary Medical Center" : "Independence Veterinary Medical Center"}</h3>
        <p>{location.shortName === "Fort Thomas" ? "Your neighborhood veterinary team on Memorial Parkway." : "Local veterinary care on Madison Pike."}</p>
        <div className="contact-clinic-help-details">
          <address>
            <MapPin aria-hidden="true" size={17} />
            {publicLocation.address || location.address}
          </address>
          <a href={`tel:${publicLocation.tel || location.tel}`}>
            <Phone aria-hidden="true" size={17} />
            {publicLocation.phone || location.phone}
          </a>
          <span>
            <Clock aria-hidden="true" size={17} />
            {hours[0] || "Call for current hours."}
          </span>
        </div>
        <div className="inline-actions">
          <Button href={onlineHelpPath(helpSlug, "direct-booking")}>Book Appointment</Button>
          <Button href={publicLocation.mapUrl || site.locations[0].mapUrl} variant="ghost">Get Directions</Button>
          <Button href={`tel:${publicLocation.tel || location.tel}`} variant="ghost">Call</Button>
        </div>
      </div>
    </article>
  );
}

export default async function ContactPage() {
  const settings = await getPublicSettings();
  const fortThomas = publicLocationById(settings.publicLocations, "fort-thomas") || settings.publicLocations[0] || site.locations[0];
  const independence = publicLocationById(settings.publicLocations, "independence") || settings.publicLocations[1] || site.locations[1];
  const helpLocations = [
    { slug: "fort-thomas" as const, name: "Fort Thomas", phone: fortThomas.phone, tel: fortThomas.tel },
    { slug: "independence" as const, name: "Independence", phone: independence.phone, tel: independence.tel }
  ];

  return (
    <>
      <section className="contact-help-hero">
        <Container>
          <div className="contact-help-hero-grid">
            <div>
              <p className="eyebrow">Contact Veterinary Medical Centers</p>
              <h1>How can we help today?</h1>
              <p>
                You do not need to know the exact department, form, or appointment type. Start with what your pet needs,
                choose Fort Thomas or Independence, and our locally owned Northern Kentucky team will help route the next
                step.
              </p>
              <div className="hero-actions">
                <Button href={onlineHelpPath("fort-thomas", "direct-booking")}>Book an Appointment</Button>
                <Button href={`tel:${fortThomas.tel}`} variant="ghost">Call Fort Thomas</Button>
                <Button href={`tel:${independence.tel}`} variant="ghost">Call Independence</Button>
              </div>
            </div>
            <div className="contact-help-hero-image">
              <Image
                src="/images/vet-stock2.jpg"
                alt="Veterinary Medical Centers team member helping a pet owner"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 520px"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="contact-help-center-section">
        <Container>
          <ContactHelpCenter locations={helpLocations} />
        </Container>
      </section>

      <Section
        id="locations"
        tone="cream"
        eyebrow="Choose Your Clinic"
        title="Two clinics, one local team."
        intro="Choose the location that is easiest for your family. Both VMC clinics care for dogs and cats and can help you find the right appointment if you are unsure where to start."
        className="contact-section-tight"
      >
        <div className="contact-clinic-help-grid">
          {locations.map((location) => {
            const id = location.shortName === "Fort Thomas" ? "fort-thomas" : "independence";
            const publicLocation = publicLocationById(settings.publicLocations, id) || (id === "fort-thomas" ? fortThomas : independence);

            return <LocationHelpCard key={location.slug} location={location} publicLocation={publicLocation} />;
          })}
        </div>
      </Section>

      <Section tone="white" className="contact-section-tight">
        <div className="contact-otto-bottom">
          <MessageCircle aria-hidden="true" size={26} />
          <div>
            <p className="eyebrow">Not Sure Where To Start?</p>
            <h2>Message the VMC care team through Otto.</h2>
            <p>
              Use Otto for appointment requests, medication or food refills, medical records, virtual consults, and
              non-urgent care questions. Choose the clinic that works best and our team will help route the request.
            </p>
          </div>
          <div className="contact-otto-bottom-actions">
            <Button href={onlineHelpPath("fort-thomas", "general")}>Message Fort Thomas</Button>
            <Button href={onlineHelpPath("independence", "general")} variant="ghost">Message Independence</Button>
          </div>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Need Help Sooner?" title="Please call for urgent or time-sensitive concerns." className="contact-section-tight">
        <div className="contact-urgent-help">
          <div>
            <AlertTriangle aria-hidden="true" size={28} />
            <h3>Phone is the safest path when timing matters.</h3>
            <p>
              Call if your pet has new or worsening symptoms, you need same-day guidance, or you are not sure whether
              your pet needs urgent care. For severe symptoms, contact an emergency veterinary hospital right away.
            </p>
          </div>
          <div className="contact-urgent-help-actions">
            <Button href={`tel:${fortThomas.tel}`}>Call Fort Thomas</Button>
            <Button href={`tel:${independence.tel}`} variant="ghost">Call Independence</Button>
          </div>
        </div>
      </Section>

      <FAQSection faqs={contactFaqs} title="Common contact questions" />

      <div className="contact-mobile-actions" aria-label="Quick contact actions">
        <a href={`tel:${fortThomas.tel}`}>
          <Phone aria-hidden="true" size={16} />
          Call
        </a>
        <Link href={onlineHelpPath("fort-thomas", "direct-booking")}>
          Book
        </Link>
        <Link href={onlineHelpPath("fort-thomas", "general")}>
          Message
        </Link>
      </div>

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
