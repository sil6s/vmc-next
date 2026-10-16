"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, ArrowRight, CalendarCheck, FileText, MessageCircle, Phone, Pill } from "lucide-react";
import { onlineHelpPath, type OnlineHelpLocationSlug, type OnlineHelpRequestSlug } from "@/lib/online-help";

type ContactHelpLocation = {
  slug: OnlineHelpLocationSlug;
  name: string;
  phone: string;
  tel: string;
};

const actions: {
  title: string;
  request: OnlineHelpRequestSlug;
  icon: typeof CalendarCheck;
}[] = [
  { title: "Book an appointment", request: "direct-booking", icon: CalendarCheck },
  { title: "Request a refill", request: "refill", icon: Pill },
  { title: "Get medical records", request: "records", icon: FileText },
  { title: "Ask a question", request: "general", icon: MessageCircle }
];

export function ContactHelpCenter({ locations }: { locations: ContactHelpLocation[] }) {
  const [activeLocation, setActiveLocation] = useState<OnlineHelpLocationSlug>(locations[0]?.slug || "fort-thomas");

  return (
    <section className="simple-contact" aria-labelledby="simple-contact-title">
      <div className="simple-contact-head">
        <div>
          <p className="eyebrow">How can we help?</p>
          <h2 id="simple-contact-title">Pick your clinic, <em>then what you need.</em></h2>
        </div>
        <div className="simple-contact-toggle" role="radiogroup" aria-label="Choose your clinic">
          {locations.map((location) => (
            <button
              aria-checked={activeLocation === location.slug}
              className={activeLocation === location.slug ? "is-active" : undefined}
              key={location.slug}
              type="button"
              role="radio"
              onClick={() => setActiveLocation(location.slug)}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>

      <div className="simple-contact-actions">
        {actions.map(({ title, request, icon: Icon }) => (
          <Link className="simple-contact-action" href={onlineHelpPath(activeLocation, request)} key={request}>
            <Icon aria-hidden="true" size={22} />
            <strong>{title}</strong>
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        ))}
      </div>

      <div className="simple-contact-foot">
        <p>
          <Phone aria-hidden="true" size={16} />
          Prefer to call?
          {locations.map((location) => (
            <a href={`tel:${location.tel}`} key={location.slug}>{location.name} {location.phone}</a>
          ))}
        </p>
        <p className="simple-contact-emergency">
          <AlertTriangle aria-hidden="true" size={16} />
          Emergency? Contact an emergency veterinary hospital right away.
        </p>
      </div>
    </section>
  );
}
