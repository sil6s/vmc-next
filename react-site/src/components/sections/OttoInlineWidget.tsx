"use client";

import { useEffect, useRef, useState } from "react";

type OttoWidget = {
  initialize?: (clinicId: string, options?: Record<string, unknown>) => void;
  destroy?: () => void;
};

export function OttoInlineWidget({ clinicId, clinicName }: { clinicId: string; clinicName?: string }) {
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    const ottoWindow = window as Window & {
      televet?: { id?: string };
      otto?: { id?: string; widget?: OttoWidget };
    };

    initialized.current = false;
    ottoWindow.televet = { ...(ottoWindow.televet || {}), id: clinicId };
    ottoWindow.otto = { ...(ottoWindow.otto || {}), id: clinicId };

    if (!document.querySelector('script[src="https://connect.televet.com/shim.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.televet.com/shim.js";
      document.head.appendChild(script);
    }

    const interval = window.setInterval(() => {
      if (ottoWindow.otto?.widget && !initialized.current) {
        initialized.current = true;
        window.clearInterval(interval);
        ottoWindow.otto.widget.destroy?.();
        ottoWindow.otto.widget.initialize?.(clinicId, { showPreview: true });
        setIsReady(true);
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [clinicId]);

  return (
    <div
      id="otto-widget-iframe-container"
      className={`otto-inline-widget-wrapper${isReady ? " is-ready" : ""}`}
      aria-label={`Connect with ${clinicName || "our team"} online`}
      style={{
        width: "100%",
        minHeight: "560px",
        height: "clamp(560px, 76vh, 920px)",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        resize: "vertical",
        overflow: "hidden"
      }}
    />
  );
}
