import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { getAnalyticsOverview } from "@/lib/analytics-data";

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsOverview();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Analytics</p>
        <h1>Website performance and conversion tracking</h1>
        <p>Review Umami traffic, CTA events, top pages, referrers, device type, and site health signals.</p>
      </div>
      <AnalyticsOverview analytics={analytics} />
      {!process.env.UMAMI_API_KEY && (
        <section className="dashboard-card">
          <h2>Connect Umami API</h2>
          <p className="dashboard-muted">Add `UMAMI_API_KEY` in Vercel or your local environment to replace fallback metrics with live Umami data. Optional `UMAMI_SHARE_URL` can expose a read-only report link.</p>
        </section>
      )}
    </>
  );
}
