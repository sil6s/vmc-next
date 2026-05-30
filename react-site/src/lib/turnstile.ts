const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

type TurnstileResult = {
  ok: boolean;
  error?: string;
};

function clientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") || undefined;
}

export async function verifyTurnstileToken(token: unknown, request: Request): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "Spam protection is not configured." };
    }
    return { ok: true };
  }

  if (typeof token !== "string" || !token.trim()) {
    return { ok: false, error: "Please complete the spam protection check." };
  }

  const body = new URLSearchParams({ secret, response: token.trim() });
  const remoteip = clientIp(request);
  if (remoteip) body.set("remoteip", remoteip);

  let data: TurnstileResponse;
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    data = (await response.json()) as TurnstileResponse;
  } catch {
    return { ok: false, error: "Spam protection could not be verified. Please try again." };
  }

  if (!data.success) {
    return { ok: false, error: "Spam protection failed. Please try again." };
  }

  return { ok: true };
}
