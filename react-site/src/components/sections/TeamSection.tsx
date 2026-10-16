import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Cat, Crown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { veterinarians } from "@/data/veterinarians";

const specialtyIcons: Record<string, ReactNode> = {
  "dr-kristi-baker": <Crown aria-hidden="true" size={15} />,
  "dr-valeria-dib-vazquez": <Cat aria-hidden="true" size={15} />
};

export function TeamSection({
  id = "meet-the-team",
  tone = "cream",
  eyebrow = "Our veterinarians",
  title = <>Meet the people behind <em>your pet&rsquo;s care.</em></>,
  intro = "Our veterinarians bring experience, clear communication, and steady care to every visit at our Fort Thomas and Independence clinics.",
  showTeamLink = true
}: {
  id?: string;
  tone?: "cream" | "white" | "warm";
  eyebrow?: ReactNode;
  title?: ReactNode;
  intro?: ReactNode;
  showTeamLink?: boolean;
}) {
  return (
    <Section id={id} tone={tone} eyebrow={eyebrow} title={title} intro={intro} className="home-team-section">
      <div className="home-team-preview">
        {veterinarians.map((vet) => {
          const href = `/team/${vet.slug}/`;
          return (
            <article className="home-team-person" key={vet.slug}>
              <Link href={href} className={vet.image ? "home-team-portrait" : "home-team-portrait home-team-placeholder"} aria-label={`View ${vet.name}'s profile`}>
                {vet.image && <Image src={vet.image} alt={vet.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" />}
                <span className="home-team-specialty">{specialtyIcons[vet.slug]} {vet.specialty}</span>
              </Link>
              <p className="home-team-role">{vet.cardRole}</p>
              <h3><Link href={href}>{vet.name}, {vet.credentials}</Link></h3>
              <p>{vet.cardSummary}</p>
              <Link href={href}>Read {vet.shortName}&rsquo;s bio <ArrowUpRight aria-hidden="true" size={15} /></Link>
            </article>
          );
        })}
      </div>
      {showTeamLink && <Link className="home-team-link text-link" href="/team/">Meet our full team →</Link>}
    </Section>
  );
}
