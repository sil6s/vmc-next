type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type RecaptchaResult = {
  ok: boolean;
  error?: string;
};

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

function clientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") || undefined;
}

export async function verifyRecaptchaToken(token: unknown, request: Request, expectedAction?: string): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY || process.env.GOOGLE_RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "Spam protection is not configured." };
    }

    return { ok: true };
  }

  if (typeof token !== "string" || !token.trim()) {
    return { ok: false, error: "Please complete the spam protection check." };
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim()
  });
  const remoteip = clientIp(request);
  if (remoteip) body.set("remoteip", remoteip);

  let data: RecaptchaResponse;
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    data = (await response.json()) as RecaptchaResponse;
  } catch {
    return { ok: false, error: "Spam protection could not be verified. Please try again." };
  }

  if (!data.success) {
    return { ok: false, error: "Spam protection failed. Please try again." };
  }

  if (typeof data.score === "number") {
    const minimumScore = Number(process.env.RECAPTCHA_MIN_SCORE || "0.5");
    if (data.score < minimumScore) {
      return { ok: false, error: "Spam protection flagged this submission. Please call the clinic if you need help." };
    }
  }

  if (expectedAction && data.action && data.action !== expectedAction) {
    return { ok: false, error: "Spam protection action mismatch. Please refresh and try again." };
  }

  return { ok: true };
}
