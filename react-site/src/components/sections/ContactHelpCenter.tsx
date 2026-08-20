"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  CalendarCheck,
  FileText,
  MessageCircle,
  Phone,
  Pill,
  Stethoscope,
  Video
} from "lucide-react";
import { onlineHelpPath, type OnlineHelpLocationSlug, type OnlineHelpRequestSlug } from "@/lib/online-help";

type ContactHelpLocation = {
  slug: OnlineHelpLocationSlug;
  name: string;
  phone: string;
  tel: string;
};

const actions: {
  title: string;
  description: string;
  request: OnlineHelpRequestSlug;
  icon: typeof CalendarCheck;
}[] = [
  {
    title: "Book an appointment",
    description: "Book directly through Otto when online times are available.",
    request: "direct-booking",
    icon: CalendarCheck
  },
  {
    title: "Request medication or food refill",
    description: "Ask for prescription, prevention, or diet food support.",
    request: "refill",
    icon: Pill
  },
  {
    title: "Medical records",
    description: "Request records for yourself, a specialist, boarding, grooming, or another provider.",
    request: "records",
    icon: FileText
  },
  {
    title: "Virtual consult",
    description: "Ask whether a virtual care-team conversation may fit your pet's need.",
    request: "virtual-consult",
    icon: Video
  },
  {
    title: "General inquiry",
    description: "Send a non-urgent question and our team will help route the next step.",
    request: "general",
    icon: MessageCircle
  }
];

export function ContactHelpCenter({ locations }: { locations: ContactHelpLocation[] }) {
  const [activeLocation, setActiveLocation] = useState<OnlineHelpLocationSlug>(locations[0]?.slug || "fort-thomas");
  const selected = locations.find((location) => location.slug === activeLocation) || locations[0];

  return (
    <section className="vmc-help-center" aria-labelledby="vmc-help-center-title">
      <div className="vmc-help-center-head">
        <div>
          <p className="eyebrow">VMC Help Center</p>
          <h2 id="vmc-help-center-title">Start with what you need. We&apos;ll take it from there.</h2>
          <p>
            Choose a clinic, then pick the request that sounds closest. Booking, refills, records, virtual consults,
            and general care-team messages route through Otto so the right VMC team can review them.
          </p>
        </div>

        <div className="vmc-help-location-toggle" role="tablist" aria-label="Choose clinic for online help">
          {locations.map((location) => (
            <button
              aria-selected={activeLocation === location.slug}
              className={activeLocation === location.slug ? "is-active" : undefined}
              key={location.slug}
              type="button"
              role="tab"
              onClick={() => setActiveLocation(location.slug)}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>

      <div className="vmc-help-content">
        <div className="vmc-help-action-grid">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link className="vmc-help-action" href={onlineHelpPath(activeLocation, action.request)} key={action.request}>
                <span className="vmc-help-action-icon">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <span>
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>
                <em aria-hidden="true">-&gt;</em>
              </Link>
            );
          })}
        </div>

        <aside className="vmc-help-side" aria-label="Phone and emergency guidance">
          <div>
            <span className="vmc-help-side-icon">
              <Phone aria-hidden="true" size={20} />
            </span>
            <h3>Prefer to call?</h3>
            <p>For urgent, same-day, or time-sensitive concerns, phone is the best path.</p>
            {locations.map((location) => (
              <a className="vmc-help-phone" href={`tel:${location.tel}`} key={location.slug}>
                <span>{location.name}</span>
                <strong>{location.phone}</strong>
              </a>
            ))}
          </div>
          <div className="vmc-help-emergency">
            <AlertTriangle aria-hidden="true" size={20} />
            <p>
              If your pet is having trouble breathing, collapsing, bleeding heavily, seizuring, or seems in severe
              pain, call an emergency veterinary hospital right away.
            </p>
          </div>
          <Link className="vmc-help-general-link" href={onlineHelpPath(activeLocation, "general")}>
            <Stethoscope aria-hidden="true" size={17} />
            Not sure? Message {selected?.name || "our team"} through Otto
          </Link>
        </aside>
      </div>
    </section>
  );
}
