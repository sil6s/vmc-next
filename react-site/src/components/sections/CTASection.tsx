import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function CTASection({
  eyebrow = "Next Steps",
  title = "Ready to schedule an appointment?",
  body = "Call either clinic, request an appointment online, or send a message and our team will help you choose the right next step.",
  primary = { label: "Book Appointment", href: "/contact/" },
  secondary = { label: "New Patients", href: "/new-patients/" }
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section tone="red">
      <div className="cta-panel">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="hero-actions">
          <Button href={primary.href} variant="secondary">{primary.label}</Button>
          <Button href={secondary.href} variant="ghost">{secondary.label}</Button>
        </div>
      </div>
    </Section>
  );
}
