"use client";

import { useState, useTransition } from "react";
import { saveSeoSettings } from "@/lib/dashboard-actions";
import type { SeoSettings } from "@/lib/settings/types";
import { StatusMessage } from "./StatusMessage";

export function SeoSettingsForm({ initialSettings }: { initialSettings: SeoSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [socialLinks, setSocialLinks] = useState(initialSettings.sameAsSocialLinks.join("\n"));
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const result = await saveSeoSettings({
        ...settings,
        sameAsSocialLinks: socialLinks
          .split("\n")
          .map((link) => link.trim())
          .filter(Boolean)
      });
      setStatus(result);
    });
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card-head">
        <div>
          <p className="dashboard-eyebrow">SEO Settings</p>
          <h2>Sitewide fallback metadata</h2>
        </div>
      </div>
      <p className="dashboard-muted">These values are used as safe fallbacks. Existing page-level SEO remains the primary source when a page defines its own metadata.</p>
      <label className="dashboard-field">
        <span>Default SEO title</span>
        <input value={settings.defaultSeoTitle} onChange={(event) => setSettings((current) => ({ ...current, defaultSeoTitle: event.target.value }))} />
      </label>
      <label className="dashboard-field">
        <span>Default meta description</span>
        <textarea value={settings.defaultMetaDescription} onChange={(event) => setSettings((current) => ({ ...current, defaultMetaDescription: event.target.value }))} />
      </label>
      <div className="dashboard-form-grid">
        <label className="dashboard-field">
          <span>Default Open Graph image URL</span>
          <input value={settings.defaultOpenGraphImageUrl} onChange={(event) => setSettings((current) => ({ ...current, defaultOpenGraphImageUrl: event.target.value }))} />
        </label>
        <label className="dashboard-field">
          <span>LocalBusiness schema phone</span>
          <input value={settings.localBusinessSchemaPhone} onChange={(event) => setSettings((current) => ({ ...current, localBusinessSchemaPhone: event.target.value }))} />
        </label>
      </div>
      <label className="dashboard-field">
        <span>LocalBusiness schema address</span>
        <input value={settings.localBusinessSchemaAddress} onChange={(event) => setSettings((current) => ({ ...current, localBusinessSchemaAddress: event.target.value }))} />
      </label>
      <label className="dashboard-field">
        <span>SameAs social links</span>
        <textarea value={socialLinks} onChange={(event) => setSocialLinks(event.target.value)} placeholder="One URL per line" />
      </label>
      <div className="dashboard-form-grid">
        <label className="dashboard-field">
          <span>Sitewide CTA label</span>
          <input value={settings.sitewideCtaLabel} onChange={(event) => setSettings((current) => ({ ...current, sitewideCtaLabel: event.target.value }))} />
        </label>
        <label className="dashboard-field">
          <span>Sitewide CTA URL</span>
          <input value={settings.sitewideCtaUrl} onChange={(event) => setSettings((current) => ({ ...current, sitewideCtaUrl: event.target.value }))} />
        </label>
      </div>
      <div className="dashboard-actions">
        <button className="dashboard-primary-button" type="button" disabled={isPending} onClick={save}>
          {isPending ? "Saving..." : "Save SEO settings"}
        </button>
        <StatusMessage {...status} />
      </div>
    </section>
  );
}
