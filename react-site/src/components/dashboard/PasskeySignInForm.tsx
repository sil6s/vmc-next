"use client";

import { useRef, useState } from "react";
import { AlertCircle, KeyRound, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { createClient } from "@/lib/supabase/client";

const CODE_LENGTH = 8;

export function PasskeySignInForm({ callbackUrl }: { callbackUrl: string }) {
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [state, setState] = useState<"idle" | "sending" | "sent" | "verifying" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const captchaToken = useRef("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(CODE_LENGTH).fill(null));

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

  const submitCode = async (code: string) => {
    setState("verifying");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code,
      type: "email"
    });

    if (error) {
      setState("sent");
      setErrorMessage("That code didn't work — check it or request a new one.");
    } else {
      window.location.href = callbackUrl;
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (digit && newDigits.every(d => d !== "")) {
      submitCode(newDigits.join(""));
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const newDigits = Array(CODE_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) newDigits[i] = pasted[i];
    setDigits(newDigits);
    const nextEmpty = newDigits.findIndex(d => d === "");
    inputRefs.current[nextEmpty === -1 ? CODE_LENGTH - 1 : nextEmpty]?.focus();
    if (newDigits.every(d => d !== "")) submitCode(newDigits.join(""));
  };

  if (state === "sent" || state === "verifying") {
    return (
      <div className="admin-signin-sent">
        <div className="admin-signin-sent-head">
          <span className="admin-signin-sent-icon">
            <Mail aria-hidden="true" size={20} />
          </span>
          <div>
            <h2>Check your email</h2>
            <p className="admin-signin-sent-sub">No password required — just a secure one-time code.</p>
          </div>
        </div>

        <hr className="admin-signin-divider" />

        <p className="admin-signin-sent-desc">
          We sent a code to <strong>{email}</strong> — enter it below or click the link in the email.
        </p>

        <form
          className="admin-signin-code-form"
          onSubmit={(e) => { e.preventDefault(); submitCode(digits.join("")); }}
        >
          <label className="admin-signin-label" htmlFor="admin-otp-0">
            8-digit code
          </label>

          <div className="admin-signin-otp-inputs" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                id={i === 0 ? "admin-otp-0" : undefined}
                className="admin-signin-otp-input"
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleDigitKeyDown(i, e)}
                disabled={state === "verifying"}
                autoFocus={i === 0}
                aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
              />
            ))}
          </div>

          {errorMessage && (
            <p className="admin-signin-error" role="alert">
              <AlertCircle aria-hidden="true" size={14} />
              {errorMessage}
            </p>
          )}

          <button
            className="admin-signin-button"
            type="submit"
            disabled={state === "verifying" || digits.some(d => d === "")}
          >
            {state === "verifying" ? "Verifying…" : "Continue"}
          </button>
        </form>

        <button
          className="admin-signin-resend"
          type="button"
          onClick={() => { setState("idle"); setDigits(Array(CODE_LENGTH).fill("")); setErrorMessage(""); }}
        >
          Wrong address? Use a different email
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
