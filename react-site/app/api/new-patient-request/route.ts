import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { ensureSettingsTables, getPool, hasDatabase } from "@/lib/settings/db";
import { allowedRecordTypes, maxRecordFileSize, maxRecordUploadTotal, newPatientRequestSchema } from "@/lib/new-patient/schema";
import { generateNewPatientPdf } from "@/lib/new-patient/pdf";
import { hasPrivateUploadStorage, safeObjectSegment, uploadPrivateObjects } from "@/lib/new-patient/r2-storage";
import { sendEmail } from "@/lib/email/send-email";

function htmlEscape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function brandedEmail(title: string, body: string) {
  return `
    <div style="margin:0;background:#f7f2ea;padding:28px;font-family:Arial,sans-serif;color:#211b1a">
      <div style="max-width:680px;margin:0 auto;background:#fffdf9;border:1px solid #eadfd2;border-radius:10px;overflow:hidden">
        <div style="padding:22px 26px;background:#a91b1b;color:#fff">
          <div style="font-family:Georgia,serif;font-size:28px;font-weight:700">Veterinary Medical Center</div>
          <div style="font-size:13px;margin-top:5px">Fort Thomas & Independence, Kentucky</div>
        </div>
        <div style="padding:26px">
          <h1 style="font-family:Georgia,serif;font-size:30px;line-height:1.1;margin:0 0 14px;color:#211b1a">${htmlEscape(title)}</h1>
          ${body}
        </div>
      </div>
    </div>
  `;
}

async function uploadBuffer(file: File) {
  return Buffer.from(await file.arrayBuffer());
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  if (typeof formData.get("company") === "string" && String(formData.get("company")).trim()) {
    return NextResponse.json({ ok: true });
  }

  const rawPayload = formData.get("payload");
  if (typeof rawPayload !== "string") {
    return NextResponse.json({ error: "Missing form data." }, { status: 400 });
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawPayload) as unknown;
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }
  const parsed = newPatientRequestSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please review the required fields.", details: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  const files = formData.getAll("records").filter((item): item is File => item instanceof File && item.size > 0);
  let totalSize = 0;
  for (const file of files) {
    totalSize += file.size;
    if (!allowedRecordTypes.includes(file.type) || file.size > maxRecordFileSize || totalSize > maxRecordUploadTotal) {
      return NextResponse.json({ error: "One or more uploaded records has an unsupported file type or is too large." }, { status: 422 });
    }
  }

  const submission = parsed.data;
  const submissionId = randomUUID();
  const uploadedFileNames = files.map((file) => file.name);
  const pdf = generateNewPatientPdf(submission, uploadedFileNames);
  const pdfAttachment = {
    filename: `new-patient-request-${submission.petName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "pet"}.pdf`,
    content: pdf.toString("base64")
  };
  const uploadBuffers = await Promise.all(files.map(uploadBuffer));
  const uploadAttachments = files.map((file, index) => ({
    filename: file.name,
    content: uploadBuffers[index].toString("base64")
  }));
  const attachments = [pdfAttachment, ...uploadAttachments];
  const storagePrefix = `new-patient-submissions/${new Date().toISOString().slice(0, 10)}/${submissionId}`;
  const storedObjects = await uploadPrivateObjects([
    {
      key: `${storagePrefix}/${safeObjectSegment(pdfAttachment.filename)}`,
      filename: pdfAttachment.filename,
      contentType: "application/pdf",
      body: pdf
    },
    ...files.map((file, index) => ({
      key: `${storagePrefix}/records/${index + 1}-${safeObjectSegment(file.name)}`,
      filename: file.name,
      contentType: file.type || "application/octet-stream",
      body: uploadBuffers[index]
    }))
  ]);

  if (hasDatabase()) {
    await ensureSettingsTables();
    await getPool().query(
      `insert into new_patient_submissions (id, owner_email, owner_name, pet_name, preferred_location, reason_for_visit, payload, uploaded_file_names, uploaded_file_objects)
       values ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9::jsonb)`,
      [
        submissionId,
        submission.email,
        `${submission.ownerFirstName} ${submission.ownerLastName}`,
        submission.petName,
        submission.preferredLocation,
        submission.reasonForVisit,
        JSON.stringify(submission),
        uploadedFileNames,
        JSON.stringify(storedObjects)
      ]
    );
    await getPool().query(
      `insert into activity_log (user_email, action, details, status, section, setting_key, new_value)
       values ($1, 'New patient request submitted', $2, 'success', 'new-patients', 'submission', $3::jsonb)`,
      [
        submission.email,
        `${submission.petName} - ${submission.ownerLastName}`,
        JSON.stringify({
          submissionId,
          preferredLocation: submission.preferredLocation,
          privateStorageEnabled: hasPrivateUploadStorage(),
          storedObjectCount: storedObjects.length
        })
      ]
    );
  }

  const clinicSubject = `New Patient Request: ${submission.petName} - ${submission.ownerLastName}`;
  const clinicText = [
    `Preferred location: ${submission.preferredLocation}`,
    `Requested timing: ${submission.preferredTiming}${submission.preferredDate ? ` (${submission.preferredDate})` : ""}`,
    `Owner: ${submission.ownerFirstName} ${submission.ownerLastName}`,
    `Pet: ${submission.petName}`,
    `Phone: ${submission.phone}`,
    `Email: ${submission.email}`,
    `Reason: ${submission.reasonForVisit}`,
    `Notes: ${submission.schedulingNotes || "None"}`,
    `Uploaded records: ${uploadedFileNames.length ? uploadedFileNames.join(", ") : "None"}`,
    `Private storage: ${storedObjects.length ? `${storedObjects.length} file(s) stored in R2` : "Not configured or no files stored"}`,
    "",
    "PDF summary is attached."
  ].join("\n");
  const clinicHtml = brandedEmail(
    clinicSubject,
    `<p><strong>Preferred location:</strong> ${htmlEscape(submission.preferredLocation)}</p>
     <p><strong>Requested timing:</strong> ${htmlEscape(submission.preferredTiming)}${submission.preferredDate ? ` (${htmlEscape(submission.preferredDate)})` : ""}</p>
     <p><strong>Owner:</strong> ${htmlEscape(submission.ownerFirstName)} ${htmlEscape(submission.ownerLastName)}</p>
     <p><strong>Pet:</strong> ${htmlEscape(submission.petName)}</p>
     <p><strong>Phone:</strong> ${htmlEscape(submission.phone)}</p>
     <p><strong>Email:</strong> ${htmlEscape(submission.email)}</p>
     <p><strong>Reason:</strong> ${htmlEscape(submission.reasonForVisit)}</p>
     <p><strong>Notes:</strong> ${htmlEscape(submission.schedulingNotes || "None")}</p>
     <p><strong>Uploaded records:</strong> ${uploadedFileNames.length ? htmlEscape(uploadedFileNames.join(", ")) : "None"}</p>
     <p><strong>Private storage:</strong> ${storedObjects.length ? `${storedObjects.length} file(s) stored in R2.` : "Not configured or no files stored."}</p>
     <p>The signed PDF summary is attached.</p>`
  );

  const clientSubject = "We received your Veterinary Medical Center new patient request";
  const clientText =
    `Thank you for submitting your new patient request for Veterinary Medical Center. Our team will review your information and follow up as needed to help schedule your visit.\n\n` +
    `A copy of your completed registration is attached for your records. If you find previous health records, vaccine records, or other documents later, no worries. You can reply directly to this email and attach them whenever you have them.\n\n` +
    `Requested location: ${submission.preferredLocation}\nPet: ${submission.petName}\n\nFort Thomas: (859) 442-4420\nIndependence: (859) 356-2242`;
  const clientHtml = brandedEmail(
    "We received your new patient request",
    `<p>Thank you for submitting your new patient request for Veterinary Medical Center. Our team will review your information and follow up as needed to help schedule your visit.</p>
     <p>A copy of your completed registration is attached for your records. If you find previous health records, vaccine records, or other documents later, no worries. You can reply directly to this email and attach them whenever you have them.</p>
     <p><strong>Requested location:</strong> ${htmlEscape(submission.preferredLocation)}<br /><strong>Pet:</strong> ${htmlEscape(submission.petName)}</p>
     <p><strong>Fort Thomas:</strong> (859) 442-4420<br /><strong>Independence:</strong> (859) 356-2242</p>`
  );

  try {
    const clinicEmail = await sendEmail({
      to: process.env.CONTACT_EMAIL_TO || "information@nky.vet",
      subject: clinicSubject,
      html: clinicHtml,
      text: clinicText,
      attachments
    });
    const clientEmail = await sendEmail({
      to: submission.email,
      subject: clientSubject,
      html: clientHtml,
      text: clientText,
      attachments: [pdfAttachment]
    });
    return NextResponse.json({
      ok: true,
      submissionId,
      emailSkipped: clinicEmail.skipped && clientEmail.skipped,
      emailProvider: clinicEmail.provider !== "none" ? clinicEmail.provider : clientEmail.provider,
      storedObjectCount: storedObjects.length
    });
  } catch {
    return NextResponse.json({ error: "Your request was saved, but email delivery failed. Please call either clinic." }, { status: 502 });
  }
}
