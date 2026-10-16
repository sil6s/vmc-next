import { locations } from "@/data/locations";
import { getCityPageSlugs } from "@/data/cityPages";
import { serviceHubServices } from "@/data/serviceHub";
import { veterinarians } from "@/data/veterinarians";

export const staticRoutes = [
  "/",
  "/about/",
  "/team/",
  "/ai-business-profile/",
  "/services/",
  "/locations/",
  "/new-patients/",
  "/book-appointment/",
  "/contact/",
  "/resources/",
  "/patient-portal-online-booking/",
  "/online-vet-pharmacy-northern-kentucky-cincinnati/",
  "/vet-near-me/",
  "/privacy-policy/",
  "/terms/"
] as const;

export const sitemapStaticRoutes = staticRoutes.filter(
  (route) => !["/online-vet-pharmacy-northern-kentucky-cincinnati/"].includes(route)
);

export function allRoutes() {
  return [
    ...staticRoutes,
    ...serviceHubServices.map((service) => `/services/${service.slug}/`),
    ...veterinarians.map((vet) => `/team/${vet.slug}/`),
    ...locations.map((location) => `/locations/${location.slug}/`),
    ...getCityPageSlugs().map((slug) => `/locations/${slug}/`)
  ];
}
