"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpenText,
  Home,
  Link as LinkIcon,
  MapPinned,
  MessageCircle,
  Plug,
  Search,
  Settings
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/", icon: Home, group: "Main" },
  { label: "Analytics", href: "/dashboard/analytics/", icon: BarChart3, group: "Main" },
  { label: "Activity Log", href: "/dashboard/activity/", icon: Activity, group: "Main" },
  { label: "Live Chat", href: "/dashboard/live-chat/", icon: MessageCircle, group: "Site Controls" },
  { label: "Location & Hours", href: "/dashboard/location-hours/", icon: MapPinned, group: "Site Controls" },
  { label: "Important Links", href: "/dashboard/links/", icon: LinkIcon, group: "Site Controls" },
  { label: "Announcement Banner", href: "/dashboard/announcement/", icon: Bell, group: "Site Controls" },
  { label: "Blog", href: "/dashboard/blog/studio/", icon: BookOpenText, group: "Content" },
  { label: "SEO Settings", href: "/dashboard/seo/", icon: Search, group: "Content" },
  { label: "Integrations", href: "/dashboard/integrations/", icon: Plug, group: "System" }
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard/") return pathname === "/dashboard";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function DashboardBrand() {
  return (
    <div className="dashboard-brand">
      <Link href="/dashboard/" aria-label="Veterinary Medical Center admin dashboard">
        <strong>Veterinary Medical Center</strong>
        <small>Fort Thomas &amp; Independence, KY</small>
      </Link>
      <span>Admin Dashboard</span>
    </div>
  );
}

export function DashboardNav() {
  const pathname = usePathname();
  const groups = ["Main", "Site Controls", "Content", "System"];

  return (
    <nav className="dashboard-nav" aria-label="Dashboard navigation">
      {groups.map((group) => (
        <div className="dashboard-nav-group" key={group}>
          <strong>{group}</strong>
          {navItems.filter((item) => item.group === group).map(({ label, href, icon: Icon }) => (
            <Link className={isActive(pathname, href) ? "is-active" : undefined} href={href} key={href}>
              <Icon aria-hidden="true" size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function DashboardMobileNav() {
  return (
    <details className="dashboard-mobile-nav">
      <summary>
        <Settings aria-hidden="true" size={17} />
        Dashboard Menu
      </summary>
      <DashboardNav />
    </details>
  );
}
