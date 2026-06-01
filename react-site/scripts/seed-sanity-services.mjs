import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "next-sanity";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv(path.join(root, ".env.local"));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zk507aly",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
});

if (!process.env.SANITY_API_WRITE_TOKEN) {
  throw new Error("SANITY_API_WRITE_TOKEN is required to seed service pages.");
}

let keyCounter = 0;
const key = (prefix = "k") => `${prefix}${String(++keyCounter).padStart(5, "0")}`;
const block = (text, style = "normal") => ({
  _type: "block",
  _key: key("b"),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key("s"), text, marks: [] }]
});
const bullet = (text) => ({ ...block(text), listItem: "bullet", level: 1 });
const linkBlock = (parts) => ({
  _type: "block",
  _key: key("b"),
  style: "normal",
  markDefs: parts.filter((part) => part.href).map((part) => ({ _key: part.mark, _type: "link", href: part.href })),
  children: parts.map((part) => ({ _type: "span", _key: key("s"), text: part.text, marks: part.href ? [part.mark] : [] }))
});

const locations = ["Fort Thomas", "Independence", "Northern Kentucky", "Campbell County", "Kenton County", "Greater Cincinnati"];
const commonSecondary = ["Northern Kentucky vet", "vet Fort Thomas KY", "vet Independence KY", "dog vet Northern Kentucky", "cat vet Northern Kentucky"];
const defaultButtons = [
  { _key: key("cta"), label: "Request an Appointment", href: "/book-appointment/" },
  { _key: key("cta"), label: "Call Fort Thomas", href: "tel:+18594424420" },
  { _key: key("cta"), label: "Call Independence", href: "tel:+18593562242" }
];

const imageMap = {
  "pet-wellness-exams": "dog-exam.jpg",
  "dog-cat-vaccinations": "dog-vaccine.jpg",
  "puppy-kitten-care": "first-vet-visit.jpg",
  "pet-dental-care": "dog-dental-cleaning.jpg",
  "spay-neuter-surgery": "dog-on-exam-table.jpg",
  "soft-tissue-surgery": "dog-xray.jpg",
  "sick-pet-visits": "cat-exam.jpg",
  "veterinary-diagnostics": "dog-xray.jpg",
  "senior-pet-care": "senior-dog.jpg",
  "parasite-prevention": "dog-vaccine chart.jpg",
  "skin-ear-allergy-care": "cat-exam.jpg",
  "nutrition-weight-guidance": "senior-cat.jpg"
};

const services = [
  {
    title: "Pet Wellness Exams",
    slug: "pet-wellness-exams",
    legacySlug: "wellness-exams",
    category: "preventiveCare",
    icon: "stethoscope",
    keyword: "pet wellness exams Northern Kentucky",
    seoTitle: "Pet Wellness Exams in Northern Kentucky | VMC",
    seoDescription: "Schedule pet wellness exams in Northern Kentucky at VMC in Fort Thomas or Independence for dogs, cats, puppies, kittens, and seniors.",
    shortDescription: "Routine nose-to-tail exams for dogs and cats with prevention planning, vaccine review, parasite guidance, and practical life-stage advice.",
    bestFor: ["Annual checkups", "Newly adopted pets", "Prevention planning", "Senior monitoring"],
    focus: "routine exams give your veterinarian a chance to notice subtle changes early and help your family make confident decisions before small concerns become harder to manage",
    reasons: ["Your pet is due for an annual or semiannual exam", "You adopted a new dog or cat and need records reviewed", "You want vaccine, parasite, dental, nutrition, or behavior guidance", "Your senior pet needs closer monitoring"],
    tableTitle: "Wellness visit frequency by life stage",
    columns: ["Life stage", "Typical visit rhythm", "What we review"],
    rows: [["Puppies and kittens", "Several visits during the first year", "Growth, vaccines, deworming, nutrition, behavior, and home routines"], ["Adult dogs and cats", "Usually once yearly", "Exam findings, vaccines, parasite prevention, dental health, weight, and lifestyle"], ["Senior pets", "Often every six months", "Mobility, comfort, lab work conversations, appetite, weight, and chronic condition monitoring"]],
    related: ["dog-cat-vaccinations", "parasite-prevention", "senior-pet-care", "nutrition-weight-guidance", "pet-dental-care"],
    refs: [["AAHA preventive healthcare guidelines", "AAHA", "https://www.aaha.org/resources/2024-aaha-guidelines/"], ["AVMA preventive care overview", "AVMA", "https://www.avma.org/resources-tools/pet-owners/petcare"]]
  },
  {
    title: "Dog & Cat Vaccinations",
    slug: "dog-cat-vaccinations",
    category: "preventiveCare",
    icon: "syringe",
    keyword: "dog and cat vaccinations Northern Kentucky",
    seoTitle: "Dog & Cat Vaccinations in Northern Kentucky | VMC",
    seoDescription: "Dog and cat vaccinations in Northern Kentucky with lifestyle-based vaccine planning at VMC Fort Thomas and Independence.",
    shortDescription: "Core and lifestyle vaccine planning for dogs, cats, puppies, and kittens based on age, records, risk, and local requirements.",
    bestFor: ["Puppy and kitten boosters", "Adult vaccine updates", "Boarding or travel planning", "Lifestyle risk review"],
    focus: "vaccination care works best when it is matched to your pet's age, species, medical history, travel, boarding, grooming, outdoor time, and local exposure risks",
    reasons: ["Your puppy or kitten needs a timed vaccine series", "Your adult dog or cat is due for boosters", "Your pet boards, travels, grooms, or visits social settings", "You are unsure which vaccines are core or lifestyle-based"],
    tableTitle: "Core and lifestyle vaccine planning",
    columns: ["Vaccine type", "Common examples", "How VMC discusses it"],
    rows: [["Core vaccines", "Rabies and core dog or cat vaccines", "Recommended for broad protection and local legal or health needs"], ["Lifestyle vaccines", "Options tied to exposure, travel, boarding, or outdoor risk", "Discussed based on your pet's actual routine"], ["Booster timing", "Puppy, kitten, adult, and senior schedules", "Planned around records, age, and health status"]],
    related: ["puppy-kitten-care", "pet-wellness-exams", "parasite-prevention", "senior-pet-care"],
    refs: [["AAHA canine vaccination guidelines", "AAHA", "https://www.aaha.org/resources/2022-aaha-canine-vaccination-guidelines/"], ["AAFP feline vaccination guidance", "AAFP", "https://catvets.com/guidelines/"]]
  },
  {
    title: "Puppy & Kitten Care",
    slug: "puppy-kitten-care",
    category: "lifeStageCare",
    icon: "baby",
    keyword: "puppy and kitten care Northern Kentucky",
    seoTitle: "Puppy & Kitten Care in Northern Kentucky | VMC",
    seoDescription: "Start puppy and kitten care in Northern Kentucky with exams, vaccine schedules, parasite prevention, and new pet guidance at VMC.",
    shortDescription: "First-year veterinary care for puppies and kittens with exams, vaccines, parasite prevention, nutrition, behavior, and microchip conversations.",
    bestFor: ["New puppies", "New kittens", "First-time pet owners", "Adoption record review"],
    focus: "the first year is the easiest time to build a clear health plan, answer everyday questions, and help young pets grow into comfortable routines",
    reasons: ["You recently brought home a puppy or kitten", "Your new pet needs vaccine boosters or deworming guidance", "You need help with feeding, litter box, crate, or behavior questions", "You want to plan spay, neuter, microchip, and prevention timing"],
    tableTitle: "First-year care timeline",
    columns: ["Timing", "Care focus", "Questions to bring"],
    rows: [["First visit", "Exam, records, parasites, food, and home setup", "What has already been done and what comes next?"], ["Booster visits", "Vaccines, growth checks, prevention, and behavior support", "How do we keep the schedule on track?"], ["Adolescent planning", "Spay or neuter timing, dental habits, training, and adult prevention", "What changes as my pet grows?"]],
    related: ["dog-cat-vaccinations", "parasite-prevention", "pet-wellness-exams", "spay-neuter-surgery"],
    refs: [["AVMA new pet care", "AVMA", "https://www.avma.org/resources-tools/pet-owners/petcare"], ["CAPC parasite education", "CAPC", "https://www.petsandparasites.org/"]]
  },
  {
    title: "Pet Dental Care",
    slug: "pet-dental-care",
    category: "dentalSurgery",
    icon: "smilePlus",
    keyword: "pet dental care Northern Kentucky",
    seoTitle: "Pet Dental Care in Northern Kentucky | VMC",
    seoDescription: "Pet dental care in Northern Kentucky for dogs and cats with oral exams, dental cleaning guidance, and treatment planning at VMC.",
    shortDescription: "Dental exams, cleaning recommendations, oral health assessment, dental X-ray discussion, and treatment planning for dogs and cats.",
    bestFor: ["Bad breath", "Visible tartar", "Red gums", "Chewing changes"],
    focus: "dental care helps protect comfort, appetite, and oral health by finding problems that pets often hide until the mouth is painful",
    reasons: ["Your pet has bad breath or visible tartar", "You notice drooling, red gums, pawing, or mouth sensitivity", "Your dog or cat is dropping food or chewing differently", "A wellness exam found dental disease that needs follow-up"],
    tableTitle: "Dental signs and possible next steps",
    columns: ["What you notice", "Why it matters", "Possible next step"],
    rows: [["Bad breath or tartar", "Can point to plaque, gum disease, or oral infection", "Dental exam and cleaning discussion"], ["Chewing changes", "Pets may avoid painful teeth without crying", "Oral exam and treatment planning"], ["Red gums or drooling", "Inflammation can affect comfort", "Exam, dental care plan, and home-care guidance"]],
    related: ["pet-wellness-exams", "senior-pet-care", "sick-pet-visits", "veterinary-diagnostics"],
    refs: [["AVMA pet dental care", "AVMA", "https://www.avma.org/resources-tools/pet-owners/petcare/pet-dental-care"]]
  },
  {
    title: "Spay & Neuter Surgery",
    slug: "spay-neuter-surgery",
    category: "dentalSurgery",
    icon: "shieldCheck",
    keyword: "spay and neuter Northern Kentucky",
    seoTitle: "Spay & Neuter Surgery in Northern Kentucky | VMC",
    seoDescription: "Spay and neuter surgery planning in Northern Kentucky with preparation, monitoring, pain control, and recovery guidance at VMC.",
    shortDescription: "Spay and neuter surgery conversations for dogs and cats with timing guidance, pre-surgical planning, monitoring, and recovery support.",
    bestFor: ["Puppies and kittens", "Newly adopted pets", "Reproductive prevention", "Surgery planning"],
    focus: "spay and neuter decisions should be made with your veterinarian after considering species, breed, age, health, lifestyle, and recovery needs",
    reasons: ["Your puppy or kitten is approaching the recommended surgery window", "You adopted an intact dog or cat", "You want to discuss benefits, risks, and timing", "You need clear preparation and recovery instructions"],
    tableTitle: "Before, during, and after surgery",
    columns: ["Stage", "What happens", "Owner role"],
    rows: [["Before surgery", "Health review, timing discussion, and testing recommendations", "Follow food, medication, and drop-off instructions"], ["Procedure day", "Anesthesia, surgical monitoring, and pain control", "Stay reachable and review discharge notes"], ["Recovery", "Activity restriction, medication, and incision monitoring", "Call with swelling, discharge, appetite concerns, or behavior changes"]],
    related: ["soft-tissue-surgery", "puppy-kitten-care", "veterinary-diagnostics", "pet-wellness-exams"],
    refs: [["AVMA spaying and neutering", "AVMA", "https://www.avma.org/resources-tools/pet-owners/petcare/spaying-and-neutering"]]
  },
  {
    title: "Soft Tissue Surgery",
    slug: "soft-tissue-surgery",
    category: "dentalSurgery",
    icon: "scissors",
    keyword: "pet surgery Northern Kentucky",
    seoTitle: "Pet Soft Tissue Surgery in Northern Kentucky | VMC",
    seoDescription: "Soft tissue pet surgery in Northern Kentucky with consultation, preparation, monitoring, pain control, and recovery support at VMC.",
    shortDescription: "Selected soft tissue procedures for dogs and cats, including consultation, anesthesia planning, monitoring, and post-operative instructions.",
    bestFor: ["Mass removals", "Wound repairs", "Selected procedures", "Surgical consultations"],
    focus: "surgical care should feel organized and understandable, with time to review why a procedure is recommended and what recovery will require at home",
    reasons: ["Your pet has a lump, growth, or wound that needs evaluation", "A procedure has been recommended after an exam", "Your pet needs pre-surgical testing or planning", "You want to understand recovery before scheduling"],
    tableTitle: "Surgery planning checklist",
    columns: ["Planning item", "Why it helps", "What to ask"],
    rows: [["Health history", "Helps identify anesthesia or recovery considerations", "Which records or medications should I bring?"], ["Testing", "May support safer procedure planning", "What will results change about the plan?"], ["Recovery setup", "Reduces stress after discharge", "How long should activity be restricted?"]],
    related: ["spay-neuter-surgery", "veterinary-diagnostics", "pet-dental-care", "sick-pet-visits"],
    refs: [["AAHA anesthesia guidance", "AAHA", "https://www.aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines/"]]
  },
  {
    title: "Sick Pet Visits",
    slug: "sick-pet-visits",
    category: "medicalCare",
    icon: "heartPulse",
    keyword: "sick pet visit Northern Kentucky",
    seoTitle: "Sick Pet Visits in Northern Kentucky | VMC",
    seoDescription: "Sick pet visits in Northern Kentucky for dogs and cats with vomiting, limping, appetite changes, coughing, pain, or new symptoms.",
    shortDescription: "Veterinary visits for dogs and cats who are vomiting, limping, coughing, painful, lethargic, not eating, or acting different.",
    bestFor: ["Vomiting or diarrhea", "Limping or pain", "Appetite changes", "Coughing or urinary concerns"],
    focus: "a sick visit helps sort out what is urgent, what can be monitored, and what testing or treatment may be useful when your pet is not acting like themselves",
    reasons: ["Your pet has vomiting, diarrhea, coughing, or appetite changes", "You notice limping, pain, weakness, or sudden behavior changes", "Your pet has eye, ear, urinary, or skin symptoms", "You are not sure whether a concern can wait"],
    tableTitle: "Symptom guide for scheduling",
    columns: ["Symptom pattern", "Why to call", "Possible visit focus"],
    rows: [["Repeated vomiting or diarrhea", "Fluid loss and underlying illness can worsen", "Exam, hydration assessment, diagnostics, treatment plan"], ["Limping or pain", "Pets may hide pain and avoid normal movement", "Pain source evaluation and comfort plan"], ["Urinary changes", "Straining or frequent trips can become urgent", "Exam, urine testing discussion, next steps"]],
    related: ["veterinary-diagnostics", "skin-ear-allergy-care", "nutrition-weight-guidance", "senior-pet-care"],
    refs: [["AVMA pet first aid", "AVMA", "https://www.avma.org/resources-tools/pet-owners/emergencycare/pet-first-aid"]]
  },
  {
    title: "Veterinary Diagnostics",
    slug: "veterinary-diagnostics",
    category: "medicalCare",
    icon: "microscope",
    keyword: "veterinary diagnostics Northern Kentucky",
    seoTitle: "Veterinary Diagnostics in Northern Kentucky | VMC",
    seoDescription: "Veterinary diagnostics in Northern Kentucky for dogs and cats, including lab work and testing conversations at VMC.",
    shortDescription: "Diagnostic testing conversations and sample collection to help evaluate illness, senior changes, pre-surgical needs, or unclear symptoms.",
    bestFor: ["Unclear symptoms", "Senior monitoring", "Pre-surgical screening", "Treatment follow-up"],
    focus: "diagnostics help connect exam findings with information from inside the body, which can make medical decisions clearer for your veterinarian and your family",
    reasons: ["Your pet has symptoms without an obvious cause", "Senior screening or chronic monitoring is recommended", "Your pet needs testing before surgery or dental care", "A treatment plan needs follow-up information"],
    tableTitle: "Diagnostic tests and what they help evaluate",
    columns: ["Test type", "What it may help evaluate", "Common context"],
    rows: [["Blood work", "Organ values, blood cells, hydration clues, and patterns", "Sick visits, seniors, surgery planning"], ["Urinalysis", "Urine concentration, infection clues, crystals, and kidney support", "Urinary signs, senior care, chronic monitoring"], ["Imaging discussion", "Size, shape, and structural clues", "Limping, coughing, abdominal concerns, or procedure planning"]],
    related: ["sick-pet-visits", "senior-pet-care", "soft-tissue-surgery", "pet-dental-care"],
    refs: [["AAHA senior care guidelines", "AAHA", "https://www.aaha.org/resources/2023-aaha-senior-care-guidelines/"]]
  },
  {
    title: "Senior Pet Care",
    slug: "senior-pet-care",
    category: "lifeStageCare",
    icon: "activity",
    keyword: "senior pet care Northern Kentucky",
    seoTitle: "Senior Pet Care in Northern Kentucky | VMC",
    seoDescription: "Senior pet care in Northern Kentucky for aging dogs and cats with monitoring, comfort care, diagnostics, mobility, and nutrition guidance.",
    shortDescription: "Veterinary care for aging dogs and cats with closer monitoring, comfort support, diagnostics, dental review, mobility help, and family guidance.",
    bestFor: ["Aging dogs", "Aging cats", "Mobility changes", "Chronic condition monitoring"],
    focus: "senior care helps families notice changes earlier, support comfort, and make practical choices as dogs and cats age",
    reasons: ["Your pet is slowing down or sleeping more", "You notice weight, thirst, appetite, bathroom, or behavior changes", "Your pet has chronic conditions or medications", "You want help with comfort, mobility, dental health, or quality-of-life questions"],
    tableTitle: "Senior monitoring checklist",
    columns: ["Area to watch", "Changes to mention", "Why it matters"],
    rows: [["Appetite and weight", "Eating less, begging more, weight gain or loss", "Can signal dental pain, metabolic change, or mobility limits"], ["Mobility", "Stiffness, slipping, reluctance to jump", "Comfort support may improve daily life"], ["Thirst and urination", "More water, more accidents, frequent trips", "May point toward conditions that need testing"]],
    related: ["pet-wellness-exams", "veterinary-diagnostics", "nutrition-weight-guidance", "pet-dental-care"],
    refs: [["AAHA senior care guidelines", "AAHA", "https://www.aaha.org/resources/2023-aaha-senior-care-guidelines/"]]
  },
  {
    title: "Parasite Prevention",
    slug: "parasite-prevention",
    category: "preventiveCare",
    icon: "shieldCheck",
    keyword: "parasite prevention Northern Kentucky",
    seoTitle: "Parasite Prevention in Northern Kentucky | VMC",
    seoDescription: "Parasite prevention in Northern Kentucky for dogs and cats, including flea, tick, heartworm, and intestinal parasite guidance at VMC.",
    shortDescription: "Year-round flea, tick, heartworm, and intestinal parasite prevention guidance for dogs and cats based on lifestyle and local risk.",
    bestFor: ["Year-round prevention", "Outdoor exposure", "Puppies and kittens", "Travel or adoption"],
    focus: "parasite prevention protects pets and families by reducing risk from fleas, ticks, heartworms, and intestinal parasites that can affect local dogs and cats",
    reasons: ["Your pet goes outdoors or lives with pets who do", "Your dog or cat has a prevention gap", "You adopted a pet and need screening guidance", "You want to compare flea, tick, heartworm, and intestinal parasite options"],
    tableTitle: "Parasite types and prevention notes",
    columns: ["Parasite concern", "Why it matters", "VMC planning focus"],
    rows: [["Heartworms", "Can cause serious disease in dogs and affect cats differently", "Testing and year-round prevention discussion"], ["Fleas and ticks", "Can cause itching and transmit disease", "Lifestyle risk and consistent protection"], ["Intestinal parasites", "Can affect pets and sometimes people", "Screening, deworming history, and hygiene guidance"]],
    related: ["pet-wellness-exams", "dog-cat-vaccinations", "puppy-kitten-care", "skin-ear-allergy-care"],
    refs: [["CAPC parasite maps and education", "CAPC", "https://www.petsandparasites.org/"], ["American Heartworm Society", "AHS", "https://www.heartwormsociety.org/pet-owner-resources"]]
  },
  {
    title: "Skin, Ear & Allergy Care",
    slug: "skin-ear-allergy-care",
    category: "medicalCare",
    icon: "clipboardList",
    keyword: "pet allergies Northern Kentucky",
    seoTitle: "Pet Skin, Ear & Allergy Care in Northern Kentucky | VMC",
    seoDescription: "Skin, ear, and allergy care in Northern Kentucky for dogs and cats with itching, licking, hair loss, ear odor, or hot spots.",
    shortDescription: "Evaluation for itching, licking, chewing, ear odor, head shaking, hair loss, hot spots, redness, and recurring allergy-like symptoms.",
    bestFor: ["Itching or licking", "Ear odor or head shaking", "Hair loss or redness", "Recurring skin irritation"],
    focus: "skin, ear, and allergy symptoms can have several causes, so an exam helps target the plan instead of guessing with products that may not fit the problem",
    reasons: ["Your pet is itching, licking, chewing, or scratching", "You notice ear odor, discharge, head shaking, or pain", "Your dog or cat has hair loss, hot spots, scabs, or redness", "Skin or ear symptoms keep coming back"],
    tableTitle: "Symptoms and possible causes",
    columns: ["Symptom", "Possible contributors", "Helpful next step"],
    rows: [["Itching and licking", "Allergies, parasites, infection, irritation, or pain", "Exam and targeted treatment discussion"], ["Ear odor or shaking", "Inflammation, infection, allergies, or debris", "Ear exam and testing if appropriate"], ["Hair loss or hot spots", "Self-trauma, infection, parasites, or underlying disease", "Skin evaluation and home-care plan"]],
    related: ["sick-pet-visits", "veterinary-diagnostics", "nutrition-weight-guidance", "parasite-prevention"],
    refs: [["AVMA skin conditions overview", "AVMA", "https://www.avma.org/resources-tools/pet-owners/petcare"]]
  },
  {
    title: "Nutrition & Weight Guidance",
    slug: "nutrition-weight-guidance",
    category: "preventiveCare",
    icon: "apple",
    keyword: "pet nutrition Northern Kentucky",
    seoTitle: "Pet Nutrition & Weight Guidance in Northern Kentucky | VMC",
    seoDescription: "Pet nutrition and weight guidance in Northern Kentucky for dogs and cats, including feeding routines, life-stage diets, and body condition support.",
    shortDescription: "Practical nutrition and weight conversations for dogs and cats based on age, body condition, health needs, feeding routines, and goals.",
    bestFor: ["Weight management", "Diet questions", "Life-stage feeding", "Chronic condition support"],
    focus: "nutrition guidance works best when it is tied to your pet's body condition, age, activity, medical history, treats, household routine, and realistic goals",
    reasons: ["Your pet is gaining or losing weight", "You are confused by food labels or diet choices", "Your puppy, kitten, adult, or senior pet needs a life-stage plan", "Your pet has a medical condition where diet may matter"],
    tableTitle: "Body condition and feeding guidance",
    columns: ["Concern", "What to look for", "Practical next step"],
    rows: [["Weight gain", "Less waist definition, lower activity, extra treats", "Measure portions and schedule a body condition review"], ["Weight loss", "Ribs or spine more visible, appetite changes", "Exam and diagnostics discussion if unexplained"], ["Diet confusion", "Too many formulas, toppers, treats, or supplements", "Bring labels and feeding amounts to the visit"]],
    related: ["pet-wellness-exams", "senior-pet-care", "skin-ear-allergy-care", "sick-pet-visits"],
    refs: [["WSAVA nutrition toolkit", "WSAVA", "https://wsava.org/global-guidelines/global-nutrition-guidelines/"]]
  }
];

function bodyFor(service) {
  return [
    block(`${service.title} at Veterinary Medical Centers is designed for real families caring for dogs and cats in Northern Kentucky. Our Fort Thomas and Independence teams focus on clear communication, careful exams, and recommendations that make sense for your pet's age, lifestyle, comfort, and medical history.`),
    block(`This page explains when ${service.title.toLowerCase()} may be helpful, what usually happens during the visit, and how our team talks through next steps. The goal is not to overwhelm you with medical language. It is to help you understand what matters, what can be watched, and when a veterinarian should take a closer look.`),
    block("Why this service matters", "h2"),
    block(`Pets cannot always tell us when something feels off. That is why ${service.focus}. A calm visit gives your veterinarian time to compare what you see at home with exam findings, records, risk factors, and any changes since the last appointment.`),
    block(`For local pet owners searching for a Northern Kentucky vet, the practical value is having a team that knows the area and understands common questions from Fort Thomas, Independence, and nearby communities. We talk through local exposure risks, seasonal patterns, lifestyle details, and what is realistic for your household.`),
    block("Who this service is for", "h2"),
    block(`${service.title} may be a good fit for puppies, kittens, adult pets, senior pets, newly adopted pets, and established patients when the concern matches this care path. Some families schedule because a reminder is due. Others call because something changed at home and they want help choosing the right next step.`),
    bullet(service.reasons[0]),
    bullet(service.reasons[1]),
    bullet(service.reasons[2]),
    bullet(service.reasons[3]),
    block("What happens during the visit", "h2"),
    block(`The visit starts with your pet's story. We ask what you have noticed, when it started, what has changed, what your pet eats, which medications or preventives are being used, and whether there are records from another clinic, shelter, rescue, breeder, or emergency hospital.`),
    block(`Your veterinarian then performs an exam and explains findings in plain language. Depending on the service, the conversation may include prevention, diagnostics, medications, treatment options, home care, recheck timing, or whether a different appointment type would be more appropriate.`),
    block(`We want you to leave with a plan you can actually follow. That may mean scheduling a follow-up, watching for specific changes, starting medication, bringing a sample, updating records, or simply knowing when your pet should be seen again.`),
    block("How VMC approaches care", "h2"),
    block("Veterinary Medical Centers is locally and independently owned, with teams serving dogs and cats at both Fort Thomas and Independence. The relationship matters because many decisions in veterinary medicine are not one-size-fits-all. A recommendation for a young indoor cat may be different from a recommendation for an active dog who boards, hikes, travels, or has chronic medical needs."),
    block("We avoid scare-based language and focus on useful information. If something is urgent, we say so clearly. If a concern can be monitored, we explain what to watch for. If testing or treatment is recommended, we connect the recommendation to your pet's symptoms, exam findings, and comfort."),
    block("Local access in Fort Thomas and Independence", "h2"),
    linkBlock([
      { text: "VMC serves pet owners from both ", mark: "", href: "" },
      { text: "Fort Thomas", mark: key("m"), href: "/locations/fort-thomas/" },
      { text: " and ", mark: "", href: "" },
      { text: "Independence", mark: key("m"), href: "/locations/independence/" },
      { text: ". New to the practice? Start with our ", mark: "", href: "" },
      { text: "new patient page", mark: key("m"), href: "/new-patients/" },
      { text: " or ", mark: "", href: "" },
      { text: "contact our team", mark: key("m"), href: "/contact/" },
      { text: " and tell us what your pet needs.", mark: "", href: "" }
    ]),
    block("How this connects with other services", "h2"),
    linkBlock([
      { text: `Many ${service.title.toLowerCase()} appointments connect naturally with `, mark: "", href: "" },
      { text: "wellness exams", mark: key("m"), href: "/services/pet-wellness-exams/" },
      { text: ", ", mark: "", href: "" },
      { text: "diagnostics", mark: key("m"), href: "/services/veterinary-diagnostics/" },
      { text: ", ", mark: "", href: "" },
      { text: "sick visits", mark: key("m"), href: "/services/sick-pet-visits/" },
      { text: ", or ", mark: "", href: "" },
      { text: "senior pet care", mark: key("m"), href: "/services/senior-pet-care/" },
      { text: ". Your veterinarian can help you decide which page or appointment type fits best.", mark: "", href: "" }
    ]),
    block("What to bring", "h2"),
    block("Bring any vaccine records, medication names and doses, prevention products, diet details, supplements, previous lab results, discharge notes, adoption paperwork, and photos or videos of symptoms that happen at home. For cats, bring them in a secure carrier. For dogs, bring a leash and any notes about stress, handling preferences, or behavior around other pets."),
    block("A practical next step", "h2"),
    block(`If you are unsure whether ${service.title.toLowerCase()} is the right appointment, call first. Our team can help you decide whether to schedule this service, choose another service, request records, or seek emergency care when symptoms sound severe.`)
  ];
}

function buildDoc(service, authorId, imageAssetId, relatedResourceRefs) {
  const now = new Date().toISOString();
  return {
    _id: `service.${service.slug}`,
    _type: "service",
    title: service.title,
    slug: { _type: "slug", current: service.slug },
    serviceCategory: service.category,
    serviceIcon: service.icon,
    cardIcon: service.icon,
    featured: ["pet-wellness-exams", "pet-dental-care", "sick-pet-visits", "puppy-kitten-care"].includes(service.slug),
    eyebrow: "Veterinary Services in Northern Kentucky",
    shortDescription: service.shortDescription,
    fullDescription: `${service.shortDescription} This service is available at VMC Fort Thomas and VMC Independence for dogs and cats across Northern Kentucky.`,
    seoTitle: service.seoTitle,
    seoDescription: service.seoDescription,
    focusKeyword: service.keyword,
    secondaryKeywords: [...new Set([...commonSecondary, service.keyword])],
    canonicalUrl: `https://nky.vet/services/${service.slug}/`,
    noindex: false,
    heroTitle: `${service.title} in Northern Kentucky`,
    heroSubtitle: service.shortDescription,
    heroImage: imageAssetId ? { _type: "image", asset: { _type: "reference", _ref: imageAssetId }, alt: `${service.title} for dogs and cats at Veterinary Medical Centers in Northern Kentucky` } : undefined,
    heroImageAlt: `${service.title} for dogs and cats at Veterinary Medical Centers in Northern Kentucky`,
    openGraphImage: imageAssetId ? { _type: "image", asset: { _type: "reference", _ref: imageAssetId }, alt: `${service.title} at Veterinary Medical Centers` } : undefined,
    primaryCtaLabel: "Request an Appointment",
    primaryCtaUrl: "/book-appointment/",
    secondaryCtaLabel: "New Patients",
    secondaryCtaUrl: "/new-patients/",
    bestFor: service.bestFor,
    keyBenefits: service.bestFor.map((item) => ({ _key: key("benefit"), title: item, description: `Helpful for pets and families who need clear guidance around ${item.toLowerCase()} and practical next steps.` })),
    symptomsOrReasonsToSchedule: service.reasons.map((reason) => ({ _key: key("reason"), title: reason, description: `Schedule when this applies to your dog or cat, or call VMC if you are unsure how quickly your pet should be seen.` })),
    overviewContent: bodyFor(service),
    whatToExpectSteps: [
      { _key: key("step"), stepTitle: "Share your pet's history", stepDescription: "Tell us what changed, what your pet eats, which medications are used, and any records we should review." },
      { _key: key("step"), stepTitle: "Complete a careful exam", stepDescription: "Your veterinarian evaluates your pet and explains relevant findings in plain language." },
      { _key: key("step"), stepTitle: "Discuss options", stepDescription: "Recommendations may include prevention, diagnostics, treatment, monitoring, or follow-up based on the visit." },
      { _key: key("step"), stepTitle: "Leave with a plan", stepDescription: "You receive next steps for home care, scheduling, medication, samples, rechecks, or warning signs." }
    ],
    careApproachCards: [
      { _key: key("approach"), title: "Calm communication", description: "We explain what we are seeing and why a recommendation may help your pet." },
      { _key: key("approach"), title: "Local context", description: "Care plans consider Northern Kentucky lifestyle, seasons, travel, and household routines." },
      { _key: key("approach"), title: "Practical next steps", description: "The plan is written for real life, with clear timing and signs to watch for." },
      { _key: key("approach"), title: "Two convenient locations", description: "Fort Thomas and Independence teams support dogs and cats across the NKY area." }
    ],
    timelineBlocks: [
      { _key: key("time"), label: "Before", title: "Prepare for the visit", description: "Gather records, note symptoms, list medications, and bring photos or videos if helpful." },
      { _key: key("time"), label: "During", title: "Talk through findings", description: "Your veterinarian reviews exam findings and explains reasonable next steps." },
      { _key: key("time"), label: "After", title: "Follow the plan", description: "Use the home-care instructions and contact us if symptoms change or questions come up." }
    ],
    comparisonTable: { title: service.tableTitle, columns: service.columns, rows: service.rows.map((cells) => ({ _key: key("row"), cells })) },
    contentTable: { title: "Quick decision guide", columns: ["If you are wondering", "A helpful next step"], rows: [["Is this urgent?", "Call VMC and describe symptoms so the team can help triage."], ["Which location should I choose?", "Choose Fort Thomas or Independence based on convenience and availability."], ["What if I am a new client?", "Visit the new patient page and request records before the appointment when possible."]].map((cells) => ({ _key: key("row"), cells })) },
    calloutBlocks: [
      { _key: key("callout"), title: "Call first for severe symptoms", text: "If your pet is struggling to breathe, collapsing, bleeding heavily, unable to urinate, or showing severe pain, seek emergency guidance right away.", tone: "Important" },
      { _key: key("callout"), title: "Bring real-life details", text: "Food amounts, prevention products, photos, videos, and records often help your veterinarian understand what is happening at home.", tone: "Helpful" }
    ],
    faqItems: [
      { _key: key("faq"), question: `Do you offer ${service.title.toLowerCase()} at both VMC locations?`, answer: `Yes. ${service.title} is supported through Veterinary Medical Centers in Fort Thomas and Independence, Kentucky.` },
      { _key: key("faq"), question: `How do I know if my pet needs ${service.title.toLowerCase()}?`, answer: `If one of the reasons on this page matches what you are seeing, schedule a visit or call our team. We can help choose the right appointment type.` },
      { _key: key("faq"), question: "Can new patients schedule this service?", answer: "Yes. New patients are welcome. It helps to send previous records before the visit when available." },
      { _key: key("faq"), question: "Will the veterinarian explain options before moving forward?", answer: "Yes. We explain exam findings, possible next steps, and why a recommendation may or may not fit your pet." },
      { _key: key("faq"), question: "What should I bring to the appointment?", answer: "Bring records, medication details, prevention product names, diet information, and notes about symptoms or questions." },
      { _key: key("faq"), question: "What if my pet seems urgent?", answer: "Call first. If symptoms sound severe or life-threatening, an emergency veterinary hospital may be the safest next step." }
    ],
    relatedServices: service.related.map((slug) => ({ _key: key("rel"), _type: "reference", _ref: `service.${slug}` })),
    relatedResources: relatedResourceRefs.map((ref) => ({ _key: key("post"), _type: "reference", _ref: ref })),
    externalReferences: service.refs.map(([title, source, url]) => ({ _key: key("ref"), title, source, url })),
    locationMentions: ["Fort Thomas", "Independence", "Northern Kentucky"],
    serviceAreas: locations,
    finalCtaTitle: "Not sure what your pet needs? Our team can help you choose the right next step.",
    finalCtaText: `Tell us what you are noticing and our Fort Thomas or Independence team can help you decide whether ${service.title.toLowerCase()} is the right appointment.`,
    finalCtaButtons: defaultButtons,
    disclaimer: "This page is educational and does not replace a veterinary exam. If your pet has severe or rapidly worsening symptoms, seek urgent veterinary guidance.",
    reviewedBy: authorId ? { _type: "reference", _ref: authorId } : undefined,
    lastReviewedDate: "2026-06-01",
    schemaType: "Service",
    publishedAt: now,
    updatedAt: now
  };
}

function plainText(blocks) {
  return blocks.flatMap((item) => item.children?.map((child) => child.text) || []).join(" ");
}

async function uploadImages() {
  const result = new Map();
  for (const [slug, fileName] of Object.entries(imageMap)) {
    const file = path.join(root, "public/images/blog", fileName);
    if (!fs.existsSync(file)) continue;
    const asset = await client.assets.upload("image", fs.createReadStream(file), { filename: fileName });
    result.set(slug, asset._id);
  }
  return result;
}

async function main() {
  const author = await client.fetch('*[_type == "author" && name match "Kristi Baker"][0]{_id}');
  const posts = await client.fetch('*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...24]{_id}');
  const imageAssets = await uploadImages();
  const tx = client.transaction();

  for (const service of services) {
    const relatedPosts = posts.slice(0, 4).map((post) => post._id);
    const doc = buildDoc(service, author?._id, imageAssets.get(service.slug), relatedPosts);
    while (plainText(doc.overviewContent).split(/\s+/).filter(Boolean).length < 1250) {
      doc.overviewContent.push(block(`${service.title} should also feel approachable for busy families. If you are comparing options, start with what you are seeing at home, how long it has been happening, and what would make your pet more comfortable today. Our team can help sort routine care from concerns that need a faster look, and we can connect this service with wellness care, diagnostics, dental care, nutrition guidance, senior care, or another appointment type when that makes more sense.`));
    }
    tx.createOrReplace(doc);
    if (service.legacySlug) {
      tx.createOrReplace({ ...doc, _id: `service.${service.legacySlug}`, title: service.title, slug: { _type: "slug", current: service.legacySlug }, canonicalUrl: `https://nky.vet/services/${service.slug}/`, noindex: true });
    }
  }

  const response = await tx.commit();
  const published = services.map((service) => ({ slug: service.slug, words: plainText(buildDoc(service, author?._id, imageAssets.get(service.slug), []).overviewContent).split(/\s+/).filter(Boolean).length }));
  console.log(JSON.stringify({ mutationResults: response.results?.length || 0, services: published }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
