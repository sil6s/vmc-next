import Link from "next/link";
import { Baby, Ear, HeartPulse, Scissors, ShieldCheck, SmilePlus } from "lucide-react";

const services = [
  { title: "Puppy & kitten care", text: "First exams, vaccines, prevention, and practical guidance for new pets.", href: "/services/puppy-kitten-care/", icon: Baby },
  { title: "Wellness & prevention", text: "Routine checkups, vaccines, and prevention plans shaped around your pet.", href: "/services/pet-wellness-exams/", icon: ShieldCheck },
  { title: "Sick visits & diagnostics", text: "Thoughtful evaluation and next steps when your pet is not feeling like themselves.", href: "/services/sick-pet-visits/", icon: HeartPulse },
  { title: "Dental care", text: "Support for oral health, from wellness checks to professional dental care.", href: "/services/pet-dental-care/", icon: SmilePlus },
  { title: "Skin & ear care", text: "Help with itching, irritation, ear concerns, and recurring allergies.", href: "/services/skin-ear-allergy-care/", icon: Ear },
  { title: "Surgery & procedures", text: "Clear preparation, careful monitoring, and recovery guidance for selected procedures.", href: "/services/soft-tissue-surgery/", icon: Scissors }
];

export function HomeCareFinder() {
  return (
    <div className="home-care-overview">
      {services.map(({ title, text, href, icon: Icon }) => (
        <Link className="home-care-overview-item" href={href} key={title}>
          <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </Link>
      ))}
      <Link className="home-care-all text-link" href="/services/">Explore all services →</Link>
    </div>
  );
}
