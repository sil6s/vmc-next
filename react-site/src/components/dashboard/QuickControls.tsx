"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, CalendarDays, Megaphone, MessageCircle } from "lucide-react";
import { saveQuickControls } from "@/lib/dashboard-actions";
import type { QuickControls as QuickControlsType } from "@/lib/settings/types";
import { StatusMessage } from "./StatusMessage";

const rows: {
  key: keyof QuickControlsType;
  label: string;
  description: string;
  onLabel: string;
  offLabel: string;
  icon: typeof MessageCircle;
}[] = [
  { key: "liveChatEnabled", label: "Live Chat Widget", description: "Controls whether visitors can start a live chat.", onLabel: "Visible", offLabel: "Hidden", icon: MessageCircle },
  { key: "announcementEnabled", label: "Homepage Announcement", description: "Displays a homepage-wide message.", onLabel: "Visible", offLabel: "Hidden", icon: Megaphone },
  { key: "emergencyAlertMode", label: "Emergency Alert Banner", description: "Shows an emergency notice across the site.", onLabel: "On", offLabel: "Off", icon: AlertTriangle },
  { key: "websiteBookingButton", label: "Book Appointment Button", description: "Shows or hides booking CTAs.", onLabel: "Visible", offLabel: "Hidden", icon: CalendarDays }
];

export function QuickControls({ initialControls }: { initialControls: QuickControlsType }) {
  const [controls, setControls] = useState(initialControls);
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();

  const update = (key: keyof QuickControlsType, value: boolean) => {
    const next = { ...controls, [key]: value };
    setControls(next);
    startTransition(async () => {
      const result = await saveQuickControls(next);
      const label = rows.find((row) => row.key === key)?.label || "Setting";
      setStatus(result.ok ? { ok: true, message: `${label} is now ${value ? "visible" : "hidden"} for visitors.` } : result);
    });
  };

  return (
    <section className="dashboard-card dashboard-quick-controls">
      <div className="dashboard-card-head compact">
        <div>
          <h2>Quick Controls</h2>
        </div>
      </div>
      <div className="dashboard-control-list">
        {rows.map(({ key, label, description, onLabel, offLabel, icon: Icon }) => {
          const checked = controls[key];
          return (
            <label className="dashboard-control-row" key={key}>
              <span className="dashboard-control-icon">
                <Icon aria-hidden="true" size={20} />
              </span>
              <span className="dashboard-control-text">
                <strong>{label}</strong>
                <small>{description}</small>
              </span>
              <span className="dashboard-control-state">{checked ? onLabel : offLabel}</span>
              <input aria-label={label} checked={checked} type="checkbox" disabled={isPending} onChange={(event) => update(key, event.target.checked)} />
            </label>
          );
        })}
      </div>
      <StatusMessage {...status} />
    </section>
  );
}
