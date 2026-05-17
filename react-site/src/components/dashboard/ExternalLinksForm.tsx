"use client";

import { useState, useTransition } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { saveExternalLinks } from "@/lib/dashboard-actions";
import type { ExternalLinks } from "@/lib/settings/types";
import { StatusMessage } from "./StatusMessage";

const linkFields: { key: keyof ExternalLinks; label: string; helper: string }[] = [
  { key: "onlinePortalUrl", label: "Online portal URL", helper: "Controls patient portal buttons and portal page outbound links." },
  { key: "pharmacyUrl", label: "Pharmacy URL", helper: "Controls online pharmacy buttons and refill links." },
  { key: "bookAppointmentUrl", label: "Book appointment URL", helper: "Controls sitewide appointment CTAs." },
  { key: "newPatientFormUrl", label: "New patient form URL", helper: "Controls new client form CTAs." },
  { key: "existingClientFormUrl", label: "Existing client form URL", helper: "Optional form for returning clients." },
  { key: "smsPrivacyPolicyUrl", label: "SMS/privacy policy URL", helper: "Controls privacy and SMS terms references." },
  { key: "facebookUrl", label: "Facebook URL", helper: "Used for social links and SameAs references." },
  { key: "instagramUrl", label: "Instagram URL", helper: "Used for social links and SameAs references." },
  { key: "googleBusinessProfileUrl", label: "Google reviews URL", helper: "Google Business Profile or reviews destination." }
];

export function ExternalLinksForm({ initialLinks }: { initialLinks: ExternalLinks }) {
  const [links, setLinks] = useState(initialLinks);
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const result = await saveExternalLinks(links);
      setStatus(result);
    });
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card-head">
        <div>
          <p className="dashboard-eyebrow">Important Links</p>
          <h2>External website destinations</h2>
        </div>
      </div>
      <div className="dashboard-link-list">
        {linkFields.map((field) => {
          const value = links[field.key];
          return (
            <div className="dashboard-link-row" key={field.key}>
              <label className="dashboard-field">
                <span>{field.label}</span>
                <input value={value} onChange={(event) => setLinks((current) => ({ ...current, [field.key]: event.target.value }))} />
                <small>{field.helper}</small>
              </label>
              <button
                aria-label={`Copy ${field.label}`}
                className="dashboard-test-link"
                type="button"
                disabled={!value}
                onClick={() => navigator.clipboard?.writeText(value)}
              >
                <Copy aria-hidden="true" size={15} />
                Copy
              </button>
              <a
                aria-disabled={!value}
                className="dashboard-test-link"
                href={value || "#"}
                onClick={(event) => {
                  if (!value) {
                    event.preventDefault();
                  }
                }}
                target={value.startsWith("http") ? "_blank" : undefined}
                rel={value.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <ExternalLink aria-hidden="true" size={15} />
                Test link
              </a>
            </div>
          );
        })}
      </div>
      <div className="dashboard-actions">
        <button className="dashboard-primary-button" type="button" disabled={isPending} onClick={save}>
          {isPending ? "Saving..." : "Save links"}
        </button>
        <StatusMessage {...status} />
      </div>
    </section>
  );
}
