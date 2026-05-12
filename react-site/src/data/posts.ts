export type Post = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  featuredImageAlt: string;
  author: {
    name: string;
    title: string;
    image: string;
    imageAlt: string;
  };
  content: string[];
  relatedServices?: { title: string; href: string }[];
  seo: {
    title: string;
    description: string;
  };
};

export const posts: Post[] = [
  {
    title: "How Often Should My Pet See the Vet?",
    slug: "how-often-should-my-pet-see-the-vet",
    date: "2026-01-15",
    category: "Preventive Care",
    excerpt: "A practical guide to wellness exam timing for puppies, kittens, adult pets, and seniors in Northern Kentucky.",
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "Veterinary care team helping a dog and cat patient in Northern Kentucky",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Northern Kentucky dog and cat care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Most healthy adult pets benefit from a wellness exam at least once a year. Puppies, kittens, senior pets, and pets with chronic conditions may need more frequent visits.",
      "Regular exams help your veterinarian find changes early, update vaccines, discuss parasite prevention, and answer questions before small concerns become urgent problems.",
      "Senior dogs and cats often benefit from twice-yearly exams because subtle changes in weight, mobility, appetite, and organ function can progress quickly with age.",
      "If your pet has new symptoms, behavior changes, appetite changes, weight loss, limping, coughing, vomiting, or litter box changes, call sooner rather than waiting for the annual visit.",
      "Veterinary Medical Center provides wellness exams for dogs and cats at our Fort Thomas and Independence locations. Request an appointment online or call your nearest clinic to get started."
    ],
    relatedServices: [
      { title: "Pet Wellness Exams", href: "/veterinary-services/wellness-exams/" },
      { title: "Senior Pet Care", href: "/veterinary-services/senior-pet-care/" },
      { title: "Puppy & Kitten Care", href: "/veterinary-services/puppy-kitten-care/" }
    ],
    seo: {
      title: "How Often Should My Pet See the Vet? | VMC Northern Kentucky",
      description: "Learn how often dogs and cats should see a veterinarian. A practical wellness exam guide for pet owners in Fort Thomas and Independence KY."
    }
  },
  {
    title: "Preparing Your Cat for a Less Stressful Vet Visit",
    slug: "preparing-your-cat-for-a-less-stressful-vet-visit",
    date: "2026-02-10",
    category: "Cat Care",
    excerpt: "Simple steps that make carrier training, travel, and veterinary visits easier for cats.",
    featuredImage: "/images/cat-closeup-hero.png",
    featuredImageAlt: "Close-up of a cat for a less stressful vet visit guide",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Fear Free-minded pet care guidance",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Start by leaving the carrier out at home with a soft blanket and treats inside. Familiar smells and positive associations make travel day easier.",
      "Avoid only bringing out the carrier when it is time to leave. Short practice sessions, food rewards, and a calm room can make the carrier less threatening.",
      "On travel day, cover the carrier with a light towel to reduce visual stimulation and spray the interior with synthetic feline facial pheromone products if your cat responds well to them.",
      "Tell our team if your cat is fearful or has had stressful visits before. We can help with arrival timing, handling preferences, and other low-stress options.",
      "Learn more about how we support cats at our Fort Thomas and Independence clinics, or review our guide to puppy and kitten care for younger feline patients."
    ],
    relatedServices: [
      { title: "Pet Wellness Exams", href: "/veterinary-services/wellness-exams/" },
      { title: "Puppy & Kitten Care", href: "/veterinary-services/puppy-kitten-care/" },
      { title: "Sick Pet Visits", href: "/veterinary-services/sick-pet-visits/" }
    ],
    seo: {
      title: "Preparing Your Cat for a Less Stressful Vet Visit | VMC",
      description: "Carrier training and low-stress vet visit tips for cat owners in Fort Thomas and Independence KY at Veterinary Medical Center."
    }
  },
  {
    title: "Puppy Vaccine Schedule in Kentucky: What New Dog Owners Should Know",
    slug: "puppy-vaccine-schedule-kentucky",
    date: "2026-02-20",
    category: "Puppy Care",
    excerpt: "A practical overview of core and lifestyle vaccines for puppies in Northern Kentucky, including timing and what to expect at each visit.",
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "Puppy receiving veterinary care in Northern Kentucky",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Northern Kentucky dog and cat care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Puppies need a timed series of vaccines because maternal antibodies gradually decline in the first weeks of life. Most core vaccine series begin around 6 to 8 weeks of age and continue every 3 to 4 weeks until around 16 weeks.",
      "Core puppy vaccines typically include distemper, parvovirus, adenovirus, and rabies. Lifestyle vaccines such as Bordetella, leptospirosis, and Lyme may also be recommended depending on your puppy's exposure risk in Northern Kentucky.",
      "Bring any vaccine records from your breeder, shelter, or rescue so your veterinarian can confirm what has already been given and build a complete schedule from there.",
      "After the puppy series, most core vaccines transition to a 1-year or 3-year schedule depending on the specific vaccine and your dog's medical history.",
      "Veterinary Medical Center provides puppy care at Fort Thomas and Independence. Schedule a first visit soon after bringing your puppy home, even if they seem healthy."
    ],
    relatedServices: [
      { title: "Puppy & Kitten Care", href: "/veterinary-services/puppy-kitten-care/" },
      { title: "Dog & Cat Vaccinations", href: "/veterinary-services/dog-cat-vaccinations/" },
      { title: "Parasite Prevention", href: "/veterinary-services/parasite-prevention/" }
    ],
    seo: {
      title: "Puppy Vaccine Schedule in Kentucky | VMC Fort Thomas & Independence",
      description: "Learn about puppy vaccine timing and core vaccines in Northern Kentucky. Practical guidance from Veterinary Medical Center for new dog owners."
    }
  },
  {
    title: "Signs Your Pet Should See a Vet Today",
    slug: "signs-your-pet-should-see-a-vet-today",
    date: "2026-03-05",
    category: "Pet Health",
    excerpt: "A practical list of symptoms and behavior changes that mean you should call your vet soon, not wait for the next scheduled visit.",
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "Veterinarian examining a sick pet in Northern Kentucky",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Northern Kentucky dog and cat care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Some symptoms look minor but can progress quickly without veterinary attention. When in doubt, calling your vet is always a reasonable first step.",
      "Call your veterinarian if your pet is vomiting repeatedly, has bloody diarrhea, is not eating for more than 24 to 48 hours, seems painful when touched, or is straining to urinate.",
      "Other signs that deserve prompt attention include sudden limping or inability to bear weight, eye redness or discharge, persistent coughing, difficulty breathing, swelling, sudden lethargy, or behavior that feels significantly different from normal.",
      "For life-threatening emergencies such as collapse, suspected toxin ingestion, seizures, or trauma, contact a 24-hour emergency veterinary hospital rather than waiting for clinic hours.",
      "Veterinary Medical Center offers sick pet visits at our Fort Thomas and Independence locations during regular clinic hours. Call first so we can help triage and choose the safest next step."
    ],
    relatedServices: [
      { title: "Sick Pet Visits", href: "/veterinary-services/sick-pet-visits/" },
      { title: "Veterinary Diagnostics", href: "/veterinary-services/veterinary-diagnostics/" },
      { title: "Skin, Ear & Allergy Care", href: "/veterinary-services/skin-ear-allergy-care/" }
    ],
    seo: {
      title: "Signs Your Pet Should See a Vet Today | VMC Northern Kentucky",
      description: "Know when your dog or cat needs prompt veterinary care. A symptom guide from Veterinary Medical Center in Fort Thomas and Independence KY."
    }
  },
  {
    title: "Signs Your Dog Needs a Dental Cleaning",
    slug: "signs-your-dog-needs-dental-cleaning",
    date: "2026-03-18",
    category: "Dental Care",
    excerpt: "Bad breath is just one sign of dental disease. Learn what else to watch for and when to talk to your vet about a professional cleaning.",
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "Veterinarian examining dog's teeth in Northern Kentucky",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Northern Kentucky dog and cat care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Dental disease is one of the most common conditions in adult dogs and cats, and it often goes unnoticed until it has already affected comfort, eating habits, and overall health.",
      "Bad breath that is noticeably worse than usual is often the first sign owners observe. Other signs include visible yellow or brown tartar on the teeth, red or swollen gumlines, drooling more than normal, dropping food while eating, or favoring one side of the mouth.",
      "Some dogs with painful mouths stop chewing toys they previously enjoyed or become reluctant to let you touch their face. Behavioral shifts like irritability or reduced play can also be related to oral discomfort.",
      "A professional dental cleaning under anesthesia allows the veterinary team to clean below the gumline, evaluate each tooth with dental X-rays when needed, and address concerns that cannot be safely examined while your dog is awake.",
      "Ask about dental care during your next wellness exam at Veterinary Medical Center in Fort Thomas or Independence. Our team can help you understand what your dog may need and what to expect."
    ],
    relatedServices: [
      { title: "Pet Dental Care", href: "/veterinary-services/pet-dental-care/" },
      { title: "Pet Wellness Exams", href: "/veterinary-services/wellness-exams/" },
      { title: "Senior Pet Care", href: "/veterinary-services/senior-pet-care/" }
    ],
    seo: {
      title: "Signs Your Dog Needs a Dental Cleaning | VMC Northern Kentucky",
      description: "Learn the signs of dental disease in dogs, including bad breath, tartar, and chewing changes. Dental care guidance from VMC in Northern Kentucky."
    }
  },
  {
    title: "Flea, Tick, and Heartworm Prevention in Kentucky",
    slug: "flea-tick-heartworm-prevention-kentucky",
    date: "2026-04-02",
    category: "Parasite Prevention",
    excerpt: "Why year-round parasite prevention matters for dogs and cats in Northern Kentucky, and what to discuss with your vet.",
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "Dog and cat outdoors in Northern Kentucky",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Northern Kentucky dog and cat care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Parasites are a year-round concern in Kentucky. Fleas can survive indoors through winter, ticks remain active in mild weather, and mosquitoes that carry heartworm are present through much of the spring, summer, and fall.",
      "Heartworm disease is transmitted by mosquito bites and affects the heart, lungs, and blood vessels. It is preventable with monthly or semi-annual medication but can be serious and costly to treat once established.",
      "Fleas can cause skin irritation, hot spots, hair loss, and flea allergy dermatitis. Ticks can transmit Lyme disease, ehrlichiosis, anaplasmosis, and other tick-borne illnesses common in Northern Kentucky.",
      "Your veterinarian can help choose the right prevention based on your pet's species, age, health history, lifestyle, and household. There is no single product that works best for every dog or cat.",
      "Annual heartworm testing is typically recommended before starting or restarting prevention. Talk to our team at your next VMC visit about a year-round prevention plan."
    ],
    relatedServices: [
      { title: "Parasite Prevention", href: "/veterinary-services/parasite-prevention/" },
      { title: "Pet Wellness Exams", href: "/veterinary-services/wellness-exams/" },
      { title: "Puppy & Kitten Care", href: "/veterinary-services/puppy-kitten-care/" }
    ],
    seo: {
      title: "Flea, Tick & Heartworm Prevention in Kentucky | VMC",
      description: "Year-round parasite prevention for dogs and cats in Northern Kentucky. Guidance on fleas, ticks, and heartworm from VMC in Fort Thomas and Independence."
    }
  },
  {
    title: "Senior Pet Wellness Checklist: What to Watch as Your Dog or Cat Ages",
    slug: "senior-pet-wellness-checklist",
    date: "2026-04-20",
    category: "Senior Care",
    excerpt: "A practical checklist of changes to watch for in aging dogs and cats, and why more frequent vet visits help as pets grow older.",
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "Senior dog receiving veterinary care in Northern Kentucky",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Northern Kentucky dog and cat care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Senior pets, typically dogs over 7 years and cats over 10 years, are more likely to develop conditions that benefit from early detection and monitoring.",
      "Watch for changes in water intake and urination, which can point to kidney disease, diabetes, or other conditions. Increased thirst and more frequent bathroom trips are worth noting.",
      "Changes in activity level, reluctance to jump or climb stairs, stiffness after rest, or obvious discomfort can signal arthritis or other musculoskeletal issues that affect quality of life.",
      "Weight loss in senior cats is common but not normal. Unexplained weight loss or gain, changes in appetite, or a dull coat can indicate thyroid disease, gastrointestinal issues, or other conditions.",
      "Dental disease often worsens with age and can cause pain that is hard to detect at home. Regular dental evaluations are an important part of senior wellness.",
      "Many senior pets benefit from exams every six months rather than once a year. At Veterinary Medical Center, we help families understand what to monitor and when to call between visits."
    ],
    relatedServices: [
      { title: "Senior Pet Care", href: "/veterinary-services/senior-pet-care/" },
      { title: "Veterinary Diagnostics", href: "/veterinary-services/veterinary-diagnostics/" },
      { title: "Nutrition & Weight Guidance", href: "/veterinary-services/nutrition-weight-guidance/" }
    ],
    seo: {
      title: "Senior Pet Wellness Checklist | VMC Northern Kentucky",
      description: "What to watch as your dog or cat ages. A senior pet wellness guide from Veterinary Medical Center in Fort Thomas and Independence KY."
    }
  },
  {
    title: "Your First Vet Visit at VMC Fort Thomas: What to Expect",
    slug: "first-vet-visit-guide-fort-thomas",
    date: "2026-05-01",
    category: "New Patients",
    excerpt: "A friendly guide for new clients at our Fort Thomas KY location. What to bring, how to prepare, and what your first visit will be like.",
    featuredImage: "/images/fort-thomas-clinic.jpg",
    featuredImageAlt: "Veterinary Medical Center Fort Thomas clinic on Memorial Parkway",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Fort Thomas veterinary care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Our Fort Thomas clinic is located at 2000 Memorial Parkway, easy to reach from Highland Heights, Newport, Bellevue, Dayton, Southgate, and nearby communities.",
      "Before your visit, gather your pet's vaccination records, any medication details, and adoption paperwork if you have it. Arriving with prior records helps us build a more complete picture of your pet's health history.",
      "We recommend calling ahead before your first visit so our team can confirm the appointment type, discuss what to expect, and answer any questions about arrival or parking.",
      "During your first exam, your veterinarian will review health history, perform a thorough physical exam, discuss prevention recommendations, and answer your questions in plain language.",
      "You will leave with a clear care plan, follow-up guidance, and a better understanding of what your pet needs now versus what can be monitored over time.",
      "New patients are welcome at Veterinary Medical Center of Fort Thomas. Use our contact page to request an appointment or complete a new patient registration form before you arrive."
    ],
    relatedServices: [
      { title: "Pet Wellness Exams", href: "/veterinary-services/wellness-exams/" },
      { title: "Dog & Cat Vaccinations", href: "/veterinary-services/dog-cat-vaccinations/" },
      { title: "Puppy & Kitten Care", href: "/veterinary-services/puppy-kitten-care/" }
    ],
    seo: {
      title: "First Vet Visit Guide for Fort Thomas KY | VMC",
      description: "What to expect at your first visit to Veterinary Medical Center in Fort Thomas KY. New patient guide for dog and cat owners in Northern Kentucky."
    }
  },
  {
    title: "Your First Vet Visit at VMC Independence: What to Expect",
    slug: "first-vet-visit-guide-independence",
    date: "2026-05-05",
    category: "New Patients",
    excerpt: "A friendly guide for new clients at our Independence KY location. What to bring, how to prepare, and what your first visit will feel like.",
    featuredImage: "/images/independence-clinic.jpg",
    featuredImageAlt: "Veterinary Medical Center Independence clinic on Madison Pike",
    author: {
      name: "Veterinary Medical Center Team",
      title: "Independence veterinary care team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    content: [
      "Our Independence clinic is located at 4147 Madison Pike, conveniently accessible from Taylor Mill, Covington, Erlanger, Florence, and surrounding Kenton County communities.",
      "This was the first clinic Dr. Kristi Baker opened, and it reflects the mission at the heart of Veterinary Medical Center: local ownership, thoughtful care, and real relationships with pet families.",
      "Before your visit, gather vaccine records, medication information, and any prior veterinary notes or lab results. If you adopted recently, bring adoption paperwork too.",
      "At your first exam, our team will review your pet's history, complete a nose-to-tail physical exam, and discuss recommendations for vaccines, prevention, nutrition, and any concerns you want to address.",
      "We take time to explain what we are seeing and help you understand what matters now versus what can be watched over time.",
      "New patients are welcome at Veterinary Medical Center of Independence. Request an appointment online or complete a new patient form before your first visit."
    ],
    relatedServices: [
      { title: "Pet Wellness Exams", href: "/veterinary-services/wellness-exams/" },
      { title: "Dog & Cat Vaccinations", href: "/veterinary-services/dog-cat-vaccinations/" },
      { title: "Parasite Prevention", href: "/veterinary-services/parasite-prevention/" }
    ],
    seo: {
      title: "First Vet Visit Guide for Independence KY | VMC",
      description: "What to expect at your first visit to Veterinary Medical Center in Independence KY. New patient guide for dog and cat owners in Kenton County."
    }
  }
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
