"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClinicCard } from "@/components/layout/ClinicCard";
import { ClinicDistanceFinder } from "@/components/layout/ClinicDistanceFinder";
import { onlineHelpLocations, type OnlineHelpLocationSlug } from "@/lib/online-help";
import { useNearestClinic } from "@/lib/useNearestClinic";
import type { PublicLocation } from "@/lib/settings/public";

type PortalLocation = Omit<Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel" | "hours">, "hours"> & {
  hours: readonly string[];
};

export function PatientPortalDialog({
  open,
  onOpenChange,
  locations
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: ReadonlyArray<PortalLocation>;
}) {
  const { status, distances, error, useMyLocation, searchZip } = useNearestClinic();
  const slugs = Object.keys(onlineHelpLocations) as OnlineHelpLocationSlug[];
  const orderedSlugs = distances ? [...slugs].sort((a, b) => distances[a] - distances[b]) : slugs;
  const closestSlug = distances ? orderedSlugs[0] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <DialogContent className="portal-choice-dialog">
          <DialogHeader>
            <DialogTitle>Choose your clinic</DialogTitle>
            <DialogDescription>
              We&rsquo;ll take you to Otto, our online scheduling partner, to book an appointment with the right
              team.
            </DialogDescription>
          </DialogHeader>
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
                  onClick={() => onOpenChange(false)}
                />
              );
            })}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
