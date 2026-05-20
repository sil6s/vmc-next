"use client";

import type * as React from "react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardList,
  FileText,
  MapPin,
  PawPrint,
  PenLine,
  Phone,
  ShieldCheck,
  Upload,
  UserRound
} from "lucide-react";
import { ShadButton } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  appointmentTiming,
  clientTypeOptions,
  coOwnerPermissionOptions,
  genderOptions,
  indoorOutdoorOptions,
  locationOptions,
  maxRecordFileSize,
  newPatientDefaults,
  speciesOptions,
  timeOfDayOptions,
  visitReasons,
  type NewPatientRequest
} from "@/lib/new-patient/schema";

type WizardData = Omit<NewPatientRequest, "authorizationConsent" | "finalConfirmation"> & {
  authorizationConsent: boolean;
  finalConfirmation: boolean;
};

const steps = [
  { label: "Visit request", Icon: CalendarClock },
  { label: "Client information", Icon: UserRound },
  { label: "Pet information", Icon: PawPrint },
  { label: "Authorization", Icon: ShieldCheck },
  { label: "Review & submit", Icon: ClipboardList }
];

const stepFields: Record<number, (keyof WizardData)[]> = {
  0: ["clientType", "preferredLocation", "reasonForVisit", "preferredTiming", "preferredTimeOfDay"],
  1: ["ownerFirstName", "ownerLastName", "phone", "email", "streetAddress", "city", "state", "zipCode"],
  2: ["petName", "ageOrDateOfBirth", "species", "gender", "breed", "colorMarkings", "indoorOutdoor", "vaccinationHistory", "referralSource"],
  3: ["authorizationConsent", "digitalSignature", "dateSigned"],
  4: ["finalConfirmation"]
};

const labels: Partial<Record<keyof WizardData, string>> = {
  ownerFirstName: "Owner first name",
  ownerLastName: "Owner last name",
  phone: "Phone",
  email: "Email",
  streetAddress: "Street Address",
  city: "City",
  state: "State",
  zipCode: "ZIP Code",
  petName: "Pet name",
  ageOrDateOfBirth: "Pet age or date of birth",
  breed: "Breed",
  colorMarkings: "Color / Markings",
  vaccinationHistory: "Vaccination History",
  referralSource: "How did you hear about us?",
  digitalSignature: "Digital Signature",
  dateSigned: "Date signed"
};

const locationDetails: Record<string, { address: string; phone: string; helper: string; descriptor: string }> = {
  "Fort Thomas": {
    address: "Fort Thomas, KY",
    phone: "(859) 441-4420",
    descriptor: "Convenient for northern Campbell County.",
    helper: "Best for clients near Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, and Cold Spring."
  },
  Independence: {
    address: "Independence, KY",
    phone: "(859) 356-2242",
    descriptor: "Convenient for central Northern Kentucky.",
    helper: "Best for clients near Independence, Taylor Mill, Covington, Latonia, Erlanger, and Florence."
  },
  "No preference": {
    address: "Either location",
    phone: "Our team will guide you",
    descriptor: "Earliest or most convenient option.",
    helper: "Our team will choose the earliest or most convenient option."
  }
};

function initialData(): WizardData {
  return {
    ...newPatientDefaults,
    authorizationConsent: false,
    finalConfirmation: false,
    dateSigned: new Date().toISOString().slice(0, 10)
  };
}

function hasValue(value: unknown) {
  return typeof value === "boolean" ? value : Boolean(String(value || "").trim());
}

function Field({
  label,
  required,
  error,
  helper,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="np-field">
      <span>
        {label}
        {required && <em aria-label="required">*</em>}
      </span>
      {children}
      {helper && !error && <small className="np-helper">{helper}</small>}
      {error && <small role="alert">{error}</small>}
    </label>
  );
}

function SelectControl({
  value,
  options,
  placeholder,
  onChange
}: {
  value: string;
  options: readonly string[];
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Choose an option"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function FormSectionCard({
  icon,
  title,
  helper,
  children
}: {
  icon: React.ReactNode;
  title: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="np-section-card">
      <div className="np-section-card-head">
        <span>{icon}</span>
        <div>
          <h3>{title}</h3>
          {helper && <p>{helper}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatZip(value: string) {
  return value.replace(/[^\d-]/g, "").slice(0, 10);
}

function SignaturePad({
  value,
  onChange,
  error
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(value.startsWith("data:image"));
  const [typed, setTyped] = useState(value.startsWith("typed:") ? value.replace(/^typed:/, "") : "");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    context.scale(ratio, ratio);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.4;
    context.strokeStyle = "#211b1a";
  }, [mode]);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const current = point(event);
    context.beginPath();
    context.moveTo(current.x, current.y);
    setIsDrawing(true);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const current = point(event);
    context.lineTo(current.x, current.y);
    context.stroke();
    setHasDrawn(true);
  };

  const end = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setHasDrawn(true);
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const clear = () => {
    if (hasDrawn && !window.confirm("Clear this signature?")) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setTyped("");
    onChange("");
  };

  return (
    <div className="np-signature-card">
      <div className="np-signature-tabs" role="tablist" aria-label="Signature method">
        <button className={mode === "draw" ? "is-active" : undefined} type="button" onClick={() => setMode("draw")}>Draw signature</button>
        <button className={mode === "type" ? "is-active" : undefined} type="button" onClick={() => setMode("type")}>Type signature</button>
      </div>
      {mode === "draw" ? (
        <div className="np-signature-draw">
          <canvas
            aria-label="Draw your signature"
            className="np-signature-pad"
            ref={canvasRef}
            onPointerDown={start}
            onPointerMove={draw}
            onPointerUp={end}
            onPointerLeave={end}
          />
          {!hasDrawn && <span className="np-signature-placeholder">Sign here</span>}
        </div>
      ) : (
        <div className="np-typed-signature">
          <Field label="Type your full legal name" required error={error}>
            <Input
              value={typed}
              onChange={(event) => {
                setTyped(event.target.value);
                onChange(event.target.value.trim() ? `typed:${event.target.value}` : "");
              }}
            />
          </Field>
          <div className="np-signature-preview">{typed || "Signature preview"}</div>
        </div>
      )}
      <div className="np-signature-footer">
        <p>Use your mouse, finger, trackpad, or keyboard to sign.</p>
        <ShadButton variant="ghost" type="button" onClick={clear}>Clear signature</ShadButton>
      </div>
      {error && mode === "draw" && <p className="np-field-error" role="alert">{error}</p>}
    </div>
  );
}

export function NewPatientRegistrationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [addCoOwner, setAddCoOwner] = useState(false);
  const [isPending, startTransition] = useTransition();
  const stepBodyRef = useRef<HTMLDivElement>(null);

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const ActiveStepIcon = steps[step].Icon;

  const isStepComplete = (targetStep = step) => {
    for (const field of stepFields[targetStep]) {
      if (!hasValue(data[field])) return false;
    }
    if (targetStep === 0 && data.preferredTiming === "Specific date preferred" && !data.preferredDate) return false;
    if (targetStep === 1 && (!data.email.includes("@") || (addCoOwner && (!data.coOwnerName.trim() || (data.coOwnerEmail && !data.coOwnerEmail.includes("@")))))) return false;
    if (targetStep === 3 && (!data.authorizationConsent || !data.digitalSignature || !data.dateSigned)) return false;
    return true;
  };

  const update = (key: keyof WizardData, value: string | boolean) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSubmitMessage("");
  };

  const updateText = (key: keyof WizardData, value: string) => {
    const phoneFields: (keyof WizardData)[] = ["phone", "alternativePhone", "ownerEmployerPhone", "coOwnerPhone", "coOwnerEmployerPhone"];
    if (phoneFields.includes(key)) {
      update(key, formatPhone(value));
      return;
    }
    if (key === "zipCode") {
      update(key, formatZip(value));
      return;
    }
    update(key, value);
  };

  const setCoOwnerEnabled = (enabled: boolean) => {
    setAddCoOwner(enabled);
    if (!enabled) {
      setData((current) => ({
        ...current,
        coOwnerName: "",
        coOwnerRelationship: "",
        coOwnerPhone: "",
        coOwnerEmail: "",
        coOwnerPermissionLevel: "Scheduling only",
        coOwnerDecisionAuthorization: false,
        coOwnerEmployer: "",
        coOwnerEmployerPhone: ""
      }));
    }
  };

  const validateStep = (targetStep = step) => {
    const nextErrors: Record<string, string> = {};
    for (const field of stepFields[targetStep]) {
      if (!hasValue(data[field])) {
        nextErrors[field] = `${labels[field] || "This field"} is required.`;
      }
    }
    if (targetStep === 0 && data.preferredTiming === "Specific date preferred" && !data.preferredDate) {
      nextErrors.preferredDate = "Choose a preferred date.";
    }
    if (targetStep === 1 && data.email && !data.email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (targetStep === 1 && addCoOwner && !data.coOwnerName.trim()) {
      nextErrors.coOwnerName = "Enter the co-owner or secondary contact name, or turn this optional section off.";
    }
    if (targetStep === 1 && addCoOwner && data.coOwnerEmail && !data.coOwnerEmail.includes("@")) {
      nextErrors.coOwnerEmail = "Enter a valid email address.";
    }
    if (targetStep === 3 && !data.authorizationConsent) {
      nextErrors.authorizationConsent = "Please confirm that you have read and agree before continuing.";
    }
    if (targetStep === 3 && !data.digitalSignature) {
      nextErrors.digitalSignature = "Draw a signature or type your full legal name.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const chooseFiles = (fileList: FileList | null) => {
    const incoming = Array.from(fileList || []);
    const valid = incoming.filter((file) => file.size <= maxRecordFileSize);
    setFiles(valid);
    if (valid.length !== incoming.length) {
      setErrors((current) => ({ ...current, records: "One or more files was too large. Maximum size is 8 MB per file." }));
    } else {
      setErrors((current) => ({ ...current, records: "" }));
    }
  };

  const goToStep = (target: number) => {
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinue = () => {
    if (validateStep()) {
      goToStep(step + 1);
    }
  };

  const handleBack = () => {
    goToStep(step - 1);
  };

  const submit = () => {
    if (!validateStep(4)) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(data));
      formData.append("company", company);
      files.forEach((file) => formData.append("records", file));
      const response = await fetch("/api/new-patient-request/", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setSubmitMessage(result?.error || "Your request could not be submitted. Please call either clinic.");
        return;
      }

      setSubmitted(true);
      setSubmitMessage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  // Scroll body to top on step change
  useEffect(() => {
    stepBodyRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(data) !== JSON.stringify(initialData()) || files.length > 0,
    [data, files]
  );

  // Warn on navigate away
  useEffect(() => {
    if (submitted || !hasUnsavedChanges) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [submitted, hasUnsavedChanges]);

  if (submitted) {
    return (
      <div className="npf-page">
        <div className="npf-success">
          <CheckCircle2 aria-hidden="true" size={52} />
          <h1>Thank you. Your new patient request has been sent.</h1>
          <p>You will receive an email confirmation with a copy of your completed registration. If you find previous health records later, you can reply directly to that email and attach them.</p>
          <div className="npf-success-actions">
            <a className="btn btn-ghost" href="tel:+18594424420">Call Fort Thomas</a>
            <a className="btn btn-ghost" href="tel:+18593562242">Call Independence</a>
            <a className="btn" href="/new-patients/">Return to New Patients</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="npf-page">
      {/* Sticky top header */}
      <header className="npf-header" aria-label="Registration progress">
        <div className="npf-header-inner">
          <div className="npf-header-top">
            <p className="npf-header-label">New Patient Registration &middot; Step {step + 1} of {steps.length}</p>
            <h2 className="npf-step-title">
              <ActiveStepIcon aria-hidden="true" size={22} />
              {steps[step].label}
            </h2>
          </div>
          <Progress value={progress} aria-label={`Step ${step + 1} of ${steps.length}`} className="npf-progress" />
          <ol className="npf-step-list" aria-label="Registration steps">
            {steps.map(({ label, Icon }, index) => (
              <li
                key={label}
                className={index === step ? "npf-step-current" : index < step ? "npf-step-done" : "npf-step-pending"}
                aria-current={index === step ? "step" : undefined}
              >
                {index < step ? <Check aria-hidden="true" size={13} /> : <Icon aria-hidden="true" size={13} />}
                <span>{label}</span>
              </li>
            ))}
          </ol>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="npf-body" ref={stepBodyRef}>
        {/* Honeypot */}
        <label className="np-honeypot" aria-hidden="true">
          Company
          <Input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>

        {Object.keys(errors).length > 0 && Object.values(errors).some(Boolean) && (
          <div className="np-error-summary" role="alert">Please review the highlighted fields before continuing.</div>
        )}

        {step === 0 && (
          <div className="np-step-stack">
            <FormSectionCard icon={<MapPin aria-hidden="true" size={20} />} title="Choose a preferred location" helper="Select the clinic that works best for your family.">
              <RadioGroup className="np-location-choice" value={data.preferredLocation} onValueChange={(value) => update("preferredLocation", value)} aria-label="Preferred location">
                {locationOptions.map((option) => {
                  const details = locationDetails[option];
                  const selected = data.preferredLocation === option;
                  return (
                    <div
                      className={selected ? "is-selected" : undefined}
                      key={option}
                      onClick={() => update("preferredLocation", option)}
                    >
                      <RadioGroupItem className="np-choice-check" value={option} aria-label={option} />
                      <MapPin aria-hidden="true" size={18} />
                      <strong>{option}</strong>
                      <small>{details.descriptor}</small>
                      <em>{details.address}</em>
                      <em>{details.phone}</em>
                      <small>{details.helper}</small>
                    </div>
                  );
                })}
              </RadioGroup>
              {errors.preferredLocation && <small className="np-field-error" role="alert">{errors.preferredLocation}</small>}
            </FormSectionCard>

            <FormSectionCard icon={<CalendarClock aria-hidden="true" size={20} />} title="Tell us what you need" helper="This helps our team route your request and follow up with the right next step.">
              <div className="np-form-grid">
                <Field label="Are you a new or existing client?" required error={errors.clientType}><SelectControl value={data.clientType} options={clientTypeOptions} onChange={(value) => update("clientType", value)} /></Field>
                <Field label="Reason for visit" required error={errors.reasonForVisit}><SelectControl value={data.reasonForVisit} options={visitReasons} onChange={(value) => update("reasonForVisit", value)} /></Field>
                <Field label="Preferred appointment timing" required error={errors.preferredTiming}><SelectControl value={data.preferredTiming} options={appointmentTiming} onChange={(value) => update("preferredTiming", value)} /></Field>
                <Field label="Preferred date" error={errors.preferredDate} helper={data.preferredTiming === "Specific date preferred" ? "Choose the date that works best." : "Optional unless you choose a specific date."}><Input type="date" value={data.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} /></Field>
                <Field label="Preferred time of day" required error={errors.preferredTimeOfDay}><SelectControl value={data.preferredTimeOfDay} options={timeOfDayOptions} onChange={(value) => update("preferredTimeOfDay", value)} /></Field>
                <Field label="Notes for scheduling"><Textarea value={data.schedulingNotes} onChange={(event) => update("schedulingNotes", event.target.value)} /></Field>
              </div>
            </FormSectionCard>

            <div className="np-emergency-note"><Phone aria-hidden="true" size={18} /> If your pet is experiencing an emergency, please call the clinic directly or visit the nearest emergency veterinary hospital.</div>
          </div>
        )}

        {step === 1 && (
          <div className="np-step-stack">
            <FormSectionCard icon={<UserRound aria-hidden="true" size={20} />} title="Contact information" helper="Tell us who our team should contact about this request.">
              <div className="np-form-grid">
                <Field label="Owner first name" required error={errors.ownerFirstName}><Input value={data.ownerFirstName} onChange={(event) => updateText("ownerFirstName", event.target.value)} /></Field>
                <Field label="Owner last name" required error={errors.ownerLastName}><Input value={data.ownerLastName} onChange={(event) => updateText("ownerLastName", event.target.value)} /></Field>
                <Field label="Phone" required error={errors.phone}><Input inputMode="tel" value={data.phone} onChange={(event) => updateText("phone", event.target.value)} /></Field>
                <Field label="Email" required error={errors.email}><Input type="email" value={data.email} onChange={(event) => updateText("email", event.target.value)} /></Field>
                <Field label="Alternative phone" helper="Optional. Use this if there is another number we should try."><Input inputMode="tel" value={data.alternativePhone} onChange={(event) => updateText("alternativePhone", event.target.value)} /></Field>
                <Field label="Driver's license #" helper="Optional. Bring a photo ID to your first visit if requested."><Input value={data.driversLicense} onChange={(event) => updateText("driversLicense", event.target.value)} /></Field>
              </div>
            </FormSectionCard>

            <FormSectionCard icon={<MapPin aria-hidden="true" size={20} />} title="Home address">
              <div className="np-form-grid">
                <Field label="Street address" required error={errors.streetAddress}><Input value={data.streetAddress} onChange={(event) => updateText("streetAddress", event.target.value)} /></Field>
                <Field label="Address line 2"><Input value={data.addressLine2} onChange={(event) => updateText("addressLine2", event.target.value)} /></Field>
                <Field label="City" required error={errors.city}><Input value={data.city} onChange={(event) => updateText("city", event.target.value)} /></Field>
                <Field label="State" required error={errors.state}><Input value={data.state} onChange={(event) => updateText("state", event.target.value.toUpperCase())} /></Field>
                <Field label="ZIP code" required error={errors.zipCode}><Input inputMode="numeric" value={data.zipCode} onChange={(event) => updateText("zipCode", event.target.value)} /></Field>
              </div>
            </FormSectionCard>

            <FormSectionCard icon={<Phone aria-hidden="true" size={20} />} title="Co-owner or secondary contact" helper="Optional. Add this only if another person is allowed to discuss care, scheduling, or billing for this pet.">
              <label className="np-toggle-row">
                <span>Add a co-owner or secondary contact</span>
                <Switch checked={addCoOwner} onCheckedChange={setCoOwnerEnabled} aria-label="Add a co-owner or secondary contact" />
              </label>
              {addCoOwner && (
                <div className="np-form-grid">
                  <Field label="Co-owner full name" required error={errors.coOwnerName}><Input value={data.coOwnerName} onChange={(event) => updateText("coOwnerName", event.target.value)} /></Field>
                  <Field label="Relationship to pet or owner"><Input value={data.coOwnerRelationship} onChange={(event) => updateText("coOwnerRelationship", event.target.value)} /></Field>
                  <Field label="Co-owner phone"><Input inputMode="tel" value={data.coOwnerPhone} onChange={(event) => updateText("coOwnerPhone", event.target.value)} /></Field>
                  <Field label="Co-owner email" error={errors.coOwnerEmail}><Input type="email" value={data.coOwnerEmail} onChange={(event) => updateText("coOwnerEmail", event.target.value)} /></Field>
                  <Field label="Permission level" helper="This helps our team know what information we can discuss with this person.">
                    <SelectControl value={data.coOwnerPermissionLevel} options={coOwnerPermissionOptions} onChange={(value) => update("coOwnerPermissionLevel", value)} />
                  </Field>
                  <label className="np-checkbox np-span-all"><Checkbox checked={data.coOwnerDecisionAuthorization} onCheckedChange={(checked) => update("coOwnerDecisionAuthorization", checked === true)} /> This person may make medical or financial decisions for my pet.</label>
                  {data.coOwnerDecisionAuthorization && <p className="np-inline-note np-span-all">You may be asked to confirm this authorization during your visit.</p>}
                </div>
              )}
            </FormSectionCard>

            <FormSectionCard icon={<FileText aria-hidden="true" size={20} />} title="Optional employment information" helper="These fields are optional and only used if the clinic needs billing or account details.">
              <div className="np-form-grid">
                <Field label="Owner employer"><Input value={data.ownerEmployer} onChange={(event) => updateText("ownerEmployer", event.target.value)} /></Field>
                <Field label="Owner employer phone"><Input inputMode="tel" value={data.ownerEmployerPhone} onChange={(event) => updateText("ownerEmployerPhone", event.target.value)} /></Field>
                {addCoOwner && (
                  <>
                    <Field label="Co-owner employer"><Input value={data.coOwnerEmployer} onChange={(event) => updateText("coOwnerEmployer", event.target.value)} /></Field>
                    <Field label="Co-owner employer phone"><Input inputMode="tel" value={data.coOwnerEmployerPhone} onChange={(event) => updateText("coOwnerEmployerPhone", event.target.value)} /></Field>
                  </>
                )}
              </div>
            </FormSectionCard>
          </div>
        )}

        {step === 2 && (
          <div className="np-step-stack">
            <FormSectionCard icon={<PawPrint aria-hidden="true" size={20} />} title="Pet basics" helper="Tell us about the pet we will be seeing.">
              <div className="np-form-grid">
                <Field label="Pet name" required error={errors.petName}><Input value={data.petName} onChange={(event) => updateText("petName", event.target.value)} /></Field>
                <Field label="Pet age or date of birth" required error={errors.ageOrDateOfBirth}><Input value={data.ageOrDateOfBirth} onChange={(event) => updateText("ageOrDateOfBirth", event.target.value)} /></Field>
                <div className="np-field np-span-all">
                  <span>Species <em aria-label="required">*</em></span>
                  <RadioGroup className="np-species-cards" value={data.species} onValueChange={(value) => update("species", value)} aria-label="Species">
                    {speciesOptions.map((option) => (
                      <div className={data.species === option ? "is-selected" : undefined} key={option} onClick={() => update("species", option)}>
                        <RadioGroupItem value={option} aria-label={option} />
                        <PawPrint aria-hidden="true" size={18} />
                        <strong>{option}</strong>
                        {data.species === option && <Check aria-hidden="true" size={16} />}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Field label="Gender" required error={errors.gender}><SelectControl value={data.gender} options={genderOptions} onChange={(value) => update("gender", value)} /></Field>
                <Field label="Breed" required error={errors.breed}><Input value={data.breed} onChange={(event) => updateText("breed", event.target.value)} /></Field>
                <Field label="Color / markings" required error={errors.colorMarkings}><Input value={data.colorMarkings} onChange={(event) => updateText("colorMarkings", event.target.value)} /></Field>
                <Field label="Primarily indoor or outdoor?" required error={errors.indoorOutdoor}><SelectControl value={data.indoorOutdoor} options={indoorOutdoorOptions} onChange={(value) => update("indoorOutdoor", value)} /></Field>
                <Field label="Microchip number" helper="Optional. Add it if you have it handy."><Input value={data.microchipNumber} onChange={(event) => updateText("microchipNumber", event.target.value)} /></Field>
              </div>
            </FormSectionCard>

            <FormSectionCard icon={<Upload aria-hidden="true" size={20} />} title="Records and notes" helper="No worries if you do not have records right now. You can reply to your confirmation email with records later.">
              <div className="np-form-grid">
                <Field label="Vaccination history" required error={errors.vaccinationHistory}><Textarea value={data.vaccinationHistory} onChange={(event) => updateText("vaccinationHistory", event.target.value)} /></Field>
                <div className="np-upload-box">
                  <Upload aria-hidden="true" size={24} />
                  <strong>Upload previous health records</strong>
                  <p>PDF, JPG, PNG, DOC, or DOCX. Maximum 8 MB per file.</p>
                  <Input aria-label="Upload previous health records" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(event) => chooseFiles(event.target.files)} />
                  {files.length > 0 && <small>{files.length} file{files.length === 1 ? "" : "s"} selected.</small>}
                  {errors.records && <small className="np-field-error" role="alert">{errors.records}</small>}
                </div>
                <Field label="How did you hear about us?" required error={errors.referralSource} helper="This helps us thank the person, clinic, or search source that sent you our way."><Input value={data.referralSource} onChange={(event) => updateText("referralSource", event.target.value)} /></Field>
              </div>
            </FormSectionCard>
          </div>
        )}

        {step === 3 && (
          <div className="np-consent-step">
            <section className="np-authorization-hero">
              <span><ShieldCheck aria-hidden="true" size={24} /></span>
              <div>
                <h3>Financial &amp; Treatment Authorization</h3>
                <p>Please review and sign below so our team can provide care for your pet and collect payment at the time services are rendered.</p>
              </div>
            </section>

            <section className="np-authorization-summary" aria-labelledby="npf-auth-summary-heading">
              <h3 id="npf-auth-summary-heading">What you are agreeing to</h3>
              <div>
                <p><CheckCircle2 aria-hidden="true" size={18} /> You authorize Veterinary Medical Centers to examine and treat your pet.</p>
                <p><CheckCircle2 aria-hidden="true" size={18} /> You understand payment is due when services are provided.</p>
                <p><CheckCircle2 aria-hidden="true" size={18} /> You understand unpaid balances over 30 days may include a finance charge.</p>
              </div>
            </section>

            <section className="np-consent-card" tabIndex={0} aria-label="Read authorization">
              <p className="eyebrow">Read authorization</p>
              <h3>Financial &amp; Treatment Authorization</h3>
              <p>I, the undersigned owner or authorized agent of the above admitted patient, hereby authorize the doctors of Veterinary Medical Centers of Independence / Ft Thomas to administer such treatment as is necessary and to perform procedures therapeutically and/or diagnostically.</p>
              <p>I further understand that no guarantee of successful treatment is made. I also assume financial responsibility for all charges incurred, and agree to pay all such charges at the time of release.</p>
              <p>I understand that unpaid balances over 30 days are subject to a monthly 1.5% finance charge.</p>
              <p><strong>Payment is expected at the time services are rendered.</strong></p>
            </section>

            <label className="np-checkbox np-agreement">
              <Checkbox checked={data.authorizationConsent} onCheckedChange={(checked) => update("authorizationConsent", checked === true)} />
              <span>I have read and agree to the Financial &amp; Treatment Authorization.<em aria-label="required">*</em></span>
            </label>
            {errors.authorizationConsent && <p className="np-field-error" role="alert">{errors.authorizationConsent}</p>}

            <FormSectionCard icon={<PenLine aria-hidden="true" size={20} />} title="Digital signature" helper="Use your mouse, finger, trackpad, or keyboard to sign.">
              <SignaturePad value={data.digitalSignature} onChange={(value) => update("digitalSignature", value)} error={errors.digitalSignature} />
            </FormSectionCard>

            <section className="np-date-card">
              <div>
                <CalendarClock aria-hidden="true" size={20} />
                <span>
                  <strong>Date signed</strong>
                  <small>Automatically filled for today.</small>
                </span>
              </div>
              <Input aria-label="Date signed" type="date" value={data.dateSigned} readOnly onChange={(event) => update("dateSigned", event.target.value)} />
            </section>
            {errors.dateSigned && <p className="np-field-error" role="alert">{errors.dateSigned}</p>}

            {isStepComplete(3) && <p className="np-authorization-complete"><CheckCircle2 aria-hidden="true" size={18} /> Authorization complete.</p>}
            <p className="np-trust-note">Your request is not confirmed until our team contacts you. If your pet is experiencing an emergency, please call the clinic directly or visit the nearest emergency veterinary hospital.</p>
          </div>
        )}

        {step === 4 && (
          <div className="np-review">
            <section className="np-review-section">
              <button type="button" onClick={() => goToStep(0)}>Edit</button>
              <h3><MapPin aria-hidden="true" size={18} /> Visit request</h3>
              <dl>
                <div><dt>Preferred location</dt><dd>{data.preferredLocation}</dd></div>
                <div><dt>Reason for visit</dt><dd>{data.reasonForVisit}</dd></div>
                <div><dt>Appointment timing</dt><dd>{data.preferredTiming}{data.preferredDate ? ` · ${data.preferredDate}` : ""}</dd></div>
                <div><dt>Time of day</dt><dd>{data.preferredTimeOfDay}</dd></div>
                <div><dt>Scheduling notes</dt><dd>{data.schedulingNotes || "Not provided"}</dd></div>
              </dl>
            </section>

            <section className="np-review-section">
              <button type="button" onClick={() => goToStep(1)}>Edit</button>
              <h3><UserRound aria-hidden="true" size={18} /> Client information</h3>
              <dl>
                <div><dt>Owner</dt><dd>{data.ownerFirstName} {data.ownerLastName}</dd></div>
                <div><dt>Phone</dt><dd>{data.phone}</dd></div>
                <div><dt>Email</dt><dd>{data.email}</dd></div>
                <div><dt>Address</dt><dd>{data.streetAddress}{data.addressLine2 ? `, ${data.addressLine2}` : ""}, {data.city}, {data.state} {data.zipCode}</dd></div>
                <div><dt>Alternative phone</dt><dd>{data.alternativePhone || "Not provided"}</dd></div>
              </dl>
              <div className="np-review-subsection">
                <h4>Co-owner or secondary contact</h4>
                {addCoOwner || data.coOwnerName ? (
                  <dl>
                    <div><dt>Name</dt><dd>{data.coOwnerName}</dd></div>
                    <div><dt>Relationship</dt><dd>{data.coOwnerRelationship || "Not provided"}</dd></div>
                    <div><dt>Phone</dt><dd>{data.coOwnerPhone || "Not provided"}</dd></div>
                    <div><dt>Email</dt><dd>{data.coOwnerEmail || "Not provided"}</dd></div>
                    <div><dt>Permission level</dt><dd>{data.coOwnerPermissionLevel}</dd></div>
                    <div><dt>Decision authorization</dt><dd>{data.coOwnerDecisionAuthorization ? "May make medical or financial decisions" : "Not selected"}</dd></div>
                  </dl>
                ) : (
                  <p>No co-owner or secondary contact added.</p>
                )}
              </div>
            </section>

            <section className="np-review-section">
              <button type="button" onClick={() => goToStep(2)}>Edit</button>
              <h3><PawPrint aria-hidden="true" size={18} /> Pet information</h3>
              <dl>
                <div><dt>Pet</dt><dd>{data.petName}</dd></div>
                <div><dt>Age or date of birth</dt><dd>{data.ageOrDateOfBirth}</dd></div>
                <div><dt>Species</dt><dd>{data.species}</dd></div>
                <div><dt>Gender</dt><dd>{data.gender}</dd></div>
                <div><dt>Breed</dt><dd>{data.breed}</dd></div>
                <div><dt>Color / markings</dt><dd>{data.colorMarkings}</dd></div>
                <div><dt>Indoor / outdoor</dt><dd>{data.indoorOutdoor}</dd></div>
                <div><dt>Microchip</dt><dd>{data.microchipNumber || "Not provided"}</dd></div>
                <div><dt>Vaccination history</dt><dd>{data.vaccinationHistory}</dd></div>
                <div><dt>How you heard about us</dt><dd>{data.referralSource}</dd></div>
              </dl>
              <p className="np-review-files"><Upload aria-hidden="true" size={16} /> {files.length ? `${files.length} uploaded record${files.length === 1 ? "" : "s"}` : "No health records uploaded."}</p>
            </section>

            <section className="np-review-section">
              <button type="button" onClick={() => goToStep(3)}>Edit</button>
              <h3><ShieldCheck aria-hidden="true" size={18} /> Authorization</h3>
              <dl>
                <div><dt>Agreement</dt><dd>{data.authorizationConsent ? "Financial & Treatment Authorization accepted" : "Not accepted"}</dd></div>
                <div><dt>Signature</dt><dd>{data.digitalSignature ? `Signed on ${data.dateSigned}` : "Not signed"}</dd></div>
              </dl>
            </section>

            <section className="np-final-consent">
              <h3>Ready to submit</h3>
              <p>By submitting, you are sending this request to Veterinary Medical Centers. A team member will follow up to confirm availability and next steps.</p>
              <label className="np-checkbox">
                <Checkbox checked={data.finalConfirmation} onCheckedChange={(checked) => update("finalConfirmation", checked === true)} />
                <span>I confirm this information is accurate to the best of my knowledge.<em aria-label="required">*</em></span>
              </label>
              {errors.finalConfirmation && <p className="np-field-error" role="alert">{errors.finalConfirmation}</p>}
              {submitMessage && <p className="np-field-error" role="alert">{submitMessage}</p>}
            </section>
          </div>
        )}
      </div>

      {/* Sticky bottom footer */}
      <footer className="npf-footer">
        <div className="npf-footer-inner">
          {step > 0 ? (
            <ShadButton variant="ghost" type="button" onClick={handleBack}>
              <ArrowLeft aria-hidden="true" size={16} /> Back
            </ShadButton>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <ShadButton type="button" onClick={handleContinue}>
              Continue <ArrowRight aria-hidden="true" size={16} />
            </ShadButton>
          ) : (
            <ShadButton type="button" disabled={isPending || !isStepComplete(4)} onClick={submit}>
              {isPending ? "Submitting..." : "Submit request"}
            </ShadButton>
          )}
        </div>
      </footer>
    </div>
  );
}
