"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { locations } from "@/data/locations";
import { onlineHelpLocations, onlineHelpPath, type OnlineHelpLocationSlug } from "@/lib/online-help";

const CLINIC_PHOTOS: Record<OnlineHelpLocationSlug, { src: string; alt: string }> = {
  "fort-thomas": {
    src: "/images/fort-thomas-clinic.jpg",
    alt: "Veterinary Medical Centers Fort Thomas clinic exterior on Memorial Parkway"
  },
  independence: {
    src: "/images/independence-clinic.jpg",
    alt: "Veterinary Medical Centers Independence clinic exterior on Madison Pike"
  }
};

function clinicTags(slug: OnlineHelpLocationSlug): string[] {
  const helpLocation = onlineHelpLocations[slug];
  const clinic = locations.find((item) => item.slug === helpLocation.locationSlug);
  // Drop the first chip ("Locally owned") since that's already covered by the
  // independence banner shown above the card list.
  return clinic ? clinic.trustChips.slice(1) : [];
}

export function ClinicCard({
  slug,
  name,
  address,
  phone,
  hours,
  distanceMiles,
  isClosest,
  variant = "compact",
  onClick
}: {
  slug: OnlineHelpLocationSlug;
  name: string;
  address: string;
  phone: string;
  hours?: string;
  distanceMiles?: number;
  isClosest?: boolean;
  variant?: "compact" | "wide";
  onClick?: () => void;
}) {
  const photo = CLINIC_PHOTOS[slug];

  if (variant === "wide") {
    const tags = clinicTags(slug);

    return (
      <Link
        className={`clinic-wide-card${isClosest ? " is-closest" : ""}`}
        href={onlineHelpPath(slug, "appointment")}
        onClick={onClick}
      >
        <div className="clinic-wide-card-photo-frame">
          <Image
            className="clinic-wide-card-photo"
            src={photo.src}
            alt={photo.alt}
            width={640}
            height={360}
          />
          {isClosest && <span className="portal-choice-badge clinic-wide-card-badge">Closest to you</span>}
        </div>
        <div className="clinic-wide-card-body">
          <strong className="clinic-wide-card-name">{name}</strong>
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
          {tags.length > 0 && (
            <div className="clinic-wide-card-tags">
              {tags.map((tag) => (
                <span key={tag} className="clinic-wide-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="clinic-wide-card-cta">
            Request appointment
            <ArrowRight aria-hidden="true" size={17} />
          </span>
        </div>
      </Link>
    );
  }

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
