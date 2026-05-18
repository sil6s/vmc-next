"use client";

import { useState } from "react";
import { ShadButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(email.includes("@") ? "Thank you. Newsletter integration can be connected later." : "Enter a valid email address.");
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <Input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" />
      <ShadButton type="submit">Subscribe</ShadButton>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
