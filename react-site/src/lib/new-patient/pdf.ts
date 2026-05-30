import type { NewPatientRequest } from "./schema";
import { formatEasternDateTime } from "@/lib/time-format";

const authorizationText =
  "Financial & Treatment Authorization\n\nI, the undersigned owner or authorized agent of the above admitted patient, hereby authorize the doctors of Veterinary Medical Centers of Independence / Ft Thomas to administer such treatment as is necessary and to perform procedures therapeutically and/or diagnostically. I further understand that no guarantee of successful treatment is made. I also assume financial responsibility for all charges incurred, and agree to pay all such charges at the time of release. I understand that unpaid balances over 30 days are subject to a monthly 1.5% finance charge.\n\nPayment is expected at the time services are rendered.";

function escapePdf(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapLine(value: string, max = 92) {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if (`${current} ${word}`.trim().length > max) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }

  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function signatureSummary(value: string) {
  if (value.startsWith("typed:")) return `Typed signature: ${value.replace(/^typed:/, "")}`;
  if (value.startsWith("data:image/jpeg")) return "Drawn signature captured electronically (JPEG — see signature page).";
  if (value.startsWith("data:image")) return "Drawn signature captured electronically.";
  return value || "Not provided";
}

// ---------------------------------------------------------------------------
// JPEG helpers
// ---------------------------------------------------------------------------

/**
 * Parse JPEG SOF marker to get width and height.
 */
function parseJpegDimensions(buf: Buffer): { w: number; h: number } {
  let i = 2;
  while (i < buf.length - 4) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const segLen = buf.readUInt16BE(i + 2);
    // SOF markers: 0xC0..0xCF except 0xC4 (DHT), 0xC8 (JPG), 0xCC (DAC)
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + segLen;
  }
  return { w: 500, h: 150 };
}

/**
 * Convert a Buffer to a hex-encoded ASCII string (for ASCIIHexDecode in PDF).
 */
function bufferToHex(buf: Buffer): string {
  return buf.toString("hex").toUpperCase() + ">";
}

// ---------------------------------------------------------------------------
// Text content
// ---------------------------------------------------------------------------

function textLines(data: NewPatientRequest, uploadedFileNames: string[]) {
  const submittedAt = formatEasternDateTime(new Date());
  return [
    "Veterinary Medical Centers",
    "New Patient Request and Registration",
    `Submitted: ${submittedAt} Eastern Time`,
    "",
    "Visit Request",
    `Client type: ${data.clientType}`,
    `Preferred location: ${data.preferredLocation}`,
    `Reason for visit: ${data.reasonForVisit}`,
    `Preferred timing: ${data.preferredTiming}`,
    `Preferred date: ${data.preferredDate || "No specific date"}`,
    `Preferred time of day: ${data.preferredTimeOfDay}`,
    `Scheduling notes: ${data.schedulingNotes || "None"}`,
    "",
    "Client Information",
    `Owner: ${data.ownerFirstName} ${data.ownerLastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Address: ${data.streetAddress}${data.addressLine2 ? `, ${data.addressLine2}` : ""}, ${data.city}, ${data.state} ${data.zipCode}`,
    `Driver's License #: ${data.driversLicense || "Not provided"}`,
    `Co-Owner: ${data.coOwnerName || "Not provided"}`,
    `Co-Owner Relationship: ${data.coOwnerRelationship || "Not provided"}`,
    `Co-Owner Phone: ${data.coOwnerPhone || "Not provided"}`,
    `Co-Owner Email: ${data.coOwnerEmail || "Not provided"}`,
    `Co-Owner Permission Level: ${data.coOwnerName ? data.coOwnerPermissionLevel : "Not provided"}`,
    `Co-Owner Decision Authorization: ${data.coOwnerDecisionAuthorization ? "May make medical or financial decisions" : "Not selected"}`,
    `Owner's Employer: ${data.ownerEmployer || "Not provided"}`,
    `Owner Employer's Phone: ${data.ownerEmployerPhone || "Not provided"}`,
    `Co-Owner's Employer: ${data.coOwnerEmployer || "Not provided"}`,
    `Co-Owner Employer's Phone: ${data.coOwnerEmployerPhone || "Not provided"}`,
    `Alternative Phone: ${data.alternativePhone || "Not provided"}`,
    "",
    "Pet Information",
    `Pet's Name: ${data.petName}`,
    `Age / Date of Birth: ${data.ageOrDateOfBirth}`,
    `Species: ${data.species}`,
    `Gender: ${data.gender}`,
    `Breed: ${data.breed}`,
    `Color / Markings: ${data.colorMarkings}`,
    `Primarily Indoor or Outdoor?: ${data.indoorOutdoor}`,
    `Microchip #: ${data.microchipNumber || "Not provided"}`,
    `Vaccination History: ${data.vaccinationHistory}`,
    `Referral Source: ${data.referralSource}`,
    "",
    "Uploaded Records",
    ...(uploadedFileNames.length ? uploadedFileNames.map((name) => `- ${name}`) : ["No files uploaded."]),
    "",
    ...authorizationText.split("\n"),
    "",
    "Authorization",
    "Consent: I have read and agree to the Financial & Treatment Authorization.",
    `Digital Signature: ${signatureSummary(data.digitalSignature)}`,
    `Date Signed: ${data.dateSigned}`,
    "",
    "Clinic Contact",
    "Fort Thomas: (859) 442-4420",
    "Independence: (859) 356-2242",
    "information@nky.vet"
  ];
}

function paginate(lines: string[]) {
  const pages: string[][] = [[]];

  for (const line of lines.flatMap((line) => wrapLine(line))) {
    const current = pages[pages.length - 1];
    if (current.length >= 44) {
      pages.push([]);
    }
    pages[pages.length - 1].push(line);
  }

  return pages;
}

// ---------------------------------------------------------------------------
// PDF generator
// ---------------------------------------------------------------------------

export function generateNewPatientPdf(data: NewPatientRequest, uploadedFileNames: string[]) {
  const pages = paginate(textLines(data, uploadedFileNames));

  // Determine whether we need a JPEG signature page
  const sigValue = data.digitalSignature || "";
  const isJpegSig = sigValue.startsWith("data:image/jpeg");

  // Prepare JPEG data if applicable
  let jpegBuf: Buffer | null = null;
  let jpegDims: { w: number; h: number } = { w: 500, h: 150 };
  let jpegHex = "";
  let jpegHexLen = 0;

  if (isJpegSig) {
    const base64 = sigValue.replace(/^data:image\/jpeg;base64,/, "");
    jpegBuf = Buffer.from(base64, "base64");
    jpegDims = parseJpegDimensions(jpegBuf);
    jpegHex = bufferToHex(jpegBuf);
    jpegHexLen = Buffer.byteLength(jpegHex, "utf8");
  }

  // ---- object array ----
  // We build objects as strings, then assemble the PDF with correct byte offsets.
  // Object numbering (1-based):
  //   1 = Catalog
  //   2 = Pages (patched after we know all page refs)
  //   3 = Font F1 (Helvetica)
  //   4 = Font F2 (Helvetica-Bold)
  //   [5..5+2*N-1] = page + content pairs for text pages
  //   If JPEG: [5+2*N] = XObject image, [5+2*N+1] = sig page, [5+2*N+2] = sig content
  //   (These are filled in after text pages are built.)

  const objects: string[] = [];
  const pageRefs: number[] = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>"); // obj 1
  objects.push(""); // obj 2 — Pages dict, patched later
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"); // obj 3
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"); // obj 4

  // Text pages
  for (const pageLines of pages) {
    const pageObjNum = objects.length + 1;
    const contentObjNum = pageObjNum + 1;
    pageRefs.push(pageObjNum);

    const resources = "<< /Font << /F1 3 0 R /F2 4 0 R >> >>";
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources ${resources} /Contents ${contentObjNum} 0 R >>`
    );

    const text = pageLines
      .map((line, index) => {
        const y = 742 - index * 15;
        const isHeading = line && !line.includes(":") && line.length < 44;
        const font = isHeading ? "/F2 11 Tf" : "/F1 9.5 Tf";
        return `BT ${font} 54 ${y} Td (${escapePdf(line)}) Tj ET`;
      })
      .join("\n");

    const footer = `BT /F1 8 Tf 54 34 Td (${escapePdf(`Veterinary Medical Centers | Page ${pages.indexOf(pageLines) + 1} of ${pages.length + (isJpegSig ? 1 : 0)}`)}) Tj ET`;
    const stream = `${text}\n${footer}`;
    objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
  }

  // JPEG signature page
  if (isJpegSig && jpegBuf) {
    const imgObjNum = objects.length + 1;
    const sigPageObjNum = imgObjNum + 1;
    const sigContentObjNum = sigPageObjNum + 1;

    // Image XObject
    objects.push(
      [
        `<< /Type /XObject /Subtype /Image`,
        `/Width ${jpegDims.w} /Height ${jpegDims.h}`,
        `/ColorSpace /DeviceRGB /BitsPerComponent 8`,
        `/Filter [/ASCIIHexDecode /DCTDecode]`,
        `/Length ${jpegHexLen}`,
        `>>`,
        `stream`,
        jpegHex,
        `endstream`
      ].join("\n")
    );

    pageRefs.push(sigPageObjNum);

    // Render image at ~400pt wide, proportional height, centered at x=106
    const renderW = 400;
    const renderH = Math.round((jpegDims.h / jpegDims.w) * renderW);
    const imgX = (612 - renderW) / 2;
    const imgY = 380; // roughly centered vertically

    const sigStream = [
      `BT /F2 12 Tf 54 742 Td (Veterinary Medical Centers - Digital Signature) Tj ET`,
      `BT /F1 10 Tf 54 720 Td (Signed by: ${escapePdf(data.digitalSignature.startsWith("typed:") ? data.digitalSignature.replace(/^typed:/, "") : "See drawn signature below.")}) Tj ET`,
      `BT /F1 10 Tf 54 700 Td (Date signed: ${escapePdf(data.dateSigned)}) Tj ET`,
      `q ${renderW} 0 0 ${renderH} ${imgX} ${imgY} cm /Img1 Do Q`
    ].join("\n");

    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Img1 ${imgObjNum} 0 R >> >> /Contents ${sigContentObjNum} 0 R >>`
    );
    objects.push(`<< /Length ${Buffer.byteLength(sigStream)} >>\nstream\n${sigStream}\nendstream`);
  }

  // Patch Pages dict
  objects[1] = `<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

  // Assemble PDF with xref table
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "utf8");
}
