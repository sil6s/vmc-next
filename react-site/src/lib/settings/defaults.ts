import { site } from "@/data/site";
import type {
  AnnouncementSettings,
  BusinessHour,
  DashboardSettings,
  DayName,
  ExternalLinks,
  LiveChatSettings,
  ManagedLocation,
  QuickControls,
  SeoSettings
} from "./types";

export const dayNames: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function weekdayHours(note = ""): BusinessHour[] {
  return dayNames.map((day) => {
    const isWeekday = !["Saturday", "Sunday"].includes(day);
    return {
      day,
      isOpen: isWeekday,
      openTime: isWeekday ? "08:00" : "",
      closeTime: isWeekday ? "18:00" : "",
      note: isWeekday ? note : "Closed"
    };
  });
}

export const defaultLiveChatSettings: LiveChatSettings = {
  liveChatEnabled: true,
  liveChatProvider: "Otto",
  liveChatPlacement: "floating",
  liveChatStatusLabel: "Active"
};

export const defaultExternalLinks: ExternalLinks = {
  onlinePortalUrl: "https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2",
  pharmacyUrl: "https://nky-vet.ourvet.com/pet/",
  bookAppointmentUrl: "/contact/",
  newPatientFormUrl: "/new-patient-registration-form/",
  existingClientFormUrl: "",
  smsPrivacyPolicyUrl: "/privacy-policy/",
  facebookUrl: "",
  instagramUrl: "",
  googleBusinessProfileUrl: ""
};

export const defaultAnnouncementSettings: AnnouncementSettings = {
  announcementEnabled: false,
  announcementTitle: "",
  announcementMessage: "",
  announcementLinkText: "",
  announcementLinkUrl: "",
  announcementType: "info"
};

export const defaultSeoSettings: SeoSettings = {
  defaultSeoTitle: "Veterinary Medical Center | Fort Thomas & Independence KY Vet",
  defaultMetaDescription:
    "Trusted Northern Kentucky vet for dogs and cats. Fear-Free visits and thoughtful care in Fort Thomas and Independence.",
  defaultOpenGraphImageUrl: "/images/vmc-social-media.jpg",
  localBusinessSchemaPhone: site.locations[0].tel,
  localBusinessSchemaAddress: "2000 Memorial Parkway, Fort Thomas, KY 41075",
  sameAsSocialLinks: [],
  sitewideCtaLabel: "Book Appointment",
  sitewideCtaUrl: "/contact/"
};

export const defaultQuickControls: QuickControls = {
  liveChatEnabled: true,
  announcementEnabled: false,
  emergencyAlertMode: false,
  websiteBookingButton: true
};

export const defaultLocations: ManagedLocation[] = site.locations.map((location, index) => ({
  id: location.id,
  clinicName: `Veterinary Medical Center of ${location.name}`,
  streetAddress: location.street,
  city: location.city,
  state: location.state,
  zipCode: location.zip,
  mainPhone: location.phone,
  appointmentPhone: location.phone,
  email: site.email,
  googleMapsUrl: location.mapUrl,
  mapEmbedUrl: location.mapEmbedUrl,
  emergencyMessage: "For emergencies outside regular hours, contact a 24-hour emergency veterinary hospital.",
  hours:
    index === 0
      ? weekdayHours().map((hour) => (hour.day === "Saturday" ? { ...hour, note: "Rotating, call ahead" } : hour))
      : weekdayHours()
}));

export const defaultDashboardSettings: DashboardSettings = {
  liveChat: defaultLiveChatSettings,
  locations: defaultLocations,
  externalLinks: defaultExternalLinks,
  announcement: defaultAnnouncementSettings,
  seo: defaultSeoSettings,
  quickControls: defaultQuickControls,
  lastUpdatedAt: null
};

export function formatBusinessHour(hour: BusinessHour) {
  if (!hour.isOpen) {
    return `${hour.day}: ${hour.note || "Closed"}`;
  }

  const range = hour.openTime && hour.closeTime ? `${hour.openTime} - ${hour.closeTime}` : "Open";
  return `${hour.day}: ${hour.note ? `${hour.note} (${range})` : range}`;
}

export function formatPhoneForTel(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) {
    return "";
  }
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}
