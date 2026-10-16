type OttoInlineWidgetProps = {
  clinicId: string;
  clinicName?: string;
  requestType?: string;
};

const SHIM_URL = "https://connect.televet.com/shim.js";

function toJsString(value: string | undefined) {
  return JSON.stringify(value || "").replace(/</g, "\\u003c");
}

/**
 * Otto is an external widget. Its loader intentionally uses a plain browser
 * script rather than a React effect so direct-booking works on localized routes
 * and on pages where React hydration is deferred.
 */
export function OttoInlineWidget({ clinicId, clinicName, requestType }: OttoInlineWidgetProps) {
  const script = `(() => {
    const clinicId = ${toJsString(clinicId)};
    const requestType = ${toJsString(requestType)};
    const start = () => {
      const container = document.querySelector("#otto-widget-iframe-container");
      if (!container || container.dataset.ottoLoaded === clinicId + requestType) return;
      container.dataset.ottoLoaded = clinicId + requestType;
      window.televet = { id: clinicId };
      const existing = document.querySelector('script[src="${SHIM_URL}"]');
      if (existing) existing.remove();
      const shim = document.createElement("script");
      shim.async = true;
      shim.src = "${SHIM_URL}";
      document.body.appendChild(shim);
      let attempts = 0;
      const waitForWidget = window.setInterval(() => {
        const widget = window.otto && window.otto.widget;
        if (widget) {
          if (widget.initialize) widget.initialize(clinicId, requestType ? { selectRequestType: requestType } : undefined);
          if (requestType && widget.selectRequestType) widget.selectRequestType(requestType);
          container.closest(".otto-widget-frame")?.classList.remove("is-loading");
          window.clearInterval(waitForWidget);
        } else if (++attempts > 60) {
          container.closest(".otto-widget-frame")?.classList.remove("is-loading");
          window.clearInterval(waitForWidget);
        }
      }, 400);
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
    else start();
  })();`;

  return (
    <div className="otto-widget-frame is-loading">
      <div id="otto-widget-iframe-container" aria-label={`Connect with ${clinicName || "our team"} online`} />
      <div className="otto-loading-overlay" aria-hidden="true">
        <span className="otto-loading-spinner" />
        <span className="otto-loading-text">Connecting to help center…</span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}
