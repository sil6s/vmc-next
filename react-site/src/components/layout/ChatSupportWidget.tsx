"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { PublicLocation } from "@/lib/settings/public";

type LocationKey = "fortThomas" | "independence";
type RequestType = "TalkToStaff" | "RequestAppointment";

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
const TOOLTIP_DISMISSED_KEY = "vmc_chat_tooltip_dismissed";
const PANEL_ID = "vmc-chat-support-panel";

const OTTO_CLINICS: Record<LocationKey, string> = {
  fortThomas: process.env.NEXT_PUBLIC_OTTO_FORT_THOMAS_CLINIC_ID || "REPLACE_WITH_FORT_THOMAS_CLINIC_ID",
  independence: process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID || "REPLACE_WITH_INDEPENDENCE_CLINIC_ID"
};

const fallbackLocations = {
  fortThomas: {
    name: "Fort Thomas",
    description: "For clients visiting our Fort Thomas location.",
    phone: "(859) 442-4420",
    tel: "+18594424420",
    email: "information@nky.vet"
  },
  independence: {
    name: "Independence",
    description: "For clients visiting our Independence location.",
    phone: "(859) 356-2242",
    tel: "+18593562242",
    email: "information@nky.vet"
  }
} satisfies Record<LocationKey, { name: string; description: string; phone: string; tel: string; email: string }>;

function isLocationKey(value: string | null): value is LocationKey {
  return value === "fortThomas" || value === "independence";
}

export function ChatSupportWidget({
  locations,
  appointmentHref = "/contact/"
}: {
  locations?: PublicLocation[];
  appointmentHref?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationKey | null>(null);
  const [isOttoReady, setIsOttoReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    setTooltipDismissed(window.sessionStorage.getItem(TOOLTIP_DISMISSED_KEY) === "true");

    const savedLocation = window.localStorage.getItem(SELECTED_LOCATION_KEY);
    if (isLocationKey(savedLocation)) {
      setSelectedLocation(savedLocation);
    }

    const checkOtto = () => setIsOttoReady(Boolean(window.otto?.widget));
    checkOtto();
    const interval = window.setInterval(checkOtto, 1400);
    return () => window.clearInterval(interval);
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

  const dismissTooltip = useCallback(() => {
    setTooltipVisible(false);
    setTooltipDismissed(true);
    window.sessionStorage.setItem(TOOLTIP_DISMISSED_KEY, "true");
  }, []);

  useEffect(() => {
    if (expanded || tooltipDismissed || isFooterVisible) return;

    const showTimer = window.setTimeout(() => setTooltipVisible(true), 5000);
    const hideTimer = window.setTimeout(dismissTooltip, 12500);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [dismissTooltip, expanded, isFooterVisible, tooltipDismissed]);

  useEffect(() => {
    if (!isFooterVisible) return;
    setTooltipVisible(false);
  }, [isFooterVisible]);

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

  const openPanel = () => {
    dismissTooltip();
    setStatusMessage("");
    setExpanded(true);
  };

  const closePanel = () => {
    setExpanded(false);
    buttonRef.current?.focus();
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
    try {
      window.otto.widget.destroy?.();
      window.otto.widget.initialize?.(clinicId, {
        isOpen: true,
        showPreview: false,
        selectRequestType: requestType
      });
      window.otto.widget.selectRequestType?.(requestType);
      window.otto.widget.open?.();
      setStatusMessage(`Opening ${location.name} live chat.`);
      setExpanded(false);
    } catch (error) {
      console.error("Failed to open Otto widget", error);
      setStatusMessage("Live chat could not open. Please call your location or use the contact form.");
    } finally {
      setIsOpening(false);
    }
  };

  const requestAppointment = () => {
    trackEvent("book_appointment_click", { source: "chat_support_widget" });
  };

  return (
    <div className="chat-support-widget">
      {tooltipVisible && !expanded && (
        <div className="chat-support-tooltip" role="status">
          <button type="button" aria-label="Dismiss chat support tip" onClick={dismissTooltip}>
            <X aria-hidden="true" size={13} />
          </button>
          Questions? Choose your location and we’ll point you to the right team.
        </div>
      )}

      {expanded && (
        <div
          aria-describedby="vmc-chat-support-description"
          aria-labelledby="vmc-chat-support-title"
          className="chat-support-panel"
          id={PANEL_ID}
          ref={panelRef}
          role="dialog"
        >
          <div className="chat-support-panel-head">
            <span>
              <MessageCircle aria-hidden="true" size={18} />
            </span>
            <div>
              <h2 id="vmc-chat-support-title">How can we help?</h2>
              <p id="vmc-chat-support-description">Choose a location or request help from our team.</p>
            </div>
            <button className="chat-support-close" type="button" aria-label="Close chat support panel" onClick={closePanel}>
              <X aria-hidden="true" size={18} />
            </button>
          </div>

          <div className="chat-support-options" aria-label="Chat support options">
            {(Object.keys(locationMap) as LocationKey[]).map((locationKey) => {
              const location = locationMap[locationKey];
              const isSelected = selectedLocation === locationKey;
              return (
                <article className={isSelected ? "is-selected" : undefined} key={locationKey}>
                  <MapPin aria-hidden="true" size={18} />
                  <div>
                    <strong>{location.name}</strong>
                    <small>{location.description}</small>
                  </div>
                  {isOttoReady ? (
                    <button type="button" disabled={isOpening} onClick={() => openOttoForLocation(locationKey)}>
                      Start live chat
                    </button>
                  ) : (
                    <a href={`tel:${location.tel}`}>
                      <Phone aria-hidden="true" size={14} />
                      Call
                    </a>
                  )}
                </article>
              );
            })}
          </div>

          <div className="chat-support-actions">
            <a href={appointmentHref} onClick={requestAppointment}>
              <CalendarDays aria-hidden="true" size={17} />
              Request an appointment
            </a>
            <a href="/contact/#message-form" onClick={() => trackEvent("contact_form_started", { source: "chat_support_widget" })}>
              <Mail aria-hidden="true" size={17} />
              Message our team
            </a>
          </div>

          <p className={isOttoReady ? "chat-support-availability is-ready" : "chat-support-availability"} aria-live="polite">
            {isOttoReady ? "Live chat is available." : "Live chat is unavailable locally. Phone and contact options are ready."}
          </p>
          {statusMessage && <p className="chat-support-status" role="status">{statusMessage}</p>}
        </div>
      )}

      <button
        aria-controls={PANEL_ID}
        aria-expanded={expanded}
        aria-label={expanded ? "Close chat support panel" : "Open chat support panel"}
        className="chat-support-button"
        ref={buttonRef}
        type="button"
        onClick={expanded ? closePanel : openPanel}
      >
        <MessageCircle aria-hidden="true" size={25} strokeWidth={2.4} />
        <span>
          <strong>Chat Support</strong>
          <small>Need help?</small>
        </span>
      </button>
    </div>
  );
}
