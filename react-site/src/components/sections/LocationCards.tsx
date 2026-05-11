import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";

export function LocationCards() {
  return (
    <Section
      id="locations"
      tone="white"
      eyebrow="Locations"
      title="Two convenient Northern Kentucky veterinary clinics."
      intro="Choose the location that fits your day. Both clinics serve dogs and cats with the same relationship-based standard of care."
    >
      <div className="location-grid">
        {locations.map((location, index) => (
          <article className="location-card" key={location.slug}>
            <Image src={location.image} alt={location.imageAlt} width={720} height={480} sizes="(max-width: 900px) 100vw, 50vw" />
            <div>
              <h3>{location.title}</h3>
              <p>{location.intro}</p>
              <address>{location.address}</address>
              <div className="inline-actions">
                <a className="btn btn-primary" href={`tel:${location.tel}`}>{location.phone}</a>
                <Link className="btn btn-ghost" href={`/locations/${location.slug}/`}>View location</Link>
                <a className="text-link" href={site.locations[index].mapUrl} target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
