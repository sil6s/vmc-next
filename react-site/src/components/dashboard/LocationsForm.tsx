"use client";

import { useMemo, useState, useTransition } from "react";
import { Building2, Clock, MapPin } from "lucide-react";
import { ShadButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { saveLocationSettings } from "@/lib/dashboard-actions";
import { formatBusinessHour } from "@/lib/settings/defaults";
import type { ManagedLocation } from "@/lib/settings/types";
import { StatusMessage } from "./StatusMessage";

export function LocationsForm({ initialLocations }: { initialLocations: ManagedLocation[] }) {
  const [locations, setLocations] = useState(initialLocations);
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();

  const preview = useMemo(() => locations.map((location) => ({ id: location.id, hours: location.hours.map(formatBusinessHour) })), [locations]);

  const updateLocation = (index: number, key: keyof ManagedLocation, value: string) => {
    setLocations((current) => current.map((location, itemIndex) => (itemIndex === index ? { ...location, [key]: value } : location)));
  };

  const updateHour = (locationIndex: number, hourIndex: number, key: "isOpen" | "openTime" | "closeTime" | "note", value: string | boolean) => {
    setLocations((current) =>
      current.map((location, itemIndex) =>
        itemIndex === locationIndex
          ? {
              ...location,
              hours: location.hours.map((hour, index) => (index === hourIndex ? { ...hour, [key]: value } : hour))
            }
          : location
      )
    );
  };

  const save = () => {
    startTransition(async () => {
      const result = await saveLocationSettings(locations);
      setStatus(result);
    });
  };

  return (
    <div className="dashboard-stack">
      {locations.map((location, locationIndex) => (
        <section className="dashboard-card dashboard-location-card" key={location.id}>
          <div className="dashboard-card-head">
            <div>
              <p className="dashboard-eyebrow">Location</p>
              <h2>{location.clinicName}</h2>
              <p className="dashboard-muted">{location.streetAddress}, {location.city}, {location.state} {location.zipCode}</p>
            </div>
            <span className="dashboard-location-icon"><MapPin aria-hidden="true" size={22} /></span>
          </div>
          <div className="dashboard-location-section">
            <div className="dashboard-section-label">
              <Building2 aria-hidden="true" size={17} />
              <strong>Clinic details</strong>
            </div>
            <div className="dashboard-form-grid">
              <label className="dashboard-field">
                <span>Clinic name</span>
                <Input value={location.clinicName} onChange={(event) => updateLocation(locationIndex, "clinicName", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Email address</span>
                <Input value={location.email} onChange={(event) => updateLocation(locationIndex, "email", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Street address</span>
                <Input value={location.streetAddress} onChange={(event) => updateLocation(locationIndex, "streetAddress", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>City</span>
                <Input value={location.city} onChange={(event) => updateLocation(locationIndex, "city", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>State</span>
                <Input value={location.state} onChange={(event) => updateLocation(locationIndex, "state", event.target.value.toUpperCase())} />
              </label>
              <label className="dashboard-field">
                <span>ZIP code</span>
                <Input value={location.zipCode} onChange={(event) => updateLocation(locationIndex, "zipCode", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Main phone number</span>
                <Input value={location.mainPhone} onChange={(event) => updateLocation(locationIndex, "mainPhone", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Appointment phone number</span>
                <Input value={location.appointmentPhone} onChange={(event) => updateLocation(locationIndex, "appointmentPhone", event.target.value)} />
              </label>
            </div>
          </div>

          <div className="dashboard-location-section">
            <div className="dashboard-form-grid">
              <label className="dashboard-field">
                <span>Google Maps URL</span>
                <Input value={location.googleMapsUrl} onChange={(event) => updateLocation(locationIndex, "googleMapsUrl", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Google Maps embed URL</span>
                <Input value={location.mapEmbedUrl} onChange={(event) => updateLocation(locationIndex, "mapEmbedUrl", event.target.value)} />
              </label>
            </div>
            <label className="dashboard-field">
              <span>Emergency/after-hours message</span>
              <Textarea value={location.emergencyMessage} onChange={(event) => updateLocation(locationIndex, "emergencyMessage", event.target.value)} />
            </label>
          </div>

          <div className="dashboard-location-section dashboard-location-hours-grid">
            <div className="dashboard-hours-table">
              <div className="dashboard-hours-head">
              <Clock aria-hidden="true" size={18} />
              <strong>Business hours</strong>
              </div>
              {location.hours.map((hour, hourIndex) => (
                <div className="dashboard-hour-row" key={hour.day}>
                  <span className="dashboard-hour-day">{hour.day}</span>
                  <label className="dashboard-open-toggle">
                    <span>{hour.isOpen ? "Open" : "Closed"}</span>
                    <Switch checked={hour.isOpen} aria-label={`${hour.day} open status`} onCheckedChange={(checked) => updateHour(locationIndex, hourIndex, "isOpen", checked)} />
                  </label>
                  <Input aria-label={`${hour.day} open time`} disabled={!hour.isOpen} value={hour.openTime} onChange={(event) => updateHour(locationIndex, hourIndex, "openTime", event.target.value)} />
                  <Input aria-label={`${hour.day} close time`} disabled={!hour.isOpen} value={hour.closeTime} onChange={(event) => updateHour(locationIndex, hourIndex, "closeTime", event.target.value)} />
                  <Input aria-label={`${hour.day} note`} value={hour.note} onChange={(event) => updateHour(locationIndex, hourIndex, "note", event.target.value)} placeholder="Note" />
                </div>
              ))}
            </div>
            <div className="dashboard-hours-preview">
              <strong>Public hours preview</strong>
              <ul>{preview[locationIndex].hours.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
          </div>
        </section>
      ))}
      <div className="dashboard-actions">
        <ShadButton type="button" disabled={isPending} onClick={save}>
          {isPending ? "Saving..." : "Save location settings"}
        </ShadButton>
        <StatusMessage {...status} />
      </div>
    </div>
  );
}
