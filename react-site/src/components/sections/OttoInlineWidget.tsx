"use client";

import { useEffect, useRef, useState } from "react";

type OttoWidget = {
  initialize?: (clinicId: string, options?: { selectRequestType?: string; isOpen?: boolean }) => void;
  destroy?: () => void;
  selectRequestType?: (requestType: string) => void;
};

type OttoWindow = Window & {
  televet?: { id?: string };
  otto?: { widget?: OttoWidget };
};

const SHIM_URL = "https://connect.televet.com/shim.js";

function loadOttoScript() {
  // Always remove any existing shim so re-mounting forces a clean Otto init.
  document.querySelector(`script[src="${SHIM_URL}"]`)?.remove();
  const script = document.createElement("script");
  script.async = true;
  script.src = SHIM_URL;
  document.body.appendChild(script);
}

export function OttoInlineWidget({
  clinicId,
  clinicName,
  requestType
}: {
  clinicId: string;
  clinicName?: string;
  requestType?: string;
}) {
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    initialized.current = false;
    setLoading(true);

    const w = window as OttoWindow;

    // Tear down any previous instance first
    try { w.otto?.widget?.destroy?.(); } catch { /* ignore */ }

    // Wipe Otto's global so the re-added shim.js boots from scratch.
    // Otto guards its own init with something like "if (window.otto) return" —
    // without this, re-adding the script tag on tab switch is a no-op and the
    // widget never comes back after SPA navigation.
    try { delete (w as unknown as Record<string, unknown>).otto; } catch { /* ignore */ }

    // Set clinic ID before the script runs
    w.televet = { id: clinicId };

    // Force a fresh script execution so Otto re-detects #otto-widget-iframe-container
    loadOttoScript();

    // Poll until the widget API is ready
    let attempts = 0;
    const interval = window.setInterval(() => {
      const widget = w.otto?.widget;
      if (widget && !initialized.current) {
        initialized.current = true;
        // initialize() pre-selects before the widget renders (no general-menu flash).
        // selectRequestType() is also called as a backstop in case initialize() fired
        // too late and the widget already rendered with the general menu.
        if (widget.initialize) {
          widget.initialize(clinicId, requestType ? { selectRequestType: requestType } : undefined);
        }
        if (requestType) {
          widget.selectRequestType?.(requestType);
        }
        setLoading(false);
        window.clearInterval(interval);
        return;
      }
      if (++attempts > 60) {
        setLoading(false);
        window.clearInterval(interval);
      }
    }, 400);

    return () => {
      window.clearInterval(interval);
      try { w.otto?.widget?.destroy?.(); } catch { /* ignore */ }
    };
  }, [clinicId, requestType]);

  return (
    <div className="otto-widget-frame">
      <div
        id="otto-widget-iframe-container"
        aria-label={`Connect with ${clinicName || "our team"} online`}
      />
      {loading && (
        <div className="otto-loading-overlay" aria-hidden="true">
          <span className="otto-loading-spinner" />
          <span className="otto-loading-text">Connecting to help center…</span>
        </div>
      )}
    </div>
  );
}
