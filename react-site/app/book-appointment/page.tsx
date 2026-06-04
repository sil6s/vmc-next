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
    "Book a veterinary appointment at Veterinary Medical Centers. New patients can complete registration, and existing clients can use portal, phone, live chat, pharmacy, or contact options.",
  path: "/book-appointment/"
});

type PageProps = {
  searchParams?: Promise<{ type?: string }>;
};

export default async function BookAppointmentPage({ searchParams }: PageProps) {
  const settings = await getPublicSettings();
  const localeHeader = (await headers()).get("x-vmc-locale");
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const params = await searchParams;
  const initialMode = params?.type === "new" || params?.type === "existing" ? params.type : "choose";

  return (
    <>
      <BookAppointmentExperience
        portalUrl={settings.externalLinks.onlinePortalUrl}
        pharmacyUrl={settings.externalLinks.pharmacyUrl}
        liveChatEnabled={settings.liveChat.liveChatEnabled}
        locations={settings.publicLocations}
        initialMode={initialMode}
        locale={locale}
      />
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
