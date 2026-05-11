import { testimonials } from "@/data/testimonials";
import { Section } from "@/components/ui/Section";

export function TestimonialGrid() {
  return (
    <Section tone="cream" eyebrow="Client Reviews" title="What our community says.">
      <div className="reviews-header">
        <strong>4.8 average rating</strong>
        <span>Google reviews from Fort Thomas and Independence pet families</span>
      </div>
      <div className="review-grid">
        {testimonials.map((review) => (
          <article className="review-card" key={review.name}>
            <div className="stars" aria-label="5 out of 5 stars">*****</div>
            <p>{review.text}</p>
            <div>
              <span>{review.initials}</span>
              <strong>{review.name}</strong>
              <small>{review.location}</small>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
