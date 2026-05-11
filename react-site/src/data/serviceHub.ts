import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type ServiceCategory = "preventiveCare" | "medicalCare" | "dentalSurgery" | "lifeStageCare";

export const serviceCategoryLabels: Record<ServiceCategory, string> = {
  preventiveCare: "Preventive Care",
  medicalCare: "Medical Care",
  dentalSurgery: "Dental & Surgery",
  lifeStageCare: "Life Stage Care"
};

export type ServiceCard = {
  id: string;
  title: string;
  slug: string;
  serviceCategory: ServiceCategory;
  shortDescription: string;
  bestFor: string[];
  cta: string;
  cardIcon: string;
  featured?: boolean;
};

export type ServiceReason = {
  title: string;
  description: string;
};

export type ServiceStep = {
  stepTitle: string;
  stepDescription: string;
};

export type ServiceIncludedCare = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceAuthor = {
  name: string;
  title?: string;
  slug?: string;
  bio?: string;
  credentials?: string;
};

export type ServiceDetail = ServiceCard & {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  heroEyebrow?: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  heroImageSource?: SanityImageSource;
  heroImageAlt?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  overview?: PortableTextBlock[];
  overviewText: string[];
  symptomsOrReasons: ServiceReason[];
  whatToExpect: ServiceStep[];
  includedCare: ServiceIncludedCare[];
  whenToSchedule?: PortableTextBlock[];
  whenToScheduleText: string[];
  relatedServiceSlugs: string[];
  relatedServices?: ServiceCard[];
  faqs: ServiceFaq[];
  author?: ServiceAuthor;
  reviewedBy?: ServiceAuthor;
  publishedAt?: string;
  updatedAt?: string;
  locationRelevance: string[];
  appointmentType: string;
};

const defaultAuthor = {
  name: "Veterinary Medical Center of Northern Kentucky",
  title: "Local veterinary care team",
  slug: "veterinary-medical-center-nky"
};

export const serviceHubServices: ServiceDetail[] = [
  {
    id: "wellness-exams",
    title: "Pet Wellness Exams",
    slug: "wellness-exams",
    serviceCategory: "preventiveCare",
    shortDescription:
      "Routine exams help our veterinarians catch changes early, answer questions, and create a care plan based on your pet's age, lifestyle, and health history.",
    bestFor: ["Annual checkups", "New pets", "Preventive care"],
    cta: "Learn about wellness exams",
    cardIcon: "stethoscope",
    featured: true,
    metaTitle: "Pet Wellness Exams in Northern Kentucky | VMC",
    metaDescription:
      "Schedule pet wellness exams for dogs and cats in Northern Kentucky at Veterinary Medical Center in Fort Thomas and Independence.",
    focusKeyword: "pet wellness exams Northern Kentucky",
    heroEyebrow: "Preventive Veterinary Care",
    heroTitle: "Pet Wellness Exams in Northern Kentucky",
    heroDescription:
      "Wellness visits help dogs and cats stay healthier through every life stage with clear recommendations, vaccines, prevention planning, and time to talk through your questions.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Pet wellness exam at Veterinary Medical Center in Northern Kentucky",
    overviewText: [
      "A wellness exam at Veterinary Medical Center is a practical, relationship-based visit built around your pet's age, lifestyle, behavior, medical history, and home routine. These appointments help our veterinarians establish a baseline, notice subtle changes, and make preventive recommendations that fit your dog or cat.",
      "Families from Fort Thomas, Independence, and nearby Northern Kentucky communities use wellness visits to stay current on vaccines, parasite prevention, nutrition guidance, dental recommendations, and age-appropriate screening. We keep the conversation clear so you understand what matters now and what can be monitored over time."
    ],
    symptomsOrReasons: [
      { title: "Your pet is due for an annual checkup", description: "Most adult dogs and cats benefit from a yearly physical exam and prevention review." },
      { title: "You adopted a new pet", description: "A first visit helps confirm records, discuss risk factors, and create a care plan." },
      { title: "Your pet is entering a new life stage", description: "Puppies, kittens, adults, and seniors need different prevention and screening plans." }
    ],
    whatToExpect: [
      { stepTitle: "Review history and lifestyle", stepDescription: "We ask about diet, behavior, travel, home routine, medications, and prior records." },
      { stepTitle: "Complete a nose-to-tail exam", stepDescription: "Your veterinarian checks weight, teeth, skin, ears, eyes, heart, lungs, joints, and comfort." },
      { stepTitle: "Discuss prevention and next steps", stepDescription: "We review vaccines, parasite prevention, screening, dental care, and follow-up timing." }
    ],
    includedCare: [
      { title: "Physical exam", description: "A full exam helps us identify changes that may not be obvious at home." },
      { title: "Vaccine planning", description: "Recommendations are based on age, lifestyle, exposure risk, and local requirements." },
      { title: "Parasite prevention review", description: "We discuss heartworm, fleas, ticks, intestinal parasites, and year-round options." },
      { title: "Nutrition and dental guidance", description: "We talk through practical next steps for long-term comfort and health." }
    ],
    whenToScheduleText: [
      "Schedule a wellness exam once a year for most healthy adult pets. Puppies, kittens, senior pets, and pets with ongoing conditions may need more frequent visits."
    ],
    relatedServiceSlugs: ["dog-cat-vaccinations", "parasite-prevention", "senior-pet-care"],
    faqs: [
      { question: "How often should my pet have a wellness exam?", answer: "Most adult pets should be examined once a year. Seniors, puppies, kittens, and pets with chronic conditions may need more frequent visits." },
      { question: "Will you tell me which vaccines my pet needs?", answer: "Yes. We build vaccine recommendations around species, age, lifestyle, exposure risk, and local requirements." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Wellness visit"
  },
  {
    id: "dog-cat-vaccinations",
    title: "Dog & Cat Vaccinations",
    slug: "dog-cat-vaccinations",
    serviceCategory: "preventiveCare",
    shortDescription:
      "Vaccines help protect pets from serious and preventable diseases, with recommendations based on age, lifestyle, travel, exposure risk, and medical history.",
    bestFor: ["Puppies", "Kittens", "Lifestyle-based protection"],
    cta: "View vaccination care",
    cardIcon: "syringe",
    metaTitle: "Dog & Cat Vaccinations in Northern Kentucky | VMC",
    metaDescription: "Vaccination care for dogs, cats, puppies, and kittens in Fort Thomas and Independence KY.",
    heroTitle: "Dog & Cat Vaccinations in Northern Kentucky",
    heroDescription: "Vaccines are an important part of preventive veterinary care for dogs and cats, and our team helps choose the right protection for your pet's lifestyle.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Veterinarian providing dog and cat vaccination care in Northern Kentucky",
    overviewText: [
      "Vaccination visits at VMC are not one-size-fits-all. Our veterinarians consider your pet's age, species, travel habits, exposure risk, medical history, and local Northern Kentucky requirements before making recommendations.",
      "We explain which vaccines are core, which are lifestyle-based, and how often boosters may be needed. The goal is practical protection without unnecessary confusion."
    ],
    symptomsOrReasons: [
      { title: "Your puppy or kitten needs a vaccine series", description: "Young pets need timed boosters to build protection during early development." },
      { title: "Your adult pet is due for boosters", description: "Adult dogs and cats need periodic vaccine review and updates." },
      { title: "Your pet boards, travels, or visits social settings", description: "Lifestyle can affect vaccine recommendations." }
    ],
    whatToExpect: [
      { stepTitle: "Review records", stepDescription: "Bring prior vaccine records so we can avoid gaps or unnecessary repeats." },
      { stepTitle: "Discuss lifestyle", stepDescription: "We ask about travel, boarding, grooming, outdoor time, and exposure risk." },
      { stepTitle: "Create a vaccine plan", stepDescription: "You leave with clear timing for current and future boosters." }
    ],
    includedCare: [
      { title: "Vaccine record review", description: "We confirm what your pet has already received." },
      { title: "Lifestyle risk discussion", description: "Recommendations are tailored to your pet's actual exposure." },
      { title: "Booster schedule", description: "We explain what is due now and what comes next." }
    ],
    whenToScheduleText: ["Schedule vaccination care when your pet is new to your home, due for boosters, preparing to board, or overdue for preventive care."],
    relatedServiceSlugs: ["wellness-exams", "puppy-kitten-care", "parasite-prevention"],
    faqs: [
      { question: "Do indoor cats need vaccines?", answer: "Many indoor cats still benefit from core vaccines. Recommendations depend on age, history, household risk, and local requirements." },
      { question: "Can vaccines be done during a wellness exam?", answer: "Yes. Vaccines are commonly reviewed and administered during wellness visits when appropriate." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Preventive visit"
  },
  {
    id: "puppy-kitten-care",
    title: "Puppy & Kitten Care",
    slug: "puppy-kitten-care",
    serviceCategory: "lifeStageCare",
    shortDescription:
      "First exams, vaccine schedules, parasite prevention, nutrition guidance, microchipping, behavior questions, and early health planning for new pets.",
    bestFor: ["New puppies", "New kittens", "First-time pet owners"],
    cta: "Start puppy or kitten care",
    cardIcon: "baby",
    featured: true,
    metaTitle: "Puppy & Kitten Vet Care in Northern Kentucky | VMC",
    metaDescription: "Start puppy or kitten care with exams, vaccines, prevention, and practical guidance at VMC in Northern Kentucky.",
    heroTitle: "Puppy & Kitten Veterinary Care in Northern Kentucky",
    heroDescription: "New puppies and kittens need a strong start, and our team helps you understand exams, vaccines, prevention, nutrition, behavior, and early health planning.",
    heroImage: "/images/cat-closeup-hero.png",
    heroImageAlt: "Kitten veterinary care in Northern Kentucky",
    overviewText: [
      "A first puppy or kitten visit is about more than vaccines. It is a chance to confirm your pet's health, review records, answer early questions, and set up a realistic plan for prevention and growth.",
      "We help families in Fort Thomas, Independence, and nearby NKY communities understand vaccine timing, parasite prevention, nutrition, microchipping, socialization, litter box questions, and behavior basics."
    ],
    symptomsOrReasons: [
      { title: "You brought home a new puppy or kitten", description: "Schedule soon after adoption so records, vaccines, and prevention can be reviewed." },
      { title: "Your pet needs vaccine boosters", description: "Young pets usually need a timed vaccine series." },
      { title: "You have behavior or feeding questions", description: "Early guidance can make home routines easier." }
    ],
    whatToExpect: [
      { stepTitle: "Bring records", stepDescription: "Adoption paperwork and prior vaccine details help us plan the next steps." },
      { stepTitle: "Complete an exam", stepDescription: "We check growth, comfort, teeth, skin, ears, eyes, heart, and overall health." },
      { stepTitle: "Plan the next visits", stepDescription: "You leave with a clear booster and prevention schedule." }
    ],
    includedCare: [
      { title: "First physical exam", description: "A baseline exam helps identify early health concerns." },
      { title: "Vaccine schedule", description: "We map out timing for boosters and future wellness care." },
      { title: "Parasite prevention", description: "Young pets need protection and screening for common parasites." },
      { title: "Home-care guidance", description: "We discuss feeding, behavior, grooming, and safety basics." }
    ],
    whenToScheduleText: ["Schedule a puppy or kitten visit soon after adoption, even if your new pet appears healthy."],
    relatedServiceSlugs: ["dog-cat-vaccinations", "parasite-prevention", "wellness-exams"],
    faqs: [
      { question: "When should my puppy or kitten first see a vet?", answer: "Schedule soon after adoption or bringing your pet home so records, vaccines, parasites, and early health needs can be reviewed." },
      { question: "Should I bring adoption paperwork?", answer: "Yes. Bring any vaccine records, deworming details, medication information, and adoption paperwork you have." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "New pet visit"
  },
  {
    id: "pet-dental-care",
    title: "Pet Dental Care",
    slug: "pet-dental-care",
    serviceCategory: "dentalSurgery",
    shortDescription:
      "Dental exams, professional cleanings, dental X-rays when appropriate, and treatment recommendations for dogs and cats with oral health needs.",
    bestFor: ["Bad breath", "Tartar", "Chewing changes"],
    cta: "Explore dental care",
    cardIcon: "smilePlus",
    featured: true,
    metaTitle: "Pet Dental Care in Northern Kentucky | VMC",
    metaDescription: "Veterinary dental exams and professional dental care for dogs and cats in Fort Thomas and Independence KY.",
    heroTitle: "Pet Dental Care in Northern Kentucky",
    heroDescription: "Dental disease can affect comfort, breath, eating, and overall health, so our team helps families understand oral findings and treatment options clearly.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Pet dental care at Veterinary Medical Center in Northern Kentucky",
    overviewText: [
      "Pet dental care at VMC starts with an oral evaluation and a conversation about what you are noticing at home. Bad breath, tartar, red gums, drooling, and chewing changes can all point to oral discomfort or disease.",
      "When professional dental cleaning or treatment is recommended, we explain preparation, anesthesia, monitoring, dental X-rays when appropriate, recovery, and home-care steps so you know what to expect."
    ],
    symptomsOrReasons: [
      { title: "Bad breath or visible tartar", description: "These can be signs of dental disease that should be evaluated." },
      { title: "Chewing changes", description: "Dropping food, favoring one side, or avoiding hard food can signal oral discomfort." },
      { title: "Red gums or drooling", description: "Inflammation and saliva changes deserve a veterinary exam." }
    ],
    whatToExpect: [
      { stepTitle: "Oral exam", stepDescription: "We assess visible teeth, gums, breath, and signs of discomfort." },
      { stepTitle: "Treatment discussion", stepDescription: "Your veterinarian explains whether cleaning, imaging, or treatment may be recommended." },
      { stepTitle: "Home-care plan", stepDescription: "We review practical ways to support dental health after the visit." }
    ],
    includedCare: [
      { title: "Oral health assessment", description: "A veterinarian reviews visible dental concerns and symptoms." },
      { title: "Professional cleaning plan", description: "Dental cleanings may be recommended when tartar or gum disease is present." },
      { title: "Dental treatment planning", description: "We discuss extractions or additional care when needed." }
    ],
    whenToScheduleText: ["Schedule dental care if your pet has bad breath, tartar, red gums, mouth sensitivity, drooling, or chewing changes."],
    relatedServiceSlugs: ["wellness-exams", "senior-pet-care", "soft-tissue-surgery"],
    faqs: [
      { question: "Do pets need anesthesia for dental cleanings?", answer: "Professional dental cleanings typically require anesthesia so the team can clean below the gumline and evaluate the mouth safely." },
      { question: "Can dental disease affect comfort?", answer: "Yes. Dental disease can contribute to pain, chewing changes, infection, and reduced quality of life." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Dental consultation"
  },
  {
    id: "spay-neuter-surgery",
    title: "Spay & Neuter Surgery",
    slug: "spay-neuter-surgery",
    serviceCategory: "dentalSurgery",
    shortDescription:
      "Spay and neuter procedures with guidance on timing, preparation, safety, monitoring, pain control, and recovery at home.",
    bestFor: ["Puppies", "Kittens", "Newly adopted pets"],
    cta: "Learn about spay & neuter",
    cardIcon: "shieldCheck",
    metaTitle: "Spay & Neuter Surgery in Northern Kentucky | VMC",
    metaDescription: "Spay and neuter surgery planning for dogs and cats at Veterinary Medical Center in Northern Kentucky.",
    heroTitle: "Spay & Neuter Surgery in Northern Kentucky",
    heroDescription: "Our team helps families understand spay and neuter timing, preparation, anesthesia, monitoring, pain control, and recovery for dogs and cats.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Veterinary surgery planning for dogs and cats in Northern Kentucky",
    overviewText: [
      "Spay and neuter procedures are common veterinary surgeries, but every pet still deserves thoughtful preparation and monitoring. At VMC, we discuss timing, health history, pre-surgical considerations, anesthesia, pain control, and recovery before the procedure.",
      "Our goal is to make the process clear and manageable for families while keeping your pet's comfort and safety central."
    ],
    symptomsOrReasons: [
      { title: "Your puppy or kitten is reaching the right age", description: "Your veterinarian can help choose timing based on species, breed, health, and lifestyle." },
      { title: "You adopted an intact pet", description: "We can review records and discuss whether surgery is appropriate." },
      { title: "You need prevention planning", description: "Spay and neuter may reduce certain reproductive risks and prevent unwanted litters." }
    ],
    whatToExpect: [
      { stepTitle: "Pre-surgical review", stepDescription: "We discuss health history, timing, preparation, and recommended lab work." },
      { stepTitle: "Surgery and monitoring", stepDescription: "Your pet is monitored during anesthesia and recovery." },
      { stepTitle: "Home recovery", stepDescription: "You receive clear instructions for activity, incision checks, and medications." }
    ],
    includedCare: [
      { title: "Anesthesia planning", description: "Health history and testing help guide preparation." },
      { title: "Pain control", description: "Comfort is part of the surgical plan." },
      { title: "Recovery instructions", description: "We explain activity restriction, incision monitoring, and when to call." }
    ],
    whenToScheduleText: ["Ask about spay or neuter timing during a puppy, kitten, adoption, or wellness visit."],
    relatedServiceSlugs: ["soft-tissue-surgery", "puppy-kitten-care", "veterinary-diagnostics"],
    faqs: [
      { question: "When should my pet be spayed or neutered?", answer: "Timing depends on species, age, breed, health, lifestyle, and medical history. Your veterinarian can help you decide." },
      { question: "Will I receive recovery instructions?", answer: "Yes. We send home written instructions and review key recovery steps before your pet leaves." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Surgical consultation"
  },
  {
    id: "soft-tissue-surgery",
    title: "Soft Tissue Surgery",
    slug: "soft-tissue-surgery",
    serviceCategory: "dentalSurgery",
    shortDescription:
      "Common soft tissue procedures with careful monitoring, pain management, and clear post-operative instructions.",
    bestFor: ["Mass removals", "Wound care", "Select routine procedures"],
    cta: "Learn about surgery",
    cardIcon: "scissors",
    metaTitle: "Pet Soft Tissue Surgery in Northern Kentucky | VMC",
    metaDescription: "Soft tissue surgery for dogs and cats with careful monitoring and recovery guidance in Northern Kentucky.",
    heroTitle: "Pet Soft Tissue Surgery in Northern Kentucky",
    heroDescription: "For dogs and cats who need selected soft tissue procedures, VMC focuses on preparation, monitoring, communication, pain control, and recovery support.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Pet soft tissue surgery planning in Northern Kentucky",
    overviewText: [
      "Soft tissue surgery can include procedures such as spays, neuters, mass removals, wound repairs, and selected outpatient surgeries. Each surgical recommendation begins with an exam, health history, and conversation about goals and risks.",
      "Our team emphasizes preparation, monitoring, comfort, and clear recovery instructions so families know how to care for their pet after the visit."
    ],
    symptomsOrReasons: [
      { title: "Your pet has a mass or lump", description: "A veterinarian can evaluate whether monitoring, sampling, or removal may be appropriate." },
      { title: "Your pet has a wound", description: "Some wounds need cleaning, closure, medication, or surgical repair." },
      { title: "A routine procedure is recommended", description: "We explain what is involved before scheduling surgery." }
    ],
    whatToExpect: [
      { stepTitle: "Surgical consultation", stepDescription: "We review the concern, health history, and recommended next steps." },
      { stepTitle: "Procedure day", stepDescription: "Your pet receives planned monitoring and pain management." },
      { stepTitle: "Recovery support", stepDescription: "We explain medications, activity limits, incision care, and recheck timing." }
    ],
    includedCare: [
      { title: "Pre-anesthetic planning", description: "Testing and history help us plan more safely." },
      { title: "Monitoring", description: "The team monitors your pet during anesthesia and recovery." },
      { title: "Discharge instructions", description: "You leave with clear home-care steps." }
    ],
    whenToScheduleText: ["Schedule a surgical consultation if your pet has a lump, wound, or condition that may need a procedure."],
    relatedServiceSlugs: ["spay-neuter-surgery", "veterinary-diagnostics", "pet-dental-care"],
    faqs: [
      { question: "What surgeries do you perform?", answer: "Common soft tissue procedures include spays, neuters, mass removals, wound repairs, and selected outpatient procedures." },
      { question: "Will my pet need bloodwork before surgery?", answer: "Pre-surgical lab work may be recommended based on age, health, procedure type, and medical history." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Surgical consultation"
  },
  {
    id: "sick-pet-visits",
    title: "Sick Pet Visits",
    slug: "sick-pet-visits",
    serviceCategory: "medicalCare",
    shortDescription:
      "Evaluation for vomiting, limping, coughing, appetite changes, pain, lethargy, behavior changes, or pets who are not acting like themselves.",
    bestFor: ["New symptoms", "Behavior changes", "Illness concerns"],
    cta: "Schedule a sick visit",
    cardIcon: "heartPulse",
    featured: true,
    metaTitle: "Sick Pet Visits in Northern Kentucky | VMC",
    metaDescription: "Veterinary sick visits for dogs and cats with new symptoms in Fort Thomas and Independence KY.",
    heroTitle: "Sick Pet Visits in Northern Kentucky",
    heroDescription: "When your dog or cat is not acting like themselves, our team can evaluate symptoms, explain findings, and help you choose practical next steps.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Veterinarian evaluating a sick pet in Northern Kentucky",
    overviewText: [
      "Sick pet visits are for concerns that should not wait for a routine wellness exam. Vomiting, diarrhea, coughing, limping, eye redness, appetite changes, painful behavior, urinary changes, and sudden lethargy all deserve veterinary guidance.",
      "Call first if symptoms seem urgent. Our Fort Thomas and Independence teams can help determine whether VMC, a same-day appointment, or an emergency hospital is the safest next step."
    ],
    symptomsOrReasons: [
      { title: "Vomiting, diarrhea, or appetite changes", description: "Digestive symptoms can have many causes and may need timely care." },
      { title: "Limping or signs of pain", description: "Painful movement, reluctance to jump, or sudden behavior changes should be evaluated." },
      { title: "Coughing, eye, ear, or urinary concerns", description: "These symptoms can worsen without appropriate guidance." }
    ],
    whatToExpect: [
      { stepTitle: "Triage and history", stepDescription: "We ask what changed, when it started, and what you have noticed at home." },
      { stepTitle: "Physical exam", stepDescription: "Your veterinarian evaluates your pet and discusses possible causes." },
      { stepTitle: "Plan next steps", stepDescription: "Recommendations may include monitoring, medication, diagnostics, or referral when needed." }
    ],
    includedCare: [
      { title: "Medical exam", description: "An exam helps narrow down likely causes." },
      { title: "Diagnostic recommendations", description: "Testing may be recommended when symptoms are unclear." },
      { title: "Treatment plan", description: "We explain medications, home care, and warning signs." }
    ],
    whenToScheduleText: ["Schedule a sick visit when your pet has new symptoms, pain, behavior changes, or is not acting like themselves."],
    relatedServiceSlugs: ["veterinary-diagnostics", "skin-ear-allergy-care", "wellness-exams"],
    faqs: [
      { question: "Should I call before bringing in a sick pet?", answer: "Yes. Calling first helps us triage your pet and recommend the safest next step." },
      { question: "Do you handle emergencies?", answer: "VMC sees urgent concerns during clinic hours, but life-threatening emergencies should go to a 24-hour emergency hospital." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Sick visit"
  },
  {
    id: "veterinary-diagnostics",
    title: "Veterinary Diagnostics",
    slug: "veterinary-diagnostics",
    serviceCategory: "medicalCare",
    shortDescription:
      "Lab work, imaging discussions, and other testing recommendations that help guide care for illness, senior pets, surgery, or unclear symptoms.",
    bestFor: ["Illness", "Senior pets", "Pre-surgical screening"],
    cta: "Learn about diagnostics",
    cardIcon: "microscope",
    metaTitle: "Veterinary Diagnostics in Northern Kentucky | VMC",
    metaDescription: "Diagnostic testing guidance for dogs and cats in Northern Kentucky at VMC Fort Thomas and Independence.",
    heroTitle: "Veterinary Diagnostics in Northern Kentucky",
    heroDescription: "Diagnostic testing can help us better understand what is happening inside your pet's body and choose next steps with more clarity.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Veterinary diagnostics for dogs and cats in Northern Kentucky",
    overviewText: [
      "Diagnostics are often recommended when symptoms are unclear, a pet is aging, surgery is planned, or a condition needs monitoring. Testing may help identify patterns that cannot be seen from an exam alone.",
      "At VMC, we explain why a test is recommended, what information it may provide, and how results could affect the care plan."
    ],
    symptomsOrReasons: [
      { title: "Symptoms do not have an obvious cause", description: "Testing can help narrow possible explanations." },
      { title: "Your senior pet needs monitoring", description: "Lab work can reveal changes before they are obvious at home." },
      { title: "Surgery or dental care is planned", description: "Pre-anesthetic testing may support safer planning." }
    ],
    whatToExpect: [
      { stepTitle: "Discuss the goal", stepDescription: "We explain what the test may help us learn." },
      { stepTitle: "Collect samples or imaging as appropriate", stepDescription: "Recommendations depend on your pet's condition and comfort." },
      { stepTitle: "Review results", stepDescription: "We connect results to practical next steps." }
    ],
    includedCare: [
      { title: "Lab work discussion", description: "Blood, urine, or other samples may be recommended." },
      { title: "Pre-surgical screening", description: "Testing can help inform anesthesia planning." },
      { title: "Follow-up planning", description: "Results help guide treatment or monitoring." }
    ],
    whenToScheduleText: ["Diagnostics may be recommended during sick visits, senior visits, dental planning, surgery planning, or chronic condition care."],
    relatedServiceSlugs: ["sick-pet-visits", "senior-pet-care", "soft-tissue-surgery"],
    faqs: [
      { question: "Will you explain why testing is recommended?", answer: "Yes. We explain what each test may help us learn and how it could change the care plan." },
      { question: "Are diagnostics only for sick pets?", answer: "No. Diagnostics can also support senior screening, pre-surgical planning, and monitoring ongoing conditions." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Medical visit"
  },
  {
    id: "senior-pet-care",
    title: "Senior Pet Care",
    slug: "senior-pet-care",
    serviceCategory: "lifeStageCare",
    shortDescription:
      "More frequent monitoring, early detection, mobility support, dental care, and chronic condition guidance for aging dogs and cats.",
    bestFor: ["Aging dogs", "Aging cats", "Chronic health concerns"],
    cta: "Plan senior pet care",
    cardIcon: "activity",
    metaTitle: "Senior Pet Care in Northern Kentucky | VMC",
    metaDescription: "Senior dog and cat veterinary care in Fort Thomas and Independence, including monitoring, diagnostics, and quality-of-life support.",
    heroTitle: "Senior Pet Care in Northern Kentucky",
    heroDescription: "Older dogs and cats benefit from attentive monitoring, practical communication, and care plans that support comfort and quality of life.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Senior pet care at Veterinary Medical Center in Northern Kentucky",
    overviewText: [
      "Senior pet care focuses on early detection, comfort, mobility, dental health, nutrition, and chronic condition support. Subtle changes in thirst, appetite, weight, behavior, or movement can matter more as pets age.",
      "Our veterinarians help families understand what is normal aging, what deserves attention, and how to make practical choices for comfort and quality of life."
    ],
    symptomsOrReasons: [
      { title: "Your pet is slowing down", description: "Mobility, pain, dental disease, and medical changes can affect activity." },
      { title: "You notice weight, appetite, or thirst changes", description: "These changes may warrant an exam and diagnostics." },
      { title: "Your pet has an ongoing condition", description: "Regular monitoring helps adjust care over time." }
    ],
    whatToExpect: [
      { stepTitle: "Review home changes", stepDescription: "We ask about appetite, thirst, bathroom habits, mobility, behavior, and comfort." },
      { stepTitle: "Complete an exam", stepDescription: "Your veterinarian checks for pain, dental disease, weight changes, and other concerns." },
      { stepTitle: "Discuss monitoring", stepDescription: "Diagnostics, medications, nutrition, or recheck plans may be recommended." }
    ],
    includedCare: [
      { title: "Senior physical exam", description: "Exam findings help guide recommendations." },
      { title: "Diagnostic screening", description: "Lab work may identify changes early." },
      { title: "Quality-of-life support", description: "We discuss comfort, mobility, and home-care adjustments." }
    ],
    whenToScheduleText: ["Ask about senior pet care when your dog or cat is aging, slowing down, or showing changes in appetite, weight, thirst, mobility, or behavior."],
    relatedServiceSlugs: ["wellness-exams", "veterinary-diagnostics", "nutrition-weight-guidance"],
    faqs: [
      { question: "How often should senior pets see a veterinarian?", answer: "Many senior pets benefit from exams every six months, especially if they have chronic conditions or new changes." },
      { question: "Can you help with mobility changes?", answer: "Yes. We can evaluate pain, arthritis concerns, weight, and practical comfort strategies." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Senior wellness visit"
  },
  {
    id: "parasite-prevention",
    title: "Parasite Prevention",
    slug: "parasite-prevention",
    serviceCategory: "preventiveCare",
    shortDescription:
      "Year-round guidance for fleas, ticks, heartworms, and intestinal parasites based on your pet's lifestyle and local Northern Kentucky risks.",
    bestFor: ["Year-round protection", "Outdoor pets", "Puppies and kittens"],
    cta: "Ask about prevention",
    cardIcon: "shieldCheck",
    metaTitle: "Parasite Prevention for Pets in Northern Kentucky | VMC",
    metaDescription: "Flea, tick, heartworm, and intestinal parasite prevention guidance for dogs and cats in Northern Kentucky.",
    heroTitle: "Parasite Prevention for Dogs & Cats in Northern Kentucky",
    heroDescription: "Parasite prevention helps protect pets and families from fleas, ticks, heartworms, and intestinal parasites common in local environments.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Parasite prevention discussion for dogs and cats in Northern Kentucky",
    overviewText: [
      "Parasite prevention should fit your pet's lifestyle, age, health, and risk. Dogs and cats in Northern Kentucky may be exposed to fleas, ticks, heartworms, and intestinal parasites even when they spend most of their time close to home.",
      "Our team helps you compare prevention options and understand testing, timing, and year-round protection."
    ],
    symptomsOrReasons: [
      { title: "Your pet goes outdoors", description: "Outdoor exposure increases risk for fleas, ticks, and other parasites." },
      { title: "Your pet is young or newly adopted", description: "Puppies, kittens, and adopted pets often need parasite screening and prevention." },
      { title: "You need year-round protection", description: "Consistent prevention helps reduce gaps in protection." }
    ],
    whatToExpect: [
      { stepTitle: "Discuss lifestyle", stepDescription: "We ask about outdoor time, travel, other pets, and exposure risk." },
      { stepTitle: "Review testing", stepDescription: "Testing may be recommended for heartworms or intestinal parasites." },
      { stepTitle: "Choose prevention", stepDescription: "We help match options to your pet and household." }
    ],
    includedCare: [
      { title: "Risk review", description: "Prevention is based on real exposure factors." },
      { title: "Testing guidance", description: "Screening may be recommended depending on species and history." },
      { title: "Prevention plan", description: "You leave with clear dosing and timing instructions." }
    ],
    whenToScheduleText: ["Discuss parasite prevention during wellness visits, puppy or kitten visits, adoption visits, or anytime your pet has a gap in protection."],
    relatedServiceSlugs: ["wellness-exams", "dog-cat-vaccinations", "puppy-kitten-care"],
    faqs: [
      { question: "Do indoor pets need parasite prevention?", answer: "Some indoor pets still face parasite risks. Recommendations depend on species, lifestyle, household pets, and local exposure." },
      { question: "Is prevention needed year-round?", answer: "Year-round prevention is often recommended because parasite exposure can be unpredictable." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Preventive visit"
  },
  {
    id: "skin-ear-allergy-care",
    title: "Skin, Ear & Allergy Care",
    slug: "skin-ear-allergy-care",
    serviceCategory: "medicalCare",
    shortDescription:
      "Evaluation for itching, licking, ear odor, hair loss, hot spots, recurring skin irritation, and allergy-related symptoms.",
    bestFor: ["Itching", "Ear infections", "Hot spots and allergies"],
    cta: "Get skin & ear help",
    cardIcon: "clipboardList",
    metaTitle: "Pet Skin, Ear & Allergy Care in Northern Kentucky | VMC",
    metaDescription: "Veterinary care for itching, ear infections, hot spots, and allergy symptoms in dogs and cats in Northern Kentucky.",
    heroTitle: "Pet Skin, Ear & Allergy Care in Northern Kentucky",
    heroDescription: "Itching, licking, ear odor, hair loss, and recurring irritation can have many causes, and our team can help evaluate symptoms and next steps.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Veterinary skin and ear care for pets in Northern Kentucky",
    overviewText: [
      "Skin, ear, and allergy symptoms are common reasons dogs and cats need veterinary care. The cause may involve parasites, infection, environmental allergies, food concerns, pain, or another underlying issue.",
      "We evaluate symptoms, discuss your pet's history, and explain treatment options in a way that is practical for home care."
    ],
    symptomsOrReasons: [
      { title: "Itching, licking, or chewing", description: "Ongoing irritation can damage skin and affect comfort." },
      { title: "Ear odor or head shaking", description: "Ear symptoms may indicate inflammation, infection, or allergy-related issues." },
      { title: "Hair loss, redness, or hot spots", description: "Visible skin changes should be evaluated before they worsen." }
    ],
    whatToExpect: [
      { stepTitle: "History and exam", stepDescription: "We ask when symptoms started and examine affected areas." },
      { stepTitle: "Discuss possible causes", stepDescription: "Your veterinarian explains likely contributors and whether testing is recommended." },
      { stepTitle: "Create a treatment plan", stepDescription: "Care may include medication, cleaning, prevention, diet discussion, or follow-up." }
    ],
    includedCare: [
      { title: "Skin and ear exam", description: "Exam findings help guide treatment." },
      { title: "Diagnostic discussion", description: "Testing may be recommended for infection, parasites, or other causes." },
      { title: "Home-care plan", description: "We explain medication, cleaning, prevention, and recheck timing." }
    ],
    whenToScheduleText: ["Schedule a visit if your pet is itchy, licking, shaking their head, has ear odor, hot spots, hair loss, or recurring irritation."],
    relatedServiceSlugs: ["sick-pet-visits", "veterinary-diagnostics", "nutrition-weight-guidance"],
    faqs: [
      { question: "Can allergies cause ear infections?", answer: "Allergies can contribute to recurring ear and skin issues in some pets, but an exam is needed to understand likely causes." },
      { question: "Should I try over-the-counter products first?", answer: "Call before using products in painful ears or irritated skin. Some concerns need exam-based treatment." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Medical visit"
  },
  {
    id: "nutrition-weight-guidance",
    title: "Nutrition & Weight Guidance",
    slug: "nutrition-weight-guidance",
    serviceCategory: "preventiveCare",
    shortDescription:
      "Practical guidance for food choices, feeding routines, weight changes, life-stage nutrition, and diet questions tied to your pet's health needs.",
    bestFor: ["Weight management", "Diet questions", "Life-stage nutrition"],
    cta: "Talk about nutrition",
    cardIcon: "apple",
    metaTitle: "Pet Nutrition & Weight Guidance in Northern Kentucky | VMC",
    metaDescription: "Nutrition and weight guidance for dogs and cats at Veterinary Medical Center in Northern Kentucky.",
    heroTitle: "Pet Nutrition & Weight Guidance in Northern Kentucky",
    heroDescription: "Food choices, weight changes, and feeding routines can affect long-term health, and our team helps families make practical nutrition decisions.",
    heroImage: "/images/veterinary-care-hero.jpg",
    heroImageAlt: "Pet nutrition guidance at Veterinary Medical Center in Northern Kentucky",
    overviewText: [
      "Nutrition advice should be tied to your pet's age, breed, activity level, body condition, medical needs, and home routine. There is rarely one perfect answer for every dog or cat.",
      "At VMC, we help families talk through food choices, feeding amounts, weight changes, treats, life-stage transitions, and nutrition questions connected to medical care."
    ],
    symptomsOrReasons: [
      { title: "Your pet is gaining or losing weight", description: "Weight changes can affect comfort and may point to health concerns." },
      { title: "You are changing life stages", description: "Puppies, kittens, adults, and seniors have different nutrition needs." },
      { title: "You feel overwhelmed by food choices", description: "We can help narrow options based on your pet's needs." }
    ],
    whatToExpect: [
      { stepTitle: "Review current feeding", stepDescription: "We ask about food, portions, treats, supplements, and routines." },
      { stepTitle: "Assess health and body condition", stepDescription: "Exam findings help shape recommendations." },
      { stepTitle: "Create practical next steps", stepDescription: "We focus on changes that are realistic for your household." }
    ],
    includedCare: [
      { title: "Body condition review", description: "Weight alone does not tell the full story." },
      { title: "Diet discussion", description: "We talk through food type, amount, treats, and goals." },
      { title: "Follow-up plan", description: "Rechecks may help track progress over time." }
    ],
    whenToScheduleText: ["Ask about nutrition during wellness visits, senior care, weight changes, chronic condition visits, or anytime you are unsure what to feed."],
    relatedServiceSlugs: ["wellness-exams", "senior-pet-care", "skin-ear-allergy-care"],
    faqs: [
      { question: "Can you recommend a specific food?", answer: "We can discuss food choices based on your pet's age, health, body condition, and medical needs." },
      { question: "Should I be concerned about weight gain?", answer: "Weight gain can affect comfort and long-term health. A visit can help identify realistic next steps." }
    ],
    author: defaultAuthor,
    updatedAt: "2026-05-11",
    locationRelevance: ["Fort Thomas", "Independence", "Northern Kentucky"],
    appointmentType: "Wellness or medical visit"
  }
];

export function getStaticServiceDetail(slug: string) {
  return serviceHubServices.find((service) => service.slug === slug) || null;
}

export function getStaticRelatedServices(slugs: string[]) {
  return slugs
    .map((slug) => serviceHubServices.find((service) => service.slug === slug))
    .filter((service): service is ServiceDetail => Boolean(service));
}
