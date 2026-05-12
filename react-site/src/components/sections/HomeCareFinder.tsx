"use client";

import { useState } from "react";
import Link from "next/link";
import { Baby, Check, Ear, HeartPulse, Scissors, ShieldCheck, SmilePlus } from "lucide-react";

const careOptions = [
  {
    id: "new-pets",
    label: "New puppy or kitten visit",
    helper: "First exams, vaccines, and early-life guidance",
    bestFor: "Best for new pets and first-time visits",
    title: "New puppy or kitten visit",
    copy:
      "New pets need a thoughtful start. We help with first exams, vaccine timing, parasite prevention, nutrition, and practical questions for life at home.",
    reasons: ["First vet visit", "Puppy and kitten vaccines", "New pet questions"],
    services: [
      ["Puppy and kitten care", "/veterinary-services/puppy-kitten-care/"],
      ["Vaccines", "/veterinary-services/dog-cat-vaccinations/"],
      ["First visit guide", "/new-patients/"]
    ],
    cta: ["Start here", "/new-patients/"],
    icon: Baby
  },
  {
    id: "wellness",
    label: "Routine wellness exam",
    helper: "Checkups, vaccines, and prevention",
    bestFor: "Best for routine care and prevention",
    title: "Routine wellness exam",
    copy:
      "For routine checkups, vaccines, parasite prevention, and everyday questions, our local vet team helps you stay ahead of health changes.",
    reasons: ["Annual checkups", "Vaccine review", "Heartworm, flea, and tick prevention"],
    services: [
      ["Wellness exams", "/veterinary-services/wellness-exams/"],
      ["Vaccines", "/veterinary-services/dog-cat-vaccinations/"],
      ["Parasite prevention", "/veterinary-services/parasite-prevention/"]
    ],
    cta: ["Schedule a wellness visit", "/contact/"],
    icon: ShieldCheck
  },
  {
    id: "dental",
    label: "Dental care or bad breath",
    helper: "Breath, tartar, gums, and chewing",
    bestFor: "Best for oral health concerns",
    title: "Dental care or bad breath",
    copy:
      "Bad breath, tartar, red gums, or chewing changes can be signs your dog or cat needs dental care. We help you understand what is happening and what options make sense.",
    reasons: ["Bad breath", "Tartar or red gums", "Chewing changes"],
    services: [
      ["Pet dental care", "/veterinary-services/pet-dental-care/"],
      ["Wellness exams", "/veterinary-services/wellness-exams/"],
      ["Senior pet care", "/veterinary-services/senior-pet-care/"]
    ],
    cta: ["Explore dental care", "/veterinary-services/pet-dental-care/"],
    icon: SmilePlus
  },
  {
    id: "skin",
    label: "Skin, ear, or allergy concern",
    helper: "Itching, licking, odor, and irritation",
    bestFor: "Best for recurring skin or ear symptoms",
    title: "Skin, ear, or allergy concern",
    copy:
      "Itching, licking, ear odor, hair loss, and irritated skin can have many causes. Our vet team can evaluate symptoms and recommend practical next steps.",
    reasons: ["Itching or licking", "Ear odor or discharge", "Hot spots or allergies"],
    services: [
      ["Skin, ear, and allergy care", "/veterinary-services/skin-ear-allergy-care/"],
      ["Sick pet visits", "/veterinary-services/sick-pet-visits/"],
      ["Diagnostics", "/veterinary-services/veterinary-diagnostics/"]
    ],
    cta: ["Get skin or ear help", "/contact/"],
    icon: Ear
  },
  {
    id: "surgery",
    label: "Surgery or procedure questions",
    helper: "Procedure planning and recovery support",
    bestFor: "Best for planned procedures",
    title: "Surgery or procedure questions",
    copy:
      "For spay and neuter, mass removals, and selected soft tissue procedures, our vet team focuses on clear preparation, monitoring, pain control, and recovery instructions.",
    reasons: ["Spay or neuter", "Mass removal discussions", "Pre-surgical lab work"],
    services: [
      ["Soft tissue surgery", "/veterinary-services/soft-tissue-surgery/"],
      ["Spay and neuter", "/veterinary-services/spay-neuter-surgery/"],
      ["Diagnostics", "/veterinary-services/veterinary-diagnostics/"]
    ],
    cta: ["Talk about surgery", "/contact/"],
    icon: Scissors
  },
  {
    id: "sick",
    label: "Sick visit or urgent concern",
    helper: "New symptoms or behavior changes",
    bestFor: "Best for pets acting off",
    title: "Sick visit or urgent concern",
    copy:
      "If your pet is vomiting, limping, coughing, not eating, acting differently, or showing signs of discomfort, our vet team can help you understand what is going on and what to do next.",
    reasons: ["Vomiting or diarrhea", "Limping or pain", "Coughing, appetite, or behavior changes"],
    services: [
      ["Sick pet visits", "/veterinary-services/sick-pet-visits/"],
      ["Diagnostics", "/veterinary-services/veterinary-diagnostics/"],
      ["Skin, ear, and allergy care", "/veterinary-services/skin-ear-allergy-care/"]
    ],
    cta: ["Schedule a sick visit", "/contact/"],
    icon: HeartPulse
  }
];

export function HomeCareFinder() {
  const [activeId, setActiveId] = useState(careOptions[0].id);
  const active = careOptions.find((option) => option.id === activeId) || careOptions[0];
  const Icon = active.icon;

  return (
    <div className="home-care-finder">
      <div className="home-care-tabs" role="tablist" aria-label="Find the right care for your pet">
        {careOptions.map((option) => (
          <button
            aria-controls="home-care-panel"
            aria-selected={activeId === option.id}
            className={activeId === option.id ? "is-active" : undefined}
            id={`home-care-tab-${option.id}`}
            key={option.id}
            role="tab"
            type="button"
            onClick={() => setActiveId(option.id)}
          >
            <option.icon aria-hidden="true" size={19} strokeWidth={2.2} />
            <span>
              <strong>{option.label}</strong>
              <small>{option.helper}</small>
            </span>
          </button>
        ))}
      </div>
      <article className="home-care-panel" id="home-care-panel" role="tabpanel" aria-labelledby={`home-care-tab-${active.id}`}>
        <div className="home-care-summary">
          <span className="home-care-icon">
            <Icon aria-hidden="true" size={26} strokeWidth={2.2} />
          </span>
          <p className="home-care-best">{active.bestFor}</p>
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
        </div>
        <div className="home-care-details">
          <div>
            <strong>Common reasons to book</strong>
            <ul className="home-care-reasons">
              {active.reasons.map((reason) => (
                <li key={reason}>
                  <Check aria-hidden="true" size={16} />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Related care</strong>
            <div className="home-care-chips">
              {active.services.map(([label, href]) => (
                <Link href={href} key={href}>{label}</Link>
              ))}
            </div>
          </div>
          <div className="home-care-actions">
            <Link className="btn btn-primary" href={active.cta[1]}>{active.cta[0]}</Link>
            <Link className="btn btn-ghost" href="/services/">Explore vet services</Link>
          </div>
        </div>
      </article>
    </div>
  );
}
