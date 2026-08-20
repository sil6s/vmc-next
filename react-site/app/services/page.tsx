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
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Scissors,
  Smile,
  Stethoscope
} from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ServiceBrowser } from "@/components/sections/ServiceBrowser";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import { localizedSeo } from "@/data/localized-seo";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { isLocale, localizedLanguageAlternates } from "@/lib/i18n";
import { breadcrumbSchema, faqSchema, JsonLd, organizationSchema, serviceListSchema, webpageSchema } from "@/lib/schema";
import { getServiceHubCards } from "@/sanity/services";

const seo = {
  title: "Veterinary Services in Northern Kentucky | Dog & Cat Care",
  description:
    "Veterinary services for dogs and cats in Northern Kentucky, including wellness exams, vaccinations, dental care, diagnostics, surgery, and sick visits."
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

const resourceLinks = [
  {
    title: "New to VMC?",
    description: "What to expect before your first visit, including forms, records, and how to prepare.",
    href: "/new-patients/"
  },
  {
    title: "When your pet isn't feeling well",
    description: "A simple guide to deciding when to call and what details are helpful for our team.",
    href: "/resources/"
  },
  {
    title: "Caring for pets through every life stage",
    description: "Guidance for puppies, kittens, adult pets, and senior dogs and cats.",
    href: "/resources/"
  }
];

const servicesFaqs = [
  {
    question: "What if I don't know which appointment to choose?",
    answer:
      "That's common. Tell us what you've noticed at home and our team can help you choose between a wellness visit, sick appointment, dental visit, diagnostics, surgery consult, or another next step."
  },
  {
    question: "Do you care for both dogs and cats?",
    answer: "Yes. Our Fort Thomas and Independence clinics provide veterinary care for dogs, cats, puppies, and kittens."
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
      <section className="services-hero">
        <Container>
          <div className="services-hero-grid">
            <div className="services-hero-copy">
              <p className="eyebrow">Veterinary Services in Northern Kentucky</p>
              <h1>
                <span>Care that starts</span>{" "}
                <span className="hero-title-accent">with knowing your pet.</span>
              </h1>
              <p>
                From first checkups to sick visits, pet dental care, veterinary diagnostics, surgery, and the everyday
                questions in between, our Fort Thomas and Independence teams are here to help dogs and cats feel their
                best.
              </p>
              <div className="hero-actions">
                <Button href="/book-appointment/">Request an Appointment</Button>
                <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Not sure what your pet needs? Call us</Button>
              </div>
            </div>
            <div className="services-hero-photo">
              <Image
                src="/images/blog/dog-on-exam-table.jpg"
                alt="Dog resting on an exam table during a veterinary visit at Veterinary Medical Centers"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 520px"
              />
              <div className="services-hero-note">
                <Stethoscope aria-hidden="true" size={20} />
                <span>Wellness exams, vaccinations, sick pet visits, dental care, diagnostics, surgery, puppy and kitten care, and senior pet care.</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <section className="services-section services-section-paper">
        <Container>
          <div className="services-intro-grid">
            <div className="section-heading section-heading-left">
              <p className="eyebrow">What can we help with today?</p>
              <h2>Start with what you&apos;ve noticed.</h2>
            </div>
            <p>
              You don&apos;t need to know which appointment to book. Choose what sounds closest and we&apos;ll point you
              in the right direction.
            </p>
          </div>
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
        </Container>
      </section>

      <section className="services-section services-section-cream">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Our Veterinary Services</p>
            <h2>Whatever brings you in, we&apos;ll help you understand what comes next.</h2>
            <p>
              Browse our veterinary services or start with what you&apos;ve noticed at home. If you&apos;re unsure
              which appointment fits, our team can help.
            </p>
          </div>
          <ServiceBrowser services={services} />
        </Container>
      </section>

      <section className="services-local-section">
        <Container>
          <div className="services-local-grid">
            <div className="services-local-photo">
              <Image
                src="/images/kristi-baker-horiztonal.jpg"
                alt="Dr. Kristi Baker with a veterinary patient in Northern Kentucky"
                fill
                sizes="(max-width: 900px) 100vw, 520px"
              />
            </div>
            <div>
              <p className="eyebrow">Locally Owned Veterinary Care</p>
              <h2>Locally owned. Personally invested.</h2>
              <p>
                Veterinary Medical Centers cares for Northern Kentucky pets through our Fort Thomas and Independence
                clinics. We&apos;re locally and independently owned, and we believe veterinary care works best when you
                know the people caring for your pet.
              </p>
              <p>
                You&apos;ll see familiar faces, talk with a real care team, and leave knowing what we found, what
                matters, and what to do next.
              </p>
              <div className="services-values">
                <article>
                  <MessageCircle aria-hidden="true" size={22} />
                  <h3>We listen first</h3>
                  <p>Tell us what you&apos;ve noticed at home. That context matters.</p>
                </article>
                <article>
                  <ClipboardCheck aria-hidden="true" size={22} />
                  <h3>We explain the why</h3>
                  <p>You should understand every recommendation before making a decision.</p>
                </article>
                <article>
                  <HeartHandshake aria-hidden="true" size={22} />
                  <h3>We stay with you</h3>
                  <p>From puppy and kitten visits through senior care, we&apos;re here for the long relationship.</p>
                </article>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="services-help-cta">
        <Container>
          <div>
            <p className="eyebrow">Need Help Choosing?</p>
            <h2>You don&apos;t have to know which appointment to choose.</h2>
            <p>
              Tell us what you&apos;ve noticed. Our team can help you decide whether your pet needs a wellness visit,
              sick appointment, dental care, diagnostics, surgery, or something else.
            </p>
            <p className="services-emergency-note">
              If your pet is experiencing a medical emergency, contact an emergency veterinary hospital right away.
            </p>
          </div>
          <div className="services-help-actions">
            <Button href="/book-appointment/" variant="secondary">Help Me Choose</Button>
            <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Call Fort Thomas</Button>
            <Button href={`tel:${site.locations[1].tel}`} variant="ghost">Call Independence</Button>
          </div>
        </Container>
      </section>

      <section className="services-section services-section-cream">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Fort Thomas & Independence</p>
            <h2>Two clinics. One team that knows Northern Kentucky.</h2>
            <p>
              Choose the location that&apos;s easiest for your family. Both VMC clinics care for dogs and cats and can
              help you find the right appointment if you&apos;re unsure where to start.
            </p>
          </div>
          <div className="services-location-grid">
            {locations.map((location) => (
              <article className="services-location-card" key={location.slug}>
                <div className="services-location-image">
                  <Image src={location.image} alt={location.imageAlt} fill sizes="(max-width: 900px) 100vw, 560px" />
                </div>
                <div className="services-location-body">
                  <MapPin aria-hidden="true" size={24} />
                  <h3>{location.slug === "vet-in-fort-thomas-ky" ? "Fort Thomas Veterinary Medical Center" : "Independence Veterinary Medical Center"}</h3>
                  <p>
                    {location.slug === "vet-in-fort-thomas-ky"
                      ? "Your neighborhood veterinary team on Memorial Parkway."
                      : "Local veterinary care on Madison Pike."}
                  </p>
                  <address>{location.address}</address>
                  <a className="services-phone" href={`tel:${location.tel}`}>
                    <Phone aria-hidden="true" size={16} />
                    {location.phone}
                  </a>
                  <p className="services-hours">Monday-Friday: 8:00 AM-6:00 PM</p>
                  <div className="inline-actions">
                    <Link className="btn btn-primary" href={`/locations/${location.slug}/`}>Request Appointment</Link>
                    <a className="btn btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-section services-section-white">
        <Container>
          <div className="services-visit-heading">
            <p className="eyebrow">What To Expect</p>
            <h2>You&apos;ll always know what happens next.</h2>
            <p>
              Our visits are built around clear communication, careful exams, and practical next steps for your pet and
              your family.
            </p>
          </div>
          <div className="visit-steps">
            {visitSteps.map(([title, copy], index) => (
              <article className="visit-step" key={title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-section services-section-cream">
        <Container>
          <div className="section-heading section-heading-with-link">
            <div>
              <p className="eyebrow">Helpful Resources</p>
              <h2>A few guides before you visit.</h2>
            </div>
            <Link href="/resources/">View all pet care resources</Link>
          </div>
          <div className="resource-card-grid">
            {resourceLinks.map((resource) => (
              <article className="resource-card" key={resource.title}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link href={resource.href}>View resource</Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection faqs={servicesFaqs} title="Common questions about caring for your pet at VMC." />
      <CTASection
        title="Your pet doesn't have to fit neatly into a service category."
        body="Tell us what's going on. Whether your pet is due for routine care, isn't feeling like themselves, or you're simply not sure what they need, our team can help you figure out the next step. Fort Thomas · Independence · Dogs and cats welcome."
        primary={{ label: "Request an Appointment", href: "/book-appointment/" }}
        secondary={{ label: "Call Our Team", href: `tel:${site.locations[0].tel}` }}
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
