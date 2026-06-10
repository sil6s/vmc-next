"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2, FileText, MessageCircle, Pill, Video, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { PublicLocation } from "@/lib/settings/public";

type LocationKey = "fortThomas" | "independence";
type RequestType = "TalkToStaff" | "RequestAppointment" | "RequestRxRefill" | "RequestMedicalRecords" | "RequestVirtualConsult";

type OttoWidget = {
  initialize?: (clinicId: string, options?: Record<string, unknown>) => void;
  open?: () => void;
  destroy?: () => void;
  selectRequestType?: (requestType: RequestType) => void;
};

declare global {
  interface Window {
    otto?: {
      widget?: OttoWidget;
    };
  }
}

const SELECTED_LOCATION_KEY = "vmc_chat_selected_location";
const PANEL_ID = "vmc-chat-support-panel";

const OTTO_CLINICS: Record<LocationKey, string> = {
  fortThomas: process.env.NEXT_PUBLIC_OTTO_FORT_THOMAS_CLINIC_ID || "cmom0dckc0sgp6501aorlulzf",
  independence: process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID || "cmom0koio0xsd65010qy8yam0"
};

const fallbackLocations = {
  fortThomas: {
    name: "Fort Thomas",
    description: "For Memorial Parkway appointments, refills, records, and care-team messages.",
    phone: "(859) 442-4420",
    tel: "+18594424420",
    email: "information@nky.vet"
  },
  independence: {
    name: "Independence",
    description: "For Madison Pike appointments, refills, records, and care-team messages.",
    phone: "(859) 356-2242",
    tel: "+18593562242",
    email: "information@nky.vet"
  }
} satisfies Record<LocationKey, { name: string; description: string; phone: string; tel: string; email: string }>;

const helpActions = [
  {
    label: "Book an appointment",
    description: "Find a time that works for you",
    requestType: "RequestAppointment",
    icon: CalendarDays
  },
  {
    label: "Request med & food refill",
    description: "Prescriptions and diet food refills",
    requestType: "RequestRxRefill",
    icon: Pill
  },
  {
    label: "Request medical records",
    description: "Get copies for you or another provider",
    requestType: "RequestMedicalRecords",
    icon: FileText
  },
  {
    label: "Request virtual consult",
    description: "Video visit with our care team",
    requestType: "RequestVirtualConsult",
    icon: Video
  }
] satisfies { label: string; description: string; requestType: RequestType; icon: typeof CalendarDays }[];

function isLocationKey(value: string | null): value is LocationKey {
  return value === "fortThomas" || value === "independence";
}

export function ChatSupportWidget({
  locations
}: {
  locations?: PublicLocation[];
  appointmentHref?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationKey | null>(() => {
    if (typeof window === "undefined") return null;
    const savedLocation = window.localStorage.getItem(SELECTED_LOCATION_KEY);
    return isLocationKey(savedLocation) ? savedLocation : null;
  });
  const [isOttoReady, setIsOttoReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [helpLocation, setHelpLocation] = useState<LocationKey>("fortThomas");
  const [isMobilePanel, setIsMobilePanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const ottoObserverRef = useRef<MutationObserver | null>(null);

  const locationMap = useMemo(() => {
    const fortThomas = locations?.find((location) => location.id === "fort-thomas");
    const independence = locations?.find((location) => location.id === "independence");

    return {
      fortThomas: {
        ...fallbackLocations.fortThomas,
        phone: fortThomas?.phone || fallbackLocations.fortThomas.phone,
        tel: fortThomas?.tel || fallbackLocations.fortThomas.tel,
        email: fortThomas?.email || fallbackLocations.fortThomas.email
      },
      independence: {
        ...fallbackLocations.independence,
        phone: independence?.phone || fallbackLocations.independence.phone,
        tel: independence?.tel || fallbackLocations.independence.tel,
        email: independence?.email || fallbackLocations.independence.email
      }
    };
  }, [locations]);

  useEffect(() => {
    const checkOtto = () => {
      if (window.otto?.widget) {
        setIsOttoReady(true);
        window.clearInterval(interval);
      }
    };
    const interval = window.setInterval(checkOtto, 400);
    checkOtto();
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const updateMobilePanel = () => setIsMobilePanel(mediaQuery.matches);
    updateMobilePanel();
    mediaQuery.addEventListener("change", updateMobilePanel);
    return () => mediaQuery.removeEventListener("change", updateMobilePanel);
  }, []);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(Boolean(entry?.isIntersecting)), {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.05
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTarget = panelRef.current?.querySelector<HTMLElement>("button, a");
    focusTarget?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [expanded]);

  const openPanel = useCallback(() => {
    setStatusMessage("");
    setHelpLocation((prev) => {
      const saved = typeof window !== "undefined" ? window.localStorage.getItem(SELECTED_LOCATION_KEY) : null;
      return isLocationKey(saved) ? saved : prev;
    });
    setExpanded(true);
  }, []);

  useEffect(() => {
    window.addEventListener("vmc:open-chat-support", openPanel);
    return () => window.removeEventListener("vmc:open-chat-support", openPanel);
  }, [openPanel]);

  useEffect(() => () => ottoObserverRef.current?.disconnect(), []);

  const closePanel = () => {
    setExpanded(false);
    buttonRef.current?.focus();
  };

  const chooseLocation = (locationKey: LocationKey) => {
    setSelectedLocation(locationKey);
    setHelpLocation(locationKey);
    setStatusMessage("");
    window.localStorage.setItem(SELECTED_LOCATION_KEY, locationKey);
    trackEvent("live_chat_opened", { location: locationKey, step: "location_selected" });
  };

  const openOttoForLocation = (locationKey: LocationKey, requestType: RequestType = "TalkToStaff") => {
    const location = locationMap[locationKey];
    const clinicId = OTTO_CLINICS[locationKey];
    setSelectedLocation(locationKey);
    window.localStorage.setItem(SELECTED_LOCATION_KEY, locationKey);
    trackEvent("live_chat_opened", { location: locationKey, requestType });

    if (!window.otto?.widget) {
      setStatusMessage(`Live chat is not available yet. You can call ${location.name} or message our team below.`);
      return;
    }

    setIsOpening(true);
    setExpanded(false);

    const destroyOtto = () => {
      ottoObserverRef.current?.disconnect();
      ottoObserverRef.current = null;
      window.otto?.widget?.destroy?.();
    };

    try {
      destroyOtto();
      window.otto.widget.initialize?.(clinicId, {
        isOpen: true,
        showPreview: false,
        selectRequestType: requestType,
        onClose: destroyOtto,
        onMinimize: destroyOtto,
        onDismiss: destroyOtto
      });
      window.setTimeout(() => {
        window.otto?.widget?.selectRequestType?.(requestType);
        window.otto?.widget?.open?.();
        setIsOpening(false);

        // Fallback: if Otto doesn't fire onClose, watch for its launcher appearing
        // as a new body-level child after the chat is fully rendered.
        window.setTimeout(() => {
          const knownEls = new Set(Array.from(document.body.children));
          ottoObserverRef.current?.disconnect();
          const observer = new MutationObserver(() => {
            const hasNewEls = Array.from(document.body.children).some(el => !knownEls.has(el));
            if (hasNewEls) {
              destroyOtto();
            }
          });
          observer.observe(document.body, { childList: true });
          ottoObserverRef.current = observer;
        }, 1500);
      }, 700);
    } catch (error) {
      console.error("Failed to open chat widget", error);
      setExpanded(true);
      setHelpLocation(locationKey);
      setStatusMessage(`Chat could not open. You can call ${location.name} at ${location.phone}.`);
      setIsOpening(false);
    }
  };

  const widgetStyle: CSSProperties | undefined = expanded
    ? isMobilePanel
      ? {
          position: "fixed",
          inset: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          justifyItems: "stretch",
          alignItems: "stretch"
        }
      : { width: "min(400px, calc(100vw - 32px))" }
    : undefined;

  const panelStyle: CSSProperties = isMobilePanel
    ? {
        width: "100%",
        minHeight: "100dvh",
        maxHeight: "100dvh",
        borderRadius: 0,
        overflowY: "auto",
        padding: "16px 16px calc(16px + env(safe-area-inset-bottom, 0px))"
      }
    : {
        width: "100%",
        maxHeight: "min(880px, calc(100dvh - 80px))",
        overflowY: "auto"
      };

  return (
    <div className="chat-support-widget" style={widgetStyle}>
      {expanded && (
        <div
          aria-describedby="vmc-chat-support-description"
          aria-labelledby="vmc-chat-support-title"
          className="chat-support-panel"
          id={PANEL_ID}
          ref={panelRef}
          role="dialog"
          style={panelStyle}
        >
          <div className="chat-support-panel-head">
            <span>
              <MessageCircle aria-hidden="true" size={18} />
            </span>
            <div>
              <h2 id="vmc-chat-support-title">{locationMap[helpLocation].name} help center</h2>
              <p id="vmc-chat-support-description">Book appointments, request refills, or chat with our team.</p>
            </div>
            <button className="chat-support-close" type="button" aria-label="Close chat support panel" onClick={closePanel}>
              <X aria-hidden="true" size={18} />
            </button>
          </div>

          <div className="chat-support-help-menu">
            <div className="chat-support-location-toggle" aria-label="Switch clinic">
              {(Object.keys(locationMap) as LocationKey[]).map((locationKey) => {
                const location = locationMap[locationKey];
                const isSelected = helpLocation === locationKey;

                return (
                  <button
                    key={locationKey}
                    type="button"
                    className={isSelected ? "is-selected" : undefined}
                    disabled={isSelected}
                    onClick={() => chooseLocation(locationKey)}
                  >
                    {location.name}
                  </button>
                );
              })}
            </div>

            <div className="chat-support-action-list" aria-label={`${locationMap[helpLocation].name} help options`}>
              {helpActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.requestType}
                    type="button"
                    disabled={isOpening}
                    onClick={() => openOttoForLocation(helpLocation, action.requestType)}
                  >
                    <Icon aria-hidden="true" size={18} />
                    <span>
                      <strong>{action.label}</strong>
                      <small>{action.description}</small>
                    </span>
                    <ArrowRight aria-hidden="true" size={16} />
                  </button>
                );
              })}
            </div>

            <div className="chat-support-contact-card">
              <div>
                <strong>Need to talk to someone?</strong>
                <small>Message our team or call {locationMap[helpLocation].phone} for urgent concerns.</small>
              </div>
              <button type="button" disabled={isOpening} onClick={() => openOttoForLocation(helpLocation, "TalkToStaff")}>
                General inquiry
                <ArrowRight aria-hidden="true" size={15} />
              </button>
            </div>

            <p className={isOttoReady ? "chat-support-availability is-ready" : "chat-support-availability"} aria-live="polite">
              {isOttoReady ? (
                <><CheckCircle2 aria-hidden="true" size={14} />Help is available now</>
              ) : (
                "Loading… Phone options are ready if you need help now."
              )}
            </p>
            {statusMessage && <p className="chat-support-status" role="status">{statusMessage}</p>}
          </div>
        </div>
      )}

      {!expanded && !isFooterVisible && (
        <div className="chat-support-greeting" role="status">
          <span className="chat-support-greeting-avatar">
            <Image
              src="/images/kristi-baker-headshot-vertical.jpg"
              alt="Kristi Baker"
              width={36}
              height={36}
              className="chat-support-greeting-avatar-img"
            />
            <span className="chat-support-greeting-avatar-dot" aria-hidden="true" />
          </span>
          <span>
            <strong>Veterinary Medical Centers</strong>
            <small>Hi there! Need to book a visit, refill a prescription, or reach the care team? We&apos;re here to help.</small>
          </span>
        </div>
      )}

      {!expanded && (
        <button
          aria-controls={PANEL_ID}
          aria-expanded={expanded}
          aria-label="Open chat support panel"
          className="chat-support-button"
          ref={buttonRef}
          type="button"
          onClick={openPanel}
        >
          <MessageCircle aria-hidden="true" size={25} strokeWidth={2.4} />
          <span>
            <strong>Get help now</strong>
            <small>Book, refill, message, or get records.</small>
          </span>
        </button>
      )}
    </div>
  );
}
