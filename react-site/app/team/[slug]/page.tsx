import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck, GraduationCap, MapPin, Stethoscope } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getLocation } from "@/data/locations";
import { absoluteUrl } from "@/data/site";
import { getVeterinarian, veterinarians } from "@/data/veterinarians";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, personSchema, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return veterinarians.map((vet) => ({ slug: vet.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const vet = getVeterinarian((await params).slug);
  if (!vet) return {};
  return pageMetadata({ ...vet.seo, path: `/team/${vet.slug}/`, image: vet.image, type: "profile" });
}

export default async function VeterinarianPage({ params }: Params) {
  const vet = getVeterinarian((await params).slug);
  if (!vet) notFound();

  const path = `/team/${vet.slug}/`;
  const others = veterinarians.filter((other) => other.slug !== vet.slug);
  const clinics = vet.clinicSlugs.map(getLocation).filter((location) => location !== undefined);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Team", href: "/team/" }, { label: vet.name, href: path }]} />

      <section className="section section-cream vet-profile-hero">
        <Container>
          <div className="vet-profile-hero-grid">
            <div className={vet.image ? "vet-profile-portrait" : "vet-profile-portrait home-team-placeholder"}>
              {vet.image && <Image src={vet.image} alt={vet.imageAlt} fill priority sizes="(max-width: 860px) 100vw, 40vw" />}
              <span className="home-team-specialty">{vet.specialty}</span>
            </div>
            <div className="vet-profile-intro">
              <p className="eyebrow">{vet.role} · {vet.location}</p>
              <h1>{vet.name}, <em>{vet.credentials}</em></h1>
              <p className="vet-profile-tagline">{vet.tagline}</p>
              <p className="vet-profile-summary">{vet.summary}</p>
              <dl className="vet-profile-facts">
                {vet.quickFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/book-appointment/">Book with {vet.shortName}</Link>
                <Link className="btn btn-ghost" href="/team/">Meet the whole team</Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white" eyebrow="Biography" title={<>Get to know <em>{vet.shortName}.</em></>} className="vet-profile-bio-section">
        <div className="vet-profile-body">
          <div className="vet-profile-bio">
            {vet.bio.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            {vet.quote && <blockquote className="vet-profile-quote">&ldquo;{vet.quote}&rdquo;</blockquote>}
            {vet.personal && (
              <aside className="vet-profile-personal">
                <h3>{vet.personal.title}</h3>
                <p>{vet.personal.body}</p>
              </aside>
            )}
          </div>
          <div className="vet-profile-aside">
            <aside className="vet-profile-focus">
              <h3><Stethoscope aria-hidden="true" size={18} /> {vet.focusTitle}</h3>
              <ul>
                {vet.focus.map((item) => <li key={item}><BadgeCheck aria-hidden="true" size={16} />{item}</li>)}
              </ul>
            </aside>
            <aside className="vet-profile-links">
              <h3>Related care</h3>
              <ul>
                {vet.relatedServices.map((service) => (
                  <li key={service.href}><Link href={service.href}>{service.label} <ArrowUpRight aria-hidden="true" size={14} /></Link></li>
                ))}
              </ul>
            </aside>
            {clinics.length > 0 && (
              <aside className="vet-profile-links">
                <h3><MapPin aria-hidden="true" size={18} /> Where to find {vet.shortName}</h3>
                <ul>
                  {clinics.map((clinic) => (
                    <li key={clinic.slug}>
                      <Link href={`/locations/${clinic.slug}/`}>{clinic.shortName}, KY <ArrowUpRight aria-hidden="true" size={14} /></Link>
                      <small>{clinic.address} · <a href={`tel:${clinic.tel}`}>{clinic.phone}</a></small>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Credentials" title={<>Education &amp; <em>experience.</em></>}>
        <div className="vet-profile-cv">
          <div>
            <h3><GraduationCap aria-hidden="true" size={18} /> Education</h3>
            <ol className="vet-profile-timeline">
              {vet.education.map((item) => (
                <li key={item.credential}>
                  <span>{item.dates}</span>
                  <strong>{item.credential}</strong>
                  <p>{item.institution}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3><Stethoscope aria-hidden="true" size={18} /> Experience</h3>
            <ol className="vet-profile-timeline">
              {vet.experience.map((item) => (
                <li key={`${item.organization}-${item.dates}`}>
                  <span>{item.dates}</span>
                  <strong>{item.position}</strong>
                  <p>{item.organization}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <FAQSection faqs={vet.faqs} title={`Questions about ${vet.name}`} />

      <Section tone="white" eyebrow="Our veterinarians" title={<>Meet the rest of <em>the team.</em></>}>
        <div className="vet-profile-others">
          {others.map((other) => (
            <Link className="vet-profile-other" href={`/team/${other.slug}/`} key={other.slug}>
              <span className={other.image ? "vet-profile-other-photo" : "vet-profile-other-photo home-team-placeholder"}>
                {other.image && <Image src={other.image} alt="" fill sizes="96px" />}
              </span>
              <span>
                <small>{other.role}</small>
                <strong>{other.name}, {other.credentials}</strong>
                <em>View profile <ArrowUpRight aria-hidden="true" size={14} /></em>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTASection title={`Book a visit with ${vet.shortName}`} body="Request an appointment online or call either clinic and our team will help you find a time that works." />

      <JsonLd
        data={[
          webpageSchema(path, vet.seo.title, vet.seo.description),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Team", path: "/team/" }, { name: vet.name, path }]),
          faqSchema(vet.faqs),
          personSchema({
            name: vet.name,
            jobTitle: vet.role,
            credentials: vet.credentials,
            path,
            url: path,
            image: vet.image ? absoluteUrl(vet.image) : undefined,
            description: vet.summary,
            alumniOf: vet.alumniOf,
            knowsLanguage: vet.languages,
            knowsAbout: vet.focus,
            workLocationIds: vet.clinicSlugs.map((slug) => `${absoluteUrl(`/locations/${slug}/`)}#location`)
          })
        ]}
      />
    </>
  );
}
