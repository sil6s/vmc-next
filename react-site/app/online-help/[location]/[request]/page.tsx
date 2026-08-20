import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
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

function transactionSentence(request: OnlineHelpRequestSlug, clinicName: string) {
  switch (request) {
    case "direct-booking":
      return `You're booking with our ${clinicName} team. Choose an available time below.`;
    case "refill":
      return `You're requesting a medication or food refill from our ${clinicName} team. Share the details below.`;
    case "records":
      return `You're requesting medical records from our ${clinicName} team. Tell us what you need below.`;
    case "virtual-consult":
      return `You're requesting a virtual consultation with our ${clinicName} team. Start the request below.`;
    case "general":
      return `You're messaging our ${clinicName} team. Send your question below and we'll help route it.`;
  }
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
  const lead = transactionSentence(helpRequest.slug, clinic.shortName);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Online Help", path: onlineHelpPath(helpLocation.slug, helpRequest.slug) }
  ];

  return (
    <>
      <section className="online-help-body">
        <Container>
          <div className="online-help-transaction">
            <header className="online-help-header">
              <p className="eyebrow">ONLINE HELP · {clinic.shortName.toUpperCase()}</p>
              <h1>{helpRequest.label}</h1>
              <p>{lead}</p>
            </header>

            <div className="online-help-widget-card">
              <OttoInlineWidget
                key={`${helpLocation.clinicId}-${helpRequest.slug}`}
                clinicId={helpLocation.clinicId}
                clinicName={clinic.shortName}
                requestType={helpRequest.requestType}
              />
            </div>

            <div className="online-help-fallback">
              <div>
                <h2>Need a hand?</h2>
                <p>Can&apos;t find what you need? Our {clinic.shortName} team is happy to help.</p>
              </div>
              <a href={`tel:${clinic.tel}`} className="online-help-call-button">
                <Phone aria-hidden="true" size={18} />
                Call {clinic.shortName} · {clinic.phone}
              </a>
            </div>
          </div>
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
