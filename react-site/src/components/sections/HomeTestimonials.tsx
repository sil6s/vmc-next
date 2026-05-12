import Image from "next/image";
import { PawPrint, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

const pawstimonials = [
  {
    pet: "Edith",
    owner: "Edith’s pet parent",
    community: "Northern Kentucky",
    quote: "The team made Edith’s visit feel calm and easy. I left knowing exactly what was going on and what to do next.",
    image: "/images/edith-testo.jpg",
    alt: "Edith, a Veterinary Medical Center pet patient in Northern Kentucky"
  },
  {
    pet: "Ezra",
    owner: "Ezra’s pet parent",
    community: "Fort Thomas",
    quote: "They took time to answer every question and explain the plan in a way that made sense.",
    image: "/images/ezra-testo.jpg",
    alt: "Ezra, a Veterinary Medical Center pet patient near Fort Thomas"
  },
  {
    pet: "Marshall",
    owner: "Marshall’s pet parent",
    community: "Independence",
    quote: "From the front desk to the exam room, everyone was kind, patient, and helpful.",
    image: "/images/marshall-testo.jpg",
    alt: "Marshall, a Veterinary Medical Center pet patient near Independence"
  },
  {
    pet: "Wilson",
    owner: "Wilson’s pet parent",
    community: "NKY",
    quote: "I appreciate having a local vet team that remembers my pet and treats us like neighbors.",
    image: "/images/wilson-testo.jpg",
    alt: "Wilson, a Veterinary Medical Center pet patient receiving local Northern Kentucky vet care"
  }
];

export function HomeTestimonials() {
  return (
    <div className="pawstimonials">
      <div className="pawstimonial-grid">
        {pawstimonials.map((item) => (
          <article className="pawstimonial-card" key={item.pet}>
            <div className="pawstimonial-image">
              <Image src={item.image} alt={item.alt} width={520} height={340} sizes="(max-width: 720px) 100vw, 25vw" />
              <span aria-hidden="true">
                <PawPrint size={17} />
              </span>
            </div>
            <div className="pawstimonial-body">
              <div className="pawstimonial-stars" aria-label="Positive client feedback">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={13} fill="currentColor" />
                ))}
              </div>
              <h3>{item.pet}</h3>
              <p>“{item.quote}”</p>
              <small>{item.owner} · {item.community}</small>
            </div>
          </article>
        ))}
      </div>
      <div className="pawstimonial-cta">
        <div>
          <h3>Want your pet to be part of our story?</h3>
          <p>Start with an appointment or message our team with questions about the right next step.</p>
        </div>
        <div className="hero-actions">
          <Button href="/contact/">Request an Appointment</Button>
          <Button href="/contact/#chat-support" variant="ghost">Message Our Team</Button>
        </div>
      </div>
    </div>
  );
}
