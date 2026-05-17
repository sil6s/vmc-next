"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpenText,
  HelpCircle,
  Home,
  Link as LinkIcon,
  MapPinned,
  MessageCircle,
  Plug,
  Search,
  Settings
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const navItems = [
  { label: "Overview", href: "/dashboard/", icon: Home },
  { label: "Live Chat", href: "/dashboard/live-chat/", icon: MessageCircle },
  { label: "Location & Hours", href: "/dashboard/location-hours/", icon: MapPinned },
  { label: "Important Links", href: "/dashboard/links/", icon: LinkIcon },
  { label: "Announcement Banner", href: "/dashboard/announcement/", icon: Bell },
  { label: "Analytics", href: "/dashboard/analytics/", icon: BarChart3 },
  { label: "Blog", href: "/dashboard/blog/", icon: BookOpenText },
  { label: "SEO Settings", href: "/dashboard/seo/", icon: Search },
  { label: "Activity Log", href: "/dashboard/activity/", icon: Activity },
  { label: "Integrations", href: "/dashboard/integrations/", icon: Plug }
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard/") return pathname === "/dashboard";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function DashboardBrand() {
  return (
    <div className="dashboard-brand">
      <Logo />
      <span>Admin Dashboard</span>
    </div>
  );
}

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="dashboard-nav" aria-label="Dashboard navigation">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link className={isActive(pathname, href) ? "is-active" : undefined} href={href} key={href}>
          <Icon aria-hidden="true" size={18} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function DashboardHelpCard() {
  return (
    <aside className="dashboard-help-card">
      <HelpCircle aria-hidden="true" size={18} />
      <strong>Need help?</strong>
      <p>Contact support if you need assistance with your dashboard.</p>
      <a href="mailto:support@nky.vet">Contact Support</a>
    </aside>
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
