import Link from "next/link";
import { CalendarCheck, CreditCard, FileText, HeartPulse, MessageSquare, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";

const firstVisitSteps = [
  {
    title: "Completed forms",
    text: "Bring your registration form, plus the surgery packet if your pet is scheduled for a procedure."
  },
  {
    title: "Medical records",
    text: "Vaccines, medications, prior exam notes, and anything from previous care if you already have it."
  },
  {
    title: "Your questions",
    text: "Changes in appetite, energy, behavior, mobility, skin, dental health, or bathroom habits are all helpful to mention."
  }
];

const bookingOptions = [
  {
    title: "Book online now",
    text: "Use our online scheduling software if you know the appointment type you need.",
    cta: "Request Appointment Online",
    href: "/contact/",
    icon: CalendarCheck
  },
  {
    title: "Call the clinic",
    text: "Want help choosing a time or location? Call Fort Thomas or Independence and we will schedule your first visit.",
    cta: "Call Fort Thomas",
    href: `tel:${site.locations[0].tel}`,
    icon: Phone
  },
  {
    title: "Fill out a contact form",
    text: "Not ready to pick a time yet? Send a quick message and our local team will reply with scheduling, paperwork, and next steps.",
    cta: "Open Contact Form",
    href: "/contact/",
    icon: MessageSquare
  }
];

const prepCards = [
  {
    title: "New Patient Registration Form",
    text: "Complete this before your first appointment so we have your contact details, your pet's information, and your records request details ready.",
    details: ["All new patient appointments", "Use the digital form first", "Print available by request"],
    cta: "Access Digital Form",
    href: "/new-patient-registration-form/"
  },
  {
    title: "Surgical Information Packet",
    text: "If your pet is scheduled for surgery or a procedure, review the packet ahead of time and contact us with medication, fasting, or recovery questions.",
    details: ["Surgery and procedure visits", "Review digitally before your visit", "Questions answered by our team"],
    cta: "Request Surgery Packet",
    href: "/contact/"
  }
];

const firstAppointmentFeel = [
  ["Check-in", "We confirm your paperwork, contact details, and any records you brought from previous care."],
  ["History review", "We talk through your pet's routine, symptoms, medications, prior care, and the questions most on your mind."],
  ["Physical exam", "Your veterinarian performs a full exam and explains findings in clear language as we go."],
  ["Recommendations", "We walk through care options, diagnostics, treatment plans, and any follow-up that makes sense."],
  ["Checkout", "You leave with next steps, a review of home care if relevant, and answers you can act on."]
];

const careServices = [
  ["Wellness & Preventive Care", "Annual exams, vaccines, parasite prevention, and life-stage guidance for every dog and cat.", "/veterinary-services/wellness-exams/"],
  ["Dental Care & COHAT", "Oral exams, dental cleanings, and treatment planning for long-term comfort.", "/veterinary-services/pet-dental-care/"],
  ["Soft Tissue Surgery", "Common outpatient procedures with clear preparation, monitoring, and recovery support.", "/veterinary-services/soft-tissue-surgery/"],
  ["Behavior Consultations", "Support for anxiety, stress, and household concerns with medical causes considered first.", "/services/pet-behavior-consultations-northern-kentucky/"],
  ["Urgent Care", "Guidance during clinic hours for concerns that should not wait for a routine appointment.", "/veterinary-services/sick-pet-visits/"],
  ["Feline-Friendly Visits", "Low-stress care designed to support cats through quieter handling and thoughtful visit flow.", "/services/cat-friendly-vet-northern-kentucky/"]
];

const paymentItems = [
  ["What to expect when it is time to pay", "We explain recommended services before care is performed whenever possible and collect payment at the time of service."],
  ["Accepted payments", "Cash and checks are accepted. Debit cards, major credit cards, Scratchpay, CareCredit, and All Pet Card are accepted."],
  ["Need more flexibility?", "Our team can explain available payment options before care begins so you can make an informed decision."]
];

const newPatientFaqs = [
  {
    question: "What should I bring to my first vet visit?",
    answer:
      "Bring vaccine records, prior medical records if available, medication information, adoption paperwork, your new patient form, and a list of questions or concerns."
  },
  {
    question: "Can I schedule before my previous vet sends records?",
    answer:
      "Yes. You can schedule first, then request records from your previous veterinary clinic. Bring anything you already have to the appointment."
  },
  {
    question: "Which VMC location should I choose?",
    answer:
      "Choose Fort Thomas or Independence based on what is easiest for your family. Both locations provide relationship-based care for dogs and cats."
  }
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "New Patients", path: "/new-patients/" }
];

export const metadata = pageMetadata({ ...pages.newPatients.seo, path: "/new-patients/" });

export default function NewPatientsPage() {
  return (
    <>
      <Hero
        eyebrow="New Patient Vet Visit in Northern Kentucky"
        title="First vet visit in Northern Kentucky:"
        emphasis="what to expect"
        body="First visit with Northern Kentucky pet owners should feel simple, clear, and comfortable for both you and your pet."
        image="/images/vet-stock2.jpg"
        imageAlt="Veterinary team helping a pet during a first visit in Northern Kentucky"
        badgeTitle="New patients welcome"
        badgeSub="Fort Thomas and Independence"
        primaryCta={{ label: "Start Here", href: "/new-patient-registration-form/" }}
        secondaryCta={{ label: "Contact a location", href: "/contact/" }}
      />
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <Section tone="white" eyebrow="What to Expect" title="What to expect for your first vet visit in Northern Kentucky.">
        <div className="new-patient-steps">
          {firstVisitSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="new-patient-note">
          Preparing for your first visit with Northern Kentucky families who say helps make your appointment smoother
          and less stressful. Dogs should arrive on a leash, and cats should come in a secure carrier. Arriving a few
          minutes early helps everything feel easier.
        </p>
      </Section>

      <Section tone="cream" eyebrow="Booking Your First Visit" title="Choose the easiest way to book your new patient appointment." intro="Whether you want to book online, call our team, or send a message first, every path gets you to the same local clinic team.">
        <div className="new-patient-card-grid three">
          {bookingOptions.map(({ title, text, cta, href, icon: Icon }) => (
            <article className="new-patient-card" key={title}>
              <Icon aria-hidden="true" size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
              <Button href={href}>{cta}</Button>
            </article>
          ))}
        </div>
        <div className="new-patient-alert">
          For personal communication, our system can send pre-visit reminders and updates. Call either clinic if your
          pet has urgent symptoms or you are unsure what type of appointment to request.
        </div>
      </Section>

      <Section tone="white" eyebrow="New Patient Forms" title="A little prep now makes your visit smoother later." intro="Fill out the paperwork before you arrive so your appointment can focus on your pet, not the front desk.">
        <div className="new-patient-card-grid two">
          {prepCards.map((card) => (
            <article className="new-patient-card" key={card.title}>
              <FileText aria-hidden="true" size={24} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul>
                {card.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <Button href={card.href}>{card.cta}</Button>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="First Appointment" title="What your first appointment will feel like.">
        <div className="new-patient-split">
          <div>
            <p>
              Your first visit includes a full physical exam, time to talk through concerns, and clear recommendations
              for next steps. During your first visit, we focus on understanding your pet&apos;s medical history, care
              goals, and what matters most to you.
            </p>
            <blockquote>
              If your pet is scheduled for surgery, our team will review preparation and recovery steps so you know
              what to expect before the appointment.
            </blockquote>
          </div>
          <div className="appointment-flow">
            {firstAppointmentFeel.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white" eyebrow="Our Services" title="Everything your pet needs under one roof." intro="From routine wellness to urgent care, our team provides the full range of veterinary services for dogs and cats across Northern Kentucky.">
        <div className="new-patient-card-grid three">
          {careServices.map(([title, text, href]) => (
            <article className="new-patient-card service-mini-card" key={title}>
              <HeartPulse aria-hidden="true" size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href={href}>Learn more</Link>
            </article>
          ))}
        </div>
        <div className="new-patient-centered-action">
          <Button href="/services/" variant="ghost">View All Services</Button>
        </div>
      </Section>

      <Section tone="cream" eyebrow="What They Say" title="Real experiences from families who trust us.">
        <div className="new-patient-card-grid three">
          {testimonials.slice(0, 3).map((review) => (
            <article className="new-patient-card review-mini-card" key={review.name}>
              <p className="stars" aria-label="Five star review">★★★★★</p>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
              <span>{review.location}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white" eyebrow="Payment Options" title="Payment options before your visit." intro="Payment is due at the time of service. We accept several payment methods, and our team can help you understand financing or reimbursement options before care begins.">
        <div className="payment-grid">
          {paymentItems.map(([title, text]) => (
            <article className="new-patient-card" key={title}>
              <CreditCard aria-hidden="true" size={22} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Choose Your Clinic" title="Choose the location that works best for you.">
        <div className="new-patient-card-grid two">
          {site.locations.map((location) => (
            <article className="new-location-card" key={location.id}>
              <div className="new-map-preview">
                <iframe
                  src={location.mapEmbedUrl}
                  title={`Google Map for Veterinary Medical Center ${location.name}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <a href={`tel:${location.tel}`}>{location.phone}</a>
              <div className="inline-actions">
                <a className="btn btn-ghost" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                <Link className="btn btn-primary" href="/contact/">Book This Location</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="new-patient-card preferred-message">
          <h3>Prefer to send a message first?</h3>
          <p>If you are unsure which location or visit type is right, send a message and our local team will help.</p>
          <Button href="/contact/">Open Contact Form</Button>
        </div>
      </Section>

      <Section tone="white" eyebrow="Book Your First Visit" title="Book online, call, or fill out our contact form - we are here to help.">
        <div className="new-final-panel">
          <p>
            Once your appointment is requested or scheduled, complete the New Patient Registration Form before your
            visit where you are already an existing patient. If anything feels unclear, call Fort Thomas or
            Independence, or use our contact form. We make new client communication and a warm welcome feel easy.
          </p>
          <div className="hero-actions">
            <Button href="/contact/">Request Appointment</Button>
            <Button href="/new-patient-registration-form/" variant="ghost">Fill Out Contact Form</Button>
            <Button href={`tel:${site.locations[0].tel}`} variant="ghost">Call Fort Thomas</Button>
          </div>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Veterinary Medical Center" title="Designed to make veterinary care easier for busy Northern Kentucky families.">
        <div className="new-patient-card-grid two">
          <article className="new-patient-card">
            <ShieldCheck aria-hidden="true" size={24} />
            <h3>Practical options that save time.</h3>
            <p>
              We prioritize convenience for patients and pet owners with online booking, digital forms, clear
              communication, and practical care plans.
            </p>
            <ul>
              <li>Online pharmacy available for refills and home medications delivered when eligible.</li>
              <li>Digital registration available before your first visit.</li>
              <li>Two Northern Kentucky locations with relationship-based appointment flow.</li>
            </ul>
          </article>
          <article className="new-patient-card">
            <Stethoscope aria-hidden="true" size={24} />
            <h3>Local, independent, and relationship-focused.</h3>
            <p>
              Veterinary Medical Center is locally owned and not corporate. Our doctors and support team focus on
              consistent care across Fort Thomas, Independence, and nearby Northern Kentucky neighborhoods.
            </p>
          </article>
        </div>
      </Section>

      <Section tone="white" eyebrow="Questions" title="Common first-visit questions.">
        <div className="faq-list">
          {newPatientFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <CTASection
        title="Ready for your first visit?"
        body="Start with the registration form, call either location, or send a message and our team will help you choose the right next step."
        primary={{ label: "Complete New Patient Form", href: "/new-patient-registration-form/" }}
        secondary={{ label: "Contact Us", href: "/contact/" }}
      />
      <JsonLd
        data={[
          webpageSchema("/new-patients/", pages.newPatients.seo.title, pages.newPatients.seo.description),
          breadcrumbSchema(crumbs),
          faqSchema(newPatientFaqs)
        ]}
      />
    </>
  );
}
