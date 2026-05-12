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
  quickFacts: {
    parking: string;
    petsSeen: string;
    mainServices: string;
    nearby: string;
  };
  trustChips: string[];
  whyHeading: string;
  whyCards: { title: string; text: string }[];
  servicesHeading: string;
  communitiesHeading: string;
  communitiesIntro: string;
  communities: string[];
  communitiesSearchCopy: string;
  ownershipHeading: string;
  ownershipCopy: string[];
  bakerHeading: string;
  bakerCopy: string[];
  directionsHeading: string;
  directionsCopy: string;
  crossLinkHeading: string;
  crossLinkCopy: string;
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
      "Veterinary Medical Center serves Fort Thomas pets with locally owned, relationship-based veterinary care on Memorial Parkway, close to Highlands High School, Tower Park, Riggs Memorial Park, and nearby Northern Kentucky neighborhoods.",
    address: "2000 Memorial Parkway, Fort Thomas, KY 41075",
    phone: "(859) 442-4420",
    tel: "+18594424420",
    image: "/images/fort-thomas-clinic.jpg",
    imageAlt: "Veterinary Medical Center Fort Thomas clinic exterior on Memorial Parkway",
    introHeading: "Local Veterinary Care in Fort Thomas KY",
    intro: [
      "Veterinary Medical Center is a locally owned vet in Fort Thomas KY providing care for dogs and cats through every stage of life. Our Fort Thomas clinic is located on Memorial Parkway, making it convenient for families near Highlands High School, Tower Park, Riggs Memorial Park, downtown Fort Thomas, Highland Heights, Newport, Bellevue, Dayton, Southgate, and nearby Cincinnati communities.",
      "We focus on relationship-based veterinary medicine. That means we take time to understand your pet's history, explain recommendations clearly, and help you make decisions that fit your pet's health, comfort, and long-term wellbeing.",
      "For many local families, a veterinary clinic needs to be close enough for routine care and steady enough to build trust over time. Our Fort Thomas team supports everyday wellness, new symptoms, dental concerns, surgical planning, and senior pet care with the same standard of communication across visits."
    ],
    quickFacts: {
      parking: "On-site parking available",
      petsSeen: "Dogs, cats, puppies, and kittens",
      mainServices: "Wellness, sick visits, dental care, diagnostics, surgery consultations, prevention, and senior care",
      nearby: "Highland Heights, Newport, Bellevue, Dayton, Southgate, Cold Spring, Alexandria, Silver Grove, Cincinnati"
    },
    trustChips: ["Locally owned", "Dogs and cats", "Northern Kentucky", "Convenient Memorial Parkway location"],
    whyHeading: "Why Fort Thomas Families Choose Veterinary Medical Center",
    whyCards: [
      {
        title: "Convenient Memorial Parkway Location",
        text:
          "Our Fort Thomas clinic is easy to access for families near Highlands High School, Tower Park, Riggs Memorial Park, downtown Fort Thomas, and nearby river city communities."
      },
      {
        title: "Locally Owned Veterinary Care",
        text:
          "As a locally owned veterinary clinic, decisions are made close to the pets and families we serve, not by a distant corporate office."
      },
      {
        title: "Relationship-Based Medicine",
        text:
          "We focus on continuity, trust, and clear communication so families can make informed decisions over time."
      },
      {
        title: "Full-Service Dog and Cat Care",
        text:
          "From wellness exams and vaccines to dental care, diagnostics, surgery, and sick visits, your pet can receive many essential services from one trusted team."
      },
      {
        title: "Low-Stress Visits",
        text:
          "Our team uses calm communication and thoughtful handling to help make visits more comfortable for pets and their people."
      },
      {
        title: "Northern Kentucky Community Roots",
        text:
          "Our team is connected to the communities we serve and understands the needs of local pet families."
      }
    ],
    servicesHeading: "Veterinary Services Available in Fort Thomas KY",
    communitiesHeading: "Veterinary Care Near Fort Thomas and Nearby NKY Communities",
    communitiesIntro:
      "Our Fort Thomas clinic is convenient for pet owners throughout Campbell County and the river cities, including families who want local veterinary care without crossing into a larger corporate clinic setting.",
    communities: ["Fort Thomas", "Highland Heights", "Newport", "Bellevue", "Dayton", "Southgate", "Cold Spring", "Alexandria", "Silver Grove", "Cincinnati neighborhoods across the river"],
    communitiesSearchCopy:
      "If you are searching for a vet near Fort Thomas KY, a dog vet near Newport KY, or a cat vet near Highland Heights KY, our Memorial Parkway location is designed to be easy to access and simple to visit.",
    ownershipHeading: "What Makes Veterinary Medical Center Different?",
    ownershipCopy: [
      "Choosing a veterinarian is not only about finding the closest clinic. It is about finding a team that knows your pet, listens to your concerns, explains options clearly, and helps you plan for long-term health.",
      "Veterinary Medical Center is locally owned and relationship-focused, which means care is centered on the pet and the family, not a corporate playbook. We want families to understand what is urgent, what is preventive, and what can be watched over time."
    ],
    bakerHeading: "A Fort Thomas Veterinary Team Rooted in Northern Kentucky",
    bakerCopy: [
      "Dr. Kristi Baker's approach to veterinary care is shaped by a belief that better relationships lead to better care. At Veterinary Medical Center, families are not rushed through a one-size-fits-all process.",
      "The team takes time to understand each pet, explain recommendations, and support owners through routine care and more complex decisions. As a locally owned veterinary clinic, Veterinary Medical Center can focus on thoughtful medicine, continuity, comfort, and trust."
    ],
    directionsHeading: "Directions to Our Fort Thomas Veterinary Clinic",
    directionsCopy:
      "Our Fort Thomas location is on Memorial Parkway near familiar local landmarks, including Highlands High School, Tower Park, Riggs Memorial Park, and the Northern Kentucky Water District area. The clinic offers on-site parking to make arrival easier for pets and families.",
    crossLinkHeading: "Need a Vet Closer to Kenton County?",
    crossLinkCopy:
      "Veterinary Medical Center also has an Independence location on Madison Pike for families closer to central Northern Kentucky, Taylor Mill, Covington, Erlanger, and surrounding communities.",
    crossLinkCta: "View Independence Location",
    crossLinkSlug: "vet-in-independence-ky",
    faqs: [
      {
        question: "Where is your Fort Thomas veterinary clinic located?",
        answer:
          "Our Fort Thomas clinic is located at 2000 Memorial Parkway, Fort Thomas, KY 41075, near local landmarks such as Highlands High School, Tower Park, Riggs Memorial Park, and nearby Northern Kentucky neighborhoods."
      },
      {
        question: "Do you accept new patients at the Fort Thomas location?",
        answer:
          "Yes. Veterinary Medical Center welcomes new dog and cat patients at our Fort Thomas location. New clients can request an appointment online and complete new patient forms before their first visit."
      },
      {
        question: "What veterinary services are available in Fort Thomas?",
        answer:
          "Our Fort Thomas clinic provides wellness exams, vaccinations, puppy and kitten care, sick visits, diagnostics, dental care, surgery-related consultations, parasite prevention, senior pet care, and nutrition guidance."
      },
      {
        question: "Do you see both dogs and cats?",
        answer: "Yes. Veterinary Medical Center provides veterinary care for dogs, cats, puppies, and kittens."
      },
      {
        question: "What communities are near the Fort Thomas clinic?",
        answer:
          "Our Fort Thomas location is convenient for Highland Heights, Newport, Bellevue, Dayton, Southgate, Cold Spring, Alexandria, Silver Grove, and nearby Cincinnati communities."
      },
      {
        question: "How do I prepare for my first visit?",
        answer:
          "Bring your pet's vaccine records, medication list, previous medical records if available, and any questions or concerns you want to discuss with the veterinary team."
      },
      {
        question: "Is Veterinary Medical Center locally owned?",
        answer:
          "Yes. Veterinary Medical Center is locally owned and focused on relationship-based veterinary care for Northern Kentucky pets and families."
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
        "Looking for a vet in Fort Thomas KY? Veterinary Medical Center offers locally owned dog and cat care, wellness exams, dental care, surgery, and sick visits."
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
      "Veterinary Medical Center of Independence provides practical, compassionate veterinary care for dogs and cats on Madison Pike, serving Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and nearby Kenton County communities.",
    address: "4147 Madison Pike, Independence, KY 41051",
    phone: "(859) 356-2242",
    tel: "+18593562242",
    image: "/images/independence-clinic.jpg",
    imageAlt: "Veterinary Medical Center Independence clinic exterior on Madison Pike",
    introHeading: "Local Veterinary Care in Independence KY",
    intro: [
      "Veterinary Medical Center of Independence is a locally owned vet in Independence KY built around trust, continuity, and thoughtful care for dogs and cats. Located on Madison Pike, this clinic serves families across Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and surrounding Kenton County communities.",
      "This was the first clinic Dr. Kristi Baker opened, and it reflects the foundation of the practice: careful communication, preventive care, individualized treatment, and long-term relationships with local pet families.",
      "The Independence clinic supports busy families across central Northern Kentucky with practical appointment flow, clear recommendations, and a team that focuses on your pet's needs instead of a one-size-fits-all model."
    ],
    quickFacts: {
      parking: "On-site parking available",
      petsSeen: "Dogs, cats, puppies, and kittens",
      mainServices: "Wellness, vaccines, sick visits, diagnostics, dental care, surgery consultations, senior care, and prevention",
      nearby: "Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, Kenton County"
    },
    trustChips: ["Locally owned", "Dogs and cats", "Kenton County", "Madison Pike location"],
    whyHeading: "Why Independence Families Choose Veterinary Medical Center",
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
    communitiesHeading: "Veterinary Care Near Independence and Kenton County Communities",
    communitiesIntro:
      "Our Independence clinic serves families across central Northern Kentucky who want a local vet close to home, work, school, and everyday routines.",
    communities: ["Independence", "Taylor Mill", "Ryland Heights", "Covington", "Latonia", "Edgewood", "Erlanger", "Kenton County", "Florence", "Cold Spring"],
    communitiesSearchCopy:
      "If you are searching for a vet near Independence KY, a dog vet near Taylor Mill KY, or a cat vet near Covington KY, our Madison Pike location offers convenient access to full-service veterinary care.",
    ownershipHeading: "What Makes Veterinary Medical Center of Independence Different?",
    ownershipCopy: [
      "Choosing a veterinarian is not only about finding the closest clinic. It is about finding a team that knows your pet, listens to your concerns, explains options clearly, and helps you plan for long-term health.",
      "Veterinary Medical Center of Independence is locally owned and relationship-focused. The clinic gives families a local alternative to corporate veterinary models while still supporting preventive, medical, dental, and surgical care for dogs and cats."
    ],
    bakerHeading: "The First Veterinary Medical Center Location Dr. Baker Opened",
    bakerCopy: [
      "Veterinary Medical Center of Independence holds a special place in the practice because it was the first clinic Dr. Kristi Baker opened. The location reflects the reason she became a practice owner: to create a veterinary clinic where medical decisions are personal, careful, and rooted in what is best for each pet.",
      "The Independence clinic is not built around corporate volume or rushed appointments. It is built around relationship-based care, clear communication, and long-term support for dogs, cats, and their families."
    ],
    directionsHeading: "Directions to Our Independence Veterinary Clinic",
    directionsCopy:
      "Our Independence location is on Madison Pike, making it convenient for pet owners across Independence, Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, and central Kenton County. The clinic offers on-site parking for a simpler visit experience.",
    crossLinkHeading: "Need a Vet Closer to Campbell County?",
    crossLinkCopy:
      "Veterinary Medical Center also has a Fort Thomas location on Memorial Parkway for families closer to Fort Thomas, Newport, Highland Heights, Bellevue, Dayton, Southgate, Cold Spring, and nearby Cincinnati communities.",
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
          "Yes. Veterinary Medical Center welcomes new dog and cat patients at our Independence location. New clients can request an appointment online and complete new patient forms before their first visit."
      },
      {
        question: "What veterinary services are available in Independence?",
        answer:
          "Our Independence clinic provides wellness exams, vaccinations, puppy and kitten care, sick visits, diagnostics, dental care, surgery-related consultations, parasite prevention, senior pet care, and nutrition guidance."
      },
      {
        question: "Was Independence the first clinic Dr. Baker opened?",
        answer:
          "Yes. Veterinary Medical Center of Independence was the first clinic Dr. Kristi Baker opened and helped establish the practice's mission of thoughtful, locally owned veterinary care."
      },
      {
        question: "What communities are near the Independence clinic?",
        answer:
          "Our Independence location is convenient for Taylor Mill, Ryland Heights, Covington, Latonia, Edgewood, Erlanger, Kenton County, and surrounding Northern Kentucky communities."
      },
      {
        question: "Do you see both dogs and cats?",
        answer: "Yes. Veterinary Medical Center provides veterinary care for dogs, cats, puppies, and kittens."
      },
      {
        question: "Is the Independence clinic locally owned?",
        answer:
          "Yes. Veterinary Medical Center of Independence is locally owned and focused on relationship-based veterinary care rather than a corporate clinic model."
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
        "Need a vet in Independence KY? Veterinary Medical Center provides locally owned veterinary care for dogs and cats on Madison Pike in Northern Kentucky."
    }
  }
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug || location.legacySlugs.includes(slug));
}
