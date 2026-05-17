import Link from "next/link";
import { getServerSession } from "next-auth";
import { LockKeyhole } from "lucide-react";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function NotAuthorizedPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  return (
    <section className="admin-auth-page">
      <div className="admin-auth-card">
        <LockKeyhole aria-hidden="true" size={32} />
        <p className="dashboard-eyebrow">Not authorized</p>
        <h1>This Google account does not have dashboard access.</h1>
        <p>
          {email ? `You are currently signed in as ${email}.` : "No active Google session was found."}
          {" "}Use an approved admin account or add that exact email to `ADMIN_EMAILS` or the `admin_roles` table.
        </p>
        <div className="dashboard-actions">
          <SignOutButton />
          <Link className="dashboard-auth-link" href="/">Return to public site</Link>
        </div>
      </div>
    </section>
  );
}
