"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { onlineHelpPath, type OnlineHelpLocationSlug } from "@/lib/online-help";

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
    return (
      <Link
        className={`clinic-wide-card${isClosest ? " is-closest" : ""}`}
        href={onlineHelpPath(slug, "direct-booking")}
        onClick={onClick}
      >
        <div className="clinic-wide-card-photo-frame">
          <Image
            className="clinic-wide-card-photo"
            src={photo.src}
            alt={photo.alt}
            width={640}
            height={360}
            loading="eager"
          />
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
          <span className="clinic-wide-card-cta">
            Book appointment
            <ArrowRight aria-hidden="true" size={17} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      className={`portal-choice-card${isClosest ? " is-closest" : ""}`}
      href={onlineHelpPath(slug, "direct-booking")}
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
