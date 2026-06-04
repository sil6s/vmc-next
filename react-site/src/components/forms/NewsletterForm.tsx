"use client";

import { useState } from "react";
import { ShadButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export function NewsletterForm({
  emailLabel = "Email address",
  emailPlaceholder = "Your email address",
  subscribeLabel = "Subscribe",
  successMessage = "Thank you. Newsletter integration can be connected later.",
  invalidMessage = "Enter a valid email address."
}: {
  emailLabel?: string;
  emailPlaceholder?: string;
  subscribeLabel?: string;
  successMessage?: string;
  invalidMessage?: string;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(email.includes("@") ? successMessage : invalidMessage);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        {emailLabel}
      </label>
      <Input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={emailPlaceholder} />
      <ShadButton type="submit">{subscribeLabel}</ShadButton>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
