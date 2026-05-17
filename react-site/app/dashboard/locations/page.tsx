import { LocationsForm } from "@/components/dashboard/LocationsForm";
import { getDashboardSettings } from "@/lib/settings/settings";

export default async function LocationsPage() {
  const settings = await getDashboardSettings();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Locations</p>
        <h1>Location and business hours</h1>
        <p>Update clinic contact information, Google Maps links, after-hours messages, and public hours previews.</p>
      </div>
      <LocationsForm initialLocations={settings.locations} />
    </>
  );
}
