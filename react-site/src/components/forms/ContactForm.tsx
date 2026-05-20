"use client";

import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShadButton } from "@/components/ui/Button";
import { RecaptchaField } from "@/components/forms/RecaptchaField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const messageReasons = [
  "General question",
  "Appointment request",
  "Medical follow-up",
  "Records request",
  "Prescription or refill question",
  "Billing question",
  "Other"
];

const locationOptions = ["Fort Thomas", "Independence", "Not sure"];

const initialForm = {
  reason: "",
  location: "Not sure",
  name: "",
  email: "",
  phone: "",
  petName: "",
  message: "",
  company: ""
};

function ContactSelect({
  id,
  value,
  options,
  placeholder,
  onChange
}: {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value || "__empty"} onValueChange={(next) => onChange(next === "__empty" ? "" : next)}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__empty">{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState(initialForm);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaReset, setRecaptchaReset] = useState(0);
  const trackedStart = useRef(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors([]);
    setStatusMessage("");

    if (!trackedStart.current && state === "idle") {
      trackedStart.current = true;
      trackEvent("contact_form_started");
    }
  }

  function validate() {
    const nextErrors: string[] = [];

    if (!form.reason) nextErrors.push("Please choose what we can help with.");
    if (!form.location) nextErrors.push("Please choose a preferred location.");
    if (!form.name.trim()) nextErrors.push("Please enter your name.");
    if (!form.email.includes("@")) nextErrors.push("Please enter a valid email address.");
    if (!form.phone.trim()) nextErrors.push("Please enter your phone number.");
    if (form.message.trim().length < 10) nextErrors.push("Please add a message with at least 10 characters.");
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) nextErrors.push("Please complete the spam protection check.");

    setErrors(nextErrors);
    return nextErrors.length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setState("submitting");
    setStatusMessage("");

    const combinedMessage = [
      `Reason for message: ${form.reason}`,
      `Preferred location: ${form.location}`,
      `Pet name: ${form.petName || "Not provided"}`,
      "",
      form.message
    ].join("\n");

    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email,
        phone: form.phone,
        location: form.location,
        message: combinedMessage,
        company: form.company,
        recaptchaToken
      })
    });

    if (response.ok) {
      trackEvent("contact_form_submitted");
      setState("success");
      setStatusMessage("Thank you. Your message has been sent. Our team will follow up as soon as possible during business hours.");
      setForm(initialForm);
      setRecaptchaToken("");
      setRecaptchaReset((current) => current + 1);
      trackedStart.current = false;
      return;
    }

    const error = (await response.json().catch(() => null)) as { error?: string } | null;
    setState("error");
    setStatusMessage(error?.error || "Your message could not be sent right now. Please call either clinic if your pet needs timely help.");
  }

  return (
    <form className="contact-form contact-message-form" onSubmit={handleSubmit}>
      <Alert tone="warning" role="note">
        <AlertTitle>If your pet needs urgent care, call directly.</AlertTitle>
        <AlertDescription>
          Do not use this form for urgent medical concerns, trouble breathing, injury, sudden behavior changes, or same-day emergencies.
        </AlertDescription>
      </Alert>

      {errors.length > 0 && (
        <Alert tone="danger" role="alert">
          <AlertTitle>Please review the form</AlertTitle>
          {errors.map((error) => <AlertDescription key={error}>{error}</AlertDescription>)}
        </Alert>
      )}

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <Label htmlFor="contact-reason">What can we help with?</Label>
          <span className="contact-field-helper">Choose the closest match so your message reaches the right team.</span>
          <ContactSelect
            id="contact-reason"
            value={form.reason}
            options={messageReasons}
            placeholder="What can we help with?"
            onChange={(value) => updateField("reason", value)}
          />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-location">Preferred location</Label>
          <span className="contact-field-helper">Pick the clinic you normally visit, or choose Not sure.</span>
          <ContactSelect
            id="contact-location"
            value={form.location}
            options={locationOptions}
            placeholder="Choose a location"
            onChange={(value) => updateField("location", value)}
          />
        </div>
      </div>

      <Separator />

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input id="contact-phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" autoComplete="tel" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-pet-name">Pet name</Label>
          <Input id="contact-pet-name" value={form.petName} onChange={(event) => updateField("petName", event.target.value)} />
        </div>
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={7} />
      </div>

      <label className="hp-field" aria-hidden="true">
        Leave this field blank
        <Input value={form.company} onChange={(event) => updateField("company", event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>

      <RecaptchaField value={recaptchaToken} onChange={setRecaptchaToken} resetSignal={recaptchaReset} />

      <div className="form-actions">
        <ShadButton type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending..." : "Send Message"}
        </ShadButton>
      </div>

      {statusMessage && (
        <Alert tone={state === "success" ? "success" : state === "error" ? "danger" : "default"} role={state === "error" ? "alert" : "status"}>
          <AlertTitle>{state === "success" ? "Message sent" : state === "error" ? "Message not sent" : "Update"}</AlertTitle>
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
