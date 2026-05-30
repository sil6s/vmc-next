"use client";

import Script from "next/script";

const CLINIC_ID = process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID || "cmom0koio0xsd65010qy8yam0";

export function OttoInlineWidget() {
  return (
    <div className="otto-inline-widget-wrapper">
      <div id="otto-inline-widget" />
      <Script
        id="otto-flow-independence"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (id, win, doc) {
              win.televet = win.televet || { id };
              win.otto = win.otto || { id };
              var o = doc.createElement('script');
              o.async = true;
              o.src = 'https://connect.televet.com/shim.js';
              var r = doc.getElementsByTagName('script')[0];
              r.parentNode.insertBefore(o, r);
            })('${CLINIC_ID}', window, document);
          `
        }}
      />
    </div>
  );
}
