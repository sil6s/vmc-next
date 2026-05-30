"use client";

import { useEffect, useRef } from "react";

type Turnstile = {
  render: (container: HTMLElement | string, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
    onTurnstileLoad?: () => void;
  }
}

const SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const SCRIPT_ID = "cf-turnstile-script";

let scriptLoaded = false;
let scriptCallbacks: Array<() => void> = [];

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (scriptLoaded && window.turnstile) return Promise.resolve();
  if (document.getElementById(SCRIPT_ID)) {
    return new Promise((resolve) => scriptCallbacks.push(resolve));
  }

  return new Promise((resolve) => {
    scriptCallbacks.push(resolve);
    window.onTurnstileLoad = () => {
      scriptLoaded = true;
      scriptCallbacks.forEach((cb) => cb());
      scriptCallbacks = [];
    };
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
}

export function TurnstileField({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>("");

  useEffect(() => {
    if (!SITEKEY || !containerRef.current) return;

    let removed = false;

    loadTurnstileScript().then(() => {
      if (removed || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITEKEY,
        theme: "light",
        callback: (token: string) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken("")
      });
    });

    return () => {
      removed = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = "";
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!SITEKEY) {
    return process.env.NODE_ENV === "production" ? null : (
      <div className="turnstile-field" role="note">
        Spam protection disabled in local environment.
      </div>
    );
  }

  return <div ref={containerRef} className="turnstile-field" />;
}
