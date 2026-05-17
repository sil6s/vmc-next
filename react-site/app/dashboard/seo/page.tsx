import { SeoSettingsForm } from "@/components/dashboard/SeoSettingsForm";
import { getDashboardSettings } from "@/lib/settings/settings";

export default async function SeoPage() {
  const settings = await getDashboardSettings();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">SEO</p>
        <h1>SEO and sitewide fallbacks</h1>
        <p>Keep metadata defaults and LocalBusiness schema settings structured without overriding page-specific SEO.</p>
      </div>
      <SeoSettingsForm initialSettings={settings.seo} />
    </>
  );
}
