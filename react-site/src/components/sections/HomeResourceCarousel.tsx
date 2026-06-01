"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type HomeResourcePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  readingTime: string;
};

export function HomeResourceCarousel({ posts, total }: { posts: HomeResourcePost[]; total: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const extra = total - posts.length;

  function scroll(dir: "left" | "right") {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector<HTMLElement>(".home-resource-card");
    const gap = 20;
    const w = card ? card.offsetWidth + gap : 360;
    trackRef.current.scrollBy({ left: dir === "right" ? w : -w, behavior: "smooth" });
  }

  return (
    <div className="home-resource-carousel">
      <div className="home-resource-track" ref={trackRef}>
        {posts.map((post) => (
          <article className="home-resource-card" key={post.slug}>
            <Link className="home-resource-thumb" href={`/resources/${post.slug}/`} tabIndex={-1} aria-hidden="true">
              <Image
                src={post.imageUrl}
                alt=""
                fill
                sizes="(max-width: 700px) 90vw, 340px"
              />
            </Link>
            <div className="home-resource-body">
              <p className="eyebrow">{post.category}</p>
              <h3>
                <Link href={`/resources/${post.slug}/`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
              <Link className="text-link" href={`/resources/${post.slug}/`}>
                Read guide
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="home-resource-footer">
        <div className="home-resource-nav" aria-label="Scroll guides">
          <button
            type="button"
            className="home-resource-arrow"
            onClick={() => scroll("left")}
            aria-label="Previous guides"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            className="home-resource-arrow"
            onClick={() => scroll("right")}
            aria-label="Next guides"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
        <Link className="home-resource-view-all" href="/resources/">
          View {extra > 0 ? `this and ${extra} more` : "all"} pet care guides →
        </Link>
      </div>
    </div>
  );
}
