import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, CalendarCheck, Clock, FileText, MapPin, MessageSquareText, PawPrint, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Separator } from "@/components/ui/separator";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";
import { getPublicSettings, type PublicLocation } from "@/lib/settings/public";

export const metadata = pageMetadata({ ...pages.contact.seo, path: "/contact/" });

const contactFaqs = [
  {
    question: "Which location should I contact?",
    answer:
      "Choose Fort Thomas if that clinic is closer to your home or easier for your schedule. Choose Independence if that location is more convenient. If you are not sure, call either clinic and our team can help you decide."
  },
  {
    question: "Can I request an appointment online?",
    answer:
      "Yes. You can request an appointment online. New clients will be guided through the new-patient steps, and existing clients can choose the best contact option for their need."
  },
  {
    question: "Can I send medical records before my appointment?",
    answer:
      "Yes. You can use the non-urgent message form for records questions, or call your clinic if records are needed for a visit happening soon."
  },
  {
    question: "Do you accept new pets?",
    answer:
      "Yes. Veterinary Medical Centers welcomes new dog and cat patients at both the Fort Thomas and Independence locations."
  },
  {
    question: "What should I do if my pet is having an emergency?",
    answer:
      "Call the clinic directly or contact an emergency veterinary hospital. Do not use the contact form for urgent medical concerns, trouble breathing, injury, collapse, severe pain, or sudden behavior changes."
  },
  {
    question: "How quickly will you respond to messages?",
    answer:
      "Our team reviews non-urgent messages during business hours. If your concern is time-sensitive, please call your preferred location directly."
  },
  {
    question: "Can I request prescription refills online?",
    answer:
      "Existing clients can use the online pharmacy for eligible refills and preventives. If a medication concern cannot wait, please call your clinic directly."
  }
];

const urgentReasons = [
  "Your pet is having urgent symptoms",
  "You need same-day guidance",
  "You have a time-sensitive surgery or appointment question",
  "You are unsure whether your pet needs urgent care"
];

function publicLocationById(publicLocations: PublicLocation[], id: string) {
  return publicLocations.find((location) => location.id === id);
}

function ActionButton({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <ShadButton asChild className={className} variant={variant}>
        <Link href={href}>{children}</Link>
      </ShadButton>
    );
  }

  return (
    <ShadButton asChild className={className} variant={variant}>
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    </ShadButton>
  );
}

function ContactHero({ fortThomas, independence }: { fortThomas: PublicLocation; independence: PublicLocation }) {
  return (
    <section className="contact-hero">
      <Container>
        <div className="contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="eyebrow">Contact Veterinary Medical Centers</p>
            <h1>Contact Veterinary Medical Center</h1>
            <p>
              Have a question, need records, or want to schedule care? Choose the best way to reach our Fort Thomas or Independence teams.
            </p>
            <div className="contact-hero-actions">
              <ActionButton href={`tel:${fortThomas.tel}`}>Call Fort Thomas</ActionButton>
              <ActionButton href={`tel:${independence.tel}`} variant="secondary">Call Independence</ActionButton>
              <ActionButton href="/book-appointment/" variant="secondary">Request an Appointment</ActionButton>
            </div>
          </div>
          <div className="contact-hero-media">
            <Image
              src="/images/vet-stock2.jpg"
              alt="Veterinarian and pet owner reviewing appointment information with a dog"
              width={960}
              height={640}
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <Card className="contact-hero-location-card">
              <CardContent>
                <span><PawPrint aria-hidden="true" size={16} /> Two Northern Kentucky clinics</span>
                <strong>Fort Thomas & Independence</strong>
                <small>Call, request an appointment, or send a non-urgent message.</small>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function NeedHelpCard({
  icon: Icon,
  title,
  description,
  children,
  featured = false
}: {
  icon: typeof Phone;
  title: string;
  description: string;
  children: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <Card className={`contact-need-card${featured ? " is-featured" : ""}`}>
      <CardHeader>
        <Icon aria-hidden="true" size={24} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function LocationContactCard({
  location,
  publicLocation
}: {
  location: (typeof locations)[number];
  publicLocation: PublicLocation;
}) {
  const hours = publicLocation.hours.length ? publicLocation.hours : site.locations.find((item) => item.name.includes(location.shortName))?.hours || [];

  return (
    <Card className="contact-location-card contact-clinic-card">
      <Image
        src={location.image}
        alt={location.imageAlt}
        width={720}
        height={420}
        loading="eager"
        sizes="(max-width: 720px) calc(100vw - 48px), 50vw"
      />
      <CardContent>
        <div className="contact-clinic-card-head">
          <h3>{location.shortName}</h3>
          <span>Northern Kentucky clinic</span>
        </div>
        <div className="contact-clinic-details">
          <address><MapPin aria-hidden="true" size={17} /> {publicLocation.address || location.address}</address>
          <a href={`tel:${publicLocation.tel || location.tel}`}><Phone aria-hidden="true" size={17} /> {publicLocation.phone || location.phone}</a>
          <div><Clock aria-hidden="true" size={17} /> <span>{hours[0] || "Call for current hours."}</span></div>
        </div>
        <Separator />
        <ul>{hours.map((hour) => <li key={hour}>{hour}</li>)}</ul>
        <div className="contact-clinic-actions">
          <ActionButton className="contact-location-button" href={`tel:${publicLocation.tel || location.tel}`}>Call This Location</ActionButton>
          <ActionButton className="contact-location-button" href={publicLocation.mapUrl || site.locations[0].mapUrl} variant="secondary">Get Directions</ActionButton>
          <ActionButton className="contact-location-button" href="/book-appointment/" variant="secondary">Request Appointment</ActionButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ContactPage() {
  const settings = await getPublicSettings();
  const fortThomas = publicLocationById(settings.publicLocations, "fort-thomas") || settings.publicLocations[0] || site.locations[0];
  const independence = publicLocationById(settings.publicLocations, "independence") || settings.publicLocations[1] || site.locations[1];

  return (
    <>
      <ContactHero fortThomas={fortThomas} independence={independence} />

      <Section
        tone="white"
        eyebrow="Contact Options"
        title="What do you need help with?"
        intro="Start with the option that best matches your need. For urgent or same-day concerns, calling is the safest path."
        className="contact-section-tight"
      >
        <div className="contact-need-grid">
          <NeedHelpCard
            featured
            icon={CalendarCheck}
            title="Schedule care"
            description="Best for wellness visits, vaccines, exams, and new patient appointments."
          >
            <ActionButton className="contact-card-button" href="/book-appointment/">Request Appointment</ActionButton>
          </NeedHelpCard>

          <NeedHelpCard
            icon={Phone}
            title="Call a location"
            description="Best for same-day questions, urgent concerns, or time-sensitive needs."
          >
            <div className="contact-card-split-actions">
              <ActionButton className="contact-card-button" href={`tel:${fortThomas.tel}`}>Fort Thomas</ActionButton>
              <ActionButton className="contact-card-button" href={`tel:${independence.tel}`} variant="secondary">Independence</ActionButton>
            </div>
          </NeedHelpCard>

          <NeedHelpCard
            icon={MessageSquareText}
            title="Send a message"
            description="Best for non-urgent questions, follow-ups, records, or general requests."
          >
            <ActionButton className="contact-card-button" href="#message-form" variant="secondary">Start Message</ActionButton>
          </NeedHelpCard>

          <NeedHelpCard
            icon={FileText}
            title="Patient portal"
            description="Best for accessing records, reminders, and account information."
          >
            <ActionButton className="contact-card-button" href={settings.externalLinks.onlinePortalUrl} variant="secondary">Open Portal</ActionButton>
          </NeedHelpCard>
        </div>
      </Section>

      <Section
        id="locations"
        tone="cream"
        eyebrow="Clinic Locations"
        title="Choose your clinic location"
        intro="Both Veterinary Medical Centers locations support dogs and cats with relationship-based care for Northern Kentucky families."
        className="contact-section-tight"
      >
        <div className="contact-location-grid">
          {locations.map((location) => {
            const id = location.shortName === "Fort Thomas" ? "fort-thomas" : "independence";
            const publicLocation = publicLocationById(settings.publicLocations, id) || (id === "fort-thomas" ? fortThomas : independence);

            return <LocationContactCard key={location.slug} location={location} publicLocation={publicLocation} />;
          })}
        </div>
      </Section>

      <Section
        id="message-form"
        tone="white"
        eyebrow="Non-Urgent Support"
        title="Send us a non-urgent message"
        intro="For urgent concerns, please call your preferred location directly. This form is for general questions, records requests, follow-ups, and non-urgent care needs."
        className="contact-section-tight"
      >
        <Card className="contact-message-panel contact-intake-card">
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </Section>

      <Section tone="cream" eyebrow="Urgent Needs" title="Please call directly if..." className="contact-section-tight">
        <Card className="contact-urgent-card">
          <CardContent>
            <div className="contact-urgent-head">
              <AlertTriangle aria-hidden="true" size={26} />
              <div>
                <h3>Phone is the best path for urgent or time-sensitive concerns.</h3>
                <p>If you are unsure whether your pet needs urgent care, call and our team can help you decide the safest next step.</p>
              </div>
            </div>
            <ul>
              {urgentReasons.map((reason) => <li key={reason}>{reason}</li>)}
            </ul>
            <div className="contact-urgent-actions">
              <ActionButton href={`tel:${fortThomas.tel}`}>Call Fort Thomas</ActionButton>
              <ActionButton href={`tel:${independence.tel}`} variant="secondary">Call Independence</ActionButton>
            </div>
          </CardContent>
        </Card>
      </Section>

      <FAQSection faqs={contactFaqs} title="Contact questions" />

      <Section tone="red">
        <div className="cta-panel contact-final-cta">
          <p className="eyebrow">Next Steps</p>
          <h2>Not sure where to start?</h2>
          <p>Call the location closest to you, or request an appointment and our team will help guide you.</p>
          <div className="hero-actions">
            <ActionButton href={`tel:${fortThomas.tel}`} variant="secondary">Call Fort Thomas</ActionButton>
            <ActionButton href={`tel:${independence.tel}`} variant="ghost">Call Independence</ActionButton>
            <ActionButton href="/book-appointment/" variant="ghost">Request Appointment</ActionButton>
          </div>
        </div>
      </Section>

      <div className="contact-mobile-actions" aria-label="Quick contact actions">
        <a href={`tel:${fortThomas.tel}`}>
          <Phone aria-hidden="true" size={16} />
          Call
        </a>
        <Link href="/book-appointment/">
          <CalendarCheck aria-hidden="true" size={16} />
          Appointment
        </Link>
        <Link href="#message-form">
          <MessageSquareText aria-hidden="true" size={16} />
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
