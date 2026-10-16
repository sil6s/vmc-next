export type Veterinarian = {
  slug: string;
  name: string;
  shortName: string;
  credentials: string;
  role: string;
  /** Short role line shown on team cards. */
  cardRole: string;
  /** Short blurb shown on team cards. */
  cardSummary: string;
  location: string;
  /** Location page slugs from src/data/locations.ts. */
  clinicSlugs: string[];
  specialty: string;
  image?: string;
  imageAlt: string;
  tagline: string;
  summary: string;
  bio: string[];
  quote?: string;
  quickFacts: { label: string; value: string }[];
  education: { credential: string; institution: string; dates: string }[];
  alumniOf: string[];
  languages: string[];
  experience: { position: string; organization: string; dates: string }[];
  focusTitle: string;
  focus: string[];
  relatedServices: { label: string; href: string }[];
  personal?: { title: string; body: string };
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string };
};

export const veterinarians: Veterinarian[] = [
  {
    slug: "dr-kristi-baker",
    name: "Dr. Kristi Baker",
    shortName: "Dr. Kristi",
    credentials: "DVM",
    role: "Practice Owner & Veterinarian",
    cardRole: "Practice Owner & Veterinarian",
    cardSummary:
      "Dr. Baker leads VMC with more than two decades of veterinary experience and a calm, relationship-first approach. She believes good care starts with listening and clear answers.",
    location: "Fort Thomas & Independence",
    clinicSlugs: ["vet-in-fort-thomas-ky", "vet-in-independence-ky"],
    specialty: "Practice owner",
    image: "/images/kristi-baker-portrait.webp",
    imageAlt: "Dr. Kristi Baker, DVM, owner and veterinarian at Veterinary Medical Centers in Northern Kentucky",
    tagline: "Owner of Veterinary Medical Centers and a Northern Kentucky veterinarian for more than 20 years.",
    summary:
      "Dr. Kristi Baker owns Veterinary Medical Centers and sees dogs and cats in Fort Thomas and Independence, KY. She brings more than 20 years of experience in general practice and emergency medicine, and she grew up right here in Campbell County.",
    bio: [
      "Dr. Kristi Baker has spent more than two decades caring for dogs and cats across Northern Kentucky and Greater Cincinnati. As the owner of Veterinary Medical Centers, she leads the teams at both our Fort Thomas and Independence clinics and still spends her days doing what she loves most: practicing medicine with the families who trust us.",
      "She's a local through and through. Dr. Baker grew up in Campbell County, earned her bachelor's degree in biology at Northern Kentucky University, and then completed her Doctor of Veterinary Medicine at Ross University School of Veterinary Medicine, with her clinical year at Purdue University.",
      "Her early career included general practice in Findlay, Ohio, followed by years as an emergency veterinarian at Care Center Vets and MedVet Cincinnati. That emergency background still shows. She is calm when a pet is critical, quick to spot what matters, and practical about the next step.",
      "Dr. Baker joined Veterinary Medical Center of Independence in 2008 and expanded to Fort Thomas in 2019. Today she focuses on what keeps an independent practice worth choosing: knowing pets over many years, explaining things clearly, and building care plans that fit real families."
    ],
    quote: "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us.",
    quickFacts: [
      { label: "Role", value: "Owner & veterinarian" },
      { label: "Clinics", value: "Fort Thomas & Independence" },
      { label: "Experience", value: "20+ years" },
      { label: "Background", value: "General practice & emergency medicine" }
    ],
    education: [
      { credential: "Doctor of Veterinary Medicine (DVM)", institution: "Ross University School of Veterinary Medicine", dates: "2000–2003" },
      { credential: "Clinical year", institution: "Purdue University College of Veterinary Medicine", dates: "2003–2004" },
      { credential: "Bachelor of Arts in Biology", institution: "Northern Kentucky University", dates: "1993–1998" }
    ],
    alumniOf: ["Ross University School of Veterinary Medicine", "Purdue University", "Northern Kentucky University"],
    languages: ["English"],
    experience: [
      { position: "Owner & Veterinarian", organization: "Veterinary Medical Center of Fort Thomas", dates: "2019–Present" },
      { position: "Owner & Veterinarian", organization: "Veterinary Medical Center of Independence", dates: "2008–Present" },
      { position: "Emergency Veterinarian", organization: "MedVet Cincinnati", dates: "2011–2015" },
      { position: "Emergency Veterinarian", organization: "Care Center Vets, Cincinnati", dates: "2006–2009" },
      { position: "Associate Veterinarian", organization: "Blanchard Valley Veterinary Clinic, Findlay, OH", dates: "2004–2006" }
    ],
    focusTitle: "Clinical background",
    focus: [
      "Wellness and preventive care for dogs and cats",
      "Sick visits and urgent medical concerns",
      "Emergency medicine experience",
      "Long-term care for chronic and senior patients",
      "Leading both VMC clinics"
    ],
    relatedServices: [
      { label: "Pet wellness exams", href: "/services/pet-wellness-exams/" },
      { label: "Sick pet visits", href: "/services/sick-pet-visits/" },
      { label: "Senior pet care", href: "/services/senior-pet-care/" },
      { label: "Dog & cat vaccinations", href: "/services/dog-cat-vaccinations/" }
    ],
    faqs: [
      {
        question: "Who owns Veterinary Medical Centers?",
        answer:
          "Veterinary Medical Centers is independently owned by Dr. Kristi Baker, DVM. She is a Northern Kentucky native and leads both the Fort Thomas and Independence clinics."
      },
      {
        question: "Where does Dr. Kristi Baker see patients?",
        answer:
          "Dr. Baker practices at Veterinary Medical Center of Fort Thomas (2000 Memorial Parkway) and Veterinary Medical Center of Independence (4147 Madison Pike)."
      },
      {
        question: "Does Dr. Baker have emergency veterinary experience?",
        answer:
          "Yes. Before focusing on VMC, Dr. Baker worked as an emergency veterinarian at MedVet Cincinnati and Care Center Vets. For after-hours emergencies today, please contact a 24-hour emergency hospital."
      }
    ],
    seo: {
      title: "Dr. Kristi Baker, DVM | Fort Thomas & Independence KY Vet",
      description:
        "Meet Dr. Kristi Baker, DVM, owner of Veterinary Medical Centers. A Northern Kentucky native with 20+ years of general and emergency veterinary experience."
    }
  },
  {
    slug: "dr-rebecca-golatzki",
    name: "Dr. Rebecca Golatzki",
    shortName: "Dr. Becky",
    credentials: "DVM",
    role: "Veterinarian",
    cardRole: "Veterinarian · Auburn University, Class of 1990",
    cardSummary:
      "A Northern Kentucky native, Dr. Golatzki brings decades of small-animal and preventive-care experience. Her work is rooted in lasting relationships with pets and the people who care for them.",
    location: "Northern Kentucky",
    clinicSlugs: [],
    specialty: "Community veterinarian",
    imageAlt: "Placeholder portrait for Dr. Rebecca Golatzki, DVM",
    tagline: "A Northern Kentucky native with more than 35 years of small-animal veterinary experience.",
    summary:
      "Dr. Rebecca \"Becky\" Golatzki is a Northern Kentucky veterinarian and 1990 graduate of Auburn University. She brings more than 35 years of experience in wellness care, surgery, and dentistry, along with a long history of knowing her patients by name.",
    bio: [
      "Dr. Rebecca Golatzki, known to many families as Dr. Becky, has cared for Northern Kentucky pets for more than three decades. She earned her Doctor of Veterinary Medicine from Auburn University College of Veterinary Medicine in 1990 and came home to practice.",
      "In August 1991 she purchased Edgewood Animal Clinic from Dr. Kevin Monce. She built it into the kind of neighborhood practice where the staff knew every client and every pet by name. That small-practice, personal approach still shapes how she works today.",
      "She grew up in Bellevue and Fort Wright and graduated from Scott High School, so the communities she serves are the ones she calls home. Her experience covers preventive and wellness care, veterinary surgery, and dentistry. She also knows when a pet would benefit from a specialist and coordinates that care.",
      "Her philosophy is simple: pets are family, and they deserve to be treated that way. She takes the time to help families understand their options and make confident decisions about their pet's health."
    ],
    quote: "Pets are family, and they deserve to be treated that way.",
    quickFacts: [
      { label: "Role", value: "Veterinarian" },
      { label: "Education", value: "Auburn University, DVM 1990" },
      { label: "Experience", value: "35+ years" },
      { label: "Hometown", value: "Bellevue & Fort Wright, KY" }
    ],
    education: [
      { credential: "Doctor of Veterinary Medicine (DVM)", institution: "Auburn University College of Veterinary Medicine", dates: "1990" }
    ],
    alumniOf: ["Auburn University College of Veterinary Medicine"],
    languages: ["English"],
    experience: [
      { position: "Veterinarian", organization: "Veterinary Medical Centers", dates: "Present" },
      { position: "Purchased practice, Owner & Veterinarian", organization: "Edgewood Animal Clinic", dates: "1991" }
    ],
    focusTitle: "Areas of experience",
    focus: [
      "Preventive and wellness care",
      "Veterinary surgery",
      "Veterinary dentistry",
      "Personalized small-animal care",
      "Coordinating specialist referrals when needed"
    ],
    relatedServices: [
      { label: "Pet wellness exams", href: "/services/pet-wellness-exams/" },
      { label: "Pet dental care", href: "/services/pet-dental-care/" },
      { label: "Soft tissue surgery", href: "/services/soft-tissue-surgery/" },
      { label: "Spay & neuter surgery", href: "/services/spay-neuter-surgery/" }
    ],
    personal: {
      title: "Outside the clinic",
      body: "Dr. Golatzki shares her home with her Shetland Sheepdogs, Andy and Cory. Together they've competed in agility, obedience, and tracking, so she understands firsthand how much a well-cared-for dog can do."
    },
    faqs: [
      {
        question: "Where did Dr. Golatzki go to veterinary school?",
        answer: "Dr. Rebecca Golatzki earned her Doctor of Veterinary Medicine from Auburn University College of Veterinary Medicine in 1990."
      },
      {
        question: "Is Dr. Golatzki from Northern Kentucky?",
        answer:
          "Yes. Dr. Golatzki grew up in Bellevue and Fort Wright, graduated from Scott High School, and has practiced veterinary medicine in Northern Kentucky since the early 1990s."
      },
      {
        question: "What kind of veterinary care does Dr. Golatzki provide?",
        answer: "Her experience includes wellness and preventive care, veterinary surgery, and dental care for dogs and cats."
      }
    ],
    seo: {
      title: "Dr. Rebecca Golatzki, DVM | Northern Kentucky Veterinarian",
      description:
        "Meet Dr. Rebecca (Becky) Golatzki, DVM, a Northern Kentucky native and Auburn graduate with 35+ years of experience in wellness, surgery, and pet dental care."
    }
  },
  {
    slug: "dr-valeria-dib-vazquez",
    name: "Dr. Valeria Dib-Vázquez",
    shortName: "Dr. Valeria",
    credentials: "DVM",
    role: "Associate Veterinarian",
    cardRole: "Associate Veterinarian · Fort Thomas",
    cardSummary:
      "Dr. Dib-Vázquez has a special interest in feline medicine, low-stress handling, and client education. She speaks English and Spanish.",
    location: "Fort Thomas",
    clinicSlugs: ["vet-in-fort-thomas-ky"],
    specialty: "Cat whisperer · Feline medicine",
    image: "/images/dr-valeria-dib-vazquez.webp",
    imageAlt: "Dr. Valeria Dib-Vázquez, DVM, cat-focused associate veterinarian at Veterinary Medical Center of Fort Thomas",
    tagline: "A cat-focused veterinarian in Fort Thomas, KY, with a passion for low-stress visits. Habla español.",
    summary:
      "Dr. Valeria Dib-Vázquez is an associate veterinarian at our Fort Thomas, KY clinic with a special interest in feline medicine. She trained at Ohio State and Purdue, previously practiced at a cat-only hospital in Cincinnati, and speaks fluent English and Spanish.",
    bio: [
      "Dr. Valeria Dib-Vázquez joined Veterinary Medical Center of Fort Thomas in July 2026. She brings a real passion for cats and for making vet visits calmer for them and for the people who love them.",
      "She earned her Doctor of Veterinary Medicine from The Ohio State University College of Veterinary Medicine in 2024 after completing a Bachelor of Science in Animal Sciences at Purdue University.",
      "Before joining VMC, she practiced at Cat Care Hospital in Cincinnati, a feline-only clinic. There she cared for cats at every life stage, from wellness and prevention through diagnostics and complex medical cases. Her clinical interests include feline internal medicine, skin and gastrointestinal conditions, and Fear Free–informed handling that keeps stress low for nervous patients.",
      "Dr. Dib-Vázquez believes in thoughtful, evidence-based medicine and in walking families through every reasonable option, including what fits their budget and their pet's temperament. She is fluent in English and Spanish, so more Northern Kentucky families can talk through their pet's care in the language they are most comfortable with."
    ],
    quickFacts: [
      { label: "Role", value: "Associate veterinarian" },
      { label: "Clinic", value: "Fort Thomas, KY" },
      { label: "Focus", value: "Feline medicine" },
      { label: "Languages", value: "English & Spanish" }
    ],
    education: [
      { credential: "Doctor of Veterinary Medicine (DVM)", institution: "The Ohio State University College of Veterinary Medicine", dates: "2020–2024" },
      { credential: "B.S. Animal Sciences, Pre-Veterinary Medicine", institution: "Purdue University", dates: "2016–2020" }
    ],
    alumniOf: ["The Ohio State University", "Purdue University"],
    languages: ["English", "Spanish"],
    experience: [
      { position: "Associate Veterinarian", organization: "Veterinary Medical Center of Fort Thomas", dates: "2026–Present" },
      { position: "Associate Veterinarian", organization: "Cat Care Hospital, Cincinnati", dates: "2024–2026" },
      { position: "Student Assistant", organization: "Purdue University College of Agriculture", dates: "2017–2020" },
      { position: "International Agricultural Project", organization: "Rivendell and Kingdom Building Farms, Zambia", dates: "2019" }
    ],
    focusTitle: "Clinical interests",
    focus: [
      "Preventive care for cats at every life stage",
      "Feline internal medicine",
      "Skin and gastrointestinal conditions",
      "Diagnostics and evidence-based treatment",
      "Fear Free–informed, low-stress handling",
      "Bilingual client education (English & Spanish)"
    ],
    relatedServices: [
      { label: "Pet wellness exams", href: "/services/pet-wellness-exams/" },
      { label: "Skin, ear & allergy care", href: "/services/skin-ear-allergy-care/" },
      { label: "Veterinary diagnostics", href: "/services/veterinary-diagnostics/" },
      { label: "Puppy & kitten care", href: "/services/puppy-kitten-care/" },
      { label: "Guide: best cat vets in Cincinnati & NKY", href: "/guides/cat-vets-cincinnati-northern-kentucky/" }
    ],
    faqs: [
      {
        question: "Is there a cat-focused veterinarian in Fort Thomas, KY?",
        answer:
          "Yes. Dr. Valeria Dib-Vázquez practices at Veterinary Medical Center of Fort Thomas and has a special interest in feline medicine. She previously worked at a cat-only hospital in Cincinnati."
      },
      {
        question: "Does Dr. Dib-Vázquez speak Spanish?",
        answer: "Yes. Dr. Dib-Vázquez is fluent in both English and Spanish."
      },
      {
        question: "Where did Dr. Dib-Vázquez go to veterinary school?",
        answer:
          "Dr. Dib-Vázquez earned her DVM from The Ohio State University College of Veterinary Medicine in 2024. She earned her bachelor's degree in Animal Sciences from Purdue University."
      }
    ],
    seo: {
      title: "Dr. Valeria Dib-Vázquez, DVM | Cat Vet in Fort Thomas, KY",
      description:
        "Meet Dr. Valeria Dib-Vázquez, DVM, a bilingual Fort Thomas, KY veterinarian with a special interest in feline medicine and low-stress, Fear Free–informed care."
    }
  }
];

export function getVeterinarian(slug: string) {
  return veterinarians.find((vet) => vet.slug === slug);
}
