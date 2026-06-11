import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageSquareText, Navigation, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { OttoInlineWidget } from "@/components/sections/OttoInlineWidget";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import { pageMetadata } from "@/lib/metadata";
import { OTTO_CLINIC_IDS } from "@/lib/otto";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ location: string }> };

const liveChatLocations = {
  "fort-thomas": {
    slug: "fort-thomas",
    locationSlug: "vet-in-fort-thomas-ky",
    clinicId: OTTO_CLINIC_IDS.fortThomas,
    title: "Fort Thomas Live Chat",
    seoTitle: "Fort Thomas Vet Live Chat | Veterinary Medical Center",
    description:
      "Start a live chat with Veterinary Medical Center of Fort Thomas for non-urgent questions, appointment requests, and care coordination.",
    heroImage: "/images/cat-closeup-hero.png",
    heroImageAlt: "Calm cat resting during a veterinary visit"
  },
  independence: {
    slug: "independence",
    locationSlug: "vet-in-independence-ky",
    clinicId: OTTO_CLINIC_IDS.independence,
    title: "Independence Live Chat",
    seoTitle: "Independence Vet Live Chat | Veterinary Medical Center",
    description:
      "Start a live chat with Veterinary Medical Center of Independence for non-urgent questions, appointment requests, and care coordination.",
    heroImage: "/images/blog/dog-exam.jpg",
    heroImageAlt: "Dog receiving a veterinary exam"
  }
} as const;

const switcherStyle: CSSProperties = {
  display: "inline-grid",
  gridTemplateColumns: "42px minmax(0, 1fr)",
  alignItems: "center",
  gap: 12,
  width: "100%",
  border: "1px solid rgba(169, 27, 27, 0.22)",
  borderBottom: 0,
  borderRadius: "8px 8px 0 0",
  background: "rgba(169, 27, 27, 0.06)",
  color: "var(--ink)",
  padding: "16px 18px",
  textDecoration: "none"
};

const switcherIconStyle: CSSProperties = {
  color: "var(--red)",
  placeSelf: "center"
};

const switcherTextStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  minWidth: 0
};

const switcherEyebrowStyle: CSSProperties = {
  display: "block",
  color: "var(--body)",
  fontSize: 12,
  fontWeight: 850,
  letterSpacing: "0.06em",
  lineHeight: 1.2,
  textTransform: "uppercase"
};

const switcherLabelStyle: CSSProperties = {
  display: "block",
  fontSize: 16,
  fontWeight: 950,
  lineHeight: 1.2
};

const bottomCardStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  alignItems: "center",
  gap: "clamp(22px, 4vw, 42px)",
  border: "1px solid rgba(169, 27, 27, 0.14)",
  borderRadius: 8,
  background: "var(--white)",
  boxShadow: "0 18px 52px rgba(23, 19, 19, 0.06)",
  padding: "clamp(18px, 3vw, 26px)"
};

const bottomImageStyle: CSSProperties = {
  width: "100%",
  height: "auto",
  minHeight: 290,
  maxHeight: 420,
  objectFit: "cover",
  borderRadius: 6
};

const bottomHeadingStyle: CSSProperties = {
  maxWidth: 680,
  margin: 0,
  color: "var(--ink)",
  fontFamily: "var(--font-serif), Georgia, serif",
  fontSize: "clamp(30px, 4vw, 46px)",
  lineHeight: 1.08
};

const bottomCopyStyle: CSSProperties = {
  maxWidth: 680,
  margin: "16px 0 0",
  color: "var(--body)",
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.7
};

const bottomDetailsStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 18
};

const bottomDetailRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  margin: 0,
  color: "var(--ink)",
  fontSize: 15,
  fontWeight: 850,
  lineHeight: 1.45,
  textDecoration: "none"
};

const bottomDetailIconStyle: CSSProperties = {
  flex: "0 0 auto",
  color: "var(--red)",
  marginTop: 1
};

export function generateStaticParams() {
  return Object.values(liveChatLocations).map((location) => ({ location: location.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { location: locationParam } = await params;
  const chatLocation = liveChatLocations[locationParam as keyof typeof liveChatLocations];

  if (!chatLocation) return {};

  return pageMetadata({
    title: chatLocation.seoTitle,
    description: chatLocation.description,
    path: `/live-chat/${chatLocation.slug}/`
  });
}

export default async function LocationLiveChatPage({ params }: Params) {
  const { location: locationParam } = await params;
  const chatLocation = liveChatLocations[locationParam as keyof typeof liveChatLocations];

  if (!chatLocation) notFound();

  const clinic = locations.find((item) => item.slug === chatLocation.locationSlug);
  if (!clinic) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Live Chat", path: `/live-chat/${chatLocation.slug}/` }
  ];

  return (
    <>
      <section className="live-chat-page-hero">
        <Container>
          <div className="live-chat-page-grid">
            <div>
              <p className="eyebrow">Veterinary Medical Centers</p>
              <h1>{chatLocation.title}</h1>
              <p>{chatLocation.description}</p>
              <div className="live-chat-page-actions">
                <a className="btn btn-primary" href={`tel:${clinic.tel}`}>
                  <Phone aria-hidden="true" size={18} />
                  Call {clinic.shortName}
                </a>
                <Link className="btn btn-ghost" href={`/locations/${clinic.slug}/`}>
                  View Location
                </Link>
              </div>
            </div>
            <div className="live-chat-page-media">
              <Image
                src={chatLocation.heroImage}
                alt={chatLocation.heroImageAlt}
                width={760}
                height={560}
                priority
                sizes="(max-width: 860px) 100vw, 38vw"
              />
              <aside className="live-chat-page-card">
                <MessageSquareText aria-hidden="true" size={22} />
                <h2>Use live chat for non-urgent needs.</h2>
                <p>If your pet is having urgent symptoms or you need same-day medical guidance, call the clinic directly.</p>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />

      <section className="location-section location-section-white">
        <Container>
          <div className="location-section-head">
            <p className="eyebrow">Connect Online</p>
            <h2>Message our {clinic.shortName} team.</h2>
            <p>Choose the option that matches your request and our team will follow up during business hours.</p>
          </div>
          <div className="live-chat-location-switcher" aria-label="Choose a live chat location" style={{ display: "flex", width: "100%", margin: "0" }}>
            {Object.values(liveChatLocations).map((item) => {
              const itemClinic = locations.find((location) => location.slug === item.locationSlug);
              if (!itemClinic) return null;
              const isCurrent = item.slug === chatLocation.slug;
              if (isCurrent) return null;

              return (
                <Link
                  key={item.slug}
                  className="live-chat-location-choice"
                  href={`/live-chat/${item.slug}/`}
                  style={switcherStyle}
                >
                  <MapPin aria-hidden="true" size={18} style={switcherIconStyle} />
                  <span style={switcherTextStyle}>
                    <small style={switcherEyebrowStyle}>Need the other clinic?</small>
                    <strong style={switcherLabelStyle}>Switch to {itemClinic.shortName} live chat</strong>
                  </span>
                </Link>
              );
            })}
          </div>
          <OttoInlineWidget clinicId={chatLocation.clinicId} clinicName={clinic.shortName} />
        </Container>
      </section>

      <section className="location-section location-section-cream">
        <Container>
          <div className="live-chat-bottom-location-card" style={bottomCardStyle}>
            <Image
              src={clinic.image}
              alt={clinic.imageAlt}
              width={720}
              height={420}
              sizes="(max-width: 860px) 100vw, 38vw"
              style={bottomImageStyle}
            />
            <div>
              <p className="eyebrow">Your Selected Location</p>
              <h2 style={bottomHeadingStyle}>Veterinary Medical Center of {clinic.shortName}</h2>
              <div className="live-chat-bottom-details" style={bottomDetailsStyle}>
                <p style={bottomDetailRowStyle}>
                  <MapPin aria-hidden="true" size={18} style={bottomDetailIconStyle} />
                  <span>{clinic.address}</span>
                </p>
                <a href={`tel:${clinic.tel}`} style={bottomDetailRowStyle}>
                  <Phone aria-hidden="true" size={18} style={bottomDetailIconStyle} />
                  <span>{clinic.phone}</span>
                </a>
              </div>
              <p style={bottomCopyStyle}>
                Use this clinic for messages about appointments, records, refills, and follow-up questions tied to the {clinic.shortName} team.
              </p>
              <div className="live-chat-page-actions">
                <a className="btn btn-primary" href={`tel:${clinic.tel}`}>
                  <Phone aria-hidden="true" size={18} />
                  Call {clinic.shortName}
                </a>
                <Link className="btn btn-ghost" href={`/locations/${clinic.slug}/`}>
                  <Navigation aria-hidden="true" size={18} />
                  Location Details
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          webpageSchema(`/live-chat/${chatLocation.slug}/`, chatLocation.seoTitle, chatLocation.description),
          breadcrumbSchema(crumbs)
        ]}
      />
    </>
  );
}
