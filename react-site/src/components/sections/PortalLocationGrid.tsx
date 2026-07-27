"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, FileText, MessageSquare, RefreshCw } from "lucide-react";
import { CLINIC_PHOTOS } from "@/components/layout/ClinicCard";
import { ClinicDistanceFinder } from "@/components/layout/ClinicDistanceFinder";
import { onlineHelpPath, onlineHelpRequests, type OnlineHelpLocationSlug } from "@/lib/online-help";
import { useNearestClinic } from "@/lib/useNearestClinic";

const requestIcons = {
  appointment: CalendarDays,
  refill: RefreshCw,
  records: FileText,
  "virtual-consult": MessageSquare,
  general: MessageSquare
} as const;

type GridClinic = { slug: OnlineHelpLocationSlug; shortName: string };

export function PortalLocationGrid({ clinics }: { clinics: GridClinic[] }) {
  const { status, distances, error, useMyLocation, searchZip } = useNearestClinic();
  const allRequests = Object.values(onlineHelpRequests);
  const orderedClinics = distances ? [...clinics].sort((a, b) => distances[a.slug] - distances[b.slug]) : clinics;
  const closestSlug = distances ? orderedClinics[0]?.slug : null;

  return (
    <>
      <ClinicDistanceFinder status={status} error={error} onUseLocation={useMyLocation} onSearchZip={searchZip} />
      {orderedClinics.map((clinic) => {
        const photo = CLINIC_PHOTOS[clinic.slug];
        return (
          <div className="online-help-widget-card" key={clinic.slug} style={{ marginBottom: 24 }}>
            <div className="online-help-widget-card-head">
              <span className="online-help-widget-clinic-name">
                <Image
                  className="online-help-widget-clinic-photo"
                  src={photo.src}
                  alt={photo.alt}
                  width={32}
                  height={32}
                />
                Veterinary Medical Center of {clinic.shortName}
                {clinic.slug === closestSlug && <span className="portal-choice-badge">Closest</span>}
                {distances && (
                  <span className="online-help-distance"> · {distances[clinic.slug].toFixed(1)} mi away</span>
                )}
              </span>
              <span className="online-help-powered-by">Powered by Otto</span>
            </div>
            <div className="book-existing-grid" style={{ padding: 22 }}>
              {allRequests.map((request) => {
                const Icon = requestIcons[request.slug];
                return (
                  <Link
                    key={request.slug}
                    className="book-existing-card"
                    href={onlineHelpPath(clinic.slug, request.slug)}
                  >
                    <Icon aria-hidden="true" />
                    <span>
                      <strong>{request.tabLabel}</strong>
                      <small>{request.description}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
