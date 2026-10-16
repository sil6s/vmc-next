import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarCheck, Check, HeartHandshake, MapPin, PawPrint, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { cityLandings } from "@/data/cityLandings";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";

const seo = {
  title: "Northern Kentucky Vet Clinics | Fort Thomas & Independence | VMC",
  description:
    "Two locally owned vet clinics in Northern Kentucky: Fort Thomas on Memorial Parkway and Independence on Madison Pike. Find your nearest clinic, hours, and directions."
};

export const metadata = pageMetadata({ ...seo, path: "/locations/" });

const clinicDetails = {
  "fort-thomas": {
    tagline: "Our neighborhood clinic on Memorial Parkway, near Highlands High School and Tower Park.",
    personal: "Owned by Dr. Kristi Baker, who lives right here in Fort Thomas.",
    chooseIf: [
      "You live in Fort Thomas, Newport, Bellevue, Highland Heights, Cold Spring, or Alexandria",
      "You're coming from Cincinnati (about 10 minutes from downtown)",
      "You'd like to see Dr. Valeria Dib-Vázquez for feline-focused care"
    ]
  },
  independence: {
    tagline: "Our hometown clinic on Madison Pike, caring for Kenton County pets since 2008.",
    personal: "Where Dr. Baker's practice took root, and still its foundation.",
    chooseIf: [
      "You live in Independence, Taylor Mill, Edgewood, Erlanger, Florence, or Walton",
      "You're in southern Covington or Latonia (straight down Madison Pike)",
      "You want easy access from central Kenton and Boone counties"
    ]
  }
} as const;

const sameEverywhere = [
  { icon: Building2, title: "Locally owned", text: "Both clinics are owned by Dr. Kristi Baker. No corporate parent." },
  { icon: Stethoscope, title: "Full-service care", text: "Wellness, dental, surgery, diagnostics, and sick visits at either location." },
  { icon: PawPrint, title: "Dogs and cats, every age", text: "Puppies and kittens through senior years, welcomed by name." },
  { icon: CalendarCheck, title: "Easy booking", text: "Book online for either clinic, any time, or call to talk it through." }
];

const serviceLinks = [
  ["Wellness exams", "/services/pet-wellness-exams/"],
  ["Vaccinations", "/services/dog-cat-vaccinations/"],
  ["Pet dental care", "/services/pet-dental-care/"],
  ["Spay & neuter", "/services/spay-neuter-surgery/"],
  ["Sick pet visits", "/services/sick-pet-visits/"],
  ["Senior pet care", "/services/senior-pet-care/"]
];

const locationFaqs = [
  {
    question: "Where are your vet clinics in Northern Kentucky?",
    answer:
      "We have two vet clinics in Northern Kentucky: Veterinary Medical Center of Fort Thomas at 2000 Memorial Parkway, Fort Thomas, KY 41075, and Veterinary Medical Center of Independence at 4147 Madison Pike, Independence, KY 41051."
  },
  {
    question: "Which clinic should I choose?",
    answer:
      "Choose whichever is closer or easier for your day. Fort Thomas is convenient for Campbell County and Cincinnati, while Independence is convenient for Kenton and Boone counties. Covington families often use either."
  },
  {
    question: "Do both clinics offer the same services?",
    answer: "Yes. Both offer wellness exams, vaccines, dental care, surgery, diagnostics, sick visits, and senior care for dogs and cats."
  },
  {
    question: "What are your hours?",
    answer:
      "Both clinics are open Monday through Friday, 8:00 AM to 6:00 PM. Fort Thomas has rotating Saturday hours (call ahead), and Independence is closed weekends."
  },
  {
    question: "Are both locations accepting new patients?",
    answer: "Yes. Book online any time, or call Fort Thomas at (859) 442-4420 or Independence at (859) 356-2242."
  }
];

export default async function LocationsPage() {
  const settings = await getPublicSettings();
  const clinics = locations.map((location) => {
    const id = location.shortName === "Fort Thomas" ? "fort-thomas" : "independence";
    const publicLocation = settings.publicLocations.find((item) => item.id === id) || site.locations.find((item) => item.id === id)!;
    const towns = cityLandings.filter((city) => city.clinics.includes(id));
    return { location, id, publicLocation, towns, details: clinicDetails[id] };
  });

  return (
    <>
      <Hero
        eyebrow="Our locations"
        title="Two Northern Kentucky vet clinics,"
        emphasis="one family of care."
        body="Visit us in Fort Thomas or Independence. Both clinics are locally owned, care for dogs and cats, and share the same relationship-first approach."
        image="/images/fort-thomas-clinic.jpg"
        imageAlt="Veterinary Medical Center of Fort Thomas, one of two vet clinics in Northern Kentucky"
        primaryCta={{ label: "Book an Appointment", href: "/book-appointment/" }}
        secondaryCta={{ label: "Find Your Clinic", href: "#clinics" }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner contact-phone-strip">
          <MapPin aria-hidden="true" size={13} />
          <span>Fort Thomas <a href={`tel:${clinics[0].location.tel}`}>{clinics[0].location.phone}</a></span>
          <span aria-hidden="true">·</span>
          <span>Independence <a href={`tel:${clinics[1].location.tel}`}>{clinics[1].location.phone}</a></span>
        </p>
      </div>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations/" }]} />

      <Section id="clinics" tone="cream" eyebrow="Find your clinic" title={<>Our vet clinics in <em>Northern Kentucky.</em></>} intro="Pick the clinic that's easiest for your family. You'll get the same locally owned team and the same standard of care at both." className="locations-clinics-section">
        <div className="locations-clinic-grid">
          {clinics.map(({ location, id, publicLocation, towns, details }) => (
            <article className="locations-clinic-card" key={id}>
              <Link className="locations-clinic-photo" href={`/locations/${location.slug}/`} aria-label={`Visit the ${location.shortName} clinic page`}>
                <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
                <span>{location.shortName}, KY</span>
              </Link>
              <div className="locations-clinic-body">
                <h3><Link href={`/locations/${location.slug}/`}>Veterinary Medical Center of {location.shortName}</Link></h3>
                <p className="locations-clinic-tagline">{details.tagline}</p>
                <p className="locations-clinic-personal"><HeartHandshake aria-hidden="true" size={16} /> {details.personal}</p>
                <div className="home-location-details">
                  <address>{location.address}</address>
                  <a href={`tel:${location.tel}`}>{location.phone}</a>
                  <p className="home-location-weekday-hours">Monday–Friday <span>·</span> 8 AM–6 PM</p>
                  <details className="home-location-full-hours">
                    <summary>Full hours</summary>
                    <ul>{publicLocation.hours.map((line) => <li key={line}>{line}</li>)}</ul>
                  </details>
                </div>
                <div className="locations-clinic-towns">
                  <strong>Popular with families from</strong>
                  <div>
                    {towns.map((city) => <Link key={city.slug} href={`/locations/${city.slug}/`}>{city.city}</Link>)}
                    {id === "fort-thomas" && <Link href="/locations/vet-near-cincinnati-oh/">Cincinnati</Link>}
                  </div>
                </div>
                <div className="locations-clinic-actions">
                  <Link className="btn btn-primary" href="/book-appointment/">Book at {location.shortName}</Link>
                  <Link className="btn btn-ghost" href={`/locations/${location.slug}/`}>Visit clinic page</Link>
                  <a className="text-link" href={publicLocation.mapUrl} target="_blank" rel="noopener noreferrer">Directions →</a>
                </div>
              </div>
              <div className="locations-clinic-map">
                <iframe src={publicLocation.mapEmbedUrl} title={`Map to Veterinary Medical Center of ${location.shortName}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="dark" eyebrow="Not sure which one?" title={<>A quick guide to <em>choosing your clinic.</em></>} intro="Both are great options. Here's how most Northern Kentucky families decide." className="home-life-stages">
        <div className="contact-path-grid">
          {clinics.map(({ location, id, details }) => (
            <article className="home-life-stage-card locations-choose" key={id}>
              <MapPin aria-hidden="true" size={25} />
              <h3>Choose {location.shortName} if&hellip;</h3>
              <ul>
                {details.chooseIf.map((item) => <li key={item}><Check aria-hidden="true" size={15} />{item}</li>)}
              </ul>
              <Link href={`/locations/${location.slug}/`}>Explore the {location.shortName} clinic →</Link>
            </article>
          ))}
        </div>
        <p className="contact-emergency-note">Live in Covington? Both clinics are about 15–20 minutes away. <Link href="/locations/vet-near-covington-ky/">See Covington options →</Link></p>
      </Section>

      <Section tone="white" eyebrow="Same care, either clinic" title={<>Two locations. <em>One standard of care.</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <div>
            <p>Whichever clinic you choose, you&rsquo;re choosing the same locally owned practice and the same commitment to knowing your pet by name.</p>
            <Link className="text-link services-team-link" href="/team/">Meet our veterinarians →</Link>
          </div>
          <div className="home-little-things-list">
            {sameEverywhere.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon aria-hidden="true" size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
        <nav className="locations-service-links" aria-label="Veterinary services at both clinics">
          <span>Available at both clinics:</span>
          {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/services/">All services →</Link>
        </nav>
      </Section>

      <Section tone="cream" eyebrow="Areas we serve" title={<>Find a vet <em>near your town.</em></>} intro="Families visit our two clinics from across Northern Kentucky and Cincinnati. Pick your town to see directions, drive times, and local options." className="locations-towns-section">
        <div className="locations-towns">
          {clinics.map(({ location, id, towns }) => (
            <div key={id}>
              <h3><Link href={`/locations/${location.slug}/`}>Near our {location.shortName} clinic</Link></h3>
              <div className="service-area-chips">
                {towns.map((city) => <Link key={city.slug} href={`/locations/${city.slug}/`}>Vet in {city.city}, KY</Link>)}
                {id === "fort-thomas" && <Link href="/locations/vet-near-cincinnati-oh/">Vet in Cincinnati, OH</Link>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FAQSection faqs={locationFaqs} title="Questions about our Northern Kentucky vet clinics" />

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link>
          <a className="btn btn-ghost" href={`tel:${clinics[0].location.tel}`}>Call Fort Thomas</a>
          <a className="btn btn-ghost" href={`tel:${clinics[1].location.tel}`}>Call Independence</a>
        </>}
      />

      <JsonLd
        data={[
          { ...webpageSchema("/locations/", seo.title, seo.description), "@type": "CollectionPage" },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }]),
          faqSchema(locationFaqs),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
