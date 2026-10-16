import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck, Calendar, Car, Cat, Clock, HandHeart, Heart, Home, Map, MapPin, Navigation, ParkingCircle,
  PawPrint, Phone, Quote, ShieldCheck, Smile, Sparkles, Star, Stethoscope, Trees, UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { TeamSection } from "@/components/sections/TeamSection";
import { Section } from "@/components/ui/Section";
import type { CityIcon } from "@/data/cityLandings";
import { cityLandings } from "@/data/cityLandings";
import type { ClinicPage } from "@/data/clinicPages";
import type { LocationPage } from "@/data/locations";
import { locations } from "@/data/locations";
import { testimonials } from "@/data/testimonials";
import { veterinarians } from "@/data/veterinarians";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";

const icons: Record<CityIcon, LucideIcon> = {
  clock: Clock, parking: ParkingCircle, trees: Trees, users: UsersRound, stethoscope: Stethoscope,
  navigation: Navigation, heart: Heart, home: Home, shield: ShieldCheck, paw: PawPrint, sparkles: Sparkles,
  cat: Cat, calendar: Calendar, map: Map, handshake: HandHeart, smile: Smile
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

const firstVisitList = [
  "Vaccine records and any previous medical records",
  "A list of current medications, food, and supplements",
  "Your questions and anything you've noticed at home",
  "Dogs on a leash, cats in a secure carrier"
];

/** Renders **bold** segments from data strings. */
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part
  );
}

export function ClinicLocationPage({
  page,
  location,
  publicLocation
}: {
  page: ClinicPage;
  location: LocationPage;
  publicLocation: { hours: readonly string[]; mapUrl: string; mapEmbedUrl: string };
}) {
  const path = `/locations/${page.slug}/`;
  const town = page.town;
  const kristi = veterinarians.find((vet) => vet.slug === "dr-kristi-baker")!;
  const hours = publicLocation.hours?.length ? publicLocation.hours : [];
  const reviews = [
    ...testimonials.filter((review) => review.location.startsWith(town)),
    ...testimonials.filter((review) => !review.location.startsWith("Fort Thomas") && !review.location.startsWith("Independence"))
  ].slice(0, 3);
  const nearbyTowns = cityLandings.filter((city) => city.clinics.includes(page.siteId));

  return (
    <>
      <Hero
        eyebrow={`Veterinary Medical Center of ${town}`}
        title={page.hero.title}
        emphasis={page.hero.emphasis}
        body={page.hero.body}
        image={location.image}
        imageAlt={`${location.imageAlt}, your local vet in ${town}, KY`}
        primaryCta={{ label: "Book an Appointment", href: "/book-appointment/" }}
        secondaryCta={{ label: `Call ${location.phone}`, href: `tel:${location.tel}` }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner clinic-strip">
          <MapPin aria-hidden="true" size={13} />
          <span>{location.address}</span>
          <span aria-hidden="true">·</span>
          <a href={`tel:${location.tel}`}>{location.phone}</a>
          <span aria-hidden="true">·</span>
          <span>Mon–Fri 8 AM–6 PM</span>
        </p>
      </div>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations/" }, { label: `Vet in ${town}, KY`, href: path }]} />

      <Section tone="white" className="home-vmc-introduction">
        <div className="home-vmc-editorial">
          <div className="home-vmc-copy">
            <p className="eyebrow">{page.welcome.eyebrow}</p>
            <h2>{page.welcome.title} <em>{page.welcome.emphasis}</em></h2>
            {page.welcome.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{rich(paragraph)}</p>)}
            <Link className="text-link" href="#visit">Plan your visit →</Link>
          </div>
          <div className="home-vmc-image">
            <Image src={page.welcome.image} alt={page.welcome.imageAlt} fill sizes="(max-width: 760px) 100vw, 48vw" />
          </div>
        </div>
      </Section>

      <Section tone="warm" className="clinic-story-section">
        <div className="clinic-story">
          <figure className="clinic-story-photo">
            <Image src={kristi.image!} alt={kristi.imageAlt} fill sizes="(max-width: 860px) 100vw, 40vw" />
            <figcaption>{kristi.name}, {kristi.credentials} · Owner</figcaption>
          </figure>
          <div className="clinic-story-copy">
            <p className="eyebrow">{page.story.eyebrow}</p>
            <h2>{page.story.title} <em>{page.story.emphasis}</em></h2>
            {page.story.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{rich(paragraph)}</p>)}
            <ul>
              {page.story.highlights.map((item) => <li key={item}><BadgeCheck aria-hidden="true" size={17} />{item}</li>)}
            </ul>
            <blockquote><Quote aria-hidden="true" size={22} />{page.story.quote}</blockquote>
            <Link className="text-link" href={`/team/${kristi.slug}/`}>Read Dr. Kristi&rsquo;s full bio →</Link>
          </div>
        </div>
      </Section>

      {page.findUs && (
        <Section tone="white" eyebrow="Local landmarks" title={<>{page.findUs.title} <em>{page.findUs.emphasis}</em></>} className="clinic-findus-section">
          <p className="clinic-findus-intro">{rich(page.findUs.intro)}</p>
          <ul className="clinic-landmarks">
            {page.findUs.landmarks.map((landmark) => (
              <li key={landmark.name}>
                <MapPin aria-hidden="true" size={18} />
                <div><strong>{landmark.name}</strong><span>{landmark.note}</span></div>
              </li>
            ))}
          </ul>
          <p className="clinic-findus-address"><strong>{location.address}</strong> · <a href={`tel:${location.tel}`}>{location.phone}</a> · <a href={publicLocation.mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps →</a></p>
        </Section>
      )}

      <Section id="visit" tone="cream" eyebrow={`Plan your visit to our ${town} vet clinic`} title={<>Visiting your vet in {town} <em>is easy.</em></>} className="clinic-visit-section">
        <div className="clinic-visit">
          <div className="clinic-visit-card">
            <h3>Veterinary Medical Center of {town}</h3>
            <p className="clinic-visit-landmarks">{page.visit.landmarks}</p>
            <dl>
              <div><dt><MapPin aria-hidden="true" size={16} /> Address</dt><dd>{location.address}</dd></div>
              <div><dt><Phone aria-hidden="true" size={16} /> Phone</dt><dd><a href={`tel:${location.tel}`}>{location.phone}</a></dd></div>
              <div><dt><Car aria-hidden="true" size={16} /> Parking</dt><dd>{page.visit.parking}</dd></div>
              <div>
                <dt><Clock aria-hidden="true" size={16} /> Hours</dt>
                <dd><ul className="clinic-hours">{hours.map((line) => <li key={line}>{line}</li>)}</ul></dd>
              </div>
            </dl>
            <h4>Getting here</h4>
            <ul className="clinic-directions">
              {page.visit.directions.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <div className="inline-actions">
              <Link className="btn btn-primary" href="/book-appointment/">Book an Appointment</Link>
              <a className="text-link" href={publicLocation.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
            </div>
          </div>
          <div className="clinic-visit-side">
            <div className="cincy-map">
              <iframe src={publicLocation.mapEmbedUrl} title={`Map to Veterinary Medical Center of ${town}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <div className="clinic-first-visit">
              <h4>Coming for the first time?</h4>
              <p>Welcome to your new vet in {town}! Here&rsquo;s what to bring:</p>
              <ul>{firstVisitList.map((item) => <li key={item}><PawPrint aria-hidden="true" size={14} />{item}</li>)}</ul>
              <Link className="text-link" href="/new-patients/">New patient guide →</Link>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="dark" eyebrow={`Your ${town} vet`} title={<>{page.why.title} <em>{page.why.emphasis}</em></>} intro={page.why.intro} className="home-life-stages">
        <div className="services-pillar-grid">
          {page.why.cards.map(({ icon, title, text }) => {
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
        <nav className="home-service-links" aria-label={`Veterinary services in ${town}`}>
          <span>Services in {town}:</span>
          {serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <Link href="/services/">All services →</Link>
        </nav>
      </Section>

      <TeamSection id="team" tone="white" eyebrow="Our veterinarians" title={<>{page.team.title} <em>{page.team.emphasis}</em></>} intro={page.team.intro} />

      <Section tone="cream" eyebrow="Kind words" title={<>What {town} families <em>are saying.</em></>} intro={`Reviews from families who trust us as their ${town} vet.`}>
        <div className="home-review-grid">
          {reviews.map((review) => (
            <article className="home-review-card" key={review.name}>
              <div className="home-review-card-top">
                <span className="home-review-heart" aria-hidden="true"><Heart size={16} fill="currentColor" /></span>
                <Quote aria-hidden="true" size={24} strokeWidth={1.6} />
              </div>
              <div className="home-review-stars" role="img" aria-label="Five star rating">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}
              </div>
              <p>&ldquo;{review.text}&rdquo;</p>
              <footer><strong>{review.name}</strong><span>{review.location}</span></footer>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="Our two locations" title={<>{page.community.title} <em>{page.community.emphasis}</em></>} className="clinic-community-section">
        <p className="clinic-two-intro">Veterinary Medical Centers has <strong>two clinics</strong> in Northern Kentucky, both locally owned and caring for dogs and cats.</p>
        <div className="clinic-two">
          {locations.map((item) => {
            const current = item.slug === page.slug;
            return (
              <article className={current ? "clinic-two-card is-current" : "clinic-two-card"} key={item.slug}>
                <small>{current ? "You're viewing" : "Our other clinic"}</small>
                <h3><Link href={`/locations/${item.slug}/`}>Veterinary Medical Center of {item.shortName}</Link></h3>
                <address>{item.address}</address>
                <a href={`tel:${item.tel}`}>{item.phone}</a>
                {!current && <Link className="text-link" href={`/locations/${item.slug}/`}>Visit the {item.shortName} page →</Link>}
              </article>
            );
          })}
        </div>

        <div className="clinic-explore">
          <h3>Exploring options near you?</h3>
          <p>{page.community.intro} Still comparing? See our <Link href="/guides/best-vets-cincinnati-northern-kentucky/">guide to the best vets in Cincinnati &amp; Northern Kentucky</Link>.</p>
          <div className="service-area-chips">
            {nearbyTowns.map((city) => (
              <Link key={city.slug} href={`/locations/${city.slug}/`}>Vet in {city.city}, KY</Link>
            ))}
            {page.siteId === "fort-thomas" && <Link href="/locations/vet-near-cincinnati-oh/">Vet in Cincinnati, OH</Link>}
          </div>
        </div>
      </Section>

      <FAQSection faqs={page.faqs} title={`Questions about your vet in ${town}`} />

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link>
          <a className="btn btn-ghost" href={`tel:${location.tel}`}>Call {location.phone}</a>
        </>}
      />

      <JsonLd
        data={[
          webpageSchema(path, page.seo.title, page.seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }, { name: `Vet in ${town}, KY`, path }]),
          faqSchema(page.faqs),
          locationVeterinaryCareSchema(location, path)
        ]}
      />
    </>
  );
}
