"use client";

import { useState } from "react";

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
      <input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" />
      <button type="submit">Subscribe</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
