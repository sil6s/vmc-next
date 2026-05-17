import { BarChart3, Bot, Database, PenTool } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    ["Google OAuth", "Secure admin login through approved Google accounts.", "Connected", Bot],
    ["Umami Analytics", "Public site tracking and dashboard metrics.", process.env.UMAMI_API_KEY ? "API Connected" : "Tracking Enabled", BarChart3],
    ["Postgres Storage", "Persistent settings, links, hours, blog posts, and activity logs.", process.env.DATABASE_URL || process.env.POSTGRES_URL ? "Connected" : "Needs DATABASE_URL", Database],
    ["Sanity Studio", "Optional long-term embedded editorial studio path.", "Ready later", PenTool]
  ] as const;

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Integrations</p>
        <h1>Website service connections</h1>
        <p>Monitor the systems that support login, analytics, storage, publishing, and future content workflows.</p>
      </div>
      <div className="dashboard-overview-grid">
        {integrations.map(([label, helper, status, Icon]) => (
          <article className="dashboard-stat-card" key={label}>
            <Icon aria-hidden="true" size={21} />
            <span>{label}</span>
            <strong>{status}</strong>
            <p className="dashboard-muted">{helper}</p>
          </article>
        ))}
      </div>
    </>
  );
}
