import Link from "next/link";
import { MapPin, Phone, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ServiceBrowser } from "@/components/sections/ServiceBrowser";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import { serviceCategoryLabels, type ServiceCategory } from "@/data/serviceHub";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, organizationSchema, serviceListSchema, webpageSchema } from "@/lib/schema";
import { getServiceHubCards } from "@/sanity/services";

const seo = {
  title: "Veterinary Services in Northern Kentucky | Dog & Cat Vet Care",
  description:
    "Explore veterinary services for dogs and cats in Northern Kentucky, including wellness exams, vaccines, dental care, surgery, diagnostics, and sick visits."
};

const carePaths: { label: string; description: string; category: ServiceCategory }[] = [
  { label: "Preventive care", description: "Wellness, vaccines, parasite prevention, and nutrition.", category: "preventiveCare" },
  { label: "Sick or urgent concerns", description: "New symptoms, diagnostics, skin, ear, and allergy care.", category: "medicalCare" },
  { label: "Dental care", description: "Oral exams, dental cleanings, and treatment planning.", category: "dentalSurgery" },
  { label: "Surgery and diagnostics", description: "Soft tissue surgery, spay and neuter, and lab work.", category: "dentalSurgery" }
];

const categories = [
  {
    title: "Preventive Care",
    copy: "Routine care helps protect your pet's health and gives your family a clear plan before small concerns become bigger problems.",
    items: ["Wellness exams", "Vaccinations", "Parasite prevention", "Nutrition and weight guidance"]
  },
  {
    title: "Medical Care",
    copy: "When something feels off, our team can evaluate symptoms, recommend testing, and explain practical treatment options.",
    items: ["Sick visits", "Diagnostics", "Skin and ear concerns", "Chronic condition support"]
  },
  {
    title: "Dental, Surgical & Life Stage Care",
    copy: "For changing needs, dental concerns, or procedures, we focus on preparation, communication, comfort, and follow-through.",
    items: ["Pet dental care", "Spay and neuter", "Soft tissue surgery", "Puppy, kitten, and senior care"]
  }
];

const situationCards = [
  {
    title: "My pet seems healthy but is due for care",
    services: [
      ["Wellness Exam", "wellness-exams"],
      ["Vaccinations", "dog-cat-vaccinations"],
      ["Parasite Prevention", "parasite-prevention"]
    ]
  },
  {
    title: "My pet is sick or acting different",
    services: [
      ["Sick Pet Visit", "sick-pet-visits"],
      ["Diagnostics", "veterinary-diagnostics"],
      ["Skin, Ear & Allergy Care", "skin-ear-allergy-care"]
    ]
  },
  {
    title: "My pet has bad breath or trouble chewing",
    services: [
      ["Dental Care", "pet-dental-care"],
      ["Wellness Exam", "wellness-exams"],
      ["Senior Pet Care", "senior-pet-care"]
    ]
  },
  {
    title: "I have a new puppy or kitten",
    services: [
      ["Puppy & Kitten Care", "puppy-kitten-care"],
      ["Vaccinations", "dog-cat-vaccinations"],
      ["Parasite Prevention", "parasite-prevention"]
    ]
  },
  {
    title: "My pet may need surgery",
    services: [
      ["Spay & Neuter", "spay-neuter-surgery"],
      ["Soft Tissue Surgery", "soft-tissue-surgery"],
      ["Diagnostics", "veterinary-diagnostics"]
    ]
  },
  {
    title: "My pet is getting older",
    services: [
      ["Senior Pet Care", "senior-pet-care"],
      ["Diagnostics", "veterinary-diagnostics"],
      ["Nutrition & Weight Guidance", "nutrition-weight-guidance"]
    ]
  }
];

const visitSteps = [
  ["Schedule the right appointment", "Choose the service that best fits your pet's needs or contact us for help deciding."],
  ["Share your concerns", "Tell us about symptoms, behavior changes, lifestyle, diet, medications, or previous records."],
  ["Meet with our veterinary team", "We examine your pet, answer your questions, and explain what we are seeing in plain language."],
  ["Review recommendations", "Your veterinarian may recommend preventive care, diagnostics, treatment, dental care, or follow-up steps."],
  ["Leave with a clear plan", "We make sure you understand next steps, medications, home care, and when to return."]
];

const resourceLinks = [
  {
    title: "First Vet Visit in Northern Kentucky",
    description: "New patient details, forms, records, and what to expect before your first VMC visit.",
    href: "/new-patients/"
  },
  {
    title: "Northern Kentucky Vet Near Me",
    description: "Learn how our Fort Thomas and Independence locations serve nearby NKY communities.",
    href: "/vet-near-me/"
  },
  {
    title: "Pet Dental Care in Northern Kentucky",
    description: "See how dental exams, cleanings, and treatment planning support long-term comfort.",
    href: "/veterinary-services/pet-dental-care/"
  },
  {
    title: "Pet Soft Tissue Surgery in Northern Kentucky",
    description: "Review common surgical care, preparation, monitoring, and recovery support.",
    href: "/veterinary-services/soft-tissue-surgery/"
  },
  {
    title: "About Veterinary Medical Center",
    description: "Meet the locally owned team behind VMC's relationship-based veterinary care.",
    href: "/about/"
  },
  {
    title: "Contact Veterinary Medical Center",
    description: "Call, request an appointment, or choose the VMC location that is closest to home.",
    href: "/contact/"
  }
];

const servicesFaqs = [
  {
    question: "What veterinary services do you offer?",
    answer:
      "We offer wellness exams, vaccines, puppy and kitten care, dental care, diagnostics, sick visits, senior pet care, parasite prevention, spay and neuter, and select soft tissue surgery for dogs and cats."
  },
  {
    question: "Do you care for both dogs and cats?",
    answer: "Yes. Veterinary Medical Center provides veterinary care for dogs, cats, puppies, and kittens."
  },
  {
    question: "How often should my pet see a veterinarian?",
    answer:
      "Most pets benefit from at least one wellness exam each year. Puppies, kittens, senior pets, and pets with ongoing health conditions may need more frequent visits."
  },
  {
    question: "Do you offer pet dental cleanings?",
    answer:
      "Yes. We provide dental evaluations and professional dental care recommendations for dogs and cats. Dental care can help with bad breath, tartar, discomfort, and oral disease."
  },
  {
    question: "Do you offer surgery?",
    answer:
      "Yes. Our team provides spay and neuter procedures and select soft tissue surgeries. We discuss preparation, monitoring, pain control, and recovery instructions before surgery."
  },
  {
    question: "Which location should I choose?",
    answer:
      "Choose the Fort Thomas or Independence location based on what is most convenient for your family. If you are unsure, contact our team and we can help."
  },
  {
    question: "What should I bring to my pet's first visit?",
    answer:
      "Bring any available vaccine records, medication information, previous medical records, adoption paperwork, and a list of questions or concerns."
  },
  {
    question: "What if my pet needs urgent or emergency care?",
    answer:
      "If your pet is experiencing severe symptoms or a medical emergency, contact an emergency veterinary hospital right away. For non-emergency concerns, call our team and we can help determine the right next step."
  }
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" }
];

export const metadata = pageMetadata({ ...seo, path: "/services/" });

export default async function ServicesPage() {
  const services = await getServiceHubCards();

  return (
    <>
      <section className="services-hero">
        <Container>
          <div className="services-hero-grid">
            <div className="services-hero-copy">
              <p className="eyebrow">Veterinary Services in Northern Kentucky</p>
              <h1>Veterinary Care for Dogs & Cats in Northern Kentucky</h1>
              <p>
                From routine wellness exams and vaccines to dental care, diagnostics, surgery, and sick visits,
                Veterinary Medical Center of Northern Kentucky provides relationship-based care for pets across Fort
                Thomas, Independence, and nearby NKY communities.
              </p>
              <div className="hero-actions">
                <Button href="/contact/">Book an Appointment</Button>
                <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Call Our Team</Button>
              </div>
              <ul className="services-trust-list" aria-label="Veterinary Medical Center service highlights">
                <li>Locally owned veterinary care</li>
                <li>Two convenient NKY locations</li>
                <li>Dogs, cats, puppies, and kittens</li>
                <li>Preventive, medical, dental, and surgical services</li>
              </ul>
            </div>
            <aside className="care-path-card" aria-label="Choose your veterinary care path">
              <div className="popular-services-icon">
                <Stethoscope aria-hidden="true" size={32} />
              </div>
              <p className="eyebrow">Choose Your Care Path</p>
              <h2>Start with the care your pet needs.</h2>
              <div className="care-path-list">
                {carePaths.map((path) => (
                  <a key={path.label} href="#service-browser">
                    <strong>{path.label}</strong>
                    <span>{path.description}</span>
                    <small>{serviceCategoryLabels[path.category]}</small>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <section className="services-section services-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Service Finder</p>
            <h2>Find the right care path for your pet.</h2>
            <p>
              Start with a broad care type, then use the service browser below to compare specific appointments and
              next steps.
            </p>
          </div>
          <nav className="service-finder" aria-label="Veterinary care category links">
            {carePaths.map((path) => (
              <a key={path.label} href="#service-browser">{path.label}</a>
            ))}
          </nav>
        </Container>
      </section>

      <section className="services-section services-section-cream">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Browse Services</p>
            <h2>Explore veterinary services by care type.</h2>
            <p>
              Choose a care category to quickly find the right service for your dog or cat. Each service includes clear
              next steps, what to expect, and when to schedule an appointment.
            </p>
          </div>
          <ServiceBrowser services={services} />
        </Container>
      </section>

      <section className="services-section services-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Choose by Situation</p>
            <h2>What does your pet need help with?</h2>
            <p>
              If you do not know the service name yet, start with what you are noticing. These common situations point
              to helpful appointment types.
            </p>
          </div>
          <div className="situation-grid">
            {situationCards.map((card) => (
              <details className="situation-card" key={card.title}>
                <summary>{card.title}</summary>
                <div>
                  <p>Recommended services:</p>
                  <ul>
                    {card.services.map(([label, slug]) => (
                      <li key={slug}>
                        <Link href={`/veterinary-services/${slug}/`}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-help-cta">
        <Container>
          <div>
            <p className="eyebrow">Need Help Choosing?</p>
            <h2>Not sure which service your pet needs?</h2>
            <p>
              You do not have to diagnose the problem before reaching out. Tell us what you are noticing and our team
              can help guide you toward the right appointment type.
            </p>
            <p className="services-emergency-note">
              If your pet is experiencing a medical emergency, contact an emergency veterinary hospital right away.
            </p>
          </div>
          <div className="services-help-actions">
            <Button href="/contact/" variant="secondary">Request an Appointment</Button>
            <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Call Fort Thomas</Button>
            <Button href={`tel:${site.locations[1].tel}`} variant="ghost">Call Independence</Button>
          </div>
        </Container>
      </section>

      <section className="services-section services-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Care Categories</p>
            <h2>Care organized around your pet&apos;s needs.</h2>
            <p>
              The service browser is for choosing a specific appointment. These categories show how our team thinks
              about your pet&apos;s care plan over time.
            </p>
          </div>
          <div className="service-category-grid">
            {categories.map((category) => (
              <article className="service-category-card" key={category.title}>
                <h3>{category.title}</h3>
                <p>{category.copy}</p>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-section services-section-cream">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Northern Kentucky Locations</p>
            <h2>Veterinary services near you in Northern Kentucky.</h2>
            <p>With two Northern Kentucky locations, Veterinary Medical Center makes it easier to choose care close to home.</p>
          </div>
          <div className="services-location-grid">
            {locations.map((location) => (
              <article className="services-location-card" key={location.slug}>
                <MapPin aria-hidden="true" size={24} />
                <h3>{location.slug === "fort-thomas" ? "Fort Thomas Veterinary Medical Center" : "Independence Veterinary Medical Center"}</h3>
                <p>
                  {location.slug === "fort-thomas"
                    ? "Convenient for families in Fort Thomas, Newport, Highland Heights, Bellevue, Dayton, Cold Spring, Southgate, and nearby Cincinnati neighborhoods."
                    : "Convenient for families in Independence, Taylor Mill, Erlanger, Covington, Kenton County, and surrounding Northern Kentucky communities."}
                </p>
                <address>{location.address}</address>
                <a className="services-phone" href={`tel:${location.tel}`}>
                  <Phone aria-hidden="true" size={16} />
                  {location.phone}
                </a>
                <p className="services-hours">Monday-Friday: 8:00 AM-6:00 PM</p>
                <div className="inline-actions">
                  <Link className="btn btn-primary" href={`/locations/${location.slug}/`}>Book This Location</Link>
                  <a className="btn btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-section services-section-white">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Visit Flow</p>
            <h2>What to expect at your pet&apos;s visit.</h2>
          </div>
          <div className="visit-steps">
            {visitSteps.map(([title, copy], index) => (
              <article className="visit-step" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-section services-section-cream">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Helpful Resources</p>
            <h2>Helpful pet care resources.</h2>
          </div>
          <div className="resource-card-grid">
            {resourceLinks.map((resource) => (
              <article className="resource-card" key={resource.href}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link href={resource.href}>View resource</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection faqs={servicesFaqs} title="Common questions about veterinary services in Northern Kentucky." />
      <CTASection
        title="Schedule veterinary care for your dog or cat."
        body="Whether your pet is due for a checkup, needs dental care, or is showing new symptoms, Veterinary Medical Center of Northern Kentucky is here to help."
        primary={{ label: "Book an Appointment", href: "/contact/" }}
        secondary={{ label: "Call Our Team", href: `tel:${site.locations[0].tel}` }}
      />
      <JsonLd
        data={[
          webpageSchema("/services/", seo.title, seo.description),
          organizationSchema(),
          serviceListSchema(services.map((service) => ({ name: service.title, description: service.shortDescription, path: `/veterinary-services/${service.slug}/` }))),
          breadcrumbSchema(crumbs),
          faqSchema(servicesFaqs)
        ]}
      />
    </>
  );
}
