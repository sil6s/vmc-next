import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { navigation, utilityNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { PublicLocation } from "@/lib/settings/public";
import { Logo } from "./Logo";

type FooterLocation = Pick<PublicLocation, "id" | "name" | "address" | "phone" | "tel">;

export function Footer({ locations = site.locations }: { locations?: ReadonlyArray<FooterLocation> }) {
  return (
    <footer className="site-footer">
      <div className="newsletter">
        <div>
          <strong>Stay in the loop.</strong>
          <p>Monthly pet health tips and clinic updates for Northern Kentucky pet owners.</p>
        </div>
        <NewsletterForm />
      </div>

      <div className="footer-grid">
        <div>
          <Logo className="footer-logo" />
          <p>{site.tagline}</p>
          <p>Locally and independently owned veterinary care for dogs and cats.</p>
        </div>
        <div>
          <h2>Navigate</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Online Tools</h2>
          <ul>
            {utilityNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          {locations.map((location) => (
            <address key={location.id}>
              <strong>{location.name}</strong>
              <span>{location.address}</span>
              <a href={`tel:${location.tel}`}>{location.phone}</a>
            </address>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>Copyright {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="footer-legal-links">
          <span>{site.legal}</span>
          <Link href="/privacy-policy/">Privacy Policy & SMS Terms</Link>
          <Link className="footer-admin-link" href="/login/">
            <LockKeyhole aria-hidden="true" size={13} />
            Admin Portal
          </Link>
        </span>
      </div>
    </footer>
  );
}
