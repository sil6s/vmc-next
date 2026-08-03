import type { FAQ } from "./faqs";

export type LocationPage = {
  title: string;
  slug: string;
  legacySlugs: string[];
  shortName: string;
  keyword: string;
  h1: string;
  heroBody: string;
  address: string;
  phone: string;
  tel: string;
  image: string;
  imageAlt: string;
  introHeading: string;
  intro: string[];
  cityImage?: string;
  cityImageAlt?: string;
  quickFacts: {
    parking: string;
    petsSeen: string;
    mainServices: string;
    nearby: string;
  };
  trustChips: string[];
  whyHeading: string;
  whyCards: { title: string; text: string }[];
  personalStoryHeading: string;
  personalStory: string[];
  personalHighlights: string[];
  doctorImage?: string;
  doctorImageAlt?: string;
  doctorQuote?: string;
  servicesHeading: string;
  communities: string[];
  directionsHeading: string;
  directionsCopy: string;
  crossLinkCta: string;
  crossLinkSlug: string;
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
  };
};

export const locations: LocationPage[] = [
  {
    title: "Vet in Fort Thomas KY",
    slug: "vet-in-fort-thomas-ky",
    legacySlugs: ["fort-thomas"],
    shortName: "Fort Thomas",
    keyword: "vet in Fort Thomas KY",
    h1: "Vet in Fort Thomas KY for Dogs, Cats, and Local Families",
    heroBody:
      "On Memorial Parkway, our Fort Thomas team gets to know you and your pet by name. Dr. Kristi Baker and her team listen first, explain what they find in plain language, and stay in your corner long after the appointment ends.",
    address: "2000 Memorial Parkway, Fort Thomas, KY 41075",
    phone: "(859) 442-4420",
    tel: "+18594424420",
    image: "/images/fort-thomas-clinic.jpg",
    imageAlt: "Veterinary Medical Centers Fort Thomas clinic exterior on Memorial Parkway",
    introHeading: "A Locally Owned Vet in Fort Thomas KY",
    intro: [
      "Veterinary Medical Centers is a locally owned vet in Fort Thomas KY, caring for dogs and cats on Memorial Parkway near Highlands High School and Tower Park. We see families from Fort Thomas, Highland Heights, Newport, Bellevue, Dayton, Southgate, and nearby Cincinnati neighborhoods.",
      "We practice relationship-based medicine: we take time to learn your pet's history, explain what we find in terms you can act on, and check in after visits so you're never left guessing about next steps."
    ],
    cityImage: "/images/fort-thomas-town.webp",
    cityImageAlt: "Fort Thomas Kentucky community near Veterinary Medical Centers of Fort Thomas",
    quickFacts: {
      parking: "On-site parking available",
      petsSeen: "Dogs, cats, puppies, and kittens",
      mainServices: "Wellness, sick visits, dental care, diagnostics, surgery consultations, prevention, and senior care",
      nearby: "Highland Heights, Newport, Bellevue, Dayton, Southgate, Cold Spring, Alexandria, Silver Grove, Cincinnati"
    },
    trustChips: ["Locally owned", "Dogs and cats", "Northern Kentucky", "Convenient Memorial Parkway location"],
    personalStoryHeading: "Meet Dr. Kristi Baker",
    personalStory: [
      "Dr. Kristi Baker doesn't just work in Fort Thomas — she lives here, and her kids attend Fort Thomas City Schools. That stake in the community shapes how she practices: she listens before she recommends, explains what she's seeing in plain terms, and gets to know each pet well enough to notice when something's off.",
      "Because Veterinary Medical Centers is independently owned, care decisions are made here, by people who know your pet's history, instead of being routed through a corporate call center or a rotating cast of providers."
    ],
    personalHighlights: [
      "Dr. Baker lives in Fort Thomas with her husband and two children",
      "Her kids attend Fort Thomas City Schools",
      "Independently owned and operated — no corporate chain",
      "Long-term relationships with Fort Thomas and Campbell County families"
    ],
    doctorImage: "/images/kristi-baker-headshot-vertical.jpg",
    doctorImageAlt: "Dr. Kristi Baker, owner and veterinarian at Veterinary Medical Centers of Fort Thomas",
    doctorQuote: "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.",
    whyHeading: "Why Fort Thomas Families Choose Veterinary Medical Centers",
    whyCards: [
      {
        title: "Easy to Reach, Easy to Park",
        text:
          "On-site parking right at the door, near Highlands High School and Tower Park — and about 10 minutes from downtown Cincinnati via I-471 N, Exit 5."
      },
      {
        title: "Locally Owned, Locally Decided",
        text:
          "Care decisions are made here by people who know your pet, not by a distant corporate office."
      },
      {
        title: "Your Pet's History, Remembered",
        text:
          "The same team sees your pet visit after visit, so changes in behavior or health are easier to catch early."
      },
      {
        title: "Full-Service Care for Dogs and Cats",
        text:
          "Wellness exams, dental care, diagnostics, surgery, and sick visits, handled by one team from puppyhood through senior years."
      },
      {
        title: "Calmer, Clearer Visits",
        text:
          "We explain findings and options in plain language and use gentle handling to keep visits low-stress for pets and owners."
      }
    ],
    servicesHeading: "Veterinary Services Available in Fort Thomas KY",
    communities: ["Fort Thomas", "Highland Heights", "Newport", "Bellevue", "Dayton", "Southgate", "Cold Spring", "Alexandria", "Silver Grove", "Cincinnati neighborhoods across the river"],
    directionsHeading: "Directions to Our Fort Thomas Veterinary Clinic",
    directionsCopy:
      "Our Fort Thomas clinic sits on Memorial Parkway near Highlands High School, Tower Park, and Riggs Memorial Park, with on-site parking right at the door. Cincinnati families come across regularly — take I-471 N to Exit 5 (Memorial Parkway), turn left, and the clinic is on your right, about 10 minutes from downtown.",
    crossLinkCta: "View Independence Location",
    crossLinkSlug: "vet-in-independence-ky",
    faqs: [
      {
        question: "Where is your vet in Fort Thomas KY located?",
        answer:
          "Our Fort Thomas clinic is at 2000 Memorial Parkway, Fort Thomas, KY 41075, near Highlands High School, Tower Park, and Riggs Memorial Park."
      },
      {
        question: "Do you accept new patients at the Fort Thomas location?",
        answer:
          "Yes. Veterinary Medical Centers welcome new dog and cat patients at our Fort Thomas location. New clients can request an appointment online and complete new patient forms before their first visit."
      },
      {
        question: "What veterinary services are available in Fort Thomas?",
        answer:
          "Our Fort Thomas clinic provides wellness exams, vaccinations, puppy and kitten care, sick visits, dental care, diagnostics, surgery-related consultations, and senior pet care."
      },
      {
        question: "Is Veterinary Medical Centers locally owned?",
        answer:
          "Yes. Veterinary Medical Centers is locally owned and focused on relationship-based veterinary care for Northern Kentucky pets and families."
      },
      {
        question: "How do I prepare for my first visit?",
        answer:
          "Bring your pet's vaccine records, medication list, previous medical records if available, and any questions or concerns you want to discuss with the veterinary team."
      },
      {
        question: "Do you offer same-day or urgent appointments?",
        answer:
          "If your pet is sick or showing new symptoms, call the clinic to ask about appointment availability and the best next step. For medical emergencies, contact an emergency veterinary hospital right away."
      }
    ],
    seo: {
      title: "Vet in Fort Thomas KY | Local Dog & Cat Veterinarian",
      description:
        "Looking for a vet in Fort Thomas KY? Veterinary Medical Centers offer locally owned dog and cat care, wellness exams, dental care, surgery, and sick visits."
    }
  },
  {
    title: "Vet in Independence KY",
    slug: "vet-in-independence-ky",
    legacySlugs: ["independence"],
    shortName: "Independence",
    keyword: "vet in Independence KY",
    h1: "Vet in Independence KY for Relationship-Based Pet Care",
    heroBody:
      "Veterinary Medical Centers of Independence provides practical, compassionate veterinary care for dogs and cats on Madison Pike, serving Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and nearby Kenton County communities.",
    address: "4147 Madison Pike, Independence, KY 41051",
    phone: "(859) 356-2242",
    tel: "+18593562242",
    image: "/images/independence-clinic.jpg",
    imageAlt: "Veterinary Medical Centers Independence clinic exterior on Madison Pike",
    introHeading: "Local Veterinary Care in Independence KY",
    intro: [
      "Veterinary Medical Centers of Independence is a locally owned vet in Independence KY built around trust, continuity, and thoughtful care for dogs and cats. Located on Madison Pike, this clinic serves families across Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and surrounding Kenton County communities.",
      "This was the first clinic Dr. Kristi Baker opened, and it reflects the foundation of the practice: careful communication, preventive care, individualized treatment, and long-term relationships with local pet families.",
      "The Independence clinic supports busy families across central Northern Kentucky with practical appointment flow, clear recommendations, and a team that focuses on your pet's needs instead of a one-size-fits-all model."
    ],
    cityImage: "/images/indepedence-town.webp",
    cityImageAlt: "Independence Kentucky community near Veterinary Medical Centers of Independence",
    quickFacts: {
      parking: "On-site parking available",
      petsSeen: "Dogs, cats, puppies, and kittens",
      mainServices: "Wellness, vaccines, sick visits, diagnostics, dental care, surgery consultations, senior care, and prevention",
      nearby: "Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, Kenton County"
    },
    trustChips: ["Locally owned", "Dogs and cats", "Kenton County", "Madison Pike location"],
    personalStoryHeading: "Where Veterinary Medical Centers Began — and Why It Still Matters",
    personalStory: [
      "Veterinary Medical Centers of Independence was Dr. Kristi Baker's first clinic. She grew up in Northern Kentucky. This is home — and opening a practice here wasn't just a business decision. It was a commitment to the community she was raised in.",
      "That first clinic set the tone for everything that followed: relationship-based care, clear communication, and a genuine belief that families deserve a veterinarian they can trust over time — not a rotating schedule of strangers.",
      "Years later, Independence still carries that founding spirit. It's independently owned, locally operated, and built by someone who holds Northern Kentucky close to her heart."
    ],
    personalHighlights: [
      "The first clinic Dr. Baker ever opened",
      "Dr. Baker grew up in Northern Kentucky",
      "Independently owned — not part of a corporate chain",
      "Built on the belief that veterinary care should be personal and consistent",
      "Serving Independence, Kenton County, and nearby Northern Kentucky communities"
    ],
    whyHeading: "Why Independence Families Choose Veterinary Medical Centers",
    whyCards: [
      {
        title: "Convenient Madison Pike Location",
        text:
          "Our Independence clinic is located on Madison Pike, making it a practical choice for families across Independence and central Kenton County."
      },
      {
        title: "The First Clinic Dr. Baker Opened",
        text:
          "The Independence location helped establish the practice's mission of locally owned, thoughtful, relationship-based veterinary care."
      },
      {
        title: "Mission-First, Not Corporate",
        text:
          "The clinic is built around patient care, family communication, and long-term trust instead of high-volume appointment models."
      },
      {
        title: "Care for Dogs and Cats at Every Life Stage",
        text:
          "We support puppies, kittens, adult pets, and senior pets with preventive, medical, dental, and surgical care."
      },
      {
        title: "Clear Recommendations",
        text:
          "Our team explains what is urgent, what is preventive, and what can be monitored so families feel more confident."
      },
      {
        title: "Kenton County Connection",
        text:
          "The clinic serves pet owners throughout Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and nearby communities."
      }
    ],
    servicesHeading: "Veterinary Services Available in Independence KY",
    communities: ["Independence", "Taylor Mill", "Ryland Heights", "Covington", "Latonia", "Edgewood", "Erlanger", "Kenton County", "Florence", "Cold Spring"],
    doctorQuote: "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.",
    directionsHeading: "Directions to Our Independence Veterinary Clinic",
    directionsCopy:
      "Our Independence location is on Madison Pike, making it convenient for pet owners across Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and central Kenton County. The clinic offers on-site parking for a simpler visit experience.",
    crossLinkCta: "View Fort Thomas Location",
    crossLinkSlug: "vet-in-fort-thomas-ky",
    faqs: [
      {
        question: "Where is your Independence veterinary clinic located?",
        answer:
          "Our Independence clinic is located at 4147 Madison Pike, Independence, KY 41051, serving pet families across Independence and central Kenton County."
      },
      {
        question: "Do you accept new patients at the Independence location?",
        answer:
          "Yes. Veterinary Medical Centers welcome new dog and cat patients at our Independence location. New clients can request an appointment online and complete new patient forms before their first visit."
      },
      {
        question: "What veterinary services are available in Independence?",
        answer:
          "Our Independence clinic provides wellness exams, vaccinations, puppy and kitten care, sick visits, diagnostics, dental care, surgery-related consultations, parasite prevention, senior pet care, and nutrition guidance."
      },
      {
        question: "Was Independence the first clinic Dr. Baker opened?",
        answer:
          "Yes. Veterinary Medical Centers of Independence was the first clinic Dr. Kristi Baker opened and helped establish the practice's mission of thoughtful, locally owned veterinary care."
      },
      {
        question: "What communities are near the Independence clinic?",
        answer:
          "Our Independence location is convenient for Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, Kenton County, and surrounding Northern Kentucky communities."
      },
      {
        question: "Do you see both dogs and cats?",
        answer: "Yes. Veterinary Medical Centers provide veterinary care for dogs, cats, puppies, and kittens."
      },
      {
        question: "Is the Independence clinic locally owned?",
        answer:
          "Yes. Veterinary Medical Centers of Independence is locally owned and focused on relationship-based veterinary care rather than a corporate clinic model."
      },
      {
        question: "How do I prepare for my first visit?",
        answer:
          "Bring your pet's vaccine records, medication list, previous veterinary records if available, and any questions or concerns you want to discuss with the team."
      }
    ],
    seo: {
      title: "Vet in Independence KY | Local Dog & Cat Veterinarian",
      description:
        "Need a vet in Independence KY? Veterinary Medical Centers provide locally owned veterinary care for dogs and cats on Madison Pike in Northern Kentucky."
    }
  }
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug || location.legacySlugs.includes(slug));
}
