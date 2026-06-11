"use client";

import { useEffect, useRef } from "react";

type OttoWindow = Window & {
  televet?: { id?: string };
  otto?: {
    widget?: {
      destroy?: () => void;
      selectRequestType?: (requestType: string) => void;
    };
  };
};

export function OttoInlineWidget({
  clinicId,
  clinicName,
  requestType
}: {
  clinicId: string;
  clinicName?: string;
  requestType?: string;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    initialized.current = false;
    const w = window as OttoWindow;

    // Tear down any previous instance so it doesn't conflict with the new container
    try { w.otto?.widget?.destroy?.(); } catch { /* ignore */ }

    // Set clinic ID before the script runs — Otto reads this on init
    w.televet = { id: clinicId };

    // Inject script once. Otto detects #otto-widget-iframe-container and goes inline automatically.
    if (!document.querySelector('script[src="https://connect.televet.com/shim.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.televet.com/shim.js";
      document.body.appendChild(script);
    }

    // Once the widget API is ready, select the initial request type
    let attempts = 0;
    const interval = window.setInterval(() => {
      if (w.otto?.widget && !initialized.current) {
        initialized.current = true;
        if (requestType) w.otto.widget.selectRequestType?.(requestType);
        window.clearInterval(interval);
        return;
      }
      if (++attempts > 60) window.clearInterval(interval);
    }, 500);

    return () => {
      window.clearInterval(interval);
      try { w.otto?.widget?.destroy?.(); } catch { /* ignore */ }
    };
  }, [clinicId, requestType]);

  return (
    <div
      id="otto-widget-iframe-container"
      aria-label={`Connect with ${clinicName || "our team"} online`}
    />
  );
}
