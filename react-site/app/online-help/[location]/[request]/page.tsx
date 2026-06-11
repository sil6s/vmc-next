import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { OttoInlineWidget } from "@/components/sections/OttoInlineWidget";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import {
  onlineHelpLocations,
  onlineHelpPath,
  onlineHelpRequests,
  type OnlineHelpLocationSlug,
  type OnlineHelpRequestSlug
} from "@/lib/online-help";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ location: string; request: string }> };

function getHelpRoute(locationParam: string, requestParam: string) {
  const helpLocation = onlineHelpLocations[locationParam as OnlineHelpLocationSlug];
  const helpRequest = onlineHelpRequests[requestParam as OnlineHelpRequestSlug];
  return helpLocation && helpRequest ? { helpLocation, helpRequest } : null;
}

export function generateStaticParams() {
  return Object.values(onlineHelpLocations).flatMap((location) =>
    Object.values(onlineHelpRequests).map((request) => ({
      location: location.slug,
      request: request.slug
    }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { location: locationParam, request: requestParam } = await params;
  const route = getHelpRoute(locationParam, requestParam);
  if (!route) return { robots: { index: false, follow: false } };

  return pageMetadata({
    title: `${route.helpLocation.title} | ${route.helpRequest.label}`,
    description: route.helpLocation.description,
    path: onlineHelpPath(route.helpLocation.slug, route.helpRequest.slug),
    noIndex: true
  });
}

export default async function OnlineHelpPage({ params }: Params) {
  const { location: locationParam, request: requestParam } = await params;
  const route = getHelpRoute(locationParam, requestParam);
  if (!route) notFound();

  const { helpLocation, helpRequest } = route;
  const clinic = locations.find((item) => item.slug === helpLocation.locationSlug);
  if (!clinic) notFound();

  const allLocations = Object.values(onlineHelpLocations);
  const allRequests = Object.values(onlineHelpRequests);

  const ftClinic = locations.find((l) => l.slug === onlineHelpLocations["fort-thomas"].locationSlug);
  const indClinic = locations.find((l) => l.slug === onlineHelpLocations["independence"].locationSlug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Online Help", path: onlineHelpPath(helpLocation.slug, helpRequest.slug) }
  ];

  return (
    <>
      {/* Page header */}
      <section className="online-help-header">
        <Container>
          <p className="eyebrow">Online Help · {clinic.shortName}</p>
          <h1>{helpRequest.label}</h1>
          <p>{helpRequest.description}</p>
        </Container>
      </section>

      {/* Request-type tabs + location switcher */}
      <nav className="online-help-nav" aria-label="Online help navigation">
        <Container>
          <div className="online-help-tab-row">
            {allRequests.map((request) => (
              <Link
                key={request.slug}
                href={onlineHelpPath(helpLocation.slug, request.slug)}
                className="online-help-tab-link"
                aria-current={request.slug === helpRequest.slug ? "page" : undefined}
              >
                {request.tabLabel}
              </Link>
            ))}
          </div>
          <div className="online-help-location-row" aria-label="Choose clinic">
            {allLocations.map((item, i, arr) => {
              const itemClinic = locations.find((l) => l.slug === item.locationSlug);
              if (!itemClinic) return null;
              const isCurrent = item.slug === helpLocation.slug;
              return (
                <Fragment key={item.slug}>
                  <Link
                    href={onlineHelpPath(item.slug, helpRequest.slug)}
                    className={`online-help-location-link${isCurrent ? " is-current" : ""}`}
                    aria-current={isCurrent ? "true" : undefined}
                  >
                    <MapPin aria-hidden="true" size={13} />
                    {itemClinic.shortName}
                  </Link>
                  {i < arr.length - 1 && (
                    <span className="online-help-location-divider" aria-hidden="true">|</span>
                  )}
                </Fragment>
              );
            })}
          </div>
        </Container>
      </nav>

      {/* Body */}
      <section className="online-help-body">
        <Container>
          {/* Partner callout */}
          <div className="online-help-callout" role="note">
            <strong>{helpRequest.calloutTitle}</strong>
            <p>{helpRequest.calloutBody}</p>
          </div>

          {/* Otto widget card */}
          <div className="online-help-widget-card">
            <div className="online-help-widget-card-head">
              <span className="online-help-widget-clinic-name">
                Veterinary Medical Center of {clinic.shortName}
              </span>
              <span className="online-help-powered-by">Powered by Otto</span>
            </div>
            <OttoInlineWidget
              clinicId={helpLocation.clinicId}
              clinicName={clinic.shortName}
              requestType={helpRequest.requestType}
            />
          </div>

          {/* Other ways to reach us */}
          <div className="online-help-contact-section">
            <h2>Other ways to reach us</h2>
            <div className="online-help-contact-grid">
              <div className="online-help-contact-col">
                <span className="online-help-contact-label">Fort Thomas</span>
                <a
                  href={`tel:${ftClinic?.tel ?? "+18594424420"}`}
                  className="online-help-contact-value"
                >
                  {ftClinic?.phone ?? "(859) 442-4420"}
                </a>
              </div>
              <div className="online-help-contact-col">
                <span className="online-help-contact-label">Independence</span>
                <a
                  href={`tel:${indClinic?.tel ?? "+18593562242"}`}
                  className="online-help-contact-value"
                >
                  {indClinic?.phone ?? "(859) 356-2242"}
                </a>
              </div>
              <div className="online-help-contact-col">
                <span className="online-help-contact-label">Email</span>
                <a href="/contact/" className="online-help-contact-value">
                  Send us a message
                </a>
              </div>
            </div>
          </div>

          {/* Small-print disclaimer */}
          <p className="online-help-disclaimer">{helpRequest.disclaimer}</p>
        </Container>
      </section>

      <JsonLd
        data={[
          webpageSchema(onlineHelpPath(helpLocation.slug, helpRequest.slug), helpLocation.seoTitle, helpLocation.description),
          breadcrumbSchema(crumbs)
        ]}
      />
    </>
  );
}
