import { redirect } from "next/navigation";
import { getPublicSettings } from "@/lib/settings/public";

export default async function PharmacyPage() {
  const settings = await getPublicSettings();

  redirect(settings.externalLinks.pharmacyUrl);
}
