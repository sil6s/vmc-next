import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { CalendarCheck, Clock, Clock3, FileText, GraduationCap, HandHeart, Heart, HeartHandshake, MapPin, MessageSquareText, PawPrint, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { HomeCareFinder } from "@/components/sections/HomeCareFinder";
import { HomeResourceCarousel } from "@/components/sections/HomeResourceCarousel";
import { HomeServiceTabs } from "@/components/sections/HomeServiceTabs";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { TeamSection } from "@/components/sections/TeamSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { localizedSeo } from "@/data/localized-seo";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { isLocale, localizedLanguageAlternates } from "@/lib/i18n";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";
import { fetchHomepagePersonProfiles } from "@/sanity/personProfiles";
import { getBlogPosts } from "@/sanity/posts";

export async function generateMetadata(): Promise<Metadata> {
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const seo = locale === "en" ? pages.home.seo : localizedSeo[locale]["/"];
  const path = locale === "en" ? "/" : `/${locale}/`;
  return pageMetadata({ ...seo, path, languages: localizedLanguageAlternates("/") });
}

const localCards = [
  {
    title: "We listen before recommending",
    text:
      "Every visit starts with your pet's history and your concerns, not a script. We take time to understand what's going on before we suggest what to do about it.",
    icon: HandHeart
  },
  {
    title: "Clear answers without pressure",
    text:
      "We explain what's urgent, what's preventive, and what can wait in plain language, so you can make decisions with confidence instead of on the spot.",
    icon: MessageSquareText
  },
  {
    title: "Familiar faces at future visits",
    text:
      "The same local team gets to know your pet over time, so each visit builds on the last instead of starting over with a stranger.",
    icon: Clock3
  },
  {
    title: "Support after you return home",
    text:
      "Care doesn't end at checkout. Our team is here for follow-up questions after your visit, not just during it.",
    icon: HeartHandshake
  },
  {
    title: "Care shaped around your pet",
    text:
      "From routine wellness to dental care, surgery planning, sick visits, and senior support, your pet's care plan is built around their needs, not a standard script.",
    icon: PawPrint
  },
  {
    title: "Two convenient local clinics",
    text:
      "Fort Thomas and Independence give Northern Kentucky families a nearby, locally owned option for dogs and cats.",
    icon: MapPin
  }
];

const newClientSteps = [
  ["Choose your location", "Pick the Fort Thomas vet location or Independence vet location based on what is easiest for your day."],
  ["Schedule your visit", "Request an appointment online or call your local Veterinary Medical Centers team for help choosing the right appointment type."],
  ["Send or bring records", "Vaccine history, medications, prior exam notes, and adoption paperwork help us understand your pet faster."],
  ["Meet your vet team", "We take time to learn your pet's history, answer questions, and complete a thoughtful exam."],
  ["Leave with a clear care plan", "You leave with practical recommendations, follow-up timing, and next steps for your dog or cat."]
];

const toolLinks = [
  { title: "Schedule an Appointment", text: "Request a visit with your local vet team.", href: "/book-appointment/", icon: CalendarCheck },
  { title: "Request a Refill", text: "Use the pharmacy path for eligible medication support.", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/", icon: Stethoscope },
  { title: "Access Pet Records", text: "Use the patient portal for records and online booking.", href: "/patient-portal-online-booking/", icon: FileText },
  { title: "Online Pharmacy", text: "Shop trusted products and refill options online.", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/", icon: PawPrint },
  { title: "New Client Forms", text: "Start your first visit paperwork before you arrive.", href: "/new-patient-registration-form/", icon: ShieldCheck }
];

const firstVisitCards = [
  ["Before your appointment", "Bring vaccine records, medication details, and any questions you want to discuss."],
  ["During the exam", "We’ll review your pet’s lifestyle, health history, symptoms, and complete a thorough physical exam."],
  ["After the visit", "You’ll leave with clear recommendations, prevention guidance, and follow-up instructions if needed."]
];

const serviceAreaChips = ["Fort Thomas", "Independence", "Newport", "Bellevue", "Dayton", "Highland Heights", "Alexandria", "Cold Spring", "Cincinnati-area pet owners"];

function officialLocationName(shortName: string) {
  return shortName === "Fort Thomas" ? "Veterinary Medical Centers of Fort Thomas" : "Veterinary Medical Centers of Independence";
}

function locationTagline(shortName: string) {
  return shortName === "Fort Thomas"
    ? "Neighborhood veterinary care on Memorial Parkway"
    : "Personalized care for families throughout central Kenton County";
}

function MapEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="home-map-embed">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default async function HomePage() {
  const hero = pages.home.hero;
  const settings = await getPublicSettings();
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const seo = locale === "en" ? pages.home.seo : localizedSeo[locale]["/"];
  const pagePath = locale === "en" ? "/" : `/${locale}/`;
  const [resourceGuides, staffProfiles] = await Promise.all([getBlogPosts(24), fetchHomepagePersonProfiles()]);
  const carouselPosts = resourceGuides.slice(0, 8).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    imageUrl: post.featuredImage || "/images/veterinary-care-hero.jpg",
    imageAlt: post.featuredImageAlt || `${post.title} — Veterinary Medical Centers Northern Kentucky`,
    readingTime: post.readingTime || "Pet care resource"
  }));

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        emphasis={hero.emphasis}
        body={hero.body}
        image={hero.image}
        imageAlt={hero.imageAlt}
        badgeTitle={hero.badgeTitle}
        badgeSub={hero.badgeSub}
        showStats={false}
        inlineEmphasis
        afterActions={(
          <div className="home-hero-new-here" aria-label="New client next steps">
            <div>
              <strong>New here?</strong>
              <p>We&rsquo;ll help you feel prepared from the moment you book — request an appointment, ask a question, or start with a wellness visit.</p>
            </div>
            <div className="hero-actions">
              <Button href="/book-appointment/">Request an Appointment</Button>
              <Button href="/contact/#message-form" variant="ghost">Message Our Team</Button>
              <Button href="/services/" variant="ghost">Explore Services</Button>
            </div>
          </div>
        )}
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          Locally owned, proudly caring for Northern Kentucky pets
        </p>
      </div>

      <TrustBar items={pages.home.ticker} />

      <Section
        tone="white"
        eyebrow="Find Care"
        title="Find the right care for your pet"
        intro="Whether your pet needs a routine checkup, is showing new symptoms, or you’re switching to a local veterinarian in Northern Kentucky for the first time, we’ll help you find the right next step at our Fort Thomas or Independence clinic."
      >
        <HomeCareFinder />
        <p className="home-reassurance-line">If you&rsquo;re worried, reach out. Our team can help you determine the next step.</p>
      </Section>

      <Section
        tone="cream"
        eyebrow="Local Vet Center"
        title="Local ownership means your pet is never just another appointment"
        intro="Veterinary Medical Centers was built around long-term relationships with Northern Kentucky families. Our team takes the time to understand your pet's personality, history, and needs so each visit feels personal rather than transactional."
      >
        <div className="card-grid">
          {localCards.map(({ title, text, icon: Icon }) => (
            <article className="card" key={title}>
              <span className="icon-mark">
                <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="white"
        eyebrow="Vet Services"
        title="Vet services for dogs and cats in Northern Kentucky"
        intro="From first visits and vaccines to dental cleanings, surgery, diagnostics, and ongoing wellness, our Northern Kentucky vet team helps dogs and cats stay healthy through every stage of life — at our vet in Fort Thomas and our vet in Independence, Kentucky."
      >
        <p className="home-section-lede">Whatever brings you in, we&rsquo;ll meet your pet with patience and help you understand the next step. You don&rsquo;t need to have all the answers before calling.</p>
        <HomeServiceTabs />
      </Section>

      <Section tone="cream" eyebrow="New Clients" title="New to our vet center? Here’s what to expect">
        <div className="home-new-client-steps">
          {newClientSteps.map(([title, text], index) => (
            <article key={title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="home-reassurance-line">Not sure what kind of appointment your pet needs? We&rsquo;ll help.</p>
        <div className="hero-actions">
          <Button href="/new-patients/">Start as a New Client</Button>
          <Button href="/new-patients/" variant="ghost">What to bring to your first visit</Button>
        </div>
      </Section>

      <Section tone="white" eyebrow="First Visit" title="What to expect at your first visit">
        <div className="first-visit-home">
          <div>
            <p>
              Starting with a new veterinarian in Northern Kentucky should feel simple. At our locally owned veterinary clinic, we review your pet’s history, talk through your concerns, complete a nose-to-tail exam, and help you understand the best next steps — whether you’re visiting our vet in Fort Thomas or our vet in Independence.
            </p>
            <p className="home-reassurance-line">A new clinic can feel unfamiliar. We&rsquo;ll walk you through it.</p>
            <Button href="/new-patients/">Plan Your First Visit</Button>
          </div>
          <div className="first-visit-card-grid">
            {firstVisitCards.map(([title, text], index) => (
              <article key={title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="locations"
        tone="white"
        eyebrow="Northern Kentucky Locations"
        title="Choose your Northern Kentucky veterinary location"
        intro="With two convenient Veterinary Medical Centers locations in Northern Kentucky, our team is here to support dogs, cats, and the people who love them."
        className="home-locations-section"
      >
        <p className="home-section-lede">Two local clinics. One shared commitment to knowing your pet and caring for them well.</p>
        <div className="home-location-grid">
          {locations.map((location, index) => (
            <article className="home-location-card" key={location.slug}>
              <div className="home-location-copy">
                <p className="location-kicker">
                  <MapPin aria-hidden="true" size={15} />
                  Northern Kentucky location
                </p>
                <h3>
                  <Link href={`/locations/${location.slug}/`}>{officialLocationName(location.shortName)}</Link>
                </h3>
                <p className="home-location-tagline">{locationTagline(location.shortName)}</p>
                <p>
                  {location.shortName === "Fort Thomas"
                    ? "Veterinary Medical Centers of Fort Thomas provides local veterinary care for dogs and cats in Fort Thomas and nearby Northern Kentucky communities, including wellness visits, preventive care, dental care, diagnostics, surgery support, and everyday guidance."
                    : "Veterinary Medical Centers of Independence provides trusted veterinary care for dogs and cats in Independence, KY and nearby Northern Kentucky communities, including wellness visits, preventive care, dental care, diagnostics, surgery, and ongoing health guidance."}
                </p>
                <div className="home-location-details">
                  <address>
                    <MapPin aria-hidden="true" size={17} />
                    {location.address}
                  </address>
                  <a href={`tel:${location.tel}`} aria-label={`Call ${officialLocationName(location.shortName)} at ${location.phone}`}>
                    <Phone aria-hidden="true" size={17} />
                    {location.phone}
                  </a>
                  <p>
                    <Clock aria-hidden="true" size={17} />
                    {settings.publicLocations[index]?.hours[0] || site.locations[index].hours[0]}
                  </p>
                </div>
                <p className="home-location-nearby">
                  {location.shortName === "Fort Thomas"
                    ? "Serving Fort Thomas, Newport, Bellevue, Dayton, Highland Heights, and nearby Cincinnati-area pet owners."
                    : "Serving Independence, Alexandria, Taylor Mill, Covington, Erlanger, and nearby Northern Kentucky pet owners."}
                </p>
              </div>
              <MapEmbed src={settings.publicLocations[index]?.mapEmbedUrl || site.locations[index].mapEmbedUrl} title={`Map to ${officialLocationName(location.shortName)}`} />
              <div className="inline-actions">
                <a className="btn btn-primary" href={settings.publicLocations[index]?.mapUrl || site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                <a className="btn btn-ghost" href={`tel:${location.tel}`}>Call This Location</a>
                <Link className="btn btn-ghost" href="/book-appointment/">Request Appointment</Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Local Service Area" title="Local veterinary care across Northern Kentucky">
        <p className="section-narrow-copy">
          We proudly care for pets from Fort Thomas, Independence, Newport, Bellevue, Dayton, Highland Heights, Alexandria, Cold Spring, and nearby Cincinnati-area communities.
        </p>
        <div className="service-area-chips" aria-label="Northern Kentucky communities served">
          {serviceAreaChips.map((community) => (
            <span key={community}>{community}</span>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="A Note From Dr. Kristi" title="Meet the person behind Veterinary Medical Centers" className="section-compact home-kristi-section">
        <div className="doctor-spotlight home-kristi-intro">
          <div className="doctor-spotlight-media">
            <Image
              src="/images/kristi-baker-headshot-vertical.jpg"
              alt="Dr. Kristi Baker, owner and veterinarian at Veterinary Medical Centers"
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
          <div className="doctor-spotlight-copy">
            <p>Dr. Kristi Baker brings more than two decades of veterinary experience to pets and families across Northern Kentucky, combining practical medical guidance with a calm, approachable style.</p>
            <blockquote className="doctor-spotlight-quote">Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.</blockquote>
            <p className="doctor-spotlight-signature" aria-hidden="true">Dr. Kristi</p>
            <ul className="doctor-spotlight-facts">
              <li><GraduationCap aria-hidden="true" size={15} /> Ross University School of Veterinary Medicine — DVM, 2000&ndash;2003</li>
              <li><GraduationCap aria-hidden="true" size={15} /> Purdue University — Clinical Rotation, Veterinary Medicine, 2003&ndash;2004</li>
            </ul>
          </div>
        </div>
      </Section>

      <TeamSection staffSettings={settings.staff} personProfiles={staffProfiles} />

      <Section tone="white" eyebrow="Reviews" title="Kind words from Northern Kentucky pet families">
        <HomeTestimonials />
      </Section>

      <Section tone="cream" eyebrow="Pet Care Guides" title="Helpful pet care guides from your local vet team">
        <HomeResourceCarousel posts={carouselPosts} total={resourceGuides.length} />
      </Section>

      <Section tone="white" eyebrow="Online Tools" title="Manage your pet’s care online">
        <div className="quick-links-grid">
          {toolLinks.map(({ title, text, href, icon: Icon }) => (
            <Link href={href} className="quick-link-card" key={title}>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
              <Icon aria-hidden="true" size={18} />
            </Link>
          ))}
        </div>
      </Section>

      <FAQSection faqs={homeFaqs} title="Common questions about vet care in Northern Kentucky" />
      <Section tone="red">
        <div className="cta-panel">
          <p className="eyebrow">Next Steps</p>
          <h2>Ready to schedule a visit with your Northern Kentucky vet team?</h2>
          <p>Choose your location, request an appointment, or call our team. We’ll help you find the right next step for your dog or cat.</p>
          <p className="cta-footnote">From our Northern Kentucky family to yours, we&rsquo;re here when your pet needs us.</p>
          <div className="hero-actions">
            <Button href="/book-appointment/" variant="secondary">Request an Appointment</Button>
            <Button href="/contact/#message-form" variant="ghost">Message Our Team</Button>
            <Button href={`tel:${settings.publicLocations[0]?.tel || site.locations[0].tel}`} variant="ghost">Call the Clinic</Button>
          </div>
        </div>
      </Section>
      <JsonLd
        data={[
          webpageSchema(pagePath, seo.title, seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(homeFaqs),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
