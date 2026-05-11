"use client";

import { useState } from "react";
import { ChevronDown, PawPrint, UsersRound } from "lucide-react";
import { Section } from "@/components/ui/Section";

const doctors = [
  {
    name: "Dr. Kristi Baker",
    role: "Owner & DVM",
    bio: "A licensed veterinarian in Kentucky and Ohio, Dr. Baker built VMC around unhurried care, practical communication, and long-term relationships."
  },
  {
    name: "Dr. Becky Golatzki",
    role: "Associate Veterinarian",
    bio: "Dr. Golatzki brings warmth and expertise to every appointment, partnering with families to provide consistent, relationship-focused care."
  }
];

const team = ["Cara", "April", "Jess", "Taiyler", "Kari", "Kendall", "Josh", "Megan", "Sydney", "Kelsie", "Sara"];

export function TeamSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTeam = isExpanded ? team : team.slice(0, 3);

  return (
    <>
      <Section tone="cream" eyebrow="Meet Your Doctors" title="Veterinarians who actually stay." intro="When you come to VMC, you get continuity with someone who remembers your pet, your history, and what matters to your family.">
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
              <blockquote>Care should feel personal, clear, and rooted in a team that knows your pet over time.</blockquote>
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
