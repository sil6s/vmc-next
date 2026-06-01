import fs from "node:fs";
import { createClient } from "next-sanity";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zk507aly";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function loadEnvFile() {
  if (!fs.existsSync(".env.local")) return {};
  return Object.fromEntries(
    fs
      .readFileSync(".env.local", "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const [key, ...value] = line.split("=");
        return [key, value.join("=").replace(/^["']|["']$/g, "")];
      })
  );
}

const env = loadEnvFile();
const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("SANITY_API_WRITE_TOKEN is required to update Sanity posts.");
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-06-01",
  useCdn: false,
  token
});

const today = "2026-06-01";
let keyIndex = 0;
const key = (prefix = "k") => `${prefix}-${Date.now().toString(36)}-${(keyIndex++).toString(36)}`;

const skippedSlugs = new Set([
  "heartworm-prevention-in-northern-kentucky-dogs-and-cats",
  "flea-and-tick-prevention-for-dogs-and-cats-in-northern-kentucky"
]);

const sources = {
  avmaPetOwners: {
    label: "Pet owner resources",
    href: "https://www.avma.org/resources-tools/pet-owners",
    source: "American Veterinary Medical Association"
  },
  avmaVaccines: {
    label: "Vaccinations for pets",
    href: "https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations",
    source: "American Veterinary Medical Association"
  },
  avmaDental: {
    label: "Pet dental care",
    href: "https://www.avma.org/resources-tools/pet-owners/petcare/pet-dental-care",
    source: "American Veterinary Medical Association"
  },
  avmaSenior: {
    label: "Senior pets",
    href: "https://www.avma.org/resources-tools/pet-owners/petcare/senior-pets",
    source: "American Veterinary Medical Association"
  },
  avmaMicrochip: {
    label: "Microchips reunite pets and families",
    href: "https://www.avma.org/resources-tools/pet-owners/petcare/microchips-reunite-pets-families",
    source: "American Veterinary Medical Association"
  },
  avmaSpayNeuter: {
    label: "Spaying and neutering",
    href: "https://www.avma.org/resources-tools/pet-owners/petcare/spaying-and-neutering",
    source: "American Veterinary Medical Association"
  },
  avmaTravel: {
    label: "Traveling with your pet FAQ",
    href: "https://www.avma.org/resources-tools/pet-owners/petcare/traveling-your-pet-faq",
    source: "American Veterinary Medical Association"
  },
  cdcHealthyPets: {
    label: "Healthy pets, healthy people",
    href: "https://www.cdc.gov/healthy-pets/about/index.html",
    source: "Centers for Disease Control and Prevention"
  },
  cdcRabies: {
    label: "Rabies prevention and animals",
    href: "https://www.cdc.gov/rabies/prevention/index.html",
    source: "Centers for Disease Control and Prevention"
  },
  fdaPetFood: {
    label: "Pet food",
    href: "https://www.fda.gov/animal-veterinary/animal-foods-feeds/pet-food",
    source: "U.S. Food and Drug Administration"
  },
  fdaHandling: {
    label: "Safe handling of pet food and treats",
    href: "https://www.fda.gov/animal-veterinary/animal-health-literacy/tips-safe-handling-pet-food-and-treats",
    source: "U.S. Food and Drug Administration"
  },
  capc: {
    label: "Pets and parasites",
    href: "https://www.petsandparasites.org/",
    source: "Companion Animal Parasite Council"
  },
  cornellHouseSoiling: {
    label: "House soiling in cats",
    href: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics",
    source: "Cornell Feline Health Center"
  },
  aahaLifeStage: {
    label: "Pet owner resources",
    href: "https://www.avma.org/resources-tools/pet-owners",
    source: "American Veterinary Medical Association"
  }
};

const internalLinks = {
  book: { label: "Book an appointment", href: "/book-appointment/" },
  contact: { label: "Contact Veterinary Medical Centers", href: "/contact/" },
  fortThomas: { label: "Fort Thomas veterinary clinic", href: "/locations/vet-in-fort-thomas-ky/" },
  independence: { label: "Independence veterinary clinic", href: "/locations/vet-in-independence-ky/" },
  newPatients: { label: "New patient information", href: "/new-patients/" },
  wellness: { label: "Pet wellness exams", href: "/services/pet-wellness-exams/" },
  sick: { label: "Sick pet exams", href: "/services/sick-pet-exams/" },
  dental: { label: "Pet dental care", href: "/services/pet-dental-care/" },
  surgery: { label: "Pet surgery", href: "/services/pet-surgery/" },
  diagnostics: { label: "Diagnostics and lab work", href: "/services/diagnostics/" },
  vaccines: { label: "Dog and cat vaccinations", href: "/services/vaccinations/" }
};

const commonVisitSteps = [
  "Bring medication names, diet details, vaccine records, and any recent test results.",
  "Write down when the change started, how often it happens, and what makes it better or worse.",
  "Share photos or short videos if the symptom does not happen constantly at home."
];

const clinicLine =
  "Veterinary Medical Centers is locally owned and cares for dogs and cats from Fort Thomas, Independence, Newport, Bellevue, Highland Heights, Alexandria, Covington, and nearby Cincinnati neighborhoods.";

function span(text, marks = []) {
  return { _type: "span", _key: key("span"), text, marks };
}

function block(style, text, options = {}) {
  return {
    _type: "block",
    _key: key("block"),
    style,
    markDefs: [],
    children: [span(text)],
    ...options
  };
}

function listBlocks(items, listItem = "bullet") {
  return items.map((item) => block("normal", item, { listItem, level: 1 }));
}

function tableBlock(table) {
  return {
    _type: "comparisonTable",
    _key: key("table"),
    title: table.title,
    headers: table.headers,
    rows: table.rows.map((cells) => ({ _key: key("row"), cells })),
    note: table.note
  };
}

function calloutBlock(callout) {
  return {
    _type: "callout",
    _key: key("callout"),
    tone: callout.tone || "vet-note",
    title: callout.title,
    body: callout.body
  };
}

function faqBlock(topic) {
  return {
    _type: "faq",
    _key: key("faq"),
    title: topic.faqTitle || "Common questions",
    questions: topic.faqs.map((faq) => ({
      _key: key("faq-item"),
      question: faq.question,
      answer: faq.answer
    }))
  };
}

function ctaBlock(topic) {
  return {
    _type: "cta",
    _key: key("cta"),
    eyebrow: topic.ctaEyebrow || "Local veterinary care",
    title: topic.ctaTitle || "Need help deciding what your pet needs next?",
    body:
      topic.ctaBody ||
      "Our Fort Thomas and Independence teams can help you choose the right appointment type and prepare for a productive visit.",
    primaryLabel: "Book Appointment",
    primaryHref: "/book-appointment/",
    secondaryLabel: "Contact Our Team",
    secondaryHref: "/contact/"
  };
}

function bodyFor(topic) {
  const body = [
    block("normal", topic.opening),
    block("normal", `${topic.local || clinicLine} This guide is written for practical decisions at home, not as a substitute for an exam when your pet is sick, painful, or acting unlike themselves.`),
    block("h2", topic.whyHeading),
    block("normal", topic.why),
    ...listBlocks(topic.keyPoints),
    tableBlock(topic.table),
    block("h2", topic.watchHeading),
    block("normal", topic.watchIntro),
    ...listBlocks(topic.watchItems),
    calloutBlock(topic.callout),
    block("h2", topic.visitHeading),
    block("normal", topic.visit),
    ...listBlocks(topic.visitSteps || commonVisitSteps, "number"),
    block("h2", topic.homeHeading),
    block("normal", topic.home),
    ...listBlocks(topic.homeItems),
    faqBlock(topic),
    ctaBlock(topic)
  ];
  return body;
}

function buildPatch(topic) {
  const sourceLinks = (topic.external || ["avmaPetOwners", "cdcHealthyPets"]).map((name) => ({ _key: key("external"), ...sources[name] }));
  const nextReads = (topic.internal || ["book", "wellness", "contact"]).map((name) => ({ _key: key("internal"), ...internalLinks[name] }));
  return {
    title: topic.title,
    excerpt: topic.excerpt,
    category: topic.category || "Wellness",
    resourceType: topic.resourceType || "education",
    contentMode: "standard",
    body: bodyFor(topic),
    tags: topic.tags,
    secondaryKeywords: topic.secondaryKeywords,
    readingTime: topic.readingTime || "5 min read",
    seoTitle: topic.seoTitle,
    seoDescription: topic.seoDescription,
    focusKeyword: topic.focusKeyword,
    internalLinks: nextReads,
    externalLinks: sourceLinks,
    updatedAt: new Date().toISOString(),
    lastReviewedAt: today
  };
}

const topics = [
  {
    slug: "choosing-a-local-veterinarian-in-northern-kentucky-what-matters-for-your-pet",
    title: "Choosing a Local Veterinarian in Northern Kentucky: What Matters for Your Pet",
    excerpt: "How to compare veterinary clinics in Fort Thomas, Independence, and nearby Cincinnati communities without getting lost in generic reviews.",
    seoTitle: "Choosing a Northern Kentucky Veterinarian",
    seoDescription: "Compare local veterinary clinics in Northern Kentucky with practical tips on access, communication, services, and continuity of care.",
    focusKeyword: "Northern Kentucky veterinarian",
    secondaryKeywords: ["Fort Thomas vet", "Independence KY vet", "local veterinary clinic"],
    tags: ["local vet", "new patients", "Northern Kentucky"],
    opening: "Choosing a veterinarian is about more than finding the closest appointment. The best fit is a clinic that communicates clearly, knows your pet's history, and can handle both everyday prevention and the unexpected sick visit.",
    whyHeading: "What a good local fit should feel like",
    why: "A useful veterinary relationship gives you context over time. Your team learns what is normal for your dog or cat, helps you prioritize care, and explains options in plain language.",
    keyPoints: ["Clear appointment options for wellness, illness, dental care, surgery, and diagnostics.", "A team that asks about lifestyle, travel, boarding, other pets, and local parasite risk.", "Records that stay organized so vaccines, lab trends, medications, and follow-ups are easy to track."],
    table: {
      title: "What to compare before choosing a clinic",
      headers: ["Question", "Why it matters", "What to look for"],
      rows: [["Is care local and consistent?", "Continuity helps subtle changes get noticed earlier.", "A team that sees your pet routinely, not only when something is wrong."], ["Can they handle common needs?", "Most pets need exams, vaccines, dental guidance, lab work, and sick care.", "Services that match your pet's age, lifestyle, and medical history."], ["How easy is follow-up?", "Good care often happens between visits.", "Clear phone, email, portal, or appointment communication."]]
    },
    watchHeading: "Green flags during the first visit",
    watchIntro: "Your first appointment can tell you a lot about how the clinic practices medicine and communicates.",
    watchItems: ["The team asks detailed questions instead of rushing to a one-size-fits-all plan.", "Recommendations are explained with the reason behind them.", "You leave knowing what to watch for and when to come back."],
    callout: { tone: "tip", title: "Local care has practical value", body: "For many families, a nearby clinic makes rechecks, vaccine boosters, medication questions, and same-week concerns much easier to handle." },
    visitHeading: "Questions worth asking before you book",
    visit: "You do not need a script, but a few direct questions can help you understand how the practice works.",
    homeHeading: "How to make the first appointment more useful",
    home: "The more context the veterinary team has, the better they can tailor recommendations.",
    homeItems: ["Send previous records before the appointment if you have them.", "Bring a current diet and medication list.", "Mention behavior concerns, travel plans, grooming or boarding needs, and budget priorities."],
    faqTitle: "Choosing a vet: quick questions",
    faqs: [{ question: "Should I choose a vet before my pet is sick?", answer: "Yes. Establishing care while your pet is stable makes urgent questions easier because the clinic already knows your pet's history." }, { question: "Is a locally owned veterinary clinic different?", answer: "Local ownership can make the experience feel more personal because decisions, relationships, and community priorities stay close to the clinic." }],
    internal: ["newPatients", "fortThomas", "independence", "book"],
    external: ["avmaPetOwners", "cdcHealthyPets"]
  },
  {
    slug: "pet-wellness-plans-vs-sick-visits-understanding-veterinary-appointment-types",
    title: "Pet Wellness Plans vs. Sick Visits: Understanding Veterinary Appointment Types",
    excerpt: "A plain-English guide to wellness visits, sick pet exams, rechecks, and when your dog or cat needs a different type of appointment.",
    seoTitle: "Pet Wellness Visit vs Sick Visit Guide",
    seoDescription: "Learn when to book a pet wellness exam, sick visit, recheck, or urgent appointment for dogs and cats in Northern Kentucky.",
    focusKeyword: "pet wellness visit vs sick visit",
    secondaryKeywords: ["sick pet exam", "pet wellness exam", "Northern Kentucky vet"],
    tags: ["wellness", "sick visits", "appointments"],
    opening: "Wellness visits and sick visits are built for different goals. A wellness appointment looks ahead; a sick visit focuses on a current problem that may need diagnostics, medication, or closer monitoring.",
    whyHeading: "Why appointment type matters",
    why: "Booking the right visit helps the team reserve enough time, prepare the right records, and guide you on what to bring. It can also prevent a sick pet concern from being squeezed into a routine vaccine visit.",
    keyPoints: ["Wellness visits cover prevention, vaccines, weight, dental care, parasite prevention, and lifestyle.", "Sick visits focus on symptoms such as vomiting, limping, coughing, itching, appetite changes, or pain.", "Rechecks are planned follow-ups to make sure treatment is working."],
    table: {
      title: "Common appointment types",
      headers: ["Visit type", "Best for", "Usually includes"],
      rows: [["Wellness exam", "Pets acting normal who need preventive care.", "Physical exam, vaccine review, parasite prevention, diet and behavior discussion."], ["Sick visit", "New symptoms or changes in comfort.", "Focused exam, problem history, diagnostics or treatment plan."], ["Recheck", "Follow-up after a diagnosis or treatment.", "Progress check, medication adjustment, repeat testing if needed."]]
    },
    watchHeading: "Signs a wellness visit should become a sick visit",
    watchIntro: "If your pet is not acting like themselves, tell the team before the appointment. The schedule may need to change.",
    watchItems: ["Vomiting, diarrhea, coughing, sneezing, or trouble breathing.", "Limping, stiffness, hiding, crying, or sudden behavior changes.", "Changes in appetite, thirst, urination, litter box habits, or energy."],
    callout: { tone: "vet-note", title: "Prevention and problem-solving can overlap", body: "A pet can be due for vaccines and also need a sick exam. The medical concern usually takes priority so your pet gets the right attention." },
    visitHeading: "What to tell the team when scheduling",
    visit: "A few details can help the clinic choose the safest timing and visit type.",
    homeHeading: "How to prepare for either visit",
    home: "Good preparation makes the appointment more efficient and reduces the chance of missing an important detail.",
    homeItems: ["Bring records from boarding, shelters, breeders, previous clinics, or emergency visits.", "Save photos of stool, skin changes, coughing episodes, or mobility problems when helpful.", "Do not give leftover medication unless your veterinarian tells you to."],
    faqTitle: "Appointment type FAQ",
    faqs: [{ question: "Can my pet get vaccines during a sick visit?", answer: "Sometimes, but not always. Your veterinarian may delay vaccines if illness, fever, or medication makes postponing safer." }, { question: "What if I am not sure what to book?", answer: "Call the clinic and describe what changed. The team can help decide whether a wellness visit, sick visit, recheck, or urgent referral is most appropriate." }],
    internal: ["wellness", "sick", "book", "contact"],
    external: ["avmaPetOwners", "aahaLifeStage"]
  },
  {
    slug: "chronic-condition-monitoring-for-pets-why-follow-up-visits-matter",
    title: "Chronic Condition Monitoring for Pets: Why Follow-Up Visits Matter",
    excerpt: "Why pets with allergies, arthritis, kidney disease, thyroid disease, diabetes, and other ongoing problems need planned rechecks.",
    seoTitle: "Chronic Pet Condition Monitoring",
    seoDescription: "Learn why follow-up exams and lab monitoring matter for dogs and cats with chronic conditions in Northern Kentucky.",
    focusKeyword: "chronic pet condition monitoring",
    secondaryKeywords: ["pet recheck visit", "dog chronic illness", "cat chronic illness"],
    tags: ["chronic care", "rechecks", "senior pets"],
    opening: "Chronic conditions rarely stay exactly the same. A pet may look stable at home while lab values, pain level, weight, skin health, or medication tolerance are changing underneath the surface.",
    whyHeading: "Follow-ups protect the treatment plan",
    why: "Recheck visits help your veterinarian confirm that the original diagnosis still fits, that medication is helping, and that side effects or disease progression are not being missed.",
    keyPoints: ["Skin, ear, allergy, urinary, endocrine, heart, kidney, liver, dental, and arthritis problems often need repeat evaluation.", "Medication doses may need adjustment as weight, age, symptoms, or lab values change.", "Small changes caught early can prevent bigger setbacks."],
    table: {
      title: "Examples of monitoring needs",
      headers: ["Condition type", "What may be monitored", "Why it matters"],
      rows: [["Allergies or ear disease", "Itching, infection recurrence, medication response.", "Recurring symptoms often need plan adjustments."], ["Kidney, thyroid, liver, or diabetes concerns", "Bloodwork, urine tests, weight, appetite, thirst.", "Lab trends guide medication and diet decisions."], ["Arthritis or chronic pain", "Mobility, comfort, muscle loss, quality of life.", "Pain plans should change as needs change."]]
    },
    watchHeading: "Subtle changes worth reporting",
    watchIntro: "Chronic disease monitoring works best when home observations and exam findings are put together.",
    watchItems: ["More drinking, urinating, panting, pacing, hiding, or vocalizing.", "Weight loss or gain even when appetite seems normal.", "Medication that is hard to give, seems less effective, or causes stomach upset."],
    callout: { tone: "next-step", title: "Do not stop long-term medicine suddenly", body: "Some medications need tapering or replacement. Contact the clinic before stopping, doubling, or restarting a medication at home." },
    visitHeading: "What a recheck may include",
    visit: "A recheck is not just a quick look. It is a chance to compare your pet's current status with previous exams and test results.",
    homeHeading: "Simple tracking that helps",
    home: "You do not need complicated charts. A few consistent notes can make follow-up visits much more useful.",
    homeItems: ["Track appetite, thirst, bathroom habits, cough, itch, mobility, or seizure events when relevant.", "Bring medication bottles or photos of labels.", "Tell the team what is realistic for your schedule and budget."],
    faqTitle: "Chronic care questions",
    faqs: [{ question: "How often do chronic conditions need rechecks?", answer: "It depends on the diagnosis, medication, stability, and your pet's age. Some pets need a short recheck in weeks; others need scheduled monitoring every few months." }, { question: "Why repeat lab work if my pet seems fine?", answer: "Lab work can show changes before a pet acts sick, especially with kidney, liver, thyroid, diabetes, and medication monitoring." }],
    internal: ["sick", "diagnostics", "wellness", "book"],
    external: ["avmaPetOwners", "avmaSenior"]
  },
  {
    slug: "rabies-vaccines-for-dogs-and-cats-safety-law-and-public-health-basics",
    title: "Rabies Vaccines for Dogs and Cats: Safety, Law, and Public Health Basics",
    excerpt: "What Northern Kentucky pet owners should know about rabies vaccination, public health, and keeping dog and cat records current.",
    seoTitle: "Rabies Vaccines for Dogs and Cats",
    seoDescription: "Understand rabies vaccines for dogs and cats, why records matter, and when to talk with a Northern Kentucky veterinarian.",
    focusKeyword: "rabies vaccine for dogs and cats",
    secondaryKeywords: ["Kentucky rabies vaccine", "cat rabies shot", "dog rabies shot"],
    tags: ["vaccines", "rabies", "public health"],
    opening: "Rabies vaccination protects pets, families, veterinary teams, and the broader community. Because rabies is a serious public health disease, vaccine records matter even for indoor cats and calm dogs.",
    whyHeading: "Why rabies is treated differently",
    why: "Rabies is almost always fatal once symptoms appear, and it can spread from infected mammals to people and pets. That is why communities take vaccination status and bite exposure history seriously.",
    keyPoints: ["Dogs and cats need rabies vaccination on a schedule recommended by the veterinarian and required by local rules.", "Proof of vaccination may be needed for licensing, boarding, grooming, travel, or exposure investigations.", "Indoor cats still need protection because bats and wildlife can get inside homes."],
    table: {
      title: "Rabies record basics",
      headers: ["Record item", "Why it matters", "Owner tip"],
      rows: [["Vaccine date", "Shows when protection was given.", "Keep the certificate, not just a reminder card."], ["Due date", "Determines when the next booster is needed.", "Schedule before the record expires."], ["Pet identification", "Links the certificate to the correct pet.", "Update microchip and contact information too."]]
    },
    watchHeading: "Situations where records become urgent",
    watchIntro: "Rabies paperwork is easy to forget until it is suddenly needed.",
    watchItems: ["A bite or scratch involving a person, another pet, or wildlife.", "Boarding, daycare, grooming, training, or travel requirements.", "A bat in the home or suspected wildlife contact."],
    callout: { tone: "warning", title: "Call after wildlife exposure", body: "If your pet may have contacted a bat, raccoon, skunk, fox, or other wildlife, call a veterinarian promptly for guidance." },
    visitHeading: "What to ask at a vaccine visit",
    visit: "Rabies vaccination is also a good time to review the rest of your pet's preventive care.",
    homeHeading: "Keeping proof easy to find",
    home: "Good records reduce stress if you ever need documentation quickly.",
    homeItems: ["Save a photo of the rabies certificate on your phone.", "Keep the paper copy with boarding and travel records.", "Ask the clinic if your pet's microchip number should be added to the record."],
    faqTitle: "Rabies vaccine FAQ",
    faqs: [{ question: "Does an indoor cat need a rabies vaccine?", answer: "Yes, indoor cats can still be exposed through bats, accidental escapes, or wildlife entering the home. Your veterinarian can explain the appropriate schedule." }, { question: "Is rabies vaccination only about my pet?", answer: "No. Rabies vaccination is also a public health measure that helps protect people and the community." }],
    internal: ["vaccines", "wellness", "book", "contact"],
    external: ["cdcRabies", "avmaVaccines", "cdcHealthyPets"]
  },
  {
    slug: "new-pet-checklist-first-vet-visit-for-dogs-and-cats-in-northern-kentucky",
    title: "New Pet Checklist: First Vet Visit for Dogs and Cats in Northern Kentucky",
    excerpt: "What to bring, what to ask, and what to expect at a puppy, kitten, newly adopted dog, or newly adopted cat's first visit.",
    seoTitle: "New Pet First Vet Visit Checklist",
    seoDescription: "Prepare for your puppy, kitten, dog, or cat's first vet visit in Northern Kentucky with records, questions, and next steps.",
    focusKeyword: "first vet visit checklist",
    secondaryKeywords: ["new puppy vet visit", "new kitten vet visit", "Northern Kentucky vet"],
    tags: ["new pets", "puppies", "kittens"],
    opening: "A first veterinary visit sets the baseline for your new pet's health. It is also the best time to organize records, discuss vaccines and parasite prevention, and ask the questions that come up during the first few weeks at home.",
    whyHeading: "Why the first visit is more than vaccines",
    why: "New pets often arrive with partial records, uncertain parasite history, diet changes, stress, or early behavior questions. A complete exam helps your veterinarian build a plan instead of guessing from paperwork alone.",
    keyPoints: ["Bring adoption, breeder, rescue, shelter, or previous clinic records.", "Ask about vaccine timing, fecal testing, deworming, flea and tick prevention, and heartworm prevention.", "Discuss diet, crate training, litter box setup, socialization, grooming, and insurance while habits are still forming."],
    table: {
      title: "What to bring to the first appointment",
      headers: ["Bring this", "Why it helps", "Helpful detail"],
      rows: [["Medical records", "Prevents duplicate or missed vaccines.", "Include dates, product names, and test results."], ["Stool sample", "Screens for intestinal parasites.", "Fresh is best when possible."], ["Food and medication details", "Helps with diet and safety recommendations.", "Photos of labels are fine."]]
    },
    watchHeading: "Early problems to mention right away",
    watchIntro: "Do not wait for the appointment if your new pet seems unwell.",
    watchItems: ["Vomiting, diarrhea, coughing, sneezing, eye discharge, or poor appetite.", "Lethargy, pale gums, bloated belly, weakness, or trouble breathing.", "Itching, fleas, ear odor, hair loss, or stool that looks abnormal."],
    callout: { tone: "tip", title: "Bring your questions", body: "First visits move quickly. A short list on your phone helps make sure diet, training, vaccines, and parasite prevention all get covered." },
    visitHeading: "What happens during the exam",
    visit: "Your veterinarian will examine your pet from nose to tail and compare findings with the records you bring.",
    homeHeading: "After the visit",
    home: "The first appointment usually creates a schedule, not a one-time task.",
    homeItems: ["Put vaccine boosters and rechecks on your calendar before you leave.", "Start prevention on the schedule your veterinarian recommends.", "Keep all records in one folder or shared digital album."],
    faqTitle: "First visit FAQ",
    faqs: [{ question: "How soon should a new pet see the vet?", answer: "Most new puppies, kittens, and newly adopted pets should be seen soon after coming home, especially if records are incomplete or symptoms are present." }, { question: "Can I bring a nervous pet?", answer: "Yes. Tell the team when scheduling so they can suggest carrier, leash, or waiting-room strategies." }],
    internal: ["newPatients", "wellness", "vaccines", "book"],
    external: ["avmaPetOwners", "cdcHealthyPets", "capc"]
  },
  {
    slug: "seasonal-pet-safety-in-cincinnati-and-northern-kentucky",
    title: "Seasonal Pet Safety in Cincinnati and Northern Kentucky",
    excerpt: "A local guide to heat, cold, storms, holidays, parasites, and seasonal risks for dogs and cats around Cincinnati and Northern Kentucky.",
    seoTitle: "Seasonal Pet Safety in Northern Kentucky",
    seoDescription: "Protect dogs and cats from heat, cold, storms, holidays, and parasites with seasonal safety tips for Cincinnati and Northern Kentucky.",
    focusKeyword: "seasonal pet safety Northern Kentucky",
    secondaryKeywords: ["Cincinnati pet safety", "summer dog safety", "winter pet safety"],
    tags: ["seasonal care", "safety", "parasites"],
    opening: "Northern Kentucky weather can swing from humid river-valley heat to icy sidewalks and spring storms. Pets feel those changes too, especially seniors, flat-faced breeds, outdoor cats, puppies, kittens, and pets with chronic disease.",
    whyHeading: "Local seasons change medical risk",
    why: "Seasonal care is not just common sense. Temperature, humidity, wildlife, standing water, holiday foods, and travel plans can all affect your pet's health.",
    keyPoints: ["Warm months raise heat stress, paw burn, tick, flea, mosquito, and water-safety concerns.", "Cold months can worsen arthritis, dry skin, and exposure risk.", "Holidays add food hazards, noise stress, visitors, and escape risk."],
    table: {
      title: "Season-by-season reminders",
      headers: ["Season", "Common concern", "Practical step"],
      rows: [["Spring", "Ticks, fleas, storms, allergies.", "Stay current on prevention and watch skin or ear changes."], ["Summer", "Heat stress and hot pavement.", "Walk early or late and bring water."], ["Fall/Winter", "Holiday foods, cold, arthritis stiffness.", "Protect joints and keep toxic foods out of reach."]]
    },
    watchHeading: "Signs the weather is affecting your pet",
    watchIntro: "Some seasonal problems need quick attention.",
    watchItems: ["Heavy panting, weakness, collapse, vomiting, or bright red gums in heat.", "Shivering, reluctance to walk, limping, or painful paws in cold.", "Sudden itching, ear odor, coughing, diarrhea, or appetite changes."],
    callout: { tone: "warning", title: "Heat can become urgent fast", body: "If a pet collapses, seems disoriented, or cannot cool down, seek veterinary help immediately." },
    visitHeading: "Seasonal care to review at checkups",
    visit: "A wellness visit is a good time to adjust prevention and routines before the season creates problems.",
    homeHeading: "Easy habits that prevent headaches",
    home: "A few small routines reduce risk through the year.",
    homeItems: ["Check paws after walks in hot, icy, or salted areas.", "Keep holiday foods, medications, plants, and trash secured.", "Make sure collars, tags, and microchip information are current before storm and travel seasons."],
    faqTitle: "Seasonal safety FAQ",
    faqs: [{ question: "Do indoor pets need seasonal prevention?", answer: "Often yes. Fleas, ticks, mosquitoes, and intestinal parasites can affect indoor pets through people, other pets, wildlife, and short outdoor exposure." }, { question: "When should I call for heat concerns?", answer: "Call urgently if your pet is weak, vomiting, collapsing, disoriented, or panting heavily and not recovering quickly." }],
    internal: ["wellness", "sick", "fortThomas", "book"],
    external: ["cdcHealthyPets", "capc", "avmaPetOwners"]
  },
  {
    slug: "pet-travel-and-boarding-prep-vaccines-records-and-health-planning",
    title: "Pet Travel and Boarding Prep: Vaccines, Records, and Health Planning",
    excerpt: "How to prepare vaccine records, medications, parasite prevention, and health paperwork before travel, boarding, daycare, or grooming.",
    seoTitle: "Pet Travel and Boarding Vet Prep",
    seoDescription: "Prepare dogs and cats for travel, boarding, daycare, and grooming with vaccine records, medications, and health planning.",
    focusKeyword: "pet travel and boarding preparation",
    secondaryKeywords: ["pet vaccine records", "dog boarding vaccines", "cat travel vet"],
    tags: ["travel", "boarding", "vaccines"],
    opening: "Travel and boarding go better when health details are handled before the deadline. Waiting until the day before a trip can leave too little time for vaccine boosters, medication refills, records, or a needed exam.",
    whyHeading: "Records are part of the plan",
    why: "Boarding facilities, groomers, daycares, airlines, and destinations may all ask for different proof. Your veterinarian can help you understand what is medical, what is facility policy, and what requires extra timing.",
    keyPoints: ["Confirm vaccine requirements before booking boarding, daycare, grooming, or travel.", "Ask early about health certificates or destination-specific paperwork.", "Refill medications and prevention before you leave."],
    table: {
      title: "Planning timeline",
      headers: ["Timing", "Task", "Why it matters"],
      rows: [["Several weeks ahead", "Check rules and vaccine due dates.", "Some boosters need time to become current."], ["1-2 weeks ahead", "Request records and medication refills.", "Avoids last-minute delays."], ["Travel week", "Pack food, medication, records, and contact numbers.", "Keeps routines consistent away from home."]]
    },
    watchHeading: "Pets that need extra planning",
    watchIntro: "Some dogs and cats need a more customized travel or boarding plan.",
    watchItems: ["Seniors, puppies, kittens, and pets with chronic disease.", "Pets on daily medication, prescription diets, or insulin.", "Pets with anxiety, motion sickness, coughing, diarrhea, or recent illness."],
    callout: { tone: "next-step", title: "Ask before giving sedatives", body: "Travel anxiety medication should be discussed with a veterinarian and trialed safely before the trip when appropriate." },
    visitHeading: "What to ask your veterinarian",
    visit: "A pre-travel or pre-boarding visit can prevent avoidable problems while you are away.",
    homeHeading: "Packing for a safer trip",
    home: "Treat your pet's bag like a small medical kit.",
    homeItems: ["Pack extra food and medication in case travel is delayed.", "Bring vaccine records, microchip number, and your clinic's contact information.", "Keep cats in secure carriers and dogs on leashes during transitions."],
    faqTitle: "Travel and boarding FAQ",
    faqs: [{ question: "How early should I request records?", answer: "Request records as soon as you know the facility or travel requirements. That leaves time to update vaccines if needed." }, { question: "Does my pet need an exam before boarding?", answer: "Some facilities require it, and it is wise if your pet has recent symptoms, chronic disease, or overdue vaccines." }],
    internal: ["vaccines", "wellness", "book", "contact"],
    external: ["avmaTravel", "avmaVaccines", "cdcHealthyPets"]
  },
  {
    slug: "parasite-testing-for-dogs-and-cats-fecal-exams-deworming-and-zoonotic-risk",
    title: "Parasite Testing for Dogs and Cats: Fecal Exams, Deworming, and Zoonotic Risk",
    excerpt: "Why fecal testing and parasite prevention matter for puppies, kittens, adult pets, families, and multi-pet homes.",
    seoTitle: "Parasite Testing for Dogs and Cats",
    seoDescription: "Learn about fecal exams, deworming, intestinal parasites, and zoonotic risk for dogs and cats in Northern Kentucky.",
    focusKeyword: "parasite testing for dogs and cats",
    secondaryKeywords: ["fecal exam pets", "dog deworming", "cat intestinal parasites"],
    tags: ["parasites", "fecal exams", "prevention"],
    opening: "Intestinal parasites are common, and many pets do not look sick right away. Fecal testing helps find parasites that cannot be confirmed by looking at stool alone.",
    whyHeading: "Why testing beats guessing",
    why: "Different parasites require different treatments. Testing helps your veterinarian choose the right medication, decide whether rechecks are needed, and reduce risk for other pets and people in the household.",
    keyPoints: ["Puppies and kittens are especially likely to need deworming and repeat testing.", "Adult indoor pets can still be exposed through soil, insects, wildlife, raw diets, or other animals.", "Some parasites can spread from pets to people, so hygiene and prevention matter."],
    table: {
      title: "Parasite care basics",
      headers: ["Tool", "What it does", "Owner role"],
      rows: [["Fecal exam", "Checks stool for parasite evidence.", "Bring a fresh sample when asked."], ["Deworming", "Treats specific parasites or common puppy/kitten risks.", "Give the full dose as directed."], ["Prevention", "Reduces future parasite risk.", "Use products on the recommended schedule."]]
    },
    watchHeading: "Possible parasite signs",
    watchIntro: "Parasites can be silent, but these changes should be mentioned.",
    watchItems: ["Diarrhea, mucus, blood, vomiting, or a pot-bellied appearance.", "Weight loss, poor growth, dull coat, scooting, or visible worms.", "Multiple pets with stomach upset or recurring stool problems."],
    callout: { tone: "warning", title: "Do not rely on over-the-counter dewormers alone", body: "The wrong product may miss the parasite or delay treatment. Testing helps target the plan." },
    visitHeading: "What happens after a positive test",
    visit: "A positive fecal result usually leads to treatment, cleaning advice, and sometimes repeat testing.",
    homeHeading: "Reducing household risk",
    home: "Parasite prevention works best when the home routine supports it.",
    homeItems: ["Pick up stool promptly in the yard and on walks.", "Wash hands after cleaning litter boxes or handling stool.", "Keep pets on prevention recommended for their lifestyle."],
    faqTitle: "Parasite testing FAQ",
    faqs: [{ question: "Does normal-looking stool mean no parasites?", answer: "No. Some pets with intestinal parasites have normal stool, especially early in infection." }, { question: "How fresh should a stool sample be?", answer: "Fresh samples are best. If you cannot bring one right away, ask the clinic how to store it." }],
    internal: ["wellness", "sick", "newPatients", "book"],
    external: ["capc", "cdcHealthyPets", "avmaPetOwners"]
  },
  {
    slug: "dog-and-cat-behavior-changes-when-to-look-for-a-medical-cause",
    title: "Dog and Cat Behavior Changes: When to Look for a Medical Cause",
    excerpt: "Behavior changes can be training issues, stress, pain, illness, or all of the above. Here is when a veterinary exam should come first.",
    seoTitle: "Pet Behavior Changes and Medical Causes",
    seoDescription: "Learn when dog or cat behavior changes may point to pain, illness, anxiety, or another medical cause needing a vet exam.",
    focusKeyword: "pet behavior changes medical cause",
    secondaryKeywords: ["dog behavior change", "cat behavior change", "pet pain signs"],
    tags: ["behavior", "pain", "sick visits"],
    opening: "When a dog or cat starts acting differently, it is tempting to label it stubbornness, aging, or attitude. Sometimes that is unfair to the pet. Pain, infection, hormone disease, urinary problems, vision changes, and nausea can all show up as behavior changes.",
    whyHeading: "Behavior is health information",
    why: "Pets cannot explain pain or nausea in words, so they communicate through routines. A change in sleep, appetite, grooming, play, litter box use, aggression, or clinginess can be medically meaningful.",
    keyPoints: ["New aggression can be pain, fear, neurologic disease, or a medical stress response.", "House soiling may involve urinary, digestive, mobility, or anxiety factors.", "Senior pets may need screening for pain, cognitive changes, sensory loss, or organ disease."],
    table: {
      title: "Behavior changes and possible medical links",
      headers: ["Change", "Possible medical angle", "Why to call"],
      rows: [["Hiding or less social", "Pain, nausea, fever, stress.", "Cats especially hide illness."], ["Accidents in the house", "Urinary, digestive, mobility, or endocrine disease.", "Needs exam before assuming training."], ["Irritability when touched", "Dental pain, arthritis, ear disease, injury.", "Pain can make gentle pets defensive."]]
    },
    watchHeading: "Changes that should not be ignored",
    watchIntro: "A sudden or escalating behavior change deserves attention.",
    watchItems: ["Biting, growling, hiding, pacing, confusion, or restlessness.", "Loss of litter box habits or house training.", "Less jumping, playing, grooming, eating, or interacting."],
    callout: { tone: "vet-note", title: "Medical first, training second", body: "Training plans work better after pain, infection, and illness have been ruled out or treated." },
    visitHeading: "What the exam may explore",
    visit: "A behavior-related veterinary visit usually combines a physical exam with detailed history.",
    homeHeading: "What to track at home",
    home: "Specific examples are more useful than general labels like 'bad' or 'weird.'",
    homeItems: ["Record short videos of the behavior when safe.", "Note time of day, triggers, appetite, bathroom habits, and sleep changes.", "Avoid punishment, which can increase fear or hide symptoms."],
    faqTitle: "Behavior change FAQ",
    faqs: [{ question: "Can pain really look like a behavior problem?", answer: "Yes. Pets may avoid stairs, snap when touched, hide, stop grooming, or seem anxious when they are painful." }, { question: "Should I wait to see if behavior improves?", answer: "Mild stress can settle, but sudden, severe, painful, or bathroom-related changes should be discussed with a veterinarian." }],
    internal: ["sick", "diagnostics", "wellness", "book"],
    external: ["avmaPetOwners", "avmaSenior"]
  },
  {
    slug: "litter-box-problems-in-cats-medical-reasons-to-rule-out-first",
    title: "Litter Box Problems in Cats: Medical Reasons to Rule Out First",
    excerpt: "Before assuming your cat is being difficult, learn the urinary, digestive, pain, and stress reasons litter box habits can change.",
    seoTitle: "Cat Litter Box Problems: Medical Causes",
    seoDescription: "Cat missing the litter box? Learn medical reasons to rule out first, from urinary issues to arthritis and digestive disease.",
    focusKeyword: "cat litter box problems",
    secondaryKeywords: ["cat urinary problems", "cat house soiling", "cat vet Northern Kentucky"],
    tags: ["cat care", "litter box", "urinary health"],
    opening: "Cats do not stop using the litter box to spite people. A change in litter box habits can point to urinary pain, digestive upset, arthritis, stress, kidney disease, diabetes, or another medical problem.",
    whyHeading: "Start with the body, not the box",
    why: "Litter, location, and cleanliness matter, but a medical exam should come first when the change is new, frequent, or paired with other symptoms.",
    keyPoints: ["Urinating outside the box can be linked to bladder inflammation, infection, stones, pain, or increased urine volume.", "Defecating outside the box may involve constipation, diarrhea, pain, or mobility limits.", "Older cats may struggle with tall boxes, stairs, or slippery floors."],
    table: {
      title: "Clues to share with your veterinarian",
      headers: ["Observation", "Possible clue", "Why it helps"],
      rows: [["Small frequent urine spots", "Urinary urgency or pain.", "May need prompt testing."], ["Large puddles", "Increased urine volume.", "Can suggest systemic disease."], ["Stool outside the box", "Digestive or mobility issue.", "Changes the exam focus."]]
    },
    watchHeading: "Emergency warning for male cats",
    watchIntro: "Some urinary problems cannot wait.",
    watchItems: ["Straining with little or no urine.", "Crying in the box, repeated trips, vomiting, weakness, or hiding.", "A male cat who seems blocked or cannot urinate."],
    callout: { tone: "warning", title: "Straining can be urgent", body: "A cat that cannot urinate needs emergency veterinary care. Do not wait to see if it passes." },
    visitHeading: "What testing may include",
    visit: "Your veterinarian may recommend a urine test, physical exam, pain assessment, lab work, imaging, or stool testing depending on the pattern.",
    homeHeading: "Box changes that can help after medical issues are addressed",
    home: "Once pain and illness are considered, the home setup can be improved.",
    homeItems: ["Use one box per cat plus one extra when possible.", "Offer low-entry boxes for seniors or painful cats.", "Keep boxes clean, quiet, accessible, and away from trapped-corner locations."],
    faqTitle: "Cat litter box FAQ",
    faqs: [{ question: "Can stress cause litter box issues?", answer: "Yes, but stress and medical problems can overlap. A veterinary exam helps avoid missing pain or urinary disease." }, { question: "Should I change litter right away?", answer: "Avoid changing too many things at once if your cat is actively symptomatic. Call the clinic first if there is straining, blood, pain, or frequent urination." }],
    internal: ["sick", "diagnostics", "book", "contact"],
    external: ["cornellHouseSoiling", "avmaPetOwners"]
  },
  {
    slug: "coughing-in-dogs-and-cats-when-it-needs-a-veterinary-visit",
    title: "Coughing in Dogs and Cats: When It Needs a Veterinary Visit",
    excerpt: "How to think about coughing, gagging, breathing changes, and when dogs or cats should be examined.",
    seoTitle: "Coughing in Dogs and Cats: Vet Visit Signs",
    seoDescription: "Learn when coughing, gagging, or breathing changes in dogs and cats should be checked by a veterinarian.",
    focusKeyword: "coughing dog or cat vet visit",
    secondaryKeywords: ["dog cough", "cat cough", "pet breathing problem"],
    tags: ["coughing", "respiratory", "sick visits"],
    opening: "Coughing can come from the throat, airways, lungs, heart, infectious disease, irritation, or even pressure on the airway. Cats may cough quietly and be mistaken for hairball gagging.",
    whyHeading: "Coughing is a symptom, not a diagnosis",
    why: "Because many causes look similar at home, your veterinarian needs history, an exam, and sometimes diagnostic testing to decide what is going on.",
    keyPoints: ["A dry honking cough, wet cough, gag, wheeze, or exercise-related cough can mean different things.", "Cats that cough repeatedly should be taken seriously even if they seem normal between episodes.", "Breathing effort matters more than cough frequency alone."],
    table: {
      title: "Cough details that help the exam",
      headers: ["Detail", "What to notice", "Why it helps"],
      rows: [["Sound", "Dry, wet, honking, gagging, wheezing.", "Narrows possible causes."], ["Timing", "After exercise, at night, after drinking, with excitement.", "Shows patterns."], ["Breathing", "Fast, labored, open-mouth, blue gums.", "Can indicate urgency."]]
    },
    watchHeading: "When coughing is urgent",
    watchIntro: "Breathing problems can become serious quickly.",
    watchItems: ["Trouble breathing, blue or pale gums, collapse, or extreme weakness.", "Open-mouth breathing in a cat.", "Coughing with fever, poor appetite, lethargy, or worsening frequency."],
    callout: { tone: "warning", title: "Video is helpful, but breathing distress comes first", body: "If your pet is struggling to breathe, seek care. Do not delay to capture a perfect video." },
    visitHeading: "What your veterinarian may recommend",
    visit: "The workup depends on exam findings and how your pet is breathing.",
    homeHeading: "What to do before the appointment",
    home: "Reduce airway stress while you wait for guidance.",
    homeItems: ["Avoid smoke, strong scents, heavy exercise, and neck pressure from collars.", "Use a harness for dogs that cough on leash.", "Keep coughing pets away from other pets until contagious causes are considered."],
    faqTitle: "Coughing FAQ",
    faqs: [{ question: "Is a cat cough just a hairball?", answer: "Sometimes gagging is confused with coughing. Repeated episodes should be discussed with a veterinarian." }, { question: "Can I give human cough medicine?", answer: "Do not give human cough medicine unless your veterinarian specifically instructs you to." }],
    internal: ["sick", "diagnostics", "book", "contact"],
    external: ["avmaPetOwners", "cdcHealthyPets"]
  },
  {
    slug: "pet-x-rays-and-lab-work-how-diagnostics-help-veterinarians-understand-symptoms",
    title: "Pet X-Rays and Lab Work: How Diagnostics Help Veterinarians Understand Symptoms",
    excerpt: "Why veterinarians recommend bloodwork, urine tests, fecal tests, x-rays, and other diagnostics when symptoms are not obvious from the exam alone.",
    seoTitle: "Pet X-Rays and Lab Work Explained",
    seoDescription: "Understand how pet x-rays, bloodwork, urine tests, and fecal exams help veterinarians diagnose dog and cat symptoms.",
    focusKeyword: "pet x-rays and lab work",
    secondaryKeywords: ["veterinary diagnostics", "dog bloodwork", "cat x-rays"],
    tags: ["diagnostics", "lab work", "x-rays"],
    opening: "A physical exam tells your veterinarian a lot, but it cannot show everything. Lab work, x-rays, urine testing, fecal testing, and other diagnostics help reveal problems that are hidden inside the body.",
    whyHeading: "Diagnostics reduce guesswork",
    why: "Testing helps separate similar-looking symptoms. Vomiting, weight loss, limping, coughing, and low energy can each come from many causes, and the right treatment depends on the reason.",
    keyPoints: ["Bloodwork can evaluate organ values, blood cells, hydration, inflammation, and metabolic clues.", "Urine testing can reveal infection, concentration changes, crystals, sugar, protein, or kidney-related concerns.", "X-rays can show bones, some foreign material, organ size, gas patterns, chest changes, and some masses."],
    table: {
      title: "Common diagnostics",
      headers: ["Test", "Often used for", "What it can add"],
      rows: [["Bloodwork", "Vomiting, senior screening, medication monitoring.", "Internal organ and blood cell clues."], ["Urinalysis", "Urinary signs, drinking changes, kidney monitoring.", "Urine concentration and inflammation clues."], ["X-rays", "Limping, coughing, trauma, swallowed objects.", "Internal structure and pattern information."]]
    },
    watchHeading: "Symptoms that often need more than an exam",
    watchIntro: "Your veterinarian may recommend testing sooner when symptoms are serious, recurring, or unclear.",
    watchItems: ["Repeated vomiting, diarrhea, weight loss, or appetite changes.", "Coughing, breathing changes, collapse, or exercise intolerance.", "Limping, pain, injury, swollen abdomen, or suspected toxin or foreign-body exposure."],
    callout: { tone: "vet-note", title: "Testing is part of the conversation", body: "Ask what each test is looking for, what decisions it may change, and what options exist if you need to prioritize." },
    visitHeading: "How to prepare for diagnostics",
    visit: "The team will explain whether fasting, urine collection, stool samples, or medication timing matters.",
    homeHeading: "After results come back",
    home: "Diagnostics are most useful when they lead to a clear plan.",
    homeItems: ["Ask what was normal, abnormal, or still uncertain.", "Clarify when to recheck or repeat testing.", "Keep copies of important results for travel, boarding, or referral visits."],
    faqTitle: "Diagnostics FAQ",
    faqs: [{ question: "Does normal bloodwork mean my pet is healthy?", answer: "Normal results are useful, but they do not rule out every problem. Your veterinarian interprets results with the exam and history." }, { question: "Are x-rays always enough?", answer: "Not always. Some conditions need lab work, ultrasound, specialized imaging, referral, or repeat exams." }],
    internal: ["diagnostics", "sick", "wellness", "book"],
    external: ["avmaPetOwners"]
  },
  {
    slug: "pet-surgery-preparation-what-to-expect-before-and-after-a-soft-tissue-procedure",
    title: "Pet Surgery Preparation: What to Expect Before and After a Soft Tissue Procedure",
    excerpt: "A practical guide to pre-surgical instructions, anesthesia questions, home recovery, activity restriction, and incision monitoring.",
    seoTitle: "Pet Surgery Preparation and Recovery",
    seoDescription: "Prepare for dog or cat soft tissue surgery with guidance on pre-op instructions, anesthesia, recovery, and incision care.",
    focusKeyword: "pet surgery preparation",
    secondaryKeywords: ["dog surgery recovery", "cat surgery recovery", "veterinary surgery Northern Kentucky"],
    tags: ["surgery", "recovery", "soft tissue"],
    opening: "Surgery is easier to manage when you know what will happen before drop-off, during recovery, and at home. Preparation helps reduce stress and protects the incision after your pet leaves the clinic.",
    whyHeading: "The plan starts before surgery day",
    why: "Pre-surgical instructions are designed for anesthesia safety, pain control, and a smoother recovery. They may include fasting, medication guidance, lab work, and arrival timing.",
    keyPoints: ["Follow food and water instructions exactly unless the clinic tells you otherwise.", "Ask which medications should be given or held before surgery.", "Plan a quiet recovery space before your pet comes home."],
    table: {
      title: "Before and after surgery",
      headers: ["Stage", "Owner focus", "Why it matters"],
      rows: [["Before surgery", "Fasting, medication instructions, lab work.", "Supports anesthesia planning."], ["Discharge", "Pain meds, e-collar, incision instructions.", "Sets up safe home care."], ["Recovery", "Rest, leash walks, incision checks.", "Prevents reopened incisions and complications."]]
    },
    watchHeading: "Call the clinic if you notice",
    watchIntro: "Some post-op changes are expected, but these concerns should be reported.",
    watchItems: ["Bleeding, swelling, discharge, bad odor, missing stitches, or an open incision.", "Repeated vomiting, refusal to eat after the expected window, severe lethargy, or uncontrolled pain.", "Chewing at the incision or refusing the e-collar or recovery suit."],
    callout: { tone: "next-step", title: "Restriction is medicine", body: "Too much activity is one of the most common ways pets slow their own healing. Use leash walks and a confined rest area as directed." },
    visitHeading: "Questions to ask before the procedure",
    visit: "A clear conversation before surgery helps you understand the plan and recovery responsibilities.",
    homeHeading: "Setting up the recovery area",
    home: "Prepare the home before pickup so your pet can settle immediately.",
    homeItems: ["Choose a quiet room away from stairs and rough play.", "Use nonslip flooring or rugs if your pet is wobbly.", "Keep other pets separated until your veterinarian says normal activity can resume."],
    faqTitle: "Surgery prep FAQ",
    faqs: [{ question: "Why does my pet need an e-collar?", answer: "Licking or chewing can damage an incision quickly. The collar protects the repair while it heals." }, { question: "When can normal activity resume?", answer: "It depends on the procedure and healing progress. Follow the discharge instructions and attend recommended rechecks." }],
    internal: ["surgery", "diagnostics", "book", "contact"],
    external: ["avmaPetOwners"]
  },
  {
    slug: "spay-and-neuter-timing-questions-to-ask-your-northern-kentucky-veterinarian",
    title: "Spay and Neuter Timing: Questions to Ask Your Northern Kentucky Veterinarian",
    excerpt: "How to talk through spay and neuter timing based on age, breed, health, lifestyle, behavior, and long-term goals.",
    seoTitle: "Spay and Neuter Timing Questions",
    seoDescription: "Ask better questions about spay and neuter timing for dogs and cats with your Northern Kentucky veterinarian.",
    focusKeyword: "spay and neuter timing",
    secondaryKeywords: ["when to spay a dog", "when to neuter a cat", "Northern Kentucky veterinary surgery"],
    tags: ["spay neuter", "surgery", "puppies", "kittens"],
    opening: "There is not one perfect spay or neuter age for every pet. Timing depends on species, breed, size, health, behavior, household risk, and your veterinarian's assessment.",
    whyHeading: "Timing should be individualized",
    why: "Cats, small dogs, large-breed dogs, shelter pets, and pets with medical concerns may need different conversations. The goal is to balance reproductive prevention with growth, health, and behavior factors.",
    keyPoints: ["Ask how breed and expected adult size affect timing for dogs.", "Discuss heat cycles, roaming, spraying, marking, and pregnancy risk.", "Review anesthesia, pre-op lab work, pain control, and recovery expectations."],
    table: {
      title: "Discussion points for spay/neuter planning",
      headers: ["Topic", "Why to ask", "Helpful question"],
      rows: [["Age and growth", "Timing may differ by pet.", "What timing do you recommend for my pet and why?"], ["Lifestyle risk", "Roaming, intact pets, and exposure matter.", "How urgent is pregnancy prevention in my household?"], ["Recovery", "Home setup affects healing.", "What restrictions should I plan for?"]]
    },
    watchHeading: "When to schedule a timing discussion",
    watchIntro: "Do not wait until your pet is already overdue or showing behavior concerns.",
    watchItems: ["At early puppy or kitten vaccine visits.", "When adopting an intact adult pet.", "Before boarding, daycare, dog parks, or multi-pet household changes."],
    callout: { tone: "vet-note", title: "A timing question is a medical question", body: "Online age charts are too broad. Your veterinarian can explain the reasoning for your individual dog or cat." },
    visitHeading: "What the pre-surgical visit covers",
    visit: "The team may review records, complete an exam, discuss lab work, and explain fasting and discharge instructions.",
    homeHeading: "Planning for recovery",
    home: "Spay and neuter procedures still require real rest at home.",
    homeItems: ["Plan restricted activity and leash walks.", "Use the e-collar or recovery suit as instructed.", "Monitor appetite, comfort, incision appearance, and medication dosing."],
    faqTitle: "Spay/neuter timing FAQ",
    faqs: [{ question: "Is the same timing right for every dog?", answer: "No. Breed, size, health, and lifestyle can affect the recommendation." }, { question: "Can adult pets still be spayed or neutered?", answer: "Often yes, but adult pets should have an exam and individualized anesthesia and recovery plan." }],
    internal: ["surgery", "newPatients", "book", "contact"],
    external: ["avmaSpayNeuter", "avmaPetOwners"]
  },
  {
    slug: "microchipping-dogs-and-cats-in-fort-thomas-and-independence",
    title: "Microchipping Dogs and Cats in Fort Thomas and Independence",
    excerpt: "How microchips work, why registration matters, and why even indoor cats and well-trained dogs benefit from permanent ID.",
    seoTitle: "Microchipping Dogs and Cats Locally",
    seoDescription: "Learn how dog and cat microchipping works in Fort Thomas and Independence, plus why registration updates matter.",
    focusKeyword: "microchipping dogs and cats",
    secondaryKeywords: ["pet microchip Fort Thomas", "pet microchip Independence KY", "lost pet ID"],
    tags: ["microchip", "safety", "new pets"],
    opening: "A collar tag is helpful, but it can break, slip off, or be removed. A microchip gives your dog or cat a permanent form of identification that can help shelters and veterinary clinics contact you if your pet is found.",
    whyHeading: "The chip is only half the job",
    why: "Microchips need accurate registration to work. If the phone number or email attached to the chip is outdated, the pet may be scanned but still hard to reunite with family.",
    keyPoints: ["Microchips are placed under the skin and scanned with a special reader.", "Registration connects the chip number to your contact information.", "Indoor cats benefit because escapes and storm-related door dashes happen."],
    table: {
      title: "Microchip checklist",
      headers: ["Step", "What to do", "When to update"],
      rows: [["Implant", "Have the chip placed by a veterinary team.", "Once, unless a rare chip issue is found."], ["Register", "Create or confirm the registry profile.", "Right after placement or adoption."], ["Maintain", "Keep phone, email, and address current.", "After moves or phone changes."]]
    },
    watchHeading: "When microchip updates are easy to miss",
    watchIntro: "Most microchip problems are registration problems.",
    watchItems: ["You moved or changed your phone number.", "You adopted a pet whose chip is still linked to a rescue, shelter, breeder, or previous owner.", "You are unsure which registry has your pet's chip."],
    callout: { tone: "tip", title: "Ask for a scan at checkups", body: "A quick scan confirms the chip can be found and the number matches your records." },
    visitHeading: "What to expect during placement",
    visit: "Microchipping is quick and can often be done during a routine visit, vaccine appointment, or certain anesthetic procedures.",
    homeHeading: "Pair microchips with visible ID",
    home: "The best lost-pet plan uses more than one layer.",
    homeItems: ["Use a collar and current tag when safe for the pet.", "Keep clear photos of your pet on your phone.", "Know where to report a lost pet in your local community."],
    faqTitle: "Microchip FAQ",
    faqs: [{ question: "Is a microchip a GPS tracker?", answer: "No. A microchip does not track location. It provides an ID number when scanned." }, { question: "Do indoor cats need microchips?", answer: "Yes. Indoor cats can escape through doors, windows, carriers, or during storms and moves." }],
    internal: ["wellness", "newPatients", "fortThomas", "independence"],
    external: ["avmaMicrochip", "avmaPetOwners"]
  },
  {
    slug: "indoor-cat-veterinary-care-why-house-cats-still-need-exams-and-vaccines",
    title: "Indoor Cat Veterinary Care: Why House Cats Still Need Exams and Vaccines",
    excerpt: "Indoor cats still need exams, vaccines, dental checks, parasite conversations, and age-appropriate screening.",
    seoTitle: "Indoor Cat Vet Care and Vaccines",
    seoDescription: "Learn why indoor cats still need veterinary exams, vaccines, dental care, and preventive screening in Northern Kentucky.",
    focusKeyword: "indoor cat veterinary care",
    secondaryKeywords: ["indoor cat vaccines", "cat wellness exam", "Northern Kentucky cat vet"],
    tags: ["cat care", "wellness", "vaccines"],
    opening: "Indoor cats are safer from some risks, but they are not risk-free. Many indoor cats hide pain and illness until a problem is advanced, which makes routine exams especially valuable.",
    whyHeading: "Indoor does not mean invisible care",
    why: "Cats can develop dental disease, arthritis, obesity, kidney disease, thyroid disease, urinary problems, diabetes, and behavior changes without going outside.",
    keyPoints: ["Rabies and other vaccine recommendations depend on law, lifestyle, age, and health.", "Dental pain and arthritis are commonly under-recognized in cats.", "Parasite exposure can happen through other pets, insects, soil, wildlife, or brief escapes."],
    table: {
      title: "Indoor cat care areas",
      headers: ["Care area", "Why it matters", "What owners may notice"],
      rows: [["Dental health", "Mouth pain can be hidden.", "Bad breath, drooling, chewing changes."], ["Weight and mobility", "Extra weight worsens arthritis and diabetes risk.", "Less jumping, more sleeping, poor grooming."], ["Urinary health", "Litter box changes can be medical.", "Frequent trips, accidents, straining."]]
    },
    watchHeading: "Quiet signs your cat needs an exam",
    watchIntro: "Cats are experts at subtle symptoms.",
    watchItems: ["Changes in appetite, thirst, weight, grooming, or litter box habits.", "Hiding, irritability, less jumping, or sleeping in new places.", "Bad breath, drooling, vomiting, coughing, or hair coat changes."],
    callout: { tone: "vet-note", title: "Carrier stress is solvable", body: "If the carrier is the barrier, ask the team about low-stress carrier practice and appointment planning." },
    visitHeading: "What an indoor cat wellness visit covers",
    visit: "The visit can review vaccines, body weight, teeth, joints, skin, heart, behavior, litter box habits, diet, and screening needs.",
    homeHeading: "Helping indoor cats stay healthy",
    home: "Small changes at home can support medical care.",
    homeItems: ["Use play, food puzzles, and climbing options to encourage movement.", "Track weight and litter box changes.", "Keep carriers accessible instead of only bringing them out for vet visits."],
    faqTitle: "Indoor cat FAQ",
    faqs: [{ question: "Does my indoor cat need rabies vaccination?", answer: "Rabies vaccination is commonly recommended and may be legally required. Indoor cats can still be exposed through bats or escapes." }, { question: "How often should an indoor cat be examined?", answer: "Many adult cats benefit from annual exams, and senior cats or cats with medical issues may need more frequent visits." }],
    internal: ["wellness", "vaccines", "sick", "book"],
    external: ["avmaVaccines", "cdcHealthyPets", "avmaPetOwners"]
  },
  {
    slug: "healthy-weight-for-dogs-and-cats-a-northern-kentucky-pet-owner-guide",
    title: "Healthy Weight for Dogs and Cats: A Northern Kentucky Pet Owner Guide",
    excerpt: "How to talk about pet weight without shame, and why body condition, food portions, treats, pain, and medical screening all matter.",
    seoTitle: "Healthy Weight for Dogs and Cats",
    seoDescription: "A Northern Kentucky guide to healthy weight, body condition, portions, treats, and veterinary weight-loss planning for pets.",
    focusKeyword: "healthy weight for dogs and cats",
    secondaryKeywords: ["pet obesity", "dog weight loss", "cat weight management"],
    tags: ["nutrition", "weight", "wellness"],
    opening: "Healthy weight is not about making a pet look a certain way. It is about breathing, mobility, comfort, skin health, anesthesia safety, and long-term disease risk.",
    whyHeading: "Body condition tells more than the scale",
    why: "Two pets can weigh the same and carry weight differently. Your veterinarian uses body condition, muscle condition, breed, age, and medical history to set a reasonable target.",
    keyPoints: ["Extra weight can worsen arthritis, breathing problems, diabetes risk, skin folds, and heat intolerance.", "Sudden weight loss can be just as concerning as weight gain.", "Treats, table food, dental chews, and multiple feeders can quietly add calories."],
    table: {
      title: "Weight conversation guide",
      headers: ["Topic", "Ask about", "Why it helps"],
      rows: [["Body condition", "What score is my pet today?", "Creates a baseline."], ["Calories", "How much should my pet eat daily?", "Prevents portion guessing."], ["Medical causes", "Should we screen for disease?", "Weight changes can be medical."]]
    },
    watchHeading: "Weight changes to take seriously",
    watchIntro: "Do not assume every change is from food alone.",
    watchItems: ["Weight loss with normal or increased appetite.", "Weight gain with low energy, hair coat changes, or exercise intolerance.", "Reluctance to jump, climb stairs, play, or walk as far."],
    callout: { tone: "tip", title: "Measure the food for one week", body: "A measuring cup or kitchen scale gives your veterinarian better information than 'about a scoop.'" },
    visitHeading: "What a weight plan may include",
    visit: "A safe plan can include diet choice, calories, treat limits, exercise changes, pain management, and recheck weigh-ins.",
    homeHeading: "Changes that actually stick",
    home: "The best weight plan is one the household can follow consistently.",
    homeItems: ["Use a daily treat budget instead of random extras.", "Feed cats in separate areas if one pet steals food.", "Ask about pain if your pet resists exercise."],
    faqTitle: "Healthy weight FAQ",
    faqs: [{ question: "Can I just feed less of the current food?", answer: "Sometimes, but cutting too much can reduce nutrients. Ask your veterinarian before making a major calorie reduction." }, { question: "How fast should a pet lose weight?", answer: "Gradual loss is safer. Your veterinarian can set a target based on your pet's health." }],
    internal: ["wellness", "sick", "book", "contact"],
    external: ["fdaPetFood", "avmaPetOwners", "aahaLifeStage"]
  },
  {
    slug: "pet-nutrition-basics-feeding-dogs-and-cats-with-confidence",
    title: "Pet Nutrition Basics: Feeding Dogs and Cats With Confidence",
    excerpt: "How to read pet food choices more calmly, compare labels, handle treats, and know when your veterinarian should help with diet decisions.",
    seoTitle: "Pet Nutrition Basics for Dogs and Cats",
    seoDescription: "Feed dogs and cats with more confidence using practical guidance on labels, portions, treats, life stage, and veterinary diet advice.",
    focusKeyword: "pet nutrition basics",
    secondaryKeywords: ["dog food label", "cat food label", "veterinary nutrition advice"],
    tags: ["nutrition", "food", "wellness"],
    opening: "Pet food aisles can make feeding feel more complicated than it needs to be. The goal is not to chase every trend; it is to choose a complete, appropriate diet your pet tolerates well and to feed the right amount.",
    whyHeading: "Life stage and health come first",
    why: "Puppies, kittens, adults, seniors, pregnant pets, and pets with medical conditions may need different nutrition. A diet that works well for one pet may be wrong for another.",
    keyPoints: ["Look for a diet appropriate for your pet's species and life stage.", "Treat calories count, especially for small dogs and indoor cats.", "Prescription diets should be used with veterinary guidance."],
    table: {
      title: "Feeding decisions to review",
      headers: ["Decision", "What to check", "When to ask the vet"],
      rows: [["Life stage", "Puppy, kitten, adult, senior.", "Any growth, pregnancy, or senior concern."], ["Portion", "Calories per cup/can and treat intake.", "Weight gain or loss."], ["Diet type", "Dry, canned, therapeutic, mixed feeding.", "Medical conditions or picky eating."]]
    },
    watchHeading: "Food-related concerns to mention",
    watchIntro: "Diet can be connected to symptoms, but it is not always the only cause.",
    watchItems: ["Vomiting, diarrhea, constipation, gas, or appetite changes.", "Itchy skin, ear infections, or recurring stomach upset.", "Weight change, poor growth, or dull coat."],
    callout: { tone: "warning", title: "Avoid sudden diet experiments when pets are sick", body: "Changing food during vomiting or diarrhea can complicate the picture. Call for guidance if symptoms are active." },
    visitHeading: "What nutrition advice can cover",
    visit: "A veterinary nutrition conversation may include body condition, calories, medical history, dental needs, stool quality, and household feeding logistics.",
    homeHeading: "Feeding habits that help",
    home: "Consistency makes it easier to see what is working.",
    homeItems: ["Measure meals and keep treat amounts visible to the whole household.", "Transition diets gradually unless told otherwise.", "Store food securely and watch expiration dates."],
    faqTitle: "Nutrition FAQ",
    faqs: [{ question: "Is grain-free food better?", answer: "Not automatically. Diet choice should be based on your pet's needs, not marketing. Ask your veterinarian before switching for medical reasons." }, { question: "Can cats eat dog food or dogs eat cat food?", answer: "Occasional stolen bites happen, but dogs and cats have different nutritional needs and should not share diets long term." }],
    internal: ["wellness", "sick", "book", "contact"],
    external: ["fdaPetFood", "fdaHandling", "avmaPetOwners"]
  },
  {
    slug: "limping-in-dogs-and-cats-why-a-veterinary-exam-matters",
    title: "Limping in Dogs and Cats: Why a Veterinary Exam Matters",
    excerpt: "Why limping should be checked, what details help the exam, and when mobility changes are urgent.",
    seoTitle: "Limping in Dogs and Cats: Vet Exam Guide",
    seoDescription: "Learn why dogs and cats limp, what signs are urgent, and how a veterinary exam helps identify pain or injury.",
    focusKeyword: "limping in dogs and cats",
    secondaryKeywords: ["dog limping", "cat limping", "pet lameness"],
    tags: ["limping", "pain", "sick visits"],
    opening: "Limping means your pet is changing how they move because something hurts, feels weak, or is not working normally. Even if the limp comes and goes, it deserves attention.",
    whyHeading: "A limp can come from many places",
    why: "Paws, nails, muscles, tendons, ligaments, joints, bones, nerves, and the spine can all cause changes in movement. Cats may show pain by jumping less instead of obviously limping.",
    keyPoints: ["A sudden non-weight-bearing limp is more concerning than a mild stiffness that improves quickly.", "Older pets can have arthritis and still experience new injuries.", "Pain medication should be chosen by a veterinarian because human products can be dangerous for pets."],
    table: {
      title: "Mobility clues",
      headers: ["Clue", "Possible meaning", "What to do"],
      rows: [["Won't bear weight", "Fracture, ligament injury, severe pain.", "Call promptly."], ["Stiff after rest", "Arthritis or soft tissue pain.", "Schedule an exam."], ["Licking paw", "Nail, pad, foreign body, allergy.", "Check gently and call if persistent."]]
    },
    watchHeading: "When limping needs faster care",
    watchIntro: "Some mobility changes should not wait.",
    watchItems: ["Dragging a limb, collapse, severe pain, swelling, or obvious deformity.", "Limping after trauma, fall, car injury, or rough play.", "A cat hiding, not eating, or unable to jump normally."],
    callout: { tone: "warning", title: "Do not give human pain medicine", body: "Ibuprofen, naproxen, acetaminophen, and other human medications can be toxic or unsafe for pets." },
    visitHeading: "What the exam may involve",
    visit: "Your veterinarian may watch your pet walk, palpate joints and muscles, examine paws and nails, and recommend x-rays or lab work depending on findings.",
    homeHeading: "How to help while waiting",
    home: "Keep your pet from making the injury worse until you get guidance.",
    homeItems: ["Restrict running, jumping, stairs, and rough play.", "Use leash walks for bathroom breaks.", "Bring videos if the limp is intermittent."],
    faqTitle: "Limping FAQ",
    faqs: [{ question: "What if the limp disappears at the clinic?", answer: "That happens often. Videos from home and a clear timeline can still help." }, { question: "Can cats hide orthopedic pain?", answer: "Yes. Less jumping, poor grooming, hiding, or irritability can be pain signs." }],
    internal: ["sick", "diagnostics", "book", "contact"],
    external: ["avmaPetOwners", "avmaSenior"]
  },
  {
    slug: "vomiting-and-diarrhea-in-dogs-and-cats-when-to-call-a-northern-kentucky-vet",
    title: "Vomiting and Diarrhea in Dogs and Cats: When to Call a Northern Kentucky Vet",
    excerpt: "How to judge stomach symptoms, dehydration risk, red flags, and what information helps the veterinary team.",
    seoTitle: "Vomiting and Diarrhea in Pets: When to Call",
    seoDescription: "Know when vomiting or diarrhea in dogs and cats needs a vet visit, plus what symptoms are urgent in Northern Kentucky pets.",
    focusKeyword: "vomiting and diarrhea in dogs and cats",
    secondaryKeywords: ["dog vomiting", "cat diarrhea", "pet stomach upset"],
    tags: ["vomiting", "diarrhea", "sick visits"],
    opening: "A single mild stomach upset may pass, but vomiting and diarrhea can also signal parasites, infection, diet problems, pancreatitis, toxins, foreign bodies, organ disease, or stress.",
    whyHeading: "Pattern matters more than one episode",
    why: "Your veterinarian will want to know how often it is happening, whether your pet can keep water down, what the stool looks like, and whether energy or appetite has changed.",
    keyPoints: ["Young, senior, tiny, and chronically ill pets can dehydrate faster.", "Cats that stop eating are at higher risk for complications.", "Blood, severe pain, repeated vomiting, or suspected toxin exposure should be treated urgently."],
    table: {
      title: "Stomach symptom triage",
      headers: ["Situation", "Concern level", "Recommended next step"],
      rows: [["One mild episode, normal energy", "Monitor closely.", "Call if it repeats or other signs appear."], ["Repeated vomiting or diarrhea", "Higher concern.", "Contact the clinic."], ["Blood, weakness, pain, toxin risk", "Urgent.", "Seek veterinary care promptly."]]
    },
    watchHeading: "Red flags to call about now",
    watchIntro: "These symptoms can point to dehydration, pain, or a more serious cause.",
    watchItems: ["Repeated vomiting, unproductive retching, swollen belly, or severe abdominal pain.", "Blood in vomit or stool, black stool, weakness, collapse, or pale gums.", "Puppy, kitten, senior pet, diabetic pet, or pet on chronic medication."],
    callout: { tone: "warning", title: "Do not wait after toxin exposure", body: "If your pet may have eaten medication, chocolate, xylitol, grapes, lilies, or another toxin, call for urgent guidance." },
    visitHeading: "What the clinic may ask",
    visit: "The team may ask about diet changes, trash access, medications, parasite prevention, stool appearance, and exposure to other sick animals.",
    homeHeading: "What to bring",
    home: "Useful details can speed up the visit.",
    homeItems: ["Bring a fresh stool sample if diarrhea is part of the problem.", "Take photos of vomit or stool if helpful.", "Bring packaging from anything your pet may have eaten."],
    faqTitle: "Vomiting and diarrhea FAQ",
    faqs: [{ question: "Should I withhold food?", answer: "Do not use a one-size-fits-all fasting rule, especially for puppies, kittens, cats, diabetic pets, or fragile pets. Call for guidance." }, { question: "Can I give human anti-diarrhea medicine?", answer: "Do not give human medication unless your veterinarian specifically recommends it." }],
    internal: ["sick", "diagnostics", "book", "contact"],
    external: ["avmaPetOwners", "capc", "fdaHandling"]
  },
  {
    slug: "pet-ear-infections-signs-causes-and-veterinary-care-for-dogs-and-cats",
    title: "Pet Ear Infections: Signs, Causes, and Veterinary Care for Dogs and Cats",
    excerpt: "How to recognize ear discomfort, why ear infections keep coming back, and why proper diagnosis matters.",
    seoTitle: "Pet Ear Infection Signs and Care",
    seoDescription: "Learn signs of ear infections in dogs and cats, common causes, and why veterinary ear exams and treatment matter.",
    focusKeyword: "pet ear infections",
    secondaryKeywords: ["dog ear infection", "cat ear infection", "itchy ears pet"],
    tags: ["ears", "allergies", "sick visits"],
    opening: "Ear infections are uncomfortable, and pets often make them worse by scratching or shaking. The right treatment depends on what is happening inside the ear canal, not just how the ear looks from the outside.",
    whyHeading: "Ear infections need the right target",
    why: "Yeast, bacteria, mites, allergies, moisture, anatomy, foreign material, and underlying skin disease can all play a role. Treating without checking the ear can miss the cause.",
    keyPoints: ["Head shaking, odor, redness, discharge, and scratching are common signs.", "Recurring ear infections often need an allergy or skin health conversation.", "Deep or painful ears should be handled gently to avoid injury."],
    table: {
      title: "Ear symptom clues",
      headers: ["Sign", "Possible concern", "Why an exam helps"],
      rows: [["Odor or discharge", "Yeast or bacteria.", "Cytology guides treatment."], ["Head tilt or severe pain", "Middle/inner ear concern or deep infection.", "Needs prompt assessment."], ["Recurring itch", "Allergies or chronic skin disease.", "Prevention plan may be needed."]]
    },
    watchHeading: "When to schedule an ear visit",
    watchIntro: "Mild redness can become painful quickly.",
    watchItems: ["Head shaking, scratching, odor, discharge, swelling, or redness.", "Crying when ears are touched.", "Loss of balance, head tilt, or sudden hearing changes."],
    callout: { tone: "warning", title: "Avoid leftover ear drops", body: "Old medication may be wrong for the current infection and can be unsafe if the eardrum is damaged." },
    visitHeading: "What ear care at the clinic may include",
    visit: "The veterinarian may examine the canal, check a sample under the microscope, clean the ear safely, and prescribe medication based on findings.",
    homeHeading: "Preventing repeat flare-ups",
    home: "Prevention depends on the cause.",
    homeItems: ["Use cleaners and medications only as directed.", "Keep follow-up appointments if the ear needs rechecking.", "Discuss allergies if infections keep returning."],
    faqTitle: "Ear infection FAQ",
    faqs: [{ question: "Can I clean my pet's ears at home?", answer: "Sometimes, but painful or infected ears should be checked first. Cleaning the wrong way can hurt." }, { question: "Why did the infection come back?", answer: "Recurring infections often have an underlying trigger such as allergies, anatomy, moisture, or chronic skin disease." }],
    internal: ["sick", "wellness", "book", "contact"],
    external: ["avmaPetOwners"]
  },
  {
    slug: "pet-allergies-and-itchy-skin-in-northern-kentucky-what-owners-should-watch-for",
    title: "Pet Allergies and Itchy Skin in Northern Kentucky: What Owners Should Watch For",
    excerpt: "A local guide to itchy skin, allergies, fleas, ear infections, hot spots, and when your dog or cat needs veterinary care.",
    seoTitle: "Pet Allergies and Itchy Skin in NKY",
    seoDescription: "Learn what causes itchy skin in dogs and cats around Northern Kentucky and when allergies need veterinary care.",
    focusKeyword: "pet allergies Northern Kentucky",
    secondaryKeywords: ["itchy dog", "itchy cat", "pet skin allergies"],
    tags: ["allergies", "skin", "itching"],
    opening: "Northern Kentucky pollen, humidity, fleas, and seasonal swings can make itchy pets miserable. Itching can look like scratching, licking paws, chewing, rubbing, hair loss, ear infections, or red skin.",
    whyHeading: "Itching is a symptom with layers",
    why: "Allergies are common, but parasites, infection, food reactions, mites, pain, and endocrine disease can mimic or complicate allergy symptoms.",
    keyPoints: ["Flea allergy can trigger severe itching even when you do not see many fleas.", "Skin and ear infections often need treatment before an allergy plan can work.", "Chronic itching may need long-term management, not one quick fix."],
    table: {
      title: "Itch patterns to notice",
      headers: ["Pattern", "Possible clue", "What to mention"],
      rows: [["Paw licking", "Environmental allergy, irritation, infection.", "Seasonality and surfaces."], ["Ear infections", "Allergy connection is common.", "How often they recur."], ["Back-end itching", "Fleas or skin infection.", "Prevention history."]]
    },
    watchHeading: "Signs the itch needs a visit",
    watchIntro: "Scratching can damage the skin and create secondary infections.",
    watchItems: ["Open sores, hot spots, odor, discharge, crusting, or hair loss.", "Constant licking, chewing, rubbing, or sleep disruption.", "Ear odor, head shaking, or recurring ear infections."],
    callout: { tone: "tip", title: "Bring prevention details", body: "The product name and last dose date help your veterinarian evaluate flea and tick coverage accurately." },
    visitHeading: "How veterinarians narrow it down",
    visit: "The exam may include skin cytology, ear cytology, parasite checks, treatment trials, prevention review, and allergy management options.",
    homeHeading: "Comfort steps that support treatment",
    home: "At-home care can help, but it should match the diagnosis.",
    homeItems: ["Use parasite prevention consistently as recommended.", "Avoid random shampoos or essential oils on irritated skin.", "Schedule rechecks if itching returns after medication stops."],
    faqTitle: "Itchy skin FAQ",
    faqs: [{ question: "Can allergies cause ear infections?", answer: "Yes. Allergies are a common reason dogs and some cats get recurring ear problems." }, { question: "Do I need to see fleas for fleas to be the problem?", answer: "No. Pets with flea allergy may react strongly to bites even when fleas are hard to find." }],
    internal: ["sick", "wellness", "book", "contact"],
    external: ["capc", "avmaPetOwners", "cdcHealthyPets"]
  },
  {
    slug: "when-is-a-sick-pet-exam-needed-dog-and-cat-symptoms-to-take-seriously",
    title: "When Is a Sick Pet Exam Needed? Dog and Cat Symptoms to Take Seriously",
    excerpt: "A practical guide to symptoms that should lead to a sick pet exam instead of waiting for the next wellness visit.",
    seoTitle: "When Does a Pet Need a Sick Exam?",
    seoDescription: "Know which dog and cat symptoms should prompt a sick pet exam, urgent call, or veterinary visit in Northern Kentucky.",
    focusKeyword: "sick pet exam",
    secondaryKeywords: ["dog sick visit", "cat sick visit", "pet symptoms vet"],
    tags: ["sick visits", "symptoms", "urgent care"],
    opening: "Pet owners often wonder whether a symptom is worth a visit. The safest answer depends on the pet's age, history, severity, duration, and whether the problem is getting better or worse.",
    whyHeading: "Waiting can make simple problems harder",
    why: "A sick exam gives your veterinarian a chance to identify pain, infection, dehydration, injury, or internal disease before it becomes more serious.",
    keyPoints: ["Sudden symptoms, repeated symptoms, and symptoms paired with low energy deserve attention.", "Cats, seniors, puppies, kittens, and pets with chronic disease often need earlier care.", "A phone call can help decide whether the appointment should be same-day, scheduled, or emergency."],
    table: {
      title: "Symptoms and next steps",
      headers: ["Symptom", "Why it matters", "Next step"],
      rows: [["Trouble breathing or collapse", "Can be life-threatening.", "Seek urgent care."], ["Repeated vomiting or diarrhea", "Dehydration and serious causes are possible.", "Call the clinic."], ["Limping, pain, or not eating", "May worsen without treatment.", "Schedule a sick exam."]]
    },
    watchHeading: "Symptoms to take seriously",
    watchIntro: "These signs are worth a call even if you are unsure how severe they are.",
    watchItems: ["Appetite loss, lethargy, hiding, crying, weakness, or behavior change.", "Vomiting, diarrhea, coughing, sneezing, limping, itching, or ear pain.", "Changes in urination, thirst, stool, breathing, weight, or gum color."],
    callout: { tone: "warning", title: "Emergency signs override online advice", body: "Difficulty breathing, collapse, seizures, severe bleeding, toxin exposure, or inability to urinate require urgent veterinary help." },
    visitHeading: "What to expect at a sick exam",
    visit: "The veterinarian will focus on the current problem, review history, complete an exam, and discuss whether diagnostics or treatment are needed.",
    homeHeading: "Before you call",
    home: "Helpful details make triage faster.",
    homeItems: ["Know when the symptom started and whether it is worsening.", "List current medications and preventives.", "Mention if your pet may have eaten something unsafe."],
    faqTitle: "Sick exam FAQ",
    faqs: [{ question: "Can a sick exam also include vaccines?", answer: "Sometimes, but illness may change vaccine timing. The medical concern usually comes first." }, { question: "What if symptoms improve before the visit?", answer: "Call and ask. Some symptoms still need evaluation, while others may be monitored with guidance." }],
    internal: ["sick", "diagnostics", "book", "contact"],
    external: ["avmaPetOwners", "cdcHealthyPets"]
  },
  {
    slug: "senior-pet-care-in-northern-kentucky-helping-older-dogs-and-cats-stay-comfortable",
    title: "Senior Pet Care in Northern Kentucky: Helping Older Dogs and Cats Stay Comfortable",
    excerpt: "How senior pet exams, lab work, dental care, mobility support, nutrition, and home changes help older pets stay comfortable.",
    seoTitle: "Senior Pet Care in Northern Kentucky",
    seoDescription: "Support older dogs and cats with senior pet exams, lab work, dental care, pain management, and home comfort planning.",
    focusKeyword: "senior pet care Northern Kentucky",
    secondaryKeywords: ["older dog care", "senior cat care", "geriatric pet exam"],
    tags: ["senior pets", "wellness", "comfort"],
    opening: "Senior pets deserve care that is proactive and realistic. Older dogs and cats can stay comfortable for a long time when pain, dental disease, weight changes, organ function, and home routines are watched closely.",
    whyHeading: "Aging is not a diagnosis",
    why: "Many changes blamed on age are actually treatable or manageable. Slowing down, bad breath, accidents, weight loss, and behavior changes may point to medical issues.",
    keyPoints: ["Senior pets often benefit from more frequent exams than young adults.", "Lab work can show trends before a pet acts sick.", "Pain control, dental care, nutrition, and home adjustments can improve quality of life."],
    table: {
      title: "Senior care focus areas",
      headers: ["Area", "What to watch", "Why it matters"],
      rows: [["Mobility", "Stairs, jumping, stiffness.", "Pain is often under-recognized."], ["Weight and appetite", "Loss, gain, picky eating.", "Can signal disease or pain."], ["Bathroom habits", "Accidents, thirst, urine changes.", "May point to organ or endocrine disease."]]
    },
    watchHeading: "Changes to mention early",
    watchIntro: "Small changes can be meaningful in older pets.",
    watchItems: ["Drinking more, urinating more, losing weight, or eating differently.", "Bad breath, drooling, dropping food, or pawing at the mouth.", "Confusion, pacing, night waking, hiding, irritability, or less grooming."],
    callout: { tone: "vet-note", title: "Comfort is measurable", body: "Tracking sleep, appetite, mobility, bathroom habits, and favorite activities helps judge whether a plan is working." },
    visitHeading: "What a senior visit may include",
    visit: "Senior care often combines a thorough exam, lab screening, dental assessment, pain discussion, nutrition review, and medication check.",
    homeHeading: "Making home easier for aging pets",
    home: "Simple changes can reduce pain and anxiety.",
    homeItems: ["Use nonslip rugs, ramps, low-entry litter boxes, and raised or stable dishes when helpful.", "Keep routines predictable.", "Schedule rechecks when symptoms change instead of waiting for the next annual visit."],
    faqTitle: "Senior pet FAQ",
    faqs: [{ question: "When is a pet considered senior?", answer: "It varies by species, breed, and size. Large dogs generally age faster than small dogs, and cats often need senior-focused screening as they get older." }, { question: "Is stiffness just normal aging?", answer: "Stiffness is common, but that does not mean it should be ignored. Pain management and home changes can help many pets." }],
    internal: ["wellness", "diagnostics", "dental", "book"],
    external: ["avmaSenior", "aahaLifeStage", "avmaPetOwners"]
  },
  {
    slug: "dental-care-for-dogs-and-cats-why-bad-breath-should-not-be-ignored",
    title: "Dental Care for Dogs and Cats: Why Bad Breath Should Not Be Ignored",
    excerpt: "Bad breath can signal dental disease, mouth pain, infection, and quality-of-life concerns in dogs and cats.",
    seoTitle: "Dental Care for Dogs and Cats",
    seoDescription: "Learn why bad breath, tartar, drooling, and chewing changes in dogs and cats should prompt a dental conversation.",
    focusKeyword: "dental care for dogs and cats",
    secondaryKeywords: ["dog bad breath", "cat dental disease", "pet teeth cleaning"],
    tags: ["dental care", "bad breath", "wellness"],
    opening: "Bad breath is common, but it is not automatically normal. Dogs and cats can live with painful dental disease while still eating, playing, and acting mostly themselves.",
    whyHeading: "Mouth pain is easy to miss",
    why: "Pets often chew around painful teeth or swallow food without showing obvious distress. A dental exam helps identify tartar, gingivitis, broken teeth, resorption, masses, and infection.",
    keyPoints: ["Bad breath, red gums, drooling, pawing, dropping food, or chewing on one side can be dental clues.", "Anesthesia is usually needed for a complete dental cleaning and assessment.", "Home brushing and dental products help most when started before severe disease."],
    table: {
      title: "Dental signs and what they may mean",
      headers: ["Sign", "Possible issue", "Why to schedule"],
      rows: [["Bad breath", "Bacteria, tartar, gum disease.", "Can indicate infection or pain."], ["Dropping food", "Painful tooth or mouth lesion.", "Needs oral exam."], ["Red or bleeding gums", "Inflammation or periodontal disease.", "May worsen without care."]]
    },
    watchHeading: "Dental problems that need attention",
    watchIntro: "Mouth disease can affect comfort every day.",
    watchItems: ["Bad breath that persists or worsens.", "Visible tartar, loose teeth, swelling, bleeding, or facial swelling.", "Less interest in toys, hard food, treats, or being touched around the face."],
    callout: { tone: "vet-note", title: "Eating does not rule out dental pain", body: "Many painful pets keep eating because they are hungry and adapt how they chew." },
    visitHeading: "What a dental plan may include",
    visit: "Your veterinarian may recommend an oral exam, dental cleaning, dental x-rays, extractions when needed, pain control, and home care.",
    homeHeading: "Home care that supports dental health",
    home: "Home care is prevention and maintenance, not a replacement for diseased teeth that need treatment.",
    homeItems: ["Ask which dental products are appropriate for your pet.", "Introduce brushing slowly and positively.", "Schedule exams if breath, chewing, or gum appearance changes."],
    faqTitle: "Pet dental FAQ",
    faqs: [{ question: "Can anesthesia-free dental cleaning fix dental disease?", answer: "It cannot fully evaluate or treat disease below the gumline. Ask your veterinarian what your pet needs." }, { question: "How often do pets need dental care?", answer: "It depends on age, breed, mouth health, home care, and exam findings." }],
    internal: ["dental", "wellness", "book", "contact"],
    external: ["avmaDental", "avmaPetOwners"]
  },
  {
    slug: "kitten-vaccines-in-northern-kentucky-what-cat-owners-need-to-know",
    title: "Kitten Vaccines in Northern Kentucky: What Cat Owners Need to Know",
    excerpt: "A practical guide to kitten vaccine timing, boosters, rabies, FeLV conversations, records, and early preventive care.",
    seoTitle: "Kitten Vaccines in Northern Kentucky",
    seoDescription: "Understand kitten vaccines, boosters, rabies, FeLV, parasite testing, and first-year cat care in Northern Kentucky.",
    focusKeyword: "kitten vaccines Northern Kentucky",
    secondaryKeywords: ["kitten shots", "cat vaccine schedule", "new kitten vet"],
    tags: ["kittens", "vaccines", "cat care"],
    opening: "Kitten vaccines are a series, not a single appointment. The schedule is designed to build protection while your kitten's immune system is developing.",
    whyHeading: "Boosters are part of the protection",
    why: "Young kittens have changing maternal antibodies, which is why vaccines are repeated. Missing boosters can leave gaps in protection.",
    keyPoints: ["Core vaccine discussions commonly include FVRCP and rabies.", "FeLV vaccination may be recommended based on age, exposure, and lifestyle.", "Kitten visits also cover deworming, fecal testing, nutrition, behavior, and spay/neuter timing."],
    table: {
      title: "Kitten visit topics",
      headers: ["Topic", "Why it matters", "Ask about"],
      rows: [["FVRCP boosters", "Protects against important feline viruses.", "When is the next booster due?"], ["Rabies", "Protects pets and public health.", "What certificate should I keep?"], ["FeLV", "Risk depends on lifestyle and exposure.", "Should my kitten receive it?"]]
    },
    watchHeading: "Before vaccines, mention symptoms",
    watchIntro: "Tell the team if your kitten is not feeling well before vaccines are given.",
    watchItems: ["Sneezing, eye discharge, coughing, vomiting, diarrhea, or poor appetite.", "Lethargy, fever, fleas, ear mites, or a pot-bellied appearance.", "Exposure to sick cats or unknown vaccine history."],
    callout: { tone: "tip", title: "Book the next booster before you leave", body: "Kitten schedules are easy to miss. Scheduling ahead keeps the series on track." },
    visitHeading: "What to bring to kitten vaccine visits",
    visit: "Records and samples help the team avoid duplicate vaccines and catch parasite problems early.",
    homeHeading: "Keeping your kitten safe between boosters",
    home: "Until the series is complete, be thoughtful about exposure.",
    homeItems: ["Avoid contact with sick or unknown-vaccine cats.", "Keep kittens indoors and parasite prevention current as recommended.", "Store vaccine records with adoption paperwork."],
    faqTitle: "Kitten vaccine FAQ",
    faqs: [{ question: "Why does my kitten need multiple vaccine visits?", answer: "Boosters help build protection during a stage when maternal antibodies and immune response are changing." }, { question: "Do indoor kittens need vaccines?", answer: "Yes. Indoor cats still need core protection, and rabies vaccination may be legally required or strongly recommended." }],
    internal: ["vaccines", "newPatients", "wellness", "book"],
    external: ["avmaVaccines", "cdcRabies", "cdcHealthyPets"]
  },
  {
    slug: "puppy-vaccines-in-northern-kentucky-a-practical-schedule-for-new-dog-owners",
    title: "Puppy Vaccines in Northern Kentucky: A Practical Schedule for New Dog Owners",
    excerpt: "What new puppy owners should know about vaccine boosters, parasite prevention, socialization timing, and first-year visits.",
    seoTitle: "Puppy Vaccines in Northern Kentucky",
    seoDescription: "A practical puppy vaccine guide for Northern Kentucky owners, including boosters, rabies, lifestyle vaccines, and first visits.",
    focusKeyword: "puppy vaccines Northern Kentucky",
    secondaryKeywords: ["puppy shots", "dog vaccine schedule", "new puppy vet"],
    tags: ["puppies", "vaccines", "new pets"],
    opening: "Puppy vaccine schedules can feel like a lot at first, but each visit has a purpose. Boosters build protection while your puppy grows and begins exploring the world.",
    whyHeading: "The schedule protects during a vulnerable window",
    why: "Puppies are still developing immunity and can be exposed to infectious disease before their vaccine series is complete. Timing matters.",
    keyPoints: ["Core vaccines and rabies are discussed for most puppies.", "Lifestyle vaccines may depend on boarding, grooming, daycare, dog parks, travel, wildlife, and local risk.", "Puppy visits also cover deworming, fecal testing, heartworm prevention, flea/tick prevention, nutrition, and training questions."],
    table: {
      title: "Puppy vaccine planning",
      headers: ["Visit focus", "Why it matters", "Owner task"],
      rows: [["Early boosters", "Begin building protection.", "Bring breeder/rescue records."], ["Lifestyle review", "Matches vaccines to real exposure.", "Discuss daycare, boarding, parks, travel."], ["Final puppy boosters", "Completes the first series.", "Schedule adult wellness reminders."]]
    },
    watchHeading: "Call before a vaccine visit if",
    watchIntro: "Illness can affect vaccine timing.",
    watchItems: ["Your puppy has vomiting, diarrhea, coughing, sneezing, or poor appetite.", "There was exposure to a sick dog or unknown-vaccine dog.", "You see lethargy, weakness, pale gums, or trouble breathing."],
    callout: { tone: "tip", title: "Socialization still matters", body: "Ask your veterinarian how to balance safe socialization with disease prevention before the vaccine series is complete." },
    visitHeading: "What to bring",
    visit: "Records, stool samples, and honest lifestyle details help shape the plan.",
    homeHeading: "Between puppy visits",
    home: "The weeks between boosters are important for prevention and training.",
    homeItems: ["Avoid high-risk dog areas until your veterinarian says it is safe.", "Start parasite prevention as directed.", "Keep a shared family calendar for boosters and medication doses."],
    faqTitle: "Puppy vaccine FAQ",
    faqs: [{ question: "Can my puppy go to daycare before vaccines are complete?", answer: "Ask your veterinarian and the facility. Risk depends on age, vaccine status, outbreak concerns, and facility policies." }, { question: "Why bring a stool sample?", answer: "Puppies commonly carry intestinal parasites, and fecal testing helps target treatment." }],
    internal: ["vaccines", "newPatients", "wellness", "book"],
    external: ["avmaVaccines", "capc", "cdcHealthyPets"]
  },
  {
    slug: "how-often-should-pets-see-the-vet-a-fort-thomas-and-independence-guide",
    title: "How Often Should Pets See the Vet? A Fort Thomas and Independence Guide",
    excerpt: "A local guide to wellness visit timing for puppies, kittens, adult pets, senior pets, and pets with chronic health needs.",
    seoTitle: "How Often Should Pets See the Vet?",
    seoDescription: "Learn how often dogs and cats should see a veterinarian in Fort Thomas, Independence, and Northern Kentucky.",
    focusKeyword: "how often should pets see the vet",
    secondaryKeywords: ["annual pet exam", "senior pet checkup", "Fort Thomas vet"],
    tags: ["wellness", "checkups", "local care"],
    opening: "Most healthy adult pets should see a veterinarian at least once a year, but that is only the starting point. Age, lifestyle, medications, chronic disease, and symptoms can change the schedule.",
    whyHeading: "Frequency should match risk",
    why: "A puppy, indoor adult cat, diabetic senior dog, and itchy young dog do not need the same calendar. The right schedule is the one that catches problems early and keeps prevention current.",
    keyPoints: ["Puppies and kittens need a series of early visits.", "Healthy adults often need annual wellness exams.", "Senior pets and pets with chronic conditions may need visits every six months or more often."],
    table: {
      title: "General visit timing",
      headers: ["Pet stage", "Typical timing", "Why"],
      rows: [["Puppy/kitten", "Multiple visits in the first months.", "Vaccines, growth, parasites, behavior."], ["Healthy adult", "Often yearly.", "Exam, vaccines, prevention, dental and weight review."], ["Senior/chronic condition", "Often twice yearly or customized.", "Monitor trends and adjust care."]]
    },
    watchHeading: "Do not wait for the routine visit when",
    watchIntro: "Symptoms change the timing.",
    watchItems: ["Your pet is vomiting, coughing, limping, itchy, painful, or not eating.", "You notice weight, thirst, urination, stool, breathing, or behavior changes.", "Medication is not working or side effects appear."],
    callout: { tone: "vet-note", title: "A normal exam is valuable", body: "Finding that your pet is healthy creates a baseline for future comparison." },
    visitHeading: "What routine exams help catch",
    visit: "Wellness visits can uncover dental disease, weight changes, heart murmurs, lumps, pain, parasite risk, and early senior changes.",
    homeHeading: "Make the schedule easy",
    home: "A little organization keeps care from becoming reactive.",
    homeItems: ["Book the next wellness visit before reminders expire.", "Keep vaccine and medication records together.", "Call between visits when something changes."],
    faqTitle: "Visit frequency FAQ",
    faqs: [{ question: "Does my young healthy pet really need a yearly exam?", answer: "Yes. Yearly exams keep prevention current and establish baselines before problems are obvious." }, { question: "Why do senior pets need more visits?", answer: "Older pets can change faster, and earlier monitoring may improve comfort and treatment options." }],
    internal: ["wellness", "fortThomas", "independence", "book"],
    external: ["avmaPetOwners", "avmaSenior", "aahaLifeStage"]
  },
  {
    slug: "preventive-veterinary-care-in-northern-kentucky-what-dog-and-cat-owners-should-know",
    title: "Preventive Veterinary Care in Northern Kentucky: What Dog and Cat Owners Should Know",
    excerpt: "What preventive care includes beyond vaccines: exams, parasite prevention, dental health, nutrition, lab work, and lifestyle planning.",
    seoTitle: "Preventive Veterinary Care in Northern Kentucky",
    seoDescription: "Learn what preventive veterinary care includes for dogs and cats in Northern Kentucky, from exams and vaccines to dental care.",
    focusKeyword: "preventive veterinary care Northern Kentucky",
    secondaryKeywords: ["pet wellness care", "dog preventive care", "cat preventive care"],
    tags: ["preventive care", "wellness", "vaccines"],
    opening: "Preventive care is the routine work that helps pets stay comfortable and catches problems before they become harder to treat. It is not just a vaccine appointment.",
    whyHeading: "Prevention is a full picture",
    why: "A good preventive plan connects the exam, vaccines, parasite prevention, dental care, nutrition, behavior, lifestyle, and age-related screening.",
    keyPoints: ["The physical exam is the foundation of prevention.", "Vaccine plans should reflect law, lifestyle, age, and risk.", "Dental disease, weight changes, and parasites are common preventive-care topics."],
    table: {
      title: "Preventive care pieces",
      headers: ["Care piece", "Purpose", "When to revisit"],
      rows: [["Wellness exam", "Find changes early.", "At least yearly for many adult pets."], ["Vaccines", "Reduce infectious disease risk.", "When due dates or lifestyle changes."], ["Parasite prevention", "Protect pets and households.", "Year-round or as recommended."]]
    },
    watchHeading: "When prevention should become problem care",
    watchIntro: "Preventive visits are for pets acting well. Symptoms need a different plan.",
    watchItems: ["Vomiting, diarrhea, coughing, limping, itching, or ear pain.", "Weight loss, appetite change, increased thirst, or urinary changes.", "Behavior change, hiding, pain, or sudden low energy."],
    callout: { tone: "tip", title: "Bring lifestyle details", body: "Boarding, daycare, dog parks, travel, hunting, hiking, other pets, and wildlife exposure all affect preventive recommendations." },
    visitHeading: "What to review every year",
    visit: "Annual conversations keep the plan current as your pet and household change.",
    homeHeading: "Between preventive visits",
    home: "The home routine is where prevention succeeds or fails.",
    homeItems: ["Give preventives on schedule.", "Watch weight, teeth, skin, ears, and bathroom habits.", "Keep records and reminders in one place."],
    faqTitle: "Preventive care FAQ",
    faqs: [{ question: "Is preventive care only for young pets?", answer: "No. Senior pets often need more prevention and monitoring, not less." }, { question: "Can vaccines be customized?", answer: "Your veterinarian can explain core vaccines, lifestyle vaccines, due dates, and medical considerations." }],
    internal: ["wellness", "vaccines", "dental", "book"],
    external: ["avmaVaccines", "avmaDental", "capc"]
  },
  {
    slug: "kitten-vaccines-northern-kentucky",
    title: "Kitten Vaccines in Northern Kentucky: A Simple First-Year Guide",
    excerpt: "A concise first-year checklist for kitten vaccines, boosters, parasite testing, and record keeping.",
    seoTitle: "Kitten Vaccines: First-Year Guide",
    seoDescription: "A simple first-year kitten vaccine guide for Northern Kentucky cat owners, including boosters, rabies, and parasite testing.",
    focusKeyword: "kitten vaccines Northern Kentucky",
    secondaryKeywords: ["kitten vaccine checklist", "first kitten vet visit", "cat boosters"],
    tags: ["kittens", "vaccines", "checklist"],
    opening: "Your kitten's first year moves quickly. Vaccine boosters, parasite checks, nutrition questions, and spay/neuter planning often happen within a short window.",
    whyHeading: "A checklist keeps the series on track",
    why: "Kitten protection depends on timing. Missing a booster can mean the series needs adjustment.",
    keyPoints: ["Save every vaccine record and due date.", "Ask which vaccines are core and which depend on lifestyle.", "Schedule boosters before leaving the clinic whenever possible."],
    table: {
      title: "First-year kitten checklist",
      headers: ["Need", "Why", "Owner reminder"],
      rows: [["Vaccine boosters", "Build protection over time.", "Book the next date early."], ["Fecal testing", "Finds common parasites.", "Bring a fresh sample."], ["Rabies certificate", "Important legal and health record.", "Keep a digital copy."]]
    },
    watchHeading: "Pause and call if your kitten seems sick",
    watchIntro: "Healthy kittens handle preventive visits better.",
    watchItems: ["Poor appetite, vomiting, diarrhea, or low energy.", "Sneezing, eye discharge, coughing, or fever signs.", "Fleas, ear debris, pot belly, or poor growth."],
    callout: { tone: "next-step", title: "Use this as a living checklist", body: "Each kitten's plan may change with age, records, and lifestyle. Let the veterinarian tailor the dates." },
    visitHeading: "Questions for each kitten visit",
    visit: "Each appointment is a chance to check growth and reset the plan.",
    homeHeading: "Protecting your kitten at home",
    home: "Between visits, reduce exposure and build healthy habits.",
    homeItems: ["Keep your kitten indoors and away from unknown sick cats.", "Use recommended parasite prevention.", "Make carrier practice part of normal life."],
    faqTitle: "First-year kitten FAQ",
    faqs: [{ question: "Is this the same as the longer kitten vaccine article?", answer: "This page is the quick checklist version. The longer guide explains more of the why behind each vaccine conversation." }, { question: "What if I do not know my kitten's vaccine history?", answer: "Bring any paperwork you have. Your veterinarian can help rebuild a safe schedule." }],
    internal: ["vaccines", "newPatients", "book", "contact"],
    external: ["avmaVaccines", "cdcHealthyPets"]
  },
  {
    slug: "how-often-should-dog-cat-see-vet",
    title: "How Often Should a Dog or Cat See the Vet?",
    excerpt: "A simple age-based guide to dog and cat checkups, from first-year visits through adult and senior care.",
    seoTitle: "How Often Should Dogs and Cats See a Vet?",
    seoDescription: "A simple guide to how often dogs and cats should see a veterinarian based on age, health, and symptoms.",
    focusKeyword: "how often should dog cat see vet",
    secondaryKeywords: ["dog checkup schedule", "cat checkup schedule", "annual vet exam"],
    tags: ["checkups", "wellness", "dog care", "cat care"],
    opening: "A good rule is simple: healthy adult dogs and cats usually need at least yearly veterinary care, while young, senior, sick, or medically managed pets often need more.",
    whyHeading: "Age changes the schedule",
    why: "The first year is about growth and protection. Adult years are about prevention and baselines. Senior years are about comfort, trend tracking, and early disease detection.",
    keyPoints: ["Puppies and kittens need repeated visits for vaccines, parasites, and growth checks.", "Adults benefit from routine exams even when they seem healthy.", "Seniors may need twice-yearly exams or customized monitoring."],
    table: {
      title: "Simple checkup guide",
      headers: ["Pet", "Typical schedule", "Adjust when"],
      rows: [["Puppy/kitten", "Multiple first-year visits.", "Records are missing or symptoms appear."], ["Adult dog/cat", "At least yearly for many pets.", "Lifestyle, vaccines, or health changes."], ["Senior pet", "Often every 6 months.", "Chronic disease or medications are involved."]]
    },
    watchHeading: "Symptoms change the answer",
    watchIntro: "Do not wait for a routine exam if something is wrong.",
    watchItems: ["Not eating, vomiting, diarrhea, coughing, limping, or itching.", "Weight change, bathroom change, behavior change, or pain.", "Medication concerns or chronic disease flare-ups."],
    callout: { tone: "tip", title: "Put reminders in two places", body: "Use the clinic reminder and your own calendar so vaccines, rechecks, and prevention do not slip." },
    visitHeading: "What yearly visits accomplish",
    visit: "Routine exams catch trends and keep the veterinarian familiar with your pet's normal.",
    homeHeading: "What owners can monitor",
    home: "Between visits, you see the daily details.",
    homeItems: ["Watch appetite, weight, thirst, urination, stool, skin, ears, teeth, and mobility.", "Keep medication and prevention schedules visible.", "Call if your pet's normal changes."],
    faqTitle: "Checkup frequency FAQ",
    faqs: [{ question: "Is once a year enough for every pet?", answer: "No. It is a common baseline for healthy adults, but seniors and pets with medical issues often need more." }, { question: "Should indoor cats still go yearly?", answer: "Yes. Indoor cats can develop dental disease, weight problems, arthritis, urinary disease, and other issues that exams can catch." }],
    internal: ["wellness", "sick", "book", "contact"],
    external: ["avmaPetOwners", "avmaSenior"]
  },
  {
    slug: "our-new-website-is-live",
    title: "Our New Website Is Live",
    excerpt: "A quick note about the refreshed Veterinary Medical Centers website and how it helps Fort Thomas and Independence pet owners find care.",
    seoTitle: "Veterinary Medical Centers New Website",
    seoDescription: "Veterinary Medical Centers has launched a refreshed website for Fort Thomas and Independence pet owners.",
    focusKeyword: "Veterinary Medical Centers website",
    secondaryKeywords: ["Fort Thomas veterinary clinic", "Independence veterinary clinic", "locally owned vet"],
    tags: ["clinic news", "local care", "website"],
    category: "Clinic News",
    resourceType: "clinic-news",
    opening: "Veterinary Medical Centers has a refreshed website built to make everyday pet care easier for our Fort Thomas, Independence, and Northern Kentucky neighbors.",
    whyHeading: "What changed",
    why: "The new site is designed around the questions pet owners ask most often: where to go, how to book, what services are available, and how to prepare for visits.",
    keyPoints: ["Clear location pages for Fort Thomas and Independence.", "Easier access to appointment requests and new patient information.", "A growing resource library for practical dog and cat care questions."],
    table: {
      title: "Helpful places to start",
      headers: ["Need", "Where to go", "Why"],
      rows: [["Book care", "Appointment page", "Start the scheduling process."], ["Find a clinic", "Location pages", "See address, phone, parking, and local details."], ["Prepare as a new client", "New patient page", "Review forms and what to bring."]]
    },
    watchHeading: "Built for local pet owners",
    watchIntro: "The site is not meant to replace a conversation with the care team. It is meant to make the next step easier.",
    watchItems: ["Find the clinic closest to your routine.", "Read about common services before you call.", "Use resource articles to prepare better questions for your visit."],
    callout: { tone: "tip", title: "Resources will keep growing", body: "We will continue adding practical articles for dog and cat owners in Northern Kentucky." },
    visitHeading: "How to use the site before a visit",
    visit: "A little preparation makes appointments smoother.",
    visitSteps: ["Review the service or resource page related to your concern.", "Gather records, medication names, and diet details.", "Use the appointment or contact page to reach the team."],
    homeHeading: "Thanks for finding us here",
    home: "Veterinary Medical Centers is locally owned and proud to care for pets across Northern Kentucky.",
    homeItems: ["Fort Thomas families can use the Fort Thomas location page.", "Independence families can use the Independence location page.", "New clients can start with the new patient resources."],
    faqTitle: "Website FAQ",
    faqs: [{ question: "Can I use the website in an emergency?", answer: "No. If your pet may be having an emergency, call a veterinary hospital or seek urgent care right away." }, { question: "Will the resource library replace veterinary advice?", answer: "No. Articles are general education and should be paired with guidance from the veterinary team." }],
    internal: ["book", "newPatients", "fortThomas", "independence"],
    external: ["avmaPetOwners"]
  }
];

const configured = new Map(topics.map((topic) => [topic.slug, topic]));

const posts = await client.fetch(
  `*[_type == "post" && defined(slug.current)]{
    _id,
    title,
    "slug": slug.current
  }`
);

const targets = posts.filter((post) => !skippedSlugs.has(post.slug));
const missing = targets.filter((post) => !configured.has(post.slug));
if (missing.length) {
  console.error("Missing rewrite config for:");
  for (const post of missing) console.error(`- ${post.slug} (${post.title})`);
  process.exit(1);
}

for (const post of targets) {
  const topic = configured.get(post.slug);
  const patch = buildPatch(topic);
  await client
    .patch(post._id)
    .set(patch)
    .unset(["bodyMarkdown", "bodyMarkdownFile", "faqMarkdown", "sourcesMarkdown"])
    .commit({ autoGenerateArrayKeys: true });
  console.log(`Updated ${post.slug}`);
}

console.log(`Updated ${targets.length} resource articles. Skipped ${skippedSlugs.size}.`);
