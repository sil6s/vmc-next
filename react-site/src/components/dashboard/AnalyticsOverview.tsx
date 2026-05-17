import { BarChart3, CalendarDays, CheckCircle2 } from "lucide-react";
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

  return (
    <section className="dashboard-card dashboard-analytics-card">
      <div className="dashboard-card-head compact">
        <div>
          <h2>Analytics Overview</h2>
          {analytics.usesMockData && <p className="dashboard-muted">Showing local fallback data until the Umami API key is configured.</p>}
        </div>
        <span className="dashboard-date-chip">
          <CalendarDays aria-hidden="true" size={15} />
          {analytics.rangeLabel}
        </span>
      </div>

      <div className="dashboard-metric-grid">
        {analytics.metrics.map((metric) => (
          <article className="dashboard-mini-metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.change}</small>
          </article>
        ))}
      </div>

      <div className="dashboard-analytics-grid">
        <article className="dashboard-chart-card">
          <h3>Website Traffic (Visits)</h3>
          <svg className="dashboard-line-chart" viewBox="0 0 360 170" role="img" aria-label="Website traffic line chart">
            <defs>
              <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(169, 27, 27, 0.24)" />
                <stop offset="100%" stopColor="rgba(169, 27, 27, 0)" />
              </linearGradient>
            </defs>
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

        <article className="dashboard-chart-card">
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
            ["Vercel Deployment", analytics.health.deployment]
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
    </section>
  );
}
