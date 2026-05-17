import { ExternalLinksForm } from "@/components/dashboard/ExternalLinksForm";
import { getDashboardSettings } from "@/lib/settings/settings";

export default async function LinksPage() {
  const settings = await getDashboardSettings();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Important Links</p>
        <h1>Website link destinations</h1>
        <p>Manage portal, pharmacy, appointment, form, social, and Google Business Profile links.</p>
      </div>
      <ExternalLinksForm initialLinks={settings.externalLinks} />
    </>
  );
}
