"use client";

import type { ReactNode } from "react";
import { useMemo, useState, useTransition } from "react";
import { CalendarCheck, CheckCircle2, ExternalLink, FileText, MessageCircle, PawPrint, Phone, ShieldCheck, UserRound } from "lucide-react";
import { ShadButton } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";
import {
  appointmentTiming,
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
import type { PublicLocation } from "@/lib/settings/public";

type BookData = NewPatientRequest;
type FlowMode = "choose" | "new" | "existing";

const steps = ["Visit", "Owner & pet", "Authorization", "Review"];

function SelectControl({ value, options, onChange }: { value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function Field({ label, children, required, error, className = "" }: { label: string; children: ReactNode; required?: boolean; error?: string; className?: string }) {
  return (
    <label className={`book-field ${className}`}>
      <span>{label}{required && <em aria-label="required">*</em>}</span>
      {children}
      {error && <small role="alert">{error}</small>}
    </label>
  );
}

function easternBusinessHours() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    hour12: false
  });
  const parts = formatter.formatToParts(new Date());
  const weekday = parts.find((part) => part.type === "weekday")?.value || "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value || "0");
  return ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday) && hour >= 8 && hour < 18;
}

export function BookAppointmentExperience({
  portalUrl,
  pharmacyUrl,
  liveChatEnabled,
  locations,
  initialMode = "choose"
}: {
  portalUrl: string;
  pharmacyUrl: string;
  liveChatEnabled: boolean;
  locations: PublicLocation[];
  initialMode?: FlowMode;
}) {
  const [mode, setMode] = useState<FlowMode>(initialMode);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookData>({ ...newPatientDefaults, dateSigned: new Date().toISOString().slice(0, 10) });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isChatAvailable = liveChatEnabled && easternBusinessHours();
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const publicLocations = useMemo(() => locations.length ? locations : site.locations.map((location) => ({
    id: location.id,
    name: location.name,
    address: location.address,
    street: location.street,
    city: location.city,
    state: location.state,
    zip: location.zip,
    phone: location.phone,
    tel: location.tel,
    hours: location.hours,
    mapUrl: location.mapUrl,
    mapEmbedUrl: location.mapEmbedUrl,
    email: site.email,
    emergencyMessage: ""
  })), [locations]);

  const update = (key: keyof BookData, value: string | boolean) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setMessage("");
  };

  const validate = (target = step) => {
    const next: Record<string, string> = {};
    const required: Partial<Record<number, (keyof BookData)[]>> = {
      0: ["preferredLocation", "reasonForVisit", "preferredTiming", "preferredTimeOfDay"],
      1: ["ownerFirstName", "ownerLastName", "phone", "email", "streetAddress", "city", "state", "zipCode", "petName", "ageOrDateOfBirth", "species", "gender", "breed", "colorMarkings", "indoorOutdoor", "vaccinationHistory", "referralSource"],
      2: ["authorizationConsent", "digitalSignature", "dateSigned"],
      3: ["finalConfirmation"]
    };
    for (const field of required[target] || []) {
      if (!String(data[field] || "").trim() || data[field] === false) next[field] = "This field is required.";
    }
    if (target === 0 && data.preferredTiming === "Specific date preferred" && !data.preferredDate) next.preferredDate = "Choose a preferred date.";
    if (target === 1 && data.email && !data.email.includes("@")) next.email = "Enter a valid email address.";
    if (target === 2 && !data.authorizationConsent) next.authorizationConsent = "Please agree before continuing.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const chooseFiles = (fileList: FileList | null) => {
    const incoming = Array.from(fileList || []);
    const valid = incoming.filter((file) => file.size <= maxRecordFileSize);
    setFiles(valid);
    setErrors((current) => ({ ...current, records: valid.length !== incoming.length ? "One or more files was too large. Maximum size is 8 MB per file." : "" }));
  };

  const next = () => {
    if (validate()) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = () => {
    if (!validate(3)) return;
    startTransition(async () => {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(data));
      formData.append("company", "");
      files.forEach((file) => formData.append("records", file));
      const response = await fetch("/api/new-patient-request/", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setMessage(result?.error || "Your request could not be submitted. Please call either clinic.");
        return;
      }
      setSubmitted(true);
    });
  };

  const openChat = () => window.dispatchEvent(new Event("vmc:open-chat-support"));

  if (submitted) {
    return (
      <section className="book-flow book-success">
        <CheckCircle2 aria-hidden="true" size={46} />
        <h2>Request received</h2>
        <p>Thank you. Your new patient request has been sent to Veterinary Medical Center. Our team will review it and follow up to help schedule your first visit.</p>
        <div className="book-actions">
          {publicLocations.map((location) => <a className="btn btn-ghost" href={`tel:${location.tel}`} key={location.id}>Call {location.name}</a>)}
          <ShadButton type="button" onClick={() => setMode("choose")}>Return to appointment options</ShadButton>
        </div>
      </section>
    );
  }

  return (
    <section className="book-flow" id="appointment-flow">
      <div className="book-choice-head">
        <p className="eyebrow">Book Appointment</p>
        <h1>Book a veterinary appointment</h1>
        <p>Start in the right place. New patients complete registration and request a first visit. Existing clients can use portal, phone, contact, pharmacy, or live chat options when available.</p>
      </div>

      <div className="book-choice-grid">
        <button className={mode === "new" ? "book-choice is-active" : "book-choice"} type="button" onClick={() => setMode("new")}>
          <PawPrint aria-hidden="true" size={28} />
          <strong>New patient</strong>
          <span>Register and request your first visit.</span>
        </button>
        <button className={mode === "existing" ? "book-choice is-active" : "book-choice"} type="button" onClick={() => setMode("existing")}>
          <UserRound aria-hidden="true" size={28} />
          <strong>Existing patient</strong>
          <span>Use portal, phone, contact, or chat options.</span>
        </button>
      </div>

      {mode === "choose" && <p className="book-start-note">Choose one option above to continue.</p>}

      {mode === "existing" && (
        <div className="book-existing-panel">
          <div>
            <h2>Existing client options</h2>
            <p>If your pet is already established with our team, you usually do not need to complete the new patient registration again.</p>
          </div>
          <div className="book-existing-grid">
            <a href={portalUrl} target={portalUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"><FileText aria-hidden="true" /> Patient portal <ExternalLink aria-hidden="true" size={15} /></a>
            {publicLocations.map((location) => <a href={`tel:${location.tel}`} key={location.id}><Phone aria-hidden="true" /> Call {location.name}<span>{location.phone}</span></a>)}
            {isChatAvailable ? (
              <button type="button" onClick={openChat}><MessageCircle aria-hidden="true" /> Live chat<span>Available during business hours</span></button>
            ) : (
              <span className="book-disabled-option"><MessageCircle aria-hidden="true" /> Live chat<span>{liveChatEnabled ? "Available during regular business hours" : "Currently hidden from the website"}</span></span>
            )}
            <a href="/contact/#message-form"><FileText aria-hidden="true" /> Contact form<span>For non-urgent messages</span></a>
            <a href={pharmacyUrl} target={pharmacyUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"><FileText aria-hidden="true" /> Online pharmacy <ExternalLink aria-hidden="true" size={15} /></a>
          </div>
        </div>
      )}

      {mode === "new" && (
        <div className="book-new-panel">
          <div className="book-step-head">
            <div>
              <p className="eyebrow">New Patient Request · Step {step + 1} of {steps.length}</p>
              <h2>{steps[step]}</h2>
            </div>
            <Progress value={progress} aria-label={`Step ${step + 1} of ${steps.length}`} />
          </div>
          {Object.values(errors).some(Boolean) && <div className="np-error-summary" role="alert">Please review the highlighted fields before continuing.</div>}

          {step === 0 && (
            <div className="book-form-grid">
              <Field label="Preferred location" required error={errors.preferredLocation}><SelectControl value={data.preferredLocation} options={locationOptions} onChange={(value) => update("preferredLocation", value)} /></Field>
              <Field label="Reason for visit" required error={errors.reasonForVisit}><SelectControl value={data.reasonForVisit} options={visitReasons} onChange={(value) => update("reasonForVisit", value)} /></Field>
              <Field label="Preferred appointment timing" required error={errors.preferredTiming}><SelectControl value={data.preferredTiming} options={appointmentTiming} onChange={(value) => update("preferredTiming", value)} /></Field>
              <Field label="Preferred date" error={errors.preferredDate}><Input type="date" value={data.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} /></Field>
              <Field label="Preferred time of day" required error={errors.preferredTimeOfDay}><SelectControl value={data.preferredTimeOfDay} options={timeOfDayOptions} onChange={(value) => update("preferredTimeOfDay", value)} /></Field>
              <Field label="Notes for scheduling" className="book-span-all"><Textarea value={data.schedulingNotes} onChange={(event) => update("schedulingNotes", event.target.value)} /></Field>
            </div>
          )}

          {step === 1 && (
            <div className="book-form-grid">
              <Field label="Owner first name" required error={errors.ownerFirstName}><Input value={data.ownerFirstName} onChange={(event) => update("ownerFirstName", event.target.value)} /></Field>
              <Field label="Owner last name" required error={errors.ownerLastName}><Input value={data.ownerLastName} onChange={(event) => update("ownerLastName", event.target.value)} /></Field>
              <Field label="Phone" required error={errors.phone}><Input inputMode="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} /></Field>
              <Field label="Email" required error={errors.email}><Input type="email" value={data.email} onChange={(event) => update("email", event.target.value)} /></Field>
              <Field label="Street address" required error={errors.streetAddress}><Input value={data.streetAddress} onChange={(event) => update("streetAddress", event.target.value)} /></Field>
              <Field label="City" required error={errors.city}><Input value={data.city} onChange={(event) => update("city", event.target.value)} /></Field>
              <Field label="State" required error={errors.state}><Input value={data.state} onChange={(event) => update("state", event.target.value.toUpperCase())} /></Field>
              <Field label="ZIP code" required error={errors.zipCode}><Input value={data.zipCode} onChange={(event) => update("zipCode", event.target.value)} /></Field>
              <Field label="Pet name" required error={errors.petName}><Input value={data.petName} onChange={(event) => update("petName", event.target.value)} /></Field>
              <Field label="Pet age or date of birth" required error={errors.ageOrDateOfBirth}><Input value={data.ageOrDateOfBirth} onChange={(event) => update("ageOrDateOfBirth", event.target.value)} /></Field>
              <Field label="Species" required error={errors.species}><SelectControl value={data.species} options={speciesOptions} onChange={(value) => update("species", value)} /></Field>
              <Field label="Gender" required error={errors.gender}><SelectControl value={data.gender} options={genderOptions} onChange={(value) => update("gender", value)} /></Field>
              <Field label="Breed" required error={errors.breed}><Input value={data.breed} onChange={(event) => update("breed", event.target.value)} /></Field>
              <Field label="Color / markings" required error={errors.colorMarkings}><Input value={data.colorMarkings} onChange={(event) => update("colorMarkings", event.target.value)} /></Field>
              <Field label="Primarily indoor or outdoor?" required error={errors.indoorOutdoor}><SelectControl value={data.indoorOutdoor} options={indoorOutdoorOptions} onChange={(value) => update("indoorOutdoor", value)} /></Field>
              <Field label="Vaccination history" required error={errors.vaccinationHistory}><Textarea value={data.vaccinationHistory} onChange={(event) => update("vaccinationHistory", event.target.value)} /></Field>
              <Field label="How did you hear about us?" required error={errors.referralSource}><Input value={data.referralSource} onChange={(event) => update("referralSource", event.target.value)} /></Field>
              <div className="book-upload book-span-all">
                <strong>Upload previous health records</strong>
                <p>No worries if you do not have records now. You can reply to the confirmation email later.</p>
                <Input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(event) => chooseFiles(event.target.files)} />
                {files.length > 0 && <small>{files.length} file{files.length === 1 ? "" : "s"} selected.</small>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="book-auth">
              <ShieldCheck aria-hidden="true" size={34} />
              <h2>Financial & Treatment Authorization</h2>
              <p>I authorize the doctors of Veterinary Medical Center of Independence / Ft Thomas to administer treatment and perform procedures therapeutically and/or diagnostically. I understand no guarantee of successful treatment is made. I assume financial responsibility for charges incurred and agree to pay at the time of release. Unpaid balances over 30 days may be subject to a monthly 1.5% finance charge.</p>
              <label className="np-checkbox"><Checkbox checked={data.authorizationConsent} onCheckedChange={(checked) => update("authorizationConsent", checked === true)} /> I have read and agree to the Financial & Treatment Authorization.</label>
              <Field label="Digital signature" required error={errors.digitalSignature}><Input value={data.digitalSignature} onChange={(event) => update("digitalSignature", event.target.value)} placeholder="Type your full legal name" /></Field>
              <Field label="Date signed" required error={errors.dateSigned}><Input type="date" value={data.dateSigned} readOnly onChange={(event) => update("dateSigned", event.target.value)} /></Field>
            </div>
          )}

          {step === 3 && (
            <div className="book-review">
              <h2>Review and submit</h2>
              <p><strong>Owner:</strong> {data.ownerFirstName} {data.ownerLastName} · {data.phone} · {data.email}</p>
              <p><strong>Pet:</strong> {data.petName} · {data.species} · {data.reasonForVisit}</p>
              <p><strong>Location:</strong> {data.preferredLocation} · {data.preferredTiming}</p>
              <p><strong>Records:</strong> {files.length ? `${files.length} uploaded` : "No files uploaded"}</p>
              <label className="np-checkbox"><Checkbox checked={data.finalConfirmation} onCheckedChange={(checked) => update("finalConfirmation", checked === true)} /> I confirm this information is accurate to the best of my knowledge.</label>
              {message && <p className="np-field-error" role="alert">{message}</p>}
            </div>
          )}

          <div className="book-actions">
            {step > 0 && <ShadButton variant="ghost" type="button" onClick={() => setStep((current) => current - 1)}>Back</ShadButton>}
            {step < steps.length - 1 ? <ShadButton type="button" onClick={next}>Continue</ShadButton> : <ShadButton type="button" disabled={isPending} onClick={submit}>{isPending ? "Submitting..." : "Submit new patient request"}</ShadButton>}
          </div>
        </div>
      )}
    </section>
  );
}
