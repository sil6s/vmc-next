"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Apple,
  Baby,
  ClipboardList,
  HeartPulse,
  Microscope,
  Scissors,
  ShieldCheck,
  SmilePlus,
  Stethoscope,
  Syringe
} from "lucide-react";
import { serviceCategoryLabels, type ServiceCard, type ServiceCategory } from "@/data/serviceHub";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ServiceTab = "all" | ServiceCategory;

const tabs: { id: ServiceTab; label: string }[] = [
  { id: "all", label: "All Services" },
  { id: "preventiveCare", label: "Preventive Care" },
  { id: "medicalCare", label: "Medical Care" },
  { id: "dentalSurgery", label: "Dental & Surgery" },
  { id: "lifeStageCare", label: "Life Stage Care" }
];

const iconMap = {
  activity: Activity,
  apple: Apple,
  baby: Baby,
  clipboardList: ClipboardList,
  heartPulse: HeartPulse,
  microscope: Microscope,
  scissors: Scissors,
  shieldCheck: ShieldCheck,
  smilePlus: SmilePlus,
  stethoscope: Stethoscope,
  syringe: Syringe
};

const serviceImages: Record<string, string> = {
  "pet-wellness-exams": "/images/blog/dog-exam.jpg",
  "dog-cat-vaccinations": "/images/blog/dog-vaccine.jpg",
  "puppy-kitten-care": "/images/blog/puppy-vaccine-schedule.jpg",
  "senior-pet-care": "/images/blog/senior-dog.jpg",
  "sick-pet-visits": "/images/blog/dog-on-exam-table.jpg",
  "veterinary-diagnostics": "/images/blog/dog-xray.jpg",
  "pet-dental-care": "/images/blog/dog-dental-cleaning.jpg",
  "spay-neuter-surgery": "/images/blog/first-vet-visit.jpg",
  "soft-tissue-surgery": "/images/blog/dog-on-exam-table.jpg",
  "parasite-prevention": "/images/blog/cat-vaccine-schedule.jpg",
  "skin-ear-allergy-care": "/images/blog/cat-exam.jpg",
  "nutrition-weight-guidance": "/images/blog/senior-cat.jpg"
};

const fallbackImage = "/images/veterinary-care-hero.jpg";

export function ServiceBrowser({ services }: { services: ServiceCard[] }) {
  const [activeTab, setActiveTab] = useState<ServiceTab>("all");
  const visibleCount = useMemo(
    () => services.filter((service) => activeTab === "all" || service.serviceCategory === activeTab).length,
    [activeTab, services]
  );

  return (
    <Tabs
      className="service-browser"
      id="service-browser"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as ServiceTab)}
    >
      <TabsList className="service-tabs" aria-label="Filter veterinary services by care type">
        {tabs.map((tab) => (
          <TabsTrigger
            aria-controls="service-browser-panel"
            id={`service-tab-${tab.id}`}
            key={tab.id}
            value={tab.id}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <p className="service-browser-count" aria-live="polite">
        Showing {visibleCount} {visibleCount === 1 ? "service" : "services"}
      </p>

      <div
        aria-labelledby={`service-tab-${activeTab}`}
        className="featured-services-grid service-browser-grid"
        id="service-browser-panel"
        role="tabpanel"
      >
        {services.map((service) => {
          const Icon = iconMap[service.cardIcon as keyof typeof iconMap] || Stethoscope;
          const isFilteredOut = activeTab !== "all" && service.serviceCategory !== activeTab;
          const image = serviceImages[service.slug] || fallbackImage;

          return (
            <article
              aria-hidden={isFilteredOut}
              className={`service-detail-card service-browser-card${isFilteredOut ? " is-filtered-out" : ""}`}
              data-category={service.serviceCategory}
              id={service.id}
              key={service.slug}
            >
              <div className="service-browser-card-image">
                <Image
                  src={image}
                  alt={`${service.title} at Veterinary Medical Centers in Northern Kentucky`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px"
                />
              </div>

              <div className="service-browser-card-body">
                <div className="service-card-topline">
                  <span className="service-category-chip">{serviceCategoryLabels[service.serviceCategory]}</span>
                  <span className="icon-mark">
                    <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
                  </span>
                </div>

                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>

                {service.bestFor.length > 0 && (
                  <div className="service-best-chips" aria-label="Best for">
                    <span className="service-best-label">Best for</span>
                    <div className="service-best-list">
                      {service.bestFor.map((item) => (
                        <span key={item} className="service-best-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                )}

                <Link href={`/services/${service.slug}/`} className="service-browser-cta">
                  {service.cta}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </Tabs>
  );
}
