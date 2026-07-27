import { BookAppointmentClinicChoice } from "@/components/sections/BookAppointmentClinicChoice";
import { BookAppointmentExperience } from "@/components/sections/BookAppointmentExperience";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { headers } from "next/headers";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { getPublicSettings } from "@/lib/settings/public";

export const metadata = pageMetadata({
  title: "Book a Vet Appointment | Veterinary Medical Centers",
  description:
    "Book a veterinary appointment at Veterinary Medical Centers. New patients can complete registration, and existing clients can use the portal, phone, online help, pharmacy, or contact options.",
  path: "/book-appointment/"
});

type PageProps = {
  searchParams?: Promise<{ type?: string; flow?: string }>;
};

export default async function BookAppointmentPage({ searchParams }: PageProps) {
  const settings = await getPublicSettings();
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const params = await searchParams;
  const initialMode = params?.type === "new" || params?.type === "existing" ? params.type : "choose";
  // Deep links from the New Patients page (?type=new / ?type=existing) and the
  // classic choose screen (?flow=classic) keep using the original flow. Everything
  // else lands on the simplified clinic-choice screen that routes into Otto.
  const useClassicFlow = initialMode !== "choose" || params?.flow === "classic";

  return (
    <>
      {useClassicFlow ? (
        <BookAppointmentExperience
          portalUrl="/patient-portal-online-booking/"
          pharmacyUrl={settings.externalLinks.pharmacyUrl}
          liveChatEnabled={settings.liveChat.liveChatEnabled}
          locations={settings.publicLocations}
          initialMode={initialMode}
          locale={locale}
        />
      ) : (
        <BookAppointmentClinicChoice locations={settings.publicLocations} />
      )}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book Appointment", href: "/book-appointment/" }]} />
      <JsonLd
        data={[
          webpageSchema(
            "/book-appointment/",
            "Book a Vet Appointment | Veterinary Medical Centers",
            "Book a veterinary appointment with Veterinary Medical Centers in Fort Thomas or Independence, Kentucky."
          ),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book Appointment", path: "/book-appointment/" }])
        ]}
      />
    </>
  );
}
