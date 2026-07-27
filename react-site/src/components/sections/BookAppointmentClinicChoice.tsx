"use client";

import { ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { ClinicCard } from "@/components/layout/ClinicCard";
import { ClinicDistanceFinder } from "@/components/layout/ClinicDistanceFinder";
import { onlineHelpLocations, type OnlineHelpLocationSlug } from "@/lib/online-help";
import { useNearestClinic } from "@/lib/useNearestClinic";
import type { PublicLocation } from "@/lib/settings/public";

type ClinicLocation = Omit<Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel" | "hours">, "hours"> & {
  hours: readonly string[];
};

export function BookAppointmentClinicChoice({ locations }: { locations: ReadonlyArray<ClinicLocation> }) {
  const { status, distances, error, useMyLocation, searchZip } = useNearestClinic();
  const slugs = Object.keys(onlineHelpLocations) as OnlineHelpLocationSlug[];
  const orderedSlugs = distances ? [...slugs].sort((a, b) => distances[a] - distances[b]) : slugs;
  const closestSlug = distances ? orderedSlugs[0] : null;

  return (
    <section className="book-flow book-choice-flow" id="appointment-flow">
      <div className="book-choice-screen">
        <div className="book-choice-copy">
          <p className="eyebrow">Book Appointment</p>
          <h1>Choose your clinic to get started.</h1>
          <p>
            Pick the Veterinary Medical Centers location closest to you. We&rsquo;ll take you straight to Otto, our
            online scheduling partner, to request your appointment.
          </p>
          <Alert className="book-choice-alert" tone="default">
            <ShieldCheck aria-hidden="true" size={18} />
            <div>
              <AlertTitle>Locally and independently owned</AlertTitle>
              <AlertDescription>
                Veterinary Medical Centers (VMC) is not part of a corporate veterinary chain. Both of our clinics
                are independently owned and operated right here in Northern Kentucky.
              </AlertDescription>
            </div>
          </Alert>
        </div>

        <Card className="book-choice-panel">
          <CardHeader>
            <CardTitle>Which clinic works best?</CardTitle>
            <CardDescription>Not sure which is closer? Find out below, or just pick one.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClinicDistanceFinder status={status} error={error} onUseLocation={useMyLocation} onSearchZip={searchZip} />
            <div className="portal-choice-list">
              {orderedSlugs.map((slug) => {
                const clinic = locations.find((item) => item.id === slug);
                if (!clinic) return null;

                return (
                  <ClinicCard
                    key={slug}
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
