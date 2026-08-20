import { OTTO_CLINIC_IDS } from "@/lib/otto";

export type OnlineHelpLocationSlug = "fort-thomas" | "independence";
export type OnlineHelpLocationKey = "fortThomas" | "independence";
export type OnlineHelpRequestSlug =
  | "direct-booking"
  | "refill"
  | "records"
  | "virtual-consult"
  | "general";
export type OnlineHelpRequestType =
  | "DirectBooking"
  | "RequestRxRefill"
  | "RequestMedicalRecords"
  | "RequestVirtualConsult"
  | "TalkToStaff";

export const onlineHelpLocations: Record<
  OnlineHelpLocationSlug,
  {
    slug: OnlineHelpLocationSlug;
    key: OnlineHelpLocationKey;
    locationSlug: string;
    clinicId: string;
    title: string;
    seoTitle: string;
    description: string;
    heroImage: string;
    heroImageAlt: string;
  }
> = {
  "fort-thomas": {
    slug: "fort-thomas",
    key: "fortThomas",
    locationSlug: "vet-in-fort-thomas-ky",
    clinicId: OTTO_CLINIC_IDS.fortThomas,
    title: "Fort Thomas Online Help",
    seoTitle: "Fort Thomas Online Help | Veterinary Medical Center",
    description:
      "Connect with Veterinary Medical Center of Fort Thomas for appointments, refills, records, virtual consultations, and non-urgent care-team messages.",
    heroImage: "/images/cat-closeup-hero.png",
    heroImageAlt: "Calm cat resting during a veterinary visit"
  },
  independence: {
    slug: "independence",
    key: "independence",
    locationSlug: "vet-in-independence-ky",
    clinicId: OTTO_CLINIC_IDS.independence,
    title: "Independence Online Help",
    seoTitle: "Independence Online Help | Veterinary Medical Center",
    description:
      "Connect with Veterinary Medical Center of Independence for appointments, refills, records, virtual consultations, and non-urgent care-team messages.",
    heroImage: "/images/blog/dog-exam.jpg",
    heroImageAlt: "Dog receiving a veterinary exam"
  }
};

export const onlineHelpRequests: Record<
  OnlineHelpRequestSlug,
  {
    slug: OnlineHelpRequestSlug;
    requestType: OnlineHelpRequestType;
    label: string;
    tabLabel: string;
    shortLabel: string;
    description: string;
    calloutTitle: string;
    calloutBody: string;
    disclaimer: string;
  }
> = {
  "direct-booking": {
    slug: "direct-booking",
    requestType: "DirectBooking",
    label: "Book an appointment",
    tabLabel: "Book appointment",
    shortLabel: "direct booking",
    description: "Book directly through Otto when online times are available.",
    calloutTitle: "Direct booking is handled by Otto, our scheduling partner",
    calloutBody:
      "If online times are available, Otto can help you book directly. For urgent or same-day needs, call the clinic.",
    disclaimer:
      "Otto is a third-party scheduling assistant. Direct booking availability may vary by clinic, appointment type, and schedule."
  },
  refill: {
    slug: "refill",
    requestType: "RequestRxRefill",
    label: "Request medication or food refill",
    tabLabel: "Medication or food refill",
    shortLabel: "refill requests",
    description: "Ask for prescription or diet food refill support.",
    calloutTitle: "Refill requests are handled by Otto, our scheduling partner",
    calloutBody:
      "If the assistant below doesn't load or can't help, use the contact options at the bottom of the page — our team can process refill requests directly.",
    disclaimer:
      "Otto is a third-party scheduling assistant. Refill requests submitted through Otto are reviewed by our staff and aren't confirmed until you receive a follow-up from Veterinary Medical Centers."
  },
  records: {
    slug: "records",
    requestType: "RequestMedicalRecords",
    label: "Request medical records",
    tabLabel: "Medical records",
    shortLabel: "medical records",
    description: "Request records for yourself or another provider.",
    calloutTitle: "Records requests are handled by Otto, our scheduling partner",
    calloutBody:
      "If the assistant below doesn't load or can't help, use the contact options at the bottom of the page — our team can retrieve records directly.",
    disclaimer:
      "Otto is a third-party scheduling assistant. Records requests submitted through Otto are reviewed by our staff and won't be fulfilled until our team confirms receipt and sends a follow-up."
  },
  "virtual-consult": {
    slug: "virtual-consult",
    requestType: "RequestVirtualConsult",
    label: "Request virtual consultation",
    tabLabel: "Virtual consultation",
    shortLabel: "virtual consultations",
    description: "Ask about a virtual care-team consultation.",
    calloutTitle: "Virtual consultation requests are handled by Otto, our scheduling partner",
    calloutBody:
      "If the assistant below doesn't load or can't help, call or email us using the contact options at the bottom of the page — our team can arrange a virtual visit directly.",
    disclaimer:
      "Otto is a third-party scheduling assistant. Virtual consultation requests submitted through Otto are reviewed by our staff and aren't confirmed until you receive a follow-up from Veterinary Medical Centers."
  },
  general: {
    slug: "general",
    requestType: "TalkToStaff",
    label: "General inquiry",
    tabLabel: "General inquiry",
    shortLabel: "general inquiries",
    description: "Message the clinic team with a non-urgent question.",
    calloutTitle: "Messages to our care team go through Otto, our scheduling partner",
    calloutBody:
      "If the assistant below doesn't load or can't help, use the contact options at the bottom of the page — our team responds to all inquiries directly.",
    disclaimer:
      "Otto is a third-party scheduling assistant. Messages submitted through Otto are reviewed by our care team and aren't confirmed until you receive a follow-up from Veterinary Medical Centers."
  }
};

export function onlineHelpPath(location: OnlineHelpLocationSlug, request: OnlineHelpRequestSlug = "general") {
  return `/online-help/${location}/${request}/`;
}

export function locationKeyToOnlineHelpSlug(locationKey: OnlineHelpLocationKey): OnlineHelpLocationSlug {
  return locationKey === "fortThomas" ? "fort-thomas" : "independence";
}
