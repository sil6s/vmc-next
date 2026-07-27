import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PortalLocationGrid } from "@/components/sections/PortalLocationGrid";
import { locations } from "@/data/locations";
import { pages } from "@/data/pages";
import { onlineHelpLocations, type OnlineHelpLocationSlug } from "@/lib/online-help";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

const PORTAL_PATH = "/patient-portal-online-booking/";

export const metadata: Metadata = pageMetadata({
  title: pages.portal.seo.title,
  description: pages.portal.seo.description,
  path: PORTAL_PATH
});

export default function PortalPage() {
  const clinics = (Object.keys(onlineHelpLocations) as OnlineHelpLocationSlug[])
    .map((slug) => {
      const helpLocation = onlineHelpLocations[slug];
      const clinic = locations.find((item) => item.slug === helpLocation.locationSlug);
      return clinic ? { slug, shortName: clinic.shortName } : null;
    })
    .filter((clinic): clinic is { slug: OnlineHelpLocationSlug; shortName: string } => clinic !== null);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Patient Portal", path: PORTAL_PATH }
  ];

  return (
    <>
      <section className="online-help-header">
        <Container>
          <p className="eyebrow">Patient Portal</p>
          <h1>Manage your pet&rsquo;s care online</h1>
          <p>
            Our online patient portal is now handled by Otto. Choose your clinic below to book an appointment,
            request a refill, request medical records, or reach our care team.
          </p>
        </Container>
      </section>

      <section className="online-help-body">
        <Container>
          <PortalLocationGrid clinics={clinics} />
        </Container>
      </section>

      <JsonLd
        data={[webpageSchema(PORTAL_PATH, pages.portal.seo.title, pages.portal.seo.description), breadcrumbSchema(crumbs)]}
      />
    </>
  );
}
