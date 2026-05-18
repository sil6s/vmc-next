"use client";

import { useState, useTransition } from "react";
import { MessageCircle } from "lucide-react";
import { ShadButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { saveLiveChatSettings } from "@/lib/dashboard-actions";
import type { LiveChatSettings } from "@/lib/settings/types";
import { StatusMessage } from "./StatusMessage";

export function LiveChatForm({ initialSettings }: { initialSettings: LiveChatSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();
  const isEnabled = settings.liveChatEnabled;

  const save = () => {
    startTransition(async () => {
      const result = await saveLiveChatSettings(settings);
      setStatus(result);
    });
  };

  return (
    <div className="dashboard-two-column">
      <section className="dashboard-card">
        <div className="dashboard-card-head">
          <div>
            <p className="dashboard-eyebrow">Live Chat</p>
            <h2>Otto widget control</h2>
          </div>
          <span className={isEnabled ? "dashboard-badge is-active" : "dashboard-badge"}>{isEnabled ? "Active" : "Disabled"}</span>
        </div>
        <label className="dashboard-switch-row">
          <span>
            <strong>Show live chat on public website</strong>
            <small>Disabling live chat removes the floating widget from public pages.</small>
          </span>
          <Switch
            checked={settings.liveChatEnabled}
            aria-label="Show live chat on public website"
            onCheckedChange={(checked) =>
              setSettings((current) => ({
                ...current,
                liveChatEnabled: checked,
                liveChatStatusLabel: checked ? "Active" : "Disabled"
              }))
            }
          />
        </label>
        <label className="dashboard-field">
          <span>Provider</span>
          <Input readOnly value={settings.liveChatProvider} />
        </label>
        <label className="dashboard-field">
          <span>Placement</span>
          <Select
            value={settings.liveChatPlacement}
            onValueChange={(value) => setSettings((current) => ({ ...current, liveChatPlacement: value as LiveChatSettings["liveChatPlacement"] }))}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="floating">Floating</SelectItem>
              <SelectItem value="inline">Inline</SelectItem>
            </SelectContent>
          </Select>
        </label>
        <div className="dashboard-actions">
          <ShadButton type="button" disabled={isPending} onClick={save}>
            {isPending ? "Saving..." : "Save live chat"}
          </ShadButton>
          <StatusMessage {...status} />
        </div>
      </section>

      <aside className="dashboard-preview-card">
        <MessageCircle aria-hidden="true" size={28} />
        <p className="dashboard-eyebrow">Public site preview</p>
        <h3>{isEnabled ? "Chat support is visible." : "Chat support is hidden."}</h3>
        <p>
          {isEnabled
            ? "The Otto chat launcher will be available on public pages."
            : "The public layout will not render the chat launcher while this is disabled."}
        </p>
      </aside>
    </div>
  );
}
