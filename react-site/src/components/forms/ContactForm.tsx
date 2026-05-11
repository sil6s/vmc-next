"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    const response = await fetch("/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setState("success");
      setMessage("Thanks. Your message has been received. Our team will follow up as soon as possible.");
      form.reset();
      return;
    }

    const error = (await response.json().catch(() => null)) as { error?: string } | null;
    setState("error");
    setMessage(error?.error || "Something went wrong. Please call either clinic if your pet needs timely help.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" required type="email" autoComplete="email" />
        </label>
        <label>
          Phone
          <input name="phone" required type="tel" autoComplete="tel" />
        </label>
        <label>
          Preferred location
          <select name="location" required defaultValue="">
            <option value="" disabled>
              Choose a location
            </option>
            <option>Fort Thomas</option>
            <option>Independence</option>
            <option>No preference</option>
          </select>
        </label>
      </div>
      <label>
        How can we help?
        <textarea name="message" required minLength={10} rows={6} />
      </label>
      <label className="hp-field" aria-hidden="true">
        Leave this field blank
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {message && <p className={`form-status ${state}`} role="status">{message}</p>}
    </form>
  );
}
