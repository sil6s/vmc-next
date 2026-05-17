export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type BusinessHour = {
  day: DayName;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  note: string;
};

export type ManagedLocation = {
  id: "fort-thomas" | "independence";
  clinicName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  mainPhone: string;
  appointmentPhone: string;
  email: string;
  googleMapsUrl: string;
  mapEmbedUrl: string;
  emergencyMessage: string;
  hours: BusinessHour[];
};

export type LiveChatSettings = {
  liveChatEnabled: boolean;
  liveChatProvider: "Otto";
  liveChatPlacement: "floating" | "inline";
  liveChatStatusLabel: "Active" | "Disabled";
};

export type ExternalLinks = {
  onlinePortalUrl: string;
  pharmacyUrl: string;
  bookAppointmentUrl: string;
  newPatientFormUrl: string;
  existingClientFormUrl: string;
  smsPrivacyPolicyUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  googleBusinessProfileUrl: string;
};

export type AnnouncementSettings = {
  announcementEnabled: boolean;
  announcementTitle: string;
  announcementMessage: string;
  announcementLinkText: string;
  announcementLinkUrl: string;
  announcementType: "info" | "urgent" | "holiday" | "weather" | "closure";
};

export type SeoSettings = {
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  defaultOpenGraphImageUrl: string;
  localBusinessSchemaPhone: string;
  localBusinessSchemaAddress: string;
  sameAsSocialLinks: string[];
  sitewideCtaLabel: string;
  sitewideCtaUrl: string;
};

export type QuickControls = {
  liveChatEnabled: boolean;
  announcementEnabled: boolean;
  emergencyAlertMode: boolean;
  websiteBookingButton: boolean;
};

export type ActivityLogEntry = {
  id: number;
  userEmail: string;
  action: string;
  details: string;
  status: "success" | "info" | "error";
  section: string;
  settingKey: string;
  previousValue: unknown;
  newValue: unknown;
  createdAt: string;
};

export type DashboardSettings = {
  liveChat: LiveChatSettings;
  locations: ManagedLocation[];
  externalLinks: ExternalLinks;
  announcement: AnnouncementSettings;
  seo: SeoSettings;
  quickControls: QuickControls;
  lastUpdatedAt: string | null;
};
