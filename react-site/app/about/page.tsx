import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import {
  Baby,
  Building2,
  Heart,
  HeartHandshake,
  MessageSquareText,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound
} from "lucide-react";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { TeamSection } from "@/components/sections/TeamSection";
import { Section } from "@/components/ui/Section";
import { cityPages } from "@/data/cityPages";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { localizedSeo } from "@/data/localized-seo";
import { absoluteUrl, site } from "@/data/site";
import { veterinarians } from "@/data/veterinarians";
import { pageMetadata } from "@/lib/metadata";
import { isLocale, localizedLanguageAlternates } from "@/lib/i18n";
import { JsonLd, breadcrumbSchema, faqSchema, locationVeterinaryCareSchema, personSchema, webpageSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const seo = locale === "en" ? pages.about.seo : localizedSeo[locale]["/about/"];
  const path = locale === "en" ? "/about/" : `/${locale}/about/`;
  return pageMetadata({ ...seo, path, languages: localizedLanguageAlternates("/about/") });
}

const aboutFaqs = [
  {
    question: "Who are the veterinarians at Veterinary Medical Centers?",
    answer:
      "Our Northern Kentucky veterinarians are Dr. Kristi Baker, DVM (practice owner), Dr. Rebecca Golatzki, DVM, and Dr. Valeria Dib-Vázquez, DVM. Together they care for dogs and cats at our Fort Thomas and Independence clinics."
  },
  {
    question: "How much experience do your veterinarians have?",
    answer:
      "Our doctors bring more than 55 years of combined veterinary experience, including general practice, emergency medicine, surgery, dentistry, and feline-focused care."
  },
  {
    question: "Is Veterinary Medical Centers independently owned?",
    answer:
      "Yes. Veterinary Medical Centers is an independently owned vet in Northern Kentucky led by Dr. Kristi Baker. Care decisions are made locally by a team that knows the Fort Thomas and Independence communities."
  },
  {
    question: "Where are your veterinary clinics located?",
    answer:
      "VMC has two Northern Kentucky locations: Fort Thomas at 2000 Memorial Parkway and Independence at 4147 Madison Pike. Both clinics care for dogs and cats."
  },
  {
    question: "Do you accept new patients?",
    answer:
      "Yes. New dog and cat patients are welcome at both VMC locations. You can book an appointment, review new patient resources, or contact the team for help choosing a location."
  },
  {
    question: "What animals do you care for?",
    answer:
      "Veterinary Medical Centers focus on dogs and cats, including puppies, kittens, adult pets, and senior pets."
  },
  {
    question: "What services do you offer?",
    answer:
      "VMC provides wellness exams, vaccines, preventive care, sick visits, dental care, soft tissue surgery, senior pet care, puppy and kitten care, diagnostics, and long-term health support."
  },
  {
    question: "Do you provide veterinary dental care?",
    answer:
      "Yes. The team provides pet dental evaluations and professional dental care recommendations for dogs and cats, including guidance for bad breath, tartar, chewing changes, and oral discomfort."
  },
  {
    question: "Do you provide surgery for dogs and cats?",
    answer:
      "Yes. VMC provides spay and neuter procedures and select soft tissue surgery services with careful preparation, monitoring, pain control, and recovery instructions."
  },
  {
    question: "What makes your approach different?",
    answer:
      "The practice is independently owned, locally accountable, and focused on familiar faces, clear communication, comfort-focused handling, and practical next steps for each pet family."
  },
  {
    question: "Do you serve pet owners outside Fort Thomas and Independence?",
    answer:
      "Yes. Families visit VMC from nearby communities including Covington, Highland Heights, Bellevue, Newport, Taylor Mill, Latonia, Erlanger, Florence, and Greater Cincinnati."
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can request an appointment online, call Fort Thomas at (859) 442-4420, call Independence at (859) 356-2242, or use the contact page for non-urgent questions."
  }
];

const differences = [
  { title: "Independent ownership", text: "VMC is owned by Dr. Kristi Baker, so decisions are made here, close to the pets and families we serve.", icon: Building2 },
  { title: "Familiar faces", text: "Seeing the same team over time keeps your pet's history, preferences, and health needs connected.", icon: UsersRound },
  { title: "A gentler visit", text: "Fear Free–minded handling and thoughtful pacing help nervous pets settle in.", icon: HeartHandshake },
  { title: "Clear next steps", text: "We explain what we find in plain language, so you leave knowing the plan and your options.", icon: MessageSquareText }
];

const serviceCards = [
  { title: "Puppies & kittens", text: "First exams, vaccines, prevention, and all the new-pet questions.", href: "/services/puppy-kitten-care/", cta: "Explore early-life care", icon: Baby },
  { title: "Wellness & prevention", text: "Routine exams, vaccinations, and steady preventive care for grown-up pets.", href: "/services/pet-wellness-exams/", cta: "Explore wellness care", icon: PawPrint },
  { title: "Dental care", text: "Help for bad breath, tartar, and chewing changes, plus preventive dental plans.", href: "/services/pet-dental-care/", cta: "Explore dental care", icon: Sparkles },
  { title: "Sick visits", text: "Practical help when your pet is vomiting, limping, coughing, or just not themselves.", href: "/services/sick-pet-visits/", cta: "Explore sick visits", icon: Stethoscope },
  { title: "Surgery", text: "Spay, neuter, and soft tissue procedures with careful monitoring and recovery plans.", href: "/services/soft-tissue-surgery/", cta: "Explore surgery", icon: ShieldCheck },
  { title: "Senior sweethearts", text: "Support for comfort, mobility, screening, and changing needs.", href: "/services/senior-pet-care/", cta: "Explore senior care", icon: Heart }
];

const resourceLinks = [
  ["Meet our veterinarians", "/team/"],
  ["New patient information", "/new-patients/"],
  ["Veterinary services for dogs and cats", "/services/"],
  ["Online pharmacy & refills", "/online-vet-pharmacy-northern-kentucky-cincinnati/"],
  ["Patient portal", "/patient-portal-online-booking/"],
  ["Contact our team", "/contact/"]
];

export default async function AboutPage() {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const seo = locale === "en" ? pages.about.seo : localizedSeo[locale]["/about/"];
  const pagePath = locale === "en" ? "/about/" : `/${locale}/about/`;
  const nearbyCities = cityPages.filter((page) => page.pageType === "nearby_city");

  return (
    <>
      <Hero
        eyebrow="About Veterinary Medical Centers"
        title="Northern Kentucky veterinarians,"
        emphasis="locally owned."
        body="Veterinary Medical Centers is a team of Northern Kentucky veterinarians caring for dogs and cats in Fort Thomas and Independence, KY. Owned by Dr. Kristi Baker, we know your pet's name, their history, and you."
        image="/images/fort-thomas-clinic.jpg"
        imageAlt="Veterinary Medical Center of Fort Thomas, home to locally owned Northern Kentucky veterinarians"
        badgeTitle="Licensed in KY & OH"
        badgeSub="Led by Dr. Kristi Baker"
        primaryCta={{ label: "Book an Appointment", href: "/book-appointment/" }}
        secondaryCta={{ label: "Meet Our Veterinarians", href: "/team/" }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          Independently owned · Two Northern Kentucky clinics · Dogs &amp; cats
        </p>
      </div>

      <Section tone="white" className="home-vmc-introduction">
        <div className="home-vmc-editorial">
          <div className="home-vmc-copy">
            <p className="eyebrow">Our story</p>
            <h2>Pets are family. <em>We treat them that way.</em></h2>
            <p>The dog who claims the middle of the couch. The cat who only settles on one lap. Pets aren&rsquo;t just part of the household. They&rsquo;re part of the family, and they deserve care that reflects it.</p>
            <p>As <strong>independently owned Northern Kentucky veterinarians</strong>, we answer to the families we serve, not a corporate office. That lets us slow down, get to know your whole household, and build care plans that fit real life, budgets, and personalities included.</p>
            <p>When the same team knows your dog or cat over the years, small changes in appetite, mobility, or behavior are easier to catch <strong>as part of an ongoing story</strong>, not a one-time appointment. From first puppy visits to senior years, we&rsquo;re here for every chapter.</p>
            <Link className="text-link" href="/team/">Meet the veterinarians →</Link>
          </div>
          <div className="home-vmc-image">
            <Image src="/images/family-pets-couch.jpg" alt="Northern Kentucky family relaxing on the couch with their poodle and cat" fill sizes="(max-width: 760px) 100vw, 48vw" />
          </div>
        </div>
      </Section>

      <TeamSection
        id="team"
        eyebrow="Our veterinarians"
        title={<>Meet your <em>Northern Kentucky veterinarians.</em></>}
        intro="Three doctors with more than 55 years of combined experience, from emergency medicine to feline-focused care, and one shared belief: good care starts with listening. Tap any doctor to read their full bio."
      />

      <Section tone="white" eyebrow="The VMC difference" title={<>Why families <em>choose us.</em></>} className="home-little-things">
        <div className="home-little-things-layout">
          <p>Good veterinary care isn&rsquo;t only about the exam room. It&rsquo;s about making space for your questions, helping nervous pets settle in, and making sure you leave knowing what comes next.</p>
          <div className="home-little-things-list">
            {differences.map(({ title, text, icon: Icon }) => (
              <article key={title}><span><Icon aria-hidden="true" size={18} /></span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark" eyebrow="Care at every age" title={<>Full-service care for <em>dogs and cats.</em></>} intro="From first vaccines to gray whiskers, our team is here for the everyday questions and the visits that need a little more time." className="home-life-stages">
        <div className="about-care-grid">
          {serviceCards.map(({ title, text, href, cta, icon: Icon }) => (
            <Link href={href} className="home-life-stage-card" key={title}>
              <Icon aria-hidden="true" size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
              <span>{cta} →</span>
            </Link>
          ))}
        </div>
        <Link className="text-link about-care-all" href="/services/">View all veterinary services →</Link>
      </Section>

      <Section tone="cream" eyebrow="Locations" title={<>Two clinics. <em>One standard of care.</em></>} className="home-locations-section">
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
                  <p>{location.shortName === "Fort Thomas" ? "Convenient for Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby Cincinnati neighborhoods." : "Convenient for Independence, Taylor Mill, Covington, Latonia, Erlanger, Florence, and central Northern Kentucky."}</p>
                  <address>{location.address}</address>
                  <a href={`tel:${location.tel}`}>{location.phone}</a>
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

      <Section tone="white" eyebrow="Communities we serve" title={<>Veterinarians for <em>every corner of Northern Kentucky.</em></>} intro="Families visit our two clinics from across Campbell, Kenton, and Boone counties, plus Greater Cincinnati. Find the clinic closest to you." className="about-communities">
        <div className="about-community-grid">
          {locations.map((location) => (
            <div key={location.slug}>
              <h3><Link href={`/locations/${location.slug}/`}>Near our {location.shortName} clinic</Link></h3>
              <ul>
                {nearbyCities.filter((page) => page.nearest.location === location.shortName).map((page) => (
                  <li key={page.slug}><Link href={`${page.canonicalPath}/`}>Vet near {page.city}, {page.state}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <FAQSection faqs={aboutFaqs} title="Questions about Veterinary Medical Centers" />

      <Section tone="warm" eyebrow="Helpful next steps" title={<>New here? <em>Start with these.</em></>} className="home-relationship-section">
        <div className="about-next-links">
          {resourceLinks.map(([label, href]) => (
            <Link key={href + label} href={href}>{label} →</Link>
          ))}
        </div>
      </Section>

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link>
          <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
          <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
        </>}
      />

      <JsonLd
        data={[
          { ...webpageSchema(pagePath, seo.title, seo.description), "@type": "AboutPage", about: { "@id": `${site.siteUrl}/#organization` } },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]),
          faqSchema(aboutFaqs),
          ...veterinarians.map((vet) =>
            personSchema({
              name: vet.name,
              jobTitle: vet.role,
              credentials: vet.credentials,
              path: `/team/${vet.slug}/`,
              url: `/team/${vet.slug}/`,
              image: vet.image ? absoluteUrl(vet.image) : undefined,
              description: vet.summary
            })
          ),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
