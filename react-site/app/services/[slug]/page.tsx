import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle,
  Clock,
  ExternalLink,
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
import { serviceCategoryLabels, type ServiceTable } from "@/data/serviceHub";
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

const defaultTrustChips = ["Dogs & cats", "New patients welcome", "Fort Thomas", "Independence", "Locally owned"];

function displayDate(date?: string) {
  if (!date) return null;
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

function tableIsRenderable(table?: ServiceTable) {
  return Boolean(table?.columns?.length && table.rows?.length);
}

function ServiceDataTable({ table }: { table: ServiceTable }) {
  return (
    <div className="service-data-table-wrap">
      {table.title && <h3>{table.title}</h3>}
      <div className="service-data-table-scroll">
        <table className="service-data-table">
          <thead>
            <tr>
              {table.columns.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${row.cells.join("-")}-${rowIndex}`}>
                {table.columns.map((column, cellIndex) => <td key={`${column}-${cellIndex}`}>{row.cells[cellIndex] || ""}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    }
  }
};

export async function generateStaticParams() {
  const slugs = await getServiceDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) return {};

  const imageSource = service.openGraphImage || service.heroImageSource;
  const image = imageSource ? urlFor(imageSource).width(1200).height(630).fit("crop").url() : service.heroImage;
  const title = service.metaTitle || `${service.title} in Northern Kentucky | Veterinary Medical Centers`;
  const description = service.metaDescription || service.shortDescription;

  return {
    ...pageMetadata({
      title,
      description,
      path: `/services/${service.slug}/`,
      image,
      canonicalUrl: service.canonicalUrl
    }),
    robots: {
      index: !service.noindex,
      follow: true
    }
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) notFound();

  const settings = await getPublicSettings();
  const relatedServices = await getRelatedServiceCards(service);
  const updatedDate = displayDate(service.lastReviewedDate || service.updatedAt || service.publishedAt);
  const heroImage = service.heroImageSource
    ? urlFor(service.heroImageSource).width(1300).height(980).fit("crop").url()
    : service.heroImage || "/images/veterinary-care-hero.jpg";
  const categoryLabel = serviceCategoryLabels[service.serviceCategory];
  const benefits = service.keyBenefits?.length ? service.keyBenefits : service.includedCare;
  const approachCards = service.careApproachCards?.length ? service.careApproachCards : service.includedCare;
  const finalButtons = service.finalCtaButtons?.length
    ? service.finalCtaButtons
    : [
        { label: "Request an Appointment", href: "/book-appointment/" },
        { label: "Call Fort Thomas", href: `tel:${site.locations[0].tel}` },
        { label: "Call Independence", href: `tel:${site.locations[1].tel}` }
      ];
  const appointmentDialogProps = {
    portalUrl: settings.externalLinks.onlinePortalUrl,
    pharmacyUrl: settings.externalLinks.pharmacyUrl,
    liveChatEnabled: settings.liveChat.liveChatEnabled,
    locations: settings.publicLocations
  };
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.title, path: `/services/${service.slug}/` }
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
                <Button href={service.primaryCTA?.href || "/book-appointment/"}>{service.primaryCTA?.label || "Request an Appointment"}</Button>
                <Button href={service.secondaryCTA?.href || "/new-patients/"} variant="ghost">{service.secondaryCTA?.label || "New Patients"}</Button>
              </div>
              <div className="service-trust-chip-grid" aria-label="Service trust signals">
                {defaultTrustChips.map((chip) => (
                  <span key={chip}><BadgeCheck aria-hidden="true" size={15} /> {chip}</span>
                ))}
              </div>
              <div className="service-landing-meta">
                <span>{categoryLabel}</span>
                {updatedDate && <span>Reviewed {updatedDate}</span>}
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
                    <strong>{service.title}</strong>
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
                  <p className="eyebrow">Quick Summary</p>
                  <h2>What this service helps with.</h2>
                </div>
                <div className="service-rich-copy">
                  <p>{service.fullDescription || service.shortDescription}</p>
                  <p>Veterinary Medical Centers serves dogs and cats from Fort Thomas, Independence, and nearby Northern Kentucky communities with practical guidance and calm communication.</p>
                </div>
              </section>

              {benefits.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Best For</p>
                    <h2>Helpful reasons families choose this care.</h2>
                  </div>
                  <div className="service-scenario-grid">
                    {benefits.slice(0, 6).map((item) => (
                      <Card className="service-scenario-card" key={`${item.title}-${item.description}`}>
                        <CardHeader>
                          <CheckCircle aria-hidden="true" size={20} />
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent><p>{item.description}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              <section className="service-rich-card service-main-content">
                <div>
                  <p className="eyebrow">Guide</p>
                  <h2>{service.title} at Veterinary Medical Centers.</h2>
                </div>
                <div className="service-rich-copy">
                  {service.overview?.length ? (
                    <PortableText value={service.overview} components={portableComponents} />
                  ) : (
                    service.overviewText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                  )}
                </div>
              </section>

              {service.symptomsOrReasons.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">When to Schedule</p>
                    <h2>Signs this appointment may be the right next step.</h2>
                  </div>
                  <div className="service-scenario-grid">
                    {service.symptomsOrReasons.map((reason) => (
                      <Card className="service-scenario-card" key={`${reason.title}-${reason.description}`}>
                        <CardHeader>
                          <CheckCircle aria-hidden="true" size={20} />
                          <CardTitle>{reason.title}</CardTitle>
                        </CardHeader>
                        <CardContent><p>{reason.description}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {service.whatToExpect.length > 0 && (
                <section className="service-section-block service-visit-flow">
                  <div className="service-section-head">
                    <p className="eyebrow">What to Expect</p>
                    <h2>How the visit usually works.</h2>
                  </div>
                  <div className="service-timeline">
                    {service.whatToExpect.map((step, index) => (
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
              )}

              {(tableIsRenderable(service.comparisonTable) || tableIsRenderable(service.contentTable) || Boolean(service.timelineBlocks?.length)) && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Helpful Chart</p>
                    <h2>A simple way to compare next steps.</h2>
                  </div>
                  {tableIsRenderable(service.comparisonTable) && <ServiceDataTable table={service.comparisonTable as ServiceTable} />}
                  {tableIsRenderable(service.contentTable) && <ServiceDataTable table={service.contentTable as ServiceTable} />}
                  {service.timelineBlocks?.length ? (
                    <div className="service-timeline service-mini-timeline">
                      {service.timelineBlocks.map((block, index) => (
                        <article key={`${block.title}-${index}`}>
                          <span>{block.label || String(index + 1).padStart(2, "0")}</span>
                          <div>
                            <h3>{block.title}</h3>
                            <p>{block.description}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              )}

              {approachCards.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Our Approach</p>
                    <h2>Care that feels clear, local, and practical.</h2>
                  </div>
                  <div className="service-inclusion-grid">
                    {approachCards.slice(0, 6).map((item) => (
                      <Card className="service-inclusion-card" key={`${item.title}-${item.description}`}>
                        <CardHeader>
                          <Sparkles aria-hidden="true" size={19} />
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent><p>{item.description}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {service.calloutBlocks?.length ? (
                <section className="service-callout-grid" aria-label="Helpful service notes">
                  {service.calloutBlocks.map((callout) => (
                    <article key={`${callout.title}-${callout.text}`}>
                      <span>{callout.tone || "Helpful note"}</span>
                      <h3>{callout.title}</h3>
                      <p>{callout.text}</p>
                    </article>
                  ))}
                </section>
              ) : null}

              <section className="service-section-block">
                <div className="service-section-head">
                  <p className="eyebrow">Locations</p>
                  <h2>Choose your Veterinary Medical Centers location.</h2>
                  <p>Both locations support dogs and cats with relationship-based care for Northern Kentucky families.</p>
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
                          <ServiceAppointmentDialogTrigger label="Request an Appointment" className="service-location-book" {...appointmentDialogProps} />
                          <a className="ui-button ui-button-secondary ui-button-default" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                          <a className="ui-button ui-button-ghost ui-button-default" href={`tel:${location.tel}`}>Call {location.name}</a>
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
                    <h2>Helpful services to compare.</h2>
                  </div>
                  <div className="service-related-grid">
                    {relatedServices.slice(0, 5).map((related) => (
                      <Card className="service-related-card" key={related.slug}>
                        <CardHeader>
                          <CardTitle>{related.title}</CardTitle>
                          <CardDescription>{related.shortDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href={`/services/${related.slug}/`}>Learn more <ArrowRight aria-hidden="true" size={15} /></Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {service.relatedResources?.length ? (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Related Resources</p>
                    <h2>More pet care guidance from VMC.</h2>
                  </div>
                  <div className="service-related-grid">
                    {service.relatedResources.slice(0, 4).map((resource) => (
                      <Card className="service-related-card" key={resource.slug}>
                        <CardHeader>
                          <CardTitle>{resource.title}</CardTitle>
                          <CardDescription>{resource.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href={`/resources/${resource.slug}/`}>Read resource <ArrowRight aria-hidden="true" size={15} /></Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ) : null}

              {service.externalReferences?.length ? (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Trusted Education Sources</p>
                    <h2>Helpful veterinary education references.</h2>
                  </div>
                  <div className="service-reference-list">
                    {service.externalReferences.map((reference) => (
                      <a key={reference.url} href={reference.url} target="_blank" rel="noopener noreferrer">
                        <span>{reference.source || "Reference"}</span>
                        {reference.title}
                        <ExternalLink aria-hidden="true" size={15} />
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
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
                    <div><dt>Best for</dt><dd>{service.bestFor.join(", ")}</dd></div>
                    <div><dt>Locations</dt><dd>{service.locationRelevance.join(", ")}</dd></div>
                    <div><dt>Service area</dt><dd>{(service.serviceAreas?.length ? service.serviceAreas : ["Northern Kentucky"]).join(", ")}</dd></div>
                  </dl>
                  <Separator />
                  <div className="service-sidebar-actions">
                    <ServiceAppointmentDialogTrigger label="Request an Appointment" {...appointmentDialogProps} />
                    {settings.publicLocations.map((location) => (
                      <a href={`tel:${location.tel}`} key={location.id}>
                        <Phone aria-hidden="true" size={15} />
                        Call {location.name}
                      </a>
                    ))}
                  </div>
                  <div className="service-sidebar-note">
                    <ShieldCheck aria-hidden="true" size={17} />
                    <p>Not sure what your pet needs? Call us and we will help you choose a practical next step.</p>
                  </div>
                  {relatedServices.length > 0 && (
                    <div className="service-sidebar-related">
                      <h3>Related services</h3>
                      {relatedServices.slice(0, 3).map((related) => <Link href={`/services/${related.slug}/`} key={related.slug}>{related.title}</Link>)}
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
            <h2>{service.finalCtaTitle || "Not sure what your pet needs? Our team can help."}</h2>
            <p>{service.finalCtaText || "Tell us what you are noticing and our Fort Thomas or Independence team can help you choose the right appointment type."}</p>
            <div className="service-final-actions">
              {finalButtons.map((button, index) => (
                <Button href={button.href} variant={index === 0 ? "secondary" : "ghost"} key={`${button.label}-${button.href}`}>{button.label}</Button>
              ))}
            </div>
            {service.disclaimer && <p className="service-disclaimer">{service.disclaimer}</p>}
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          webpageSchema(`/services/${service.slug}/`, service.metaTitle || service.title, service.metaDescription || service.shortDescription),
          organizationSchema(settings),
          veterinaryServiceSchema(service, `/services/${service.slug}/`),
          breadcrumbSchema(crumbs),
          service.faqs.length ? faqSchema(service.faqs) : null
        ].filter(Boolean)}
      />
    </>
  );
}
