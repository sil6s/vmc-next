"use client";

import { useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const reasons = [
  "Appointment question",
  "New patient question",
  "Existing patient question",
  "Pharmacy or refill question",
  "Patient portal question",
  "Records request",
  "General question",
  "Other"
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "Message/email",
  petName: "",
  petType: "Dog",
  currentClient: "Not sure",
  location: "Not sure",
  reason: "",
  message: "",
  company: "",
  nonUrgent: false
};

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState(initialForm);
  const trackedStart = useRef(false);

  const helperText = useMemo(() => {
    if (form.reason === "Pharmacy or refill question") {
      return "You may also be able to use the online pharmacy for approved refills and preventives.";
    }
    if (form.reason === "New patient question") {
      return "New clients can also visit the New Patients page to review forms and first-visit information.";
    }
    if (form.reason === "Patient portal question") {
      return "You can also access the Patient Portal directly from the navigation or footer.";
    }
    return "";
  }, [form.reason]);

  function updateField(field: keyof typeof initialForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors([]);
    setStatusMessage("");
    if (!trackedStart.current && step === 1 && state === "idle") {
      trackedStart.current = true;
      trackEvent("contact_form_started");
    }
  }

  function validate(targetStep = step) {
    const nextErrors: string[] = [];
    if (targetStep === 1) {
      if (!form.firstName.trim()) nextErrors.push("Please enter your first name.");
      if (!form.lastName.trim()) nextErrors.push("Please enter your last name.");
      if (!form.email.includes("@")) nextErrors.push("Please enter a valid email address.");
      if (!form.phone.trim()) nextErrors.push("Please enter your phone number.");
    }
    if (targetStep === 2) {
      if (!form.petName.trim()) nextErrors.push("Please enter your pet's name.");
    }
    if (targetStep === 3) {
      if (!form.reason) nextErrors.push("Please choose a reason for contact.");
      if (form.message.trim().length < 10) nextErrors.push("Please add a message with at least 10 characters.");
    }
    if (targetStep === 4 && !form.nonUrgent) {
      nextErrors.push("Please confirm this is not an urgent medical message before sending.");
    }
    setErrors(nextErrors);
    return nextErrors.length === 0;
  }

  function goNext() {
    if (validate(step)) {
      setStep((current) => Math.min(current + 1, 4));
      setErrors([]);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate(4)) return;

    setState("submitting");
    setStatusMessage("");

    const combinedMessage = [
      `Preferred contact method: ${form.contactMethod}`,
      `Pet name: ${form.petName}`,
      `Pet type: ${form.petType}`,
      `Current client: ${form.currentClient}`,
      `Reason: ${form.reason}`,
      "",
      form.message
    ].join("\n");

    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        location: form.location,
        message: combinedMessage,
        company: form.company
      })
    });

    if (response.ok) {
      trackEvent("contact_form_submitted");
      setState("success");
      setStatusMessage("Thank you. Your message has been sent. Our team will review it and follow up as soon as possible during regular business hours. For urgent pet health concerns, please call Fort Thomas or Independence directly.");
      setForm(initialForm);
      trackedStart.current = false;
      setStep(1);
      return;
    }

    const error = (await response.json().catch(() => null)) as { error?: string } | null;
    setState("error");
    setStatusMessage(error?.error || "Your message could not be sent right now. Please call either clinic if your pet needs timely help.");
  }

  return (
    <form className="contact-form multi-step-form" onSubmit={handleSubmit}>
      <div className="form-progress" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((item) => (
          <span className={item <= step ? "is-active" : undefined} key={item}>Step {item}</span>
        ))}
      </div>

      {errors.length > 0 && (
        <div className="form-status error" role="alert">
          {errors.map((error) => <p key={error}>{error}</p>)}
        </div>
      )}

      {step === 1 && (
        <fieldset>
          <legend>Step 1 of 4: Your information</legend>
          <p>We will use this information to follow up during regular business hours.</p>
          <div className="form-grid">
            <label>First name<input value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" /></label>
            <label>Last name<input value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" /></label>
            <label>Email<input value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" /></label>
            <label>Phone<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" autoComplete="tel" /></label>
            <label>Preferred contact method
              <select value={form.contactMethod} onChange={(event) => updateField("contactMethod", event.target.value)}>
                <option>Message/email</option>
                <option>Phone call</option>
                <option>No preference</option>
              </select>
            </label>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>Step 2 of 4: Your pet</legend>
          <p>Not sure which location to choose? Select Not sure or use chat support for help.</p>
          <div className="form-grid">
            <label>Pet name<input value={form.petName} onChange={(event) => updateField("petName", event.target.value)} /></label>
            <label>Pet type
              <select value={form.petType} onChange={(event) => updateField("petType", event.target.value)}>
                <option>Dog</option>
                <option>Cat</option>
                <option>Other</option>
              </select>
            </label>
            <label>Are you a current client?
              <select value={form.currentClient} onChange={(event) => updateField("currentClient", event.target.value)}>
                <option>Yes</option>
                <option>No</option>
                <option>Not sure</option>
              </select>
            </label>
            <label>Preferred location
              <select value={form.location} onChange={(event) => updateField("location", event.target.value)}>
                <option>Fort Thomas</option>
                <option>Independence</option>
                <option>Not sure</option>
              </select>
            </label>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>Step 3 of 4: How can we help?</legend>
          <div className="form-grid">
            <label>Reason for contact
              <select value={form.reason} onChange={(event) => updateField("reason", event.target.value)}>
                <option value="">Choose a reason</option>
                {reasons.map((reason) => <option key={reason}>{reason}</option>)}
              </select>
            </label>
          </div>
          {helperText && <p className="form-helper">{helperText}</p>}
          <label>Message<textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={6} /></label>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend>Step 4 of 4: Review and send</legend>
          <div className="form-review">
            <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
            <p><strong>Contact method:</strong> {form.contactMethod}</p>
            <p><strong>Pet:</strong> {form.petName || "Not provided"} ({form.petType})</p>
            <p><strong>Preferred location:</strong> {form.location}</p>
            <p><strong>Reason:</strong> {form.reason}</p>
            <p><strong>Message:</strong> {form.message}</p>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={form.nonUrgent} onChange={(event) => updateField("nonUrgent", event.target.checked)} />
            I understand this form is for non-urgent messages only. For urgent pet health concerns, I should call the clinic directly.
          </label>
        </fieldset>
      )}

      <label className="hp-field" aria-hidden="true">
        Leave this field blank
        <input value={form.company} onChange={(event) => updateField("company", event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-actions">
        {step > 1 && <button type="button" className="btn btn-ghost" onClick={() => setStep((current) => current - 1)}>Back</button>}
        {step < 4 ? (
          <button type="button" className="btn btn-primary" onClick={goNext}>Continue</button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={state === "submitting"}>
            {state === "submitting" ? "Sending..." : "Send Message"}
          </button>
        )}
      </div>

      {statusMessage && <p className={`form-status ${state}`} role="status">{statusMessage}</p>}
    </form>
  );
}
