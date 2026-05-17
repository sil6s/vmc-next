import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export default function NotAuthorizedPage() {
  return (
    <section className="admin-auth-page">
      <div className="admin-auth-card">
        <LockKeyhole aria-hidden="true" size={32} />
        <p className="dashboard-eyebrow">Not authorized</p>
        <h1>This Google account does not have dashboard access.</h1>
        <p>Ask a site administrator to add your email to `ADMIN_EMAILS` or the `admin_roles` table before trying again.</p>
        <div className="dashboard-actions">
          <SignOutButton />
          <Link className="dashboard-auth-link" href="/">Return to public site</Link>
        </div>
      </div>
    </section>
  );
}
