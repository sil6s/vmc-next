import { StaffForm } from "@/components/dashboard/StaffForm";
import { getDashboardSettings } from "@/lib/settings/settings";
import { fetchPersonProfiles } from "@/sanity/personProfiles";

export default async function StaffDashboardPage() {
  const [settings, profiles] = await Promise.all([getDashboardSettings(), fetchPersonProfiles()]);

  return (
    <>
      <StaffForm initialStaff={settings.staff} initialProfiles={profiles} />
    </>
  );
}
