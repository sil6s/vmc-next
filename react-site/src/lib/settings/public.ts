import { site } from "@/data/site";
import { formatBusinessHour, formatPhoneForTel } from "./defaults";
import { getDashboardSettings } from "./settings";
import type { DashboardSettings, ManagedLocation } from "./types";

export function managedAddress(location: ManagedLocation) {
  return `${location.streetAddress}, ${location.city}, ${location.state} ${location.zipCode}`;
}

export function publicLocation(location: ManagedLocation) {
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
    mapUrl: location.googleMapsUrl,
    mapEmbedUrl: location.mapEmbedUrl,
    email: location.email,
    emergencyMessage: location.emergencyMessage
  };
}

export async function getPublicSettings() {
  const settings = await getDashboardSettings();
  return {
    ...settings,
    publicLocations: settings.locations.map(publicLocation),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl
  };
}

export type PublicSettings = Awaited<ReturnType<typeof getPublicSettings>>;
export type PublicLocation = PublicSettings["publicLocations"][number];

export function sitewideCta(settings: DashboardSettings) {
  return {
    label: settings.seo.sitewideCtaLabel,
    href: settings.externalLinks.bookAppointmentUrl || settings.seo.sitewideCtaUrl || "/contact/"
  };
}
