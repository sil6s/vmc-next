"use client";

import { useRef, useState } from "react";
import { KeyRound, Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { createClient } from "@/lib/supabase/client";

export function PasskeySignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const captchaToken = useRef("");

  const redirectTo = typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(callbackUrl)}`
    : `/api/auth/callback?next=${encodeURIComponent(callbackUrl)}`;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;

    setState("sending");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: true,
        ...(captchaToken.current ? { captchaToken: captchaToken.current } : {})
      }
    });

    if (error) {
      setState("error");
      setErrorMessage("Could not send a sign-in link. Check the email address and try again.");
    } else {
      setState("sent");
    }
  };

  if (state === "sent") {
    return (
      <div className="admin-signin-sent">
        <Mail aria-hidden="true" size={28} />
        <h2>Check your email</h2>
        <p>
          A sign-in link was sent to <strong>{email}</strong>. Click it to access the dashboard.
          The link expires in 1 hour.
        </p>
        <button
          className="admin-signin-resend"
          type="button"
          onClick={() => setState("idle")}
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form className="admin-signin-form" onSubmit={handleSubmit}>
      <label className="admin-signin-label" htmlFor="admin-email">
        <span>Admin email address</span>
        <Input
          id="admin-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email webauthn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={state === "sending"}
        />
      </label>

      <TurnstileField onToken={(token) => { captchaToken.current = token; }} />

      {errorMessage && (
        <p className="admin-signin-error" role="alert">{errorMessage}</p>
      )}

      <button
        className="admin-signin-button"
        type="submit"
        disabled={state === "sending" || !email.trim()}
      >
        {state === "sending" ? (
          <>Sending…</>
        ) : (
          <>
            <KeyRound aria-hidden="true" size={17} />
            Sign in
          </>
        )}
      </button>

      <p className="admin-signin-hint">
        <Send aria-hidden="true" size={13} />
        A secure sign-in link will be emailed to you. If your device has a passkey saved for this site, your browser will offer it automatically.
      </p>
    </form>
  );
}
