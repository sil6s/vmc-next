import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarCheck,
  CheckCircle,
  ClipboardList,
  Clock,
  ExternalLink,
  Eye,
  HandHeart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  MessageCircleHeart,
  Search,
  Sparkles
} from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { ServiceAppointmentDialogTrigger } from "@/components/sections/ServiceAppointmentDialogTrigger";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { serviceCategoryLabels } from "@/data/serviceHub";
import { localizedServiceSeo } from "@/data/localized-seo";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { isLocale, localizedLanguageAlternates } from "@/lib/i18n";
import {
  breadcrumbSchema,
  faqSchema,
  JsonLd,
  veterinaryServiceSchema,
  webpageSchema
} from "@/lib/schema";
import { getPublicSettings } from "@/lib/settings/public";
import { urlFor } from "@/sanity/image";
import { getRelatedServiceCards, getServiceDetail, getServiceDetailSlugs } from "@/sanity/services";

type Params = { params: Promise<{ slug: string }> };

const defaultTrustChips = ["Dogs & cats", "New patients welcome", "Fort Thomas, KY", "Independence, KY", "Locally owned"];

const reassuranceStats = [
  {
    icon: Eye,
    title: "Easy to miss",
    text: "Pets often keep eating and acting normally even when something is bothering them, which is why small changes at home matter."
  },
  {
    icon: Clock,
    title: "Earlier is easier",
    text: "Catching a concern sooner usually means simpler, more comfortable options for your pet."
  },
  {
    icon: HeartHandshake,
    title: "Comfort matters",
    text: "Our goal is a plan that supports your pet's comfort and your family's peace of mind."
  }
];

const trustPoints = [
  {
    icon: MessageCircleHeart,
    title: "We'll explain the why",
    text: "You should understand what we found and why we're recommending the next step, in plain language."
  },
  {
    icon: HandHeart,
    title: "We'll treat the individual pet",
    text: "Recommendations consider your pet's health, age, comfort, and everyday life, not a one-size-fits-all script."
  },
  {
    icon: CheckCircle,
    title: "You'll know what comes next",
    text: "We want you to leave with a clear plan, whether that's treatment, home care, monitoring, or a simple follow-up."
  }
];

const timelineIcons = [MessageCircle, Search, BadgeCheck, ClipboardList];

type EducationReference = {
  title: string;
  url: string;
  source: string;
};

const categoryReferences: Record<string, EducationReference[]> = {
  preventiveCare: [
    { title: "Preventive pet healthcare", source: "AVMA", url: "https://www.avma.org/resources/pet-owners/petcare/preventive-pet-healthcare" },
    { title: "Life stage checklists", source: "AAHA", url: "https://www.aaha.org/resources/life-stage-canine-2019/life-stage-checklist/" },
    { title: "Your pet's healthy weight", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/your-pets-healthy-weight" }
  ],
  medicalCare: [
    { title: "First aid tips for pet owners", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/emergencycare/first-aid-tips-pet-owners" },
    { title: "Animal emergencies that require immediate care", source: "AVMA", url: "https://www.avma.org/resources/pet-owners/emergencycare/13-animal-emergencies-require-immediate-veterinary-consultation-andor-care" },
    { title: "Common laboratory tests in veterinary medicine", source: "Merck Veterinary Manual", url: "https://www.merckvetmanual.com/special-pet-topics/diagnostic-tests-and-imaging/common-laboratory-tests-in-veterinary-medicine" }
  ],
  dentalSurgery: [
    { title: "Pet dental care", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/pet-dental-care" },
    { title: "Animal owner dental resources", source: "AVDC", url: "https://avdc.org/animal-owner-resources/" },
    { title: "When your pet needs anesthesia", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/when-your-pet-needs-anesthesia" }
  ],
  lifeStageCare: [
    { title: "Canine life stage guidelines", source: "AAHA", url: "https://www.aaha.org/resources/life-stage-canine-2019/" },
    { title: "New kitten checklist", source: "AAHA", url: "https://www.aaha.org/resources/new-kitten-checklist/" },
    { title: "Senior pet life stage guidance", source: "AAHA", url: "https://www.aaha.org/resources/senior-status-understanding-your-senior-pets-life-stage/" }
  ]
};

const serviceReferences: Record<string, EducationReference[]> = {
  "dog-cat-vaccinations": [
    { title: "Vaccinating your pet", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations" },
    { title: "2022 AAHA canine vaccination guidelines", source: "AAHA", url: "https://www.aaha.org/resources/2022-aaha-canine-vaccination-guidelines/" },
    { title: "2024 dog and cat vaccination guidelines", source: "WSAVA", url: "https://wsava.org/wp-content/uploads/2024/04/WSAVA-Vaccination-guidelines-2024.pdf" }
  ],
  "parasite-prevention": [
    { title: "External parasites", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/external-parasites" },
    { title: "Heartworm disease", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/heartworm-disease" },
    { title: "Parasite control", source: "AAHA", url: "https://www.aaha.org/resources/life-stage-canine-2019/parasite-control/" }
  ],
  "spay-neuter-surgery": [
    { title: "Spaying and neutering", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/spaying-and-neutering" },
    { title: "When your pet needs anesthesia", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/when-your-pet-needs-anesthesia" },
    { title: "Anesthesia and monitoring guidelines", source: "AAHA", url: "https://www.aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines-for-dogs-and-cats/" }
  ],
  "soft-tissue-surgery": [
    { title: "When your pet needs anesthesia", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/when-your-pet-needs-anesthesia" },
    { title: "Anesthesia and monitoring guidelines", source: "AAHA", url: "https://www.aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines-for-dogs-and-cats/" },
    { title: "First aid tips for pet owners", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/emergencycare/first-aid-tips-pet-owners" }
  ],
  "senior-pet-care": [
    { title: "Senior status and life stage guidance", source: "AAHA", url: "https://www.aaha.org/resources/senior-status-understanding-your-senior-pets-life-stage/" },
    { title: "Senior care guidelines", source: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/36584321/" },
    { title: "Your pet's healthy weight", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/your-pets-healthy-weight" }
  ],
  "skin-ear-allergy-care": [
    { title: "Allergies in pets", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/allergies-pets" },
    { title: "Allergic skin disease guidelines", source: "AVMA", url: "https://www.avma.org/news/aaha-publishes-allergic-skin-disease-guidelines-dogs-cats" },
    { title: "Canine and feline allergies", source: "CVMA", url: "https://www.canadianveterinarians.net/related-resources/canine-and-feline-allergies/" }
  ],
  "nutrition-weight-guidance": [
    { title: "Your pet's healthy weight", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/your-pets-healthy-weight" },
    { title: "Pet nutrition resources", source: "AVMF", url: "https://www.avmf.org/our-impact/resources/pet-nutrition/" },
    { title: "Nutritional management of weight", source: "UC Davis Veterinary Medicine", url: "https://healthtopics.vetmed.ucdavis.edu/health-topics/canine/nutritional-management-weight" }
  ],
  "veterinary-diagnostics": [
    { title: "Common laboratory tests in veterinary medicine", source: "Merck Veterinary Manual", url: "https://www.merckvetmanual.com/special-pet-topics/diagnostic-tests-and-imaging/common-laboratory-tests-in-veterinary-medicine" },
    { title: "Preventive pet healthcare", source: "AVMA", url: "https://www.avma.org/resources/pet-owners/petcare/preventive-pet-healthcare" },
    { title: "When your pet needs anesthesia", source: "AVMA", url: "https://www.avma.org/resources-tools/pet-owners/petcare/when-your-pet-needs-anesthesia" }
  ]
};

const serviceSeoDescriptions: Record<string, string> = {
  "pet-wellness-exams": "Routine pet wellness exams for dogs and cats in Fort Thomas, Independence, and Northern Kentucky, with vaccines, screening, and prevention planning.",
  "dog-cat-vaccinations": "Dog and cat vaccinations in Northern Kentucky, with lifestyle-based vaccine planning for puppies, kittens, adult pets, boarding, and travel.",
  "puppy-kitten-care": "Puppy and kitten vet care in Northern Kentucky, including first exams, vaccines, parasite prevention, nutrition, and early health planning.",
  "pet-dental-care": "Pet dental care in Northern Kentucky, including oral exams, cleaning guidance, dental X-rays when needed, treatment planning, and home care.",
  "spay-neuter-surgery": "Spay and neuter surgery planning for dogs and cats in Fort Thomas, Independence, and Northern Kentucky, with clear timing and recovery guidance.",
  "soft-tissue-surgery": "Soft tissue surgery for dogs and cats in Northern Kentucky, with exam-based planning, anesthesia discussion, monitoring, and recovery guidance.",
  "sick-pet-visits": "Sick pet visits in Northern Kentucky for vomiting, limping, coughing, appetite changes, pain, urinary issues, and other new symptoms.",
  "veterinary-diagnostics": "Veterinary diagnostics in Northern Kentucky, including lab work, imaging discussions, pre-surgical screening, and testing for unclear symptoms.",
  "senior-pet-care": "Senior pet care in Northern Kentucky for aging dogs and cats, with monitoring, diagnostics, mobility support, and quality-of-life guidance.",
  "parasite-prevention": "Parasite prevention for dogs and cats in Northern Kentucky, including flea, tick, heartworm, and intestinal parasite guidance.",
  "skin-ear-allergy-care": "Pet skin, ear, and allergy care in Northern Kentucky for itching, licking, ear odor, hot spots, hair loss, and recurring irritation.",
  "nutrition-weight-guidance": "Pet nutrition and weight guidance in Northern Kentucky, with practical support for food choices, feeding routines, weight, and life-stage needs."
};

const defaultDisclaimer = "This page is for educational purposes and does not replace a veterinary exam. If your pet has severe, sudden, or rapidly worsening symptoms, call Veterinary Medical Centers or seek urgent veterinary care.";

function displayDate(date?: string) {
  if (!date) return null;
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

function ServiceTitle({ title }: { title: string }) {
  const marker = " in Northern Kentucky";
  if (!title.endsWith(marker)) return title;

  return (
    <>
      {title.slice(0, -marker.length)}
      {" "}
      <em>in Northern Kentucky</em>
    </>
  );
}

function AccentHeading({ children, accent }: { children: string; accent: string }) {
  return (
    <h2>
      {children} <span className="nky-accent">{accent}</span>
    </h2>
  );
}

function serviceSeoTitle(service: { title: string; metaTitle?: string }) {
  const title = service.metaTitle?.replace(/\s*\|\s*Veterinary Medical Centers$/i, "") || `${service.title} in Northern Kentucky`;
  return title.length <= 60 ? title : `${service.title} in NKY`;
}

function serviceSeoDescription(service: { slug: string; metaDescription?: string; shortDescription: string }) {
  if (serviceSeoDescriptions[service.slug]) return serviceSeoDescriptions[service.slug];

  if (service.metaDescription && service.metaDescription.length >= 135 && service.metaDescription.length <= 160) {
    return service.metaDescription;
  }

  const localSuffix = " Serving Fort Thomas, Independence, and Northern Kentucky.";
  const description = `${service.shortDescription}${localSuffix}`;
  return description.length <= 160 ? description : `${service.shortDescription}`;
}

function getEducationReferences(service: { slug: string; serviceCategory: string; externalReferences?: { title: string; url: string; source?: string }[] }) {
  return service.externalReferences?.length
    ? service.externalReferences.map((reference) => ({ ...reference, source: reference.source || "Veterinary education" }))
    : serviceReferences[service.slug] || categoryReferences[service.serviceCategory] || [];
}

export async function generateStaticParams() {
  const slugs = await getServiceDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const service = await getServiceDetail(slug, locale);
  if (!service) return {};

  const imageSource = service.openGraphImage || service.heroImageSource;
  const image = imageSource ? urlFor(imageSource).width(1200).height(630).fit("crop").url() : service.heroImage;
  const title = serviceSeoTitle(service);
  const description = serviceSeoDescription(service);
  const seo = locale === "en" ? { title, description } : localizedServiceSeo(locale, service.title, description);
  const path = locale === "en" ? `/services/${service.slug}/` : `/${locale}/services/${service.slug}/`;

  return {
    ...pageMetadata({
      title: seo.title,
      description: seo.description,
      path,
      image,
      canonicalUrl: locale === "en" ? service.canonicalUrl : undefined,
      languages: localizedLanguageAlternates(`/services/${service.slug}/`)
    }),
    robots: {
      index: !service.noindex,
      follow: true
    }
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const service = await getServiceDetail(slug, locale);
  if (!service) notFound();

  const settings = await getPublicSettings();
  const serviceSeo = locale === "en"
    ? { title: serviceSeoTitle(service), description: serviceSeoDescription(service) }
    : localizedServiceSeo(locale, service.title, serviceSeoDescription(service));
  const servicePath = locale === "en" ? `/services/${service.slug}/` : `/${locale}/services/${service.slug}/`;
  const relatedServices = await getRelatedServiceCards(service, locale);
  const educationReferences = getEducationReferences(service).slice(0, 3);
  const updatedDate = displayDate(service.lastReviewedDate || service.updatedAt || service.publishedAt);
  const heroImage = service.heroImageSource
    ? urlFor(service.heroImageSource).width(1300).height(980).fit("crop").url()
    : service.heroImage || "/images/veterinary-care-hero.jpg";
  const categoryLabel = serviceCategoryLabels[service.serviceCategory];
  const finalButtons = service.finalCtaButtons?.length
    ? service.finalCtaButtons
    : [
        { label: "Request an Appointment", href: "/book-appointment/" },
        { label: "Call Fort Thomas", href: `tel:${site.locations[0].tel}` },
        { label: "Call Independence", href: `tel:${site.locations[1].tel}` }
      ];
  const appointmentDialogProps = {
    portalUrl: "/patient-portal-online-booking/",
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
              <h1><ServiceTitle title={service.heroTitle} /></h1>
              <p>{service.heroDescription}</p>
              <div className="service-landing-actions">
                <ServiceAppointmentDialogTrigger label={service.primaryCTA?.label || "Request an Appointment"} {...appointmentDialogProps} />
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
          <section className="nky-dental" aria-labelledby="service-article-title">
            <header className="nky-intro">
              <p className="nky-eyebrow">{service.title}</p>
              <div id="service-article-title">
                <AccentHeading children="Helping your pet feel better," accent="one step at a time." />
              </div>
              <p className="nky-lead">{service.heroDescription || service.shortDescription}</p>
              <div className="nky-intro-actions">
                <ServiceAppointmentDialogTrigger label="Request an Appointment" className="nky-button nky-button-red" {...appointmentDialogProps} />
                {service.symptomsOrReasons.length > 0 && (
                  <a className="nky-text-link" href="#service-signs">
                    See signs to watch for <span aria-hidden="true">↓</span>
                  </a>
                )}
              </div>
            </header>

            <div className="nky-stats" aria-label={`${service.title} facts`}>
              {reassuranceStats.map((stat) => (
                <article className="nky-stat" key={stat.title}>
                  <div className="nky-stat-icon" aria-hidden="true"><stat.icon /></div>
                  <strong>{stat.title}</strong>
                  <p>{stat.text}</p>
                </article>
              ))}
            </div>

            {service.overviewText.length > 0 && (
              <section className="nky-section nky-article-section">
                <div className="nky-section-head">
                  <p className="nky-eyebrow">Helpful context</p>
                  <AccentHeading children={`More about ${service.title.toLowerCase()}`} accent="in Northern Kentucky." />
                </div>
                <div className="nky-article-copy">
                  {service.overviewText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <p>
                    If you are comparing {service.title.toLowerCase()} options in Fort Thomas,
                    Independence, or nearby Northern Kentucky communities, the most useful starting
                    point is an exam and a conversation. Our team can explain what applies to your pet,
                    what can be watched at home, and what next steps would be most practical.
                  </p>
                </div>
                {service.whenToScheduleText.length > 0 && (
                  <div className="nky-info-strip">
                    <strong>When to schedule</strong>
                    {service.whenToScheduleText.map((item) => <p key={item}>{item}</p>)}
                  </div>
                )}
              </section>
            )}

              {/* Signs to Watch For */}
              {service.symptomsOrReasons.length > 0 && (
                <section className="nky-section" id="service-signs">
                  <div className="nky-section-head">
                    <p className="nky-eyebrow">When to schedule</p>
                    <AccentHeading children="Small changes can be" accent="worth a closer look." />
                    <p className="nky-lead">You do not need to know exactly what your pet needs before you call us. Start with what you are seeing at home.</p>
                  </div>
                  <div className="nky-symptoms">
                    {service.symptomsOrReasons.slice(0, 4).map((reason) => (
                      <article className="nky-card" key={`${reason.title}-${reason.description}`}>
                        <div className="nky-card-icon" aria-hidden="true"><CheckCircle /></div>
                        <h3>{reason.title}</h3>
                        <p>{reason.description}</p>
                      </article>
                    ))}
                  </div>
                  <div className="nky-cta">
                    <div>
                      <h3>Not sure what your pet needs?</h3>
                      <p>You do not have to figure that out before scheduling. Tell us what you&apos;ve noticed and we&apos;ll help you choose the right next step.</p>
                    </div>
                    <ServiceAppointmentDialogTrigger
                      label="Request an Appointment"
                      className="nky-button nky-button-light"
                      {...appointmentDialogProps}
                    />
                  </div>
                </section>
              )}

              {/* What Happens During the Visit */}
              {service.whatToExpect.length > 0 && (
                <section className="nky-section">
                  <div className="nky-section-head">
                    <p className="nky-eyebrow">What to expect</p>
                    <AccentHeading children="A visit without" accent="the guesswork." />
                    <p className="nky-lead">We start with your pet, not a procedure. The goal is to understand what is happening, explain what we find, and give you a plan that makes sense.</p>
                  </div>
                  <div className="nky-timeline">
                    {service.whatToExpect.slice(0, 4).map((step, index) => {
                      const StepIcon = timelineIcons[index % timelineIcons.length];
                      return (
                        <article className="nky-step" key={`${step.stepTitle}-${index}`}>
                          <div className="nky-step-icon" aria-hidden="true"><StepIcon /></div>
                          <div>
                            <h3>{step.stepTitle}</h3>
                            <p>{step.stepDescription}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Recommended Care */}
              {service.includedCare.length > 0 && (
                <section className="nky-section">
                  <div className="nky-section-head">
                    <p className="nky-eyebrow">If treatment is recommended</p>
                    <AccentHeading children={`${service.title} is about more than`} accent="one quick answer." />
                    <p className="nky-lead">Every pet is different. Your veterinarian will recommend the parts of care that make sense after an exam and conversation.</p>
                  </div>
                  <div className="nky-treatment-grid">
                    {service.includedCare.slice(0, 4).map((item) => (
                      <article className="nky-card" key={`${item.title}-${item.description}`}>
                        <div className="nky-card-icon" aria-hidden="true"><Sparkles /></div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </article>
                    ))}
                  </div>
                  {service.urgentCallout?.title && (
                    <aside className="nky-urgent" role="note" aria-label="When to seek urgent care">
                      <div className="nky-urgent-icon" aria-hidden="true"><AlertTriangle /></div>
                      <div>
                        <strong>{service.urgentCallout.title}</strong>
                        {service.urgentCallout.text && <p>{service.urgentCallout.text}</p>}
                      </div>
                    </aside>
                  )}
                </section>
              )}

              {/* How Veterinary Medical Centers Approaches This Care */}
              <section className="nky-section">
                <div className="nky-section-head">
                  <p className="nky-eyebrow">Our approach</p>
                  <AccentHeading children="Clear answers." accent="Care that fits your pet." />
                  <p className="nky-lead">
                    {service.approachSection ||
                      `At both our Fort Thomas and Independence locations, our team focuses on clear communication, practical recommendations, and care built around your pet as an individual. We help families across Northern Kentucky understand what we find, talk through the options, and land on a plan that fits their pet and their household.`}
                  </p>
                </div>
                <div className="nky-trust-grid" aria-label="Why families choose Veterinary Medical Centers">
                  {trustPoints.map((point) => (
                    <article className="nky-trust-card" key={point.title}>
                      <point.icon aria-hidden="true" />
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Local Care — Fort Thomas & Independence */}
              <section className="nky-section nky-local">
                <div className="nky-section-head">
                  <p className="nky-eyebrow">Close to home</p>
                  <AccentHeading children={`${service.title} in`} accent="Northern Kentucky." />
                  <p className="nky-lead">
                    We provide {service.title.toLowerCase()} for dogs and cats at our Fort Thomas and Independence locations. Choose whichever clinic works best for your family.
                  </p>
                </div>
                <div className="nky-locations">
                  {settings.publicLocations.map((location) => (
                    <article className="nky-location" key={location.id}>
                      <div className="nky-location-icon" aria-hidden="true"><MapPin /></div>
                      <span className="nky-location-kicker">{location.name}</span>
                      <h3>{location.name} Veterinary Medical Center</h3>
                      <p>
                        {location.address}<br />
                        <strong>{location.phone}</strong>
                      </p>
                      <div className="nky-location-actions">
                        <ServiceAppointmentDialogTrigger label="Request Appointment" className="nky-button nky-button-red" {...appointmentDialogProps} />
                        <a className="nky-button nky-button-outline" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Directions</a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

            {educationReferences.length > 0 && (
              <section className="nky-section">
                <div className="nky-section-head">
                  <p className="nky-eyebrow">Trusted education</p>
                  <AccentHeading children="Helpful articles from" accent="veterinary sources." />
                  <p className="nky-lead">
                    These external resources can help you read more before or after your visit.
                    They are educational and do not replace recommendations from your veterinarian.
                  </p>
                </div>
                <div className="nky-reference-grid">
                  {educationReferences.map((reference) => (
                    <a className="nky-reference-card" href={reference.url} target="_blank" rel="noopener noreferrer" key={reference.url}>
                      <span>{reference.source}</span>
                      <strong>{reference.title}</strong>
                      <ExternalLink aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {relatedServices.length > 0 && (
              <section className="nky-section">
                <div className="nky-section-head">
                  <p className="nky-eyebrow">Related care</p>
                  <AccentHeading children="Other services that may" accent="fit your pet." />
                </div>
                <div className="nky-related-grid">
                  {relatedServices.slice(0, 4).map((related) => (
                    <Link className="nky-related-card" href={`/services/${related.slug}/`} key={related.slug}>
                      <strong>{related.title}</strong>
                      <p>{related.shortDescription}</p>
                      <span>Learn more</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {service.faqs.length > 0 && (
              <section className="nky-section">
                <div className="nky-section-head">
                  <p className="nky-eyebrow">Common questions</p>
                  <AccentHeading children="What pet owners ask us" accent={`about ${service.title.toLowerCase()}.`} />
                </div>
                <div className="nky-faq">
                  {service.faqs.slice(0, 5).map((faq) => (
                    <details key={faq.question}>
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="nky-final">
              <p className="nky-eyebrow">Fort Thomas + Independence</p>
              <h2>
                Something seem off? <span>Start with a conversation.</span>
              </h2>
              <p>{service.finalCtaText || "Whether you're noticing changes at home or just want peace of mind, our Fort Thomas and Independence team can help you figure out what comes next."}</p>
              <div className="nky-final-actions">
                <ServiceAppointmentDialogTrigger label={finalButtons[0]?.label || "Request an Appointment"} className="nky-button nky-button-light" {...appointmentDialogProps} />
                <a className="nky-button nky-button-outline" href="/new-patients/">New to VMC?</a>
              </div>
              <div className="nky-final-note">
                <span>Fort Thomas</span>
                <span>Independence</span>
                <span>Dogs and cats welcome</span>
              </div>
              <p className="service-disclaimer">{service.disclaimer || defaultDisclaimer}</p>
            </section>
          </section>
        </Container>
      </div>

      <JsonLd
        data={[
          webpageSchema(servicePath, serviceSeo.title, serviceSeo.description),
          veterinaryServiceSchema(service, servicePath, serviceSeo.description),
          breadcrumbSchema(crumbs),
          service.faqs.length ? faqSchema(service.faqs) : null
        ].filter(Boolean)}
      />
    </>
  );
}
