"use client";

import { useState } from "react";
import { BookOpenCheck, ChevronDown, GraduationCap, HeartHandshake, MessageSquareText, PawPrint, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";

type DoctorProfile = {
  name: string;
  role: string;
  bio: string;
  highlights: [string, string, LucideIcon][];
  education: string[];
  location: string;
};

const doctors: DoctorProfile[] = [
  {
    name: "Dr. Kristi Baker",
    role: "Owner & DVM",
    bio:
      "Dr. Kristi brings more than two decades of veterinary experience to pets and families across Northern Kentucky. Her background includes general practice, emergency veterinary medicine, and long-term leadership at Veterinary Medical Center of Independence and Veterinary Medical Center of Fort Thomas. She is known for combining practical medical guidance with a calm, approachable style that helps pet owners understand their options and feel confident about next steps.",
    highlights: [
      ["20+ years", "in veterinary medicine", Stethoscope],
      ["DVM", "Ross University School of Veterinary Medicine", GraduationCap],
      ["Emergency background", "and general practice leadership", ShieldCheck],
      ["Dogs and cats", "preventive and relationship-based care", PawPrint]
    ],
    education: [
      "Ross University School of Veterinary Medicine, Doctorate Veterinary Medicine, 2000 to 2003",
      "Purdue University, Clinical Rotation, Veterinary Medicine, 2003 to 2004"
    ],
    location: "Veterinary Medical Center of Fort Thomas and Veterinary Medical Center of Independence"
  },
  {
    name: "Veterinarian Name",
    role: "Veterinarian",
    bio:
      "Add a short bio for this veterinarian, including their approach to care, experience, education, and what pet owners can expect during a visit.",
    highlights: [
      ["Experience", "Add years or background", Stethoscope],
      ["Education", "Add veterinary school details", GraduationCap],
      ["Care philosophy", "Add communication and comfort notes", MessageSquareText],
      ["Location", "Add Fort Thomas or Independence", PawPrint]
    ],
    education: ["Add veterinary education details."],
    location: "Add location association."
  }
];

const careApproach = [
  {
    title: "Preventive-first care",
    text:
      "We focus on catching small changes early through exams, vaccines, parasite prevention, dental checks, and age-appropriate screenings.",
    icon: ShieldCheck
  },
  {
    title: "Clear explanations",
    text: "We explain findings, options, and next steps in plain language so you understand what is happening and why.",
    icon: MessageSquareText
  },
  {
    title: "Low-stress handling",
    text: "Our team works to make visits calmer with gentle handling, patient pacing, and a pet-first approach.",
    icon: HeartHandshake
  },
  {
    title: "Relationship-based medicine",
    text: "We get to know your pet over time, which helps us notice changes and recommend care that fits their needs.",
    icon: BookOpenCheck
  }
];

const team = ["Cara", "April", "Jess", "Taiyler", "Kari", "Kendall", "Josh", "Megan", "Sydney", "Kelsie", "Sara"];

export function TeamSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTeam = isExpanded ? team : team.slice(0, 3);

  return (
    <>
      <Section
        tone="cream"
        eyebrow="Meet Your Vet Team"
        title="Meet the veterinarians behind your pet’s care"
        intro="Our doctors combine years of clinical experience with a practical, relationship-based approach to veterinary medicine. We take time to explain what we find, answer your questions, and help you make confident decisions for your pet."
      >
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <article className="doctor-card" key={doctor.name}>
              <div className="team-placeholder">
                <PawPrint aria-hidden="true" size={38} />
                <div>
                  <strong>{doctor.name}</strong>
                  <span>{doctor.role}</span>
                </div>
              </div>
              <p>{doctor.bio}</p>
              <div className="doctor-highlight-grid" aria-label={`${doctor.name} profile highlights`}>
                {doctor.highlights.map(([label, text, Icon]) => (
                  <div key={`${doctor.name}-${label}`}>
                    <Icon aria-hidden="true" size={18} />
                    <strong>{label}</strong>
                    <small>{text}</small>
                  </div>
                ))}
              </div>
              <div className="doctor-education-card">
                <GraduationCap aria-hidden="true" size={18} />
                <div>
                  <strong>Veterinary medicine education</strong>
                  <ul>
                    {doctor.education.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <blockquote>{doctor.location}</blockquote>
            </article>
          ))}
        </div>
        <div className="care-approach-grid" aria-label="How our team approaches care">
          {careApproach.map(({ title, text, icon: Icon }) => (
            <article className="care-approach-card" key={title}>
              <Icon aria-hidden="true" size={21} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="cream" eyebrow="The Whole Team" title="People who love what they do." intro="From the front desk to the treatment room, every person on the VMC team is here because they genuinely care about animals.">
        <div className="staff-grid">
          {visibleTeam.map((member) => (
            <article className="staff-card" key={member}>
              <div className="staff-photo">
                <PawPrint aria-hidden="true" size={24} />
              </div>
              <strong>{member}</strong>
              <span>VMC Team</span>
            </article>
          ))}
        </div>
        <div className="team-toggle-wrap">
          <button
            aria-expanded={isExpanded}
            className="team-toggle"
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
          >
            <UsersRound aria-hidden="true" size={18} />
            <span>{isExpanded ? "Show less" : "Meet the full team"}</span>
            <ChevronDown aria-hidden="true" className={isExpanded ? "is-open" : undefined} size={18} />
          </button>
        </div>
      </Section>
    </>
  );
}
