"use client";

import { useState } from "react";
import Link from "next/link";
import { Baby, HeartPulse, Microscope, Scissors, ShieldCheck, SmilePlus } from "lucide-react";

const serviceGroups = [
  {
    id: "wellness",
    label: "Wellness",
    icon: ShieldCheck,
    services: [
      ["Wellness Exams", "Routine visits help your local vet team monitor health, catch changes early, and keep care on track.", "/veterinary-services/wellness-exams/"],
      ["Vaccines", "Lifestyle-based vaccines help protect dogs and cats from serious preventable diseases.", "/veterinary-services/dog-cat-vaccinations/"],
      ["Parasite Prevention", "Year-round guidance for heartworm, fleas, ticks, and intestinal parasites in Northern Kentucky.", "/veterinary-services/parasite-prevention/"]
    ]
  },
  {
    id: "dental",
    label: "Dental",
    icon: SmilePlus,
    services: [
      ["Pet Dental Cleanings", "Dental evaluations and professional care planning for bad breath, tartar, and oral discomfort.", "/veterinary-services/pet-dental-care/"],
      ["Oral Health Checks", "We look for signs of discomfort, gum disease, chewing changes, and other dental concerns during visits.", "/veterinary-services/pet-dental-care/"],
      ["Home Dental Guidance", "Our team explains practical ways to support your pet's mouth between professional dental visits.", "/veterinary-services/pet-dental-care/"]
    ]
  },
  {
    id: "sick-diagnostics",
    label: "Sick Visits",
    icon: Microscope,
    services: [
      ["Sick Visits", "When your pet is not acting like themselves, our vet team can evaluate symptoms and next steps.", "/veterinary-services/sick-pet-visits/"],
      ["Diagnostics", "Lab work and testing help guide care when symptoms are unclear or monitoring is needed.", "/veterinary-services/veterinary-diagnostics/"],
      ["Skin & Ear Concerns", "Itching, ear odor, hot spots, licking, and allergies can all benefit from a vet visit.", "/veterinary-services/skin-ear-allergy-care/"]
    ]
  },
  {
    id: "surgery",
    label: "Surgery",
    icon: Scissors,
    services: [
      ["Soft Tissue Surgery", "Selected procedures with careful preparation, monitoring, pain control, and recovery guidance.", "/veterinary-services/soft-tissue-surgery/"],
      ["Spay & Neuter", "Surgery planning for puppies, kittens, newly adopted pets, and preventive care needs.", "/veterinary-services/spay-neuter-surgery/"],
      ["Surgical Consultations", "Clear guidance before procedures so you know what to expect and how to prepare.", "/contact/"]
    ]
  },
  {
    id: "puppy-kitten",
    label: "Puppy/Kitten",
    icon: Baby,
    services: [
      ["New Puppy & Kitten Visits", "First exams, vaccine timing, prevention, nutrition, and practical new pet guidance.", "/veterinary-services/puppy-kitten-care/"],
      ["Vaccine Series", "We help you plan early vaccine timing around age, lifestyle, exposure risk, and records.", "/veterinary-services/dog-cat-vaccinations/"],
      ["First Visit Guidance", "Know what to bring and what to expect before your first appointment with our team.", "/new-patients/"]
    ]
  },
  {
    id: "senior",
    label: "Senior Care",
    icon: HeartPulse,
    services: [
      ["Senior Pet Wellness", "Closer monitoring for aging dogs and cats, including comfort, mobility, and early detection.", "/veterinary-services/senior-pet-care/"],
      ["Nutrition Guidance", "Practical food and weight conversations based on age, activity, and medical needs.", "/veterinary-services/nutrition-weight-guidance/"],
      ["Ongoing Health Support", "Care plans help families manage long-term pet health needs over time.", "/veterinary-services/senior-pet-care/"]
    ]
  }
];

export function HomeServiceTabs() {
  const [activeId, setActiveId] = useState(serviceGroups[0].id);
  const active = serviceGroups.find((group) => group.id === activeId) || serviceGroups[0];
  const ActiveIcon = active.icon;

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
      <div className="home-service-grid" id="home-service-panel" role="tabpanel" aria-labelledby={`home-service-tab-${active.id}`}>
        {active.services.map(([title, text, href]) => (
          <article className="home-service-card" key={`${active.id}-${title}`}>
            <span className="home-service-icon">
              <ActiveIcon aria-hidden="true" size={21} strokeWidth={2.2} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="home-service-card-actions">
              <Link href={href}>Learn more</Link>
              <Link href="/contact/">Book this service</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
