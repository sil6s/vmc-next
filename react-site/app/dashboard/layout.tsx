import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { DashboardBrand, DashboardMobileNav, DashboardNav } from "@/components/dashboard/DashboardNav";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { Input } from "@/components/ui/input";
import { requireAdminSession } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Dashboard | Veterinary Medical Centers",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdminSession();

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <DashboardBrand />
        <DashboardNav />
        <div className="dashboard-sidebar-profile">
          <div className="dashboard-user">
            {admin.image ? <Image src={admin.image} alt="" width={42} height={42} /> : <span className="dashboard-avatar-fallback">{admin.name.charAt(0)}</span>}
            <span>
              <strong>{admin.name}</strong>
              <small>Administrator</small>
            </span>
          </div>
          <SignOutButton />
        </div>
        <p className="dashboard-sidebar-foot">Copyright {new Date().getFullYear()} Veterinary Medical Centers</p>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <DashboardMobileNav />
          <label className="dashboard-search">
            <Search aria-hidden="true" size={18} />
            <span className="sr-only">Search dashboard</span>
            <Input placeholder="Search settings, metrics, or pages..." />
            <kbd>⌘ K</kbd>
          </label>
          <Link className="dashboard-site-return" href="/">
            <ArrowLeft aria-hidden="true" size={16} />
            Return to main site
          </Link>
        </header>
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
