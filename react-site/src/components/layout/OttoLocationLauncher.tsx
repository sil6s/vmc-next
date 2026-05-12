"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Mail, MapPin, MessageCircle, PawPrint, Phone, RotateCcw, UserRound, X } from "lucide-react";

type LocationKey = "fortThomas" | "independence";
type RequestType =
  | "TalkToStaff"
  | "RequestAppointment"
  | "DirectBooking"
  | "RequestRxRefill"
  | "RequestMedicalRecords";

type OttoWidget = {
  initialize?: (clinicId: string, options?: Record<string, unknown>) => void;
  open?: () => void;
  close?: () => void;
  toggle?: () => void;
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

const STORAGE_KEY = "vmc_otto_selected_location";

const OTTO_CLINICS: Record<LocationKey, string> = {
  fortThomas:
    process.env.NEXT_PUBLIC_OTTO_FORT_THOMAS_CLINIC_ID ||
    "REPLACE_WITH_FORT_THOMAS_CLINIC_ID",
  independence:
    process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID ||
    "REPLACE_WITH_INDEPENDENCE_CLINIC_ID"
};

const LOCATIONS: Record<
  LocationKey,
  {
    name: string;
    shortName: string;
    description: string;
    phone: string;
    tel: string;
    email: string;
  }
> = {
  fortThomas: {
    name: "Fort Thomas",
    shortName: "Fort Thomas",
    description: "For clients visiting our Fort Thomas vet location.",
    phone: "(859) 442-4420",
    tel: "+18594424420",
    email: "information@nky.vet"
  },
  independence: {
    name: "Independence",
    shortName: "Independence",
    description: "For clients visiting our Independence vet location.",
    phone: "(859) 356-2242",
    tel: "+18593562242",
    email: "information@nky.vet"
  }
};

function isLocationKey(value: string | null): value is LocationKey {
  return value === "fortThomas" || value === "independence";
}

export function OttoLocationLauncher() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationKey | null>(null);
  const [isOttoReady, setIsOttoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mockMessage, setMockMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const savedLocationLabel = useMemo(
    () => (selectedLocation ? LOCATIONS[selectedLocation].shortName : ""),
    [selectedLocation]
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocationKey(saved)) {
      setSelectedLocation(saved);
    }

    const checkOtto = () => setIsOttoReady(Boolean(window.otto?.widget));
    checkOtto();
    const interval = window.setInterval(checkOtto, 1200);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isSelectorOpen) {
      return;
    }

    lastFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) || []);
    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSelectorOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedElement.current?.focus();
    };
  }, [isSelectorOpen]);

  const openSelector = () => {
    setErrorMessage("");
    setMockMessage("");
    setIsSelectorOpen(true);
  };

  const openOttoForLocation = useCallback((locationKey: LocationKey, requestType?: RequestType) => {
    const clinicId = OTTO_CLINICS[locationKey];
    const locationName = LOCATIONS[locationKey].shortName;

    setIsLoading(true);
    setErrorMessage("");
    setMockMessage("");
    setSelectedLocation(locationKey);
    window.localStorage.setItem(STORAGE_KEY, locationKey);

    if (!window.otto?.widget) {
      console.warn("Otto widget not loaded yet. Would open:", locationKey, clinicId, requestType);
      setMockMessage(`Opening ${locationName} chat...`);
      setIsSelectorOpen(false);
      window.setTimeout(() => setIsLoading(false), 500);
      return;
    }

    try {
      window.otto.widget.destroy?.();
      window.otto.widget.initialize?.(clinicId, {
        isOpen: true,
        showPreview: true,
        ...(requestType ? { selectRequestType: requestType } : {})
        // TODO: Confirm supported Otto initialize options when real Otto embed docs/IDs are provided.
      });
      if (requestType) {
        window.otto.widget.selectRequestType?.(requestType);
      }
      window.otto.widget.open?.();
      setIsSelectorOpen(false);
    } catch (error) {
      console.error("Failed to open Otto widget", error);
      setErrorMessage("We're having trouble loading chat. Please call your location directly or try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLauncherClick = () => {
    if (selectedLocation) {
      openOttoForLocation(selectedLocation);
      return;
    }
    openSelector();
  };

  const changeLocation = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSelectedLocation(null);
    setMockMessage("");
    setErrorMessage("");
    try {
      window.otto?.widget?.destroy?.();
    } catch (error) {
      console.warn("Failed to destroy Otto widget while changing location", error);
    }
    setIsSelectorOpen(true);
  };

  return (
    <>
      <div className="otto-launcher-shell">
        {(selectedLocation || mockMessage || errorMessage || !isSelectorOpen) && (
          <div className="otto-launcher-status" aria-live="polite">
            {mockMessage ? (
              <span>{mockMessage}</span>
            ) : errorMessage ? (
              <>
                <span>{errorMessage}</span>
                {selectedLocation && <a href={`tel:${LOCATIONS[selectedLocation].tel}`}>Call {savedLocationLabel}</a>}
              </>
            ) : selectedLocation ? (
              <>
                <span>Using {savedLocationLabel} as your saved chat location.</span>
                <button type="button" onClick={changeLocation}>Change location</button>
              </>
            ) : (
              <div className="otto-proactive-message">
                <span className="otto-proactive-avatar">
                  <UserRound aria-hidden="true" size={16} />
                </span>
                <span>
                  <strong>Chat support is available now.</strong>
                  <small>Questions? Choose your VMC location and we’ll point you to the right team.</small>
                </span>
              </div>
            )}
          </div>
        )}
        <button
          className="otto-launcher-button"
          type="button"
          aria-label={selectedLocation ? `Open ${savedLocationLabel} chat support` : "Choose a chat support location"}
          onClick={handleLauncherClick}
        >
          <MessageCircle aria-hidden="true" size={25} strokeWidth={2.4} />
          <span>
            <strong>{isLoading ? "Opening..." : "Chat Support"}</strong>
            <small>Need help?</small>
          </span>
        </button>
      </div>

      {isSelectorOpen && (
        <div className="otto-modal-backdrop" role="presentation">
          <div
            aria-describedby="otto-selector-intro"
            aria-labelledby="otto-selector-title"
            aria-modal="true"
            className="otto-modal"
            ref={dialogRef}
            role="dialog"
          >
            <div className="otto-modal-head">
              <div>
                <p className="eyebrow">Chat Support</p>
                <h2 id="otto-selector-title">Which location can we help you with?</h2>
              </div>
              <button className="otto-close-button" type="button" aria-label="Close chat location selector" onClick={() => setIsSelectorOpen(false)}>
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <p id="otto-selector-intro">
              Choose your Veterinary Medical Center location, then pick chat, email, or call so we can connect you with the right team.
            </p>
            <p className="otto-recommended-note">Chat support is now available and is the recommended option for quick, non-urgent questions.</p>
            <div className="otto-location-grid">
              {(Object.keys(LOCATIONS) as LocationKey[]).map((locationKey) => {
                const location = LOCATIONS[locationKey];
                return (
                  <article className="otto-location-card" key={locationKey}>
                    <MapPin aria-hidden="true" size={21} />
                    <h3>{location.name}</h3>
                    <p>{location.description}</p>
                    <div className="otto-contact-actions">
                      <button type="button" onClick={() => openOttoForLocation(locationKey)}>
                        <MessageCircle aria-hidden="true" size={15} />
                        <span>Start Chat <small>Recommended</small></span>
                      </button>
                      <a href={`mailto:${location.email}?subject=${encodeURIComponent(`${location.shortName} website question`)}`}>
                        <Mail aria-hidden="true" size={15} />
                        Email
                      </a>
                      <a href={`tel:${location.tel}`}>
                        <Phone aria-hidden="true" size={15} />
                        Call
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="otto-modal-foot">
              <PawPrint aria-hidden="true" size={16} />
              <span>{isOttoReady ? "Otto chat is ready." : "Mock mode: Otto script is not loaded locally yet."}</span>
              {selectedLocation && (
                <button type="button" onClick={changeLocation}>
                  <RotateCcw aria-hidden="true" size={14} />
                  Change saved location
                </button>
              )}
            </div>
            {errorMessage && <p className="otto-error-message">{errorMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
}
