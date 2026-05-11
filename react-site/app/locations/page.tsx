import { CTASection } from "@/components/sections/CTASection";
import { Hero } from "@/components/sections/Hero";
import { LocationCards } from "@/components/sections/LocationCards";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

const seo = {
  title: "Veterinary Locations in Fort Thomas & Independence | VMC",
  description: "Visit Veterinary Medical Center in Fort Thomas or Independence, KY for locally owned dog and cat care in Northern Kentucky."
};

export const metadata = pageMetadata({ ...seo, path: "/locations/" });

export default function LocationsPage() {
  return (
    <>
      <Hero
        eyebrow="Our Locations"
        title="Veterinary care in Fort Thomas and Independence."
        body="Both VMC clinics provide full-service veterinary care for dogs and cats, with convenient access for Northern Kentucky and Greater Cincinnati families."
        image="/images/fort-thomas-clinic.jpg"
        imageAlt="Veterinary Medical Center Fort Thomas clinic"
        primaryCta={{ label: "Book Appointment", href: "/contact/" }}
        secondaryCta={{ label: "New Patients", href: "/new-patients/" }}
      />
      <LocationCards />
      <CTASection />
      <JsonLd data={[webpageSchema("/locations/", seo.title, seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }])]} />
    </>
  );
}
