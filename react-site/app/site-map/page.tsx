import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/locations";
import { serviceHubServices } from "@/data/serviceHub";
import { veterinarians } from "@/data/veterinarians";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

const seo = {
  title: "Site Map | Veterinary Medical Centers",
  description: "Browse Veterinary Medical Centers pages for services, locations, veterinarians, new patient information, and pet care resources."
};

export const metadata: Metadata = pageMetadata({ ...seo, path: "/site-map/" });

const essentialLinks = [
  ["About Veterinary Medical Centers", "/about/"],
  ["Meet Our Veterinarians", "/team/"],
  ["Our Northern Kentucky Locations", "/locations/"],
  ["New Patients", "/new-patients/"],
  ["Book an Appointment", "/book-appointment/"],
  ["Contact Our Team", "/contact/"],
  ["Pet Care Resources", "/resources/"],
  ["Pet Owner Guides", "/guides/"],
  ["Patient Portal & Online Booking", "/patient-portal-online-booking/"],
  ["Vet Near Me", "/vet-near-me/"]
] as const;

export default function SiteMapPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Site Map", href: "/site-map/" }]} />
      <section className="section section-warm site-map-page">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">Find your way</p>
            <h1>Veterinary care, <em>clearly organized.</em></h1>
          </div>
          <p className="site-map-intro">Use this page to find care, clinic information, and helpful resources from Veterinary Medical Centers in Northern Kentucky.</p>
          <div className="site-map-grid">
            <section>
              <h2>Start here</h2>
              <ul>{essentialLinks.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </section>
            <section>
              <h2>Veterinary services</h2>
              <ul>{serviceHubServices.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}/`}>{service.title}</Link></li>)}</ul>
              <Link className="text-link" href="/services/">View all services →</Link>
            </section>
            <section>
              <h2>Our clinics</h2>
              <ul>{locations.map((location) => <li key={location.slug}><Link href={`/locations/${location.slug}/`}>Veterinary Medical Center of {location.shortName}</Link></li>)}</ul>
              <Link className="text-link" href="/locations/">Compare clinic locations →</Link>
            </section>
            <section>
              <h2>Meet the veterinarians</h2>
              <ul>{veterinarians.map((vet) => <li key={vet.slug}><Link href={`/team/${vet.slug}/`}>{vet.name}{vet.credentials ? `, ${vet.credentials}` : ""}</Link></li>)}</ul>
              <Link className="text-link" href="/team/">Meet the full team →</Link>
            </section>
          </div>
        </Container>
      </section>
      <JsonLd data={[webpageSchema("/site-map/", seo.title, seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Site Map", path: "/site-map/" }])]} />
    </>
  );
}
