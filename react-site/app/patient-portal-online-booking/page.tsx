import type { Metadata } from "next";
import { PatientPortalDisclaimer } from "@/components/sections/PatientPortalDisclaimer";
import { pageMetadata } from "@/lib/metadata";
import { getPublicSettings } from "@/lib/settings/public";

const PORTAL_PATH = "/patient-portal-online-booking/";

export const metadata: Metadata = pageMetadata({
  title: "Patient Portal | Veterinary Medical Centers",
  description: "Continue to the Veterinary Medical Centers patient portal, powered by our technology partner Otto.",
  path: PORTAL_PATH,
  noIndex: true
});

export default async function PortalPage() {
  const settings = await getPublicSettings();

  return <PatientPortalDisclaimer portalUrl={settings.externalLinks.onlinePortalUrl} />;
}
