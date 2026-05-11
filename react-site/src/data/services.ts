import type { FAQ } from "./faqs";

export type Service = {
  title: string;
  slug: string;
  icon: string;
  excerpt: string;
  intro: string;
  highlights: string[];
  body: string[];
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
  };
};

export const services: Service[] = [
  {
    title: "Wellness Exams & Preventive Care",
    slug: "pet-wellness-exams-northern-kentucky",
    icon: "wellness",
    excerpt:
      "Annual and biannual checkups with vaccinations, parasite prevention, screening recommendations, and practical life-stage guidance.",
    intro:
      "Preventive care helps dogs and cats stay comfortable while giving families a clear plan for vaccines, parasite prevention, nutrition, and early detection.",
    highlights: ["Nose-to-tail physical exams", "Vaccines matched to lifestyle", "Parasite prevention and nutrition guidance"],
    body: [
      "A wellness visit at VMC is more than a quick vaccine stop. Our veterinarians review your pet's history, behavior, diet, home routine, travel, and risk factors so the plan makes sense for your household.",
      "We serve puppies, kittens, adult pets, and seniors at both Fort Thomas and Independence. When we find a concern early, families often have more treatment options and less stress."
    ],
    faqs: [
      { question: "How often should my pet have a wellness exam?", answer: "Most adult pets should be examined once a year. Seniors, puppies, kittens, and pets with chronic conditions may need more frequent visits." },
      { question: "Will you tell me which vaccines my pet actually needs?", answer: "Yes. We build vaccine recommendations around species, age, lifestyle, exposure risk, and local requirements." }
    ],
    seo: {
      title: "Pet Wellness Exams in Northern Kentucky | VMC",
      description: "Wellness exams, vaccines, prevention, and life-stage care for dogs and cats at VMC Fort Thomas and Independence."
    }
  },
  {
    title: "Dental Care & COHAT Cleanings",
    slug: "pet-dental-care-northern-kentucky",
    icon: "dental",
    excerpt:
      "Professional dental cleanings under anesthesia, oral health assessments, dental radiography when indicated, and extractions when needed.",
    intro:
      "Dental disease can affect comfort, appetite, and long-term health. Our team helps families understand what is happening in the mouth and what care is appropriate.",
    highlights: ["Oral health assessment", "Professional cleaning under anesthesia", "Home-care guidance"],
    body: [
      "A COHAT, or comprehensive oral health assessment and treatment, allows our team to clean below the gumline and assess areas that cannot be evaluated during an awake exam.",
      "We explain findings clearly and send home practical instructions so recovery and prevention feel manageable."
    ],
    faqs: [
      { question: "Why does my pet need anesthesia for a dental cleaning?", answer: "Anesthesia allows a complete oral exam, cleaning below the gumline, pain control, and safe treatment without fear or movement." },
      { question: "How do I know if my pet has dental disease?", answer: "Bad breath, tartar, red gums, drooling, chewing changes, and mouth sensitivity can all be warning signs." }
    ],
    seo: {
      title: "Pet Dental Care in Northern Kentucky | VMC",
      description: "Veterinary dental cleanings, oral assessments, and treatment planning for dogs and cats in Northern Kentucky."
    }
  },
  {
    title: "Soft Tissue Surgery",
    slug: "pet-soft-tissue-surgery-northern-kentucky",
    icon: "surgery",
    excerpt:
      "Spays, neuters, mass removals, and common soft tissue procedures with anesthesia planning, monitoring, and recovery support.",
    intro:
      "Surgical care at VMC emphasizes preparation, pain control, close monitoring, and simple instructions for home recovery.",
    highlights: ["Pre-anesthetic planning", "Careful monitoring", "Clear recovery instructions"],
    body: [
      "Before surgery, we review health history and discuss recommended pre-anesthetic testing. During the procedure, our team monitors comfort and vital signs closely.",
      "After surgery, you receive clear discharge notes and direct guidance on activity restriction, medications, incision monitoring, and when to call."
    ],
    faqs: [
      { question: "What surgeries do you perform?", answer: "Common soft tissue procedures include spays, neuters, mass removals, wound repairs, and selected outpatient procedures." },
      { question: "Will I receive recovery instructions?", answer: "Yes. We send home written instructions and explain the important recovery steps before your pet leaves." }
    ],
    seo: {
      title: "Pet Soft Tissue Surgery in Northern Kentucky | VMC",
      description: "Spays, neuters, mass removals, and common soft tissue procedures with careful monitoring and recovery support."
    }
  },
  {
    title: "Behavior Consultations",
    slug: "pet-behavior-consultations-northern-kentucky",
    icon: "behavioral",
    excerpt:
      "Support for anxiety, aggression, litter box issues, fear, and stress-related behavior with medical causes considered first.",
    intro:
      "Behavior concerns often have medical, environmental, and training components. We help families understand the likely causes and choose practical next steps.",
    highlights: ["Medical causes considered", "Practical family-friendly plans", "Fear-Free handling approach"],
    body: [
      "Behavior visits may include a medical exam, history review, environmental discussion, and recommendations for training support, medication, or behavior modification where appropriate.",
      "Our goal is to make the plan realistic for your home and safer for your pet, your family, and the veterinary team."
    ],
    faqs: [
      { question: "Can a medical issue cause behavior changes?", answer: "Yes. Pain, urinary disease, thyroid disease, neurologic changes, and other conditions can affect behavior." },
      { question: "Do you help with cat litter box issues?", answer: "Yes. We assess possible medical causes first, then talk through litter box setup, stress, and household changes." }
    ],
    seo: {
      title: "Pet Behavior Consultations in Northern Kentucky | VMC",
      description: "Support for anxiety, aggression, litter box issues, stress behaviors, and practical next steps."
    }
  },
  {
    title: "Urgent Care During Clinic Hours",
    slug: "northern-kentucky-urgent-care-vet",
    icon: "urgent",
    excerpt:
      "Same-day guidance for concerns that cannot wait, including illness, injuries, vomiting, limping, eye issues, and sudden behavior changes.",
    intro:
      "If your pet is sick or injured, call us first. Our team can help decide whether VMC, a same-day visit, or a 24-hour emergency hospital is the safest option.",
    highlights: ["Same-day guidance when available", "Both NKY locations", "Call first for triage"],
    body: [
      "Urgent care availability depends on the day, location, and severity of the concern. Calling ahead lets us prepare, reduce wait time, and direct true emergencies appropriately.",
      "Common urgent concerns include repeated vomiting, diarrhea, wounds, limping, ear pain, eye redness, coughing, urinary problems, and sudden lethargy."
    ],
    faqs: [
      { question: "Should I call before coming in?", answer: "Yes. Calling first helps us triage your pet and recommend the safest next step." },
      { question: "Do you replace a 24-hour emergency hospital?", answer: "No. We provide urgent care during clinic hours and refer life-threatening emergencies to 24-hour facilities when needed." }
    ],
    seo: {
      title: "Urgent Care Vet in Northern Kentucky | VMC",
      description: "Call VMC for urgent veterinary concerns during regular clinic hours at Fort Thomas and Independence."
    }
  },
  {
    title: "Cat-Friendly Appointments",
    slug: "cat-friendly-vet-northern-kentucky",
    icon: "feline",
    excerpt:
      "Lower-stress feline care with thoughtful handling, quieter visit flow, travel advice, and care plans designed for cats.",
    intro:
      "Cats deserve veterinary care that respects their stress signals, medical needs, and home routines.",
    highlights: ["Quieter visit flow", "Cat-specific handling", "Travel and home-care advice"],
    body: [
      "We help cat owners prepare for visits with carrier tips, arrival guidance, and handling preferences. During the exam, our team works at a calmer pace when possible.",
      "Cat-friendly care includes wellness, vaccines, dental care, senior screening, behavior discussions, and support for chronic conditions."
    ],
    faqs: [
      { question: "My cat hates the carrier. Can you help?", answer: "Yes. We can share carrier training tips, travel strategies, and pre-visit planning for fearful cats." },
      { question: "Do indoor cats still need vet visits?", answer: "Yes. Indoor cats still need exams, vaccines based on risk, dental care, parasite discussions, and senior screening." }
    ],
    seo: {
      title: "Cat-Friendly Vet in Northern Kentucky | VMC",
      description: "Low-stress feline appointments for cats in Northern Kentucky at VMC."
    }
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
