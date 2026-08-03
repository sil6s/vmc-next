"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Baby, HeartPulse, Microscope, Scissors, ShieldCheck, SmilePlus } from "lucide-react";

type ServiceItem = {
  title: string;
  desc: string;
  href: string;
  image: string;
  alt: string;
  bullets: string[];
};

type ServiceGroup = {
  id: string;
  label: string;
  tagline: string;
  icon: typeof ShieldCheck;
  services: ServiceItem[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: "wellness",
    label: "Wellness",
    tagline: "Protect the routines and moments you share.",
    icon: ShieldCheck,
    services: [
      {
        title: "Pet Wellness Exams",
        desc: "Routine visits help our Fort Thomas and Independence teams monitor health, catch changes early, and keep preventive care on track for dogs and cats.",
        href: "/services/pet-wellness-exams/",
        image: "/images/blog/dog-exam.jpg",
        alt: "Dog wellness exam at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["Annual health baseline", "Vaccine & prevention review", "Senior screening conversations"]
      },
      {
        title: "Dog & Cat Vaccinations",
        desc: "Lifestyle-based vaccine recommendations help protect dogs and cats from serious preventable diseases based on age, risk, and local Northern Kentucky exposure.",
        href: "/services/dog-cat-vaccinations/",
        image: "/images/blog/dog-vaccine.jpg",
        alt: "Dog and cat vaccinations at Veterinary Medical Centers",
        bullets: ["Core & lifestyle vaccines", "Puppy & kitten series", "Booster schedule planning"]
      },
      {
        title: "Parasite Prevention",
        desc: "Year-round guidance for heartworm, fleas, ticks, and intestinal parasites common for dogs and cats in Northern Kentucky and the surrounding region.",
        href: "/services/parasite-prevention/",
        image: "/images/blog/first-vet-visit.jpg",
        alt: "Parasite prevention discussion for dogs and cats in Northern Kentucky",
        bullets: ["Heartworm testing & prevention", "Flea & tick protection", "Intestinal parasite screening"]
      }
    ]
  },
  {
    id: "dental",
    label: "Dental",
    tagline: "Confident smiles and comfortable check-ups.",
    icon: SmilePlus,
    services: [
      {
        title: "Professional Dental Cleanings",
        desc: "Dental evaluations and professional cleaning discussions for dogs and cats with bad breath, visible tartar, red gums, or signs of oral discomfort.",
        href: "/services/pet-dental-care/",
        image: "/images/blog/dog-dental-cleaning.jpg",
        alt: "Dog dental cleaning at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["Dental exam & findings review", "Cleaning & X-ray planning", "Anesthesia safety discussion"]
      },
      {
        title: "Oral Health Evaluations",
        desc: "We look for signs of gum disease, tartar buildup, chewing changes, drooling, and other dental concerns during wellness and dedicated dental visits.",
        href: "/services/pet-dental-care/",
        image: "/images/blog/cat-exam.jpg",
        alt: "Cat oral health exam at Veterinary Medical Centers",
        bullets: ["Bad breath assessment", "Gum & tooth evaluation", "Treatment planning when needed"]
      },
      {
        title: "Home Dental Care Guidance",
        desc: "Our team explains practical ways to support your pet's oral health between professional dental visits in Fort Thomas and Independence.",
        href: "/services/pet-dental-care/",
        image: "/images/blog/dog-dental-cleaning.jpg",
        alt: "Home dental care guidance for pets from Veterinary Medical Centers",
        bullets: ["Tooth brushing guidance", "Dental product recommendations", "Realistic home care plans"]
      }
    ]
  },
  {
    id: "sick-diagnostics",
    label: "Sick Visits",
    tagline: "Find answers when your pet isn't acting like themselves.",
    icon: Microscope,
    services: [
      {
        title: "Sick Pet Visits",
        desc: "When your dog or cat is not acting like themselves, our vet team can evaluate symptoms, discuss possible causes, and recommend clear next steps.",
        href: "/services/sick-pet-visits/",
        image: "/images/blog/dog-on-exam-table.jpg",
        alt: "Sick pet veterinary visit at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["Same-day appointment guidance", "Symptom evaluation & history", "Clear recommendations & follow-up"]
      },
      {
        title: "Veterinary Diagnostics",
        desc: "Lab work, imaging discussions, and testing help guide care when symptoms are unclear, monitoring is ongoing, or surgery planning requires screening.",
        href: "/services/veterinary-diagnostics/",
        image: "/images/blog/dog-xray.jpg",
        alt: "Veterinary diagnostic imaging for dogs and cats in Northern Kentucky",
        bullets: ["Blood work & urinalysis", "Pre-surgical screening", "Results explained clearly"]
      },
      {
        title: "Skin, Ear & Allergy Care",
        desc: "Itching, ear odor, hot spots, recurring licking, and allergy-related symptoms in dogs and cats can all benefit from a veterinary evaluation.",
        href: "/services/skin-ear-allergy-care/",
        image: "/images/blog/cat-exam.jpg",
        alt: "Skin and ear evaluation for pets at Veterinary Medical Centers",
        bullets: ["Ear infection evaluation", "Allergy & itch assessment", "Treatment & home care plan"]
      }
    ]
  },
  {
    id: "surgery",
    label: "Surgery",
    tagline: "Careful preparation and steady support through recovery.",
    icon: Scissors,
    services: [
      {
        title: "Soft Tissue Surgery",
        desc: "Selected procedures with careful preparation, anesthesia monitoring, pain control, and recovery guidance for dogs and cats in Northern Kentucky.",
        href: "/services/soft-tissue-surgery/",
        image: "/images/blog/dog-on-exam-table.jpg",
        alt: "Pet soft tissue surgery planning at Veterinary Medical Centers",
        bullets: ["Mass removals & wound care", "Pre-surgical health screening", "Post-op recovery instructions"]
      },
      {
        title: "Spay & Neuter Surgery",
        desc: "Surgery planning for puppies, kittens, and newly adopted pets with clear guidance on timing, preparation, anesthesia, and home recovery care.",
        href: "/services/spay-neuter-surgery/",
        image: "/images/blog/puppy-vaccine-schedule.jpg",
        alt: "Spay and neuter surgery for pets at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["Timing & breed guidance", "Pain control planning", "Recovery instructions included"]
      },
      {
        title: "Surgical Consultations",
        desc: "Clear guidance before any procedure so you understand what is involved, how to prepare your pet, and what to watch for at home during recovery.",
        href: "/book-appointment/",
        image: "/images/blog/first-vet-visit.jpg",
        alt: "Surgical consultation at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["Pre-procedure questions answered", "Anesthesia & monitoring explained", "Realistic recovery expectations"]
      }
    ]
  },
  {
    id: "puppy-kitten",
    label: "Puppy & Kitten",
    tagline: "Help your new companion start life healthy.",
    icon: Baby,
    services: [
      {
        title: "New Puppy & Kitten Visits",
        desc: "First exams, vaccine timing, parasite prevention, nutrition guidance, microchipping, and practical new pet guidance at both Northern Kentucky locations.",
        href: "/services/puppy-kitten-care/",
        image: "/images/blog/puppy-vaccine-schedule.jpg",
        alt: "New puppy veterinary care at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["First exam & health check", "Vaccine series planning", "Parasite prevention start"]
      },
      {
        title: "Puppy & Kitten Vaccine Series",
        desc: "We help you plan early vaccine timing around your pet's age, lifestyle, exposure risk, and prior records from the breeder or shelter.",
        href: "/services/dog-cat-vaccinations/",
        image: "/images/blog/cat-vaccine-schedule.jpg",
        alt: "Kitten vaccine series at Veterinary Medical Centers",
        bullets: ["Age-appropriate timing", "Core protection schedule", "Booster reminders & follow-ups"]
      },
      {
        title: "First Visit Preparation",
        desc: "Know what to bring, what to expect, and how to complete your new patient forms before your first appointment with our Northern Kentucky vet team.",
        href: "/new-patients/",
        image: "/images/blog/first-vet-visit.jpg",
        alt: "First veterinary visit preparation at Veterinary Medical Centers",
        bullets: ["What records to bring", "New patient forms available online", "No-surprise visit experience"]
      }
    ]
  },
  {
    id: "senior",
    label: "Senior Care",
    tagline: "Extra care and attention for your lifelong companion.",
    icon: HeartPulse,
    services: [
      {
        title: "Senior Pet Wellness",
        desc: "Closer monitoring for aging dogs and cats including comfort, mobility assessment, dental health, and early detection of changes that matter more with age.",
        href: "/services/senior-pet-care/",
        image: "/images/blog/senior-dog.jpg",
        alt: "Senior dog wellness care at Veterinary Medical Centers in Northern Kentucky",
        bullets: ["Twice-yearly exam option", "Mobility & comfort check", "Chronic condition support"]
      },
      {
        title: "Senior Nutrition Guidance",
        desc: "Practical food choices, weight management, and feeding conversations based on your pet's age, activity level, body condition, and medical needs.",
        href: "/services/nutrition-weight-guidance/",
        image: "/images/blog/senior-cat.jpg",
        alt: "Senior cat nutrition guidance at Veterinary Medical Centers",
        bullets: ["Life-stage diet planning", "Weight & body condition review", "Supplement conversations"]
      },
      {
        title: "Ongoing Health Support",
        desc: "Care plans help families in Fort Thomas and Independence manage long-term pet health needs, chronic conditions, and quality-of-life goals over time.",
        href: "/services/senior-pet-care/",
        image: "/images/blog/senior-dog.jpg",
        alt: "Long-term senior pet health support at Veterinary Medical Centers",
        bullets: ["Diagnostic screening plans", "Medication monitoring", "Quality-of-life guidance"]
      }
    ]
  }
];

export function HomeServiceTabs() {
  const [activeId, setActiveId] = useState(serviceGroups[0].id);
  const active = serviceGroups.find((group) => group.id === activeId) || serviceGroups[0];

  return (
    <div className="home-service-tabs">
      <div className="service-tabs" role="tablist" aria-label="Vet service categories">
        {serviceGroups.map((group) => {
          const GroupIcon = group.icon;
          return (
            <button
              aria-controls="home-service-panel"
              aria-selected={activeId === group.id}
              className={activeId === group.id ? "is-active" : undefined}
              id={`home-service-tab-${group.id}`}
              key={group.id}
              role="tab"
              type="button"
              onClick={() => setActiveId(group.id)}
            >
              <GroupIcon aria-hidden="true" size={16} strokeWidth={2.2} />
              {group.label}
            </button>
          );
        })}
      </div>

      <p className="home-service-tagline">{active.tagline}</p>

      <div
        className="home-service-grid"
        id="home-service-panel"
        role="tabpanel"
        aria-labelledby={`home-service-tab-${active.id}`}
      >
        {active.services.map((service) => (
          <article className="home-service-card" key={`${active.id}-${service.title}`}>
            <div className="home-service-card-image">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px"
              />
            </div>
            <div className="home-service-card-body">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul className="home-service-bullets">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="home-service-card-actions">
                <Link href={service.href}>Learn more about {service.title}</Link>
                <Link href="/book-appointment/" aria-label={`Book this service: ${service.title}`}>Book this service</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
