import Image from "next/image";
import Link from "next/link";

export type HomeResourcePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  readingTime: string;
};

export function HomeResourceCarousel({ posts }: { posts: HomeResourcePost[]; total: number }) {
  return (
    <div className="home-resource-carousel">
      <div className="home-resource-track">
        {posts.map((post) => (
          <article className="home-resource-card" key={post.slug}>
            <Link className="home-resource-thumb" href={`/resources/${post.slug}/`} tabIndex={-1} aria-hidden="true">
              <Image src={post.imageUrl} alt={post.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" />
            </Link>
            <div className="home-resource-body">
              <p className="eyebrow">{post.category}</p>
              <h3><Link href={`/resources/${post.slug}/`}>{post.title}</Link></h3>
              <p>{post.excerpt}</p>
              <Link className="text-link" href={`/resources/${post.slug}/`}>Read guide</Link>
            </div>
          </article>
        ))}
      </div>
      <Link className="home-resource-view-all" href="/resources/">View all pet care guides →</Link>
    </div>
  );
}
