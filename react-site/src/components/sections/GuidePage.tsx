import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, BookOpenText, Clock, ExternalLink, Info, MapPin, Phone, Star, Trophy } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { getAreaClinics, type AreaClinic } from "@/data/areaClinics";
import type { Guide, GuideSection } from "@/data/guides";
import { guides } from "@/data/guides";
import { absoluteUrl, site } from "@/data/site";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schema";
import { formatReviewDate, lastReviewedDate } from "@/lib/review-date";

/** Renders **bold** and [label](href) inside guide copy. */
function rich(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) return <Link key={index} href={href}>{label}</Link>;
      return <a key={index} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>;
    }
    return part;
  });
}

function plain(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function ClinicCard({ clinic }: { clinic: AreaClinic }) {
  const external = clinic.website?.startsWith("http");
  // Only show facts we actually have; skip "Not stated / Not verified / Not listed" placeholders.
  const facts = ([
    ["Area", clinic.area],
    ["Patients", clinic.species],
    ["Booking", clinic.booking],
    ["Cat-focused", clinic.catFeatures],
    ["Parking", clinic.parking],
    ["Hours", clinic.hours],
    ["Ownership", clinic.ownership]
  ] as [string, string | undefined][]).filter((entry): entry is [string, string] => Boolean(entry[1]) && !/^Not (stated|verified|listed|explicitly)/.test(entry[1] as string));
  return (
    <article className={`guide-clinic${clinic.topPick ? " is-top" : ""}${clinic.emergency ? " is-emergency" : ""}`}>
      {clinic.topPick && <span className="guide-rank-badge"><Trophy aria-hidden="true" size={14} /> #1 Top Pick</span>}
      <header>
        <small>{clinic.emergency ? "24/7 emergency" : clinic.area}</small>
        <h3>{clinic.name}</h3>
        <p className="guide-clinic-address"><MapPin aria-hidden="true" size={14} /> {clinic.address}</p>
      </header>
      <dl>
        {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      {clinic.whyTop && (
        <div className="guide-why-top">
          <strong><Star aria-hidden="true" size={13} fill="currentColor" /> Why it&rsquo;s our #1 pick</strong>
          <ul>{clinic.whyTop.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      )}
      <ul className="guide-clinic-strengths">
        {clinic.strengths.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p className="guide-clinic-fit"><strong>May suit:</strong> {clinic.goodFit}</p>
      <footer>
        {clinic.bookingUrl && <Link className="btn btn-primary guide-book-btn" href={clinic.bookingUrl}>Book now →</Link>}
        {clinic.phone && <a href={`tel:+1${clinic.phone.replace(/\D/g, "")}`}><Phone aria-hidden="true" size={13} /> {clinic.phone}</a>}
        {clinic.website && (external
          ? <a href={clinic.website} target="_blank" rel="noopener noreferrer">Website <ExternalLink aria-hidden="true" size={12} /></a>
          : <Link href={clinic.website}>Clinic page →</Link>)}
      </footer>
    </article>
  );
}

function Section({ section }: { section: GuideSection }) {
  if (section.type === "callout") {
    const Icon = section.tone === "warning" ? AlertTriangle : Info;
    return (
      <aside id={section.id} className={`guide-callout is-${section.tone}`}>
        <Icon aria-hidden="true" size={20} />
        <div>
          <strong>{section.title}</strong>
          <p>{rich(section.text)}</p>
        </div>
      </aside>
    );
  }
  if (section.type === "table") {
    return (
      <section id={section.id} className="guide-section" aria-labelledby={`${section.id}-h`}>
        <h2 id={`${section.id}-h`}>{section.heading}</h2>
        {section.intro && <p>{rich(section.intro)}</p>}
        <div className="guide-table-wrap" role="region" aria-labelledby={`${section.id}-h`} tabIndex={0}>
          <table className="guide-table">
            <caption>{section.caption}</caption>
            <thead><tr>{section.columns.map((col) => <th key={col} scope="col">{col}</th>)}</tr></thead>
            <tbody>
              {section.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => index === 0 ? <th key={index} scope="row">{rich(cell)}</th> : <td key={index}>{rich(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  if (section.type === "clinics") {
    return (
      <section id={section.id} className="guide-section" aria-labelledby={`${section.id}-h`}>
        <h2 id={`${section.id}-h`}>{section.heading}</h2>
        <p>{rich(section.intro)}</p>
        <div className="guide-clinics">
          {getAreaClinics(section.clinicIds).map((clinic) => <ClinicCard key={clinic.id} clinic={clinic} />)}
        </div>
      </section>
    );
  }
  return (
    <section id={section.id} className="guide-section" aria-labelledby={`${section.id}-h`}>
      <h2 id={`${section.id}-h`}>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 32)}>{rich(paragraph)}</p>)}
      {section.bullets && <ul>{section.bullets.map((item) => <li key={item.slice(0, 40)}>{rich(item)}</li>)}</ul>}
    </section>
  );
}

export function GuidePage({ guide }: { guide: Guide }) {
  const path = `/guides/${guide.slug}/`;
  const toc = guide.sections.filter((section): section is Exclude<GuideSection, { type: "callout" }> => section.type !== "callout");
  const related = guide.related.map((slug) => guides.find((item) => item.slug === slug)).filter((item): item is Guide => Boolean(item));
  const clinicSections = guide.sections.filter((section): section is Extract<GuideSection, { type: "clinics" }> => section.type === "clinics");
  const title = `${guide.h1} ${guide.emphasis}`;
  const reviewed = lastReviewedDate();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description: guide.seo.description,
    abstract: plain(guide.quickAnswer),
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: "en-US",
    author: { "@type": "Organization", "@id": `${site.siteUrl}/#organization`, name: site.name, url: site.siteUrl },
    publisher: { "@type": "Organization", "@id": `${site.siteUrl}/#organization`, name: site.name, url: site.siteUrl },
    about: ["Veterinary care", "Pet owners in Cincinnati and Northern Kentucky"],
    citation: guide.sources.map((source) => source.url)
  };

  // Review date lives on the WebPage (schema.org lastReviewed); Article.dateModified stays the real content date.
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: guide.seo.title,
    description: guide.seo.description,
    lastReviewed: reviewed,
    reviewedBy: { "@type": "Organization", "@id": `${site.siteUrl}/#organization`, name: site.name },
    mainEntity: { "@id": `${absoluteUrl(path)}#article` },
    isPartOf: { "@id": `${site.siteUrl}/#website` }
  };

  const clinicListSchemas = clinicSections.map((section) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: section.heading,
    itemListElement: getAreaClinics(section.clinicIds).map((clinic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VeterinaryCare",
        name: clinic.name,
        address: clinic.address,
        ...(clinic.phone ? { telephone: clinic.phone } : {}),
        ...(clinic.website ? { url: clinic.website.startsWith("http") ? clinic.website : absoluteUrl(clinic.website) } : {})
      }
    }))
  }));

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides/" }, { label: guide.seo.title.split("|")[0].split("(")[0].trim(), href: path }]} />

      <header className="guide-hero">
        <div className="guide-wrap">
          <p className="eyebrow">{guide.eyebrow}</p>
          <h1>{guide.h1} <em>{guide.emphasis}</em></h1>
          <p className="guide-summary">{guide.summary}</p>
          <p className="guide-meta">
            <BookOpenText aria-hidden="true" size={15} />
            <span>Published by <Link href="/about/">{site.name}</Link></span>
            <span aria-hidden="true">·</span>
            <span>Last reviewed <time dateTime={reviewed}>{formatReviewDate(reviewed)}</time></span>
            <span aria-hidden="true">·</span>
            <span><Clock aria-hidden="true" size={14} /> {guide.readMinutes} min read</span>
          </p>
        </div>
      </header>

      <div className="guide-wrap guide-layout">
        <aside className="guide-toc" aria-label="On this page">
          <strong>On this page</strong>
          <ol>
            <li><a href="#short-answer">Short answer</a></li>
            {toc.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}
            <li><a href="#faq">FAQs</a></li>
            <li><a href="#sources">Sources</a></li>
          </ol>
        </aside>

        <article className="guide-article">
          <section id="short-answer" className="guide-answer" aria-labelledby="short-answer-h">
            <h2 id="short-answer-h">The short answer</h2>
            <p>{rich(guide.quickAnswer)}</p>
            <h3>Key takeaways</h3>
            <ul>{guide.takeaways.map((item) => <li key={item}>{rich(item)}</li>)}</ul>
          </section>

          {guide.sections.map((section) => <Section key={section.id} section={section} />)}

          <div id="faq" className="guide-faq">
            <FAQSection faqs={guide.faqs} title="Frequently asked questions" />
          </div>

          <section id="sources" className="guide-section guide-sources" aria-labelledby="sources-h">
            <h2 id="sources-h">Sources</h2>
            <ul>
              {guide.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <nav className="guide-related" aria-label="Related guides">
              <h2>Related guides</h2>
              <div>
                {related.map((item) => (
                  <Link key={item.slug} href={`/guides/${item.slug}/`}>
                    <strong>{item.h1} {item.emphasis}</strong>
                    <span>{item.readMinutes} min read →</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </article>
      </div>

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link>
          <a className="btn btn-ghost" href="tel:+18594424420">Call Fort Thomas</a>
          <a className="btn btn-ghost" href="tel:+18593562242">Call Independence</a>
        </>}
      />

      <JsonLd
        data={[
          webPageSchema,
          articleSchema,
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }, { name: guide.seo.title, path }]),
          faqSchema(guide.faqs),
          ...clinicListSchemas
        ]}
      />
    </>
  );
}
