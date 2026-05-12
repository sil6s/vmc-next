import Link from "next/link";
import { navigation, utilityNavigation } from "@/data/navigation";
import { site } from "@/data/site";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Logo } from "./Logo";

const trackingMap: Record<string, string> = {
  "/patient-portal-online-booking/": "click_patient_portal",
  "/online-vet-pharmacy-northern-kentucky-cincinnati/": "click_online_pharmacy",
  "/new-patient-registration-form/": "start_new_patient_form",
  "/contact/": "click_book_appointment",
  "/privacy-policy/": "click_privacy_policy"
};

export function Footer() {
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
                <Link href={item.href} data-track={trackingMap[item.href]}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Online Tools</h2>
          <ul>
            {utilityNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} data-track={trackingMap[item.href]}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          {site.locations.map((location) => (
            <address key={location.id}>
              <strong>{location.name}</strong>
              <span>{location.address}</span>
              <a
                href={`tel:${location.tel}`}
                data-track={location.id === "fort-thomas" ? "click_call_fort_thomas" : "click_call_independence"}
              >
                {location.phone}
              </a>
            </address>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>Copyright {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span className="footer-legal-links">
          <span>{site.legal}</span>
          <Link href="/privacy-policy/" data-track="click_privacy_policy">Privacy Policy &amp; SMS Terms</Link>
        </span>
      </div>
    </footer>
  );
}
