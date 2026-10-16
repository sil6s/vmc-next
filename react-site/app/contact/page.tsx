import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Phone } from "lucide-react";
import { ContactHelpCenter } from "@/components/sections/ContactHelpCenter";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
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
    question: "What are your phone numbers?",
    answer:
      "Call Veterinary Medical Center of Fort Thomas at (859) 442-4420 or Veterinary Medical Center of Independence at (859) 356-2242."
  },
  {
    question: "What are your hours?",
    answer:
      "Both clinics are open Monday through Friday, 8:00 AM to 6:00 PM. Fort Thomas has rotating Saturday hours, so please call ahead. Both clinics are closed Sunday."
  },
  {
    question: "Where are your clinics located?",
    answer:
      "Fort Thomas is at 2000 Memorial Parkway, Fort Thomas, KY 41075. Independence is at 4147 Madison Pike, Independence, KY 41051."
  },
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
      <Hero
        eyebrow="Contact Veterinary Medical Centers"
        title="Call, book, or message"
        emphasis="your local vet team."
        body="Reach our Fort Thomas or Independence clinic by phone, book online, or send a message. Not sure what you need? Start below and we'll route you to the right place."
        image="/images/vet-stock2.jpg"
        imageAlt="Veterinary team member helping a pet owner in Northern Kentucky"
        primaryCta={{ label: "Book an Appointment", href: onlineHelpPath("fort-thomas", "direct-booking") }}
        secondaryCta={{ label: "Call Fort Thomas", href: `tel:${fortThomas.tel}` }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner contact-phone-strip">
          <Heart aria-hidden="true" size={13} />
          <span>Fort Thomas <a href={`tel:${fortThomas.tel}`}>{fortThomas.phone}</a></span>
          <span aria-hidden="true">·</span>
          <span>Independence <a href={`tel:${independence.tel}`}>{independence.phone}</a></span>
        </p>
      </div>

      <section className="contact-help-center-section">
        <Container>
          <ContactHelpCenter locations={helpLocations} />
        </Container>
      </section>

      <Section
        id="locations"
        tone="cream"
        eyebrow="Our clinics"
        title={<>Visit a Northern Kentucky vet <em>near you.</em></>}
        intro="Both clinics care for dogs and cats. Choose whichever is easiest for your family."
        className="home-locations-section"
      >
        <div className="home-location-grid">
          {locations.map((location) => {
            const id = location.shortName === "Fort Thomas" ? "fort-thomas" : "independence";
            const publicLocation = publicLocationById(settings.publicLocations, id) || (id === "fort-thomas" ? fortThomas : independence);
            const hours = publicLocation.hours?.length ? publicLocation.hours : site.locations.find((item) => item.id === id)?.hours || [];
            return (
              <article className="home-location-card" key={location.slug}>
                <div className="home-location-image">
                  <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                </div>
                <div className="home-location-copy">
                  <h3><Link href={`/locations/${location.slug}/`}>{location.shortName}, KY</Link></h3>
                  <p className="home-location-official">Veterinary Medical Center of {location.shortName}</p>
                  <div className="home-location-details">
                    <address>{publicLocation.address || location.address}</address>
                    <a href={`tel:${publicLocation.tel || location.tel}`}>{publicLocation.phone || location.phone}</a>
                    <p className="home-location-weekday-hours">Monday–Friday <span>·</span> 8 AM–6 PM</p>
                    <details className="home-location-full-hours">
                      <summary>Full hours</summary>
                      <ul>
                        {hours.map((line) => <li key={line}>{line}</li>)}
                      </ul>
                    </details>
                  </div>
                </div>
                <div className="inline-actions">
                  <Link className="btn btn-primary" href={onlineHelpPath(onlineLocationSlug(location.shortName), "direct-booking")}>Book Appointment</Link>
                  <a className="text-link" href={publicLocation.mapUrl || site.locations.find((item) => item.id === id)?.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <FAQSection faqs={contactFaqs} title="Questions about contacting our clinics" />

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
