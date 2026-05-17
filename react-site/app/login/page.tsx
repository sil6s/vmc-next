import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, BadgeCheck, LockKeyhole, ShieldCheck } from "lucide-react";
import { GoogleSignInButton } from "@/components/dashboard/GoogleSignInButton";
import { Logo } from "@/components/layout/Logo";
import { isApprovedAdmin } from "@/lib/admin-auth";
import { authOptions } from "@/lib/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);
  const callbackUrl = params.callbackUrl || "/dashboard/";

  if (session?.user?.email) {
    if (await isApprovedAdmin(session.user.email)) {
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
              <h1>Sign in to manage Veterinary Medical Center</h1>
              <p>
                Dashboard access is limited to approved clinic administrators. Use the authorized Google account for website settings, content tools, and clinic management controls.
              </p>
            </div>

            <div className="admin-auth-card admin-login-card">
              <div className="admin-login-card-head">
                <span className="admin-login-icon">
                  <ShieldCheck aria-hidden="true" size={22} />
                </span>
                <div>
                  <h2>Secure Google sign-in</h2>
                  <p>Access is checked again after Google authentication.</p>
                </div>
              </div>

              <GoogleSignInButton callbackUrl={callbackUrl} />

              <div className="admin-login-note">
                <BadgeCheck aria-hidden="true" size={16} />
                <span>Only approved administrators can open the dashboard.</span>
              </div>

              <div className="admin-login-secondary-actions">
                <Link className="dashboard-auth-link admin-return-link" href="/">
                  <ArrowLeft aria-hidden="true" size={15} />
                  Return to public site
                </Link>
                <p>Need access? Contact the website administrator.</p>
              </div>
            </div>
          </div>

          <aside className="admin-login-visual" aria-label="Veterinary Medical Center admin portal">
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
