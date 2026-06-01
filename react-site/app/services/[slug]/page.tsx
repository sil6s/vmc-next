import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle,
  ClipboardList,
  Clock,
  ExternalLink,
  HelpCircle,
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

const defaultTrustChips = ["Dogs & cats", "New patients welcome", "Fort Thomas, KY", "Independence, KY", "Locally owned"];

const defaultDisclaimer = "This page is for educational purposes and does not replace a veterinary exam. If your pet has severe, sudden, or rapidly worsening symptoms, call Veterinary Medical Centers or seek urgent veterinary care.";

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
                {table.columns.map((column, cellIndex) => (
                  <td key={`${column}-${cellIndex}`}>{row.cells[cellIndex] || ""}</td>
                ))}
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
      {/* Hero */}
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
                    <span>Fort Thomas, KY · Independence, KY</span>
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

              {/* Quick Summary */}
              <section className="service-rich-card service-overview-card">
                <div className="service-section-head">
                  <p className="eyebrow">Quick Summary</p>
                  <h2>Is this the right service for your pet?</h2>
                </div>
                <dl className="service-quick-summary-grid">
                  <div className="service-quick-summary-item">
                    <dt>What this helps with</dt>
                    <dd>{service.fullDescription || service.shortDescription}</dd>
                  </div>
                  {service.bestFor.length > 0 && (
                    <div className="service-quick-summary-item">
                      <dt>Best for</dt>
                      <dd>
                        <ul>{service.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
                      </dd>
                    </div>
                  )}
                  {service.symptomsOrReasons.length > 0 && (
                    <div className="service-quick-summary-item">
                      <dt>Common reasons to schedule</dt>
                      <dd>
                        <ul>{service.symptomsOrReasons.slice(0, 3).map((r) => <li key={r.title}>{r.title}</li>)}</ul>
                      </dd>
                    </div>
                  )}
                  <div className="service-quick-summary-item">
                    <dt>Available at</dt>
                    <dd>Fort Thomas, KY · Independence, KY</dd>
                  </div>
                  {service.appointmentType && (
                    <div className="service-quick-summary-item">
                      <dt>Typical next step</dt>
                      <dd>{service.appointmentType}</dd>
                    </div>
                  )}
                </dl>
              </section>

              {/* What This Service Helps With */}
              {benefits.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">What It Helps With</p>
                    <h2>What {service.title.toLowerCase()} helps with.</h2>
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

              {/* Main Educational Guide */}
              {(service.overview?.length || service.overviewText.length > 0) ? (
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
              ) : null}

              {/* Signs to Watch For */}
              {service.symptomsOrReasons.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Signs to Watch For</p>
                    <h2>When your pet may need this service.</h2>
                    <p>These are common reasons pet owners in Fort Thomas, Independence, and nearby Northern Kentucky communities schedule this type of appointment.</p>
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

              {/* Urgent Care Callout */}
              {service.urgentCallout?.title && (
                <aside className="service-urgent-callout" role="note" aria-label="When to seek urgent care">
                  <AlertTriangle aria-hidden="true" size={22} />
                  <div>
                    <strong>{service.urgentCallout.title}</strong>
                    {service.urgentCallout.text && <p>{service.urgentCallout.text}</p>}
                  </div>
                </aside>
              )}

              {/* How Veterinary Medical Centers Approaches This Care */}
              <section className="service-section-block">
                <div className="service-section-head">
                  <p className="eyebrow">Our Approach</p>
                  <h2>How Veterinary Medical Centers approaches {service.title.toLowerCase()}.</h2>
                  <p>
                    {service.approachSection ||
                      `At both our Fort Thomas and Independence locations, Veterinary Medical Centers focuses on clear communication, practical recommendations, and individualized care. We help families across Northern Kentucky understand what we find during the exam, discuss their options, and make decisions that fit their pet and their household.`}
                  </p>
                </div>
                {service.careApproachCards?.length ? (
                  <div className="service-inclusion-grid">
                    {service.careApproachCards.slice(0, 6).map((item) => (
                      <Card className="service-inclusion-card" key={`${item.title}-${item.description}`}>
                        <CardHeader>
                          <Sparkles aria-hidden="true" size={19} />
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent><p>{item.description}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                ) : null}
              </section>

              {/* What Happens During the Visit */}
              {service.whatToExpect.length > 0 && (
                <section className="service-section-block service-visit-flow">
                  <div className="service-section-head">
                    <p className="eyebrow">What to Expect</p>
                    <h2>What happens during the visit.</h2>
                  </div>
                  <div className="service-timeline">
                    {service.whatToExpect.map((step, index) => (
                      <article key={`${step.stepTitle}-${index}`}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{step.stepTitle}</h3>
                          <p>{step.stepDescription}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* What to Bring */}
              {service.whatToBring?.length ? (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Preparation</p>
                    <h2>What to bring to your appointment.</h2>
                    <p>Having this information ready helps your veterinarian give the most useful guidance during the visit.</p>
                  </div>
                  <ul className="service-checklist">
                    {service.whatToBring.map((item) => (
                      <li key={item}>
                        <ClipboardList aria-hidden="true" size={17} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {/* Helpful Questions to Ask */}
              {service.helpfulQuestions?.length ? (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Questions to Ask</p>
                    <h2>Helpful questions for your veterinarian.</h2>
                    <p>You can write these down or mention them at the start of the visit.</p>
                  </div>
                  <ol className="service-questions-list">
                    {service.helpfulQuestions.map((question) => (
                      <li key={question}>
                        <HelpCircle aria-hidden="true" size={17} />
                        {question}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {/* Comparison Table / Mini Timeline */}
              {(tableIsRenderable(service.comparisonTable) || tableIsRenderable(service.contentTable) || Boolean(service.timelineBlocks?.length)) && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Helpful Reference</p>
                    <h2>A simple way to understand next steps.</h2>
                    <p>Your veterinarian will recommend next steps based on your pet's exam and history. This chart is for educational purposes only.</p>
                  </div>
                  {tableIsRenderable(service.comparisonTable) && <ServiceDataTable table={service.comparisonTable as ServiceTable} />}
                  {tableIsRenderable(service.contentTable) && <ServiceDataTable table={service.contentTable as ServiceTable} />}
                  {service.timelineBlocks?.length ? (
                    <div className="service-timeline service-mini-timeline">
                      {service.timelineBlocks.map((block, index) => (
                        <article key={`${block.title}-${index}`}>
                          <span aria-hidden="true">{block.label || String(index + 1).padStart(2, "0")}</span>
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

              {/* Callout Blocks */}
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

              {/* Local Care — Fort Thomas & Independence */}
              <section className="service-section-block">
                <div className="service-section-head">
                  <p className="eyebrow">Local Care</p>
                  <h2>Serving dogs and cats in Fort Thomas and Independence, KY.</h2>
                  <p>
                    Veterinary Medical Centers provides {service.title.toLowerCase()} for pets and families across Northern Kentucky, including Fort Thomas, Independence, and the surrounding communities.
                  </p>
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

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Related Services</p>
                    <h2>Other services that may be helpful.</h2>
                  </div>
                  <div className="service-related-grid">
                    {relatedServices.slice(0, 4).map((related) => (
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

              {/* Related Resources */}
              {service.relatedResources?.length ? (
                <section className="service-section-block">
                  <div className="service-section-head">
                    <p className="eyebrow">Related Resources</p>
                    <h2>More pet care guidance from our team.</h2>
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

              {/* External References */}
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

            {/* Sidebar */}
            <aside className="service-conversion-sidebar" aria-label="Book this service">
              <Card className="service-book-card">
                <CardHeader>
                  <span><Stethoscope aria-hidden="true" size={19} /> Book this service</span>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl>
                    {service.bestFor.length > 0 && (
                      <div><dt>Best for</dt><dd>{service.bestFor.slice(0, 3).join(", ")}</dd></div>
                    )}
                    <div><dt>Locations</dt><dd>Fort Thomas, KY · Independence, KY</dd></div>
                    {service.appointmentType && (
                      <div><dt>Appointment type</dt><dd>{service.appointmentType}</dd></div>
                    )}
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
                    <p>Not sure what your pet needs? Call us — our team will help you choose the right next step.</p>
                  </div>
                  {relatedServices.length > 0 && (
                    <div className="service-sidebar-related">
                      <h3>Related services</h3>
                      {relatedServices.slice(0, 3).map((related) => (
                        <Link href={`/services/${related.slug}/`} key={related.slug}>{related.title}</Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      {service.faqs.length > 0 && (
        <FAQSection faqs={service.faqs} title={`Frequently asked questions about ${service.title.toLowerCase()}.`} />
      )}

      {/* Final CTA */}
      <section className="service-final-cta">
        <Container>
          <div className="service-final-cta-inner">
            <p className="eyebrow">Next Steps</p>
            <h2>{service.finalCtaTitle || "Ready to schedule? Our team can help."}</h2>
            <p>{service.finalCtaText || "Tell us what you are noticing and our Fort Thomas or Independence team will help you choose the right appointment type."}</p>
            <div className="service-final-actions">
              {finalButtons.map((button, index) => (
                <Button href={button.href} variant={index === 0 ? "secondary" : "ghost"} key={`${button.label}-${button.href}`}>
                  {button.label}
                </Button>
              ))}
            </div>
            <p className="service-disclaimer">{service.disclaimer || defaultDisclaimer}</p>
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
