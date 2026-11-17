"use client";

import { useEffect, useRef, useState } from "react";

type OttoInlineWidgetProps = {
  clinicId: string;
  clinicName?: string;
  requestType?: string;
};

type OttoWidget = {
  initialize: (clinicId: string, options?: { selectRequestType: string }) => void;
  destroy: () => void;
  selectRequestType: (requestType: string) => void;
};

type OttoWindow = Window & { otto?: { widget?: OttoWidget } };

const SHIM_URL = "https://connect.televet.com/shim.js";
let shimPromise: Promise<OttoWidget> | undefined;

function loadWidget() {
  const widget = (window as OttoWindow).otto?.widget;
  if (widget) return Promise.resolve(widget);
  if (!shimPromise) {
    shimPromise = new Promise<OttoWidget>((resolve, reject) => {
      const shim = document.createElement("script");
      shim.async = true;
      shim.src = SHIM_URL;
      shim.onload = () => {
        const api = (window as OttoWindow).otto?.widget;
        if (api) resolve(api);
        else reject(new Error("Otto did not initialize"));
      };
      shim.onerror = () => {
        shim.remove();
        reject(new Error("Unable to load Otto"));
      };
      document.body.appendChild(shim);
    }).catch((error) => {
      shimPromise = undefined;
      throw error;
    });
  }
  return shimPromise;
}

function WidgetSession({ clinicId, clinicName, requestType }: OttoInlineWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    let widget: OttoWidget | undefined;
    const container = containerRef.current;
    const finish = () => {
      if (active) {
        window.clearTimeout(timeout);
        setStatus("ready");
      }
    };
    // Otto announces readiness after its app initializes, not just after the iframe loads.
    const onMessage = (event: MessageEvent) => {
      const iframe = container?.querySelector("iframe");
      if (iframe && event.source === iframe.contentWindow && event.data?.event === "OTTO_WIDGET_INITIALIZED") {
        // The shim's iframe onload fires before Otto's app is ready to accept requests.
        if (requestType) widget?.selectRequestType(requestType);
        finish();
      }
    };
    window.addEventListener("message", onMessage);
    const timeout = window.setTimeout(() => {
      active = false;
      window.removeEventListener("message", onMessage);
      widget?.destroy();
      setStatus("error");
    }, 25_000);

    loadWidget().then((api) => {
      if (!active) return;
      widget = api;
      api.initialize(clinicId);
    }).catch(() => {
      if (!active) return;
      window.clearTimeout(timeout);
      setStatus("error");
    });

    return () => {
      active = false;
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timeout);
      widget?.destroy();
    };
  }, [clinicId, requestType]);

  return (
    <div className={`otto-widget-frame${status === "loading" ? " is-loading" : ""}`}>
      <div ref={containerRef} hidden={status === "error"} id="otto-widget-iframe-container" aria-label={`Connect with ${clinicName || "our team"} online`} aria-busy={status === "loading"} />
      {status === "loading" && (
        <div className="otto-loading-overlay" role="status">
          <span className="otto-loading-spinner" aria-hidden="true" />
          <span className="otto-loading-text">Connecting to help center…</span>
        </div>
      )}
      {status === "error" && (
        <div role="alert">
          <p>We couldn’t connect to online booking. Please try again or call the clinic using the contact options below.</p>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}
    </div>
  );
}

export function OttoInlineWidget(props: OttoInlineWidgetProps) {
  return <WidgetSession key={`${props.clinicId}:${props.requestType}`} {...props} />;
}
