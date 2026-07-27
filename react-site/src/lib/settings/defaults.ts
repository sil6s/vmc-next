import { site } from "@/data/site";
import type {
  AnnouncementSettings,
  BusinessHour,
  DashboardSettings,
  DayName,
  ExternalLinks,
  LiveChatSettings,
  ManagedLocation,
  StaffSettings,
  QuickControls,
  SeoSettings
} from "./types";
import { formatClinicTime } from "@/lib/time-format";

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
  onlinePortalUrl: "/patient-portal-online-booking/",
  pharmacyUrl: "https://nky-vet.ourvet.com/pet/",
  bookAppointmentUrl: "/book-appointment/",
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
  defaultSeoTitle: "Veterinary Medical Centers | Fort Thomas & Independence KY Vet",
  defaultMetaDescription:
    "Trusted Northern Kentucky vet for dogs and cats. Fear-Free visits and thoughtful care in Fort Thomas and Independence.",
  defaultOpenGraphImageUrl: "/images/vmc-social-media.jpg",
  localBusinessSchemaPhone: site.locations[0].tel,
  localBusinessSchemaAddress: "2000 Memorial Parkway, Fort Thomas, KY 41075",
  sameAsSocialLinks: [],
  sitewideCtaLabel: "Book Appointment",
  sitewideCtaUrl: "/book-appointment/"
};

export const defaultQuickControls: QuickControls = {
  liveChatEnabled: true,
  announcementEnabled: false,
  emergencyAlertMode: false,
  websiteBookingButton: true
};

export const defaultStaffSettings: StaffSettings = {
  sectionEyebrow: "Meet Your Vet Team",
  sectionTitle: "Meet the veterinarians behind your pet’s care",
  sectionIntro:
    "Our doctors combine years of clinical experience with a practical, relationship-based approach to veterinary medicine. We take time to explain what we find, answer your questions, and help you make confident decisions for your pet.",
  staffEyebrow: "The Whole Team",
  staffTitle: "People who love what they do.",
  staffIntro:
    "From the front desk to the treatment room, every person on the VMC team is here because they genuinely care about animals.",
  doctors: [
    {
      id: "kristi-baker",
      name: "Dr. Kristi Baker",
      role: "Practice Owner & Veterinarian",
      bio:
        "Dr. Kristi brings more than two decades of veterinary experience to pets and families across Northern Kentucky. Her background includes general practice, emergency veterinary medicine, and long-term leadership at Veterinary Medical Centers of Independence and Veterinary Medical Centers of Fort Thomas. She is known for combining practical medical guidance with a calm, approachable style that helps pet owners understand their options and feel confident about next steps.",
      imageUrl:
        "https://cdn.sanity.io/images/zk507aly/production/3f868e8d10d91a3688f4b171dedb29def4fc73ca-1122x1402.jpg?w=1100&h=620&fit=crop&auto=format",
      imageAlt: "Dr. Kristi Baker, practice owner and veterinarian at Veterinary Medical Centers",
      education: [
        "Ross University School of Veterinary Medicine, Doctorate Veterinary Medicine, 2000 to 2003",
        "Purdue University, Clinical Rotation, Veterinary Medicine, 2003 to 2004"
      ],
      isVisible: true
    },
    {
      id: "becky-golatzki",
      name: "Dr. Becky Golatzki",
      role: "Veterinarian",
      bio:
        "Dr. Golatzki supports the same thoughtful standard of care across wellness visits, sick pet appointments, preventive medicine, and client education. Her approach reflects the VMC commitment to clear communication, practical recommendations, and comfort-focused veterinary visits for dogs and cats.",
      imageUrl: "",
      imageAlt: "Dr. Becky Golatzki, veterinarian at Veterinary Medical Centers",
      education: ["Doctor of Veterinary Medicine"],
      isVisible: true
    }
  ],
  staffMembers: ["Cara", "April", "Jess", "Taiyler", "Kari", "Kendall", "Josh", "Megan", "Sydney", "Kelsie", "Sara"].map((name) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    role: "VMC Team",
    bio: "A caring member of the Veterinary Medical Centers team.",
    imageUrl: "",
    imageAlt: `${name}, Veterinary Medical Centers team member`,
    isVisible: true
  }))
};

export const defaultLocations: ManagedLocation[] = site.locations.map((location, index) => ({
  id: location.id,
  clinicName: `Veterinary Medical Centers of ${location.name}`,
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
  staff: defaultStaffSettings,
  lastUpdatedAt: null
};

export function formatBusinessHour(hour: BusinessHour) {
  if (!hour.isOpen) {
    return `${hour.day}: ${hour.note || "Closed"}`;
  }

  const range = hour.openTime && hour.closeTime ? `${formatClinicTime(hour.openTime)} - ${formatClinicTime(hour.closeTime)}` : "Open";
  return `${hour.day}: ${hour.note ? `${hour.note} (${range})` : range}`;
}

export function formatPhoneForTel(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) {
    return "";
  }
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}
