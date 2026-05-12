import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Car, Clock, HeartPulse, MapPin, Phone, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations, getLocation } from "@/data/locations";
import { serviceHubServices } from "@/data/serviceHub";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, serviceListSchema, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

const serviceLinks = [
  "wellness-exams",
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
  ["Request an appointment", "Call the clinic, send a message, or use the appointment request path that works best for your family."],
  ["Complete new patient forms", "Share your contact information, pet details, prior clinic details, and visit goals before you arrive."],
  ["Bring prior veterinary records", "Vaccine history, medication lists, previous exam notes, lab results, and adoption paperwork are all helpful."],
  ["Share your pet's history and concerns", "Tell us what has changed, what you are worried about, and what you want the visit to accomplish."],
  ["Meet with the veterinary team", "Your veterinarian examines your pet, answers questions, and explains what they are seeing."],
  ["Review recommendations and next steps", "You leave with practical guidance, follow-up timing, and a clear plan for your dog or cat."]
];

const resources = [
  {
    title: "New Patient Information",
    description: "Forms, first-visit guidance, and what to bring before your first VMC appointment.",
    href: "/new-patients/"
  },
  {
    title: "Veterinary Services",
    description: "Explore wellness, dental care, sick visits, diagnostics, surgery, prevention, and life-stage care.",
    href: "/services/"
  },
  {
    title: "First Vet Visit in Northern Kentucky",
    description: "A detailed guide to what your first visit should feel like at Veterinary Medical Center.",
    href: "/new-patients/"
  },
  {
    title: "Pet Dental Care",
    description: "Learn how dental exams and treatment planning support long-term comfort.",
    href: "/veterinary-services/pet-dental-care/"
  },
  {
    title: "Pet Surgery",
    description: "Review surgical consultation, preparation, monitoring, and recovery support.",
    href: "/veterinary-services/soft-tissue-surgery/"
  },
  {
    title: "Contact Veterinary Medical Center",
    description: "Call, request an appointment, ask a question, or choose the location closest to home.",
    href: "/contact/"
  }
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

export default async function LocationPage({ params }: Params) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const siteLocation = site.locations.find((item) => item.name === location.shortName) || site.locations[0];
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
      <section className="location-hero">
        <Container>
          <div className="location-hero-grid">
            <div className="location-hero-copy">
              <p className="eyebrow">Our Locations</p>
              <h1>{location.h1}</h1>
              <p>{location.heroBody}</p>
              <div className="hero-actions">
                <Button href="/contact/">Book Appointment</Button>
                <Button href={`tel:${location.tel}`} variant="ghost">Call {location.shortName}</Button>
              </div>
              <div className="location-chip-row">
                {location.trustChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
            <div className="location-hero-media">
              <Image src={location.image} alt={location.imageAlt} width={1100} height={740} sizes="(max-width: 900px) 100vw, 48vw" priority />
              <div className="location-hero-card">
                <strong>{location.shortName}</strong>
                <span>{location.address}</span>
                <a href={`tel:${location.tel}`}>{location.phone}</a>
                <small>Open Mon-Fri 8:00 AM-6:00 PM</small>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <section className="location-section location-section-white">
        <Container>
          <div className="location-layout">
            <article className="location-intro">
              <p className="eyebrow">{location.keyword}</p>
              <h2>{location.introHeading}</h2>
              {location.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
            <aside className="location-facts-card">
              <h2>Location Details</h2>
              <dl>
                <div>
                  <MapPin aria-hidden="true" size={18} />
                  <dt>Address</dt>
                  <dd>{location.address}</dd>
                </div>
                <div>
                  <Phone aria-hidden="true" size={18} />
                  <dt>Phone</dt>
                  <dd><a href={`tel:${location.tel}`}>{location.phone}</a></dd>
                </div>
                <div>
                  <Clock aria-hidden="true" size={18} />
                  <dt>Hours</dt>
                  <dd>{siteLocation.hours.join(". ")}</dd>
                </div>
                <div>
                  <Car aria-hidden="true" size={18} />
                  <dt>Parking</dt>
                  <dd>{location.quickFacts.parking}</dd>
                </div>
                <div>
                  <HeartPulse aria-hidden="true" size={18} />
                  <dt>Pets seen</dt>
                  <dd>{location.quickFacts.petsSeen}</dd>
                </div>
                <div>
                  <UsersRound aria-hidden="true" size={18} />
                  <dt>Nearby</dt>
                  <dd>{location.quickFacts.nearby}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="location-section location-section-cream">
        <Container>
          <div className="section-heading">
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

      <section className="location-section location-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Veterinary Services</p>
            <h2>{location.servicesHeading}</h2>
            <p>Our location provides full-service veterinary care for dogs and cats, with recommendations based on your pet&apos;s age, lifestyle, medical history, and current needs.</p>
          </div>
          <div className="location-service-grid">
            {locationServices.map((service) => (
              <article className="location-service-card" key={service.slug}>
                <Stethoscope aria-hidden="true" size={20} />
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <Link href={`/veterinary-services/${service.slug}/`}>{service.cta}</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="location-section location-section-cream">
        <Container>
          <div className="section-heading">
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

      <section className="location-section location-section-white">
        <Container>
          <div className="location-split">
            <div>
              <p className="eyebrow">Local Difference</p>
              <h2>{location.ownershipHeading}</h2>
              {location.ownershipCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul>
                <li>Locally owned and independently operated</li>
                <li>Care for dogs and cats</li>
                <li>Preventive, medical, dental, and surgical services</li>
                <li>Clear communication before and after visits</li>
                <li>Practical recommendations based on your pet&apos;s needs</li>
                <li>Two Northern Kentucky locations with one standard of care</li>
              </ul>
            </div>
            <aside className="location-quote-card">
              <Award aria-hidden="true" size={28} />
              <h3>Care should feel personal, clear, and rooted in a team that knows your pet over time.</h3>
              <p>Veterinary Medical Center</p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="location-section location-section-cream">
        <Container>
          <div className="location-split">
            <div>
              <p className="eyebrow">Local Ownership</p>
              <h2>{location.bakerHeading}</h2>
              {location.bakerCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="location-image-card">
              <Image src={location.image} alt={location.imageAlt} width={860} height={560} sizes="(max-width: 900px) 100vw, 46vw" />
            </div>
          </div>
        </Container>
      </section>

      <section className="location-section location-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">First Visit</p>
            <h2>What to expect at your first visit.</h2>
          </div>
          <div className="location-timeline">
            {firstVisitSteps.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Button href="/new-patients/" variant="ghost">New Patients Start Here</Button>
            <Button href="/contact/">Request Appointment</Button>
          </div>
        </Container>
      </section>

      <section className="location-section location-section-cream">
        <Container>
          <div className="location-split">
            <div>
              <p className="eyebrow">Directions & Parking</p>
              <h2>{location.directionsHeading}</h2>
              <p>{location.directionsCopy}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={siteLocation.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                <a className="btn btn-ghost" href={`tel:${location.tel}`}>Call {location.shortName}</a>
              </div>
            </div>
            <div className="location-map-embed">
              <iframe
                src={siteLocation.mapEmbedUrl}
                title={`Google Map for Veterinary Medical Center ${location.shortName}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="location-section location-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Trust</p>
            <h2>Trusted by Northern Kentucky pet families.</h2>
            <p>Pet owners choose Veterinary Medical Center because they want local care that feels personal, clear, and consistent. Our team focuses on long-term relationships, practical recommendations, and a calmer experience for dogs, cats, and their families.</p>
          </div>
          <div className="new-patient-card-grid three">
            {testimonials.slice(0, 3).map((review) => (
              <article className="new-patient-card review-mini-card" key={review.name}>
                <p className="stars" aria-label="Five star review">★★★★★</p>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
                <span>{review.location}</span>
              </article>
            ))}
          </div>
        </Container>
      </section>

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

      <section className="location-section location-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Helpful Resources</p>
            <h2>Helpful pet care resources.</h2>
          </div>
          <div className="resource-card-grid">
            {resources.map((resource) => (
              <article className="resource-card" key={resource.href}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link href={resource.href}>View resource</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection faqs={location.faqs} title={`Questions about our ${location.shortName} KY vet clinic.`} />
      <CTASection
        title={`Ready to visit our ${location.shortName} vet clinic?`}
        body={`Call our ${location.shortName} team, request an appointment online, or complete your new patient form before your first visit.`}
        primary={{ label: "Book Appointment", href: "/contact/" }}
        secondary={{ label: "New Patients Start Here", href: "/new-patients/" }}
      />
      <JsonLd
        data={[
          webpageSchema(`/locations/${location.slug}/`, location.seo.title, location.seo.description),
          locationVeterinaryCareSchema(location, `/locations/${location.slug}/`),
          serviceListSchema(locationServices.map((service) => ({ name: service.title, description: service.shortDescription, path: `/veterinary-services/${service.slug}/` }))),
          breadcrumbSchema(crumbs),
          faqSchema(location.faqs)
        ]}
      />
    </>
  );
}
