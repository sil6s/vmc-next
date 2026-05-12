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
    excerpt: "A practical guide to wellness exam timing for puppies, kittens, adult pets, and seniors.",
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
      "If your pet has new symptoms, behavior changes, appetite changes, weight loss, limping, coughing, vomiting, or litter box changes, call sooner rather than waiting for the annual visit."
    ],
    seo: {
      title: "How Often Should My Pet See the Vet? | VMC",
      description: "Learn how often dogs and cats should see a veterinarian for wellness exams, vaccines, and senior care."
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
      "Tell our team if your cat is fearful or has had stressful visits before. We can help with arrival timing, handling preferences, and other low-stress options."
    ],
    seo: {
      title: "Preparing Your Cat for a Less Stressful Vet Visit | VMC",
      description: "Carrier training and visit-prep tips for cat owners in Northern Kentucky."
    }
  }
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
