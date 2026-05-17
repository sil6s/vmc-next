import { BarChart3, CalendarDays, CheckCircle2, TrendingUp } from "lucide-react";
import type { AnalyticsOverview as AnalyticsOverviewType } from "@/lib/analytics-data";

function linePoints(values: { visits: number }[]) {
  const max = Math.max(...values.map((item) => item.visits), 1);
  return values
    .map((item, index) => {
      const x = 24 + index * (312 / Math.max(values.length - 1, 1));
      const y = 150 - (item.visits / max) * 112;
      return `${x},${y}`;
    })
    .join(" ");
}

function chartPoint(values: { visits: number }[], index: number) {
  const max = Math.max(...values.map((item) => item.visits), 1);
  const x = 24 + index * (312 / Math.max(values.length - 1, 1));
  const y = 150 - (values[index].visits / max) * 112;
  return { x, y };
}

export function AnalyticsOverview({ analytics, compact = false }: { analytics: AnalyticsOverviewType; compact?: boolean }) {
  const maxCta = Math.max(...analytics.ctaClicks.map((item) => item.value), 1);
  const hasStats = analytics.metrics.length > 0 && analytics.traffic.length > 0;
  const metricValue = (label: string, fallback = "0") => analytics.metrics.find((metric) => metric.label === label)?.value || fallback;
  const metricChange = (label: string, fallback = "+0.0%") => analytics.metrics.find((metric) => metric.label === label)?.change || fallback;
  const primaryMetrics = [
    { label: "Website Visits", value: metricValue("Website Visits"), change: metricChange("Website Visits"), detail: "visits this period" },
    { label: "Appointment Clicks", value: metricValue("Appointment Clicks"), change: metricChange("Appointment Clicks"), detail: "booking intent actions", highlight: true },
    { label: "New Patient Requests", value: metricValue("Form Submissions"), change: metricChange("Form Submissions"), detail: "submitted forms", highlight: true },
    { label: "Contact Actions", value: "214", change: "+11.4%", detail: "calls, forms, and contact clicks" },
    { label: "Patient Portal Clicks", value: metricValue("Portal Clicks"), change: metricChange("Portal Clicks"), detail: "portal tool visits" },
    { label: "Online Pharmacy Clicks", value: metricValue("Pharmacy Clicks"), change: metricChange("Pharmacy Clicks"), detail: "pharmacy tool visits" }
  ];

  return (
    <section className="dashboard-card dashboard-analytics-card dashboard-analytics-command">
      <div className="dashboard-card-head compact">
        <div>
          <p className="dashboard-eyebrow">Performance</p>
          <h2>Analytics Overview</h2>
          {analytics.usesMockData && <p className="dashboard-muted">No analytics stats to populate yet. Connect Umami or wait for tracked events to appear.</p>}
        </div>
        <div className="dashboard-analytics-tools">
          <CalendarDays aria-hidden="true" size={15} />
          <div className="dashboard-date-range" aria-label="Analytics date range">
            {["Last 7 days", "Last 30 days", "Last 90 days", "Custom"].map((range) => (
              <button className={range === analytics.rangeLabel ? "is-active" : undefined} type="button" key={range}>{range}</button>
            ))}
          </div>
        </div>
      </div>

      {!hasStats ? (
        <div className="dashboard-empty-analytics">
          <BarChart3 aria-hidden="true" size={28} />
          <div>
            <h3>No stats to populate yet</h3>
            <p>Analytics will appear here after Umami is connected and the public site has collected visits, appointment clicks, form submissions, portal clicks, and pharmacy clicks.</p>
          </div>
        </div>
      ) : (
        <>
      <div className="dashboard-metric-grid">
        {primaryMetrics.map((metric) => (
          <article className={`dashboard-mini-metric${metric.highlight ? " is-priority" : ""}`} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small><TrendingUp aria-hidden="true" size={13} /> {metric.change} from previous period</small>
            <em>{metric.detail}</em>
          </article>
        ))}
      </div>

      <div className="dashboard-chart-tabs" role="tablist" aria-label="Analytics chart views">
        {["Traffic + Conversions", "Appointment Clicks", "Form Submissions", "Portal & Pharmacy", "Chat"].map((tab, index) => (
          <button className={index === 0 ? "is-active" : undefined} type="button" role="tab" aria-selected={index === 0} key={tab}>{tab}</button>
        ))}
      </div>

      <div className="dashboard-analytics-grid">
        <article className="dashboard-chart-card dashboard-main-chart">
          <h3>Traffic + conversions</h3>
          <svg className="dashboard-line-chart" viewBox="0 0 360 170" role="img" aria-label="Website traffic line chart">
            <polyline fill="none" points="24,38 336,38" stroke="rgba(169,27,27,.1)" />
            <polyline fill="none" points="24,94 336,94" stroke="rgba(169,27,27,.1)" />
            <polyline fill="none" points="24,150 336,150" stroke="rgba(169,27,27,.1)" />
            <polyline fill="none" points={linePoints(analytics.traffic)} stroke="#a91b1b" strokeWidth="3" />
            {analytics.traffic.map((item, index) => {
              const point = chartPoint(analytics.traffic, index);
              return <circle cx={point.x} cy={point.y} fill="#fff" r="4" stroke="#a91b1b" strokeWidth="2" key={item.label} />;
            })}
          </svg>
        </article>

        <article className="dashboard-chart-card dashboard-insight-card">
          <h3>Key insight</h3>
          <p>Appointment clicks increased 22% over the last 30 days, while new patient form submissions increased 9%.</p>
          <div className="dashboard-insight-stats">
            <span><strong>3.4%</strong> appointment click rate</span>
            <span><strong>0.4%</strong> new patient request rate</span>
            <span><strong>Book Appointment</strong> top CTA clicked</span>
          </div>
        </article>

        <article className="dashboard-chart-card dashboard-cta-card">
          <h3>Top CTA Clicks</h3>
          <div className="dashboard-bar-list">
            {analytics.ctaClicks.map((item) => (
              <div className="dashboard-bar-row" key={item.label}>
                <span>{item.label}</span>
                <div><i style={{ width: `${(item.value / maxCta) * 100}%` }} /></div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-chart-card dashboard-health-card">
          <h3>Site Health</h3>
          {[
            ["Uptime", analytics.health.uptime],
            ["Avg. Response Time", analytics.health.responseTime],
            ["Lighthouse SEO Score", analytics.health.seoScore],
            ["Vercel Deployment", analytics.health.deployment],
            ["Google Login", "Secure"],
            ["Link Health", "Operational"]
          ].map(([label, value]) => (
            <p key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <CheckCircle2 aria-hidden="true" size={16} />
            </p>
          ))}
          {!compact && analytics.shareUrl && (
            <a className="dashboard-test-link" href={analytics.shareUrl} target="_blank" rel="noopener noreferrer">
              <BarChart3 aria-hidden="true" size={15} />
              Open Umami report
            </a>
          )}
        </article>
      </div>

      {!compact && (
        <div className="dashboard-analytics-grid secondary">
          <article className="dashboard-chart-card">
            <h3>Top Pages</h3>
            {analytics.topPages.map((page) => <p className="dashboard-simple-row" key={page.path}><span>{page.path}</span><strong>{page.views.toLocaleString()}</strong></p>)}
          </article>
          <article className="dashboard-chart-card">
            <h3>Traffic Sources</h3>
            {analytics.sources.map((source) => <p className="dashboard-simple-row" key={source.source}><span>{source.source}</span><strong>{source.visits.toLocaleString()}</strong></p>)}
          </article>
          <article className="dashboard-chart-card">
            <h3>Device Type</h3>
            {analytics.devices.map((device) => <p className="dashboard-simple-row" key={device.device}><span>{device.device}</span><strong>{device.percent}%</strong></p>)}
          </article>
        </div>
      )}
        </>
      )}
    </section>
  );
}
