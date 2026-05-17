"use client";

export type UmamiEventName =
  | "book_appointment_click"
  | "patient_portal_click"
  | "online_pharmacy_click"
  | "live_chat_opened"
  | "contact_form_started"
  | "contact_form_submitted"
  | "new_patient_form_click"
  | "existing_client_form_click"
  | "google_reviews_click";

type UmamiWindow = Window & {
  umami?: {
    track?: (eventName: string, eventData?: Record<string, unknown>) => void;
  };
};

export function trackEvent(eventName: UmamiEventName, eventData?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const tracker = (window as UmamiWindow).umami;
  tracker?.track?.(eventName, eventData);
}

export function eventForLink(href: string, label = ""): UmamiEventName | null {
  const normalized = `${href} ${label}`.toLowerCase();

  if (normalized.includes("portal") || normalized.includes("ezyvet")) return "patient_portal_click";
  if (normalized.includes("pharmacy") || normalized.includes("ourvet")) return "online_pharmacy_click";
  if (normalized.includes("appointment") || normalized.includes("contact")) return "book_appointment_click";
  if (normalized.includes("new-patient") || normalized.includes("new patient")) return "new_patient_form_click";
  if (normalized.includes("existing-client") || normalized.includes("existing client")) return "existing_client_form_click";
  if (normalized.includes("review") || normalized.includes("google")) return "google_reviews_click";

  return null;
}
