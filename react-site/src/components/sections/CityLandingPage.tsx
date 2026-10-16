import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Cat, Clock, HandHeart, Heart, Home, Map, Navigation, ParkingCircle,
  PawPrint, ShieldCheck, Smile, Sparkles, Stethoscope, Trees, UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { TeamSection } from "@/components/sections/TeamSection";
import { Section } from "@/components/ui/Section";
import type { CityIcon, CityLanding, ClinicKey } from "@/data/cityLandings";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { breadcrumbSchema, cityPageVeterinaryCareSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";

const icons: Record<CityIcon, LucideIcon> = {
  clock: Clock, parking: ParkingCircle, trees: Trees, users: UsersRound, stethoscope: Stethoscope,
  navigation: Navigation, heart: Heart, home: Home, shield: ShieldCheck, paw: PawPrint, sparkles: Sparkles,
  cat: Cat, calendar: Calendar, map: Map, handshake: HandHeart, smile: Smile
};

const clinicData: Record<ClinicKey, { slug: string; name: string }> = {
  "fort-thomas": { slug: "vet-in-fort-thomas-ky", name: "Fort Thomas" },
  independence: { slug: "vet-in-independence-ky", name: "Independence" }
};

const serviceLinks = [
  ["Wellness exams", "/services/pet-wellness-exams/"],
  ["Vaccinations", "/services/dog-cat-vaccinations/"],
  ["Puppy & kitten care", "/services/puppy-kitten-care/"],
  ["Pet dental care", "/services/pet-dental-care/"],
  ["Spay & neuter", "/services/spay-neuter-surgery/"],
  ["Sick pet visits", "/services/sick-pet-visits/"],
  ["Diagnostics", "/services/veterinary-diagnostics/"],
  ["Senior pet care", "/services/senior-pet-care/"]
];

const ownershipChecks = [
  "Check the website footer or privacy policy for a parent company name.",
  "Look for phrases like “a proud member of” or “part of the ___ family.”",
  "Ask the front desk who owns the practice, and whether any vets are owners.",
  "Know the big brands: Banfield, VCA, and BluePearl are owned by Mars Veterinary Health."
];

const emergency = { name: "MedVet Cincinnati", area: "24/7 emergency", address: "3964 Red Bank Rd, Fairfax, OH 45227" };

function clinicFor(key: ClinicKey) {
  const location = locations.find((item) => item.slug === clinicData[key].slug)!;
  const siteLocation = site.locations.find((item) => item.id === key)!;
  return { key, location, siteLocation, name: clinicData[key].name };
}

export function CityLandingPage({ page }: { page: CityLanding }) {
  const path = `/locations/${page.slug}/`;
  const cityState = `${page.city}, ${page.state}`;
  const clinics = page.clinics.map(clinicFor);
  const primary = clinics[0];
  const multi = clinics.length > 1;

  return (
    <>
      <Hero
        eyebrow={`Vet near ${cityState}`}
        title={page.hero.title}
        emphasis={page.hero.emphasis}
        body={page.hero.body}
        image={primary.location.image}
        imageAlt={`${primary.location.imageAlt}, a vet near ${cityState}`}
        primaryCta={{ label: "Schedule a Visit", href: "/book-appointment/" }}
        secondaryCta={{ label: `Call ${primary.siteLocation.phone}`, href: `tel:${primary.siteLocation.tel}` }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          {page.strip}
        </p>
      </div>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations/" }, { label: `Vet Near ${cityState}`, href: path }]} />

      <Section tone="white" className="home-vmc-introduction">
        <div className="home-vmc-editorial">
          <div className="home-vmc-copy">
            <p className="eyebrow">{page.intro.eyebrow}</p>
            <h2>{page.intro.title} <em>{page.intro.emphasis}</em></h2>
            {page.intro.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
            <Link className="text-link" href="#clinic">{multi ? "See both clinics" : `See our ${primary.name} clinic`} →</Link>
          </div>
          <div className="home-vmc-image">
            <Image src={page.intro.image} alt={page.intro.imageAlt} fill sizes="(max-width: 760px) 100vw, 48vw" />
          </div>
        </div>
      </Section>

      <Section tone="dark" eyebrow={multi ? "Veterinary Medical Centers" : `Veterinary Medical Center of ${primary.name}`} title={<>{page.benefits.title} <em>{page.benefits.emphasis}</em></>} intro={page.benefits.intro} className="home-life-stages">
        <div className="services-pillar-grid">
          {page.benefits.cards.map(({ icon, title, text }) => {
            const Icon = icons[icon];
            return (
              <article className="home-life-stage-card" key={title}>
                <Icon aria-hidden="true" size={25} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
        <nav className="home-service-links" aria-label={`Veterinary services for ${page.city} pets`}>
          <span>Services for {page.city} pets:</span>
          {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/services/">All services →</Link>
        </nav>
      </Section>

      <Section tone="white" eyebrow="The little things" title={<>{page.promise.title} <em>{page.promise.emphasis}</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <div>
            <p>{page.promise.lead}</p>
            <p className="cincy-aside">{page.promise.aside}</p>
          </div>
          <div className="home-little-things-list">
            {page.promise.items.map(({ icon, title, text }) => {
              const Icon = icons[icon];
              return <article key={title}><span><Icon aria-hidden="true" size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>;
            })}
          </div>
        </div>
      </Section>

      <Section id="clinic" tone="cream" eyebrow={`Your ${page.city} vet, ${page.driveTime} away`} title={multi ? <>Two clinics near {page.city}. <em>Pick the easiest.</em></> : <>Come see us in <em>{primary.name}.</em></>} className="home-locations-section">
        <div className={multi ? "home-location-grid" : "cincy-clinic"}>
          {clinics.map(({ key, location, siteLocation, name }) => (
            <article className="home-location-card" key={key}>
              <div className="home-location-image">
                <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="home-location-copy">
                <h3><Link href={`/locations/${location.slug}/`}>Veterinary Medical Center of {name}</Link></h3>
                <p className="home-location-official">{page.driveTime} from {page.city}</p>
                <div className="home-location-details">
                  <address>{siteLocation.address}</address>
                  <a href={`tel:${siteLocation.tel}`}>{siteLocation.phone}</a>
                  <p className="home-location-weekday-hours">Monday–Friday <span>·</span> 8 AM–6 PM</p>
                </div>
              </div>
              <div className="inline-actions">
                <Link className="btn btn-primary" href="/book-appointment/">Schedule a Visit</Link>
                <a className="text-link" href={siteLocation.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </article>
          ))}
          {!multi && (
            <div className="cincy-map">
              <iframe src={primary.siteLocation.mapEmbedUrl} title={`Map to Veterinary Medical Center of ${primary.name} from ${page.city}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          )}
        </div>
      </Section>

      <TeamSection
        id="veterinarians"
        tone="white"
        eyebrow="Meet our veterinarians"
        title={<>The team behind your <em>{page.city} vet visits.</em></>}
        intro={`Choosing a ${page.city} vet is really choosing people. Ours bring backgrounds in general practice, emergency medicine, and feline-focused care.`}
      />

      <Section tone="cream" eyebrow="Independent vs. corporate" title={<>Is your {page.city} vet <em>locally owned?</em></>} className="cincy-corporate-section">
        <div className="cincy-check-grid city-ownership-grid">
          <div className="cincy-check">
            <p className="city-ownership-lead">Large corporate groups now own a big share of U.S. veterinary clinics, and many keep the original local name. If ownership matters to you, it&rsquo;s worth checking before you choose a vet in {page.city}.</p>
            <h3>Quick ways to tell</h3>
            <ol>
              {ownershipChecks.map((item) => <li key={item}>{item}</li>)}
            </ol>
            <p className="city-ownership-more"><Link href="/guides/independent-vs-corporate-vets/">Read our guide: independent vs. corporate vet clinics →</Link></p>
          </div>
          <aside className="cincy-vmc-owned">
            <p className="eyebrow">Veterinary Medical Centers</p>
            <h3>Independently owned. <em>No parent company.</em></h3>
            <p>Want a {page.city} vet option that answers to you, not shareholders? VMC is owned by Dr. Kristi Baker, a Northern Kentucky native who still practices here.</p>
            <Link className="btn btn-secondary" href="/about/">Our story</Link>
          </aside>
        </div>
      </Section>

      <Section tone="warm" eyebrow={`Serving ${cityState}`} title={<>{page.local.title} <em>{page.local.emphasis}</em></>} className="home-relationship-section">
        <div className="cincy-worth">
          <div>
            {page.local.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          </div>
          <aside>
            <h3>{page.local.listTitle}</h3>
            <ul>
              {page.local.nearby.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="white" eyebrow={`Other options near ${page.city}`} title={<>Comparing options for a vet in {page.city}? <em>Here are a few more.</em></>} intro={page.otherClinicsNote} className="cincy-others-section">
        <div className="cincy-others">
          {page.otherClinics.map((clinic) => (
            <article key={clinic.name}>
              <small>{clinic.area}</small>
              <h3>{clinic.name}</h3>
              <address>{clinic.address}</address>
            </article>
          ))}
          <article className="is-emergency">
            <small>{emergency.area}</small>
            <h3>{emergency.name}</h3>
            <address>{emergency.address}</address>
          </article>
        </div>
        <p className="cincy-others-note">Listings are provided for convenience; please confirm hours and details with each clinic. Still deciding on a vet in {page.city}? <Link href="/book-appointment/">Book with our locally owned team</Link> and see the difference.</p>
      </Section>

      <FAQSection faqs={page.faqs} title={`Questions from ${page.city} pet owners`} />

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Schedule a Visit</Link>
          <Link className="btn btn-ghost" href="/team/">Meet Our Veterinarians</Link>
          <a className="btn btn-ghost" href={`tel:${primary.siteLocation.tel}`}>Call {primary.siteLocation.phone}</a>
        </>}
      />

      <JsonLd
        data={[
          webpageSchema(path, page.seo.title, page.seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: `Vet Near ${cityState}`, path }]),
          faqSchema(page.faqs),
          ...clinics.slice(0, 1).map(({ siteLocation, name }) =>
            cityPageVeterinaryCareSchema({
              locationName: name,
              address: siteLocation.address,
              tel: siteLocation.tel,
              phone: siteLocation.phone,
              path,
              city: page.city,
              state: page.state
            })
          )
        ]}
      />
    </>
  );
}
