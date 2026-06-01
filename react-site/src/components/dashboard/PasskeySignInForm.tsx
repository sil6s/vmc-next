"use client";

import { useRef, useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { createClient } from "@/lib/supabase/client";

export function PasskeySignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "verifying" | "error">("idle");
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

  const handleCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = code.replace(/\s/g, "");
    if (!trimmed) return;

    setState("verifying");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: trimmed,
      type: "email"
    });

    if (error) {
      setState("sent");
      setErrorMessage("That code didn't work. Check it and try again, or request a new one.");
    } else {
      window.location.href = callbackUrl;
    }
  };

  if (state === "sent" || state === "verifying") {
    return (
      <div className="admin-signin-sent">
        <Mail aria-hidden="true" size={28} />
        <h2>Check your email</h2>
        <p>
          We sent a code to <strong>{email}</strong>. Enter it below or click the link in the email.
        </p>

        <form className="admin-signin-code-form" onSubmit={handleCodeSubmit}>
          <label className="admin-signin-label" htmlFor="admin-otp-code">
            <span>6-digit code</span>
            <Input
              id="admin-otp-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              disabled={state === "verifying"}
              autoFocus
            />
          </label>

          {errorMessage && (
            <p className="admin-signin-error" role="alert">{errorMessage}</p>
          )}

          <button
            className="admin-signin-button"
            type="submit"
            disabled={state === "verifying" || code.replace(/\s/g, "").length < 6}
          >
            {state === "verifying" ? "Verifying…" : "Continue"}
          </button>
        </form>

        <button
          className="admin-signin-resend"
          type="button"
          onClick={() => { setState("idle"); setCode(""); setErrorMessage(""); }}
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
    </form>
  );
}
