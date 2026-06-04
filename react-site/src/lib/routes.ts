import { locations } from "@/data/locations";
import { getCityPageSlugs } from "@/data/cityPages";
import { serviceHubServices } from "@/data/serviceHub";

export const staticRoutes = [
  "/",
  "/about/",
  "/services/",
  "/locations/",
  "/new-patients/",
  "/book-appointment/",
  "/contact/",
  "/resources/",
  "/patient-portal-online-booking/",
  "/online-vet-pharmacy-northern-kentucky-cincinnati/",
  "/vet-near-me/",
  "/new-patient-registration-form/",
  "/privacy-policy/",
  "/terms/"
] as const;

export const sitemapStaticRoutes = staticRoutes.filter(
  (route) => !["/patient-portal-online-booking/", "/online-vet-pharmacy-northern-kentucky-cincinnati/"].includes(route)
);

export function allRoutes() {
  return [
    ...staticRoutes,
    ...serviceHubServices.map((service) => `/services/${service.slug}/`),
    ...locations.map((location) => `/locations/${location.slug}/`),
    ...getCityPageSlugs().map((slug) => `/locations/${slug}/`)
  ];
}
