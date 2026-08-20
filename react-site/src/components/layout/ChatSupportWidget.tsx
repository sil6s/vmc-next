"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { SVGProps } from "react";
import {
  locationKeyToOnlineHelpSlug,
  onlineHelpPath,
  onlineHelpRequests,
  type OnlineHelpRequestSlug
} from "@/lib/online-help";
import type { PublicLocation } from "@/lib/settings/public";

type LocationKey = "fortThomas" | "independence";
type IconComponent = (props: SVGProps<SVGSVGElement> & { size?: number }) => React.ReactElement;
type OpeningState = {
  location: LocationKey;
  request: OnlineHelpRequestSlug;
};

declare global {
  interface Window {
    umami?: {
      track?: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

const SELECTED_LOCATION_KEY = "vmc_chat_selected_location";
const PANEL_ID = "vmc-chat-support-panel";

function trackChatEvent(eventData?: Record<string, unknown>) {
  window.umami?.track?.("live_chat_opened", eventData);
}

function SvgIcon({ children, size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {children}
    </svg>
  );
}

const ArrowRightIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </SvgIcon>
);

const CalendarDaysIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M3 10h18" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </SvgIcon>
);

const FileTextIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </SvgIcon>
);

const LoaderIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="M21 12a9 9 0 1 1-6.2-8.56" />
  </SvgIcon>
);

const MessageCircleIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="M3 20.3 4.3 16A8.5 8.5 0 1 1 8 19.7Z" />
  </SvgIcon>
);

const PillIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="m10.5 20.5 10-10a4.2 4.2 0 0 0-6-6l-10 10a4.2 4.2 0 0 0 6 6Z" />
    <path d="m8.5 8.5 7 7" />
  </SvgIcon>
);

const VideoIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="m16 13 5 3V8l-5 3Z" />
    <rect height="12" rx="2" width="14" x="2" y="6" />
  </SvgIcon>
);

const XIcon: IconComponent = (props) => (
  <SvgIcon {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </SvgIcon>
);

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
    description: "Direct booking when times are available",
    request: "direct-booking",
    icon: CalendarDaysIcon
  },
  {
    label: "Request medication or food refill",
    description: "Prescriptions and diet food refills",
    request: "refill",
    icon: PillIcon
  },
  {
    label: "Request medical records",
    description: "Get copies for you or another provider",
    request: "records",
    icon: FileTextIcon
  },
  {
    label: "Request virtual consult",
    description: "Video visit with our care team",
    request: "virtual-consult",
    icon: VideoIcon
  },
  {
    label: "General inquiry",
    description: "General inquiry for our care team",
    request: "general",
    icon: MessageCircleIcon
  }
] satisfies { label: string; description: string; request: OnlineHelpRequestSlug; icon: IconComponent }[];

function isLocationKey(value: string | null): value is LocationKey {
  return value === "fortThomas" || value === "independence";
}

export function ChatSupportWidget({
  locations,
  hideLauncher = false
}: {
  locations?: PublicLocation[];
  appointmentHref?: string;
  hideLauncher?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [, setSelectedLocation] = useState<LocationKey | null>(() => {
    if (typeof window === "undefined") return null;
    const savedLocation = window.localStorage.getItem(SELECTED_LOCATION_KEY);
    return isLocationKey(savedLocation) ? savedLocation : null;
  });
  const [isOpening, setIsOpening] = useState(false);
  const [openingState, setOpeningState] = useState<OpeningState | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [helpLocation, setHelpLocation] = useState<LocationKey>("fortThomas");
  const [isMobilePanel, setIsMobilePanel] = useState(false);
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

  const closePanel = () => {
    setExpanded(false);
    buttonRef.current?.focus();
  };

  const chooseLocation = (locationKey: LocationKey) => {
    setSelectedLocation(locationKey);
    setHelpLocation(locationKey);
    setStatusMessage("");
    window.localStorage.setItem(SELECTED_LOCATION_KEY, locationKey);
    trackChatEvent({ location: locationKey, step: "location_selected" });
  };

  const openHelpPage = (locationKey: LocationKey, request: OnlineHelpRequestSlug = "general") => {
    const locationSlug = locationKeyToOnlineHelpSlug(locationKey);
    setSelectedLocation(locationKey);
    window.localStorage.setItem(SELECTED_LOCATION_KEY, locationKey);
    trackChatEvent({ location: locationKey, request });

    setIsOpening(true);
    setOpeningState({ location: locationKey, request });
    setExpanded(false);

    window.setTimeout(() => {
      window.location.assign(onlineHelpPath(locationSlug, request));
    }, 550);
  };

  const widgetStyle: CSSProperties | undefined = expanded
    ? {
        position: "fixed",
        inset: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
        justifyItems: "stretch",
        alignItems: "stretch"
      }
    : undefined;

  const panelStyle: CSSProperties = {
    width: "100%",
    minHeight: "100dvh",
    maxHeight: "100dvh",
    borderRadius: 0,
    overflowY: "auto",
    padding: isMobilePanel ? "22px 18px calc(22px + env(safe-area-inset-bottom, 0px))" : "34px clamp(24px, 5vw, 64px)"
  };

  const shellStyle: CSSProperties = {
    ...widgetStyle,
    right: expanded ? 0 : isMobilePanel ? 14 : 24,
    bottom: expanded ? 0 : isMobilePanel ? 86 : 96,
    display: isOpening ? "none" : "grid",
    width: widgetStyle?.width || "min(620px, calc(100vw - 32px))",
    justifyItems: widgetStyle?.justifyItems || "end",
    gap: 12,
    pointerEvents: "none"
  };

  const greetingStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "38px minmax(0, 1fr)",
    gap: 10,
    alignItems: "start",
    width: "min(380px, 100%)",
    border: "1px solid rgba(169, 27, 27, 0.15)",
    borderRadius: 12,
    background: "rgba(255, 252, 247, 0.98)",
    boxShadow: "0 18px 48px rgba(23, 19, 19, 0.16)",
    color: "var(--ink)",
    padding: "13px 14px",
    backdropFilter: "blur(14px)"
  };

  const toggleStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    border: "1px solid rgba(169, 27, 27, 0.14)",
    borderRadius: 999,
    background: "rgba(169, 27, 27, 0.05)",
    minHeight: isMobilePanel ? 72 : 66,
    alignItems: "center",
    padding: 4
  };

  const actionButtonStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "34px minmax(0, 1fr) 18px",
    gap: 11,
    alignItems: "center",
    minHeight: isMobilePanel ? 62 : 54,
    border: "1px solid rgba(169, 27, 27, 0.12)",
    borderRadius: 9,
    background: "var(--white)",
    color: "var(--ink)",
    cursor: "pointer",
    padding: isMobilePanel ? "12px 13px" : "10px 12px",
    font: "inherit",
    textAlign: "left"
  };

  const callButtonStyle: CSSProperties = {
    display: "inline-flex",
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "1px solid rgba(169, 27, 27, 0.16)",
    borderRadius: 8,
    background: "rgba(169, 27, 27, 0.06)",
    color: "var(--red)",
    padding: "0 13px",
    fontSize: 12,
    fontWeight: 950,
    letterSpacing: "0.04em",
    textTransform: "uppercase"
  };

  const openingLocation = openingState ? locationMap[openingState.location] : null;
  const loadingPanelStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 2147483646,
    display: "grid",
    placeItems: "center",
    width: "100vw",
    height: "100dvh",
    background: "#fcfaf6",
    color: "var(--ink)",
    padding: 24
  };

  return (
    <>
      {isOpening && openingState && openingLocation && (
        <div className="chat-support-loading-panel" role="status" aria-live="polite" style={loadingPanelStyle}>
          <div style={{ display: "grid", justifyItems: "center", gap: 14, textAlign: "center", maxWidth: 340 }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 54,
                height: 54,
                borderRadius: 999,
                background: "rgba(169, 27, 27, 0.09)",
                color: "var(--red)"
              }}
            >
              <LoaderIcon size={26} className="chat-support-spinner" />
            </span>
            <span style={{ display: "grid", gap: 5 }}>
              <strong style={{ fontSize: 18, fontWeight: 950, lineHeight: 1.15 }}>Opening {openingLocation.name} help</strong>
              <small style={{ color: "var(--body)", fontSize: 13, fontWeight: 750, lineHeight: 1.45 }}>
                Taking you to {onlineHelpRequests[openingState.request].shortLabel}.
              </small>
            </span>
          </div>
        </div>
      )}

      <div className="chat-support-widget" style={shellStyle}>
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
            <div>
              <p className="eyebrow">VMC Help Center</p>
              <h2 id="vmc-chat-support-title">
                Help for your pet, <em>right here.</em>
              </h2>
              <p id="vmc-chat-support-description">Book a visit, request a refill, get records, or reach our care team.</p>
            </div>
            <button className="chat-support-close" type="button" aria-label="Close chat support panel" onClick={closePanel}>
              <XIcon size={18} />
            </button>
          </div>

          <div className="chat-support-help-menu" style={{ display: "grid", gap: 12, marginTop: 14 }}>
            <div className="chat-support-location-toggle" aria-label="Switch clinic" style={toggleStyle}>
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
                    style={{
                      border: 0,
                      borderRadius: 999,
                      background: isSelected ? "var(--white)" : "transparent",
                      color: isSelected ? "var(--ink)" : "var(--body)",
                      cursor: isSelected ? "default" : "pointer",
                      font: "inherit",
                      minHeight: isMobilePanel ? 56 : 52,
                      fontSize: isMobilePanel ? 16 : 16,
                      fontWeight: 750,
                      letterSpacing: 0,
                      textTransform: "none",
                      boxShadow: isSelected ? "0 8px 22px rgba(23, 19, 19, 0.08)" : undefined
                    }}
                  >
                    {location.name}
                  </button>
                );
              })}
            </div>

            <div className="chat-support-action-list" aria-label={`${locationMap[helpLocation].name} help options`} style={{ display: "grid", gap: 9 }}>
              {helpActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.request}
                    type="button"
                    disabled={isOpening}
                    onClick={() => openHelpPage(helpLocation, action.request)}
                    style={actionButtonStyle}
                  >
                    <Icon aria-hidden="true" size={18} />
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <strong style={{ fontSize: 14, fontWeight: 900, lineHeight: 1.2 }}>{action.label}</strong>
                      <small style={{ color: "var(--body)", fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{action.description}</small>
                    </span>
                    <ArrowRightIcon size={16} />
                  </button>
                );
              })}
            </div>

            <a href={`tel:${locationMap[helpLocation].tel}`} style={callButtonStyle}>
              Call {locationMap[helpLocation].name} {locationMap[helpLocation].phone}
            </a>
            {statusMessage && <p className="chat-support-status" role="status">{statusMessage}</p>}
          </div>
        </div>
        )}

        {!expanded && !hideLauncher && !isFooterVisible && !isMobilePanel && (
        <div className="chat-support-greeting" role="status" style={greetingStyle}>
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
            <strong style={{ display: "block", color: "var(--ink)", fontSize: 13, fontWeight: 950 }}>Veterinary Medical Centers</strong>
            <small style={{ display: "block", marginTop: 3, color: "var(--body)", fontSize: 12.5, fontWeight: 700, lineHeight: 1.42 }}>
              Hi there! Need to book a visit, refill a prescription, or reach the care team? We&apos;re here to help.
            </small>
          </span>
        </div>
        )}

        {!expanded && !hideLauncher && (
        <button
          aria-controls={PANEL_ID}
          aria-expanded={expanded}
          aria-label={isOpening ? "Opening help options..." : "Open help options"}
          aria-busy={isOpening || undefined}
          className={isOpening ? "chat-support-button is-loading" : "chat-support-button"}
          ref={buttonRef}
          type="button"
          disabled={isOpening}
          onClick={openPanel}
          suppressHydrationWarning
        >
          {isOpening
            ? <LoaderIcon size={22} className="chat-support-spinner" />
            : <MessageCircleIcon size={25} strokeWidth={2.4} className="chat-support-button-icon" />}
          <span className="chat-support-button-label">
            <strong>{isOpening ? "Connecting…" : "Get help now"}</strong>
            <small>{isOpening ? "Opening your request page." : "Book, refill, message, or get records."}</small>
          </span>
        </button>
        )}
      </div>
    </>
  );
}
