import Image from "next/image";
import Link from "next/link";
import { Baby, Clock, HeartPulse, MapPin, Microscope, Phone, Scissors, ShieldCheck, SmilePlus } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";

const seo = {
  title: "Veterinary Locations in Fort Thomas & Independence | VMC",
  description: "Visit Veterinary Medical Center in Fort Thomas or Independence, KY for locally owned dog and cat care in Northern Kentucky."
};

const chooseCards = [
  {
    title: "Choose Fort Thomas if...",
    items: [
      "You are near Fort Thomas, Newport, Bellevue, Dayton, or Highland Heights",
      "You want quick access from nearby Cincinnati-area communities",
      "You prefer the Memorial Parkway location"
    ]
  },
  {
    title: "Choose Independence if...",
    items: [
      "You are near Independence, Taylor Mill, Alexandria, Covington, or Erlanger",
      "You want care close to Madison Pike",
      "You prefer the Independence clinic team"
    ]
  }
];

const serviceCards = [
  {
    title: "Wellness and prevention",
    text: "Routine exams, vaccines, parasite prevention, and guidance for every life stage.",
    href: "/veterinary-services/wellness-exams/",
    icon: ShieldCheck
  },
  {
    title: "Dental care",
    text: "Oral exams, dental recommendations, and care planning to support your pet’s comfort and health.",
    href: "/veterinary-services/pet-dental-care/",
    icon: SmilePlus
  },
  {
    title: "Sick visits and diagnostics",
    text: "Care for new symptoms, changes in behavior, and health concerns that need a closer look.",
    href: "/veterinary-services/sick-pet-visits/",
    icon: Microscope
  },
  {
    title: "Surgery support",
    text: "Practical surgical guidance, pre-visit communication, and follow-up support when procedures are needed.",
    href: "/veterinary-services/soft-tissue-surgery/",
    icon: Scissors
  },
  {
    title: "Puppy and kitten care",
    text: "Early-life exams, vaccine planning, prevention, and new pet guidance.",
    href: "/veterinary-services/puppy-kitten-care/",
    icon: Baby
  },
  {
    title: "Senior pet care",
    text: "Monitoring, comfort-focused recommendations, and care planning for aging dogs and cats.",
    href: "/veterinary-services/senior-pet-care/",
    icon: HeartPulse
  }
];

const serviceAreaChips = [
  "Fort Thomas",
  "Independence",
  "Newport",
  "Bellevue",
  "Dayton",
  "Highland Heights",
  "Alexandria",
  "Taylor Mill",
  "Covington",
  "Erlanger",
  "Edgewood",
  "Cincinnati-area pet owners"
];

export const metadata = pageMetadata({ ...seo, path: "/locations/" });

function officialLocationName(shortName: string) {
  return shortName === "Fort Thomas" ? "Veterinary Medical Center of Fort Thomas" : "Veterinary Medical Center of Independence";
}

function locationSummary(shortName: string) {
  return shortName === "Fort Thomas"
    ? "Veterinary Medical Center of Fort Thomas provides local veterinary care for dogs and cats in Fort Thomas and nearby Northern Kentucky communities."
    : "Veterinary Medical Center of Independence provides trusted veterinary care for dogs and cats in Independence, KY and surrounding Northern Kentucky communities.";
}

function nearbyCopy(shortName: string) {
  return shortName === "Fort Thomas"
    ? "Serving Fort Thomas, Newport, Bellevue, Dayton, Highland Heights, and nearby Cincinnati-area pet owners."
    : "Serving Independence, Alexandria, Taylor Mill, Covington, Latonia, Edgewood, Erlanger, and nearby Northern Kentucky communities.";
}

function careAvailable(shortName: string) {
  return shortName === "Fort Thomas"
    ? ["Wellness visits", "Preventive care", "Dental care", "Diagnostics", "Surgery support", "Senior pet care"]
    : ["Wellness visits", "Preventive care", "Dental care", "Diagnostics", "Surgery", "Ongoing health guidance"];
}

function townImage(shortName: string) {
  return shortName === "Fort Thomas" ? "/images/fort-thomas-town.webp" : "/images/indepedence-town.webp";
}

function townImageAlt(shortName: string) {
  return shortName === "Fort Thomas"
    ? "Fort Thomas Kentucky community near Veterinary Medical Center of Fort Thomas"
    : "Independence Kentucky community near Veterinary Medical Center of Independence";
}

function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="locations-map-embed">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="340"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default async function LocationsPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <Hero
        eyebrow="Our Locations"
        title="Veterinary care in Fort Thomas and Independence"
        body="Choose the Veterinary Medical Center location that fits your day. Both clinics provide full-service veterinary care for dogs and cats with the same relationship-based approach, clear communication, and practical care planning."
        image="/images/fort-thomas-clinic.jpg"
        imageAlt="Veterinary Medical Center Fort Thomas veterinary clinic exterior"
        primaryCta={{ label: "Book Appointment", href: "/contact/" }}
        secondaryCta={{ label: "New Patients", href: "/new-patients/" }}
        tertiaryCta={{ label: "View Locations", href: "#locations" }}
      />

      <Section
        tone="white"
        eyebrow="Locations"
        title="Two convenient Northern Kentucky veterinary clinics"
        intro="Both Veterinary Medical Center locations care for dogs and cats with the same standard of practical, relationship-based medicine. Choose the clinic closest to you, then call, request an appointment, or get directions."
        className="locations-intro-section"
      >
        <div className="locations-choose-heading">
          <h3>Which location is right for you?</h3>
        </div>
        <div className="locations-choose-grid" aria-label="Choose the right VMC location">
          {chooseCards.map((card) => (
            <article className="locations-choose-card" key={card.title}>
              <h3>{card.title}</h3>
              <ul>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="locations" tone="cream" eyebrow="Compare Locations" title="Choose your Veterinary Medical Center location" className="locations-feature-section">
        <div className="locations-feature-list">
          {locations.map((location, index) => {
            const officialName = officialLocationName(location.shortName);
            return (
              <article className="locations-feature-card" key={location.slug}>
                <div className="locations-feature-media">
                  <Image src={townImage(location.shortName)} alt={townImageAlt(location.shortName)} width={720} height={520} sizes="(max-width: 980px) 100vw, 44vw" />
                </div>
                <div className="locations-feature-copy">
                  <p className="location-kicker">
                    <MapPin aria-hidden="true" size={15} />
                    Northern Kentucky veterinary clinic
                  </p>
                  <h3>{officialName}</h3>
                  <p>{locationSummary(location.shortName)}</p>
                  <p>Here, your pet is treated as a long-term patient, not a one-time visit. Our team explains recommendations clearly and helps you make confident care decisions.</p>

                  <div className="locations-care-block">
                    <strong>Care available</strong>
                    <div>
                      {careAvailable(location.shortName).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="home-location-details">
                    <address>
                      <MapPin aria-hidden="true" size={17} />
                      {location.address}
                    </address>
                    <a href={`tel:${location.tel}`} aria-label={`Call ${officialName} at ${location.phone}`}>
                      <Phone aria-hidden="true" size={17} />
                      {location.phone}
                    </a>
                    <p>
                      <Clock aria-hidden="true" size={17} />
                      {settings.publicLocations[index]?.hours[0] || site.locations[index].hours[0]}
                    </p>
                  </div>

                  <p className="home-location-nearby">{nearbyCopy(location.shortName)}</p>

                  <MapEmbed src={settings.publicLocations[index]?.mapEmbedUrl || site.locations[index].mapEmbedUrl} title={`Map to ${officialName}`} />

                  <div className="location-card-actions">
                    <a className="btn btn-primary" href={`tel:${location.tel}`}>
                      Call {location.shortName}
                    </a>
                    <a className="btn btn-ghost" href={settings.publicLocations[index]?.mapUrl || site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                    <Link className="btn btn-ghost" href="/contact/">
                      Request Appointment
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="white" eyebrow="Services" title="What both VMC locations offer">
        <div className="locations-service-grid">
          {serviceCards.map(({ title, text, href, icon: Icon }) => (
            <article className="locations-service-card" key={title}>
              <Icon aria-hidden="true" size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href={href}>Learn more</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Service Area" title="Veterinary care across Northern Kentucky">
        <p className="section-narrow-copy">
          Our clinics serve pets and families across Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Taylor Mill, Covington, Erlanger, Edgewood, and nearby Cincinnati-area communities.
        </p>
        <div className="service-area-chips" aria-label="Northern Kentucky communities served">
          {serviceAreaChips.map((community) => (
            <span key={community}>{community}</span>
          ))}
        </div>
      </Section>

      <Section tone="red" className="locations-final-section">
        <div className="cta-panel">
          <p className="eyebrow">Next Steps</p>
          <h2>Ready to schedule with your Northern Kentucky vet team?</h2>
          <p>Call either clinic, request an appointment online, or send a message and our team will help you choose the right next step.</p>
          <div className="hero-actions">
            <Button href="/contact/" variant="secondary">Book Appointment</Button>
            <Button href="/new-patients/" variant="ghost">New Patients</Button>
            <Button href="/contact/#chat-support" variant="ghost">Contact the Team</Button>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          webpageSchema("/locations/", seo.title, seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }]),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
