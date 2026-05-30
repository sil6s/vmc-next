"use client";

import { useEffect, useRef, useState } from "react";

export function OttoInlineWidget({ clinicId }: { clinicId: string }) {
  const [isReady, setIsReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    initialized.current = false;
    setIsReady(false);

    const interval = window.setInterval(() => {
      if (window.otto?.widget && !initialized.current) {
        initialized.current = true;
        window.clearInterval(interval);
        window.otto.widget.initialize?.(clinicId, { showPreview: true });
        setIsReady(true);
      }
    }, 500);

    return () => window.clearInterval(interval);
  }, [clinicId]);

  return (
    <div
      id="otto-inline-widget"
      className={`otto-inline-widget-wrapper${isReady ? " is-ready" : ""}`}
      aria-label="Connect with our team online"
    />
  );
}
