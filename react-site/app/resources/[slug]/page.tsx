import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";
import { urlFor } from "@/sanity/image";
import { getBlogPost, getBlogSlugs, type BlogPost } from "@/sanity/posts";

type Params = { params: Promise<{ slug: string }> };

const resourceTypeLabels = {
  blog: "Blog",
  education: "Education Guide",
  "clinic-news": "Clinic News",
  faq: "FAQ Resource"
} as const;

function displayDate(date: string) {
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

function imageUrl(post: BlogPost) {
  return post.image ? urlFor(post.image).width(1280).height(720).fit("crop").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

function portableComponents(): PortableTextComponents {
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        return (
          <figure className="resource-inline-image">
            <Image
              src={urlFor(value).width(1100).height(680).fit("crop").url()}
              alt={value.alt || "Veterinary Medical Center pet care resource image"}
              width={1100}
              height={680}
              sizes="(max-width: 900px) 100vw, 800px"
            />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      }
    },
    marks: {
      internalLink: ({ value, children }) => <Link href={value?.href || "/resources/"}>{children}</Link>,
      externalLink: ({ value, children }) => (
        <a href={value?.href || "#"} target={value?.openInNewTab === false ? undefined : "_blank"} rel="noopener noreferrer">
          {children}
        </a>
      ),
      link: ({ value, children }) => {
        const href = value?.href || "#";
        const isExternal = /^https?:\/\//.test(href);
        return isExternal ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <Link href={href}>{children}</Link>;
      }
    }
  };
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const ogImage = post.openGraphImage ? urlFor(post.openGraphImage).width(1200).height(630).fit("crop").url() : undefined;
  return pageMetadata({ ...post.seo, image: ogImage, path: `/resources/${post.slug}/` });
}

export default async function ResourceArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources/" },
    { name: post.title, path: `/resources/${post.slug}/` }
  ];

  return (
    <>
      <div className="prose-page">
        <Container>
          <article className="blog-post-article">
            <header className="blog-post-hero resource-post-hero">
              <div className="blog-post-heading">
                <p className="eyebrow">{resourceTypeLabels[post.resourceType]} · {post.category}</p>
                <h1>{post.title}</h1>
                <p>{post.excerpt}</p>
                <div className="resource-article-meta">
                  <div className="blog-post-byline">
                    <Image src={post.author.image} alt={post.author.imageAlt} width={58} height={58} />
                    <div>
                      <strong>{post.author.name}</strong>
                      <span>{post.author.credentials || post.author.title}</span>
                      <small>Published {displayDate(post.date)}{post.readingTime ? ` · ${post.readingTime}` : ""}</small>
                    </div>
                  </div>
                  {post.reviewedBy && (
                    <div className="blog-post-byline">
                      <Image src={post.reviewedBy.image} alt={post.reviewedBy.imageAlt} width={58} height={58} />
                      <div>
                        <strong>Reviewed by {post.reviewedBy.name}</strong>
                        <span>{post.reviewedBy.credentials || post.reviewedBy.title}</span>
                        {post.lastReviewedAt && <small>Reviewed {displayDate(post.lastReviewedAt)}</small>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <figure className="resource-featured-figure">
                <Image
                  className="blog-post-featured-image"
                  src={imageUrl(post)}
                  alt={post.featuredImageAlt}
                  width={1280}
                  height={720}
                  priority
                  sizes="(max-width: 900px) 100vw, 1040px"
                />
                {post.featuredImageCaption && <figcaption>{post.featuredImageCaption}</figcaption>}
              </figure>
            </header>

            <div className="resource-article-layout">
              <div className="blog-post-content">
                {post.body?.length ? <PortableText value={post.body} components={portableComponents()} /> : post.content?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {(post.internalLinks.length > 0 || post.externalLinks.length > 0 || post.tags.length > 0) && (
                <aside className="resource-article-sidebar" aria-label="Related resource links">
                  {post.internalLinks.length > 0 && (
                    <section>
                      <h2>Related VMC Resources</h2>
                      {post.internalLinks.map((link) => <Link href={link.href} key={`${link.href}-${link.label}`}>{link.label}</Link>)}
                    </section>
                  )}
                  {post.externalLinks.length > 0 && (
                    <section>
                      <h2>Trusted References</h2>
                      {post.externalLinks.map((link) => <a href={link.href} target="_blank" rel="noopener noreferrer" key={`${link.href}-${link.label}`}>{link.label}{link.source ? <small>{link.source}</small> : null}</a>)}
                    </section>
                  )}
                  {post.tags.length > 0 && (
                    <section>
                      <h2>Topics</h2>
                      <div className="resource-tag-list">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </section>
                  )}
                </aside>
              )}
            </div>
          </article>
        </Container>
      </div>
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />
      <CTASection title="Need veterinary care instead of an article?" body="If something is going on with your pet, call either clinic or send us a message so we can help you choose the safest next step." />
      <JsonLd data={[articleSchema(post), breadcrumbSchema(crumbs)]} />
    </>
  );
}
