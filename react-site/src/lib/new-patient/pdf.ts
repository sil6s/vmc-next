import type { NewPatientRequest } from "./schema";

const authorizationText =
  "Financial & Treatment Authorization\n\nI, the undersigned owner or authorized agent of the above admitted patient, hereby authorize the doctors of Veterinary Medical Center of Independence / Ft Thomas to administer such treatment as is necessary and to perform procedures therapeutically and/or diagnostically. I further understand that no guarantee of successful treatment is made. I also assume financial responsibility for all charges incurred, and agree to pay all such charges at the time of release. I understand that unpaid balances over 30 days are subject to a monthly 1.5% finance charge.\n\nPayment is expected at the time services are rendered.";

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
  if (value.startsWith("data:image")) return "Drawn signature captured electronically.";
  return value || "Not provided";
}

function textLines(data: NewPatientRequest, uploadedFileNames: string[]) {
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  return [
    "Veterinary Medical Center",
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

export function generateNewPatientPdf(data: NewPatientRequest, uploadedFileNames: string[]) {
  const pages = paginate(textLines(data, uploadedFileNames));
  const objects: string[] = [];
  const pageRefs: number[] = [];

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  for (const pageLines of pages) {
    const pageObjectNumber = objects.length + 1;
    const contentObjectNumber = pageObjectNumber + 1;
    pageRefs.push(pageObjectNumber);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`);

    const text = pageLines
      .map((line, index) => {
        const y = 742 - index * 15;
        const isHeading = line && !line.includes(":") && line.length < 44;
        const font = isHeading ? "/F2 11 Tf" : "/F1 9.5 Tf";
        return `BT ${font} 54 ${y} Td (${escapePdf(line)}) Tj ET`;
      })
      .join("\n");
    const footer = `BT /F1 8 Tf 54 34 Td (${escapePdf(`Veterinary Medical Center | Page ${pages.indexOf(pageLines) + 1} of ${pages.length}`)}) Tj ET`;
    const stream = `${text}\n${footer}`;
    objects.push(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
  }

  objects[1] = `<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

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
