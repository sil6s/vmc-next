import type { OnlineHelpLocationSlug } from "@/lib/online-help";

const CLINIC_COORDINATES: Record<OnlineHelpLocationSlug, { lat: number; lng: number }> = {
  "fort-thomas": { lat: 39.09150229999999, lng: -84.451514 },
  independence: { lat: 38.992127371703965, lng: -84.53607532350952 }
};

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

export function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function distancesFromOrigin(lat: number, lng: number): Record<OnlineHelpLocationSlug, number> {
  return {
    "fort-thomas": haversineMiles(lat, lng, CLINIC_COORDINATES["fort-thomas"].lat, CLINIC_COORDINATES["fort-thomas"].lng),
    independence: haversineMiles(lat, lng, CLINIC_COORDINATES.independence.lat, CLINIC_COORDINATES.independence.lng)
  };
}
