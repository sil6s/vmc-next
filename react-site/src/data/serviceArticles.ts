/**
 * Pet care articles shown on each service page ("Learn more about…").
 * Mirrors the relatedResources references set on service documents in Sanity (October 2026).
 * Update both when articles change.
 */
import type { ServiceRelatedResource } from "@/data/serviceHub";

const article = (slug: string, title: string, category: string, excerpt: string): ServiceRelatedResource => ({ slug, title, category, excerpt });

const articles = {
  "puppy-vaccines-northern-kentucky": article("puppy-vaccines-northern-kentucky", "Puppy Vaccines in Northern Kentucky: A First-Year Guide", "Dog care", "When puppy shots start, how boosters work, and which vaccines your puppy needs in the first year. A guide for Fort Thomas and Independence, KY owners."),
  "kitten-vaccines-northern-kentucky": article("kitten-vaccines-northern-kentucky", "Kitten Vaccines in Northern Kentucky: What New Cat Owners Should Know", "Cat care", "Which vaccines kittens need, when boosters are due, and what to expect at each visit. Practical guidance for new cat owners in Northern Kentucky."),
  "how-often-should-dogs-cats-see-vet": article("how-often-should-dogs-cats-see-vet", "How Often Should Dogs and Cats See the Vet?", "Wellness", "How often puppies, kittens, adult and senior pets need checkups, and what a wellness exam covers. Guidance from Northern Kentucky veterinarians."),
  "senior-pet-care-northern-kentucky": article("senior-pet-care-northern-kentucky", "Senior Pet Care: Helping Older Dogs and Cats Stay Comfortable", "Wellness", "Signs of aging to watch for, how often senior pets need checkups, and ways to keep older dogs and cats comfortable at home in Northern Kentucky."),
  "pet-dental-cleaning-dogs-cats": article("pet-dental-cleaning-dogs-cats", "Pet Dental Cleaning: Why Bad Breath Matters", "Wellness", "What bad breath can mean, how a professional pet dental cleaning works, and at-home tooth care tips for dogs and cats in Northern Kentucky."),
  "flea-tick-prevention-northern-kentucky": article("flea-tick-prevention-northern-kentucky", "Flea and Tick Prevention in Northern Kentucky", "Wellness", "Why year-round flea and tick prevention matters in Northern Kentucky, how to spot an infestation, and how to choose the right product for your pet."),
  "heartworm-prevention-northern-kentucky": article("heartworm-prevention-northern-kentucky", "Heartworm Prevention for Dogs and Cats in Northern Kentucky", "Wellness", "How heartworm spreads, why testing and monthly prevention matter for dogs and cats, and what Northern Kentucky pet owners should know."),
  "ear-infections-dogs-cats": article("ear-infections-dogs-cats", "Ear Infections in Dogs and Cats: Symptoms and Treatment", "Dog care", "Head shaking, odor, and scratching can signal an ear infection. Learn common causes, treatment, and when to see a vet in Northern Kentucky."),
  "itchy-skin-dogs-cats": article("itchy-skin-dogs-cats", "Itchy Skin in Dogs and Cats: Common Causes", "Dog care", "Fleas, allergies, and infections can all cause itching. Learn the common causes of itchy skin in dogs and cats and when to book a vet visit."),
  "vomiting-diarrhea-dogs-cats": article("vomiting-diarrhea-dogs-cats", "Vomiting and Diarrhea in Dogs and Cats: When to Call the Vet", "Dog care", "When vomiting or diarrhea can be watched at home and when your dog or cat needs a vet. Warning signs and next steps for Northern Kentucky owners."),
  "cat-litter-box-problems": article("cat-litter-box-problems", "Cat Litter Box Problems: Rule Out Medical Causes", "Cat care", "Peeing outside the litter box is often medical. Learn the health problems to rule out first and when a cat's litter box change is urgent."),
  "dog-urinary-accidents": article("dog-urinary-accidents", "Why Is My House-Trained Dog Peeing Indoors?", "Dog care", "Sudden indoor accidents in a house-trained dog can point to infection, kidney disease, or aging. Learn common causes and when to see a vet."),
  "when-to-book-sick-pet-visit": article("when-to-book-sick-pet-visit", "When Does My Dog or Cat Need a Sick-Pet Exam?", "Dog care", "How to tell when a symptom needs a sick-pet exam, when it can wait, and when it's an emergency. Clear guidance for Northern Kentucky pet owners."),
  "post-surgery-care-dogs-cats": article("post-surgery-care-dogs-cats", "Post-Surgery Care for Dogs and Cats at Home", "Wellness", "How to care for your dog or cat after surgery: incision checks, cones, activity limits, pain signs, and when to call your Northern Kentucky vet."),
  "pet-surgery-preparation": article("pet-surgery-preparation", "Preparing Your Dog or Cat for Surgery", "Wellness", "What to do before your pet's surgery: fasting, medications, pre-op bloodwork, drop-off, and questions to ask your Northern Kentucky veterinarian."),
  "why-is-my-dog-limping": article("why-is-my-dog-limping", "Why Is My Dog Limping? When to See a Vet", "Dog care", "Common causes of limping in dogs, from paw injuries to arthritis, what you can check at home, and when a limp needs a vet visit."),
  "why-is-my-dog-coughing": article("why-is-my-dog-coughing", "Why Is My Dog Coughing? Causes and Urgent Signs", "Dog care", "Kennel cough, allergies, and heart disease can all cause coughing in dogs. Learn the common causes and the urgent signs that need a vet now."),
  "microchipping-dogs-cats": article("microchipping-dogs-cats", "Microchipping Dogs and Cats: How It Works", "New patients", "How pet microchips work, why registration matters, and how microchipping helps lost dogs and cats get home. Answers for Northern Kentucky owners."),
  "healthy-weight-dogs-cats": article("healthy-weight-dogs-cats", "Healthy Weight for Dogs and Cats: A Practical Guide", "Wellness", "How to tell if your dog or cat is overweight, why extra weight matters, and practical feeding and exercise steps to reach a healthy weight."),
  "first-vet-visit-puppy-kitten": article("first-vet-visit-puppy-kitten", "First Vet Visit for a Puppy or Kitten: Checklist", "New patients", "What to bring and what happens at your puppy's or kitten's first vet visit, plus questions to ask. A checklist for new Northern Kentucky pet owners."),
};

export const serviceArticles: Record<string, ServiceRelatedResource[]> = {
  "dog-cat-vaccinations": [articles["puppy-vaccines-northern-kentucky"], articles["kitten-vaccines-northern-kentucky"], articles["how-often-should-dogs-cats-see-vet"], articles["first-vet-visit-puppy-kitten"]],
  "nutrition-weight-guidance": [articles["healthy-weight-dogs-cats"], articles["senior-pet-care-northern-kentucky"], articles["how-often-should-dogs-cats-see-vet"]],
  "parasite-prevention": [articles["flea-tick-prevention-northern-kentucky"], articles["heartworm-prevention-northern-kentucky"], articles["itchy-skin-dogs-cats"]],
  "pet-dental-care": [articles["pet-dental-cleaning-dogs-cats"], articles["senior-pet-care-northern-kentucky"], articles["how-often-should-dogs-cats-see-vet"]],
  "pet-wellness-exams": [articles["how-often-should-dogs-cats-see-vet"], articles["first-vet-visit-puppy-kitten"], articles["senior-pet-care-northern-kentucky"], articles["microchipping-dogs-cats"]],
  "wellness-exams": [articles["how-often-should-dogs-cats-see-vet"], articles["first-vet-visit-puppy-kitten"], articles["senior-pet-care-northern-kentucky"], articles["microchipping-dogs-cats"]],
  "puppy-kitten-care": [articles["puppy-vaccines-northern-kentucky"], articles["kitten-vaccines-northern-kentucky"], articles["first-vet-visit-puppy-kitten"], articles["microchipping-dogs-cats"]],
  "senior-pet-care": [articles["senior-pet-care-northern-kentucky"], articles["healthy-weight-dogs-cats"], articles["pet-dental-cleaning-dogs-cats"], articles["why-is-my-dog-limping"]],
  "sick-pet-visits": [articles["when-to-book-sick-pet-visit"], articles["vomiting-diarrhea-dogs-cats"], articles["why-is-my-dog-coughing"], articles["why-is-my-dog-limping"]],
  "skin-ear-allergy-care": [articles["itchy-skin-dogs-cats"], articles["ear-infections-dogs-cats"], articles["flea-tick-prevention-northern-kentucky"]],
  "soft-tissue-surgery": [articles["pet-surgery-preparation"], articles["post-surgery-care-dogs-cats"]],
  "spay-neuter-surgery": [articles["pet-surgery-preparation"], articles["post-surgery-care-dogs-cats"], articles["first-vet-visit-puppy-kitten"]],
  "veterinary-diagnostics": [articles["when-to-book-sick-pet-visit"], articles["cat-litter-box-problems"], articles["dog-urinary-accidents"], articles["vomiting-diarrhea-dogs-cats"]],
};
