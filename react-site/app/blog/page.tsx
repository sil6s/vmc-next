import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { getBlogPosts } from "@/sanity/posts";

const seo = {
  title: "Pet Care Blog | Veterinary Medical Center",
  description: "Pet health articles from Veterinary Medical Center for dog and cat owners in Northern Kentucky and Greater Cincinnati."
};

export const metadata = pageMetadata({ ...seo, path: "/blog/" });

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Hero
        eyebrow="Pet Care Blog"
        title="Practical pet health resources from your local VMC team."
        body="Pet health articles from the Veterinary Medical Center team. Blog posts are managed in Sanity when available, with static fallback content for reliability."
        image="/images/vmc-social-media.jpg"
        imageAlt="Veterinary Medical Center pet care team"
        primaryCta={{ label: "Book Appointment", href: "/contact/" }}
        secondaryCta={{ label: "Explore Services", href: "/services/" }}
      />
      <Section tone="white" eyebrow="Articles" title="Recent pet health articles.">
        <div className="card-grid compact">
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <p className="eyebrow">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}/`}>Read article</Link>
            </article>
          ))}
        </div>
      </Section>
      <JsonLd data={[webpageSchema("/blog/", seo.title, seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])]} />
    </>
  );
}
