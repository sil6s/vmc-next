import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  HeartHandshake,
  MapPin,
  MessageSquareText,
  PawPrint,
  Stethoscope,
  UsersRound
} from "lucide-react";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, faqSchema, locationVeterinaryCareSchema, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.about.seo, path: "/about/" });

const aboutFaqs = [
  {
    question: "Is Veterinary Medical Center independently owned?",
    answer:
      "Yes. Veterinary Medical Center is an independently owned vet in Northern Kentucky led by Dr. Kristi Baker. Care decisions are made locally by a team that knows the Fort Thomas and Independence communities."
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
      "Veterinary Medical Center focuses on dogs and cats, including puppies, kittens, adult pets, and senior pets."
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

const whyCards = [
  {
    title: "Independent ownership",
    text: "VMC is led locally, so decisions are made close to the pets, clients, and communities the team serves.",
    icon: Building2
  },
  {
    title: "Continuity of care",
    text: "Familiar faces help your pet's history, preferences, and long-term health needs stay connected from visit to visit.",
    icon: UsersRound
  },
  {
    title: "Comfort-focused handling",
    text: "The team uses a Fear Free mindset where possible, with thoughtful pacing and handling that respects each pet.",
    icon: HeartHandshake
  },
  {
    title: "Full-service medicine",
    text: "Dogs and cats can receive wellness care, sick visits, dental care, surgery, senior support, and ongoing guidance.",
    icon: Stethoscope
  },
  {
    title: "Clear communication",
    text: "Recommendations are explained in practical language so families understand what matters now and what comes next.",
    icon: MessageSquareText
  },
  {
    title: "Local NKY roots",
    text: "With clinics in Fort Thomas and Independence, VMC supports pet owners across Northern Kentucky and Greater Cincinnati.",
    icon: MapPin
  }
];

const serviceCards = [
  ["Wellness & Preventive Care", "Routine exams, vaccines, and prevention help your local vet team catch changes early.", "/services/"],
  ["Puppy & Kitten Care", "First visits, vaccine timing, parasite prevention, and new pet guidance for a confident start.", "/veterinary-services/puppy-kitten-care/"],
  ["Dental Care", "Oral health support for bad breath, tartar, chewing changes, and preventive dental planning.", "/veterinary-services/pet-dental-care/"],
  ["Sick Visits & Medical Care", "Practical help when your pet is vomiting, limping, coughing, not eating, or acting differently.", "/veterinary-services/sick-pet-visits/"],
  ["Surgery & Soft Tissue Procedures", "Procedure planning with preparation, monitoring, pain control, and recovery instructions.", "/veterinary-services/soft-tissue-surgery/"],
  ["Senior Pet Care", "Closer monitoring for aging dogs and cats, mobility changes, dental needs, and chronic conditions.", "/veterinary-services/senior-pet-care/"],
  ["Online Pharmacy & Refills", "Approved medication, preventive, and refill support through VMC online tools.", "/online-vet-pharmacy-northern-kentucky-cincinnati/"]
];

const comparisonRows = [
  ["Familiar team over time", "Continuity of care across visits"],
  ["Clear answers", "Practical explanations, costs, and next steps"],
  ["Less stressful visits", "Comfort-focused handling and thoughtful pacing"],
  ["Local accountability", "Decisions made close to the community"],
  ["Convenient care", "Fort Thomas and Independence locations"]
];

const resourceLinks = [
  ["New patient information", "/new-patients/"],
  ["Vet services for dogs and cats", "/services/"],
  ["First vet visit guide", "/new-patients/"],
  ["Pet dental care", "/veterinary-services/pet-dental-care/"],
  ["Soft tissue surgery", "/veterinary-services/soft-tissue-surgery/"],
  ["Online pharmacy", "/online-vet-pharmacy-northern-kentucky-cincinnati/"],
  ["Patient portal", "/patient-portal-online-booking/"],
  ["Contact Veterinary Medical Center", "/contact/"]
];

const externalResources = [
  ["AVMA pet owner resources", "https://www.avma.org/resources/pet-owners"],
  ["Fear Free Happy Homes", "https://www.fearfreehappyhomes.com/"],
  ["ASPCA pet care resources", "https://www.aspca.org/pet-care"],
  ["Cat Friendly Homes", "https://catfriendly.com/"]
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Veterinary Medical Center"
        title="Independently Owned Veterinary Care in Northern Kentucky"
        body="Veterinary Medical Center is an independently owned vet in Northern Kentucky serving dogs and cats from Fort Thomas, Independence, and nearby communities with compassionate full-service care."
        image="/images/fort-thomas-clinic.jpg"
        imageAlt="Veterinary Medical Center Fort Thomas KY veterinary clinic location"
        badgeTitle="Licensed in KY & OH"
        badgeSub="Led by Dr. Kristi Baker"
        primaryCta={{ label: "Book Appointment", href: "/contact/" }}
        secondaryCta={{ label: "Choose a Location", href: "/locations/" }}
        tertiaryCta={{ label: "Meet Our Team", href: "#team" }}
      />

      <div className="home-trust-row" aria-label="About Veterinary Medical Center highlights">
        {["Independently owned", "Two Northern Kentucky locations", "Dogs and cats", "Fear Free approach", "Licensed in KY & OH"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <Section tone="white" eyebrow="Why VMC" title="Why families choose Veterinary Medical Center">
        <div className="card-grid">
          {whyCards.map(({ title, text, icon: Icon }) => (
            <article className="card" key={title}>
              <span className="icon-mark"><Icon aria-hidden="true" size={22} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Our Story" title="Built for families who want care that feels personal.">
        <div className="about-story-grid">
          <div className="about-story-copy">
            <p>Veterinary Medical Center exists for pet owners who want more than a quick transaction. Independent ownership allows the team to focus on steady relationships, clear communication, and care plans that make sense for each pet and family.</p>
            <p>When a vet team knows your dog or cat over time, the small details matter more. Changes in appetite, mobility, behavior, dental health, or comfort are easier to understand when they are part of an ongoing story instead of a one-time appointment.</p>
            <p>That is why VMC combines medical care with emotional comfort. The team supports wellness exams, sick visits, dentistry, surgery, and senior care while helping pets feel safer and owners feel more informed.</p>
          </div>
          <aside className="about-callout-card">
            <h3>Personal care looks like:</h3>
            <ul>
              {["Clear answers", "Familiar faces", "Comfort-focused visits", "Practical next steps", "Local accountability"].map((item) => (
                <li key={item}><BadgeCheck aria-hidden="true" size={17} />{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section id="team" tone="white" eyebrow="Our Team" title="Meet Dr. Baker and the care team">
        <div className="about-team-grid">
          <article className="about-doctor-card">
            <div>
              <p className="eyebrow">Owner & DVM</p>
              <h3>Dr. Kristi Baker</h3>
              <p>Dr. Baker leads Veterinary Medical Center with a community-rooted approach to dog and cat care. She is licensed in Kentucky and Ohio and built VMC around practical medicine, client education, and long-term trust.</p>
              <blockquote>Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.</blockquote>
            </div>
          </article>
          <article className="about-team-card">
            <h3>Dr. Becky Golatzki</h3>
            <p>Dr. Golatzki supports the same thoughtful standard of care across wellness, medical visits, communication, and pet comfort.</p>
          </article>
          <article className="about-team-card">
            <h3>Care team, RVTs, and client support</h3>
            <p>Office leadership, registered veterinary technicians, assistants, and client service team members help make each visit organized, calmer, and easier to understand.</p>
          </article>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Locations" title="Two locations, one standard of care">
        <div className="about-location-grid">
          {locations.map((location, index) => (
            <article className="about-location-card" key={location.slug}>
              <Image src={location.image} alt={location.imageAlt} width={720} height={460} />
              <div>
                <h3>{location.shortName}</h3>
                <p>{location.shortName === "Fort Thomas" ? "Convenient for Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby Cincinnati neighborhoods." : "Convenient for Independence, Taylor Mill, Covington, Latonia, Erlanger, Florence, and central Northern Kentucky."}</p>
                <address>{location.address}</address>
                <a className="text-link" href={`tel:${location.tel}`}>{location.phone}</a>
                <div className="inline-actions">
                  <Link className="btn btn-primary" href="/contact/">Book at this location</Link>
                  <a className="btn btn-ghost" href={site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
                  <Link className="text-link" href={`/locations/${location.slug}/`}>View location page</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="Care" title="Full-service veterinary care for dogs and cats">
        <div className="about-service-grid">
          {serviceCards.map(([title, text, href]) => (
            <article className="about-service-card" key={title}>
              <PawPrint aria-hidden="true" size={18} />
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href={href}>Learn more</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Independent Care" title="What makes independent veterinary care different?">
        <div className="about-comparison">
          {comparisonRows.map(([want, support]) => (
            <div key={want}>
              <span>{want}</span>
              <strong>{support}</strong>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="Resources" title="Helpful resources for pet owners">
        <div className="about-resource-grid">
          <div>
            <h3>VMC resources</h3>
            <ul>
              {resourceLinks.map(([label, href]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Trusted pet care resources</h3>
            <ul>
              {externalResources.map(([label, href]) => (
                <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <FAQSection faqs={aboutFaqs} title="Questions about Veterinary Medical Center" />

      <Section tone="red">
        <div className="cta-panel">
          <p className="eyebrow">Next Steps</p>
          <h2>Ready for veterinary care that feels more personal?</h2>
          <p>Whether your pet needs a first visit, a wellness exam, dental care, surgery, or help with a health concern, VMC is here to make the next step clear.</p>
          <div className="hero-actions">
            <Link className="btn btn-secondary" href="/contact/">Book Appointment</Link>
            <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
            <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
            <Link className="btn btn-ghost" href="/services/">View Services</Link>
          </div>
          <div className="about-cta-strip">
            {site.locations.map((location) => (
              <address key={location.id}>
                <strong>{location.name}</strong>
                <span>{location.address}</span>
                <a href={`tel:${location.tel}`}>{location.phone}</a>
              </address>
            ))}
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          webpageSchema("/about/", pages.about.seo.title, pages.about.seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }]),
          faqSchema(aboutFaqs),
          ...locations.map((location) => locationVeterinaryCareSchema(location, `/locations/${location.slug}/`))
        ]}
      />
    </>
  );
}
