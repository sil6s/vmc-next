import type { CityIcon } from "./cityLandings";

export type ClinicPage = {
  slug: "vet-in-fort-thomas-ky" | "vet-in-independence-ky";
  town: string;
  siteId: "fort-thomas" | "independence";
  seo: { title: string; description: string };
  hero: { title: string; emphasis: string; body: string };
  welcome: { eyebrow: string; title: string; emphasis: string; paragraphs: string[]; image: string; imageAlt: string };
  story: { eyebrow: string; title: string; emphasis: string; paragraphs: string[]; highlights: string[]; quote: string };
  visit: { parking: string; directions: string[]; landmarks: string };
  /** Optional landmark guide. Paragraph strings support **bold**. */
  findUs?: { title: string; emphasis: string; intro: string; landmarks: { name: string; note: string }[] };
  why: { title: string; emphasis: string; intro: string; cards: { icon: CityIcon; title: string; text: string }[] };
  team: { title: string; emphasis: string; intro: string };
  community: { title: string; emphasis: string; intro: string };
  faqs: { question: string; answer: string }[];
};

export const clinicPages: ClinicPage[] = [
  {
    slug: "vet-in-fort-thomas-ky",
    town: "Fort Thomas",
    siteId: "fort-thomas",
    seo: {
      title: "Vet in Fort Thomas, KY | Locally Owned Dog & Cat Care | VMC",
      description:
        "Your neighborhood vet in Fort Thomas, KY. Veterinary Medical Center of Fort Thomas on Memorial Parkway offers locally owned, relationship-first care for dogs and cats."
    },
    hero: {
      title: "Your neighborhood vet in Fort Thomas,",
      emphasis: "right on Memorial Parkway.",
      body: "Dr. Kristi Baker lives in Fort Thomas, and so does this clinic's heart. We get to know you and your pet by name, and we stay in your corner long after the visit."
    },
    welcome: {
      eyebrow: "Welcome to our Fort Thomas home",
      title: "A Fort Thomas vet",
      emphasis: "that feels like family.",
      paragraphs: [
        "Fort Thomas is the kind of town where neighbors wave from the porch, kids bike to school, and **dogs know every stop on their walk**. We wanted our clinic to feel the same way: **familiar, friendly, and close to home**.",
        "**Veterinary Medical Center of Fort Thomas** sits on **Memorial Parkway**, just down the road from Highlands High School, Tower Park, and Riggs Park. Whether you live near the Midway District or out toward Highland Heights, we're a quick drive from your front door, with **free parking right at ours**.",
        "We're **independently owned** by Dr. Kristi Baker, who lives right here in Fort Thomas. That means the people caring for your pet are **the same people making the decisions**, not a corporate office in another state.",
        "If you're looking for a **vet in Fort Thomas** who will remember your dog's quirks, your cat's history, and your name, **you're in the right place**."
      ],
      image: "/images/fort-thomas-town.webp",
      imageAlt: "Fort Thomas, Kentucky neighborhood near Veterinary Medical Center of Fort Thomas"
    },
    story: {
      eyebrow: "Meet our owner",
      title: "Dr. Kristi Baker isn't just your Fort Thomas vet.",
      emphasis: "She's your neighbor.",
      paragraphs: [
        "Dr. Baker lives right here in Fort Thomas with her husband and two kids, who attend Fort Thomas City Schools. She grew up in Campbell County, studied biology at Northern Kentucky University, and has spent more than 20 years caring for Northern Kentucky pets.",
        "That stake in the community shapes how she practices. She listens before she recommends, explains things in plain language, and treats your pet the way she'd want her own family's pets treated."
      ],
      highlights: [
        "Lives in Fort Thomas with her family",
        "20+ years in general and emergency veterinary medicine",
        "Owner of an independent practice, not a corporate chain",
        "Long-term relationships with Fort Thomas families"
      ],
      quote: "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us."
    },
    visit: {
      parking: "Free on-site parking right at the door.",
      directions: [
        "From anywhere in Fort Thomas: head to Memorial Parkway. We're at number 2000, near Highlands High School and Tower Park.",
        "From Cincinnati: take I-471 South across the river to Fort Thomas, about 10 minutes from downtown.",
        "From Highland Heights, Cold Spring, or Alexandria: take US-27 (Alexandria Pike) north toward Fort Thomas."
      ],
      landmarks: "Near Highlands High School, Tower Park, and Riggs Memorial Park"
    },
    findUs: {
      title: "How to find us",
      emphasis: "in Fort Thomas.",
      intro: "If you know Fort Thomas, you already know where we are. Look for our clinic on **Memorial Parkway**, close to these local landmarks.",
      landmarks: [
        { name: "Highlands High School", note: "Just down Memorial Parkway from the home of the Bluebirds." },
        { name: "Tower Park", note: "A favorite dog-walking spot, a short drive from our door." },
        { name: "Riggs Park", note: "Nearby green space many of our patients know well." },
        { name: "Johnson Elementary", note: "One of the Fort Thomas neighborhood schools close by." },
        { name: "The Fort Thomas water reservoir", note: "A familiar local landmark in our part of town." }
      ]
    },
    why: {
      title: "Why Fort Thomas families",
      emphasis: "choose us.",
      intro: "Here's what makes us the Fort Thomas vet local families trust with their pets.",
      cards: [
        { icon: "home", title: "Truly local", text: "Owned by a Fort Thomas resident. Decisions are made here, not at a corporate office." },
        { icon: "users", title: "Familiar faces", text: "The same team sees your pet, so small changes are easier to catch early." },
        { icon: "parking", title: "Easy to visit", text: "Free on-site parking, right on Memorial Parkway." },
        { icon: "stethoscope", title: "Full-service care", text: "Wellness, dental, surgery, diagnostics, and sick visits under one roof." },
        { icon: "cat", title: "Cat-savvy team", text: "Dr. Valeria Dib-Vázquez brings a special interest in feline medicine to Fort Thomas." },
        { icon: "heart", title: "Gentle, calm visits", text: "Fear Free–minded handling and plain-language answers for every family." }
      ]
    },
    team: {
      title: "The people caring for",
      emphasis: "Fort Thomas pets.",
      intro: "Our Fort Thomas vet team includes Dr. Baker and Dr. Valeria Dib-Vázquez, who brings feline-focused care and speaks English and Spanish."
    },
    community: {
      title: "Proud to be your vet in Fort Thomas",
      emphasis: "and all of Campbell County.",
      intro: "Families visit our Fort Thomas clinic from across Northern Kentucky and Cincinnati. Find your town below."
    },
    faqs: [
      { question: "Where is your vet in Fort Thomas, KY located?", answer: "Veterinary Medical Center of Fort Thomas is at 2000 Memorial Parkway, Fort Thomas, KY 41075, near Highlands High School and Tower Park." },
      { question: "What are your Fort Thomas hours?", answer: "We're open Monday through Friday, 8:00 AM to 6:00 PM, with rotating Saturday hours (please call ahead). We're closed Sunday." },
      { question: "Is your Fort Thomas vet accepting new patients?", answer: "Yes. New dogs and cats are always welcome. Book online any time or call (859) 442-4420." },
      { question: "Which veterinarians see patients in Fort Thomas?", answer: "Dr. Kristi Baker, our owner, and Dr. Valeria Dib-Vázquez, who has a special interest in feline medicine, both care for patients at our Fort Thomas clinic." },
      { question: "Is there parking at the Fort Thomas clinic?", answer: "Yes. We have a free on-site parking lot right at the door." },
      { question: "Is Veterinary Medical Center of Fort Thomas locally owned?", answer: "Yes. We're independently owned by Dr. Kristi Baker, who lives in Fort Thomas. There's no corporate parent company." },
      { question: "What should I do in an emergency?", answer: "Call us during business hours if your pet is sick. For after-hours emergencies, contact a 24/7 emergency hospital such as MedVet Cincinnati right away." }
    ]
  },
  {
    slug: "vet-in-independence-ky",
    town: "Independence",
    siteId: "independence",
    seo: {
      title: "Vet in Independence, KY | Locally Owned Dog & Cat Care | VMC",
      description:
        "Your hometown vet in Independence, KY. Veterinary Medical Center of Independence on Madison Pike has offered locally owned, personal care for dogs and cats since 2008."
    },
    hero: {
      title: "Your hometown vet in Independence,",
      emphasis: "where it all began.",
      body: "Our Independence clinic on Madison Pike is where Dr. Kristi Baker's practice took root. More than 15 years later, it's still built on the same idea: know every pet, and every family, by name."
    },
    welcome: {
      eyebrow: "Welcome to our Independence home",
      title: "An Independence vet",
      emphasis: "with deep Kenton County roots.",
      paragraphs: [
        "Independence has grown a lot over the years, but it hasn't lost its **hometown heart**. Neither have we. Dr. Baker has cared for local dogs and cats at our **Madison Pike** clinic since **2008**.",
        "We welcome pets from **Independence, Taylor Mill, Ryland Heights, Covington, Edgewood, Erlanger,** and across Kenton and Boone counties, with **free on-site parking** and a calm, small-practice feel.",
        "We're **independently owned**, so you'll see **familiar faces**, get **clear, honest answers**, and never feel rushed. If you're looking for a **vet in Independence** who treats your pet like one of their own, **come say hello**."
      ],
      image: "/images/indepedence-town.webp",
      imageAlt: "Independence, Kentucky community near Veterinary Medical Center of Independence"
    },
    story: {
      eyebrow: "Where Veterinary Medical Centers began",
      title: "Our first clinic,",
      emphasis: "and still our foundation.",
      paragraphs: [
        "Dr. Kristi Baker joined the Independence clinic in 2008, and it became the foundation of everything Veterinary Medical Centers is today. She grew up in Northern Kentucky, and building a practice here was a commitment to the community that raised her.",
        "That first clinic set the tone: relationship-based care, honest communication, and the belief that families deserve a veterinarian they can trust for years, not a rotating schedule of strangers. Independence still carries that founding spirit."
      ],
      highlights: [
        "Caring for Independence pets since 2008",
        "The clinic that shaped our relationship-first approach",
        "Independently owned by a Northern Kentucky native",
        "Serving families across Kenton and Boone counties"
      ],
      quote: "Better care starts with listening carefully, explaining clearly, and knowing the pet and family in front of us."
    },
    visit: {
      parking: "Free on-site parking right outside.",
      directions: [
        "From anywhere in Independence: we're at 4147 Madison Pike (KY-17).",
        "From Covington: Madison Avenue becomes Madison Pike. Follow it south to our clinic.",
        "From Taylor Mill, Edgewood, Erlanger, and Florence: a short drive across central Kenton County."
      ],
      landmarks: "On Madison Pike (KY-17) in Independence"
    },
    why: {
      title: "Why Independence families",
      emphasis: "keep coming back.",
      intro: "Here's what makes us the Independence vet that Kenton County families trust with their pets.",
      cards: [
        { icon: "home", title: "Hometown roots", text: "Dr. Baker has cared for Independence pets here since 2008." },
        { icon: "users", title: "Continuity of care", text: "Familiar doctors and staff who know your pet's whole story." },
        { icon: "navigation", title: "Easy Madison Pike access", text: "A straight drive for Independence, Covington, and Taylor Mill families." },
        { icon: "stethoscope", title: "Full-service medicine", text: "Wellness, vaccines, dental, surgery, diagnostics, and sick visits." },
        { icon: "handshake", title: "Honest recommendations", text: "We explain what's urgent, what's preventive, and what can wait." },
        { icon: "paw", title: "Every life stage", text: "Puppies, kittens, adults, and seniors, all welcome." }
      ]
    },
    team: {
      title: "The people caring for",
      emphasis: "Independence pets.",
      intro: "Our Independence vet team is led by Dr. Kristi Baker, who has cared for pets at this clinic since 2008."
    },
    community: {
      title: "Proud to be your vet in Independence",
      emphasis: "and across Kenton and Boone counties.",
      intro: "Families visit our Independence clinic from all over Northern Kentucky. Find your town below."
    },
    faqs: [
      { question: "Where is your vet in Independence, KY located?", answer: "Veterinary Medical Center of Independence is at 4147 Madison Pike, Independence, KY 41051." },
      { question: "What are your Independence hours?", answer: "We're open Monday through Friday, 8:00 AM to 6:00 PM, and closed Saturday and Sunday." },
      { question: "Is your Independence vet accepting new patients?", answer: "Yes. New dogs and cats are always welcome. Book online any time or call (859) 356-2242." },
      { question: "How long has the Independence clinic been open?", answer: "Dr. Kristi Baker has cared for pets at our Independence clinic since 2008. It's the foundation of Veterinary Medical Centers." },
      { question: "Is there parking at the Independence clinic?", answer: "Yes. We have free on-site parking right outside." },
      { question: "Is Veterinary Medical Center of Independence locally owned?", answer: "Yes. We're independently owned by Dr. Kristi Baker, a Northern Kentucky native. There's no corporate parent company." },
      { question: "What should I do in an emergency?", answer: "Call us during business hours if your pet is sick. For after-hours emergencies, contact a 24/7 emergency hospital such as MedVet Cincinnati right away." }
    ]
  }
];

export function getClinicPage(slug: string) {
  return clinicPages.find((page) => page.slug === slug);
}
