import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { CalendarCheck, MapPin, Phone, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  JsonLd,
  organizationSchema,
  veterinaryServiceSchema,
  webpageSchema
} from "@/lib/schema";
import { urlFor } from "@/sanity/image";
import { getRelatedServiceCards, getServiceDetail, getServiceDetailSlugs } from "@/sanity/services";

type Params = { params: Promise<{ slug: string }> };

function displayDate(date?: string) {
  if (!date) return null;
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

export async function generateStaticParams() {
  const slugs = await getServiceDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) return {};

  const image = service.heroImageSource
    ? urlFor(service.heroImageSource).width(1200).height(630).fit("crop").url()
    : service.heroImage;

  return pageMetadata({
    title: service.metaTitle || `${service.title} in Northern Kentucky | Veterinary Medical Center`,
    description: service.metaDescription || service.shortDescription,
    path: `/veterinary-services/${service.slug}/`,
    image
  });
}

export default async function VeterinaryServicePage({ params }: Params) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) notFound();

  const relatedServices = await getRelatedServiceCards(service);
  const updatedDate = displayDate(service.updatedAt || service.publishedAt);
  const heroImage = service.heroImageSource
    ? urlFor(service.heroImageSource).width(1100).height(760).fit("crop").url()
    : service.heroImage || "/images/veterinary-care-hero.jpg";
  const primaryCTA = service.primaryCTA || { label: "Book an Appointment", href: "/contact/" };
  const secondaryCTA = service.secondaryCTA || { label: "Call Our Team", href: `tel:${site.locations[0].tel}` };

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Veterinary Services", path: "/services/" },
    { name: service.title, path: `/veterinary-services/${service.slug}/` }
  ];

  return (
    <>
      <section className="service-page-hero">
        <Container>
          <div className="service-page-hero-grid">
            <div className="service-page-hero-copy">
              <p className="eyebrow">{service.heroEyebrow || "Veterinary Services in Northern Kentucky"}</p>
              <h1>{service.heroTitle}</h1>
              <p>{service.heroDescription}</p>
              <div className="hero-actions">
                <Button href={primaryCTA.href}>{primaryCTA.label}</Button>
                <Button href={secondaryCTA.href} variant="ghost">{secondaryCTA.label}</Button>
              </div>
              <div className="service-chip-row" aria-label="Best for">
                {service.bestFor.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="service-byline">
                <p>Written by {service.author?.name || "Veterinary Medical Center of Northern Kentucky"}</p>
                {service.reviewedBy?.name && <p>Reviewed by {service.reviewedBy.name}</p>}
                {updatedDate && <p>Last updated {updatedDate}</p>}
              </div>
            </div>
            <div className="service-page-image">
              <Image
                src={heroImage}
                alt={service.heroImageAlt || `${service.title} at Veterinary Medical Center in Northern Kentucky`}
                width={1100}
                height={760}
                sizes="(max-width: 900px) 100vw, 48vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <div className="service-page-body">
        <Container>
          <div className="service-page-layout">
            <main className="service-page-main">
              <section className="service-content-card">
                <p className="eyebrow">About This Service</p>
                <h2>About {service.title}</h2>
                {service.overview?.length ? (
                  <PortableText value={service.overview} />
                ) : (
                  service.overviewText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                )}
              </section>

              {service.symptomsOrReasons.length > 0 && (
                <section className="service-content-card">
                  <p className="eyebrow">When to Schedule</p>
                  <h2>When this service may help.</h2>
                  <div className="service-reason-grid">
                    {service.symptomsOrReasons.map((reason) => (
                      <article key={reason.title}>
                        <h3>{reason.title}</h3>
                        <p>{reason.description}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {service.whatToExpect.length > 0 && (
                <section className="service-content-card">
                  <p className="eyebrow">Visit Flow</p>
                  <h2>What to expect during your pet&apos;s visit.</h2>
                  <div className="service-step-list">
                    {service.whatToExpect.map((step, index) => (
                      <article key={step.stepTitle}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{step.stepTitle}</h3>
                          <p>{step.stepDescription}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {service.includedCare.length > 0 && (
                <section className="service-content-card">
                  <p className="eyebrow">Included Care</p>
                  <h2>What may be included.</h2>
                  <div className="service-included-grid">
                    {service.includedCare.map((item) => (
                      <article key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {(service.whenToSchedule?.length || service.whenToScheduleText.length > 0) && (
                <section className="service-content-card">
                  <p className="eyebrow">Timing</p>
                  <h2>When to schedule {service.title.toLowerCase()}.</h2>
                  {service.whenToSchedule?.length ? (
                    <PortableText value={service.whenToSchedule} />
                  ) : (
                    service.whenToScheduleText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  )}
                </section>
              )}

              <section className="service-content-card">
                <p className="eyebrow">Locations</p>
                <h2>Available at our Fort Thomas and Independence veterinary locations.</h2>
                <div className="services-location-grid">
                  {locations.map((location) => (
                    <article className="services-location-card compact-location-card" key={location.slug}>
                      <MapPin aria-hidden="true" size={22} />
                      <h3>{location.slug === "fort-thomas" ? "Fort Thomas Veterinary Medical Center" : "Independence Veterinary Medical Center"}</h3>
                      <address>{location.address}</address>
                      <a className="services-phone" href={`tel:${location.tel}`}>
                        <Phone aria-hidden="true" size={16} />
                        {location.phone}
                      </a>
                      <div className="inline-actions">
                        <Link className="btn btn-primary" href={`/locations/${location.slug}/`}>Book This Location</Link>
                        <a className="btn btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                          Get Directions
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {relatedServices.length > 0 && (
                <section className="service-content-card">
                  <p className="eyebrow">Related Services</p>
                  <h2>Related veterinary services.</h2>
                  <div className="related-service-grid">
                    {relatedServices.slice(0, 4).map((related) => (
                      <article className="resource-card" key={related.slug}>
                        <h3>{related.title}</h3>
                        <p>{related.shortDescription}</p>
                        <Link href={`/veterinary-services/${related.slug}/`}>View service</Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </main>

            <aside className="service-sidebar" aria-label="Quick service details">
              <div className="quick-details-card">
                <Stethoscope aria-hidden="true" size={24} />
                <h2>Quick Details</h2>
                <dl>
                  <div>
                    <dt>Best for</dt>
                    <dd>{service.bestFor.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>Appointment type</dt>
                    <dd>{service.appointmentType}</dd>
                  </div>
                  <div>
                    <dt>Locations</dt>
                    <dd>{service.locationRelevance.join(", ")}</dd>
                  </div>
                </dl>
                {relatedServices.length > 0 && (
                  <div className="quick-related">
                    <h3>Related services</h3>
                    {relatedServices.slice(0, 3).map((related) => (
                      <Link href={`/veterinary-services/${related.slug}/`} key={related.slug}>{related.title}</Link>
                    ))}
                  </div>
                )}
                <Button href={primaryCTA.href}>Book an Appointment</Button>
                <a className="quick-phone" href={`tel:${site.locations[0].tel}`}>
                  <CalendarCheck aria-hidden="true" size={16} />
                  Call our team
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {service.faqs.length > 0 && <FAQSection faqs={service.faqs} title={`Questions about ${service.title.toLowerCase()}.`} />}
      <CTASection
        title={`Schedule ${service.title} in Northern Kentucky.`}
        body="Our team is here to help your dog or cat get the care they need with clear communication, compassionate handling, and practical next steps."
        primary={{ label: "Book an Appointment", href: "/contact/" }}
        secondary={{ label: "Call Our Team", href: `tel:${site.locations[0].tel}` }}
      />
      <JsonLd
        data={[
          webpageSchema(`/veterinary-services/${service.slug}/`, service.metaTitle || service.title, service.metaDescription || service.shortDescription),
          organizationSchema(),
          veterinaryServiceSchema(service, `/veterinary-services/${service.slug}/`),
          breadcrumbSchema(crumbs),
          service.faqs.length ? faqSchema(service.faqs) : null
        ].filter(Boolean)}
      />
    </>
  );
}
