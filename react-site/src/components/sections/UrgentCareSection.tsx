import { AlertTriangle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const signs = [
  "Difficulty breathing or labored breathing",
  "Sudden collapse or extreme weakness",
  "Seizures or uncontrolled trembling",
  "Severe vomiting or diarrhea",
  "Uncontrolled bleeding or deep wounds",
  "Suspected poisoning or toxin ingestion",
  "Inability to urinate, especially in cats",
  "Eye injuries or sudden vision changes",
  "Extreme pain, crying out, or abnormal behavior"
];

export function UrgentCareSection() {
  return (
    <Section
      tone="warm"
      eyebrow="Emergency & Urgent Care"
      title="Urgent care at your Northern Kentucky vet."
      intro="When your pet needs prompt attention, our Northern Kentucky team provides same-day urgent care during regular business hours at both locations. Call first so we can help you choose the safest next step."
    >
      <div className="urgent-grid">
        <article className="urgent-card">
          <h3>Signs your pet needs urgent care</h3>
          <ul>
            {signs.map((sign) => (
              <li key={sign}>
                <AlertTriangle aria-hidden="true" size={14} />
                {sign}
              </li>
            ))}
          </ul>
        </article>
        <article className="urgent-card">
          <h3>
            <Phone aria-hidden="true" size={18} />
            Call a location
          </h3>
          <div className="urgent-phone-grid">
            {site.locations.map((location) => (
              <div key={location.id}>
                <span>{location.name}</span>
                <a href={`tel:${location.tel}`}>{location.phone}</a>
              </div>
            ))}
          </div>
          <Button href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</Button>
          <p className="urgent-note">Urgent care available Monday-Friday during regular clinic hours. Call ahead for fastest service.</p>
        </article>
      </div>
    </Section>
  );
}
