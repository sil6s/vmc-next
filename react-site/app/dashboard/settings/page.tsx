import Link from "next/link";
import { Bell, Search, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Settings</p>
        <h1>Admin configuration</h1>
        <p>Manage the protected website controls that affect public content, metadata, and clinic communications.</p>
      </div>
      <div className="dashboard-overview-grid">
        <Link className="dashboard-stat-card" href="/dashboard/announcement/">
          <Bell aria-hidden="true" size={21} />
          <span>Announcement Banner</span>
          <strong>Closures and updates</strong>
        </Link>
        <Link className="dashboard-stat-card" href="/dashboard/seo/">
          <Search aria-hidden="true" size={21} />
          <span>SEO Settings</span>
          <strong>Metadata fallbacks</strong>
        </Link>
        <Link className="dashboard-stat-card" href="/dashboard/activity/">
          <ShieldCheck aria-hidden="true" size={21} />
          <span>Audit Trail</span>
          <strong>Recent admin changes</strong>
        </Link>
      </div>
    </>
  );
}
