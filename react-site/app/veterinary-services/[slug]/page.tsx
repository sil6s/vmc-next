import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope
} from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { ServiceAppointmentDialogTrigger } from "@/components/sections/ServiceAppointmentDialogTrigger";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Separator } from "@/components/ui/separator";
import { serviceCategoryLabels } from "@/data/serviceHub";
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
import { getPublicSettings } from "@/lib/settings/public";
import { urlFor } from "@/sanity/image";
import { getRelatedServiceCards, getServiceDetail, getServiceDetailSlugs } from "@/sanity/services";

type Params = { params: Promise<{ slug: string }> };

const defaultServiceReasons = [
  { title: "Annual checkup", description: "Your pet is due for a routine exam, prevention review, or yearly health baseline." },
  { title: "New pet or adoption", description: "You recently welcomed a dog or cat and want records, vaccines, and prevention reviewed." },
  { title: "New life stage", description: "Puppies, kittens, adults, and seniors need different care plans as their needs change." },
  { title: "Ongoing monitoring", description: "Your pet has a chronic issue, medication, weight change, or follow-up concern to track." },
  { title: "Prevention planning", description: "You want clear guidance on vaccines, parasite prevention, screening, and timing." },
  { title: "Everyday questions", description: "Behavior, diet, dental health, mobility, and weight concerns can all be discussed." }
];

const defaultVisitSteps = [
  { stepTitle: "Review medical history and lifestyle", stepDescription: "We ask about records, medications, behavior, diet, travel, home routine, and what has changed since the last visit." },
  { stepTitle: "Complete a nose-to-tail physical exam", stepDescription: "Your veterinarian checks weight, teeth, skin, ears, eyes, heart, lungs, joints, comfort, and overall condition." },
  { stepTitle: "Discuss prevention and risk factors", stepDescription: "We review vaccines, parasite prevention, dental health, nutrition, and screening based on your pet's age and lifestyle." },
  { stepTitle: "Create a practical care plan", stepDescription: "You leave with clear recommendations, follow-up timing, and next steps that fit your dog or cat." },
  { stepTitle: "Answer owner questions", stepDescription: "Bring questions about behavior, food, weight, medication, senior changes, or anything you are noticing at home." }
];

const defaultIncludedCare = [
  { title: "Physical exam", description: "A full exam helps identify changes that may not be obvious at home." },
  { title: "Vaccine planning", description: "Recommendations are based on age, lifestyle, exposure risk, and local requirements." },
  { title: "Parasite prevention", description: "We discuss heartworm, fleas, ticks, intestinal parasites, and year-round options." },
  { title: "Nutrition and weight guidance", description: "Practical support for food choices, body condition, activity, and life-stage needs." },
  { title: "Dental health check", description: "The visit includes a look at teeth, gums, breath, tartar, and signs of oral discomfort." },
  { title: "Screening discussion", description: "Senior pets or pets with health changes may benefit from lab work or closer monitoring." }
];

function displayDate(date?: string) {
  if (!date) return null;
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

function serviceSpecificSeo(slug: string, fallbackTitle: string, fallbackDescription: string) {
  if (slug !== "wellness-exams") return { title: fallbackTitle, description: fallbackDescription };

  return {
    title: "Pet Wellness Exams in Northern Kentucky | VMC",
    description:
      "Schedule pet wellness exams in Northern Kentucky at VMC. Visit our Fort Thomas or Independence vet teams for preventive dog and cat care."
  };
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
  const seo = serviceSpecificSeo(
    service.slug,
    service.metaTitle || `${service.title} in Northern Kentucky | Veterinary Medical Centers`,
    service.metaDescription || service.shortDescription
  );

  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/veterinary-services/${service.slug}/`,
    image
  });
}

export default async function VeterinaryServicePage({ params }: Params) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) notFound();

  const settings = await getPublicSettings();
  const relatedServices = await getRelatedServiceCards(service);
  const updatedDate = displayDate(service.updatedAt || service.publishedAt);
  const heroImage = service.heroImageSource
    ? urlFor(service.heroImageSource).width(1300).height(980).fit("crop").url()
    : service.heroImage || "/images/veterinary-care-hero.jpg";
  const categoryLabel = serviceCategoryLabels[service.serviceCategory];
  const reasons = service.symptomsOrReasons.length >= 4 ? service.symptomsOrReasons : [...service.symptomsOrReasons, ...defaultServiceReasons].slice(0, 6);
  const visitSteps = service.whatToExpect.length >= 4 ? service.whatToExpect : [...service.whatToExpect, ...defaultVisitSteps].slice(0, 5);
  const includedCare = service.includedCare.length >= 5 ? service.includedCare : [...service.includedCare, ...defaultIncludedCare].slice(0, 6);
  const seo = serviceSpecificSeo(
    service.slug,
    service.metaTitle || service.title,
    service.metaDescription || service.shortDescription
  );

  const appointmentDialogProps = {
    portalUrl: settings.externalLinks.onlinePortalUrl,
    pharmacyUrl: settings.externalLinks.pharmacyUrl,
    liveChatEnabled: settings.liveChat.liveChatEnabled,
    locations: settings.publicLocations
  };

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Veterinary Services", path: "/services/" },
    { name: service.title, path: `/veterinary-services/${service.slug}/` }
  ];

  return (
    <>
      <section className="service-landing-hero">
        <Container>
          <div className="service-landing-hero-grid">
            <div className="service-landing-hero-copy">
              <p className="eyebrow">{service.heroEyebrow || categoryLabel}</p>
              <h1>{service.heroTitle}</h1>
              <p>{service.heroDescription}</p>
              <div className="service-landing-actions">
                <ServiceAppointmentDialogTrigger label="Book an Appointment" {...appointmentDialogProps} />
                <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Call Our Team</Button>
              </div>
              <div className="service-trust-chip-grid" aria-label="Service trust signals">
                {["Locally owned", "Fort Thomas & Independence", "Dogs & cats", categoryLabel].map((chip) => (
                  <span key={chip}><BadgeCheck aria-hidden="true" size={15} /> {chip}</span>
                ))}
              </div>
              <div className="service-landing-meta">
                <span>{categoryLabel}</span>
                {updatedDate && <span>Last updated {updatedDate}</span>}
              </div>
            </div>
            <div className="service-landing-media">
              <Image
                src={heroImage}
                alt={service.heroImageAlt || `${service.title} at Veterinary Medical Centers in Northern Kentucky`}
                width={1300}
                height={980}
                sizes="(max-width: 900px) 100vw, 48vw"
                priority
              />
              <Card className="service-hero-appointment-card">
                <CardContent>
                  <CalendarCheck aria-hidden="true" size={21} />
                  <div>
                    <strong>{service.appointmentType}</strong>
                    <span>Available in Fort Thomas and Independence.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <div className="service-landing-body">
        <Container>
          <div className="service-landing-layout">
            <main className="service-landing-main">
              <section className="service-rich-card service-overview-card">
                <div>
                  <p className="eyebrow">About This Service</p>
                  <h2>Practical {service.title.toLowerCase()} for Northern Kentucky pets.</h2>
                </div>
                <div className="service-rich-copy">
                  {service.overview?.length ? (
                    <PortableText value={service.overview} />
                  ) : (
                    service.overviewText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  )}
                </div>
              </section>

              <section className="service-section-block">
                <div className="service-section-head">
                  <p className="eyebrow">When to Schedule</p>
                  <h2>Is this service right for your pet?</h2>
                  <p>Start here if you are unsure whether this appointment matches what your dog or cat needs.</p>
                </div>
                <div className="service-scenario-grid">
                  {reasons.map((reason) => (
                    <Card className="service-scenario-card" key={`${reason.title}-${reason.description}`}>
                      <CardHeader>
                        <CheckCircle aria-hidden="true" size={20} />
                        <CardTitle>{reason.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{reason.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="service-section-block service-visit-flow">
                <div className="service-section-head">
                  <p className="eyebrow">Visit Flow</p>
                  <h2>What happens during the visit.</h2>
                  <p>Each appointment is built around clear communication, a careful exam, and practical next steps.</p>
                </div>
                <div className="service-timeline">
                  {visitSteps.map((step, index) => (
                    <article key={`${step.stepTitle}-${index}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{step.stepTitle}</h3>
                        <p>{step.stepDescription}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="service-section-block">
                <div className="service-section-head">
                  <p className="eyebrow">Included Care</p>
                  <h2>What may be included.</h2>
                  <p>Your veterinarian will tailor the visit to your pet, but these are common parts of this care path.</p>
                </div>
                <div className="service-inclusion-grid">
                  {includedCare.map((item) => (
                    <Card className="service-inclusion-card" key={`${item.title}-${item.description}`}>
                      <CardHeader>
                        <Sparkles aria-hidden="true" size={19} />
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {(service.whenToSchedule?.length || service.whenToScheduleText.length > 0) && (
                <section className="service-rich-card">
                  <div>
                    <p className="eyebrow">Timing</p>
                    <h2>When to schedule {service.title.toLowerCase()}.</h2>
                  </div>
                  <div className="service-rich-copy">
                    {service.whenToSchedule?.length ? (
                      <PortableText value={service.whenToSchedule} />
                    ) : (
                      service.whenToScheduleText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                    )}
                  </div>
                  <ServiceAppointmentDialogTrigger label="Book This Service" {...appointmentDialogProps} />
                </section>
              )}

              <section className="service-section-block">
                <div className="service-section-head">
                  <p className="eyebrow">Locations</p>
                  <h2>Choose your Veterinary Medical Centers location.</h2>
                  <p>Both locations support this service with the same practical, relationship-based care.</p>
                </div>
                <div className="service-location-grid">
                  {settings.publicLocations.map((location) => (
                    <Card className="service-location-card" key={location.id}>
                      <CardHeader>
                        <MapPin aria-hidden="true" size={21} />
                        <CardTitle>{location.name} Veterinary Medical Center</CardTitle>
                        <CardDescription>{location.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <a className="service-location-phone" href={`tel:${location.tel}`}>
                          <Phone aria-hidden="true" size={16} />
                          {location.phone}
                        </a>
                        <p><Clock aria-hidden="true" size={16} /> {location.hours[0] || "Call for current hours"}</p>
                        <div className="service-location-actions">
                          <ServiceAppointmentDialogTrigger label="Book This Location" className="service-location-book" {...appointmentDialogProps} />
                          <a className="ui-button ui-button-secondary ui-button-default" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                          <a className="ui-button ui-button-ghost ui-button-default" href={`tel:${location.tel}`}>Call Location</a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {relatedServices.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Related Services</p>
                    <h2>Helpful next steps and related care.</h2>
                    <p>These pages help pet owners compare common service paths and understand when to schedule.</p>
                  </div>
                  <div className="service-related-grid">
                    {relatedServices.slice(0, 5).map((related) => (
                      <Card className="service-related-card" key={related.slug}>
                        <CardHeader>
                          <CardTitle>{related.title}</CardTitle>
                          <CardDescription>{related.shortDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href={`/veterinary-services/${related.slug}/`}>
                            Learn more <ArrowRight aria-hidden="true" size={15} />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </main>

            <aside className="service-conversion-sidebar" aria-label="Book this service">
              <Card className="service-book-card">
                <CardHeader>
                  <span><Stethoscope aria-hidden="true" size={19} /> Book this service</span>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
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
                      <dt>Locations offered</dt>
                      <dd>{service.locationRelevance.join(", ")}</dd>
                    </div>
                  </dl>
                  <Separator />
                  <div className="service-sidebar-actions">
                    <ServiceAppointmentDialogTrigger label="Book an Appointment" {...appointmentDialogProps} />
                    {settings.publicLocations.map((location) => (
                      <a href={`tel:${location.tel}`} key={location.id}>
                        <Phone aria-hidden="true" size={15} />
                        Call {location.name}
                      </a>
                    ))}
                  </div>
                  <div className="service-sidebar-note">
                    <ShieldCheck aria-hidden="true" size={17} />
                    <p>Not sure what your pet needs? Call us and we will help you choose the safest next step.</p>
                  </div>
                  {relatedServices.length > 0 && (
                    <div className="service-sidebar-related">
                      <h3>Related services</h3>
                      {relatedServices.slice(0, 3).map((related) => (
                        <Link href={`/veterinary-services/${related.slug}/`} key={related.slug}>{related.title}</Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </div>

      {service.faqs.length > 0 && <FAQSection faqs={service.faqs} title={`Questions about ${service.title.toLowerCase()}.`} />}

      <section className="service-final-cta">
        <Container>
          <div className="service-final-cta-inner">
            <p className="eyebrow">Next Steps</p>
            <h2>Schedule {service.title.toLowerCase()} in Northern Kentucky.</h2>
            <p>Our team is here to help your dog or cat stay healthy with clear communication, compassionate handling, and practical next steps.</p>
            <div className="service-final-actions">
              <ServiceAppointmentDialogTrigger label="Book an Appointment" variant="secondary" {...appointmentDialogProps} />
              <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Call Our Team</Button>
              <Button href="/locations/" variant="ghost">View Locations</Button>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          webpageSchema(`/veterinary-services/${service.slug}/`, seo.title, seo.description),
          organizationSchema(settings),
          veterinaryServiceSchema(service, `/veterinary-services/${service.slug}/`),
          breadcrumbSchema(crumbs),
          service.faqs.length ? faqSchema(service.faqs) : null
        ].filter(Boolean)}
      />
    </>
  );
}
