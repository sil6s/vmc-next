"use client";

import { useCallback, useState } from "react";
import { distancesFromOrigin } from "@/lib/clinic-distance";
import type { OnlineHelpLocationSlug } from "@/lib/online-help";

export type NearestClinicStatus = "idle" | "locating" | "geocoding" | "error";

export function useNearestClinic() {
  const [status, setStatus] = useState<NearestClinicStatus>("idle");
  const [distances, setDistances] = useState<Record<OnlineHelpLocationSlug, number> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const applyOrigin = useCallback((lat: number, lng: number) => {
    setDistances(distancesFromOrigin(lat, lng));
    setStatus("idle");
    setError(null);
  }, []);

  const useMyLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      setError("Location isn't available in this browser. Try a ZIP code instead.");
      return;
    }

    setStatus("locating");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => applyOrigin(position.coords.latitude, position.coords.longitude),
      (geoError) => {
        setStatus("error");
        setError(
          geoError.code === geoError.PERMISSION_DENIED
            ? "Location access was denied. Try a ZIP code instead."
            : "We couldn't get your location. Try a ZIP code instead."
        );
      },
      { timeout: 8000, maximumAge: 5 * 60 * 1000 }
    );
  }, [applyOrigin]);

  const searchZip = useCallback(
    async (zip: string) => {
      const trimmed = zip.trim();
      if (!/^\d{5}$/.test(trimmed)) {
        setStatus("error");
        setError("Enter a 5-digit ZIP code.");
        return;
      }

      setStatus("geocoding");
      setError(null);

      try {
        const response = await fetch(`https://api.zippopotam.us/us/${trimmed}`);
        if (!response.ok) throw new Error("ZIP not found");
        const data = await response.json();
        const place = data.places?.[0];
        if (!place) throw new Error("ZIP not found");
        applyOrigin(Number.parseFloat(place.latitude), Number.parseFloat(place.longitude));
      } catch {
        setStatus("error");
        setError("We couldn't find that ZIP code. Double check it and try again.");
      }
    },
    [applyOrigin]
  );

  return { status, distances, error, useMyLocation, searchZip };
}
