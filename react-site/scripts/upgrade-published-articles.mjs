import fs from "node:fs";
import { createClient } from "next-sanity";

const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const [name, ...value] = line.split("=");
      return [name, value.join("=").replace(/^["']|["']$/g, "")];
    })
);

const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is required.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zk507aly",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-10-16",
  useCdn: false,
  token
});

const kristiAuthorId = "c94970b6-2fd8-48b1-9777-526172eed426";
const today = "2026-10-16";

const articles = {
  "cat-litter-box-problems": {
    answer: "A cat that suddenly avoids the litter box is not being spiteful. Pain, urinary disease, constipation, arthritis, stress, or a litter-box setup problem can all play a role, so a new change deserves attention.",
    table: [["Straining with little or no urine", "Urgent—especially in a male cat", "Call a veterinarian or emergency hospital now."], ["Frequent small clumps, blood, crying", "Same-day veterinary guidance", "Keep the cat indoors and note litter-box output."], ["Avoiding the box but otherwise comfortable", "Schedule an exam", "Review box number, location, litter, and household stress."]],
    why: "Cats can hide pain remarkably well. Urinary obstruction is a life-threatening emergency, while arthritis, constipation, kidney disease, diabetes, and stress-related lower urinary signs can look similar at home.",
    home: ["Count normal urine clumps and take a photo if you see blood or an unusual stool.", "Offer clean water and keep a familiar box easy to reach; do not punish accidents.", "Do not give human pain medicine or leftover antibiotics."],
    call: "Seek urgent care for repeated straining, a painful or swollen belly, vomiting, collapse, or little to no urine.",
    visit: "Bring a timeline, photos, diet and medication details, and information about recent household or litter changes.",
    faq: ["Can stress cause litter-box problems?", "Yes, but medical causes should be ruled out first—especially when the change is sudden." ]
  },
  "dog-urinary-accidents": {
    answer: "A house-trained dog that starts urinating indoors may have a medical problem, a mobility issue, anxiety, or a routine change. Treat it as a health signal first, not a training failure.",
    table: [["More drinking and larger puddles", "Prompt exam", "Track water intake and when accidents happen."], ["Straining, blood, pain, or frequent tiny urinations", "Same-day guidance", "Call the clinic; a urine sample may help."], ["New accidents with stiffness or confusion", "Schedule an exam", "Note mobility, sleep, medications, and cognitive changes."]],
    why: "Urinary tract infection, bladder stones, kidney disease, diabetes, Cushing's disease, pain, and age-related changes can all change bathroom habits. A veterinarian can separate medical causes from a behavior plan.",
    home: ["Keep the normal schedule and clean accidents with an enzymatic cleaner.", "Record thirst, appetite, urine color, frequency, and any straining.", "Avoid scolding—punishment can increase stress without addressing the cause."],
    call: "Urgent evaluation is needed for inability to urinate, repeated straining, severe pain, vomiting, or weakness.",
    visit: "Bring medication names and, if requested, a fresh urine sample collected in a clean container.",
    faq: ["Is this always a urinary tract infection?", "No. Many medical and behavioral conditions can cause accidents, which is why testing matters." ]
  },
  "ear-infections-dogs-cats": {
    answer: "Ear odor, head shaking, scratching, redness, or discharge can signal an ear infection—but the right treatment depends on what is in the ear and whether the eardrum is intact.",
    table: [["Mild odor or occasional scratching", "Book an exam soon", "Avoid putting drops or cleaners in before advice."], ["Pain, swelling, discharge, or persistent head shaking", "Prompt appointment", "Keep the ear dry and prevent scratching."], ["Head tilt, loss of balance, severe pain", "Urgent evaluation", "Do not attempt home cleaning."]],
    why: "Yeast, bacteria, ear mites, allergies, moisture, foreign material, and narrow ear canals can all contribute. Treating by appearance alone can prolong the problem or make it worse.",
    home: ["Use only products your veterinarian has recommended for that pet.", "Keep swimming and bathing water out of irritated ears.", "Finish prescribed medication exactly as directed and attend rechecks."],
    call: "Seek prompt care if your pet cries when the ear is touched, has a head tilt, loses balance, or develops facial swelling.",
    visit: "Tell the team about swimming, allergies, previous infections, and every product already used.",
    faq: ["Can I use leftover ear drops?", "No. Different ear problems need different medicines, and some products are unsafe when the eardrum is damaged." ]
  },
  "first-vet-visit-puppy-kitten": {
    answer: "The first puppy or kitten visit is a whole-health appointment: a physical exam, vaccine and parasite plan, records review, and time to build routines that make the first year easier.",
    table: [["Bring", "Why it matters", "Helpful detail"], ["Adoption or breeder records", "Avoids duplicate or missed vaccines", "Include dates and product names."], ["Fresh stool sample if requested", "Checks for intestinal parasites", "Use a clean container and label it."], ["Food and medication details", "Supports safe recommendations", "Photos of labels are perfect."]],
    why: "Young pets may arrive with incomplete records, parasites, diet changes, or early behavior questions. An exam establishes a baseline before small issues become more complicated.",
    home: ["Write down questions about feeding, litter or crate training, socialization, and behavior.", "Use a secure carrier for cats and a leash or carrier for dogs.", "Call before the appointment if your new pet is vomiting, not eating, unusually quiet, or having trouble breathing."],
    call: "Young puppies and kittens can decline quickly; persistent vomiting, diarrhea, poor appetite, weakness, pale gums, or breathing trouble needs timely guidance.",
    visit: "Expect a nose-to-tail exam and a discussion of vaccine timing, parasite prevention, nutrition, microchipping, and spay/neuter planning.",
    faq: ["Should I wait until all vaccines are due?", "No. Schedule promptly after bringing home a new pet, especially when records are incomplete." ]
  },
  "flea-tick-prevention-northern-kentucky": {
    answer: "Fleas and ticks are more than a warm-weather nuisance in Northern Kentucky. A veterinarian can match year-round prevention and testing to your pet's lifestyle, age, and other medications.",
    table: [["Pet lifestyle", "Risk to discuss", "Useful prevention conversation"], ["Indoor-only cat", "Fleas can enter on people or other pets", "Species-safe, veterinarian-recommended prevention."], ["Dog that hikes or visits parks", "Ticks and wildlife exposure", "Tick control plus regular checks."], ["Multi-pet household", "Rapid flea spread", "Treat every pet on a coordinated plan."]],
    why: "Products differ by species, age, weight, medical history, and which parasites they cover. Never assume a dog product is safe for a cat.",
    home: ["Use the product exactly on schedule and record the dose date.", "Check dogs after outdoor time, especially around ears, toes, neck, and groin.", "Wash pet bedding and vacuum if fleas are found, while treating every household pet as advised."],
    call: "Call promptly for weakness, pale gums, heavy flea infestation in a young pet, or a reaction after a product is applied.",
    visit: "Bring the package or a photo of any prevention product so the team can confirm active ingredients and timing.",
    faq: ["Can I use a dog flea product on my cat?", "No. Some dog products can be dangerous or fatal to cats." ]
  },
  "healthy-weight-dogs-cats": {
    answer: "Healthy weight is about body condition, muscle, activity, and trends—not one number on a scale. Small, consistent changes are safer and more sustainable than a crash diet.",
    table: [["At home", "What to notice", "Next step"], ["Ribs", "Easy to feel with light pressure", "Ask the team to demonstrate body-condition scoring."], ["Waist", "Visible from above in most pets", "Track monthly photos from the same angle."], ["Routine", "Treats, portions, activity", "Measure food and include everyone who feeds the pet."]],
    why: "Extra weight can worsen mobility, breathing, heat tolerance, and chronic disease. Unintended weight loss can also be a medical clue.",
    home: ["Measure meals instead of estimating and use a written treat budget.", "Choose gentle, species-appropriate activity; cats often prefer short play sessions.", "Weigh pets consistently if your veterinarian recommends home tracking."],
    call: "Contact the clinic for rapid weight loss, poor appetite, vomiting, increased thirst, weakness, or breathing difficulty.",
    visit: "Ask for a target body-condition score, a calorie plan, and a realistic recheck schedule.",
    faq: ["Should I switch foods immediately?", "Not without a plan. The safest diet choice and portion depend on your pet's health, age, and current food." ]
  },
  "heartworm-prevention-northern-kentucky": {
    answer: "Mosquitoes transmit heartworm, so prevention is a year-round conversation for dogs and cats. Prevention is far safer and simpler than treating established disease.",
    table: [["Pet", "Key prevention point", "What to ask"], ["Dog", "Year-round prevention and regular testing", "Which test schedule and product fit my dog?"], ["Cat", "Cats can be affected even indoors", "Which preventive is safe for my cat?"], ["Newly adopted pet", "History may be incomplete", "Does testing need to happen before starting or restarting?" ]],
    why: "Dogs and cats experience heartworm disease differently, and no at-home sign can prove a pet is protected. Missed doses and uncertain histories deserve a veterinary conversation.",
    home: ["Set a recurring reminder and keep product boxes or a medication log.", "Do not double-dose after a missed dose without veterinary guidance.", "Ask before changing products or splitting products between pets."],
    call: "Coughing, exercise intolerance, collapse, or breathing trouble should be assessed promptly; these signs have many possible causes.",
    visit: "Bring your prevention history, travel history, and any records from a previous clinic or shelter.",
    faq: ["Do indoor cats need prevention?", "Mosquitoes can get indoors, so cats deserve an individualized prevention discussion." ]
  },
  "how-often-should-dogs-cats-see-vet": {
    answer: "Most healthy adult dogs and cats benefit from a wellness exam at least yearly. Puppies, kittens, senior pets, and pets with ongoing conditions often need a more frequent plan.",
    table: [["Life stage", "Typical planning question", "Why visits matter"], ["Puppy or kitten", "When are boosters and growth checks due?", "Early prevention and development change quickly."], ["Healthy adult", "What is due this year?", "Exams can catch changes that are easy to miss at home."], ["Senior or chronic-care pet", "How often should we recheck?", "Medication, mobility, weight, and lab trends may change sooner."]],
    why: "Wellness visits are not only for vaccines. They create a baseline for teeth, weight, skin, mobility, behavior, parasite risk, and laboratory screening when appropriate.",
    home: ["Keep a simple record of appetite, thirst, bathroom habits, activity, and medications.", "Bring questions and photos or short videos of intermittent symptoms.", "Schedule sooner for a new change instead of waiting for the annual visit."],
    call: "Trouble breathing, collapse, severe pain, repeated vomiting, inability to urinate, or other emergency signs should not wait for a wellness visit.",
    visit: "Ask what preventive care is due now and what changes would justify an earlier appointment.",
    faq: ["Do indoor cats still need annual care?", "Yes. Indoor cats can have dental disease, arthritis, weight changes, urinary disease, and other quiet problems." ]
  },
  "itchy-skin-dogs-cats": {
    answer: "Itching is a symptom, not a diagnosis. Fleas, allergies, infection, parasites, contact irritation, and ear disease can look alike but need different treatment.",
    table: [["What you see", "Possible concern", "Helpful next move"], ["Flea dirt or sudden intense itch", "Flea exposure", "Call about species-safe parasite control."], ["Red, moist, smelly, or painful skin", "Secondary infection", "Book promptly; avoid home creams."], ["Face rubbing, ear scratching, recurring paws", "Allergy or ear disease", "Track season, diet changes, and sites affected."]],
    why: "Scratching can damage the skin barrier, allowing infection to develop. The quickest path to relief is identifying the trigger rather than rotating through over-the-counter products.",
    home: ["Prevent licking or chewing when possible with veterinarian-approved protection.", "Take clear photos before bathing or applying a product.", "Use only shampoos, wipes, and medications recommended for your pet."],
    call: "Seek prompt care for facial swelling, hives, breathing changes, open wounds, severe pain, or a pet that cannot rest.",
    visit: "Bring a timeline, diet and treat list, parasite products, and photos of flare-ups.",
    faq: ["Can I give an over-the-counter allergy medicine?", "Ask first—dose, safety, and usefulness vary by pet and the underlying cause." ]
  },
  "kitten-vaccines-northern-kentucky": {
    answer: "Most kittens need a series of veterinary visits beginning around 6–8 weeks and repeating every 3–4 weeks until at least 16 weeks of age. The exact schedule depends on health, records, vaccine type, lifestyle, and Kentucky rabies requirements.",
    table: [["Age range", "Common discussion", "Why it matters"], ["6–8 weeks", "First FVRCP visit when appropriate", "Starts protection against key feline viral diseases."], ["Every 3–4 weeks through 16–20 weeks", "FVRCP boosters", "Maternal antibodies can interfere with earlier doses."], ["8 weeks and older", "FeLV series and lifestyle assessment", "Young cats are more susceptible; testing is discussed first."], ["As required by law/product", "Rabies vaccine", "Protects cats, people, and the community."]],
    why: "Kittens are not fully protected after one injection. A series gives the immune system repeated opportunities to respond as maternal antibodies fade.",
    home: ["Keep each vaccine certificate and write down the next due date before leaving.", "Use controlled, lower-risk socialization rather than crowded cat settings while protection is developing.", "Call before a vaccine appointment if your kitten is sick, not eating, or has diarrhea."],
    call: "Prompt care is needed for difficulty breathing, repeated vomiting, marked lethargy, pale gums, or dehydration in a kitten.",
    visit: "Ask about FVRCP, rabies, FeLV, parasite testing, spay/neuter timing, nutrition, microchipping, and carrier training.",
    faq: ["Does an indoor kitten need vaccines?", "Yes. Indoor status lowers some exposures but does not remove every risk; the plan should be individualized." ]
  },
  "microchipping-dogs-cats": {
    answer: "A microchip is a permanent ID, not a GPS tracker. It works only when the chip is registered with current contact information and scanned by the person who finds your pet.",
    table: [["Step", "What to do", "Common miss"], ["Implant", "Have a veterinarian place and scan the chip", "Assuming the chip activates itself."], ["Register", "Complete the registry promptly", "Leaving shelter or old-owner information."], ["Update", "Review after moves or phone changes", "Forgetting secondary contacts." ]],
    why: "Collars can come off; a microchip gives a shelter or clinic another way to identify a found pet. It is especially useful for cats, newly adopted pets, and dogs who may slip a leash.",
    home: ["Keep a collar tag and microchip together—one does not replace the other.", "Save the registry name and chip number in your phone.", "Ask the clinic to scan the chip at wellness visits."],
    call: "If your pet is missing, contact local shelters and your microchip registry immediately while sharing a current photo.",
    visit: "Ask where the chip is placed, how it is scanned, and which registry holds the contact record.",
    faq: ["Can a microchip track my pet's location?", "No. It must be scanned to identify the registered owner." ]
  },
  "pet-dental-cleaning-dogs-cats": {
    answer: "Bad breath is often a sign to look closer, not just a cosmetic problem. Dental disease below the gumline can be painful even when a pet keeps eating.",
    table: [["What you notice", "What it may mean", "Best next step"], ["Bad breath or tartar", "Plaque and gum disease", "Schedule an oral-health exam."], ["Drooling, dropping food, pawing at face", "Oral pain or a damaged tooth", "Prompt appointment."], ["Facial swelling, bleeding, not eating", "Potentially urgent dental problem", "Call the clinic the same day."]],
    why: "A visual look at home cannot show what is happening under the gumline. Veterinary dental care can include examination, imaging, cleaning, treatment, or extraction when needed.",
    home: ["Do not scrape tartar at home or force a painful mouth open.", "Ask the team to show you safe brushing and dental-product options.", "Use only pet-specific dental products; human toothpaste is not appropriate."],
    call: "Call promptly for facial swelling, bleeding, refusal to eat, severe drooling, or sudden mouth pain.",
    visit: "Bring a list of changes in eating, chewing, breath, drooling, and any past anesthesia concerns.",
    faq: ["Will a dental cleaning fix every bad breath problem?", "Not always. The exam identifies whether dental disease or another issue is contributing." ]
  },
  "pet-surgery-preparation": {
    answer: "Good surgery preparation starts before the procedure: understand fasting instructions, medications, arrival time, pickup plans, and who to call if anything changes.",
    table: [["Before surgery", "Why it matters", "Owner action"], ["Fasting instructions", "Reduces anesthesia risk", "Follow the clinic's exact food and water directions."], ["Medication review", "Some drugs need adjustment", "Confirm every prescription, supplement, and prevention product."], ["Recovery setup", "Protects the incision", "Prepare a quiet, confined space before pickup."]],
    why: "Anesthesia and procedure plans are individualized. Age, health history, medications, testing, and the type of surgery affect what your team recommends.",
    home: ["Arrange a calm ride home and someone to monitor your pet.", "Prepare an e-collar or recovery suit if directed.", "Ask questions before procedure day instead of guessing about food or medications."],
    call: "Call before arrival if your pet has vomiting, diarrhea, coughing, reduced appetite, or a medication change.",
    visit: "Confirm fasting, pre-surgical testing, pain control, activity restriction, incision checks, and recheck timing.",
    faq: ["Can my pet take normal medication the morning of surgery?", "Some can and some cannot—follow the procedure-specific instructions from your veterinarian." ]
  },
  "post-surgery-care-dogs-cats": {
    answer: "Home recovery protects the work done in surgery. Follow the discharge plan, restrict activity, prevent licking, and call early when an incision or your pet's comfort changes.",
    table: [["Expected to monitor", "Call the clinic", "Emergency care"], ["Mild sleepiness the first evening", "Increasing redness, swelling, discharge, or pain", "Trouble breathing, collapse, uncontrolled bleeding"], ["Briefly lower appetite after anesthesia", "Repeated vomiting or no appetite beyond instructions", "Pale gums or extreme weakness"], ["Small amount of bruising if discussed", "Incision opening or bad odor", "Severe distress or unmanageable pain"]],
    why: "Pets often feel better before tissue has healed. Jumping, running, stairs, rough play, and licking can reopen an incision or create infection risk.",
    home: ["Give medications exactly as labeled; do not add human or leftover medicine.", "Check the incision at the same time each day in good light.", "Use the e-collar or recovery garment continuously if directed and keep activity restricted."],
    call: "Call for a change that worries you; seek emergency care for breathing problems, collapse, heavy bleeding, or severe pain.",
    visit: "Bring the discharge instructions and ask when normal walks, baths, food, and activity can resume.",
    faq: ["Can I remove the cone while I watch my pet?", "Only if your surgical team says it is safe. A few seconds of licking can damage an incision." ]
  },
  "puppy-vaccines-northern-kentucky": {
    answer: "Puppy vaccines work as a series, not a single appointment. Most puppies begin a combination vaccine around 6–8 weeks and receive boosters every 2–4 weeks until they are at least 16 weeks old; your veterinarian sets the exact plan.",
    table: [["Age range", "Typical discussion", "Why it matters"], ["6–8 weeks", "Start DA2PP/DAPP when appropriate", "Begins protection against distemper, adenovirus, and parvovirus."], ["Every 2–4 weeks through 16+ weeks", "Combination boosters", "Maternal antibodies can block earlier doses."], ["12 weeks and older", "Leptospirosis series when indicated", "AAHA guidance treats leptospirosis as core; a two-dose start is typical."], ["As required by law/product", "Rabies vaccine", "Public-health protection and documentation."], ["Lifestyle based", "Bordetella, influenza, Lyme", "Boarding, daycare, travel, and exposure change recommendations."]],
    why: "Maternal antibodies help protect young puppies but can also interfere with vaccines. Repeating doses through the recommended age improves the chance of reliable protection.",
    home: ["Keep the written vaccine record and next appointment date together.", "Use controlled socialization with healthy, vaccinated dogs; avoid high-traffic dog areas while protection develops.", "Call before the visit if your puppy is vomiting, has diarrhea, coughs, or seems unwell."],
    call: "Urgent evaluation is needed for facial swelling, breathing difficulty, collapse, repeated vomiting, or severe weakness after vaccination or at any other time.",
    visit: "Ask about the full plan: vaccines, fecal testing, deworming, heartworm and parasite prevention, nutrition, microchipping, and behavior.",
    faq: ["Can my puppy go outside before the series is complete?", "Yes, with thoughtful low-risk choices. Ask your veterinarian which places and exposures are appropriate for your puppy." ]
  },
  "senior-pet-care-northern-kentucky": {
    answer: "Getting older is not a diagnosis. New slowing down, weight change, thirst, bathroom changes, confusion, or irritability can be signs of pain or disease that deserve a conversation.",
    table: [["Change", "What to track", "Why it helps"], ["Mobility", "Stairs, jumping, walks, getting up", "Pain can show as behavior change."], ["Daily habits", "Eating, drinking, urination, stool, sleep", "Trends help guide testing."], ["Comfort", "Hiding, grooming, interaction", "Cats and dogs may show pain quietly."]],
    why: "Senior pets may need more frequent wellness exams, bloodwork, urine testing, dental checks, medication reviews, and mobility plans tailored to their history.",
    home: ["Use rugs, ramps, night lights, and easy-access litter boxes or water bowls where useful.", "Keep a brief log of medication, appetite, mobility, and quality-of-life observations.", "Do not assume a behavior change is 'just old age.'"],
    call: "Prompt care is important for collapse, trouble breathing, sudden inability to walk, repeated vomiting, seizures, or a severe change in awareness.",
    visit: "Bring videos of movement at home and a complete list of prescriptions, supplements, and diet.",
    faq: ["How often should a senior pet be seen?", "It depends on age and health. Many benefit from more frequent monitoring than healthy younger adults." ]
  },
  "vomiting-diarrhea-dogs-cats": {
    answer: "Vomiting or diarrhea can be mild and brief, but the right next step depends on frequency, your pet's age, hydration, pain, appetite, and what may have been eaten.",
    table: [["What you see", "How urgent?", "What to do"], ["One mild episode, normal energy", "Call for guidance if it continues", "Offer only the diet and hydration advice your clinic recommends."], ["Repeated episodes, blood, pain, poor appetite", "Same-day veterinary guidance", "Save a photo or sample when practical."], ["Weakness, collapse, bloated belly, trouble breathing", "Emergency", "Seek urgent veterinary care now."]],
    why: "Dietary upset, parasites, infection, pancreatitis, obstruction, toxin exposure, and systemic disease can all cause similar signs. Puppies, kittens, seniors, and chronically ill pets can dehydrate faster.",
    home: ["Note timing, frequency, food, treats, medications, and possible toxin or foreign-object access.", "Offer water unless your veterinarian tells you otherwise; do not force-feed.", "Do not give human anti-diarrheal or pain medicine without advice."],
    call: "Seek urgent care for repeated vomiting, blood, severe pain, a swollen abdomen, weakness, collapse, or suspected toxin/foreign-body ingestion.",
    visit: "Bring a timeline, a stool sample if requested, medication list, and photos of vomit or stool if useful.",
    faq: ["Should I fast my pet?", "Ask first. Advice differs for puppies, kittens, cats, adults, and pets with medical conditions." ]
  },
  "when-to-book-sick-pet-visit": {
    answer: "A sick-pet visit is appropriate when your dog or cat has a new change in comfort, appetite, energy, breathing, bathroom habits, skin, mobility, or behavior that is not resolving quickly.",
    table: [["Concern", "Best next step", "Examples"], ["New but stable symptom", "Call to schedule a sick visit", "Limping, itch, cough, appetite or litter change."], ["Worsening or painful symptom", "Same-day guidance", "Repeated vomiting, blood, straining, significant pain."], ["Life-threatening signs", "Emergency care", "Trouble breathing, collapse, uncontrolled bleeding, inability to urinate."]],
    why: "Waiting can make a manageable problem harder to treat, while a quick call lets the team match the urgency and appointment type to what is happening.",
    home: ["Record when the change started and what makes it better or worse.", "Take short videos of coughing, limping, breathing, or unusual behavior.", "Do not use leftover prescriptions or human medication."],
    call: "If you are unsure, call. Emergency signs always outweigh the convenience of waiting for a regular appointment.",
    visit: "Bring medication names, food details, records, and relevant photos or videos.",
    faq: ["Can vaccines be given at a sick visit?", "Sometimes, but a veterinarian may postpone vaccines when illness or treatment makes that safer." ]
  },
  "why-is-my-dog-coughing": {
    answer: "A cough can come from the throat, airways, lungs, heart, irritation, infection, or even a collar-related trigger. A video and a clear history make the call to your veterinarian much more useful.",
    table: [["Cough pattern", "What to do", "Why"], ["Mild cough but normal breathing and energy", "Schedule guidance", "An exam can identify the source."], ["Cough with lethargy, fever, poor appetite, nasal discharge", "Prompt appointment", "Illness may need testing or treatment."], ["Labored breathing, blue/pale gums, collapse", "Emergency", "Breathing distress cannot wait."]],
    why: "A 'cough' can sound like gagging, reverse sneezing, retching, or choking. The sound, timing, exercise tolerance, and exposure to other dogs all matter.",
    home: ["Record a video if it is safe to do so.", "Use a harness instead of a collar if neck pressure seems to trigger it.", "Keep a coughing dog away from daycare, boarding, and other dogs until you receive guidance."],
    call: "Seek emergency care for any breathing difficulty, collapse, blue or pale gums, or suspected choking.",
    visit: "Tell the team about boarding, daycare, grooming, travel, appetite, energy, and whether the cough occurs at rest or with exercise.",
    faq: ["Is a kennel cough always mild?", "No. Many respiratory illnesses look alike, and the right urgency depends on the dog and accompanying signs." ]
  },
  "why-is-my-dog-limping": {
    answer: "Limping can range from a sore paw to a fracture, torn ligament, joint disease, infection, or neurologic problem. The safest plan depends on pain, weight-bearing, swelling, and how suddenly it started.",
    table: [["What you see", "Next step", "Avoid"], ["Mild limp, still using the leg", "Book an exam if it persists or recurs", "Long walks, fetch, and rough play."], ["Won't bear weight, obvious swelling, severe pain", "Prompt/same-day care", "Forcing the joint or giving human pain medicine."], ["Trauma, dragging limb, collapse", "Emergency care", "Delaying assessment."]],
    why: "Dogs may continue to use an injured limb despite pain. A physical exam and sometimes imaging help distinguish a paw injury from a problem higher in the leg, joint, spine, or nervous system.",
    home: ["Restrict activity and use a leash for short bathroom breaks.", "Check the paw gently for a cut, broken nail, thorn, or swelling only if your dog tolerates it.", "Record a video of the limp before it changes."],
    call: "Seek urgent care after major trauma, for a limb that cannot bear weight, a cold/swollen limb, severe pain, or dragging/weakness.",
    visit: "Bring a timeline, video, recent activity history, and medication list.",
    faq: ["Can I give ibuprofen or acetaminophen?", "No. Human pain medicines can be dangerous for dogs; call for veterinary guidance." ]
  }
};

function markdownFor(article) {
  const rows = article.table.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return `## Quick answer\n\n**${article.answer}**\n\n## At-a-glance guide\n\n| Situation | How soon? | What helps right now |\n| --- | --- | --- |\n${rows}\n\n## Why this deserves attention\n\n${article.why}\n\n## Helpful steps at home\n\n${article.home.map((item) => `- ${item}`).join("\n")}\n\n> **When to call sooner:** ${article.call}\n\n## Make the appointment more useful\n\n${article.visit}\n\n## Common question\n\n### ${article.faq[0]}\n\n${article.faq[1]}\n\n## Care in Fort Thomas and Independence\n\nVeterinary Medical Centers can help you decide what your pet needs next. [Book an appointment](/book-appointment/) or [contact our team](/contact/) for guidance tailored to your dog or cat. This article is general education and does not replace an examination or emergency care.`;
}

const posts = await client.fetch('*[_type == "post" && defined(slug.current)]{_id, "slug": slug.current}');
const missing = posts.filter((post) => !articles[post.slug]);
if (missing.length) throw new Error(`Unexpected published posts: ${missing.map((post) => post.slug).join(", ")}`);

for (const post of posts) {
  const article = articles[post.slug];
  await client.patch(post._id).set({
    author: { _type: "reference", _ref: kristiAuthorId },
    bodyMarkdown: markdownFor(article),
    contentMode: "advanced",
    updatedAt: new Date().toISOString(),
    lastReviewedAt: today
  }).commit();
  console.log(`Upgraded ${post.slug}`);
}

console.log(`Upgraded ${posts.length} published articles and assigned Dr. Kristi Baker.`);
