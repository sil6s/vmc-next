"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpenCheck, ChevronDown, HeartHandshake, MessageSquareText, ShieldCheck, UsersRound } from "lucide-react";
import { Section } from "@/components/ui/Section";
import type { ManagedDoctorProfile, StaffSettings } from "@/lib/settings/types";
import { profileImageAlt, profileImageUrl, type PublicPersonProfile } from "@/sanity/personProfiles";

type DoctorProfile = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
};

type PublicStaffMember = {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  imageAlt?: string;
  isVisible: boolean;
};

const doctors: DoctorProfile[] = [
  {
    id: "kristi-baker",
    name: "Dr. Kristi Baker",
    role: "Practice Owner & Veterinarian",
    bio:
      "Dr. Kristi brings more than two decades of veterinary experience to pets and families across Northern Kentucky. She combines practical medical guidance with a calm, approachable style that helps owners feel confident about next steps.",
    image: "https://cdn.sanity.io/images/zk507aly/production/3f868e8d10d91a3688f4b171dedb29def4fc73ca-1122x1402.jpg?w=1100&h=620&fit=crop&auto=format",
    imageAlt: "Dr. Kristi Baker, practice owner and veterinarian at Veterinary Medical Centers",
    tags: ["20+ years experience", "Emergency & general practice"]
  },
  {
    id: "becky-golatzki",
    name: "Dr. Becky Golatzki",
    role: "Veterinarian",
    bio:
      "Dr. Golatzki provides the same thoughtful standard of care across wellness visits, sick pet appointments, and preventive medicine. She's known for clear communication and comfort-focused visits for dogs and cats.",
    tags: ["Clear communication", "Dogs and cats"]
  }
];

const careApproach = [
  { title: "Preventive-first care", icon: ShieldCheck },
  { title: "Clear explanations", icon: MessageSquareText },
  { title: "Low-stress handling", icon: HeartHandshake },
  { title: "Relationship-based medicine", icon: BookOpenCheck }
];

const team = ["Cara", "April", "Jess", "Taiyler", "Kari", "Kendall", "Josh", "Megan", "Sydney", "Kelsie", "Sara"];

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function shortBio(bio?: string, brief?: string) {
  if (brief) return brief;
  if (!bio) return "";
  return bio.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
}

function doctorTags(id: string, name: string): string[] {
  if (id.includes("kristi") || name.toLowerCase().includes("kristi")) {
    return ["20+ years experience", "Emergency & general practice"];
  }
  return ["Clear communication", "Dogs and cats"];
}

function doctorFromSettings(doctor: ManagedDoctorProfile): DoctorProfile {
  return {
    id: doctor.id,
    name: doctor.name,
    role: doctor.role,
    bio: shortBio(doctor.bio),
    image: doctor.imageUrl,
    imageAlt: doctor.imageAlt,
    tags: doctorTags(doctor.id, doctor.name)
  };
}

function doctorFromProfile(profile: PublicPersonProfile): DoctorProfile {
  return {
    id: profile.slug || profile._id,
    name: profile.credentials && !profile.name.toLowerCase().includes(profile.credentials.toLowerCase()) ? `${profile.name}, ${profile.credentials}` : profile.name,
    role: profile.role,
    bio: shortBio(profile.bio, profile.briefDescription),
    image: profileImageUrl(profile),
    imageAlt: profileImageAlt(profile),
    tags: doctorTags(profile.slug || profile._id, profile.name)
  };
}

function staffFromProfile(profile: PublicPersonProfile): PublicStaffMember {
  return {
    id: profile._id,
    name: profile.name,
    role: profile.role,
    imageUrl: profileImageUrl(profile),
    imageAlt: profileImageAlt(profile),
    isVisible: profile.visible !== false
  };
}

function Avatar({ name, image, imageAlt, size = "default" }: { name: string; image?: string; imageAlt?: string; size?: "default" | "small" }) {
  const className = `vet-avatar${size === "small" ? " vet-avatar-small" : ""}${image ? " has-photo" : ""}`;
  return (
    <div className={className} role={image ? undefined : "img"} aria-label={image ? undefined : `Photograph not yet available for ${name}`}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- Staff images can be configured from arbitrary dashboard URLs.
        <img src={image} alt={imageAlt || name} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </div>
  );
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
        intro={staffSettings?.sectionIntro || "Our doctors combine years of clinical experience with a practical, relationship-based approach to veterinary medicine."}
        className="section-compact home-vet-directory"
      >
        <div className="home-team-narrow">
          <div className="care-approach-inline" aria-label="How our team approaches care">
            {careApproach.map(({ title, icon: Icon }) => (
              <span key={title}>
                <Icon aria-hidden="true" size={16} />
                {title}
              </span>
            ))}
          </div>
          <div className="vet-compact-grid">
            {doctorProfiles.map((doctor) => (
              <article className="vet-compact-card" key={doctor.name}>
                <div className="vet-compact-top">
                  <Avatar name={doctor.name} image={doctor.image} imageAlt={doctor.imageAlt} />
                  <div className="vet-compact-body">
                    <div className="vet-compact-heading">
                      <h3>{doctor.name}</h3>
                      {!doctor.name.toUpperCase().includes("DVM") && <span className="vet-compact-degree">DVM</span>}
                    </div>
                    <p className="vet-compact-role">{doctor.role}</p>
                    {doctor.bio && <p className="vet-compact-bio">{doctor.bio}</p>}
                    {doctor.tags.length > 0 && (
                      <div className="vet-compact-tags">
                        {doctor.tags.slice(0, 2).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                    {!doctor.image && <p className="vet-photo-flag">Photo not yet available</p>}
                  </div>
                </div>
                <Link className="vet-compact-link" href="/about/#team">
                  Meet {doctor.name.split(",")[0]}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section
        tone="cream"
        eyebrow={staffSettings?.staffEyebrow || "The Whole Team"}
        title="The team that makes every visit feel personal"
        intro="From the front desk to the treatment room, every person on the VMC team plays a part in helping pets and their families feel cared for."
        className="section-compact home-team-section"
      >
        <div className="home-team-narrow">
          <div className="staff-preview-grid">
            {visibleTeam.map((member) => (
              <article className="staff-preview-card" key={member.id}>
                <Avatar name={member.name} image={member.imageUrl} imageAlt={member.imageAlt} size="small" />
                <div className="staff-preview-info">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </article>
            ))}
          </div>
          {teamMembers.length > 3 && (
            <div className="team-toggle-wrap">
              <button
                aria-expanded={isExpanded}
                className="btn btn-ghost team-toggle"
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
              >
                <UsersRound aria-hidden="true" size={16} />
                <span>{isExpanded ? "Show less" : "Meet the full team"}</span>
                <ChevronDown aria-hidden="true" className={isExpanded ? "is-open" : undefined} size={16} />
              </button>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
