"use client";

import { useEffect, useId, useRef, useState } from "react";

type RecaptchaFieldProps = {
  value: string;
  onChange: (token: string) => void;
  resetSignal?: number;
};

type Grecaptcha = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __vmcRecaptchaReady?: () => void;
  }
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const SCRIPT_ID = "google-recaptcha-script";

function loadRecaptchaScript(onReady: () => void) {
  if (!siteKey) return;
  if (window.grecaptcha) {
    onReady();
    return;
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  const previousReady = window.__vmcRecaptchaReady;
  window.__vmcRecaptchaReady = () => {
    previousReady?.();
    onReady();
  };

  if (existing) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = "https://www.google.com/recaptcha/api.js?onload=__vmcRecaptchaReady&render=explicit";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export function RecaptchaField({ value, onChange, resetSignal = 0 }: RecaptchaFieldProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!siteKey) return;
    loadRecaptchaScript(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready || !siteKey || !window.grecaptcha || !containerRef.current || widgetIdRef.current !== null) return;

    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        setError("");
        onChangeRef.current(token);
      },
      "expired-callback": () => {
        onChangeRef.current("");
        setError("Please complete the spam check again.");
      },
      "error-callback": () => {
        onChangeRef.current("");
        setError("Spam protection did not load correctly. Please refresh and try again.");
      }
    });
  }, [ready]);

  useEffect(() => {
    if (!ready || !window.grecaptcha || widgetIdRef.current === null) return;
    window.grecaptcha.reset(widgetIdRef.current);
    onChangeRef.current("");
    setError("");
  }, [ready, resetSignal]);

  if (!siteKey) {
    return process.env.NODE_ENV === "production" ? null : (
      <div className="recaptcha-field" role="note">
        Spam protection is disabled in this local environment.
      </div>
    );
  }

  return (
    <div className="recaptcha-field">
      <div id={id} ref={containerRef} />
      {!value && <span className="recaptcha-helper">Complete the spam check before submitting.</span>}
      {error && <span className="recaptcha-error" role="alert">{error}</span>}
    </div>
  );
}
