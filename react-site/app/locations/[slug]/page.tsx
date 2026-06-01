import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Car, CheckCircle, Clock, HeartPulse, MapPin, Phone, ShieldCheck, Stethoscope, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { OttoInlineWidget } from "@/components/sections/OttoInlineWidget";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations, getLocation } from "@/data/locations";
import { serviceHubServices } from "@/data/serviceHub";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, serviceListSchema, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

const serviceLinks = [
  "pet-wellness-exams",
  "dog-cat-vaccinations",
  "puppy-kitten-care",
  "senior-pet-care",
  "sick-pet-visits",
  "veterinary-diagnostics",
  "pet-dental-care",
  "spay-neuter-surgery",
  "soft-tissue-surgery",
  "parasite-prevention",
  "skin-ear-allergy-care",
  "nutrition-weight-guidance"
];

const firstVisitSteps = [
  ["Request an appointment", "Call the clinic, send a message, or use the online appointment request path that works best for your family."],
  ["Complete new patient forms", "Share your contact information, pet details, prior clinic details, and visit goals before you arrive."],
  ["Bring prior veterinary records", "Vaccine history, medication lists, previous exam notes, lab results, and adoption paperwork are all helpful."],
  ["Share your pet's history and concerns", "Tell us what has changed, what you are worried about, and what you want the visit to accomplish."],
  ["Meet with the veterinary team", "Your veterinarian examines your pet, answers questions, and explains what they are seeing."],
  ["Review recommendations and next steps", "You leave with practical guidance, follow-up timing, and a clear plan for your dog or cat."]
];

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return pageMetadata({ ...location.seo, path: `/locations/${location.slug}/`, image: location.image });
}

const OTTO_CLINIC_IDS: Record<string, string | undefined> = {
  "vet-in-fort-thomas-ky": process.env.NEXT_PUBLIC_OTTO_FORT_THOMAS_CLINIC_ID,
  "vet-in-independence-ky": process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID
};

export default async function LocationPage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const ottoClinicId = OTTO_CLINIC_IDS[location.slug];
  const settings = await getPublicSettings();
  const siteLocation =
    settings.publicLocations.find((item) => item.name === location.shortName) ||
    site.locations.find((item) => item.name === location.shortName) ||
    site.locations[0];
  const relatedLocation = locations.find((item) => item.slug === location.crossLinkSlug);
  const locationServices = serviceLinks
    .map((serviceSlug) => serviceHubServices.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof serviceHubServices)[number] => Boolean(service));

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: location.title, path: `/locations/${location.slug}/` }
  ];

  return (
    <>
      {/* Hero */}
      <section className="location-hero">
        <Container>
          <div className="location-hero-grid">
            <div className="location-hero-copy">
              <p className="eyebrow">Veterinary Medical Centers</p>
              <h1>{location.h1}</h1>
              <p>{location.heroBody}</p>
              <div className="hero-actions">
                <Button href="/book-appointment/">Book Appointment</Button>
                <Button href={`tel:${location.tel}`} variant="ghost">Call {location.shortName}</Button>
              </div>
              <div className="location-chip-row">
                {location.trustChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
            <div className="location-hero-media">
              <Image
                src={location.image}
                alt={location.imageAlt}
                width={1100}
                height={740}
                sizes="(max-width: 900px) 100vw, 48vw"
                priority
              />
              <div className="location-hero-card">
                <strong>{location.shortName}</strong>
                <span>{location.address}</span>
                <a href={`tel:${location.tel}`}>{location.phone}</a>
                <small>{siteLocation.hours[0]}</small>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      {/* Info bar */}
      <div className="location-info-bar">
        <Container>
          <div className="location-info-bar-items">
            <a className="location-info-bar-item" href={siteLocation.mapUrl} target="_blank" rel="noopener noreferrer">
              <MapPin aria-hidden="true" size={20} />
              <div>
                <strong>Address</strong>
                <span>{location.address}</span>
              </div>
            </a>
            <a className="location-info-bar-item" href={`tel:${location.tel}`}>
              <Phone aria-hidden="true" size={20} />
              <div>
                <strong>Phone</strong>
                <span>{location.phone}</span>
              </div>
            </a>
            <div className="location-info-bar-item">
              <Clock aria-hidden="true" size={20} />
              <div>
                <strong>Hours</strong>
                {siteLocation.hours.map((h) => <span key={h}>{h}</span>)}
              </div>
            </div>
            <div className="location-info-bar-item">
              <Car aria-hidden="true" size={20} />
              <div>
                <strong>Parking</strong>
                <span>{location.quickFacts.parking}</span>
              </div>
            </div>
            <div className="location-info-bar-item">
              <HeartPulse aria-hidden="true" size={20} />
              <div>
                <strong>Patients</strong>
                <span>{location.quickFacts.petsSeen}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* About this location */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-about">
            <p className="eyebrow">{location.keyword}</p>
            <h2>{location.introHeading}</h2>
            {location.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Google Map — full width */}
      <section className="location-section location-section-cream location-map-section">
        <Container>
          <div className="location-map-block">
            <div className="location-map-block-head">
              <div>
                <p className="eyebrow">Directions & Parking</p>
                <h2>{location.directionsHeading}</h2>
                <p>{location.directionsCopy}</p>
              </div>
              <div className="location-map-actions">
                <a className="btn btn-primary" href={siteLocation.mapUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
                <a className="btn btn-ghost" href={`tel:${location.tel}`}>
                  Call {location.shortName}
                </a>
              </div>
            </div>
            <div className="location-map-embed-full">
              <iframe
                src={siteLocation.mapEmbedUrl}
                title={`Google Map — Veterinary Medical Centers ${location.shortName}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Veterinary services */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">Veterinary Services</p>
            <h2>{location.servicesHeading}</h2>
            <p>Our {location.shortName} location provides full-service veterinary care for dogs and cats, with recommendations based on your pet&apos;s age, lifestyle, medical history, and current needs.</p>
          </div>
          <div className="location-service-grid">
            {locationServices.map((service) => (
              <article className="location-service-card" key={service.slug}>
                <Stethoscope aria-hidden="true" size={20} />
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <Link href={`/services/${service.slug}/`}>{service.cta}</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Why this location */}
      <section className="location-section location-section-cream">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">Why This Location</p>
            <h2>{location.whyHeading}</h2>
          </div>
          <div className="location-card-grid">
            {location.whyCards.map((card) => (
              <article className="location-benefit-card" key={card.title}>
                <ShieldCheck aria-hidden="true" size={22} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Nearby communities */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">Nearby Communities</p>
            <h2>{location.communitiesHeading}</h2>
            <p>{location.communitiesIntro}</p>
          </div>
          <div className="community-chip-grid">
            {location.communities.map((community) => (
              <span key={community}>{community}</span>
            ))}
          </div>
          <p className="location-local-search">{location.communitiesSearchCopy}</p>
        </Container>
      </section>

      {/* What makes this clinic different */}
      <section className="location-section location-section-cream">
        <Container>
          <div className="location-about">
            <p className="eyebrow">Local Difference</p>
            <h2>{location.ownershipHeading}</h2>
            {location.ownershipCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="location-feature-list">
              <li><CheckCircle aria-hidden="true" size={17} />Locally owned and independently operated</li>
              <li><CheckCircle aria-hidden="true" size={17} />Care for dogs and cats</li>
              <li><CheckCircle aria-hidden="true" size={17} />Preventive, medical, dental, and surgical services</li>
              <li><CheckCircle aria-hidden="true" size={17} />Clear communication before and after every visit</li>
              <li><CheckCircle aria-hidden="true" size={17} />Practical recommendations based on your pet&apos;s needs</li>
              <li><CheckCircle aria-hidden="true" size={17} />Two Northern Kentucky locations with one standard of care</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Team section */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-about-with-quote">
            <div className="location-about">
              <p className="eyebrow">Our Team</p>
              <h2>{location.bakerHeading}</h2>
              {location.bakerCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside className="location-quote-aside">
              <Award aria-hidden="true" size={26} />
              <blockquote>Care should feel personal, clear, and rooted in a team that knows your pet over time.</blockquote>
              <cite>Veterinary Medical Centers</cite>
            </aside>
          </div>
        </Container>
      </section>

      {/* First visit timeline — vertical */}
      <section className="location-section location-section-cream">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">First Visit</p>
            <h2>What to expect at your first visit.</h2>
            <p>New patients are welcome at our {location.shortName} location. Here is how a first visit typically works.</p>
          </div>
          <div className="location-timeline-vertical">
            {firstVisitSteps.map(([title, text], index) => (
              <article key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="hero-actions location-timeline-actions">
            <Button href="/new-patients/" variant="ghost">New Patients Start Here</Button>
            <Button href="/book-appointment/">Request Appointment</Button>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">What Pet Owners Say</p>
            <h2>Trusted by Northern Kentucky pet families.</h2>
            <p>Pet owners choose Veterinary Medical Centers because they want local care that feels personal, clear, and consistent.</p>
          </div>
          <div className="location-review-grid">
            {testimonials.slice(0, 3).map((review) => (
              <article className="location-review-card" key={review.name}>
                <div className="location-review-stars" aria-label="Five star review">
                  {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={15} />)}
                </div>
                <p>{review.text}</p>
                <footer>
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                </footer>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Otto booking widget */}
      {ottoClinicId && (
        <section className="location-section location-section-cream">
          <Container>
            <div className="location-section-head">
              <p className="eyebrow">Connect Online</p>
              <h2>Reach our {location.shortName} team.</h2>
              <p>Use the widget below to request an appointment, ask a question, or connect with our {location.shortName} team directly.</p>
            </div>
            <OttoInlineWidget clinicId={ottoClinicId} />
          </Container>
        </section>
      )}

      {/* Other location cross-link */}
      {relatedLocation && (
        <section className="location-section location-section-white">
          <Container>
            <div className="location-cross-link">
              <div>
                <p className="eyebrow">Our Other Location</p>
                <h2>{location.crossLinkHeading}</h2>
                <p>{location.crossLinkCopy}</p>
              </div>
              <Button href={`/locations/${relatedLocation.slug}/`}>{location.crossLinkCta}</Button>
            </div>
          </Container>
        </section>
      )}

      <FAQSection faqs={location.faqs} title={`Questions about our ${location.shortName} vet clinic.`} />

      <CTASection
        title={`Ready to visit our ${location.shortName} location?`}
        body={`Call our ${location.shortName} team, request an appointment online, or complete your new patient form before your first visit.`}
        primary={{ label: "Book Appointment", href: "/book-appointment/" }}
        secondary={{ label: "New Patients Start Here", href: "/new-patients/" }}
      />

      <JsonLd
        data={[
          webpageSchema(`/locations/${location.slug}/`, location.seo.title, location.seo.description),
          locationVeterinaryCareSchema(location, `/locations/${location.slug}/`),
          serviceListSchema(locationServices.map((service) => ({ name: service.title, description: service.shortDescription, path: `/services/${service.slug}/` }))),
          breadcrumbSchema(crumbs),
          faqSchema(location.faqs)
        ]}
      />
    </>
  );
}
