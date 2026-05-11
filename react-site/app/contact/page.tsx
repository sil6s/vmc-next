import { ContactForm } from "@/components/forms/ContactForm";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";

export const metadata = pageMetadata({ ...pages.contact.seo, path: "/contact/" });

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        title="Contact Veterinary Medical Center."
        body="Call Fort Thomas or Independence, request an appointment, or send a message and our team will help you choose the right next step for your pet."
        image="/images/independence-clinic.jpg"
        imageAlt="Veterinary Medical Center Independence clinic"
        primaryCta={{ label: "Call Fort Thomas", href: `tel:${site.locations[0].tel}` }}
        secondaryCta={{ label: "Call Independence", href: `tel:${site.locations[1].tel}` }}
      />
      <div className="basic-page">
        <Container>
          <div className="basic-grid">
            <div className="form-panel">
              <h1>Send a message</h1>
              <p>If your pet is having an urgent problem, call first instead of waiting for an email reply.</p>
              <ContactForm />
            </div>
            <aside>
              {site.locations.map((location) => (
                <div className="basic-card" key={location.id}>
                  <h2>{location.name}</h2>
                  <p>{location.address}</p>
                  <p><a className="text-link" href={`tel:${location.tel}`}>{location.phone}</a></p>
                  <ul>
                    {location.hours.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a className="btn btn-ghost" href={location.mapUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
                </div>
              ))}
            </aside>
          </div>
        </Container>
      </div>
      <JsonLd data={[webpageSchema("/contact/", pages.contact.seo.title, pages.contact.seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])]} />
    </>
  );
}
