"use client";

import { useEffect } from "react";

type RecaptchaFieldProps = {
  action: string;
};

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const SCRIPT_ID = "google-recaptcha-v3-script";

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript() {
  if (!siteKey || typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA script failed to load.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("reCAPTCHA script failed to load.")), { once: true });
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function executeRecaptcha(action: string) {
  if (!siteKey) return "";
  await loadRecaptchaScript();

  return new Promise<string>((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA is not ready."));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then(resolve)
        .catch(() => reject(new Error("reCAPTCHA could not create a token.")));
    });
  });
}

export function RecaptchaField({ action }: RecaptchaFieldProps) {
  useEffect(() => {
    void loadRecaptchaScript();
  }, []);

  if (!siteKey) {
    return process.env.NODE_ENV === "production" ? null : (
      <div className="recaptcha-field" role="note">
        Spam protection is disabled in this local environment.
      </div>
    );
  }

  return (
    <div className="recaptcha-field" data-recaptcha-action={action}>
      <span className="recaptcha-helper">
        This form is protected by reCAPTCHA and Google&apos;s Privacy Policy and Terms apply.
      </span>
    </div>
  );
}
