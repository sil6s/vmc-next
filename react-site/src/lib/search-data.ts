import { services } from "@/data/services";
import { posts } from "@/data/posts";

export type SearchCategory = "Services" | "Resources" | "Pages" | "Locations" | "Online Help";

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  /** Extra strings that boost fuzzy matching (not shown in UI) */
  keywords?: string[];
};

const serviceItems: SearchItem[] = services.map((s) => ({
  id: `service-${s.slug}`,
  title: s.title,
  description: s.excerpt,
  href: `/services/${s.slug}/`,
  category: "Services",
  keywords: s.highlights,
}));

const resourceItems: SearchItem[] = posts.map((p) => ({
  id: `post-${p.slug}`,
  title: p.title,
  description: p.excerpt,
  href: `/blog/${p.slug}/`,
  category: "Resources",
  keywords: [p.category],
}));

const pageItems: SearchItem[] = [
  {
    id: "page-home",
    title: "Home",
    description: "Veterinary Medical Centers — Northern Kentucky vet for dogs & cats",
    href: "/",
    category: "Pages",
    keywords: ["veterinary", "vet", "dog", "cat", "northern kentucky", "vmc"],
  },
  {
    id: "page-about",
    title: "About Us",
    description: "Independently owned Northern Kentucky veterinary practice",
    href: "/about/",
    category: "Pages",
    keywords: ["about", "team", "practice", "mission", "independent"],
  },
  {
    id: "page-services",
    title: "All Services",
    description: "Browse every veterinary service we offer",
    href: "/services/",
    category: "Pages",
    keywords: ["services", "care", "treatment", "offerings"],
  },
  {
    id: "page-new-patients",
    title: "New Patients",
    description: "What to bring and expect at your first visit",
    href: "/new-patients/",
    category: "Pages",
    keywords: ["new", "first visit", "registration", "welcome"],
  },
  {
    id: "page-resources",
    title: "Blog & Resources",
    description: "Pet health articles and guides from our team",
    href: "/blog/",
    category: "Pages",
    keywords: ["blog", "articles", "health tips", "guides"],
  },
  {
    id: "page-contact",
    title: "Contact",
    description: "Get in touch with our Fort Thomas or Independence team",
    href: "/contact/",
    category: "Pages",
    keywords: ["contact", "phone", "email", "message", "reach us"],
  },
  {
    id: "page-locations",
    title: "Locations",
    description: "Find a Veterinary Medical Centers clinic near you",
    href: "/locations/",
    category: "Pages",
    keywords: ["locations", "find", "map", "directions", "clinic"],
  },
  {
    id: "page-book",
    title: "Book an Appointment",
    description: "Schedule your pet's visit online",
    href: "/book-appointment/",
    category: "Pages",
    keywords: ["book", "schedule", "appointment", "visit", "reserve"],
  },
  {
    id: "page-pharmacy",
    title: "Online Pharmacy",
    description: "Order pet medications and prescription food online",
    href: "/online-vet-pharmacy-northern-kentucky-cincinnati/",
    category: "Pages",
    keywords: ["pharmacy", "medication", "prescription", "order", "food"],
  },
  {
    id: "page-portal",
    title: "Patient Portal",
    description: "Access records, history, and online booking",
    href: "/patient-portal-online-booking/",
    category: "Pages",
    keywords: ["portal", "records", "login", "history", "account"],
  },
];

const locationItems: SearchItem[] = [
  {
    id: "loc-fort-thomas",
    title: "Fort Thomas Clinic",
    description: "2000 Memorial Pkwy, Fort Thomas, KY · (859) 442-4420",
    href: "/locations/vet-in-fort-thomas-ky/",
    category: "Locations",
    keywords: ["fort thomas", "campbell county", "memorial parkway"],
  },
  {
    id: "loc-independence",
    title: "Independence Clinic",
    description: "4147 Madison Pike, Independence, KY · (859) 356-2242",
    href: "/locations/vet-in-independence-ky/",
    category: "Locations",
    keywords: ["independence", "kenton county", "madison pike"],
  },
];

const helpItems: SearchItem[] = [
  {
    id: "help-appointment",
    title: "Book an Appointment — Online",
    description: "Request a visit at Fort Thomas or Independence",
    href: "/online-help/fort-thomas/appointment/",
    category: "Online Help",
    keywords: ["book", "appointment", "schedule", "request"],
  },
  {
    id: "help-refill",
    title: "Med & Food Refill",
    description: "Request a prescription or diet food refill",
    href: "/online-help/fort-thomas/refill/",
    category: "Online Help",
    keywords: ["refill", "prescription", "medication", "rx", "food"],
  },
  {
    id: "help-records",
    title: "Request Medical Records",
    description: "Get records for yourself or another provider",
    href: "/online-help/fort-thomas/records/",
    category: "Online Help",
    keywords: ["records", "medical history", "transfer", "provider"],
  },
  {
    id: "help-virtual",
    title: "Virtual Consultation",
    description: "Ask about an online care-team consultation",
    href: "/online-help/fort-thomas/virtual-consult/",
    category: "Online Help",
    keywords: ["virtual", "online", "telemedicine", "remote", "video"],
  },
  {
    id: "help-general",
    title: "General Inquiry",
    description: "Message the clinic team with a non-urgent question",
    href: "/online-help/fort-thomas/general/",
    category: "Online Help",
    keywords: ["message", "question", "inquiry", "general", "ask"],
  },
];

export const SEARCH_ITEMS: SearchItem[] = [
  ...serviceItems,
  ...resourceItems,
  ...pageItems,
  ...locationItems,
  ...helpItems,
];

export const SEARCH_CATEGORIES: SearchCategory[] = [
  "Services",
  "Resources",
  "Pages",
  "Locations",
  "Online Help",
];
