import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import {
  AlertCircle,
  ArrowRight,
  Baby,
  CalendarCheck,
  ClipboardCheck,
  Ear,
  Heart,
  HeartHandshake,
  MessageCircle,
  Microscope,
  Scale,
  Scissors,
  ShieldCheck,
  Smile,
  Stethoscope
} from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { ServiceBrowser } from "@/components/sections/ServiceBrowser";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { locations } from "@/data/locations";
import { localizedSeo } from "@/data/localized-seo";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { isLocale, localizedLanguageAlternates } from "@/lib/i18n";
import { breadcrumbSchema, faqSchema, JsonLd, organizationSchema, serviceListSchema, webpageSchema } from "@/lib/schema";
import { getServiceHubCards } from "@/sanity/services";

const seo = {
  title: "Animal Hospital in Northern Kentucky | Vet Services | VMC",
  description:
    "Northern Kentucky veterinary services for dogs and cats: wellness exams, vaccines, dental care, surgery, diagnostics, and sick visits."
};

const situationCards = [
  {
    title: "Due for a checkup",
    label: "Wellness exam",
    href: "/services/pet-wellness-exams/"
  },
  {
    title: "Not feeling like themselves",
    label: "Sick pet visit",
    href: "/services/sick-pet-visits/"
  },
  {
    title: "New puppy or kitten",
    label: "First-year care",
    href: "/services/puppy-kitten-care/"
  },
  {
    title: "Worried about teeth or breath",
    label: "Pet dental care",
    href: "/services/pet-dental-care/"
  },
  {
    title: "Itchy or shaking their head",
    label: "Skin & ear care",
    href: "/services/skin-ear-allergy-care/"
  },
  {
    title: "Getting older",
    label: "Senior pet care",
    href: "/services/senior-pet-care/"
  },
  {
    title: "Weight or nutrition questions",
    label: "Nutrition guidance",
    href: "/services/nutrition-weight-guidance/"
  },
  {
    title: "May need surgery",
    label: "Surgery consult",
    href: "/services/soft-tissue-surgery/"
  }
];

const situationIcons = [CalendarCheck, AlertCircle, Baby, Smile, Ear, HeartHandshake, Scale, Scissors];

const visitSteps = [
  ["Tell us what's going on", "Share symptoms, questions, behavior changes, medications, diet, or anything you've noticed at home."],
  ["We'll take a careful look", "Your veterinarian examines your pet and talks through what they find in clear, practical language."],
  ["We'll explain the options", "If testing or treatment may help, we'll explain why, what it involves, and what choices make sense."],
  ["You leave with a plan", "You'll know what to do at home, what to watch for, and when to come back."]
];

const carePillars = [
  {
    icon: ShieldCheck,
    title: "Preventive care",
    text: "Yearly exams, vaccines, and parasite prevention that catch small changes before they become big ones.",
    links: [
      ["Wellness exams", "/services/pet-wellness-exams/"],
      ["Vaccinations", "/services/dog-cat-vaccinations/"],
      ["Parasite prevention", "/services/parasite-prevention/"],
      ["Puppy & kitten care", "/services/puppy-kitten-care/"]
    ]
  },
  {
    icon: Microscope,
    title: "Medical & diagnostic care",
    text: "Sick visits, testing, and ongoing support when your pet isn't feeling like themselves.",
    links: [
      ["Sick pet visits", "/services/sick-pet-visits/"],
      ["Diagnostics", "/services/veterinary-diagnostics/"],
      ["Skin, ear & allergy care", "/services/skin-ear-allergy-care/"],
      ["Senior pet care", "/services/senior-pet-care/"]
    ]
  },
  {
    icon: Scissors,
    title: "Surgery & dental care",
    text: "Planned procedures with careful monitoring, pain control, and clear recovery instructions.",
    links: [
      ["Pet dental care", "/services/pet-dental-care/"],
      ["Spay & neuter", "/services/spay-neuter-surgery/"],
      ["Soft tissue surgery", "/services/soft-tissue-surgery/"],
      ["Nutrition & weight", "/services/nutrition-weight-guidance/"]
    ]
  }
] as const;

const hospitalValues = [
  { icon: MessageCircle, title: "We listen first", text: "Tell us what you've noticed at home. That context shapes every exam." },
  { icon: ClipboardCheck, title: "We explain the why", text: "You'll understand every recommendation and its options before deciding." },
  { icon: HeartHandshake, title: "We stay with you", text: "From the first puppy visit through senior care, the same team knows your pet." },
  { icon: Heart, title: "A gentler visit", text: "Fear Free–minded handling and thoughtful pacing help nervous pets settle in." }
];

const servicesFaqs = [
  {
    question: "Is Veterinary Medical Centers a full-service animal hospital?",
    answer:
      "Yes. Veterinary Medical Centers is a full-service animal hospital in Northern Kentucky for dogs and cats. We provide wellness exams, vaccinations, sick visits, diagnostics, dental care, spay and neuter surgery, soft tissue surgery, and senior pet care."
  },
  {
    question: "Where is your animal hospital in Northern Kentucky?",
    answer:
      "We have two Northern Kentucky animal hospital locations: Fort Thomas at 2000 Memorial Parkway and Independence at 4147 Madison Pike. Both care for dogs and cats."
  },
  {
    question: "What if I don't know which appointment to choose?",
    answer:
      "That's common. Tell us what you've noticed at home and our team can help you choose between a wellness visit, sick appointment, dental visit, diagnostics, surgery consult, or another next step."
  },
  {
    question: "How often should my pet see a veterinarian?",
    answer:
      "Most pets benefit from at least one wellness exam each year. Puppies, kittens, senior pets, and pets with ongoing health conditions may need more frequent visits."
  },
  {
    question: "What should I bring?",
    answer:
      "Bring vaccine records, medication names and doses, previous medical records if you have them, adoption paperwork for new pets, and any questions you want to ask."
  },
  {
    question: "Can you help if my pet is sick?",
    answer:
      "Yes. We see sick pet visits for many non-emergency concerns, including appetite changes, coughing, vomiting, diarrhea, limping, itching, ear problems, and behavior changes."
  },
  {
    question: "Do you offer dental care?",
    answer:
      "Yes. We provide dental evaluations and professional dental care recommendations for dogs and cats. Dental care can help with bad breath, tartar, discomfort, and oral disease."
  },
  {
    question: "Do you offer surgery?",
    answer:
      "Yes. Our team provides spay and neuter procedures and select soft tissue surgeries. We discuss preparation, monitoring, pain control, and recovery instructions before surgery."
  },
  {
    question: "What if I think it's an emergency?",
    answer:
      "If your pet is having severe trouble breathing, collapse, uncontrolled bleeding, repeated seizures, or another emergency, contact an emergency veterinary hospital right away. For less urgent symptoms, call us and we can help you decide what to do next."
  },
  {
    question: "Can I choose either location?",
    answer:
      "Yes. Choose the Fort Thomas or Independence clinic that is easiest for your family. Both locations care for dogs and cats and can help you find the right appointment."
  }
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" }
];

export async function generateMetadata(): Promise<Metadata> {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const metadataSeo = locale === "en" ? seo : localizedSeo[locale]["/services/"];
  const path = locale === "en" ? "/services/" : `/${locale}/services/`;
  return pageMetadata({ ...metadataSeo, path, languages: localizedLanguageAlternates("/services/") });
}

export default async function ServicesPage() {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const services = await getServiceHubCards(locale);
  const metadataSeo = locale === "en" ? seo : localizedSeo[locale]["/services/"];
  const pagePath = locale === "en" ? "/services/" : `/${locale}/services/`;

  return (
    <>
      <Hero
        eyebrow="Veterinary services"
        title="Full-service animal hospital in"
        emphasis="Northern Kentucky."
        body="Wellness care, dental care, surgery, diagnostics, and sick visits for dogs and cats, all from one locally owned team in Fort Thomas and Independence."
        image="/images/blog/dog-on-exam-table.jpg"
        imageAlt="Dog resting on an exam table at a Northern Kentucky animal hospital"
        primaryCta={{ label: "Book an Appointment", href: "/book-appointment/" }}
        secondaryCta={{ label: "Help Me Choose", href: `tel:${site.locations[0].tel}` }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          Wellness · Dental · Surgery · Diagnostics · Dogs &amp; cats
        </p>
      </div>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <Section tone="white" eyebrow="What can we help with today?" title={<>Start with what <em>you&rsquo;ve noticed.</em></>} intro="You don't need to know which appointment to book. Pick what sounds closest and we'll point you in the right direction." className="services-start-section">
        <nav className="situation-link-grid" aria-label="Choose veterinary care by what you are noticing">
          {situationCards.map((card, index) => {
            const Icon = situationIcons[index] || Stethoscope;
            return (
              <Link className="situation-link-card" href={card.href} key={card.title}>
                <Icon aria-hidden="true" size={20} />
                <span>{card.title}</span>
                <small>{card.label}</small>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            );
          })}
        </nav>
      </Section>

      <Section tone="dark" eyebrow="Care under one roof" title={<>Everything a Northern Kentucky <em>animal hospital should be.</em></>} intro="From routine prevention to surgery, our veterinarians handle the full range of dog and cat care, so your pet's history stays with one team that knows them." className="home-life-stages">
        <div className="services-pillar-grid">
          {carePillars.map(({ icon: Icon, title, text, links }) => (
            <article className="home-life-stage-card services-pillar" key={title}>
              <Icon aria-hidden="true" size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {links.map(([label, href]) => <li key={href}><Link href={href}>{label} →</Link></li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <section className="services-section services-section-cream services-browser-section">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">All veterinary services</p>
            <h2>Animal hospital services for <em>dogs and cats.</em></h2>
            <p>Browse every service we offer at our Fort Thomas and Independence clinics. Not sure which fits? Our team can help you choose.</p>
          </div>
          <ServiceBrowser services={services} />
        </Container>
      </section>

      <Section tone="white" eyebrow="Why families choose us" title={<>An animal hospital that <em>knows your pet.</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <div>
            <p>Vet visits shouldn&rsquo;t feel rushed. As a locally owned practice, we give every visit room for questions and every pet a team that remembers them.</p>
            <Link className="text-link services-team-link" href="/team/">Meet our veterinarians →</Link>
          </div>
          <div className="home-little-things-list">
            {hospitalValues.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon aria-hidden="true" size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="warm" eyebrow="What to expect" title={<>You&rsquo;ll always know <em>what happens next.</em></>}>
        <div className="visit-steps">
          {visitSteps.map(([title, copy], index) => (
            <article className="visit-step" key={title}>
              <span aria-hidden="true">{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="services-emergency-note"><AlertCircle aria-hidden="true" size={16} /> Think it&rsquo;s an emergency? Contact an emergency veterinary hospital right away.</p>
      </Section>

      <Section tone="cream" eyebrow="Fort Thomas & Independence" title={<>Two animal hospital locations in <em>Northern Kentucky.</em></>} className="home-locations-section">
        <div className="home-location-grid">
          {locations.map((location, index) => (
            <article className="home-location-card" key={location.slug}>
              <div className="home-location-image">
                <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="home-location-copy">
                <h3><Link href={`/locations/${location.slug}/`}>{location.shortName}, KY</Link></h3>
                <p className="home-location-official">Veterinary Medical Center of {location.shortName}</p>
                <div className="home-location-details">
                  <address>{location.address}</address>
                  <a href={`tel:${location.tel}`}>{location.phone}</a>
                  <p className="home-location-weekday-hours">Monday–Friday <span>·</span> 8 AM–6 PM</p>
                </div>
              </div>
              <div className="inline-actions">
                <Link className="btn btn-primary" href="/book-appointment/">Book Appointment</Link>
                <a className="text-link" href={site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <FAQSection faqs={servicesFaqs} title="Questions about our Northern Kentucky animal hospital" />

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link>
          <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
          <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
        </>}
      />

      <JsonLd
        data={[
          webpageSchema(pagePath, metadataSeo.title, metadataSeo.description),
          organizationSchema(),
          serviceListSchema(services.map((service) => ({ name: service.title, description: service.shortDescription, path: `/services/${service.slug}/` }))),
          breadcrumbSchema(crumbs),
          faqSchema(servicesFaqs)
        ]}
      />
    </>
  );
}
