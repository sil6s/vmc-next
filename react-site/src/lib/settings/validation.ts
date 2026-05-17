import { z } from "zod";
import { dayNames } from "./defaults";

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => !value || value.startsWith("/") || /^https?:\/\//i.test(value), "Use a full https:// URL or a site path that starts with /.");

const externalUrl = z
  .string()
  .trim()
  .refine((value) => !value || /^https?:\/\//i.test(value), "Use a full https:// URL.");

const phone = z.string().trim().min(7, "Enter a phone number.");

export const liveChatSchema = z.object({
  liveChatEnabled: z.boolean(),
  liveChatProvider: z.literal("Otto"),
  liveChatPlacement: z.enum(["floating", "inline"]),
  liveChatStatusLabel: z.enum(["Active", "Disabled"])
});

export const businessHourSchema = z.object({
  day: z.enum(dayNames),
  isOpen: z.boolean(),
  openTime: z.string().trim(),
  closeTime: z.string().trim(),
  note: z.string().trim().max(120)
});

export const locationSchema = z.object({
  id: z.enum(["fort-thomas", "independence"]),
  clinicName: z.string().trim().min(2),
  streetAddress: z.string().trim().min(4),
  city: z.string().trim().min(2),
  state: z.string().trim().min(2).max(2),
  zipCode: z.string().trim().min(5),
  mainPhone: phone,
  appointmentPhone: z.string().trim(),
  email: z.string().trim().email(),
  googleMapsUrl: externalUrl,
  mapEmbedUrl: externalUrl,
  emergencyMessage: z.string().trim().max(500),
  hours: z.array(businessHourSchema).length(7)
});

export const locationsSchema = z.array(locationSchema).min(1);

export const externalLinksSchema = z.object({
  onlinePortalUrl: externalUrl.min(1, "Online portal URL is required."),
  pharmacyUrl: externalUrl.min(1, "Pharmacy URL is required."),
  bookAppointmentUrl: optionalUrl,
  newPatientFormUrl: optionalUrl,
  existingClientFormUrl: optionalUrl,
  smsPrivacyPolicyUrl: optionalUrl,
  facebookUrl: optionalUrl,
  instagramUrl: optionalUrl,
  googleBusinessProfileUrl: optionalUrl
});

export const announcementSchema = z.object({
  announcementEnabled: z.boolean(),
  announcementTitle: z.string().trim().max(90),
  announcementMessage: z.string().trim().max(240),
  announcementLinkText: z.string().trim().max(40),
  announcementLinkUrl: optionalUrl,
  announcementType: z.enum(["info", "urgent", "holiday", "weather", "closure"])
}).refine(
  (value) => !value.announcementEnabled || Boolean(value.announcementTitle && value.announcementMessage),
  "Enabled announcements need a title and message."
);

export const seoSchema = z.object({
  defaultSeoTitle: z.string().trim().min(10).max(90),
  defaultMetaDescription: z.string().trim().min(30).max(180),
  defaultOpenGraphImageUrl: optionalUrl,
  localBusinessSchemaPhone: phone,
  localBusinessSchemaAddress: z.string().trim().min(8),
  sameAsSocialLinks: z.array(externalUrl).max(8),
  sitewideCtaLabel: z.string().trim().min(2).max(40),
  sitewideCtaUrl: optionalUrl
});

export const quickControlsSchema = z.object({
  liveChatEnabled: z.boolean(),
  announcementEnabled: z.boolean(),
  emergencyAlertMode: z.boolean(),
  websiteBookingButton: z.boolean()
});
