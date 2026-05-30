import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPublicSettings } from "@/lib/settings/public";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true
  }
};

export default async function PharmacyPage() {
  const settings = await getPublicSettings();

  redirect(settings.externalLinks.pharmacyUrl);
}
