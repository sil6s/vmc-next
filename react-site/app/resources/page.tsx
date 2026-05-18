import Image from "next/image";
import Link from "next/link";
import { BookOpenText, GraduationCap, Newspaper } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { urlFor } from "@/sanity/image";
import { getBlogPosts, type BlogPost, type ResourceType } from "@/sanity/posts";

const seo = {
  title: "Pet Health Resources | Veterinary Medical Center",
  description: "Pet health articles, education guides, and clinic resources from Veterinary Medical Center for dog and cat owners in Northern Kentucky."
};

const resourceTypeLabels: Record<ResourceType, string> = {
  blog: "Blog",
  education: "Education",
  "clinic-news": "Clinic News",
  faq: "FAQ"
};

const resourceTypeIcons: Record<ResourceType, typeof BookOpenText> = {
  blog: BookOpenText,
  education: GraduationCap,
  "clinic-news": Newspaper,
  faq: BookOpenText
};

export const metadata = pageMetadata({ ...seo, path: "/resources/" });

function featuredImageUrl(post: BlogPost) {
  return post.image ? urlFor(post.image).width(760).height(460).fit("crop").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

export default async function ResourcesPage() {
  const posts = await getBlogPosts(24);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Hero
        eyebrow="Resources"
        title="Pet health education, clinic updates, and practical care guides."
        body="Explore articles from Veterinary Medical Center for Northern Kentucky dog and cat owners, including wellness guidance, first-visit education, dental care, puppy and kitten care, senior pet support, and clinic updates."
        image="/images/northern-kentucky-vet-hero.jpg"
        imageAlt="Veterinary Medical Center team providing dog and cat care in Northern Kentucky"
        primaryCta={{ label: "Book Appointment", href: "/book-appointment/" }}
        secondaryCta={{ label: "Explore Services", href: "/services/" }}
      />

      {featured && (
        <Section tone="white" eyebrow="Featured Resource" title="Start with this guide.">
          <article className="resource-featured-article">
            <Link className="resource-featured-image" href={`/resources/${featured.slug}/`} aria-label={`Read ${featured.title}`}>
              <Image src={featuredImageUrl(featured)} alt={featured.featuredImageAlt} fill sizes="(max-width: 900px) 100vw, 520px" />
            </Link>
            <div>
              <p className="eyebrow">{resourceTypeLabels[featured.resourceType]} · {featured.category}</p>
              <h3><Link href={`/resources/${featured.slug}/`}>{featured.title}</Link></h3>
              <p>{featured.excerpt}</p>
              <div className="resource-meta-row">
                <Image src={featured.author.image} alt={featured.author.imageAlt} width={44} height={44} />
                <span><strong>{featured.author.name}</strong><small>{featured.readingTime || "Pet care resource"}</small></span>
              </div>
              <Link className="text-link" href={`/resources/${featured.slug}/`}>Read resource</Link>
            </div>
          </article>
        </Section>
      )}

      <Section tone="cream" eyebrow="Browse Resources" title="Articles and education for pet owners.">
        <div className="resource-type-strip" aria-label="Resource types">
          {Object.entries(resourceTypeLabels).map(([type, label]) => {
            const Icon = resourceTypeIcons[type as ResourceType];
            return (
              <span key={type}>
                <Icon aria-hidden="true" size={17} />
                {label}
              </span>
            );
          })}
        </div>
        <div className="blog-card-grid">
          {(featured ? rest : posts).map((post) => (
            <article className="blog-card" key={post.slug}>
              <Link className="blog-card-image" href={`/resources/${post.slug}/`} aria-label={`Read ${post.title}`}>
                <Image src={featuredImageUrl(post)} alt={post.featuredImageAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 380px" />
              </Link>
              <div className="blog-card-body">
                <p className="eyebrow">{resourceTypeLabels[post.resourceType]} · {post.category}</p>
                <h3>
                  <Link href={`/resources/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <div className="blog-author-row">
                  <Image src={post.author.image} alt={post.author.imageAlt} width={42} height={42} />
                  <div>
                    <strong>{post.author.name}</strong>
                    <span>{post.readingTime || post.author.title}</span>
                  </div>
                </div>
                <Link className="text-link" href={`/resources/${post.slug}/`}>
                  Read guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <JsonLd data={[webpageSchema("/resources/", seo.title, seo.description), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources/" }])]} />
    </>
  );
}
