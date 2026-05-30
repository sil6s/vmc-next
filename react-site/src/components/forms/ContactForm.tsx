"use client";

import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShadButton } from "@/components/ui/Button";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const locationOptions = ["Fort Thomas", "Independence", "Not sure"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  petName: "",
  location: "",
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
  const [turnstileToken, setTurnstileToken] = useState("");
  const [form, setForm] = useState(initialForm);
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

    if (!form.firstName.trim()) nextErrors.push("Please enter your first name.");
    if (!form.lastName.trim()) nextErrors.push("Please enter your last name.");
    if (!form.location) nextErrors.push("Please choose a preferred location.");
    if (!form.email.includes("@")) nextErrors.push("Please enter a valid email address.");
    if (!form.phone.trim()) nextErrors.push("Please enter your phone number.");
    if (form.message.trim().length < 10) nextErrors.push("Please add a message with at least 10 characters.");

    setErrors(nextErrors);
    return nextErrors.length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setState("submitting");
    setStatusMessage("");

    const recaptchaToken = turnstileToken;

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    const combinedMessage = [
      `Preferred location: ${form.location}`,
      `Pet name: ${form.petName || "Not provided"}`,
      "",
      form.message
    ].join("\n");

    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
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
      trackedStart.current = false;
      return;
    }

    const error = (await response.json().catch(() => null)) as { error?: string } | null;
    setState("error");
    setStatusMessage(error?.error || "Your message could not be sent right now. Please call either clinic if your pet needs timely help.");
  }

  return (
    <form className="contact-form contact-message-form" onSubmit={handleSubmit}>
      <h3 className="contact-form-title">Contact form</h3>

      {errors.length > 0 && (
        <Alert tone="danger" role="alert">
          <AlertTitle>Please review the form</AlertTitle>
          {errors.map((error) => <AlertDescription key={error}>{error}</AlertDescription>)}
        </Alert>
      )}

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <Label htmlFor="contact-first-name">First name</Label>
          <Input id="contact-first-name" value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" placeholder="Jane" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-last-name">Last name</Label>
          <Input id="contact-last-name" value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" placeholder="Smith" />
        </div>
      </div>

      <div className="contact-form-grid">
        <div className="contact-form-field">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" placeholder="jane@email.com" />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input id="contact-phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" autoComplete="tel" placeholder="(859) 555-0100" />
        </div>
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-pet-name">Pet&apos;s name</Label>
        <Input id="contact-pet-name" value={form.petName} onChange={(event) => updateField("petName", event.target.value)} placeholder="Biscuit" />
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-location">Preferred location</Label>
        <ContactSelect
          id="contact-location"
          value={form.location}
          options={locationOptions}
          placeholder="Select a clinic"
          onChange={(value) => updateField("location", value)}
        />
      </div>

      <div className="contact-form-field">
        <Label htmlFor="contact-message">How can we help?</Label>
        <Textarea id="contact-message" value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={7} placeholder="Tell us about your pet and how we can help..." />
      </div>

      <label className="hp-field" aria-hidden="true">
        Leave this field blank
        <Input value={form.company} onChange={(event) => updateField("company", event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>

      <TurnstileField onToken={setTurnstileToken} />

      <p className="contact-form-note">This form is not monitored for emergencies. For urgent care, please call us directly.</p>

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
