"use client";

import { MessageCircle, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClinicCard } from "@/components/layout/ClinicCard";
import { ClinicDistanceFinder } from "@/components/layout/ClinicDistanceFinder";
import { onlineHelpLocations, type OnlineHelpLocationSlug } from "@/lib/online-help";
import { useNearestClinic } from "@/lib/useNearestClinic";
import type { PublicLocation } from "@/lib/settings/public";

type ClinicLocation = Omit<Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel" | "hours">, "hours"> & {
  hours: readonly string[];
};

function openChatSupport() {
  window.dispatchEvent(new CustomEvent("vmc:open-chat-support"));
}

export function BookAppointmentClinicChoice({ locations }: { locations: ReadonlyArray<ClinicLocation> }) {
  const { status, distances, error, useMyLocation, searchZip } = useNearestClinic();
  const slugs = Object.keys(onlineHelpLocations) as OnlineHelpLocationSlug[];
  const orderedSlugs = distances ? [...slugs].sort((a, b) => distances[a] - distances[b]) : slugs;
  const closestSlug = distances ? orderedSlugs[0] : null;

  return (
    <section className="book-flow book-clinic-picker" id="appointment-flow">
      <div className="book-clinic-picker-intro">
        <p className="eyebrow">Book Appointment</p>
        <h1>Choose your clinic to get started</h1>
        <p>Pick the location closest to you and we&rsquo;ll take you straight to scheduling.</p>
      </div>

      <Alert className="book-clinic-picker-alert" tone="default">
        <ShieldCheck aria-hidden="true" size={18} />
        <div>
          <AlertTitle>Locally and independently owned</AlertTitle>
          <AlertDescription>
            Both clinics are run right here in Northern Kentucky, not part of a corporate chain.
          </AlertDescription>
        </div>
      </Alert>

      <ClinicDistanceFinder status={status} error={error} onUseLocation={useMyLocation} onSearchZip={searchZip} />

      <div className="book-clinic-grid">
        {orderedSlugs.map((slug) => {
          const clinic = locations.find((item) => item.id === slug);
          if (!clinic) return null;

          return (
            <ClinicCard
              key={slug}
              variant="wide"
              slug={slug}
              name={clinic.name}
              address={clinic.address}
              phone={clinic.phone}
              hours={clinic.hours[0]}
              distanceMiles={distances ? distances[slug] : undefined}
              isClosest={slug === closestSlug}
            />
          );
        })}
      </div>

      <div className="book-clinic-help-card">
        <MessageCircle aria-hidden="true" size={22} />
        <div>
          <strong>Need help booking, a refill, or records?</strong>
          <span>Chat with our care team.</span>
        </div>
        <button type="button" onClick={openChatSupport}>
          Get help now
        </button>
      </div>
    </section>
  );
}
