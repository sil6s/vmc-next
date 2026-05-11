import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Section } from "@/components/ui/Section";

const staticLinks = [
  { label: "New Patients", desc: "First visit info and registration forms", href: "/new-patients/" },
  { label: "Patient Portal", desc: "Secure portal login and online booking", href: "/patient-portal-online-booking/" },
  { label: "Online Pharmacy", desc: "Medication requests and refill support", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/" },
  { label: "Contact Us", desc: "Get in touch or find our locations", href: "/contact/" }
];

export function QuickLinksSection() {
  const links = [
    ...services.slice(0, 6).map((service) => ({
      label: service.title.replace(" & Preventive Care", "").replace(" During Clinic Hours", ""),
      desc: service.excerpt.split(".")[0],
      href: `/services/${service.slug}/`
    })),
    ...staticLinks
  ];

  return (
    <Section tone="white" eyebrow="Quick Links" title="Explore our veterinary services.">
      <div className="quick-links-grid">
        {links.map((link) => (
          <Link href={link.href} className="quick-link-card" key={link.href}>
            <span>
              <strong>{link.label}</strong>
              <small>{link.desc}</small>
            </span>
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        ))}
      </div>
    </Section>
  );
}
