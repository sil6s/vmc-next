"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  X
} from "lucide-react";
import {
  appointmentTiming,
  clientTypeOptions,
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

const steps = ["Visit request", "Client information", "Pet information", "Authorization", "Review & submit"];

const stepFields: Record<number, (keyof WizardData)[]> = {
  0: ["clientType", "preferredLocation", "reasonForVisit", "preferredTiming", "preferredTimeOfDay"],
  1: ["ownerFirstName", "ownerLastName", "phone", "email", "streetAddress", "city", "state", "zipCode", "ownerEmployer", "ownerEmployerPhone"],
  2: ["petName", "ageOrDateOfBirth", "species", "gender", "breed", "colorMarkings", "indoorOutdoor", "vaccinationHistory", "referralSource"],
  3: ["authorizationConsent", "digitalSignature", "dateSigned"],
  4: ["finalConfirmation"]
};

const labels: Partial<Record<keyof WizardData, string>> = {
  ownerFirstName: "Owner's First Name",
  ownerLastName: "Owner's Last Name",
  phone: "Phone",
  email: "Email",
  streetAddress: "Street Address",
  city: "City",
  state: "State",
  zipCode: "ZIP Code",
  ownerEmployer: "Owner's Employer",
  ownerEmployerPhone: "Owner Employer's Phone",
  petName: "Pet's Name",
  ageOrDateOfBirth: "Age / Date of Birth",
  breed: "Breed",
  colorMarkings: "Color / Markings",
  vaccinationHistory: "Vaccination History",
  referralSource: "How did you find us, or who may we thank for referring you?",
  digitalSignature: "Digital Signature",
  dateSigned: "Date"
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
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="np-field">
      <span>
        {label}
        {required && <em aria-label="required">*</em>}
      </span>
      {children}
      {error && <small role="alert">{error}</small>}
    </label>
  );
}

export function NewPatientsExperience({
  portalUrl,
  liveChatEnabled
}: {
  portalUrl: string;
  liveChatEnabled: boolean;
}) {
  const [patientType, setPatientType] = useState<"new" | "existing">("new");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(initialData);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(data) !== JSON.stringify(initialData()) || files.length > 0,
    [data, files]
  );

  const update = (key: keyof WizardData, value: string | boolean) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSubmitMessage("");
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
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const requestClose = () => {
    if (!submitted && hasUnsavedChanges && !window.confirm("Close this form? Your unsaved new patient request will be lost.")) {
      return;
    }
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.setTimeout(() => modalRef.current?.querySelector<HTMLElement>("button, input, select, textarea")?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])') || []
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  });

  const openWizard = () => {
    setSubmitted(false);
    setSubmitMessage("");
    setStep(0);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#start-new-patient-request") {
        openWizard();
      }
      if (window.location.hash === "#existing-patient-options") {
        setPatientType("existing");
        document.getElementById("patient-type-heading")?.scrollIntoView({ block: "start" });
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

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

  const submit = () => {
    if (!validateStep(4)) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(data));
      files.forEach((file) => formData.append("records", file));
      const response = await fetch("/api/new-patient-request/", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setSubmitMessage(result?.error || "Your request could not be submitted. Please call either clinic.");
        return;
      }

      setSubmitted(true);
      setSubmitMessage("");
    });
  };

  const openChat = () => {
    document.querySelector<HTMLButtonElement>(".chat-support-button")?.click();
  };

  return (
    <>
      <section className="np-hero" id="new-patient-request">
        <div className="np-hero-copy">
          <p className="eyebrow">New Patient Vet Visit in Northern Kentucky</p>
          <h1>New to Veterinary Medical Center? Let’s get your first visit started.</h1>
          <p>Tell us a little about you and your pet, then our team will follow up to help schedule your visit at the location that works best for you.</p>
          <div className="np-hero-actions">
            <button className="btn btn-primary" type="button" ref={triggerRef} onClick={openWizard}>Start New Patient Request</button>
            <button className="btn btn-ghost" type="button" onClick={() => setPatientType("existing")}>I’m an Existing Patient</button>
          </div>
          <div className="np-trust-points" aria-label="Form benefits">
            {["About 5 minutes", "Secure submission", "Fort Thomas & Independence", "Dogs and cats welcome"].map((item) => (
              <span key={item}><CheckCircle2 aria-hidden="true" size={16} /> {item}</span>
            ))}
          </div>
        </div>
        <aside className="np-hero-card">
          <ShieldCheck aria-hidden="true" size={28} />
          <strong>Your information is used by Veterinary Medical Center to prepare for your pet’s care and respond to your request.</strong>
          <p>No worries if you do not have records right now. You can reply to your confirmation email with health records whenever you find them.</p>
        </aside>
      </section>

      <section className="np-chooser" aria-labelledby="patient-type-heading">
        <div className="section-heading">
          <p className="eyebrow">Choose Your Path</p>
          <h2 id="patient-type-heading">Tell us where you are in the process.</h2>
          <p>New clients can start the full request. Existing clients get faster options without completing new patient registration.</p>
        </div>
        <div className="np-segmented" role="tablist" aria-label="Patient type">
          <button className={patientType === "new" ? "is-active" : undefined} type="button" onClick={() => setPatientType("new")}>I’m a new client</button>
          <button className={patientType === "existing" ? "is-active" : undefined} type="button" onClick={() => setPatientType("existing")}>I’m an existing client</button>
        </div>
        {patientType === "new" ? (
          <div className="np-flow-card">
            {["Start new patient appointment request", "Complete new patient registration", "Submit securely", "Receive confirmation email", "Team follows up"].map((item, index) => (
              <article key={item}>
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </article>
            ))}
            <button className="btn btn-primary" type="button" onClick={openWizard}>Start New Patient Request</button>
          </div>
        ) : (
          <div className="np-existing-grid">
            <article>
              <Phone aria-hidden="true" size={22} />
              <h3>Call to book</h3>
              <p>Prefer to talk with our team? Call your preferred location.</p>
              <a className="btn btn-ghost" href="tel:+18594411937">Fort Thomas: (859) 441-1937</a>
              <a className="btn btn-ghost" href="tel:+18593562242">Independence: (859) 356-2242</a>
            </article>
            <article>
              <FileCheck2 aria-hidden="true" size={22} />
              <h3>Use the patient portal</h3>
              <p>Access your pet’s records, request services, or manage existing care online.</p>
              <a className="btn btn-primary" href={portalUrl} target={portalUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">Open Patient Portal</a>
            </article>
            <article>
              <Mail aria-hidden="true" size={22} />
              <h3>Message our team</h3>
              <p>Send a non-urgent question and our team will follow up.</p>
              <a className="btn btn-primary" href="/contact/#message-form">Contact Form</a>
            </article>
            {liveChatEnabled && (
              <article>
                <MessageCircle aria-hidden="true" size={22} />
                <h3>Chat with us</h3>
                <p>If chat is available, we can help point you to the right next step.</p>
                <button className="btn btn-primary" type="button" onClick={openChat}>Start Chat</button>
              </article>
            )}
          </div>
        )}
      </section>

      {isOpen && (
        <div className="np-modal-backdrop" role="presentation">
          <div className="np-modal" role="dialog" aria-modal="true" aria-labelledby="np-modal-title" ref={modalRef}>
            {submitted ? (
              <div className="np-success-screen">
                <CheckCircle2 aria-hidden="true" size={46} />
                <h2>Thank you. Your new patient request has been sent to our team.</h2>
                <p>You will receive an email confirmation with a copy of your completed registration. If you find previous health records later, you can reply directly to that email and attach them.</p>
                <div className="np-modal-actions">
                  <a className="btn btn-ghost" href="tel:+18594424420">Call Fort Thomas</a>
                  <a className="btn btn-ghost" href="tel:+18593562242">Call Independence</a>
                  <button className="btn btn-primary" type="button" onClick={requestClose}>Return to New Patients page</button>
                </div>
              </div>
            ) : (
              <>
                <header className="np-modal-header">
                  <div>
                    <p className="eyebrow">Step {step + 1} of {steps.length}</p>
                    <h2 id="np-modal-title">{steps[step]}</h2>
                  </div>
                  <button type="button" aria-label="Close new patient request" onClick={requestClose}><X aria-hidden="true" size={21} /></button>
                  <div className="np-progress" aria-label={`Step ${step + 1} of ${steps.length}`}><span style={{ width: `${progress}%` }} /></div>
                </header>

                <div className="np-modal-body">
                  {Object.keys(errors).length > 0 && Object.values(errors).some(Boolean) && (
                    <div className="np-error-summary" role="alert">Please review the highlighted fields before continuing.</div>
                  )}
                  {step === 0 && (
                    <div className="np-form-grid">
                      <Field label="Are you a new or existing client?" required error={errors.clientType}><select value={data.clientType} onChange={(event) => update("clientType", event.target.value)}>{clientTypeOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Preferred location" required error={errors.preferredLocation}><select value={data.preferredLocation} onChange={(event) => update("preferredLocation", event.target.value)}>{locationOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Reason for visit" required error={errors.reasonForVisit}><select value={data.reasonForVisit} onChange={(event) => update("reasonForVisit", event.target.value)}>{visitReasons.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Preferred appointment timing" error={errors.preferredTiming}><select value={data.preferredTiming} onChange={(event) => update("preferredTiming", event.target.value)}>{appointmentTiming.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Preferred date" error={errors.preferredDate}><input type="date" value={data.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} /></Field>
                      <Field label="Preferred time of day" error={errors.preferredTimeOfDay}><select value={data.preferredTimeOfDay} onChange={(event) => update("preferredTimeOfDay", event.target.value)}>{timeOfDayOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Notes for scheduling"><textarea value={data.schedulingNotes} onChange={(event) => update("schedulingNotes", event.target.value)} /></Field>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="np-form-grid">
                      {[
                        ["ownerFirstName", "Owner's First Name", true], ["ownerLastName", "Owner's Last Name", true], ["phone", "Phone", true], ["email", "Email", true],
                        ["streetAddress", "Street Address", true], ["addressLine2", "Address Line 2", false], ["city", "City", true], ["state", "State", true], ["zipCode", "ZIP Code", true],
                        ["driversLicense", "Driver's License #", false], ["coOwnerName", "Co-Owner Name", false], ["coOwnerPhone", "Co-Owner Phone", false], ["ownerEmployer", "Owner's Employer", true],
                        ["ownerEmployerPhone", "Owner Employer's Phone", true], ["coOwnerEmployer", "Co-Owner's Employer", false], ["coOwnerEmployerPhone", "Co-Owner Employer's Phone", false], ["alternativePhone", "Alternative Phone", false]
                      ].map(([key, label, required]) => (
                        <Field label={String(label)} required={Boolean(required)} error={errors[String(key)]} key={String(key)}>
                          <input value={String(data[key as keyof WizardData] || "")} onChange={(event) => update(key as keyof WizardData, event.target.value)} />
                        </Field>
                      ))}
                    </div>
                  )}
                  {step === 2 && (
                    <div className="np-form-grid">
                      <Field label="Pet's Name" required error={errors.petName}><input value={data.petName} onChange={(event) => update("petName", event.target.value)} /></Field>
                      <Field label="Age / Date of Birth" required error={errors.ageOrDateOfBirth}><input value={data.ageOrDateOfBirth} onChange={(event) => update("ageOrDateOfBirth", event.target.value)} /></Field>
                      <Field label="Species" required error={errors.species}><select value={data.species} onChange={(event) => update("species", event.target.value)}>{speciesOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Gender" required error={errors.gender}><select value={data.gender} onChange={(event) => update("gender", event.target.value)}>{genderOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Breed" required error={errors.breed}><input value={data.breed} onChange={(event) => update("breed", event.target.value)} /></Field>
                      <Field label="Color / Markings" required error={errors.colorMarkings}><input value={data.colorMarkings} onChange={(event) => update("colorMarkings", event.target.value)} /></Field>
                      <Field label="Primarily Indoor or Outdoor?" required error={errors.indoorOutdoor}><select value={data.indoorOutdoor} onChange={(event) => update("indoorOutdoor", event.target.value)}>{indoorOutdoorOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                      <Field label="Microchip #"><input value={data.microchipNumber} onChange={(event) => update("microchipNumber", event.target.value)} /></Field>
                      <Field label="Vaccination History" required error={errors.vaccinationHistory}><textarea value={data.vaccinationHistory} onChange={(event) => update("vaccinationHistory", event.target.value)} /></Field>
                      <Field label="Upload Previous Health Records" error={errors.records}><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(event) => chooseFiles(event.target.files)} /><small>No worries if you do not have records right now. After you submit this form, you will receive an email confirmation. You can reply to that email with health records whenever you find them.</small></Field>
                      <Field label="How did you find us, or who may we thank for referring you?" required error={errors.referralSource}><input value={data.referralSource} onChange={(event) => update("referralSource", event.target.value)} /></Field>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="np-consent-step">
                      <div className="np-consent-card" tabIndex={0}>
                        <h3>Financial & Treatment Authorization</h3>
                        <p>I, the undersigned owner or authorized agent of the above admitted patient, hereby authorize the doctors of Veterinary Medical Center of Independence / Ft Thomas to administer such treatment as is necessary and to perform procedures therapeutically and/or diagnostically. I further understand that no guarantee of successful treatment is made. I also assume financial responsibility for all charges incurred, and agree to pay all such charges at the time of release. I understand that unpaid balances over 30 days are subject to a monthly 1.5% finance charge.</p>
                        <p>Payment is expected at the time services are rendered.</p>
                      </div>
                      <label className="np-checkbox"><input type="checkbox" checked={data.authorizationConsent} onChange={(event) => update("authorizationConsent", event.target.checked)} /> I have read and agree to the Financial & Treatment Authorization.*</label>
                      {errors.authorizationConsent && <p className="np-field-error">{errors.authorizationConsent}</p>}
                      <div className="np-form-grid">
                        <Field label="Digital Signature" required error={errors.digitalSignature}><input value={data.digitalSignature} onChange={(event) => update("digitalSignature", event.target.value)} /></Field>
                        <Field label="Date" required error={errors.dateSigned}><input type="date" value={data.dateSigned} onChange={(event) => update("dateSigned", event.target.value)} /></Field>
                      </div>
                      <button className="btn btn-ghost" type="button" onClick={() => update("digitalSignature", "")}>Clear signature</button>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="np-review">
                      {[
                        ["Visit request", ["preferredLocation", "reasonForVisit", "preferredTiming", "preferredDate", "preferredTimeOfDay", "schedulingNotes"]],
                        ["Client information", ["ownerFirstName", "ownerLastName", "phone", "email", "streetAddress", "city", "state", "zipCode"]],
                        ["Pet information", ["petName", "ageOrDateOfBirth", "species", "gender", "breed", "colorMarkings", "vaccinationHistory"]],
                        ["Authorization", ["digitalSignature", "dateSigned"]]
                      ].map(([title, keys], index) => (
                        <section key={String(title)}>
                          <button type="button" onClick={() => setStep(index)}>Edit</button>
                          <h3>{String(title)}</h3>
                          {(keys as string[]).map((key) => <p key={key}><strong>{labels[key as keyof WizardData] || key}:</strong> {String(data[key as keyof WizardData] || "Not provided")}</p>)}
                        </section>
                      ))}
                      <section>
                        <h3>Uploaded records</h3>
                        <p>{files.length ? files.map((file) => file.name).join(", ") : "No files uploaded."}</p>
                      </section>
                      <label className="np-checkbox"><input type="checkbox" checked={data.finalConfirmation} onChange={(event) => update("finalConfirmation", event.target.checked)} /> I confirm this information is accurate to the best of my knowledge.</label>
                      {errors.finalConfirmation && <p className="np-field-error">{errors.finalConfirmation}</p>}
                      {submitMessage && <p className="np-field-error" role="alert">{submitMessage}</p>}
                    </div>
                  )}
                </div>

                <footer className="np-modal-actions">
                  {step > 0 && <button className="btn btn-ghost" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" size={16} /> Back</button>}
                  {step < steps.length - 1 ? (
                    <button className="btn btn-primary" type="button" onClick={() => validateStep() && setStep((current) => current + 1)}>Continue <ArrowRight aria-hidden="true" size={16} /></button>
                  ) : (
                    <button className="btn btn-primary" type="button" disabled={isPending} onClick={submit}>{isPending ? "Submitting..." : "Submit New Patient Request"}</button>
                  )}
                </footer>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
