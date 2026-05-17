import type { ReactNode } from "react";
import Image from "next/image";
import { CircleCheck, Search } from "lucide-react";
import { DashboardBrand, DashboardHelpCard, DashboardMobileNav, DashboardNav } from "@/components/dashboard/DashboardNav";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdminSession();

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <DashboardBrand />
        <DashboardNav />
        <DashboardHelpCard />
        <p className="dashboard-sidebar-foot">Copyright {new Date().getFullYear()} Veterinary Medical Center</p>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <DashboardMobileNav />
          <label className="dashboard-search">
            <Search aria-hidden="true" size={18} />
            <span className="sr-only">Search dashboard</span>
            <input placeholder="Search settings, metrics, or pages..." />
            <kbd>⌘ K</kbd>
          </label>
          <span className="dashboard-security-chip">
            <CircleCheck aria-hidden="true" size={16} />
            Secure Google Login
          </span>
          <div className="dashboard-user">
            {admin.image ? <Image src={admin.image} alt="" width={42} height={42} /> : <span className="dashboard-avatar-fallback">{admin.name.charAt(0)}</span>}
            <span>
              <strong>{admin.name}</strong>
              <small>{admin.email}</small>
            </span>
            <em>Administrator</em>
          </div>
          <SignOutButton />
        </header>
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
