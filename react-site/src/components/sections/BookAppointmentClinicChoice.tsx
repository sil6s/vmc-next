"use client";

import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock, FileText, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { onlineHelpLocations, onlineHelpPath, type OnlineHelpLocationSlug } from "@/lib/online-help";
import type { PublicLocation } from "@/lib/settings/public";

type ClinicLocation = Omit<Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel" | "hours">, "hours"> & {
  hours: readonly string[];
};

const clinicExtras: Record<OnlineHelpLocationSlug, { image: string; alt: string; tagline: string }> = {
  "fort-thomas": {
    image: "/images/fort-thomas-clinic.jpg",
    alt: "Veterinary Medical Center of Fort Thomas on Memorial Parkway",
    tagline: "On Memorial Parkway near Highlands High School. Easy for Campbell County and Cincinnati."
  },
  independence: {
    image: "/images/independence-clinic.jpg",
    alt: "Veterinary Medical Center of Independence on Madison Pike",
    tagline: "On Madison Pike in Independence. Easy for Kenton and Boone county families."
  }
};

function openChatSupport() {
  window.dispatchEvent(new CustomEvent("vmc:open-chat-support"));
}

export function BookAppointmentClinicChoice({ locations }: { locations: ReadonlyArray<ClinicLocation> }) {
  const slugs = Object.keys(onlineHelpLocations) as OnlineHelpLocationSlug[];
  const clinics = slugs
    .map((slug) => ({ slug, clinic: locations.find((item) => item.id === slug), extras: clinicExtras[slug] }))
    .filter((item): item is { slug: OnlineHelpLocationSlug; clinic: ClinicLocation; extras: (typeof clinicExtras)[OnlineHelpLocationSlug] } => Boolean(item.clinic));

  return (
    <section className="book-flow book-pick" id="appointment-flow">
      <div className="book-pick-inner">
        <header className="book-pick-head">
          <p className="eyebrow">Book an appointment</p>
          <h1>Pick your clinic, <em>we&rsquo;ll take it from there.</em></h1>
          <p>Choose Fort Thomas or Independence to book online in a couple of minutes. New and existing patients are always welcome.</p>
        </header>

        <div className="book-pick-grid">
          {clinics.map(({ slug, clinic, extras }) => (
            <article className="book-pick-card" key={slug}>
              <Link className="book-pick-photo" href={onlineHelpPath(slug, "direct-booking")} tabIndex={-1} aria-hidden="true">
                <Image src={extras.image} alt="" fill sizes="(max-width: 860px) 100vw, 50vw" priority />
                <span>{clinic.name}, KY</span>
              </Link>
              <div className="book-pick-body">
                <h2>Veterinary Medical Center of {clinic.name}</h2>
                <p className="book-pick-tagline">{extras.tagline}</p>
                <ul className="book-pick-facts">
                  <li><MapPin aria-hidden="true" size={15} />{clinic.address}</li>
                  <li><Phone aria-hidden="true" size={15} /><a href={`tel:${clinic.tel}`}>{clinic.phone}</a></li>
                  <li><Clock aria-hidden="true" size={15} />Monday–Friday · 8 AM–6 PM</li>
                </ul>
                <Link className="btn btn-primary book-pick-cta" href={onlineHelpPath(slug, "direct-booking")}>
                  Book in {clinic.name} <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="book-pick-help">
          <div className="book-pick-help-item">
            <Phone aria-hidden="true" size={20} />
            <div>
              <strong>Rather call?</strong>
              <span>
                {clinics.map(({ slug, clinic }, index) => (
                  <span key={slug}>{index > 0 && " · "}{clinic.name} <a href={`tel:${clinic.tel}`}>{clinic.phone}</a></span>
                ))}
              </span>
            </div>
          </div>
          <Link className="book-pick-help-item" href="/new-patients/">
            <Sparkles aria-hidden="true" size={20} />
            <div><strong>New to VMC?</strong><span>See what to expect at your first visit →</span></div>
          </Link>
          <button className="book-pick-help-item" type="button" onClick={openChatSupport}>
            <MessageCircle aria-hidden="true" size={20} />
            <div><strong>Refill, records, or a question?</strong><span>Chat with our care team →</span></div>
          </button>
          <Link className="book-pick-help-item" href={onlineHelpPath("fort-thomas", "records")}>
            <FileText aria-hidden="true" size={20} />
            <div><strong>Need medical records?</strong><span>Request them online →</span></div>
          </Link>
        </div>

        <p className="book-pick-emergency">
          <AlertTriangle aria-hidden="true" size={16} />
          <span>Pet emergency? Please call an emergency veterinary hospital right away instead of booking online. <Link href="/guides/quick-vet-appointments-northern-kentucky/">When to book, call, or go to the ER →</Link></span>
        </p>
      </div>
    </section>
  );
}
