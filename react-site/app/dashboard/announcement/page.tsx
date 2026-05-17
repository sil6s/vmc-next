import { AnnouncementForm } from "@/components/dashboard/AnnouncementForm";
import { getDashboardSettings } from "@/lib/settings/settings";

export default async function AnnouncementPage() {
  const settings = await getDashboardSettings();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Announcement Banner</p>
        <h1>Homepage and sitewide announcement</h1>
        <p>Publish or hide a public website banner for closures, holiday hours, weather notices, or clinic updates.</p>
      </div>
      <AnnouncementForm initialSettings={settings.announcement} />
    </>
  );
}
