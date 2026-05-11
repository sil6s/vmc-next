import Link from "next/link";
import { AlertTriangle, Brain, HeartPulse, Scissors, SmilePlus, Stethoscope } from "lucide-react";
import { services } from "@/data/services";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const serviceIcons = {
  wellness: Stethoscope,
  dental: SmilePlus,
  surgery: Scissors,
  behavioral: Brain,
  urgent: AlertTriangle,
  feline: HeartPulse
};

export function ServiceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <Section
      id="services"
      tone="cream"
      eyebrow="Veterinary Services"
      title="Veterinary services for dogs and cats in Northern Kentucky."
      intro="From routine wellness visits to dental care, surgery, behavior support, and urgent appointments, both VMC locations are built around practical care and clear communication."
    >
      <div className={compact ? "card-grid compact" : "card-grid"}>
        {services.map((service) => {
          const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? HeartPulse;

          return (
            <Card key={service.slug}>
              <span className="icon-mark">
                <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.excerpt}</p>
              <Link href={`/services/${service.slug}/`}>Learn more</Link>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
