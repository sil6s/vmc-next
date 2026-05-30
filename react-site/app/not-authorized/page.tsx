import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Not Authorized | Veterinary Medical Centers",
  robots: {
    index: false,
    follow: false
  }
};

export default async function NotAuthorizedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email;

  return (
    <section className="admin-auth-page">
      <div className="admin-auth-card">
        <LockKeyhole aria-hidden="true" size={32} />
        <p className="dashboard-eyebrow">Not authorized</p>
        <h1>This Google account does not have dashboard access.</h1>
        <p>
          {email ? `You are currently signed in as ${email}.` : "No active session was found."}
          {" "}Use an approved admin account or add that exact email to <code>ADMIN_EMAILS</code> or the <code>admin_roles</code> table.
        </p>
        <div className="dashboard-actions">
          <SignOutButton />
          <Link className="dashboard-auth-link" href="/">Return to public site</Link>
        </div>
      </div>
    </section>
  );
}
