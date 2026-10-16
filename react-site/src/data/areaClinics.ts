/**
 * Veterinary practices referenced in the /guides/ comparison pages.
 *
 * Rules for this file (keep them when editing):
 * - Only record facts a clinic states on its own website, or clearly mark the weaker source.
 * - Use "Not stated on its website" instead of guessing ownership, certifications, booking, or parking.
 * - Every non-VMC entry carries the source URL and the date it was checked.
 */

export type AreaClinic = {
  id: string;
  name: string;
  area: string;
  state: "KY" | "OH";
  address: string;
  phone?: string;
  website?: string;
  /** Direct online booking link (VMC clinics). */
  bookingUrl?: string;
  species: string;
  booking: string;
  ownership: string;
  catFeatures?: string;
  parking?: string;
  hours?: string;
  strengths: string[];
  goodFit: string;
  /** Shown as a "#1 Top Pick" ranking badge with highlighted styling. */
  topPick?: boolean;
  whyTop?: string[];
  isVmc?: boolean;
  emergency?: boolean;
  sources: { label: string; url: string }[];
  checked: string;
};

const CHECKED = "October 2026";

export const areaClinics: AreaClinic[] = [
  {
    id: "vmc-fort-thomas",
    name: "Veterinary Medical Center of Fort Thomas",
    area: "Fort Thomas, Northern Kentucky",
    state: "KY",
    address: "2000 Memorial Parkway, Fort Thomas, KY 41075",
    phone: "(859) 442-4420",
    website: "/locations/vet-in-fort-thomas-ky/",
    bookingUrl: "/online-help/fort-thomas/direct-booking/",
    species: "Dogs and cats",
    booking: "Direct online booking (appointments often available within 24 business hours, not guaranteed) or phone",
    ownership: "Independently owned by Dr. Kristi Baker",
    catFeatures: "Dr. Valeria Dib-Vázquez has a special interest in feline medicine and previously practiced at a feline-only hospital; Fear Free–minded, low-stress handling",
    parking: "On-site parking lot",
    hours: "Mon–Fri 8 AM–6 PM; rotating Saturdays (call ahead)",
    strengths: [
      "About 10 minutes from downtown Cincinnati via I-471",
      "Full-service care: wellness, dental, surgery, diagnostics, sick visits",
      "Spanish-speaking veterinarian available (call to confirm availability)"
    ],
    goodFit: "Campbell County families and Cincinnati pet owners who want easy parking and a small, locally owned team.",
    topPick: true,
    whyTop: [
      "Locally owned: the same small team knows your pet for years",
      "Fast direct online booking, often within 24 business hours",
      "Full-service care for dogs and cats under one roof",
      "Feline-focused and Spanish-speaking veterinarian on the team"
    ],
    isVmc: true,
    sources: [{ label: "nky.vet", url: "https://nky.vet/locations/vet-in-fort-thomas-ky/" }],
    checked: CHECKED
  },
  {
    id: "vmc-independence",
    name: "Veterinary Medical Center of Independence",
    area: "Independence, Northern Kentucky",
    state: "KY",
    address: "4147 Madison Pike, Independence, KY 41051",
    phone: "(859) 356-2242",
    website: "/locations/vet-in-independence-ky/",
    bookingUrl: "/online-help/independence/direct-booking/",
    species: "Dogs and cats",
    booking: "Direct online booking (appointments often available within 24 business hours, not guaranteed) or phone",
    ownership: "Independently owned by Dr. Kristi Baker",
    parking: "On-site parking",
    hours: "Mon–Fri 8 AM–6 PM",
    strengths: [
      "Convenient for Kenton and Boone county families",
      "Full-service care: wellness, dental, surgery, diagnostics, sick visits",
      "Same locally owned practice as Fort Thomas"
    ],
    goodFit: "Independence, Taylor Mill, Edgewood, Erlanger, Florence, and Walton families.",
    topPick: true,
    whyTop: [
      "Locally owned, with the same doctors visit after visit",
      "Fast direct online booking, often within 24 business hours",
      "Easy Madison Pike access for Kenton and Boone counties"
    ],
    isVmc: true,
    sources: [{ label: "nky.vet", url: "https://nky.vet/locations/vet-in-independence-ky/" }],
    checked: CHECKED
  },
  {
    id: "riverview",
    name: "Riverview Animal Hospital",
    area: "Bellevue, Northern Kentucky",
    state: "KY",
    address: "40 Donnermeyer Dr, Bellevue, KY 41073",
    phone: "(859) 912-7060",
    website: "https://riverviewpets.com/",
    species: "Not listed on its website (testimonials mention dogs and cats)",
    booking: "Online booking link (“Book Now”) and phone",
    ownership: "Not stated on its website",
    catFeatures: "Describes itself as “a cat-friendly hospital” and says “many of our team are fear free certified”",
    hours: "Mon 7:30 AM–7 PM; Tue–Thu 7:30 AM–6 PM; Fri 7:30 AM–5 PM; Sat 8 AM–12 PM",
    strengths: [
      "Cat-friendly hospital with Fear Free–certified team members",
      "Early weekday openings and Saturday morning hours",
      "Lists surgical, preventive, nutritional, and complementary therapy services"
    ],
    goodFit: "Bellevue, Dayton, and Newport pet owners, especially those with anxious cats.",
    sources: [
      { label: "riverviewpets.com", url: "https://riverviewpets.com/" },
      { label: "Riverview new clients page", url: "https://riverviewpets.com/new-clients/" }
    ],
    checked: CHECKED
  },
  {
    id: "howell-avenue",
    name: "Howell Avenue Pet Hospital",
    area: "Clifton, Cincinnati",
    state: "OH",
    address: "317 Howell Ave, Cincinnati, OH 45220",
    phone: "(513) 221-3404",
    website: "https://www.howellavenuepethospital.com/",
    species: "Not explicitly listed on its website",
    booking: "By appointment only; phone or email listed (no online booking stated)",
    ownership: "Not stated on its website",
    hours: "Mon–Fri 7 AM–6 PM; Sat 8 AM–12 PM",
    strengths: [
      "Lists wellness, medical, lab, surgery, dental, radiology, and ultrasound services",
      "Early 7 AM weekday opening",
      "Convenient for Clifton and uptown Cincinnati"
    ],
    goodFit: "Clifton, CUF, and uptown Cincinnati residents who prefer to stay in Ohio.",
    sources: [
      { label: "howellavenuepethospital.com", url: "https://www.howellavenuepethospital.com/" }
    ],
    checked: CHECKED
  },
  {
    id: "pleasant-ridge",
    name: "Pleasant Ridge Pet Hospital & Cat Care Clinic",
    area: "Pleasant Ridge, Cincinnati",
    state: "OH",
    address: "6229 Montgomery Rd, Cincinnati, OH 45213",
    phone: "(513) 351-1730",
    website: "https://www.pleasantridgepet.com/locations/cat-care-clinic",
    species: "Dogs and cats; separate feline-only Cat Care Clinic",
    booking: "Online appointment request (“Request Appointment”) and phone",
    ownership: "Not stated on its website",
    catFeatures: "Feline-only Cat Care Clinic with “a completely separate entrance and clinical space for cats,” pheromone diffusers, and fear-free handling language",
    parking: "“Ample parking” at the Cat Care Clinic",
    strengths: [
      "Dedicated feline-only space where cats are kept apart from dogs",
      "Same doctors and staff as the main pet hospital",
      "Convenient for Pleasant Ridge, Kennedy Heights, and the Montgomery Road corridor"
    ],
    goodFit: "Cincinnati cat owners who want a cats-only environment.",
    sources: [
      { label: "Pleasant Ridge Cat Care Clinic", url: "https://www.pleasantridgepet.com/locations/cat-care-clinic" }
    ],
    checked: CHECKED
  },
  {
    id: "cat-vet-hebron",
    name: "The Cat Vet of Hebron",
    area: "Hebron, Northern Kentucky",
    state: "KY",
    address: "2161 N. Bend Rd, Hebron, KY 41048",
    phone: "(859) 431-2287",
    website: "https://catvetofhebron.com/",
    species: "Cats only",
    booking: "Online appointment request form and phone",
    ownership: "Not stated on its website",
    catFeatures: "Describes itself as “Northern Kentucky's Only Feline Exclusive Practice”",
    hours: "Mon–Tue 8 AM–5:30 PM; Wed–Thu 8 AM–7 PM; Fri 8 AM–5 PM",
    strengths: [
      "Feline-exclusive practice",
      "Lists dental, imaging, surgery, laser therapy, telemedicine, and senior cat care",
      "Convenient for Boone County"
    ],
    goodFit: "Boone County cat owners who want a cats-only practice.",
    sources: [{ label: "catvetofhebron.com", url: "https://catvetofhebron.com/" }],
    checked: CHECKED
  },
  {
    id: "kentucky-paws",
    name: "Kentucky Paws Animal Hospital",
    area: "Crescent Springs / Fort Mitchell, Northern Kentucky",
    state: "KY",
    address: "2446 Anderson Rd, Bldg 6, Crescent Springs, KY 41017",
    species: "Not verified",
    booking: "Not verified",
    ownership: "Not verified",
    strengths: [
      "Newer practice in the Crescent Springs / Fort Mitchell area",
      "Directory listings show vaccinations, wellness and illness exams, and spay/neuter"
    ],
    goodFit: "Kenton County pet owners near Crescent Springs and Fort Mitchell. Confirm details directly.",
    sources: [
      { label: "Pets Best directory listing", url: "https://www.petsbest.com/veterinarians/KY/Fort%20Mitchell/kentucky-paws-animal-hospital-21963143" }
    ],
    checked: `${CHECKED} (clinic website was unreachable during review)`
  },
  {
    id: "medvet",
    name: "MedVet Cincinnati",
    area: "Fairfax, Cincinnati area",
    state: "OH",
    address: "3964 Red Bank Rd, Fairfax, OH 45227",
    phone: "(513) 561-0069",
    website: "https://www.medvet.com/location/cincinnati/",
    species: "Emergency and specialty care",
    booking: "No appointment needed for emergencies",
    ownership: "Not stated here",
    hours: "24/7 emergency department",
    strengths: ["24/7 emergency care, 365 days a year", "Specialty referral services"],
    goodFit: "After-hours and life-threatening emergencies.",
    emergency: true,
    sources: [{ label: "medvet.com", url: "https://www.medvet.com/location/cincinnati/" }],
    checked: CHECKED
  }
];

export function getAreaClinics(ids: string[]) {
  return ids.map((id) => areaClinics.find((clinic) => clinic.id === id)).filter((c): c is AreaClinic => Boolean(c));
}
