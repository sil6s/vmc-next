import { Heart, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const pawstimonials = [
  { pet: "Edith", community: "Northern Kentucky", image: "/images/edith-testo.jpg", alt: "Edith, a Veterinary Medical Centers pet patient in Northern Kentucky" },
  { pet: "Ezra", community: "Fort Thomas", image: "/images/ezra-testo.jpg", alt: "Ezra, a Veterinary Medical Centers pet patient near Fort Thomas" },
  { pet: "Marshall", community: "Independence", image: "/images/marshall-testo.jpg", alt: "Marshall, a Veterinary Medical Centers pet patient near Independence" },
  { pet: "Wilson", community: "Northern Kentucky", image: "/images/wilson-testo.jpg", alt: "Wilson, a Veterinary Medical Centers pet patient in Northern Kentucky" }
];

const reviews = [
  {
    name: "Jacob S.",
    quote: "We take all of our pets here and the staff is outstanding. They stagger the schedule, so the office never feels crowded or stressful for dogs.",
    location: "Northern Kentucky"
  },
  {
    name: "Everett S.",
    quote: "This team did an incredible job with our cat’s rabies vaccine. Their patience, expertise, and grit were seriously impressive.",
    location: "Northern Kentucky"
  },
  {
    name: "Sandra G.",
    quote: "The Independence team was friendly, informative, and kind to my pet and me. It is wonderful to have found a permanent place for our care.",
    location: "Independence"
  }
];

export function HomeTestimonials() {
  return (
    <div className="home-review-story">
      <div className="home-review-grid">
        {reviews.map((review) => (
          <article className="home-review-card" key={review.name}>
            <div className="home-review-card-top">
              <span className="home-review-heart" aria-hidden="true"><Heart size={16} fill="currentColor" /></span>
              <Quote aria-hidden="true" size={24} strokeWidth={1.6} />
            </div>
            <div className="home-review-stars" role="img" aria-label="Five star rating">
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}
            </div>
            <p>“{review.quote}”</p>
            <footer><strong>{review.name}</strong><span>{review.location} · Google review</span></footer>
          </article>
        ))}
      </div>
      <div className="home-review-cta">
        <div>
          <h3>Care that pets and people can feel good about.</h3>
          <p>Every visit is a chance to listen closely, explain clearly, and make the next step feel manageable.</p>
        </div>
        <Button href="/book-appointment/">Book an Appointment</Button>
      </div>
    </div>
  );
}
