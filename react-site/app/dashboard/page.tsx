import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  EyeOff,
  ExternalLink,
  Link as LinkIcon,
  Pill,
  UserRound
} from "lucide-react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { CopyLinkButton } from "@/components/dashboard/CopyLinkButton";
import { QuickControls } from "@/components/dashboard/QuickControls";
import { getAnalyticsOverview } from "@/lib/analytics-data";
import { getActivityLog, getDashboardSettings } from "@/lib/settings/settings";
import type { ManagedLocation } from "@/lib/settings/types";

function displayTime(value: string) {
  if (!value) return "";
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function todayPreview(location: ManagedLocation) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" });
  const hours = location.hours.find((hour) => hour.day === today) || location.hours[0];
  if (!hours.isOpen) return { label: "Office Closed Today", helper: hours.note || "Call for current availability", state: "warn" };
  return { label: `Open until ${displayTime(hours.closeTime)}`, helper: `${displayTime(hours.openTime)} opening, Eastern Time`, state: "green" };
}

function locationShortName(location: ManagedLocation) {
  return location.clinicName.replace("Veterinary Medical Center of ", "");
}

export default async function DashboardPage() {
  const [settings, activity, analytics] = await Promise.all([getDashboardSettings(), getActivityLog(4), getAnalyticsOverview()]);
  const fortThomas = settings.locations.find((location) => location.id === "fort-thomas") || settings.locations[0];
  const today = todayPreview(fortThomas);
  const visibleLinks = [
    ["Patient Portal URL", settings.externalLinks.onlinePortalUrl, UserRound],
    ["Online Pharmacy URL", settings.externalLinks.pharmacyUrl, Pill],
    ["Book Appointment URL", settings.externalLinks.bookAppointmentUrl, LinkIcon],
    ["New Patient Form URL", settings.externalLinks.newPatientFormUrl, LinkIcon]
  ] as const;
  const attentionItems = [
    !settings.quickControls.liveChatEnabled && { label: "Live chat hidden", helper: "Visitors cannot start a live chat.", icon: EyeOff },
    !settings.quickControls.websiteBookingButton && { label: "Booking CTAs hidden", helper: "Book appointment buttons are not visible.", icon: EyeOff },
    settings.quickControls.emergencyAlertMode && { label: "Emergency alert active", helper: "Emergency banner is currently visible.", icon: AlertTriangle },
    today.state === "warn" && { label: "Office closed today", helper: today.helper, icon: CalendarClock }
  ].filter(Boolean) as { label: string; helper: string; icon: typeof AlertTriangle }[];

  return (
    <>
      <AnalyticsOverview analytics={analytics} />

      <div className="dashboard-priority-grid">
        <section className="dashboard-card dashboard-attention-card">
          <div className="dashboard-card-head compact">
            <div>
              <p className="dashboard-eyebrow">Needs Attention</p>
              <h2>Action check</h2>
            </div>
            <AlertTriangle aria-hidden="true" size={20} />
          </div>
          {attentionItems.length ? (
            <ul className="dashboard-attention-list" aria-label="Dashboard items needing attention">
              {attentionItems.map(({ label, helper, icon: Icon }) => (
                <li key={label}>
                  <span><Icon aria-hidden="true" size={16} /></span>
                  <strong>{label}</strong>
                  <small>{helper}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="dashboard-ok-message"><CheckCircle2 aria-hidden="true" size={17} /> All critical systems look good.</p>
          )}
        </section>

        <QuickControls initialControls={settings.quickControls} />
      </div>

      <div className="dashboard-support-grid">
        <section className="dashboard-card dashboard-important-links-card">
          <div className="dashboard-card-head compact">
            <div>
              <p className="dashboard-eyebrow">Patient Tools</p>
              <h2>Patient Tool Links</h2>
            </div>
            <Link className="dashboard-test-link" href="/dashboard/links/">Edit All</Link>
          </div>
          <div className="dashboard-overview-links">
            {visibleLinks.map(([label, href, Icon]) => (
              <div className="dashboard-overview-link-row" key={label}>
                <span><Icon aria-hidden="true" size={17} /></span>
                <strong>{label}</strong>
                <code>{href || "Not configured"}</code>
                <em className={`dashboard-link-status ${href ? "is-ok" : "is-warn"}`}>{href ? "Working" : "Needs Review"}</em>
                <CopyLinkButton value={href} label={label} />
                {href && (
                  <a className="dashboard-test-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                    Test
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-card dashboard-office-card">
          <div className="dashboard-card-head compact">
            <div>
              <p className="dashboard-eyebrow">Clinic Operations</p>
              <h2>Office Hours</h2>
            </div>
            <Link className="dashboard-test-link" href="/dashboard/location-hours/">Edit Hours</Link>
          </div>
          <div className={`dashboard-today-status is-${today.state}`}>
            <CalendarClock aria-hidden="true" size={18} />
            <strong>{today.label}</strong>
            <span>{today.helper}</span>
          </div>
          <div className="dashboard-tabs" role="tablist" aria-label="Office locations">
            {settings.locations.map((location, index) => (
              <span className={index === 0 ? "is-active" : undefined} key={location.id}>{locationShortName(location)}</span>
            ))}
          </div>
          <div className="dashboard-hours-overview">
            {fortThomas.hours.map((hour) => (
              <p key={hour.day}>
                <span>{hour.day}</span>
                <strong>{hour.isOpen ? `${displayTime(hour.openTime)} - ${displayTime(hour.closeTime)}` : hour.note || "Closed"}</strong>
              </p>
            ))}
          </div>
          <small className="dashboard-timezone-note"><CalendarClock aria-hidden="true" size={15} /> Times are displayed in Eastern Time (ET)</small>
        </section>

        <section className="dashboard-card dashboard-preview-site-card">
          <div className="dashboard-card-head compact">
            <div>
              <p className="dashboard-eyebrow">Preview</p>
              <h2>Public Site Preview</h2>
            </div>
            <Link className="dashboard-test-link" href="/" target="_blank">Open Site</Link>
          </div>
          <div className="dashboard-site-preview compact">
            <Image src="/images/northern-kentucky-vet-hero.jpg" alt="Public website preview" width={420} height={220} />
            <div>
              <strong>nky.vet is live</strong>
              <span><CheckCircle2 aria-hidden="true" size={14} /> Homepage, New Patients, and Contact are ready to preview.</span>
              <nav aria-label="Preview pages">
                <Link href="/" target="_blank">Homepage</Link>
                <Link href="/new-patients/" target="_blank">New Patients</Link>
                <Link href="/contact/" target="_blank">Contact</Link>
              </nav>
            </div>
          </div>
        </section>

        <section className="dashboard-card dashboard-activity-card">
          <div className="dashboard-card-head compact">
            <div>
              <p className="dashboard-eyebrow">Audit Trail</p>
              <h2>Recent Admin Activity</h2>
            </div>
            <Link className="dashboard-view-all" href="/dashboard/activity/">View full log <ExternalLink aria-hidden="true" size={14} /></Link>
          </div>
          {activity.length ? (
            <div className="dashboard-compact-activity">
              {activity.map((entry) => (
                <p key={entry.id}>
                  <strong>{entry.action}</strong>
                  <span>{entry.userEmail}</span>
                  <time>{new Date(entry.createdAt).toLocaleString()}</time>
                </p>
              ))}
            </div>
          ) : (
            <p className="dashboard-muted">No dashboard activity has been recorded yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
