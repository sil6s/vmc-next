"use client";

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

export function ServiceBrowser({ services }: { services: ServiceCard[] }) {
  const [activeTab, setActiveTab] = useState<ServiceTab>("all");
  const visibleCount = useMemo(
    () => services.filter((service) => activeTab === "all" || service.serviceCategory === activeTab).length,
    [activeTab, services]
  );

  return (
    <Tabs className="service-browser" id="service-browser" value={activeTab} onValueChange={(value) => setActiveTab(value as ServiceTab)}>
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

          return (
            <article
              aria-hidden={isFilteredOut}
              className={`service-detail-card service-browser-card${isFilteredOut ? " is-filtered-out" : ""}`}
              data-category={service.serviceCategory}
              id={service.id}
              key={service.slug}
            >
              <div className="service-card-topline">
                <span>{serviceCategoryLabels[service.serviceCategory]}</span>
                <span className="icon-mark">
                  <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
                </span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <p className="service-best">
                <strong>Best for:</strong> {service.bestFor.join(", ")}
              </p>
              <Link href={`/services/${service.slug}/`}>{service.cta}</Link>
            </article>
          );
        })}
      </div>
    </Tabs>
  );
}
