import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  message?: unknown;
  company?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (text(payload.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(payload.name);
  const email = text(payload.email);
  const phone = text(payload.phone);
  const location = text(payload.location);
  const message = text(payload.message);

  if (!name || !email.includes("@") || !phone || !location || message.length < 10) {
    return NextResponse.json({ error: "Please complete every required field with valid contact information." }, { status: 422 });
  }

  const emailBody = {
    to: process.env.CONTACT_EMAIL_TO || "information@nky.vet",
    from: process.env.CONTACT_EMAIL_FROM || "website@vmcnky.com",
    subject: `Website inquiry from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Location: ${location}`, "", message].join("\n")
  };

  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Your message could not be sent right now. Please call either clinic." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
