export type ClinicKey = "fort-thomas" | "independence";

export type CityIcon =
  | "clock" | "parking" | "trees" | "users" | "stethoscope" | "navigation" | "heart" | "home"
  | "shield" | "paw" | "sparkles" | "cat" | "calendar" | "map" | "handshake" | "smile";

type Card = { icon: CityIcon; title: string; text: string };

export type OtherClinic = { name: string; area: string; address: string };

export type CityLanding = {
  slug: string;
  city: string;
  state: "KY";
  /** First clinic is featured; Covington lists both. */
  clinics: ClinicKey[];
  driveTime: string;
  seo: { title: string; description: string };
  hero: { title: string; emphasis: string; body: string };
  strip: string;
  intro: { eyebrow: string; title: string; emphasis: string; paragraphs: string[]; image: string; imageAlt: string };
  benefits: { title: string; emphasis: string; intro: string; cards: Card[] };
  promise: { title: string; emphasis: string; lead: string; aside: string; items: Card[] };
  local: { title: string; emphasis: string; paragraphs: string[]; nearby: string[]; listTitle: string };
  otherClinicsNote: string;
  otherClinics: OtherClinic[];
  faqs: { question: string; answer: string }[];
};

// Other-clinic addresses were cross-checked against public directory listings (October 2026).
// Re-verify periodically; practices move, close, and change hands.

export const cityLandings: CityLanding[] = [
  {
    slug: "vet-near-newport-ky",
    city: "Newport",
    state: "KY",
    clinics: ["fort-thomas"],
    driveTime: "about 10 minutes",
    seo: {
      title: "Vet in Newport, KY | Locally Owned, 10 Min Away | VMC",
      description: "Looking for a vet in Newport, KY? Veterinary Medical Center of Fort Thomas is about 10 minutes away, with a locally owned team for dogs and cats."
    },
    hero: {
      title: "Looking for a vet in Newport, KY?",
      emphasis: "Your neighbors are just up the hill.",
      body: "Veterinary Medical Center of Fort Thomas is about 10 minutes from Newport, with a locally owned team that gets to know every pet by name."
    },
    strip: "~10 minutes from Newport · Locally owned · Dogs & cats",
    intro: {
      eyebrow: "A Newport vet that feels local",
      title: "Finding a vet in Newport",
      emphasis: "should feel neighborly.",
      paragraphs: [
        "Newport has everything close by: the Levee, Monmouth Street, the historic East Row. Your veterinarian should feel just as close, and just as familiar.",
        "Veterinary Medical Center of Fort Thomas sits right next door to Newport, an easy drive up the hill. We're independently owned, so the same small team sees your pet visit after visit.",
        "Whether you need a puppy's first shots, a dental cleaning, or answers about a pet who just isn't acting right, we're a Newport vet option that treats you like a neighbor, because you are one."
      ],
      image: "/images/family-pets-couch.jpg",
      imageAlt: "Newport family relaxing at home with their dog and cat"
    },
    benefits: {
      title: "Why Newport pet owners",
      emphasis: "come up the hill.",
      intro: "Here's what people searching for a vet in Newport tell us they were looking for, and what they found at our Fort Thomas clinic.",
      cards: [
        { icon: "clock", title: "About 10 minutes away", text: "A quick drive from Monmouth Street, the East Row, and the rest of Newport." },
        { icon: "users", title: "The same faces every visit", text: "A small, independent team means your pet's history stays with people who remember it." },
        { icon: "stethoscope", title: "Full-service medicine", text: "Wellness, vaccines, dental care, surgery, diagnostics, and sick visits under one roof." },
        { icon: "handshake", title: "Honest, clear answers", text: "We explain what we find and lay out your options, including what fits your budget." },
        { icon: "cat", title: "Cat-friendly care", text: "One of our vets has a special interest in feline medicine and low-stress handling." },
        { icon: "parking", title: "Easy in, easy out", text: "On-site parking and a calm lobby make drop-off and pickup simple." }
      ]
    },
    promise: {
      title: "Big-city convenience,",
      emphasis: "small-town care.",
      lead: "Newport moves fast. Your vet visit doesn't have to.",
      aside: "That's the Newport vet experience we aim for every day.",
      items: [
        { icon: "heart", title: "Time to listen", text: "We start every visit by hearing what you've noticed at home." },
        { icon: "paw", title: "A gentler visit", text: "Patient, Fear Free–minded handling for nervous dogs and cats." },
        { icon: "shield", title: "Prevention first", text: "Catching small changes early keeps Newport pets healthier, longer." },
        { icon: "calendar", title: "Easy booking", text: "Book online any time, or call and talk with a real person." }
      ]
    },
    local: {
      title: "Proud to care for",
      emphasis: "Newport's pets.",
      paragraphs: [
        "From apartments near the Levee to homes in the East Row Historic District, Newport is full of pets who deserve a vet that knows them. Our Fort Thomas clinic is close enough for routine visits and quick rechecks.",
        "If you've been searching for a vet in Newport who will still remember your dog in five years, we'd love to meet you."
      ],
      listTitle: "Communities near our Fort Thomas clinic",
      nearby: ["Newport", "Southgate", "Bellevue", "Dayton", "Wilder", "Fort Thomas"]
    },
    otherClinicsNote: "If you'd rather find a vet in Newport itself, here are a few other local options.",
    otherClinics: [
      { name: "Alexandria Pike Animal Hospital", area: "Southgate", address: "333 Bluegrass Ave, Southgate, KY 41071" },
      { name: "PetVet365 Newport", area: "Newport", address: "1779 Monmouth St, Newport, KY 41071" },
      { name: "Banfield Pet Hospital", area: "Newport Pavilion", address: "156 Pavilion Pkwy, Newport, KY 41071" }
    ],
    faqs: [
      { question: "Is there a locally owned vet in Newport, KY?", answer: "Veterinary Medical Center of Fort Thomas is an independently owned clinic about 10 minutes from Newport. We care for dogs and cats and welcome new Newport patients." },
      { question: "How far is your clinic from Newport?", answer: "Our Fort Thomas clinic at 2000 Memorial Parkway is about 10 minutes from most of Newport, depending on traffic." },
      { question: "What services do you offer Newport pet owners?", answer: "Wellness exams, vaccinations, puppy and kitten care, sick visits, dental care, spay and neuter surgery, soft tissue surgery, diagnostics, and senior pet care." },
      { question: "Are you accepting new patients from Newport?", answer: "Yes. Book online any time or call (859) 442-4420 to schedule a first visit." },
      { question: "What should I do in a pet emergency?", answer: "For after-hours emergencies, contact a 24/7 emergency hospital such as MedVet Cincinnati right away." }
    ]
  },
  {
    slug: "vet-near-bellevue-ky",
    city: "Bellevue",
    state: "KY",
    clinics: ["fort-thomas"],
    driveTime: "about 10 minutes",
    seo: {
      title: "Vet in Bellevue, KY | Independent Care Nearby | VMC",
      description: "Need a vet in Bellevue, KY? Our independently owned Fort Thomas clinic is about 10 minutes away and cares for dogs and cats at every stage of life."
    },
    hero: {
      title: "A vet in Bellevue, KY",
      emphasis: "who feels like part of the neighborhood.",
      body: "Our locally owned Fort Thomas clinic is about 10 minutes from Fairfield Avenue, with a small team that knows your pet and your family."
    },
    strip: "~10 minutes from Bellevue · Independently owned · Every life stage",
    intro: {
      eyebrow: "Bellevue's neighborhood vet",
      title: "Bellevue is a walking town.",
      emphasis: "Your vet should feel that personal.",
      paragraphs: [
        "In Bellevue, you know the shop owners on Fairfield Avenue and wave to neighbors walking their dogs by the river. That's the same kind of familiarity we bring to veterinary care.",
        "Veterinary Medical Center of Fort Thomas is a short drive from Bellevue. We're independently owned, so you'll see the same faces each visit and never feel like a number.",
        "If you've been looking for a Bellevue vet who explains things clearly and takes time with nervous pets, we'd be glad to help."
      ],
      image: "/images/vet-stock2.jpg",
      imageAlt: "Bellevue pet owner talking with a veterinarian about her small dog"
    },
    benefits: {
      title: "What Bellevue families",
      emphasis: "appreciate about us.",
      intro: "A quick drive from the river, here's why pet owners looking for a vet in Bellevue choose our Fort Thomas team.",
      cards: [
        { icon: "clock", title: "Close to home", text: "About 10 minutes from Bellevue, so routine visits fit into a busy week." },
        { icon: "home", title: "Small-practice feel", text: "No rotating strangers. You'll get to know our doctors, and they'll get to know your pet." },
        { icon: "sparkles", title: "Dental and surgery", text: "Cleanings, spays and neuters, and soft tissue surgery without a referral across town." },
        { icon: "paw", title: "Every life stage", text: "From first puppy visits to comfortable senior years, we're here for the whole story." },
        { icon: "handshake", title: "Locally owned", text: "Owned by a Northern Kentucky veterinarian, not a corporate group." },
        { icon: "calendar", title: "Simple scheduling", text: "Book online whenever it's convenient, or call to talk it through." }
      ]
    },
    promise: {
      title: "Care that fits",
      emphasis: "a river-town pace.",
      lead: "Bellevue values relationships. So do we.",
      aside: "It's the Bellevue vet relationship you've been looking for.",
      items: [
        { icon: "users", title: "Familiar faces", text: "The same team sees your pet, so nothing important gets lost." },
        { icon: "heart", title: "Patient handling", text: "We slow down for anxious pets and nervous first visits." },
        { icon: "stethoscope", title: "Clear plans", text: "You'll leave knowing what we found and what comes next." },
        { icon: "smile", title: "Real conversations", text: "Ask anything. We'd rather over-explain than leave you guessing." }
      ]
    },
    local: {
      title: "Caring for pets",
      emphasis: "from Fairfield Avenue to the riverfront.",
      paragraphs: [
        "Bellevue's dogs know every corner of the riverfront, and its cats rule plenty of historic homes. We're proud to be a nearby option for all of them.",
        "If a vet in Bellevue proper isn't the right fit, our Fort Thomas clinic is close enough to become your pet's long-term home base."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Bellevue", "Dayton", "Newport", "Southgate", "Fort Thomas"]
    },
    otherClinicsNote: "If you'd prefer a vet in Bellevue itself, here are a couple of local practices.",
    otherClinics: [
      { name: "Bellevue Animal Hospital", area: "Bellevue", address: "407 Fairfield Ave, Bellevue, KY 41073" },
      { name: "Riverview Animal Hospital", area: "Bellevue", address: "102 Fairfield Ave, Bellevue, KY 41073" }
    ],
    faqs: [
      { question: "How far is your clinic from Bellevue, KY?", answer: "Our Fort Thomas clinic is about 10 minutes from Bellevue, depending on where you start and traffic." },
      { question: "Is Veterinary Medical Centers locally owned?", answer: "Yes. We're independently owned by Dr. Kristi Baker, a Northern Kentucky native. There's no corporate parent company." },
      { question: "Do you see both dogs and cats from Bellevue?", answer: "Yes. We care for dogs, cats, puppies, and kittens from Bellevue and across Campbell County." },
      { question: "Can I book an appointment online?", answer: "Yes. Book online any time, or call our Fort Thomas clinic at (859) 442-4420." },
      { question: "What services are available?", answer: "Wellness exams, vaccines, dental care, spay and neuter, soft tissue surgery, diagnostics, sick visits, and senior pet care." }
    ]
  },
  {
    slug: "vet-near-highland-heights-ky",
    city: "Highland Heights",
    state: "KY",
    clinics: ["fort-thomas"],
    driveTime: "about 10 minutes",
    seo: {
      title: "Vet in Highland Heights, KY | Near NKU | VMC Fort Thomas",
      description: "Searching for a vet in Highland Heights, KY? Our locally owned Fort Thomas clinic is about 10 minutes away and welcomes NKU-area dogs and cats."
    },
    hero: {
      title: "Need a vet in Highland Heights?",
      emphasis: "We're right around the corner.",
      body: "From NKU apartments to family homes off Alexandria Pike, our Fort Thomas clinic is about 10 minutes away with a team that remembers your pet."
    },
    strip: "~10 minutes from Highland Heights · Near NKU · Locally owned",
    intro: {
      eyebrow: "A Highland Heights vet for every household",
      title: "A vet in Highland Heights",
      emphasis: "for students, families, and everyone between.",
      paragraphs: [
        "Highland Heights is home to Northern Kentucky University students with their first pets, young families, and longtime residents with senior dogs. Every one of those pets deserves a vet who takes the time.",
        "Veterinary Medical Center of Fort Thomas is about 10 minutes from Highland Heights. We're locally owned, so we can focus on clear answers and care plans that fit your life and your budget.",
        "Whether it's a new kitten, a yearly checkup, or a senior dog slowing down, we're a Highland Heights vet option built around relationships."
      ],
      image: "/images/home-vmc-cat.webp",
      imageAlt: "Cat resting comfortably at home in Highland Heights"
    },
    benefits: {
      title: "Built for busy",
      emphasis: "Highland Heights schedules.",
      intro: "Classes, commutes, kids' practices. Here's why people looking for a vet in Highland Heights make the short trip to Fort Thomas.",
      cards: [
        { icon: "clock", title: "About 10 minutes away", text: "Quick to reach from NKU, Alexandria Pike, and surrounding neighborhoods." },
        { icon: "calendar", title: "Online booking", text: "Book a visit any time of day, even between classes or after the kids are asleep." },
        { icon: "paw", title: "First-pet friendly", text: "New pet owner? We'll walk you through vaccines, prevention, and what's normal." },
        { icon: "handshake", title: "Budget-aware care", text: "We explain your options so you can make decisions that fit real life." },
        { icon: "stethoscope", title: "Everything in one place", text: "Wellness, dental, surgery, diagnostics, and sick visits with one team." },
        { icon: "users", title: "One team, long term", text: "Independent ownership means familiar faces year after year." }
      ]
    },
    promise: {
      title: "Good care should be",
      emphasis: "easy to understand.",
      lead: "No jargon, no pressure, no rush.",
      aside: "That's the kind of Highland Heights vet we want to be.",
      items: [
        { icon: "smile", title: "Plain-language answers", text: "We explain what we see and why it matters." },
        { icon: "shield", title: "Preventive focus", text: "Vaccines and parasite prevention tailored to your pet's lifestyle." },
        { icon: "heart", title: "Comfort-first visits", text: "Gentle handling for pets who'd rather be anywhere else." },
        { icon: "map", title: "Close to campus", text: "A short drive from NKU and the US-27 corridor." }
      ]
    },
    local: {
      title: "Part of the",
      emphasis: "Campbell County community.",
      paragraphs: [
        "Highland Heights sits right between Fort Thomas, Cold Spring, and Southgate, so our clinic is a natural fit for pets across this part of Campbell County.",
        "If you're new to the area and searching for a vet in Highland Heights, start with a wellness visit and let us get to know your pet."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Highland Heights", "Cold Spring", "Wilder", "Southgate", "Fort Thomas", "Woodlawn"]
    },
    otherClinicsNote: "Prefer to compare? Here are a few other veterinary practices near Highland Heights.",
    otherClinics: [
      { name: "Alexandria Pike Animal Hospital", area: "Southgate", address: "333 Bluegrass Ave, Southgate, KY 41071" },
      { name: "Paws & Claws Animal Hospital", area: "Cold Spring", address: "5730 Alexandria Pike, Cold Spring, KY 41076" }
    ],
    faqs: [
      { question: "Is there a vet near NKU in Highland Heights?", answer: "Our Fort Thomas clinic is about 10 minutes from Northern Kentucky University and welcomes students' and families' dogs and cats." },
      { question: "Do you take new patients from Highland Heights?", answer: "Yes. Book online or call (859) 442-4420 to schedule a first visit." },
      { question: "I'm a first-time pet owner. Can you help?", answer: "Absolutely. A first wellness visit covers vaccines, parasite prevention, nutrition, and all the questions that come with a new pet." },
      { question: "What services do you offer?", answer: "Wellness exams, vaccinations, puppy and kitten care, dental care, spay and neuter surgery, diagnostics, sick visits, and senior care." },
      { question: "Is your clinic corporate-owned?", answer: "No. Veterinary Medical Centers is independently owned by Dr. Kristi Baker." }
    ]
  },
  {
    slug: "vet-near-cold-spring-ky",
    city: "Cold Spring",
    state: "KY",
    clinics: ["fort-thomas"],
    driveTime: "about 15 minutes",
    seo: {
      title: "Vet in Cold Spring, KY | Locally Owned Dog & Cat Care | VMC",
      description: "Looking for a vet in Cold Spring, KY? Our independently owned Fort Thomas clinic is about 15 minutes up US-27, caring for dogs and cats."
    },
    hero: {
      title: "Looking for a vet in Cold Spring?",
      emphasis: "A short drive up US-27.",
      body: "Veterinary Medical Center of Fort Thomas is about 15 minutes from Cold Spring, with independent, relationship-first care for dogs and cats."
    },
    strip: "~15 minutes from Cold Spring · Straight up US-27 · Locally owned",
    intro: {
      eyebrow: "Cold Spring's independent vet option",
      title: "Room to roam in Cold Spring.",
      emphasis: "Room for questions at the vet.",
      paragraphs: [
        "Cold Spring families tend to have big yards, active dogs, and cats who keep an eye on everything. They also want a vet who doesn't rush.",
        "Our Fort Thomas clinic is a straightforward drive up Alexandria Pike. We're independently owned, so appointments have room for real conversation, not just a quick exam and a bill.",
        "If you've been comparing options for a Cold Spring vet, we'd love to show you what personal care feels like."
      ],
      image: "/images/life-stage-dogs.jpg",
      imageAlt: "Two dogs sharing a gentle moment outdoors in Cold Spring"
    },
    benefits: {
      title: "Why Cold Spring",
      emphasis: "heads up the road to us.",
      intro: "For people searching for a vet in Cold Spring, here's what makes the drive worth it.",
      cards: [
        { icon: "navigation", title: "One easy route", text: "Take US-27 (Alexandria Pike) north to Fort Thomas, about 15 minutes." },
        { icon: "paw", title: "Active-dog expertise", text: "Prevention for ticks, heartworm, and the scrapes that come with outdoor life." },
        { icon: "stethoscope", title: "Full-service care", text: "Wellness, dental, surgery, diagnostics, and sick visits in one place." },
        { icon: "users", title: "Doctors who remember", text: "Independent ownership keeps the same team caring for your pet." },
        { icon: "handshake", title: "Options, not pressure", text: "We walk through choices so you can decide what's right for your family." },
        { icon: "calendar", title: "Book any time", text: "Schedule online at night or on weekends, whenever it's convenient." }
      ]
    },
    promise: {
      title: "Outdoor pets need",
      emphasis: "proactive care.",
      lead: "Yards, trails, and wildlife come with a few extra risks.",
      aside: "Prevention is where a good Cold Spring vet earns its keep.",
      items: [
        { icon: "shield", title: "Parasite prevention", text: "Year-round protection plans for fleas, ticks, and heartworm." },
        { icon: "sparkles", title: "Skin and allergy help", text: "Itching, hot spots, and ear trouble, handled with a clear plan." },
        { icon: "heart", title: "Senior comfort", text: "Mobility and comfort support as active dogs slow down." },
        { icon: "smile", title: "Calm visits", text: "Patient handling for pets who'd rather be outside." }
      ]
    },
    local: {
      title: "Serving Cold Spring",
      emphasis: "and southern Campbell County.",
      paragraphs: [
        "From neighborhoods off Alexandria Pike to homes near Crestview and Highland Heights, Cold Spring pets are a short drive from our Fort Thomas clinic.",
        "If you need a vet in Cold Spring for the long haul, someone who'll know your dog from puppyhood to gray muzzle, start with us."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Cold Spring", "Highland Heights", "Crestview", "Wilder", "Alexandria", "Fort Thomas"]
    },
    otherClinicsNote: "Want to compare? Here are other veterinary practices in and near Cold Spring.",
    otherClinics: [
      { name: "Paws & Claws Animal Hospital", area: "Cold Spring", address: "5730 Alexandria Pike, Cold Spring, KY 41076" },
      { name: "Campbell County Animal Hospital", area: "Alexandria", address: "7010 Alexandria Pike, Alexandria, KY 41001" }
    ],
    faqs: [
      { question: "How do I get to your clinic from Cold Spring?", answer: "Take US-27 (Alexandria Pike) north toward Fort Thomas. Our clinic is at 2000 Memorial Parkway, about 15 minutes from most of Cold Spring." },
      { question: "Do you help with tick and heartworm prevention?", answer: "Yes. We build year-round prevention plans for active, outdoor dogs and cats." },
      { question: "Are you accepting new patients from Cold Spring?", answer: "Yes. Book online any time or call (859) 442-4420." },
      { question: "Is Veterinary Medical Centers independently owned?", answer: "Yes. We're owned by Dr. Kristi Baker, a local veterinarian, with no corporate parent." },
      { question: "What should I do after hours?", answer: "For emergencies outside our hours, contact a 24/7 emergency hospital such as MedVet Cincinnati." }
    ]
  },
  {
    slug: "vet-near-alexandria-ky",
    city: "Alexandria",
    state: "KY",
    clinics: ["fort-thomas"],
    driveTime: "about 20 minutes",
    seo: {
      title: "Vet in Alexandria, KY | Independent Care via US-27 | VMC",
      description: "Need a vet in Alexandria, KY? Our locally owned Fort Thomas clinic is about 20 minutes up US-27, with full-service care for dogs and cats."
    },
    hero: {
      title: "Searching for a vet in Alexandria, KY?",
      emphasis: "It's worth the drive up 27.",
      body: "Veterinary Medical Center of Fort Thomas is about 20 minutes from Alexandria, with an independently owned team that treats your pet like family."
    },
    strip: "~20 minutes from Alexandria · Straight up US-27 · Independently owned",
    intro: {
      eyebrow: "An Alexandria vet alternative",
      title: "Country roads, big yards,",
      emphasis: "and a vet who knows your pet.",
      paragraphs: [
        "Alexandria has room to breathe: open land, quiet neighborhoods, and pets who spend plenty of time outdoors. Finding the right vet matters, because you want someone you'll trust for years.",
        "Our Fort Thomas clinic is a straight shot up Alexandria Pike. Pet owners from Alexandria tell us the drive is easy, and the personal attention makes it worth it.",
        "If you're looking for an Alexandria vet alternative with an independent, relationship-first approach, we'd love to meet you."
      ],
      image: "/images/family-pets-couch.jpg",
      imageAlt: "Alexandria family at home with their poodle and cat"
    },
    benefits: {
      title: "Why Alexandria families",
      emphasis: "make the trip.",
      intro: "Here's why people looking for a vet in Alexandria drive 20 minutes north to see us.",
      cards: [
        { icon: "navigation", title: "One road the whole way", text: "Alexandria Pike (US-27) runs right from Alexandria toward our Fort Thomas clinic." },
        { icon: "users", title: "Continuity of care", text: "The same doctors see your pet, so long-term health trends get noticed." },
        { icon: "shield", title: "Outdoor-pet prevention", text: "Ticks, heartworm, and wildlife exposure, covered with a plan that fits." },
        { icon: "stethoscope", title: "Surgery and dental", text: "Spays, neuters, soft tissue surgery, and dental care without extra referrals." },
        { icon: "handshake", title: "Locally owned", text: "Owned by a Northern Kentucky veterinarian. No corporate quotas." },
        { icon: "calendar", title: "Plan ahead online", text: "Book visits around your schedule with online appointment requests." }
      ]
    },
    promise: {
      title: "When you drive 20 minutes,",
      emphasis: "the visit should count.",
      lead: "We make every appointment worth the trip.",
      aside: "That's our promise to every Alexandria vet patient.",
      items: [
        { icon: "clock", title: "Unhurried exams", text: "Time to look closely and answer every question." },
        { icon: "map", title: "Bundled care", text: "We'll combine vaccines, checks, and rechecks when we can." },
        { icon: "heart", title: "Clear follow-up", text: "You'll know exactly what to watch for at home." },
        { icon: "smile", title: "A friendly welcome", text: "A calm, small-practice setting from the moment you arrive." }
      ]
    },
    local: {
      title: "Serving Alexandria",
      emphasis: "and southern Campbell County.",
      paragraphs: [
        "From homes near A.J. Jolly Park to farms out toward Grants Lick, Alexandria-area pets deserve a vet who sees the whole picture.",
        "If you need a vet in Alexandria for the years ahead, our Fort Thomas team is ready to become your pet's long-term partner."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Alexandria", "Cold Spring", "California", "Claryville", "Grants Lick", "Highland Heights"]
    },
    otherClinicsNote: "If you'd prefer a vet in Alexandria itself, here are a few local practices.",
    otherClinics: [
      { name: "Heineke Veterinary Hospital", area: "Alexandria", address: "5 Orlando Dr, Alexandria, KY 41001" },
      { name: "Campbell County Animal Hospital", area: "Alexandria", address: "7010 Alexandria Pike, Alexandria, KY 41001" }
    ],
    faqs: [
      { question: "How far is your clinic from Alexandria, KY?", answer: "Our Fort Thomas clinic is about 20 minutes from Alexandria by way of US-27 (Alexandria Pike), depending on traffic." },
      { question: "Why drive from Alexandria to Fort Thomas for a vet?", answer: "Many families value our independent ownership, consistent doctors, and unhurried visits. The route is a straight drive up Alexandria Pike." },
      { question: "Do you treat outdoor and farm-area pets?", answer: "We care for dogs and cats, including active outdoor pets, with prevention plans for ticks, heartworm, and other outdoor risks." },
      { question: "Are you accepting new patients from Alexandria?", answer: "Yes. Book online or call (859) 442-4420." },
      { question: "What services do you offer?", answer: "Wellness exams, vaccinations, dental care, spay and neuter, soft tissue surgery, diagnostics, sick visits, and senior pet care." }
    ]
  },
  {
    slug: "vet-near-covington-ky",
    city: "Covington",
    state: "KY",
    clinics: ["fort-thomas", "independence"],
    driveTime: "about 15–20 minutes",
    seo: {
      title: "Vet in Covington, KY | Two Nearby Locally Owned Clinics | VMC",
      description: "Looking for a vet in Covington, KY? Choose our Fort Thomas or Independence clinic, each about 15–20 minutes away, for locally owned dog and cat care."
    },
    hero: {
      title: "Looking for a vet in Covington, KY?",
      emphasis: "You've got two great options.",
      body: "Our Fort Thomas and Independence clinics are each about 15–20 minutes from Covington, with one locally owned team caring for dogs and cats."
    },
    strip: "Two clinics near Covington · Fort Thomas & Independence · Locally owned",
    intro: {
      eyebrow: "A Covington vet, two ways",
      title: "From MainStrasse to Latonia,",
      emphasis: "pick the clinic that's easiest.",
      paragraphs: [
        "Covington is big and varied: historic row houses near MainStrasse, family neighborhoods in Latonia, and everything in between. The best vet for you depends on which side of town you call home.",
        "That's why we offer two clinics. Our Independence location sits on Madison Pike, the same road as Covington's Madison Avenue. Our Fort Thomas location is a short hop across the Licking River.",
        "Either way, you'll get the same independently owned team and the same personal approach. It's a Covington vet choice that works around your life."
      ],
      image: "/images/vet-stock2.jpg",
      imageAlt: "Covington pet owner and veterinarian caring for a small dog"
    },
    benefits: {
      title: "Two clinics,",
      emphasis: "one standard of care.",
      intro: "Here's why people searching for a vet in Covington choose Veterinary Medical Centers.",
      cards: [
        { icon: "navigation", title: "Straight down Madison", text: "Covington's Madison Avenue becomes Madison Pike, the road our Independence clinic is on." },
        { icon: "map", title: "Or across the river", text: "Our Fort Thomas clinic is a quick drive east for northern Covington neighborhoods." },
        { icon: "users", title: "Same team, both sites", text: "Locally owned and run by people who know Northern Kentucky." },
        { icon: "stethoscope", title: "Full-service care", text: "Wellness, dental, surgery, diagnostics, and sick visits at either location." },
        { icon: "cat", title: "Feline-focused care", text: "Cat owners can see a vet with a special interest in feline medicine." },
        { icon: "calendar", title: "Flexible booking", text: "Book online for whichever clinic fits your week." }
      ]
    },
    promise: {
      title: "City pets, suburban pets,",
      emphasis: "all welcome.",
      lead: "Apartment cats and backyard dogs have different needs. We plan for both.",
      aside: "It's how a Covington vet should work: around your pet, not a template.",
      items: [
        { icon: "home", title: "Apartment-friendly advice", text: "Enrichment, weight, and behavior tips for indoor pets." },
        { icon: "shield", title: "Prevention plans", text: "Vaccines and parasite protection tailored to your pet's routine." },
        { icon: "heart", title: "Gentle handling", text: "Fear Free–minded visits for anxious dogs and cats." },
        { icon: "smile", title: "Straight answers", text: "You'll know what we found, what it costs, and what's next." }
      ]
    },
    local: {
      title: "Proud to care for",
      emphasis: "Covington's pets.",
      paragraphs: [
        "From Devou Park walks to Licking River views, Covington's pets keep busy. Whether you live near the Roebling Bridge or out in Latonia, one of our clinics is close by.",
        "If you've been searching for a vet in Covington who will know your pet for years, choose the clinic that fits your commute and we'll take it from there."
      ],
      listTitle: "Covington-area neighborhoods we serve",
      nearby: ["MainStrasse", "Downtown Covington", "Latonia", "Park Hills", "Fort Wright", "Ludlow", "Taylor Mill"]
    },
    otherClinicsNote: "Want to compare? Here are a few other veterinary practices near Covington.",
    otherClinics: [
      { name: "Park Hills Animal Hospital", area: "Park Hills", address: "1555 Dixie Hwy, Park Hills, KY 41011" },
      { name: "Fort Mitchell Veterinary Center", area: "Fort Mitchell", address: "2495 Dixie Hwy, Fort Mitchell, KY 41017" },
      { name: "Heekin Animal Hospital", area: "Taylor Mill", address: "5052 Old Taylor Mill Rd, Taylor Mill, KY 41015" }
    ],
    faqs: [
      { question: "Which VMC clinic is closest to Covington?", answer: "It depends on your neighborhood. Southern Covington and Latonia often find Independence (4147 Madison Pike) easiest, while northern and eastern Covington may prefer Fort Thomas (2000 Memorial Parkway). Both are about 15–20 minutes away." },
      { question: "Do both clinics offer the same services?", answer: "Yes. Both offer wellness exams, vaccines, dental care, surgery, diagnostics, sick visits, and senior care for dogs and cats." },
      { question: "Can I switch between clinics?", answer: "Yes. Both clinics are part of the same locally owned practice, so you can visit whichever is most convenient." },
      { question: "Are you accepting new patients from Covington?", answer: "Yes. Book online any time, or call Fort Thomas at (859) 442-4420 or Independence at (859) 356-2242." },
      { question: "Is Veterinary Medical Centers corporate-owned?", answer: "No. We're independently owned by Dr. Kristi Baker." }
    ]
  },
  {
    slug: "vet-near-florence-ky",
    city: "Florence",
    state: "KY",
    clinics: ["independence"],
    driveTime: "about 15–20 minutes",
    seo: {
      title: "Vet in Florence, KY | Locally Owned Alternative | VMC",
      description: "Searching for a vet in Florence, KY? Our independently owned Independence clinic is about 15–20 minutes away, caring for dogs and cats."
    },
    hero: {
      title: "Looking for a vet in Florence, KY?",
      emphasis: "Meet your independent alternative.",
      body: "Veterinary Medical Center of Independence is about 15–20 minutes from Florence, with a locally owned team and unhurried, personal care."
    },
    strip: "~15–20 minutes from Florence · Independently owned · Dogs & cats",
    intro: {
      eyebrow: "A Florence vet alternative",
      title: "Florence has plenty of choices.",
      emphasis: "We're the personal one.",
      paragraphs: [
        "Florence is one of the busiest parts of Northern Kentucky, with no shortage of veterinary clinics. What's harder to find is a small, independently owned practice where the same doctors know your pet.",
        "Veterinary Medical Center of Independence is a short drive from Florence. We take the time to listen, explain clearly, and build care plans around your pet and your budget.",
        "If you've been comparing options for a Florence vet and want something more personal, we'd love to earn your trust."
      ],
      image: "/images/northern-kentucky-vet-hero.jpg",
      imageAlt: "Veterinarian gently examining a calm cat for a Florence pet owner"
    },
    benefits: {
      title: "Why Florence pet owners",
      emphasis: "choose independent.",
      intro: "Here's what people looking for a vet in Florence find at our Independence clinic.",
      cards: [
        { icon: "clock", title: "A short drive", text: "About 15–20 minutes from most of Florence, depending on traffic." },
        { icon: "handshake", title: "Locally owned", text: "Owned by a Northern Kentucky veterinarian, not a national chain." },
        { icon: "users", title: "Doctors who know you", text: "Consistent care from a small team that remembers your pet's history." },
        { icon: "stethoscope", title: "Complete care", text: "Wellness, dental, surgery, diagnostics, and sick visits, all in one place." },
        { icon: "heart", title: "Calmer visits", text: "A quieter, small-practice setting that's easier on nervous pets." },
        { icon: "calendar", title: "Easy scheduling", text: "Book online any time, or call and talk with our team." }
      ]
    },
    promise: {
      title: "Personal care in a",
      emphasis: "busy part of town.",
      lead: "Florence moves fast. We slow the vet visit down.",
      aside: "That's the difference a locally owned Florence vet alternative can make.",
      items: [
        { icon: "smile", title: "Real conversations", text: "Your questions get real answers, not a rushed handout." },
        { icon: "shield", title: "Preventive planning", text: "Vaccines and prevention matched to your pet's lifestyle." },
        { icon: "paw", title: "Every life stage", text: "Puppies, kittens, adults, and seniors, all welcome." },
        { icon: "home", title: "Continuity", text: "One team that follows your pet over the years." }
      ]
    },
    local: {
      title: "Caring for pets across",
      emphasis: "Boone County.",
      paragraphs: [
        "From neighborhoods near the Florence Y'all water tower to homes out toward Union and Burlington, Boone County pets are an easy drive from our Independence clinic.",
        "If you need a vet in Florence but want the feel of a small-town practice, come see us."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Florence", "Union", "Burlington", "Erlanger", "Richwood", "Independence"]
    },
    otherClinicsNote: "If you'd prefer a vet in Florence itself, here are a few local practices.",
    otherClinics: [
      { name: "Florence Veterinary Hospital", area: "Florence", address: "7801 US-42, Florence, KY 41042" },
      { name: "Middendorf Animal Hospital", area: "Florence", address: "9930 Berberich Dr, Florence, KY 41042" },
      { name: "Banfield Pet Hospital", area: "Florence", address: "1060 Hansel Ave, Florence, KY 41042" }
    ],
    faqs: [
      { question: "How far is your clinic from Florence, KY?", answer: "Veterinary Medical Center of Independence, at 4147 Madison Pike, is about 15–20 minutes from most of Florence." },
      { question: "Is there a locally owned vet near Florence?", answer: "Yes. Veterinary Medical Centers is independently owned by Dr. Kristi Baker, with clinics in Independence and Fort Thomas." },
      { question: "Are you accepting new patients from Florence?", answer: "Yes. Book online any time or call (859) 356-2242." },
      { question: "What services do you offer Florence pet owners?", answer: "Wellness exams, vaccinations, puppy and kitten care, dental care, spay and neuter, soft tissue surgery, diagnostics, sick visits, and senior care." },
      { question: "What should I do in an emergency?", answer: "For after-hours emergencies, contact a 24/7 emergency hospital such as MedVet Cincinnati." }
    ]
  },
  {
    slug: "vet-near-erlanger-ky",
    city: "Erlanger",
    state: "KY",
    clinics: ["independence"],
    driveTime: "about 15 minutes",
    seo: {
      title: "Vet in Erlanger, KY | Independent Dog & Cat Care | VMC",
      description: "Need a vet in Erlanger, KY? Our locally owned Independence clinic is about 15 minutes away, with personal, full-service care for dogs and cats."
    },
    hero: {
      title: "Need a vet in Erlanger, KY?",
      emphasis: "We're 15 minutes down the road.",
      body: "Veterinary Medical Center of Independence offers locally owned, full-service care for Erlanger dogs and cats, with a team that remembers your pet."
    },
    strip: "~15 minutes from Erlanger · Locally owned · Full-service care",
    intro: {
      eyebrow: "Erlanger's nearby independent vet",
      title: "Close to the airport, close to I-75,",
      emphasis: "and close to great vet care.",
      paragraphs: [
        "Erlanger families are always on the move: commutes, travel, kids' schedules. When your pet needs care, you want a vet that's easy to reach and easy to talk to.",
        "Veterinary Medical Center of Independence is about 15 minutes from Erlanger. We're independently owned, so you'll see familiar faces and get clear, honest recommendations.",
        "If you've been searching for an Erlanger vet that feels personal, not corporate, we'd love to meet your pet."
      ],
      image: "/images/home-vmc-cat.webp",
      imageAlt: "Erlanger cat resting comfortably at home"
    },
    benefits: {
      title: "Made for",
      emphasis: "Erlanger's busy families.",
      intro: "Here's why people looking for a vet in Erlanger make our Independence clinic their pet's home base.",
      cards: [
        { icon: "clock", title: "About 15 minutes away", text: "A quick drive from Erlanger, Elsmere, and the Dixie Highway corridor." },
        { icon: "calendar", title: "Travel-season ready", text: "Vaccines and health checks before boarding or trips, planned ahead." },
        { icon: "users", title: "Familiar doctors", text: "A small, independent team that keeps your pet's history close." },
        { icon: "stethoscope", title: "Everything under one roof", text: "Wellness, dental, surgery, diagnostics, and sick visits." },
        { icon: "handshake", title: "Honest recommendations", text: "Clear options and costs, so you can decide with confidence." },
        { icon: "cat", title: "Cats welcome", text: "Low-stress handling and feline-focused expertise on our team." }
      ]
    },
    promise: {
      title: "Good care that",
      emphasis: "fits your schedule.",
      lead: "We plan visits around real life, not the other way around.",
      aside: "That's what an Erlanger vet relationship should feel like.",
      items: [
        { icon: "calendar", title: "Online booking", text: "Request appointments any time of day." },
        { icon: "shield", title: "Boarding-ready vaccines", text: "We'll make sure your pet is covered before you travel." },
        { icon: "heart", title: "Calm handling", text: "Patient care for anxious dogs and cats." },
        { icon: "smile", title: "Clear next steps", text: "You'll always know what happens next." }
      ]
    },
    local: {
      title: "Caring for pets in",
      emphasis: "Erlanger and Elsmere.",
      paragraphs: [
        "From neighborhoods off Dixie Highway to homes near Erlanger's city center, Erlanger pets are a short drive from our Independence clinic.",
        "If you need a vet in Erlanger that you'll stick with for years, start with a wellness visit and let us get to know your pet."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Erlanger", "Elsmere", "Edgewood", "Crestview Hills", "Florence", "Independence"]
    },
    otherClinicsNote: "If you'd prefer a vet in Erlanger itself, here are a couple of local practices.",
    otherClinics: [
      { name: "Erlanger Veterinary Hospital", area: "Erlanger", address: "3414 Dixie Hwy, Erlanger, KY 41018" },
      { name: "Huesing Veterinary Clinic", area: "Erlanger", address: "3810 Dixie Hwy, Erlanger, KY 41018" }
    ],
    faqs: [
      { question: "How far is your clinic from Erlanger, KY?", answer: "Our Independence clinic at 4147 Madison Pike is about 15 minutes from most of Erlanger." },
      { question: "Can you help get my pet ready for boarding or travel?", answer: "Yes. We can update vaccines and do a health check ahead of boarding or trips. Book a little early to stay ahead of busy seasons." },
      { question: "Are you accepting new patients from Erlanger?", answer: "Yes. Book online or call (859) 356-2242." },
      { question: "Is your practice locally owned?", answer: "Yes. Veterinary Medical Centers is independently owned by Dr. Kristi Baker, with no corporate parent." },
      { question: "What services do you offer?", answer: "Wellness exams, vaccinations, dental care, spay and neuter, soft tissue surgery, diagnostics, sick visits, and senior pet care." }
    ]
  },
  {
    slug: "vet-near-taylor-mill-ky",
    city: "Taylor Mill",
    state: "KY",
    clinics: ["independence"],
    driveTime: "about 10 minutes",
    seo: {
      title: "Vet in Taylor Mill, KY | Locally Owned, 10 Min Away | VMC",
      description: "Looking for a vet in Taylor Mill, KY? Our locally owned Independence clinic is about 10 minutes away, with personal care for dogs and cats."
    },
    hero: {
      title: "Looking for a vet in Taylor Mill?",
      emphasis: "We're practically neighbors.",
      body: "Veterinary Medical Center of Independence is about 10 minutes from Taylor Mill, with a locally owned team that treats every pet like family."
    },
    strip: "~10 minutes from Taylor Mill · Next-door neighbors · Locally owned",
    intro: {
      eyebrow: "Taylor Mill's closest independent vet",
      title: "A vet in Taylor Mill's backyard,",
      emphasis: "without the big-clinic feel.",
      paragraphs: [
        "Taylor Mill is a close-knit community, and our Independence clinic is right next door. That makes us one of the most convenient options for Taylor Mill pet owners.",
        "We're independently owned, so you'll see the same doctors each time, and they'll remember your dog's quirks and your cat's history.",
        "If you've been searching for a Taylor Mill vet that's close, personal, and easy to talk to, you've found us."
      ],
      image: "/images/life-stage-dogs.jpg",
      imageAlt: "Taylor Mill dogs sharing a gentle moment outdoors"
    },
    benefits: {
      title: "Why Taylor Mill",
      emphasis: "chooses us.",
      intro: "Here's what pet owners looking for a vet in Taylor Mill value most about our Independence clinic.",
      cards: [
        { icon: "clock", title: "About 10 minutes away", text: "One of the closest full-service clinics to Taylor Mill." },
        { icon: "home", title: "Hometown feel", text: "A small practice where the staff knows you by name." },
        { icon: "users", title: "Consistent doctors", text: "Independent ownership keeps your pet with the same team." },
        { icon: "stethoscope", title: "Full-service care", text: "Wellness, vaccines, dental, surgery, diagnostics, and sick visits." },
        { icon: "paw", title: "Puppies to seniors", text: "Care for every stage of your pet's life." },
        { icon: "calendar", title: "Quick rechecks", text: "Being close makes follow-up visits easy to fit in." }
      ]
    },
    promise: {
      title: "Close by makes",
      emphasis: "good care easier.",
      lead: "When your vet is 10 minutes away, staying on top of your pet's health is simple.",
      aside: "That's the advantage of a truly local Taylor Mill vet.",
      items: [
        { icon: "shield", title: "Stay on schedule", text: "Vaccines and checkups are easy to keep up with nearby." },
        { icon: "heart", title: "Faster follow-up", text: "Rechecks and progress visits fit into a normal day." },
        { icon: "smile", title: "Familiar visits", text: "Pets relax more when the place and people are familiar." },
        { icon: "handshake", title: "Honest guidance", text: "Clear options and costs, every time." }
      ]
    },
    local: {
      title: "Proud to care for",
      emphasis: "Taylor Mill's pets.",
      paragraphs: [
        "From neighborhoods along Taylor Mill Road to homes near Pride Park, Taylor Mill pets are just minutes from our Independence clinic.",
        "If you want a vet in Taylor Mill that's close enough to feel like part of the neighborhood, we're ready when you are."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Taylor Mill", "Independence", "Latonia", "Covington", "Ryland Heights", "Fort Wright"]
    },
    otherClinicsNote: "Want to compare? Here are a couple of other practices near Taylor Mill.",
    otherClinics: [
      { name: "Heekin Animal Hospital", area: "Taylor Mill", address: "5052 Old Taylor Mill Rd, Taylor Mill, KY 41015" },
      { name: "All Creatures Veterinary Clinic", area: "Independence", address: "11515 Taylor Mill Rd, Independence, KY 41051" }
    ],
    faqs: [
      { question: "How close is your clinic to Taylor Mill?", answer: "Veterinary Medical Center of Independence, at 4147 Madison Pike, is about 10 minutes from most of Taylor Mill." },
      { question: "Are you accepting new patients from Taylor Mill?", answer: "Yes. Book online any time or call (859) 356-2242." },
      { question: "Do you see dogs and cats?", answer: "Yes. We care for dogs, cats, puppies, and kittens at every life stage." },
      { question: "Is Veterinary Medical Centers locally owned?", answer: "Yes. We're independently owned by Dr. Kristi Baker, a Northern Kentucky native." },
      { question: "What services do you offer?", answer: "Wellness exams, vaccinations, dental care, spay and neuter, soft tissue surgery, diagnostics, sick visits, and senior pet care." }
    ]
  },
  {
    slug: "vet-near-edgewood-ky",
    city: "Edgewood",
    state: "KY",
    clinics: ["independence"],
    driveTime: "about 10–15 minutes",
    seo: {
      title: "Vet in Edgewood, KY | Independent Care Nearby | VMC",
      description: "Searching for a vet in Edgewood, KY? Our locally owned Independence clinic is about 10–15 minutes away, caring for dogs and cats at every age."
    },
    hero: {
      title: "Searching for a vet in Edgewood?",
      emphasis: "Personal care, just down the road.",
      body: "Veterinary Medical Center of Independence is about 10–15 minutes from Edgewood, with an independently owned team and unhurried visits."
    },
    strip: "~10–15 minutes from Edgewood · Independently owned · Every life stage",
    intro: {
      eyebrow: "An Edgewood vet you'll know by name",
      title: "Edgewood families expect quality.",
      emphasis: "So do we.",
      paragraphs: [
        "Edgewood is known for great schools, beautiful parks, and neighbors who care about doing things right. Pet owners here want the same from their vet.",
        "Veterinary Medical Center of Independence is a short drive from Edgewood. We're independently owned, which lets us spend real time on each visit and keep your pet with the same trusted team.",
        "If you're looking for an Edgewood vet that values relationships as much as medicine, we'd love to meet you."
      ],
      image: "/images/family-pets-couch.jpg",
      imageAlt: "Edgewood family relaxing at home with their dog and cat"
    },
    benefits: {
      title: "Why Edgewood",
      emphasis: "trusts independent.",
      intro: "Here's what people searching for a vet in Edgewood find at our Independence clinic.",
      cards: [
        { icon: "clock", title: "Close by", text: "About 10–15 minutes from Edgewood and Crestview Hills." },
        { icon: "users", title: "Same team, every visit", text: "Continuity of care from doctors who know your pet." },
        { icon: "sparkles", title: "Dental and surgery", text: "Cleanings, spays, neuters, and soft tissue surgery in-house." },
        { icon: "shield", title: "Thoughtful prevention", text: "Vaccine and parasite plans matched to your pet's lifestyle." },
        { icon: "handshake", title: "Locally owned", text: "No corporate parent, just a Northern Kentucky veterinary team." },
        { icon: "calendar", title: "Convenient booking", text: "Book online any time, or call to talk with our team." }
      ]
    },
    promise: {
      title: "Medicine done well,",
      emphasis: "explained clearly.",
      lead: "We hold ourselves to a high standard, and we show our work.",
      aside: "It's the Edgewood vet experience we strive for every visit.",
      items: [
        { icon: "stethoscope", title: "Careful exams", text: "Thorough, nose-to-tail checkups every time." },
        { icon: "smile", title: "Transparent plans", text: "Clear explanations of what we recommend, and why." },
        { icon: "heart", title: "Gentle handling", text: "Comfort-focused care for nervous pets." },
        { icon: "paw", title: "Long-term focus", text: "We think in years, not single appointments." }
      ]
    },
    local: {
      title: "Caring for pets in",
      emphasis: "Edgewood and nearby.",
      paragraphs: [
        "From walks at Freedom Park to quiet streets near Dudley Road, Edgewood pets are a short drive from our Independence clinic.",
        "If you need a vet in Edgewood that pairs high standards with small-practice warmth, start with a wellness visit and see the difference."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Edgewood", "Crestview Hills", "Lakeside Park", "Fort Mitchell", "Erlanger", "Independence"]
    },
    otherClinicsNote: "Want to compare? Here are a couple of other practices near Edgewood.",
    otherClinics: [
      { name: "Fort Mitchell Veterinary Center", area: "Fort Mitchell", address: "2495 Dixie Hwy, Fort Mitchell, KY 41017" },
      { name: "Erlanger Veterinary Hospital", area: "Erlanger", address: "3414 Dixie Hwy, Erlanger, KY 41018" }
    ],
    faqs: [
      { question: "How far is your clinic from Edgewood, KY?", answer: "Our Independence clinic at 4147 Madison Pike is about 10–15 minutes from most of Edgewood." },
      { question: "Are you accepting new patients from Edgewood?", answer: "Yes. Book online or call (859) 356-2242." },
      { question: "Do you offer dental care and surgery?", answer: "Yes. We provide dental care, spay and neuter surgery, and select soft tissue surgeries." },
      { question: "Is Veterinary Medical Centers corporate-owned?", answer: "No. We're independently owned by Dr. Kristi Baker." },
      { question: "What should I do after hours?", answer: "For emergencies outside our hours, contact a 24/7 emergency hospital such as MedVet Cincinnati." }
    ]
  },
  {
    slug: "vet-near-walton-ky",
    city: "Walton",
    state: "KY",
    clinics: ["independence"],
    driveTime: "about 20 minutes",
    seo: {
      title: "Vet in Walton, KY | Locally Owned Dog & Cat Care | VMC",
      description: "Need a vet in Walton, KY? Our independently owned Independence clinic is about 20 minutes away, with full-service care for dogs and cats."
    },
    hero: {
      title: "Need a vet in Walton, KY?",
      emphasis: "Full-service care, a short drive north.",
      body: "Veterinary Medical Center of Independence is about 20 minutes from Walton, with a locally owned team and everything your pet needs in one place."
    },
    strip: "~20 minutes from Walton · Full-service care · Locally owned",
    intro: {
      eyebrow: "A Walton vet alternative",
      title: "Small-town Walton deserves",
      emphasis: "a small-town vet.",
      paragraphs: [
        "Walton has kept its small-town character even as Northern Kentucky grows around it. Pet owners here want a vet with the same values: friendly, honest, and personal.",
        "Veterinary Medical Center of Independence is about 20 minutes from Walton. We're independently owned, so you'll work with the same doctors and get care plans built around your pet.",
        "If you've been looking for a Walton vet option with full-service capabilities and a hometown feel, we'd love to help."
      ],
      image: "/images/life-stage-dogs.jpg",
      imageAlt: "Two Walton dogs sharing a gentle moment outdoors"
    },
    benefits: {
      title: "Why Walton families",
      emphasis: "head north to us.",
      intro: "Here's what people looking for a vet in Walton find at our Independence clinic.",
      cards: [
        { icon: "clock", title: "About 20 minutes away", text: "A straightforward drive north from Walton and Verona." },
        { icon: "stethoscope", title: "Full-service in one stop", text: "Wellness, dental, surgery, diagnostics, and sick visits together." },
        { icon: "shield", title: "Rural-life prevention", text: "Plans for ticks, heartworm, and wildlife exposure." },
        { icon: "users", title: "One trusted team", text: "Independent ownership means the same faces each visit." },
        { icon: "handshake", title: "Straight talk", text: "Honest options and costs, explained without pressure." },
        { icon: "calendar", title: "Plan your trip", text: "Book online so the visit fits neatly into your day." }
      ]
    },
    promise: {
      title: "Worth the drive,",
      emphasis: "every time.",
      lead: "We make each visit count, so you're not making extra trips.",
      aside: "That's our commitment to every Walton vet patient.",
      items: [
        { icon: "map", title: "Combined visits", text: "We'll bundle vaccines and checks when it makes sense." },
        { icon: "smile", title: "Clear instructions", text: "Know exactly what to do at home before you leave." },
        { icon: "heart", title: "Calm, patient handling", text: "Gentle care for pets who don't love the car ride." },
        { icon: "paw", title: "Every life stage", text: "From farm puppies to senior companions." }
      ]
    },
    local: {
      title: "Serving Walton",
      emphasis: "and southern Boone and Kenton counties.",
      paragraphs: [
        "From Walton's historic Main Street to homes out toward Verona and Richwood, southern Northern Kentucky pets are a short drive from our Independence clinic.",
        "If you need a vet in Walton who is friendly, honest, and fully equipped, come meet our team."
      ],
      listTitle: "Nearby communities we serve",
      nearby: ["Walton", "Verona", "Richwood", "Union", "Independence", "Crittenden"]
    },
    otherClinicsNote: "If you'd prefer a vet in Walton itself, here are a couple of local practices.",
    otherClinics: [
      { name: "Walton Animal Clinic", area: "Walton", address: "13576 Dixie Hwy, Walton, KY 41094" },
      { name: "Simpson Veterinary Services", area: "Walton", address: "116 Stephenson Mill Rd, Walton, KY 41094" }
    ],
    faqs: [
      { question: "How far is your clinic from Walton, KY?", answer: "Veterinary Medical Center of Independence, at 4147 Madison Pike, is about 20 minutes from Walton, depending on traffic." },
      { question: "Do you help with prevention for rural pets?", answer: "Yes. We build tick, flea, and heartworm prevention plans for dogs and cats with outdoor, rural lifestyles." },
      { question: "Are you accepting new patients from Walton?", answer: "Yes. Book online any time or call (859) 356-2242." },
      { question: "Is Veterinary Medical Centers locally owned?", answer: "Yes. We're independently owned by Dr. Kristi Baker, with no corporate parent company." },
      { question: "What services do you offer?", answer: "Wellness exams, vaccinations, dental care, spay and neuter, soft tissue surgery, diagnostics, sick visits, and senior pet care." }
    ]
  }
];

export function getCityLanding(slug: string) {
  return cityLandings.find((page) => page.slug === slug);
}
