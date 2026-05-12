import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { urlFor } from "@/sanity/image";
import { getBlogPosts, type BlogPost } from "@/sanity/posts";

const seo = {
  title: "Pet Care Blog | Veterinary Medical Center",
  description: "Pet health articles from Veterinary Medical Center for dog and cat owners in Northern Kentucky and Greater Cincinnati."
};

export const metadata = pageMetadata({ ...seo, path: "/blog/" });

function featuredImageUrl(post: BlogPost) {
  return post.image ? urlFor(post.image).width(760).height(460).fit("crop").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Hero
        eyebrow="Pet Care Blog"
        title="Practical pet health resources from your local VMC team."
        body="Helpful dog and cat care guides from the Veterinary Medical Center team, written for Northern Kentucky pet owners who want clear next steps."
        image="/images/northern-kentucky-vet-hero.jpg"
        imageAlt="Veterinary Medical Center team providing dog and cat care in Northern Kentucky"
        primaryCta={{ label: "Book Appointment", href: "/contact/" }}
        secondaryCta={{ label: "Explore Services", href: "/services/" }}
      />
      <Section tone="white" eyebrow="Articles" title="Recent pet health articles.">
        <div className="blog-card-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <Link className="blog-card-image" href={`/blog/${post.slug}/`} aria-label={`Read ${post.title}`}>
                <Image src={featuredImageUrl(post)} alt={post.featuredImageAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 380px" />
              </Link>
              <div className="blog-card-body">
                <p className="eyebrow">{post.category}</p>
                <h3>
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <div className="blog-author-row">
                  <Image src={post.author.image} alt={post.author.imageAlt} width={42} height={42} />
                  <div>
                    <strong>{post.author.name}</strong>
                    <span>{post.author.title}</span>
                  </div>
                </div>
                <Link className="text-link" href={`/blog/${post.slug}/`}>
                  Read guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <JsonLd data={[webpageSchema("/blog/", seo.title, seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])]} />
    </>
  );
}
