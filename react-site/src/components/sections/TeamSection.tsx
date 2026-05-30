"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpenCheck, ChevronDown, GraduationCap, HeartHandshake, MessageSquareText, PawPrint, ShieldCheck, Stethoscope, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import type { ManagedDoctorProfile, StaffSettings } from "@/lib/settings/types";
import { profileImageAlt, profileImageUrl, type PublicPersonProfile } from "@/sanity/personProfiles";

type DoctorProfile = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  imageAlt?: string;
  highlights: [string, string, LucideIcon][];
  education: string[];
};

type PublicStaffMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  imageAlt?: string;
  isVisible: boolean;
};

const doctors: DoctorProfile[] = [
  {
    name: "Dr. Kristi Baker",
    role: "Practice Owner & Veterinarian",
    bio:
      "Dr. Kristi brings more than two decades of veterinary experience to pets and families across Northern Kentucky. Her background includes general practice, emergency veterinary medicine, and long-term leadership at Veterinary Medical Centers of Independence and Veterinary Medical Centers of Fort Thomas. She is known for combining practical medical guidance with a calm, approachable style that helps pet owners understand their options and feel confident about next steps.",
    image: "https://cdn.sanity.io/images/zk507aly/production/3f868e8d10d91a3688f4b171dedb29def4fc73ca-1122x1402.jpg?w=1100&h=620&fit=crop&auto=format",
    imageAlt: "Dr. Kristi Baker, practice owner and veterinarian at Veterinary Medical Centers",
    highlights: [
      ["20+ years", "in veterinary medicine", Stethoscope],
      ["DVM", "Ross University School of Veterinary Medicine", GraduationCap],
      ["Emergency background", "and general practice leadership", ShieldCheck],
      ["Dogs and cats", "preventive and relationship-based care", PawPrint]
    ],
    education: [
      "Ross University School of Veterinary Medicine, Doctorate Veterinary Medicine, 2000 to 2003",
      "Purdue University, Clinical Rotation, Veterinary Medicine, 2003 to 2004"
    ]
  },
  {
    name: "Dr. Becky Golatzki",
    role: "Veterinarian",
    bio:
      "Dr. Golatzki supports the same thoughtful standard of care across wellness visits, sick pet appointments, preventive medicine, and client education. Her approach reflects the VMC commitment to clear communication, practical recommendations, and comfort-focused veterinary visits for dogs and cats.",
    highlights: [
      ["Veterinarian", "dog and cat medical care", Stethoscope],
      ["Education", "Doctor of Veterinary Medicine", GraduationCap],
      ["Communication", "clear guidance for pet owners", MessageSquareText],
      ["Dogs and cats", "wellness and medical visits", PawPrint]
    ],
    education: ["Doctor of Veterinary Medicine"]
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

function defaultHighlights(doctor: ManagedDoctorProfile, index: number): [string, string, LucideIcon][] {
  if (doctor.id.includes("kristi") || doctor.name.toLowerCase().includes("kristi")) {
    return [
      ["20+ years", "in veterinary medicine", Stethoscope],
      ["DVM", "veterinary medical training", GraduationCap],
      ["Leadership", "locally owned practice", ShieldCheck],
      ["Dogs and cats", "preventive and relationship-based care", PawPrint]
    ];
  }

  return [
    [doctor.role || "Veterinarian", "dog and cat medical care", Stethoscope],
    ["Education", doctor.education[0] || "Veterinary medicine", GraduationCap],
    ["Communication", "clear guidance for pet owners", MessageSquareText],
    ["Dogs and cats", "wellness and medical visits", PawPrint]
  ].slice(0, index === 0 ? 4 : 4) as [string, string, LucideIcon][];
}

function doctorFromSettings(doctor: ManagedDoctorProfile, index: number): DoctorProfile {
  return {
    name: doctor.name,
    role: doctor.role,
    bio: doctor.bio,
    image: doctor.imageUrl,
    imageAlt: doctor.imageAlt,
    education: doctor.education,
    highlights: defaultHighlights(doctor, index)
  };
}

function doctorFromProfile(profile: PublicPersonProfile, index: number): DoctorProfile {
  const education = profile.education?.split("\n").map((item) => item.trim()).filter(Boolean) || [];
  return {
    name: profile.credentials && !profile.name.toLowerCase().includes(profile.credentials.toLowerCase()) ? `${profile.name}, ${profile.credentials}` : profile.name,
    role: profile.role,
    bio: profile.bio || profile.briefDescription || "",
    image: profileImageUrl(profile),
    imageAlt: profileImageAlt(profile),
    education: education.length ? education : profile.credentials ? [profile.credentials] : ["Veterinary medicine"],
    highlights: defaultHighlights({
      id: profile.slug || profile._id,
      name: profile.name,
      role: profile.role,
      bio: profile.bio || "",
      imageUrl: profileImageUrl(profile),
      imageAlt: profileImageAlt(profile),
      education: education.length ? education : [profile.credentials || "Veterinary medicine"],
      isVisible: profile.visible !== false
    }, index)
  };
}

function staffFromProfile(profile: PublicPersonProfile): PublicStaffMember {
  return {
    id: profile._id,
    name: profile.name,
    role: profile.role,
    bio: profile.briefDescription || profile.bio,
    imageUrl: profileImageUrl(profile),
    imageAlt: profileImageAlt(profile),
    isVisible: profile.visible !== false
  };
}

export function TeamSection({ staffSettings, personProfiles = [] }: { staffSettings?: StaffSettings; personProfiles?: PublicPersonProfile[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const profileDoctors = personProfiles.filter((profile) => profile.profileType === "doctor" && profile.visible !== false);
  const profileTeam = personProfiles.filter((profile) => profile.profileType === "team" && profile.visible !== false);
  const doctorProfiles = profileDoctors.length
    ? profileDoctors.map(doctorFromProfile)
    : staffSettings?.doctors?.length
    ? staffSettings.doctors.filter((doctor) => doctor.isVisible).map(doctorFromSettings)
    : doctors;
  const teamMembers = profileTeam.length
    ? profileTeam.map(staffFromProfile)
    : staffSettings?.staffMembers?.length
    ? staffSettings.staffMembers.filter((member) => member.isVisible)
    : team.map((name) => ({
        id: name,
        name,
        role: "VMC Team",
        bio: "A caring member of the Veterinary Medical Centers team.",
        imageUrl: "",
        imageAlt: `${name}, Veterinary Medical Centers team member`,
        isVisible: true
      } satisfies PublicStaffMember));
  const visibleTeam = isExpanded ? teamMembers : teamMembers.slice(0, 3);

  return (
    <>
      <Section
        tone="cream"
        eyebrow={staffSettings?.sectionEyebrow || "Meet Your Vet Team"}
        title={staffSettings?.sectionTitle || "Meet the veterinarians behind your pet’s care"}
        intro={staffSettings?.sectionIntro || "Our doctors combine years of clinical experience with a practical, relationship-based approach to veterinary medicine. We take time to explain what we find, answer your questions, and help you make confident decisions for your pet."}
      >
        <div className="doctor-grid">
          {doctorProfiles.map((doctor) => (
            <article className="doctor-card" key={doctor.name}>
              <div className={doctor.image ? "team-placeholder has-photo" : "team-placeholder"}>
                {doctor.image ? (
                  <Image src={doctor.image} alt={doctor.imageAlt || doctor.name} fill sizes="(max-width: 760px) 100vw, 50vw" />
                ) : (
                  <PawPrint aria-hidden="true" size={38} />
                )}
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
      <Section
        tone="cream"
        eyebrow={staffSettings?.staffEyebrow || "The Whole Team"}
        title={staffSettings?.staffTitle || "People who love what they do."}
        intro={staffSettings?.staffIntro || "From the front desk to the treatment room, every person on the VMC team is here because they genuinely care about animals."}
      >
        <div className="staff-grid">
          {visibleTeam.map((member) => (
            <article className="staff-card" key={member.id}>
              <div className={member.imageUrl ? "staff-photo has-photo" : "staff-photo"}>
                {member.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Staff images can be configured from arbitrary dashboard URLs.
                  <img src={member.imageUrl} alt={member.imageAlt || `${member.name}, Veterinary Medical Centers team member`} />
                ) : (
                  <PawPrint aria-hidden="true" size={24} />
                )}
              </div>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
              {member.bio && <p>{member.bio}</p>}
            </article>
          ))}
        </div>
        {teamMembers.length > 3 && (
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
        )}
      </Section>
    </>
  );
}
