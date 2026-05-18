"use client";

import { useState, useTransition } from "react";
import { Bell } from "lucide-react";
import { ShadButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { saveAnnouncementSettings } from "@/lib/dashboard-actions";
import type { AnnouncementSettings } from "@/lib/settings/types";
import { StatusMessage } from "./StatusMessage";

export function AnnouncementForm({ initialSettings }: { initialSettings: AnnouncementSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const result = await saveAnnouncementSettings(settings);
      setStatus(result);
    });
  };

  return (
    <div className="dashboard-two-column">
      <section className="dashboard-card">
        <div className="dashboard-card-head">
          <div>
            <p className="dashboard-eyebrow">Announcement</p>
            <h2>Homepage and sitewide banner</h2>
          </div>
          <span className={settings.announcementEnabled ? "dashboard-badge is-active" : "dashboard-badge"}>
            {settings.announcementEnabled ? "Enabled" : "Hidden"}
          </span>
        </div>
        <label className="dashboard-switch-row">
          <span>
            <strong>Show announcement banner</strong>
            <small>Use this for closures, holiday hours, weather notices, or clinic updates.</small>
          </span>
          <Switch
            checked={settings.announcementEnabled}
            aria-label="Show announcement banner"
            onCheckedChange={(checked) => setSettings((current) => ({ ...current, announcementEnabled: checked }))}
          />
        </label>
        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>Banner type</span>
            <Select
              value={settings.announcementType}
              onValueChange={(value) => setSettings((current) => ({ ...current, announcementType: value as AnnouncementSettings["announcementType"] }))}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
                <SelectItem value="weather">Weather</SelectItem>
                <SelectItem value="closure">Closure</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <label className="dashboard-field">
            <span>Title</span>
            <Input value={settings.announcementTitle} onChange={(event) => setSettings((current) => ({ ...current, announcementTitle: event.target.value }))} />
          </label>
        </div>
        <label className="dashboard-field">
          <span>Message</span>
          <Textarea value={settings.announcementMessage} onChange={(event) => setSettings((current) => ({ ...current, announcementMessage: event.target.value }))} />
        </label>
        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>Link text</span>
            <Input value={settings.announcementLinkText} onChange={(event) => setSettings((current) => ({ ...current, announcementLinkText: event.target.value }))} />
          </label>
          <label className="dashboard-field">
            <span>Link URL</span>
            <Input value={settings.announcementLinkUrl} onChange={(event) => setSettings((current) => ({ ...current, announcementLinkUrl: event.target.value }))} />
          </label>
        </div>
        <div className="dashboard-actions">
          <ShadButton type="button" disabled={isPending} onClick={save}>
            {isPending ? "Saving..." : "Save announcement"}
          </ShadButton>
          <StatusMessage {...status} />
        </div>
      </section>

      <aside className={`announcement-banner announcement-${settings.announcementType} dashboard-announcement-preview`}>
        <Bell aria-hidden="true" size={20} />
        <div>
          <strong>{settings.announcementTitle || "Announcement title"}</strong>
          <p>{settings.announcementMessage || "Announcement message preview for public visitors."}</p>
          {settings.announcementLinkText && <span>{settings.announcementLinkText}</span>}
        </div>
      </aside>
    </div>
  );
}
