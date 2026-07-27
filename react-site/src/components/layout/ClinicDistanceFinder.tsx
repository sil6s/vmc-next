"use client";

import { useState, type FormEvent } from "react";
import { LocateFixed, Search } from "lucide-react";
import type { NearestClinicStatus } from "@/lib/useNearestClinic";

export function ClinicDistanceFinder({
  status,
  error,
  onUseLocation,
  onSearchZip
}: {
  status: NearestClinicStatus;
  error: string | null;
  onUseLocation: () => void;
  onSearchZip: (zip: string) => void;
}) {
  const [zip, setZip] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearchZip(zip);
  };

  return (
    <div className="clinic-distance-finder">
      <button
        type="button"
        className="clinic-distance-locate"
        onClick={onUseLocation}
        disabled={status === "locating"}
      >
        <LocateFixed aria-hidden="true" size={15} />
        {status === "locating" ? "Finding you…" : "Use my location"}
      </button>
      <span className="clinic-distance-or">or</span>
      <form className="clinic-distance-zip-form" onSubmit={handleSubmit}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="ZIP code"
          value={zip}
          onChange={(event) => setZip(event.target.value.replace(/\D/g, ""))}
          aria-label="ZIP code"
        />
        <button type="submit" disabled={status === "geocoding" || zip.length !== 5}>
          <Search aria-hidden="true" size={14} />
          {status === "geocoding" ? "Searching…" : "Go"}
        </button>
      </form>
      {status === "error" && error && (
        <p className="clinic-distance-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
