import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { PasskeySignInForm } from "@/components/dashboard/PasskeySignInForm";
import { Logo } from "@/components/layout/Logo";
import { isApprovedAdmin } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Login | Veterinary Medical Centers",
  robots: {
    index: false,
    follow: false
  }
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || "/dashboard/";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user?.email) {
    if (await isApprovedAdmin(user.email)) {
      redirect(callbackUrl);
    }
    redirect("/not-authorized/");
  }

  return (
    <section className="admin-auth-page admin-login-page">
      <div className="admin-login-shell">
        <header className="admin-login-header">
          <Logo className="admin-login-logo" />
          <span>
            <LockKeyhole aria-hidden="true" size={15} />
            Approved administrators only
          </span>
        </header>

        <div className="admin-login-grid">
          <div className="admin-login-content">
            <div className="admin-login-copy">
              <p className="dashboard-eyebrow">Private Admin Portal</p>
              <h1>We&rsquo;ve gone passwordless.</h1>
              <p>
                Enter your admin email and we&rsquo;ll send a secure sign-in link. No password needed.
              </p>
            </div>

            <div className="admin-auth-card admin-login-card">
              <div className="admin-login-card-head">
                <span className="admin-login-icon">
                  <ShieldCheck aria-hidden="true" size={22} />
                </span>
                <div>
                  <h2>Secure sign-in</h2>
                  <p>Email link or passkey — no password required.</p>
                </div>
              </div>

              {params.error && (
                <p className="admin-login-error" role="alert">
                  Sign-in failed. Please try again or contact your administrator.
                </p>
              )}

              <PasskeySignInForm callbackUrl={callbackUrl} />

              <div className="admin-login-secondary-actions">
                <Link className="dashboard-auth-link admin-return-link" href="/">
                  <ArrowLeft aria-hidden="true" size={15} />
                  Return to public site
                </Link>
                <p>Need access? Contact the website administrator.</p>
              </div>
            </div>
          </div>

          <aside className="admin-login-visual" aria-label="Veterinary Medical Centers admin portal">
            <Image
              src="/images/northern-kentucky-vet-hero.jpg"
              alt="Calm veterinary care environment with a cat and clinician"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <div className="admin-login-visual-overlay">
              <p>Clinic Website Management</p>
              <strong>Warm, secure access for the team that keeps the website current.</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
