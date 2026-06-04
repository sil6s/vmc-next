import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Award, BookOpenText, Car, CheckCircle, Clock, ExternalLink, HeartPulse, MapPin, Navigation, Phone, ShieldCheck, Sparkles, Star, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { OttoInlineWidget } from "@/components/sections/OttoInlineWidget";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations, getLocation } from "@/data/locations";
import { getCityPage, getCityPageSlugs } from "@/data/cityPages";
import type { CityPage } from "@/data/cityPages";
import { serviceHubServices } from "@/data/serviceHub";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, cityPageVeterinaryCareSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, serviceListSchema, webpageSchema } from "@/lib/schema";
import { getBlogPosts } from "@/sanity/posts";

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
  ["Request an appointment", "Call the clinic, send a message, or use the online appointment request."],
  ["Complete new patient forms", "Share your contact info, pet details, prior clinic, and visit goals before you arrive."],
  ["Bring prior veterinary records", "Vaccine history, medications, lab results, and adoption paperwork all help."],
  ["Share your pet's history and concerns", "Tell us what changed, what worries you, and what you want the visit to accomplish."],
  ["Meet with the veterinary team", "Your veterinarian examines your pet, explains findings, and answers questions."],
  ["Leave with a clear care plan", "You leave with practical guidance, follow-up timing, and a clear plan for your pet."]
];

export function generateStaticParams() {
  const locationSlugs = locations.map((location) => ({ slug: location.slug }));
  const citySlugs = getCityPageSlugs().map((slug) => ({ slug }));
  return [...locationSlugs, ...citySlugs];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (location) {
    return pageMetadata({ ...location.seo, path: `/locations/${location.slug}/`, image: location.image });
  }
  const cityPage = getCityPage(slug);
  if (cityPage) {
    return pageMetadata({
      title: cityPage.seo.title,
      description: cityPage.seo.description,
      path: `${cityPage.canonicalPath}/`
    });
  }
  return {};
}

const OTTO_CLINIC_IDS: Record<string, string | undefined> = {
  "vet-in-fort-thomas-ky": process.env.NEXT_PUBLIC_OTTO_FORT_THOMAS_CLINIC_ID,
  "vet-in-independence-ky": process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID
};

// ── City SEO page service slugs ──────────────────────────────────────────────
const citySeoServiceSlugs = [
  "pet-wellness-exams",
  "dog-cat-vaccinations",
  "puppy-kitten-care",
  "senior-pet-care",
  "sick-pet-visits",
  "pet-dental-care",
  "spay-neuter-surgery",
  "soft-tissue-surgery",
  "veterinary-diagnostics",
  "microchipping"
];

const googleReviewUrls: Record<string, string> = {
  "Fort Thomas": "https://www.google.com/search?q=Veterinary+Medical+Centers+Fort+Thomas+KY+reviews",
  Independence: "https://www.google.com/search?q=Veterinary+Medical+Centers+Independence+KY+reviews"
};

async function CityPageView({ cityPage }: { cityPage: CityPage }) {
  const services = citySeoServiceSlugs
    .map((s) => serviceHubServices.find((svc) => svc.slug === s))
    .filter((s): s is (typeof serviceHubServices)[number] => Boolean(s));

  const path = `${cityPage.canonicalPath}/`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: cityPage.h1, path }
  ];

  const reviewUrl = googleReviewUrls[cityPage.nearest.location] ?? googleReviewUrls["Fort Thomas"];
  const leaveReviewUrl = cityPage.nearest.location === "Independence"
    ? "https://g.page/r/VMCIndependence/review"
    : "https://g.page/r/VMCFortThomas/review";

  const isPrimaryLocation = cityPage.pageType === "primary_location";
  const locationLabel = cityPage.nearest.location === "Independence"
    ? "Independence"
    : "Fort Thomas";

  return (
    <>
      {/* ── Hero ── */}
      <section className="city-seo-hero">
        <Container>
          <div className="city-seo-hero-inner">
            <div className="city-seo-hero-copy">
              <p className="eyebrow">Veterinary Medical Centers — Northern Kentucky</p>
              <h1>{cityPage.h1}</h1>
              <p className="city-seo-hero-intro">{cityPage.introParagraph}</p>
              <div className="hero-actions">
                <Button href="/book-appointment/">Request an Appointment</Button>
                <Button href={`tel:${cityPage.nearest.tel}`} variant="ghost">
                  Call {locationLabel}
                </Button>
              </div>
            </div>
            <aside className="city-seo-location-card">
              <p className="eyebrow">Closest VMC location</p>
              <strong>Veterinary Medical Centers of {locationLabel}</strong>
              <address>
                <MapPin aria-hidden="true" size={15} />
                {cityPage.nearest.address}
              </address>
              <a href={`tel:${cityPage.nearest.tel}`}>
                <Phone aria-hidden="true" size={15} />
                {cityPage.nearest.phone}
              </a>
              {!isPrimaryLocation && (
                <p className="city-seo-distance">
                  About {cityPage.nearest.miles} miles away
                </p>
              )}
              <div className="city-seo-card-actions">
                <Button href="/book-appointment/">Book Appointment</Button>
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cityPage.nearest.address)}`}
                  variant="ghost"
                >
                  Get Directions
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((c) => ({ label: c.name, href: c.path }))} />

      {/* ── Vet Care Near City ── */}
      <section className="city-seo-section city-seo-section-white">
        <Container>
          <div className="city-seo-content-block">
            <h2>{cityPage.vetCareSection.heading}</h2>
            <p>{cityPage.vetCareSection.body}</p>
          </div>
        </Container>
      </section>

      {/* ── Cincinnati angle (when applicable) ── */}
      {cityPage.cincinnatAngle && (
        <section className="city-seo-section city-seo-section-cream">
          <Container>
            <div className="city-seo-cincinnati-bar">
              <Navigation aria-hidden="true" size={20} />
              <div>
                <strong>Easier access than downtown Cincinnati</strong>
                <p>{cityPage.cincinnatAngle}</p>
              </div>
              <div className="city-seo-cincinnati-pills">
                <span><CheckCircle aria-hidden="true" size={14} /> On-site parking</span>
                <span><CheckCircle aria-hidden="true" size={14} /> Off I-471 North, Exit 5</span>
                <span><CheckCircle aria-hidden="true" size={14} /> Locally owned</span>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── Services ── */}
      <section className="city-seo-section city-seo-section-white">
        <Container>
          <div className="city-seo-section-head">
            <p className="eyebrow">Veterinary Services</p>
            <h2>Dog and cat services available near {cityPage.city}</h2>
            <p>
              Full-service care for dogs and cats — from wellness visits and vaccines to dental care, diagnostics, surgery, and senior pet support.
            </p>
          </div>
          <div className="city-seo-service-grid">
            {services.map((service) => (
              <article className="city-seo-service-card" key={service.slug}>
                <Stethoscope aria-hidden="true" size={18} />
                <h3>
                  <Link href={`/services/${service.slug}/`}>{service.title}</Link>
                </h3>
                <p>{service.shortDescription}</p>
              </article>
            ))}
          </div>
          <p className="city-seo-service-footer">
            <Link href="/services/">Browse all veterinary services →</Link>
          </p>
        </Container>
      </section>

      {/* ── Local context ── */}
      <section className="city-seo-section city-seo-section-cream">
        <Container>
          <div className="city-seo-content-block">
            <p className="eyebrow">Local Care</p>
            <h2>{cityPage.localSection.heading}</h2>
            <p>{cityPage.localSection.body}</p>
          </div>
        </Container>
      </section>

      {/* ── Why VMC ── */}
      <section className="city-seo-section city-seo-section-white">
        <Container>
          <div className="city-seo-section-head">
            <p className="eyebrow">Why VMC</p>
            <h2>Why pet owners near {cityPage.city} choose Veterinary Medical Centers</h2>
          </div>
          <ul className="city-seo-why-list">
            {cityPage.whyChoosePoints.map((point) => (
              <li key={point}>
                <CheckCircle aria-hidden="true" size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="city-seo-why-footer hero-actions">
            <Button href="/book-appointment/">Request an Appointment</Button>
            <Button href="/new-patients/" variant="ghost">New Patient Information</Button>
          </div>
        </Container>
      </section>

      {/* ── Pawstimonials ── */}
      <section className="city-seo-section city-seo-section-cream">
        <Container>
          <div className="city-seo-section-head">
            <p className="eyebrow">Pawstimonials</p>
            <h2>Pawstimonials from pets and their people</h2>
            <p>{cityPage.fallbackCopy}</p>
          </div>
          <div className="city-seo-review-grid">
            {testimonials.slice(0, 3).map((review) => (
              <article className="city-seo-review-card" key={review.name}>
                <div className="city-seo-review-stars" role="img" aria-label="Five star rating">
                  {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={14} />)}
                </div>
                <p>{review.text}</p>
                <footer>
                  <strong>{review.name}</strong>
                  <span>{review.location}</span>
                  <span className="city-seo-review-source">Google review</span>
                </footer>
              </article>
            ))}
          </div>
          <div className="city-seo-review-actions hero-actions">
            <a className="btn btn-ghost" href={reviewUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden="true" size={15} />
              Read Google Reviews
            </a>
            <a className="btn btn-ghost" href={leaveReviewUrl} target="_blank" rel="noopener noreferrer">
              Leave a Review
            </a>
          </div>
        </Container>
      </section>

      {/* ── FAQs ── */}
      <FAQSection faqs={cityPage.faqs} title={`Common questions about vet care near ${cityPage.city}`} />

      {/* ── CTA ── */}
      <CTASection
        title={`Ready to schedule care near ${cityPage.city}?`}
        body={`Call our ${locationLabel} team, request an appointment online, or complete new patient forms before your first visit.`}
        primary={{ label: "Request an Appointment", href: "/book-appointment/" }}
        secondary={{ label: "New Patient Information", href: "/new-patients/" }}
      />

      <JsonLd
        data={[
          webpageSchema(path, cityPage.seo.title, cityPage.seo.description),
          cityPageVeterinaryCareSchema({
            locationName: cityPage.nearest.location,
            address: cityPage.nearest.address,
            tel: cityPage.nearest.tel,
            phone: cityPage.nearest.phone,
            path,
            city: cityPage.city,
            state: cityPage.state
          }),
          breadcrumbSchema(crumbs),
          faqSchema(cityPage.faqs)
        ]}
      />
    </>
  );
}

export default async function LocationPage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) {
    const cityPage = getCityPage(slug);
    if (!cityPage) notFound();
    return <CityPageView cityPage={cityPage} />;
  }

  const ottoClinicId = OTTO_CLINIC_IDS[location.slug];
  const [settings, resourcePosts] = await Promise.all([getPublicSettings(), getBlogPosts(8)]);
  const siteLocation =
    settings.publicLocations.find((item) => item.name === location.shortName) ||
    site.locations.find((item) => item.name === location.shortName) ||
    site.locations[0];
  const relatedLocation = locations.find((item) => item.slug === location.crossLinkSlug);
  const locationServices = serviceLinks
    .map((serviceSlug) => serviceHubServices.find((service) => service.slug === serviceSlug))
    .filter((service): service is (typeof serviceHubServices)[number] => Boolean(service));
  const locationResources = resourcePosts.slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: location.title, path: `/locations/${location.slug}/` }
  ];

  return (
    <>
      {/* ── Hero ── */}
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
                {location.trustChips.map((chip) => <span key={chip}>{chip}</span>)}
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

      {/* ── About This Location ── */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-about">
            <p className="eyebrow">{location.keyword}</p>
            <h2>{location.introHeading}</h2>
            {location.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </Container>
      </section>

      {/* ── Clinic Details ── */}
      <section className="location-section location-section-cream">
        <Container>
          <div className="location-section-head location-details-head">
            <p className="eyebrow">Visit Information</p>
            <h2>Plan your visit to our {location.shortName} clinic.</h2>
            <p>Each detail gets its own row so it is easy to scan before you call, drive over, or schedule your first appointment.</p>
          </div>
          <div className="location-details-grid">

            {/* Address */}
            <div className="location-detail-row">
              <div className="location-detail-icon">
                <MapPin aria-hidden="true" size={20} />
              </div>
              <div className="location-detail-content">
                <h3>Address</h3>
                <p>{location.address}</p>
                <ul className="location-detail-bullets">
                  <li>Easy clinic access for local pet families</li>
                  <li>{location.quickFacts.nearby}</li>
                </ul>
                <a
                  href={siteLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-detail-link"
                >
                  <Navigation aria-hidden="true" size={14} />
                  Get directions
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="location-detail-row">
              <div className="location-detail-icon">
                <Phone aria-hidden="true" size={20} />
              </div>
              <div className="location-detail-content">
                <h3>Phone</h3>
                <a href={`tel:${location.tel}`} className="location-detail-phone">{location.phone}</a>
                <p className="location-detail-note">Call for appointments, urgent questions, and same-day availability.</p>
                <ul className="location-detail-bullets">
                  <li>Best first step if your pet is sick or symptoms are changing</li>
                  <li>Our team can help you choose the right appointment type</li>
                </ul>
              </div>
            </div>

            {/* Hours */}
            <div className="location-detail-row">
              <div className="location-detail-icon">
                <Clock aria-hidden="true" size={20} />
              </div>
              <div className="location-detail-content">
                <h3>Hours</h3>
                <ul className="location-hours-list">
                  {siteLocation.hours.map((h) => <li key={h}>{h}</li>)}
                </ul>
                <p className="location-detail-note">Saturday availability may rotate. Call ahead before planning a weekend visit.</p>
              </div>
            </div>

            {/* Parking */}
            <div className="location-detail-row">
              <div className="location-detail-icon">
                <Car aria-hidden="true" size={20} />
              </div>
              <div className="location-detail-content">
                <h3>Parking</h3>
                <p>{location.quickFacts.parking}</p>
                <ul className="location-detail-bullets">
                  <li>Pull in close to the clinic instead of searching for street parking</li>
                  <li>Helpful for senior pets, cats in carriers, and nervous dogs</li>
                </ul>
              </div>
            </div>

            {/* Patients */}
            <div className="location-detail-row">
              <div className="location-detail-icon">
                <HeartPulse aria-hidden="true" size={20} />
              </div>
              <div className="location-detail-content">
                <h3>Patients Seen</h3>
                <p>{location.quickFacts.petsSeen}</p>
                <ul className="location-detail-bullets">
                  <li>{location.quickFacts.mainServices}</li>
                  <li>Relationship-based care from puppy and kitten visits through senior pet support</li>
                </ul>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Google Map ── */}
      <section className="location-section location-section-white location-map-section">
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
                <a className="btn btn-ghost" href={`tel:${location.tel}`}>Call {location.shortName}</a>
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

      {/* ── Cincinnati CTA (Fort Thomas only) ── */}
      {location.cincinnatiCta && (
        <section className="location-section location-section-cream">
          <Container>
            <div className="location-cincinnati-cta">
              <div className="location-cincinnati-copy">
                <p className="eyebrow">{location.cincinnatiCta.subhead}</p>
                <h2>{location.cincinnatiCta.headline}</h2>
                <p>{location.cincinnatiCta.body}</p>
                <div className="location-cincinnati-tip">
                  <Navigation aria-hidden="true" size={16} />
                  <span>{location.cincinnatiCta.tip}</span>
                </div>
                <div className="hero-actions">
                  <Button href="/book-appointment/">Book an Appointment</Button>
                  <Button href={siteLocation.mapUrl} variant="ghost">Get Directions</Button>
                </div>
              </div>
              <aside className="location-cincinnati-card">
                <Sparkles aria-hidden="true" size={24} />
                <h3>Why Fort Thomas?</h3>
                <ul>
                  <li><CheckCircle aria-hidden="true" size={15} /> On-site parking — no meters or street hunting</li>
                  <li><CheckCircle aria-hidden="true" size={15} /> ~10 minutes from downtown Cincinnati</li>
                  <li><CheckCircle aria-hidden="true" size={15} /> Off I-471 N, Exit 5 — easy in and out</li>
                  <li><CheckCircle aria-hidden="true" size={15} /> Locally owned, not a corporate chain</li>
                  <li><CheckCircle aria-hidden="true" size={15} /> Dogs and cats of all ages welcome</li>
                </ul>
              </aside>
            </div>
          </Container>
        </section>
      )}

      {/* ── Veterinary Services ── */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">Veterinary Services</p>
            <h2>{location.servicesHeading}</h2>
            <p>Full-service care for dogs and cats — from wellness visits and vaccines to dental care, diagnostics, surgery consultations, and senior pet support.</p>
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

      {/* ── Why This Clinic ── */}
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

      {/* ── Personal Story / Locally Owned ── */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-personal-grid">
            <div className="location-about">
              <p className="eyebrow">Locally & Independently Owned</p>
              <h2>{location.personalStoryHeading}</h2>
              {location.personalStory.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <aside className="location-highlights-card">
              <Award aria-hidden="true" size={24} />
              <h3>What this means for your pet</h3>
              <ul className="location-feature-list">
                {location.personalHighlights.map((item) => (
                  <li key={item}>
                    <CheckCircle aria-hidden="true" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Nearby Communities ── */}
      <section className="location-section location-section-cream">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">Nearby Communities</p>
            <h2>{location.communitiesHeading}</h2>
            <p>{location.communitiesIntro}</p>
          </div>
          <div className="community-chip-grid">
            {location.communities.map((community) => <span key={community}>{community}</span>)}
          </div>
          <p className="location-local-search">{location.communitiesSearchCopy}</p>
        </Container>
      </section>

      {/* ── First Visit ── */}
      <section className="location-section location-section-white">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">First Visit</p>
            <h2>What to expect at your first visit.</h2>
            <p>New patients are welcome at our {location.shortName} location. Here is how a first appointment typically works.</p>
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
            <Button href="/new-patients/" variant="ghost">New Patient Information</Button>
            <Button href="/book-appointment/">Request Appointment</Button>
          </div>
        </Container>
      </section>

      {/* ── Reviews ── */}
      <section className="location-section location-section-cream">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">What Pet Owners Say</p>
            <h2>Trusted by Northern Kentucky pet families.</h2>
            <p>Pet owners choose Veterinary Medical Centers because they want local care that feels personal, clear, and consistent.</p>
          </div>
          <div className="location-review-grid">
            {testimonials.slice(0, 3).map((review) => (
              <article className="location-review-card" key={review.name}>
                <div className="location-review-stars" role="img" aria-label="Five star rating">
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

      {/* ── Otto Booking Widget ── */}
      {ottoClinicId && (
        <section className="location-section location-section-white">
          <Container>
            <div className="location-section-head">
              <p className="eyebrow">Connect Online</p>
              <h2>Reach our {location.shortName} team.</h2>
              <p>Request an appointment, ask a question, or connect with our {location.shortName} team directly.</p>
            </div>
            <OttoInlineWidget clinicId={ottoClinicId} />
          </Container>
        </section>
      )}

      {/* ── Other Location Cross-Link ── */}
      {relatedLocation && (
        <section className="location-section location-section-cream">
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

      {/* ── Related Resources ── */}
      {locationResources.length > 0 && (
        <section className="location-section location-section-white">
          <Container>
            <div className="location-section-head">
              <p className="eyebrow">Pet Care Resources</p>
              <h2>Helpful guides before or after your {location.shortName} visit.</h2>
              <p>Browse practical education from the Veterinary Medical Centers team, then call us if you want help applying it to your pet.</p>
            </div>
            <div className="location-resource-grid">
              {locationResources.map((post) => (
                <article className="location-resource-card" key={post.slug}>
                  <BookOpenText aria-hidden="true" size={20} />
                  <p className="eyebrow">{post.category}</p>
                  <h3>
                    <Link href={`/resources/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                  <Link href={`/resources/${post.slug}/`}>
                    Read resource <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <FAQSection faqs={location.faqs} title={`Questions about our ${location.shortName} vet clinic.`} />

      <CTASection
        title={`Ready to visit our ${location.shortName} location?`}
        body={`Call our ${location.shortName} team, request an appointment online, or complete your new patient form before your first visit.`}
        primary={{ label: "Book Appointment", href: "/book-appointment/" }}
        secondary={{ label: "New Patient Information", href: "/new-patients/" }}
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
