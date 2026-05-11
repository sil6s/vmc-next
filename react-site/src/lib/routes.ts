import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { serviceHubServices } from "@/data/serviceHub";

export const staticRoutes = [
  "/",
  "/about/",
  "/services/",
  "/locations/",
  "/new-patients/",
  "/contact/",
  "/blog/",
  "/patient-portal-online-booking/",
  "/online-vet-pharmacy-northern-kentucky-cincinnati/",
  "/vet-near-me/",
  "/new-patient-registration-form/"
] as const;

export function allRoutes() {
  return [
    ...staticRoutes,
    ...services.map((service) => `/services/${service.slug}/`),
    ...serviceHubServices.map((service) => `/veterinary-services/${service.slug}/`),
    ...locations.map((location) => `/locations/${location.slug}/`)
  ];
}
