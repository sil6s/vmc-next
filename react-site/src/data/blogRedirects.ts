/**
 * Permanent (301/308) redirects for retired blog posts (replaced October 2026).
 * Each old slug points to the closest new article, guide, or service page; topics with no
 * close match go to /resources/. Applied in proxy.ts for /resources/:slug/ and /blog/:slug/ (308).
 * A full backup of the retired Sanity documents lives in /sanity-backups/.
 */
const RESOURCES = "/resources/";
const post = (slug: string) => `/resources/${slug}/`;

export const retiredBlogRedirects: Record<string, string> = {
  // Vaccines and wellness
  "puppy-vaccines-in-northern-kentucky-a-practical-schedule-for-new-dog-owners": post("puppy-vaccines-northern-kentucky"),
  "rabies-vaccines-for-dogs-and-cats-safety-law-and-public-health-basics": post("puppy-vaccines-northern-kentucky"),
  "kitten-vaccines-in-northern-kentucky-what-cat-owners-need-to-know": post("kitten-vaccines-northern-kentucky"),
  "how-often-should-pets-see-the-vet-a-fort-thomas-and-independence-guide": post("how-often-should-dogs-cats-see-vet"),
  "how-often-should-dog-cat-see-vet": post("how-often-should-dogs-cats-see-vet"),
  "how-often-should-my-pet-see-the-vet": post("how-often-should-dogs-cats-see-vet"),
  "preventive-veterinary-care-in-northern-kentucky-what-dog-and-cat-owners-should-know": post("how-often-should-dogs-cats-see-vet"),
  "pet-wellness-plans-vs-sick-visits-understanding-veterinary-appointment-types": post("how-often-should-dogs-cats-see-vet"),
  "indoor-cat-veterinary-care-why-house-cats-still-need-exams-and-vaccines": post("how-often-should-dogs-cats-see-vet"),
  "senior-pet-care-in-northern-kentucky-helping-older-dogs-and-cats-stay-comfortable": post("senior-pet-care-northern-kentucky"),
  "chronic-condition-monitoring-for-pets-why-follow-up-visits-matter": post("senior-pet-care-northern-kentucky"),
  "dental-care-for-dogs-and-cats-why-bad-breath-should-not-be-ignored": post("pet-dental-cleaning-dogs-cats"),
  "new-pet-checklist-first-vet-visit-for-dogs-and-cats-in-northern-kentucky": post("first-vet-visit-puppy-kitten"),
  "microchipping-dogs-and-cats-in-fort-thomas-and-independence": post("microchipping-dogs-cats"),
  "what-to-do-if-your-pet-goes-missing-in-northern-kentucky": post("microchipping-dogs-cats"),
  "healthy-weight-for-dogs-and-cats-a-northern-kentucky-pet-owner-guide": post("healthy-weight-dogs-cats"),
  "pet-nutrition-basics-feeding-dogs-and-cats-with-confidence": post("healthy-weight-dogs-cats"),

  // Parasites
  "flea-and-tick-prevention-for-dogs-and-cats-in-northern-kentucky": post("flea-tick-prevention-northern-kentucky"),
  "parasite-testing-for-dogs-and-cats-fecal-exams-deworming-and-zoonotic-risk": post("flea-tick-prevention-northern-kentucky"),
  "heartworm-prevention-in-northern-kentucky-dogs-and-cats": post("heartworm-prevention-northern-kentucky"),

  // Skin, ears, and paws
  "pet-ear-infections-signs-causes-and-veterinary-care-for-dogs-and-cats": post("ear-infections-dogs-cats"),
  "pet-allergies-and-itchy-skin-in-northern-kentucky-what-owners-should-watch-for": post("itchy-skin-dogs-cats"),
  "burrs-grass-seeds-and-paw-irritation-after-outdoor-walks": post("itchy-skin-dogs-cats"),

  // Symptoms and sick visits
  "when-is-a-sick-pet-exam-needed-dog-and-cat-symptoms-to-take-seriously": post("when-to-book-sick-pet-visit"),
  "when-a-pet-seems-painful-but-you-cannot-find-the-cause": post("when-to-book-sick-pet-visit"),
  "small-cuts-scrapes-and-bite-wounds-when-pets-need-care": post("when-to-book-sick-pet-visit"),
  "excessive-drooling-in-dogs-and-cats-what-it-can-mean": post("when-to-book-sick-pet-visit"),
  "when-appetite-changes-in-dogs-and-cats-need-a-vet-visit": post("when-to-book-sick-pet-visit"),
  "bee-stings-and-insect-bites-in-dogs-and-cats": post("when-to-book-sick-pet-visit"),
  "raccoons-opossums-and-backyard-wildlife-encounters": post("when-to-book-sick-pet-visit"),
  "red-cloudy-or-squinting-eyes-in-dogs-and-cats": post("when-to-book-sick-pet-visit"),
  "why-is-my-dog-scooting-across-the-floor": post("when-to-book-sick-pet-visit"),
  "when-a-pet-is-drinking-more-water-than-usual": post("when-to-book-sick-pet-visit"),
  "why-is-my-dog-panting-so-much-in-northern-kentucky": post("when-to-book-sick-pet-visit"),
  "dog-and-cat-behavior-changes-when-to-look-for-a-medical-cause": post("when-to-book-sick-pet-visit"),
  "vomiting-and-diarrhea-in-dogs-and-cats-when-to-call-a-northern-kentucky-vet": post("vomiting-diarrhea-dogs-cats"),
  "constipation-and-straining-in-dogs-and-cats": post("vomiting-diarrhea-dogs-cats"),
  "litter-box-problems-in-cats-medical-reasons-to-rule-out-first": post("cat-litter-box-problems"),
  "dog-urinary-accidents-when-house-trained-dogs-start-peeing-inside": post("dog-urinary-accidents"),
  "coughing-in-dogs-and-cats-when-it-needs-a-veterinary-visit": post("why-is-my-dog-coughing"),
  "limping-in-dogs-and-cats-why-a-veterinary-exam-matters": post("why-is-my-dog-limping"),
  "what-to-do-if-your-dog-breaks-a-nail-or-tears-a-dewclaw": post("why-is-my-dog-limping"),
  "pet-x-rays-and-lab-work-how-diagnostics-help-veterinarians-understand-symptoms": "/services/veterinary-diagnostics/",

  // Surgery
  "pet-surgery-preparation-what-to-expect-before-and-after-a-soft-tissue-procedure": post("pet-surgery-preparation"),
  "spay-and-neuter-timing-questions-to-ask-your-northern-kentucky-veterinarian": "/services/spay-neuter-surgery/",
  "post-surgery-home-care-for-dogs-and-cats": post("post-surgery-care-dogs-cats"),

  // Emergencies and urgent decisions
  "possible-poison-exposure-steps-for-pet-owners-before-the-vet-visit": "/guides/quick-vet-appointments-northern-kentucky/",
  "seizures-in-dogs-and-cats-what-to-do-in-the-moment": "/guides/quick-vet-appointments-northern-kentucky/",
  "human-medications-that-are-unsafe-for-pets": "/guides/quick-vet-appointments-northern-kentucky/",
  "houseplants-that-can-be-dangerous-for-dogs-and-cats": "/guides/quick-vet-appointments-northern-kentucky/",

  // Choosing a vet and cat comfort
  "choosing-a-local-veterinarian-in-northern-kentucky-what-matters-for-your-pet": "/guides/best-vets-cincinnati-northern-kentucky/",
  "helping-cats-feel-less-stressed-in-the-carrier": "/guides/cat-vets-cincinnati-northern-kentucky/",
  "preparing-your-cat-for-a-less-stressful-vet-visit": "/guides/cat-vets-cincinnati-northern-kentucky/",

  // No close replacement yet
  "skunk-spray-and-pets-what-northern-kentucky-owners-should-know": RESOURCES,
  "safe-car-rides-for-dogs-and-cats-around-northern-kentucky": RESOURCES,
  "separation-anxiety-signs-in-dogs-returning-to-busy-schedules": RESOURCES,
  "multi-pet-household-tension-when-dogs-or-cats-stop-getting-along": RESOURCES,
  "nail-trim-anxiety-helping-pets-handle-paw-care": RESOURCES,
  "fireworks-and-thunderstorm-anxiety-in-dogs-and-cats": RESOURCES,
  "cold-weather-paw-care-for-dogs-and-cats": RESOURCES,
  "heat-and-humidity-safety-for-dogs-in-cincinnati-and-northern-kentucky": RESOURCES,
  "dog-park-safety-for-northern-kentucky-pets": RESOURCES,
  "seasonal-pet-safety-in-cincinnati-and-northern-kentucky": RESOURCES,
  "pet-travel-and-boarding-prep-vaccines-records-and-health-planning": RESOURCES,

  // Site announcement
  "our-new-website-is-live": "/"
};

