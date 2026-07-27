"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { onlineHelpPath, type OnlineHelpLocationSlug } from "@/lib/online-help";

export const CLINIC_PHOTOS: Record<OnlineHelpLocationSlug, { src: string; alt: string }> = {
  "fort-thomas": {
    src: "/images/fort-thomas-clinic.jpg",
    alt: "Veterinary Medical Centers Fort Thomas clinic exterior on Memorial Parkway"
  },
  independence: {
    src: "/images/independence-clinic.jpg",
    alt: "Veterinary Medical Centers Independence clinic exterior on Madison Pike"
  }
};

export function ClinicCard({
  slug,
  name,
  address,
  phone,
  hours,
  distanceMiles,
  isClosest,
  onClick
}: {
  slug: OnlineHelpLocationSlug;
  name: string;
  address: string;
  phone: string;
  hours?: string;
  distanceMiles?: number;
  isClosest?: boolean;
  onClick?: () => void;
}) {
  const photo = CLINIC_PHOTOS[slug];

  return (
    <Link
      className={`portal-choice-card${isClosest ? " is-closest" : ""}`}
      href={onlineHelpPath(slug, "appointment")}
      onClick={onClick}
    >
      <Image className="portal-choice-card-photo" src={photo.src} alt={photo.alt} width={88} height={88} />
      <div className="portal-choice-card-body">
        <div className="portal-choice-card-title-row">
          <strong>{name}</strong>
          {isClosest && <span className="portal-choice-badge">Closest to you</span>}
        </div>
        <div className="portal-choice-card-stats">
          <span>
            <MapPin aria-hidden="true" size={15} />
            {address}
          </span>
          <span>
            <Phone aria-hidden="true" size={15} />
            {phone}
          </span>
          {hours && (
            <span>
              <Clock aria-hidden="true" size={15} />
              {hours}
            </span>
          )}
          {distanceMiles != null && (
            <span className="portal-choice-card-distance">
              <MapPin aria-hidden="true" size={15} />
              {distanceMiles.toFixed(1)} mi away
            </span>
          )}
        </div>
      </div>
      <ChevronRight aria-hidden="true" size={20} className="portal-choice-card-arrow" />
    </Link>
  );
}
