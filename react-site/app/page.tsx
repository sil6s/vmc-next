import Link from "next/link";
import { Baby, CalendarCheck, Clock, Clock3, ClipboardList, FileText, HandHeart, HeartHandshake, MapPin, MessageSquareText, PawPrint, Phone, ShieldCheck, SmilePlus, Stethoscope, Syringe } from "lucide-react";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { HomeCareFinder } from "@/components/sections/HomeCareFinder";
import { HomeServiceTabs } from "@/components/sections/HomeServiceTabs";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { TeamSection } from "@/components/sections/TeamSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";
import { breadcrumbSchema, faqSchema, JsonLd, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.home.seo, path: "/" });

const localCards = [
  {
    title: "Local relationships",
    text:
      "VMC is rooted in Northern Kentucky, with a vet team that gets to know your pet's history, your goals, and what helps visits feel easier over time.",
    icon: HandHeart
  },
  {
    title: "Clear communication",
    text:
      "We explain what we see, what matters now, what can wait, and what each recommendation means before moving forward.",
    icon: MessageSquareText
  },
  {
    title: "Practical care plans",
    text:
      "Care should fit your pet and your family. Our team talks through options, costs, timing, and next steps in plain language.",
    icon: ShieldCheck
  },
  {
    title: "Dog and cat care",
    text:
      "From routine wellness to dental care, surgery planning, sick visits, and senior support, we care for dogs and cats at both NKY locations.",
    icon: PawPrint
  },
  {
    title: "Calm, comfortable visits",
    text:
      "We work to make each visit feel as low-stress as possible with gentle handling, patient pacing, and a team that understands pets may need time to settle in.",
    icon: HeartHandshake
  },
  {
    title: "Continuity over time",
    text:
      "By caring for your pet across life stages, we can notice changes earlier, track ongoing needs, and recommend next steps with more context.",
    icon: Clock3
  }
];

const newClientSteps = [
  ["Choose your location", "Pick the Fort Thomas vet location or Independence vet location based on what is easiest for your day."],
  ["Schedule your visit", "Request an appointment online or call your local VMC team for help choosing the right appointment type."],
  ["Send or bring records", "Vaccine history, medications, prior exam notes, and adoption paperwork help us understand your pet faster."],
  ["Meet your vet team", "We take time to learn your pet's history, answer questions, and complete a thoughtful exam."],
  ["Leave with a clear care plan", "You leave with practical recommendations, follow-up timing, and next steps for your dog or cat."]
];

const toolLinks = [
  { title: "Schedule an Appointment", text: "Request a visit with your local vet team.", href: "/contact/", icon: CalendarCheck },
  { title: "Request a Refill", text: "Use the pharmacy path for eligible medication support.", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/", icon: Stethoscope },
  { title: "Access Pet Records", text: "Use the patient portal for records and online booking.", href: "/patient-portal-online-booking/", icon: FileText },
  { title: "Online Pharmacy", text: "Shop trusted products and refill options online.", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/", icon: PawPrint },
  { title: "New Client Forms", text: "Start your first visit paperwork before you arrive.", href: "/new-patient-registration-form/", icon: ShieldCheck }
];

const guideCards = [
  {
    title: "First Vet Visit in Northern Kentucky",
    text: "What to bring, how to prepare, and how your first VMC visit should feel.",
    href: "/new-patients/",
    icon: ClipboardList
  },
  {
    title: "Puppy & Kitten Vaccine Guide",
    text: "Understand early vaccine timing, parasite prevention, and first-year care planning.",
    href: "/veterinary-services/puppy-kitten-care/",
    icon: Baby
  },
  {
    title: "When to Schedule a Dental Cleaning",
    text: "Learn signs that your dog or cat may need a dental exam or professional cleaning.",
    href: "/veterinary-services/pet-dental-care/",
    icon: SmilePlus
  },
  {
    title: "Senior Pet Wellness Checklist",
    text: "Know what to watch for as pets age, from mobility and dental changes to appetite shifts.",
    href: "/veterinary-services/senior-pet-care/",
    icon: ShieldCheck
  },
  {
    title: "Signs Your Pet Should See a Vet",
    text: "A practical guide to symptoms, behavior changes, and when to call your local vet team.",
    href: "/veterinary-services/sick-pet-visits/",
    icon: Stethoscope
  },
  {
    title: "Parasite Prevention in Kentucky",
    text: "Learn why heartworm, flea, tick, and intestinal parasite prevention matters year-round.",
    href: "/veterinary-services/parasite-prevention/",
    icon: Syringe
  }
];

const firstVisitCards = [
  ["Before your appointment", "Bring vaccine records, medication details, and any questions you want to discuss."],
  ["During the exam", "We’ll review your pet’s lifestyle, health history, symptoms, and complete a thorough physical exam."],
  ["After the visit", "You’ll leave with clear recommendations, prevention guidance, and follow-up instructions if needed."]
];

const serviceAreaChips = ["Fort Thomas", "Independence", "Newport", "Bellevue", "Dayton", "Highland Heights", "Alexandria", "Cold Spring", "Cincinnati-area pet owners"];

function officialLocationName(shortName: string) {
  return shortName === "Fort Thomas" ? "Veterinary Medical Center of Fort Thomas" : "Veterinary Medical Center of Independence";
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
              <p>New to Northern Kentucky Veterinary Medical Center? Start with a wellness visit, request an appointment, or message our team with questions.</p>
            </div>
            <div className="hero-actions">
              <Button href="/contact/">Request an Appointment</Button>
              <Button href="/contact/#chat-support" variant="ghost">Message Our Team</Button>
              <Button href="/services/" variant="ghost">Explore Services</Button>
            </div>
          </div>
        )}
      />
      <TrustBar items={pages.home.ticker} />

      <Section
        tone="white"
        eyebrow="Find Care"
        title="Find the right care for your pet"
        intro="Whether your pet is due for a checkup, showing new symptoms, or starting care with our team for the first time, we’ll help you find the right next step."
      >
        <HomeCareFinder />
      </Section>

      <Section
        tone="cream"
        eyebrow="Local Vet Center"
        title="A locally owned vet center that treats you like neighbors"
        intro="Veterinary Medical Center is rooted in Northern Kentucky. Our care is personal, calm, practical, and relationship-based, whether your pet needs everyday wellness or help with more complex health needs."
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
        intro="From first visits and vaccines to dental cleanings, surgery, diagnostics, and ongoing wellness, our vet team helps pets stay healthy through every stage of life."
      >
        <HomeServiceTabs />
      </Section>

      <Section tone="cream" eyebrow="New Clients" title="New to our vet center? Here’s what to expect">
        <div className="location-timeline">
          {newClientSteps.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <Button href="/new-patients/">Start as a New Client</Button>
          <Button href="/new-patients/" variant="ghost">What to bring to your first visit</Button>
        </div>
      </Section>

      <Section tone="white" eyebrow="First Visit" title="What to expect at your first visit">
        <div className="first-visit-home">
          <div>
            <p>
              Starting with a new veterinarian should feel simple. We’ll review your pet’s history, talk through your concerns, complete a nose-to-tail exam, and help you understand the best next steps for your pet’s health.
            </p>
            <Button href="/new-patients/">Plan Your First Visit</Button>
          </div>
          <div className="first-visit-card-grid">
            {firstVisitCards.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
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
        intro="With two convenient Veterinary Medical Center locations in Northern Kentucky, our team is here to support dogs, cats, and the people who love them."
        className="home-locations-section"
      >
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
                <p>
                  {location.shortName === "Fort Thomas"
                    ? "Veterinary Medical Center of Fort Thomas provides local veterinary care for dogs and cats in Fort Thomas and nearby Northern Kentucky communities, including wellness visits, preventive care, dental care, diagnostics, surgery support, and everyday guidance."
                    : "Veterinary Medical Center of Independence provides trusted veterinary care for dogs and cats in Independence, KY and nearby Northern Kentucky communities, including wellness visits, preventive care, dental care, diagnostics, surgery, and ongoing health guidance."}
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
                <Link className="btn btn-ghost" href={settings.externalLinks.bookAppointmentUrl || "/contact/"}>Request Appointment</Link>
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

      <TeamSection />

      <Section tone="white" eyebrow="Pawstimonials" title="Pawstimonials from pets and their people">
        <HomeTestimonials />
      </Section>

      <Section tone="cream" eyebrow="Pet Care Guides" title="Helpful pet care guides from your local vet team">
        <div className="resource-card-grid">
          {guideCards.map(({ title, text, href, icon: Icon }) => (
            <article className="resource-card" key={title}>
              <Icon aria-hidden="true" size={22} />
              <p className="eyebrow">Guide</p>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>3 min read</small>
              <Link href={href}>Read guide</Link>
            </article>
          ))}
        </div>
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
          <div className="hero-actions">
            <Button href={settings.externalLinks.bookAppointmentUrl || "/contact/"} variant="secondary">Request an Appointment</Button>
            <Button href="/contact/#chat-support" variant="ghost">Message Our Team</Button>
            <Button href={`tel:${settings.publicLocations[0]?.tel || site.locations[0].tel}`} variant="ghost">Call the Clinic</Button>
          </div>
        </div>
      </Section>
      <JsonLd
        data={[
          webpageSchema("/", pages.home.seo.title, pages.home.seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          faqSchema(homeFaqs),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
