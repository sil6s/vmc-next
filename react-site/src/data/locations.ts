import type { FAQ } from "./faqs";

export type LocationPage = {
  title: string;
  slug: string;
  keyword: string;
  address: string;
  phone: string;
  tel: string;
  image: string;
  imageAlt: string;
  intro: string;
  areas: string[];
  highlights: string[];
  body: string[];
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
  };
};

export const locations: LocationPage[] = [
  {
    title: "Vet in Fort Thomas KY",
    slug: "fort-thomas",
    keyword: "vet in Fort Thomas KY",
    address: "2000 Memorial Parkway, Fort Thomas, KY 41075",
    phone: "(859) 442-4420",
    tel: "+18594424420",
    image: "/images/fort-thomas-clinic.jpg",
    imageAlt: "Veterinary Medical Center Fort Thomas location on Memorial Parkway",
    intro:
      "Veterinary Medical Center is a vet in Fort Thomas KY families choose for local, independently owned veterinary care close to home.",
    areas: ["Fort Thomas", "Highland Heights", "Bellevue", "Newport", "Dayton", "Cold Spring", "Southgate", "Campbell County"],
    highlights: ["Locally owned and women-led", "Memorial Parkway location", "Fear-Free handling", "Full-service dog and cat care"],
    body: [
      "Our Fort Thomas clinic serves dogs and cats from river city neighborhoods and nearby Campbell County communities. Families choose this location for wellness exams, vaccinations, dental care, surgery, behavior discussions, and urgent concerns during clinic hours.",
      "Because we are locally owned, care decisions stay close to the people and pets we serve. You can expect clear communication, practical recommendations, and a team that gets to know your pet over time."
    ],
    faqs: [
      { question: "Where is your Fort Thomas vet clinic?", answer: "VMC Fort Thomas is located at 2000 Memorial Parkway, Fort Thomas, KY 41075." },
      { question: "Do you serve pets from Newport and Bellevue?", answer: "Yes. Many families visit us from Newport, Bellevue, Dayton, Highland Heights, Cold Spring, and nearby areas." }
    ],
    seo: {
      title: "Vet in Fort Thomas KY | Veterinary Medical Center",
      description: "Need a vet in Fort Thomas KY? Visit locally owned VMC on Memorial Parkway for trusted dog and cat care near Highland Heights and Newport."
    }
  },
  {
    title: "Vet in Independence KY",
    slug: "independence",
    keyword: "vet in Independence KY",
    address: "4147 Madison Pike, Independence, KY 41051",
    phone: "(859) 356-2242",
    tel: "+18593562242",
    image: "/images/independence-clinic.jpg",
    imageAlt: "Veterinary Medical Center Independence location on Madison Pike",
    intro:
      "Veterinary Medical Center serves Independence KY families with compassionate, practical dog and cat care on Madison Pike.",
    areas: ["Independence", "Taylor Mill", "Kenton County", "Covington", "Latonia", "Ryland Heights", "Edgewood", "Erlanger"],
    highlights: ["Madison Pike access", "Full-service care", "Clear recommendations", "Relationship-based veterinary medicine"],
    body: [
      "Our Independence location supports central Northern Kentucky pet owners with preventive care, medical exams, dental cleanings, soft tissue surgery, and urgent same-day guidance when available.",
      "The care experience is built around communication and continuity. We help you understand what we see, what matters now, and what can be monitored over time."
    ],
    faqs: [
      { question: "Where is your Independence vet clinic?", answer: "VMC Independence is located at 4147 Madison Pike, Independence, KY 41051." },
      { question: "Do you serve Covington and Taylor Mill?", answer: "Yes. We regularly care for pets from Independence, Covington, Taylor Mill, Latonia, Edgewood, Erlanger, and surrounding communities." }
    ],
    seo: {
      title: "Vet in Independence KY | Veterinary Medical Center",
      description: "Need a vet in Independence KY? Visit locally owned VMC on Madison Pike for full-service dog and cat care in Northern Kentucky."
    }
  }
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
