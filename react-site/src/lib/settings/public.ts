import { site } from "@/data/site";
import { isGoogleMapsEmbedUrl, isGoogleMapsUrl } from "@/lib/google-maps";
import { formatBusinessHour, formatPhoneForTel } from "./defaults";
import { getDashboardSettings } from "./settings";
import type { DashboardSettings, ManagedLocation } from "./types";

export function managedAddress(location: ManagedLocation) {
  return `${location.streetAddress}, ${location.city}, ${location.state} ${location.zipCode}`;
}

export function publicLocation(location: ManagedLocation) {
  const fallbackLocation = site.locations.find((item) => item.id === location.id);

  return {
    id: location.id,
    name: location.id === "fort-thomas" ? "Fort Thomas" : "Independence",
    address: managedAddress(location),
    street: location.streetAddress,
    city: location.city,
    state: location.state,
    zip: location.zipCode,
    phone: location.mainPhone,
    tel: formatPhoneForTel(location.mainPhone),
    hours: location.hours.map(formatBusinessHour),
    mapUrl: isGoogleMapsUrl(location.googleMapsUrl) ? location.googleMapsUrl : fallbackLocation?.mapUrl || "",
    mapEmbedUrl: isGoogleMapsEmbedUrl(location.mapEmbedUrl) ? location.mapEmbedUrl : fallbackLocation?.mapEmbedUrl || "",
    email: location.email,
    emergencyMessage: location.emergencyMessage
  };
}

export async function getPublicSettings() {
  const settings = await getDashboardSettings();
  return {
    ...settings,
    publicLocations: settings.locations.map(publicLocation),
    siteUrl: site.siteUrl
  };
}

export type PublicSettings = Awaited<ReturnType<typeof getPublicSettings>>;
export type PublicLocation = PublicSettings["publicLocations"][number];

export function appointmentHref(value?: string | null) {
  if (!value || value === "/contact/" || value === "/contact") {
    return "/book-appointment/";
  }
  return value;
}

export function sitewideCta(settings: DashboardSettings) {
  return {
    label: settings.seo.sitewideCtaLabel,
    href: appointmentHref(settings.externalLinks.bookAppointmentUrl || settings.seo.sitewideCtaUrl)
  };
}
