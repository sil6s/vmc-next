import Image from "next/image";
import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Link as LinkIcon,
  Megaphone,
  MessageCircle,
  Pill,
  UserRound
} from "lucide-react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
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
  if (!hours.isOpen) return "Closed";
  return `Open until ${displayTime(hours.closeTime)}`;
}

function locationShortName(location: ManagedLocation) {
  return location.clinicName.replace("Veterinary Medical Center of ", "");
}

export default async function DashboardPage() {
  const [settings, activity, analytics] = await Promise.all([getDashboardSettings(), getActivityLog(4), getAnalyticsOverview()]);
  const fortThomas = settings.locations.find((location) => location.id === "fort-thomas") || settings.locations[0];
  const visibleLinks = [
    ["Patient Portal URL", settings.externalLinks.onlinePortalUrl],
    ["Online Pharmacy URL", settings.externalLinks.pharmacyUrl],
    ["Book Appointment URL", settings.externalLinks.bookAppointmentUrl],
    ["New Patient Form URL", settings.externalLinks.newPatientFormUrl]
  ];

  const cards = [
    {
      label: "Live Chat Status",
      value: settings.liveChat.liveChatEnabled ? "Enabled" : "Disabled",
      helper: settings.liveChat.liveChatEnabled ? "Chat is active on your site" : "Chat is hidden from visitors",
      icon: MessageCircle,
      state: settings.liveChat.liveChatEnabled ? "green" : "red"
    },
    {
      label: "Today’s Office Status",
      value: todayPreview(fortThomas),
      helper: settings.locations.map(locationShortName).join(" & "),
      icon: Clock3,
      state: "green"
    },
    { label: "Appointment Link", value: settings.externalLinks.bookAppointmentUrl ? "Healthy" : "Needs URL", helper: "All systems operational", icon: LinkIcon, state: settings.externalLinks.bookAppointmentUrl ? "green" : "red" },
    { label: "Patient Portal", value: settings.externalLinks.onlinePortalUrl ? "Connected" : "Missing", helper: "Portal is reachable", icon: UserRound, state: settings.externalLinks.onlinePortalUrl ? "green" : "red" },
    { label: "Pharmacy Link", value: settings.externalLinks.pharmacyUrl ? "Connected" : "Missing", helper: "External link active", icon: Pill, state: settings.externalLinks.pharmacyUrl ? "green" : "red" },
    { label: "Announcement Banner", value: settings.announcement.announcementEnabled ? "On" : "Off", helper: settings.announcement.announcementEnabled ? "Banner is visible" : "Banner is not visible", icon: Megaphone, state: settings.announcement.announcementEnabled ? "green" : "red" }
  ];

  return (
    <>
      <section className="dashboard-status-grid" aria-label="Website status overview">
        {cards.map(({ label, value, helper, icon: Icon, state }) => (
          <article className={`dashboard-status-card is-${state}`} key={label}>
            <span className="dashboard-status-icon"><Icon aria-hidden="true" size={24} /></span>
            <div>
              <p>{label}</p>
              <strong>{value}</strong>
              <small>{helper}</small>
            </div>
          </article>
        ))}
      </section>

      <div className="dashboard-mockup-grid">
        <QuickControls initialControls={settings.quickControls} />

        <section className="dashboard-card dashboard-important-links-card">
          <div className="dashboard-card-head compact">
            <h2>Important Links</h2>
            <Link className="dashboard-test-link" href="/dashboard/links/">Edit All</Link>
          </div>
          <div className="dashboard-overview-links">
            {visibleLinks.map(([label, href]) => (
              <div className="dashboard-overview-link-row" key={label}>
                <span><LinkIcon aria-hidden="true" size={17} /></span>
                <strong>{label}</strong>
                <code>{href || "Not configured"}</code>
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
            <h2>Office Hours</h2>
            <Link className="dashboard-test-link" href="/dashboard/location-hours/">Edit Hours</Link>
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

        <AnalyticsOverview analytics={analytics} compact />

        <section className="dashboard-card dashboard-activity-card">
          <div className="dashboard-card-head compact">
            <h2>Recent Admin Activity</h2>
          </div>
          {activity.length ? (
            <div className="dashboard-table-wrap">
              <table className="dashboard-table compact">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.userEmail}</td>
                      <td>{entry.action}</td>
                      <td>{entry.details}</td>
                      <td>{new Date(entry.createdAt).toLocaleString()}</td>
                      <td><span className="dashboard-badge is-active">{entry.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="dashboard-muted">No dashboard activity has been recorded yet.</p>
          )}
          <Link className="dashboard-view-all" href="/dashboard/activity/">View all activity log <ExternalLink aria-hidden="true" size={14} /></Link>
        </section>

        <section className="dashboard-card dashboard-preview-site-card">
          <div className="dashboard-card-head compact">
            <h2>Public Site Preview</h2>
            <Link className="dashboard-test-link" href="/" target="_blank">Open Site</Link>
          </div>
          <div className="dashboard-site-preview">
            <Image src="/images/northern-kentucky-vet-hero.jpg" alt="Public website preview" width={760} height={420} />
            <div>
              <strong>Northern Kentucky vet for dogs and cats</strong>
              <span><CheckCircle2 aria-hidden="true" size={14} /> Live on nky.vet</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
