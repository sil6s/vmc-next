import { randomUUID } from "node:crypto";

export type EmailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

export type SendEmailInput = {
  to: string;
  from?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: EmailAttachment[];
};

type SendEmailResult = {
  provider: "gmail" | "resend" | "none";
  skipped: boolean;
};

function hasGmailConfig() {
  return Boolean(
    (process.env.GMAIL_CLIENT_ID || process.env.GOOGLE_CLIENT_ID) &&
      (process.env.GMAIL_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET) &&
      process.env.GMAIL_REFRESH_TOKEN
  );
}

function encodeHeader(value: string) {
  return /^[\x00-\x7F]*$/.test(value) ? value : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function base64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function wrapBase64(value: string) {
  return value.match(/.{1,76}/g)?.join("\r\n") || value;
}

function buildMimeMessage({ to, from, replyTo, subject, text, html, attachments = [] }: SendEmailInput) {
  const mixedBoundary = `mixed-${randomUUID()}`;
  const alternativeBoundary = `alt-${randomUUID()}`;
  const safeFrom = sanitizeHeader(from || process.env.CONTACT_EMAIL_FROM || process.env.GMAIL_SEND_AS || process.env.GMAIL_USER_ID || "");
  const headers = [
    `From: ${safeFrom}`,
    `To: ${sanitizeHeader(to)}`,
    replyTo ? `Reply-To: ${sanitizeHeader(replyTo)}` : "",
    `Subject: ${encodeHeader(sanitizeHeader(subject))}`,
    "MIME-Version: 1.0"
  ].filter(Boolean);

  const alternativePart = [
    `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
    "",
    `--${alternativeBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    text,
    `--${alternativeBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    html || text.replace(/\n/g, "<br />"),
    `--${alternativeBoundary}--`
  ].join("\r\n");

  if (!attachments.length) {
    return [...headers, ...alternativePart.split("\r\n")].join("\r\n");
  }

  const parts = [
    ...headers,
    `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`,
    "",
    `--${mixedBoundary}`,
    alternativePart
  ];

  for (const attachment of attachments) {
    const contentType = attachment.contentType || "application/octet-stream";
    const filename = sanitizeHeader(attachment.filename);
    parts.push(
      `--${mixedBoundary}`,
      `Content-Type: ${contentType}; name="${filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${filename}"`,
      "",
      wrapBase64(attachment.content)
    );
  }

  parts.push(`--${mixedBoundary}--`);
  return parts.join("\r\n");
}

async function getGmailAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GMAIL_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
      refresh_token: process.env.GMAIL_REFRESH_TOKEN || "",
      grant_type: "refresh_token"
    })
  });

  if (!response.ok) {
    throw new Error("Gmail access token refresh failed.");
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Gmail access token response was missing an access token.");
  }
  return data.access_token;
}

async function sendGmailEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const accessToken = await getGmailAccessToken();
  const userId = process.env.GMAIL_USER_ID || "me";
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(userId)}/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      raw: base64Url(buildMimeMessage(input))
    })
  });

  if (!response.ok) {
    throw new Error("Gmail API email delivery failed.");
  }

  return { provider: "gmail", skipped: false };
}

async function sendResendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!process.env.RESEND_API_KEY) {
    return { provider: "none", skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: input.to,
      from: input.from || process.env.CONTACT_EMAIL_FROM || "website@vmcnky.com",
      reply_to: input.replyTo,
      subject: input.subject,
      html: input.html,
      text: input.text,
      attachments: input.attachments || []
    })
  });

  if (!response.ok) {
    throw new Error("Resend email delivery failed.");
  }

  return { provider: "resend", skipped: false };
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (hasGmailConfig()) {
    return sendGmailEmail({
      ...input,
      from: input.from || process.env.GMAIL_SEND_AS || process.env.CONTACT_EMAIL_FROM
    });
  }

  return sendResendEmail(input);
}
