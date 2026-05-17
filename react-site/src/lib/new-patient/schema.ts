import { z } from "zod";

export const visitReasons = ["Wellness exam", "Vaccines", "Sick visit", "Dental care", "Surgery consultation", "New pet visit", "Other"] as const;
export const appointmentTiming = ["As soon as available", "This week", "Next week", "Specific date preferred"] as const;
export const timeOfDayOptions = ["Morning", "Afternoon", "No preference"] as const;
export const locationOptions = ["Fort Thomas", "Independence", "No preference"] as const;
export const clientTypeOptions = ["New client", "Existing client"] as const;
export const speciesOptions = ["Dog", "Cat"] as const;
export const genderOptions = ["Male", "Neutered Male", "Female", "Spayed Female"] as const;
export const indoorOutdoorOptions = ["Indoor", "Outdoor", "Both"] as const;

const requiredText = z.string().trim().min(1, "This field is required.");
const phone = z.string().trim().min(7, "Enter a valid phone number.");

export const newPatientRequestSchema = z.object({
  clientType: z.enum(clientTypeOptions),
  preferredLocation: z.enum(locationOptions),
  reasonForVisit: z.enum(visitReasons),
  preferredTiming: z.enum(appointmentTiming),
  preferredDate: z.string().trim(),
  preferredTimeOfDay: z.enum(timeOfDayOptions),
  schedulingNotes: z.string().trim(),

  ownerFirstName: requiredText,
  ownerLastName: requiredText,
  phone,
  email: z.string().trim().email("Enter a valid email address."),
  streetAddress: requiredText,
  addressLine2: z.string().trim(),
  city: requiredText,
  state: requiredText,
  zipCode: requiredText,
  driversLicense: z.string().trim(),
  coOwnerName: z.string().trim(),
  coOwnerPhone: z.string().trim(),
  ownerEmployer: requiredText,
  ownerEmployerPhone: phone,
  coOwnerEmployer: z.string().trim(),
  coOwnerEmployerPhone: z.string().trim(),
  alternativePhone: z.string().trim(),

  petName: requiredText,
  ageOrDateOfBirth: requiredText,
  species: z.enum(speciesOptions),
  gender: z.enum(genderOptions),
  breed: requiredText,
  colorMarkings: requiredText,
  indoorOutdoor: z.enum(indoorOutdoorOptions),
  microchipNumber: z.string().trim(),
  vaccinationHistory: requiredText,
  referralSource: requiredText,

  authorizationConsent: z.literal(true, { error: "Authorization consent is required." }),
  digitalSignature: requiredText,
  dateSigned: requiredText,
  finalConfirmation: z.literal(true, { error: "Please confirm the information is accurate." })
}).refine(
  (value) => value.preferredTiming !== "Specific date preferred" || Boolean(value.preferredDate),
  { path: ["preferredDate"], message: "Choose a preferred date." }
);

export type NewPatientRequest = z.infer<typeof newPatientRequestSchema>;

export const newPatientDefaults: NewPatientRequest = {
  clientType: "New client",
  preferredLocation: "No preference",
  reasonForVisit: "Wellness exam",
  preferredTiming: "As soon as available",
  preferredDate: "",
  preferredTimeOfDay: "No preference",
  schedulingNotes: "",
  ownerFirstName: "",
  ownerLastName: "",
  phone: "",
  email: "",
  streetAddress: "",
  addressLine2: "",
  city: "",
  state: "KY",
  zipCode: "",
  driversLicense: "",
  coOwnerName: "",
  coOwnerPhone: "",
  ownerEmployer: "",
  ownerEmployerPhone: "",
  coOwnerEmployer: "",
  coOwnerEmployerPhone: "",
  alternativePhone: "",
  petName: "",
  ageOrDateOfBirth: "",
  species: "Dog",
  gender: "Male",
  breed: "",
  colorMarkings: "",
  indoorOutdoor: "Indoor",
  microchipNumber: "",
  vaccinationHistory: "",
  referralSource: "",
  authorizationConsent: false as true,
  digitalSignature: "",
  dateSigned: new Date().toISOString().slice(0, 10),
  finalConfirmation: false as true
};

export const allowedRecordTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export const maxRecordFileSize = 8 * 1024 * 1024;
export const maxRecordUploadTotal = 18 * 1024 * 1024;
