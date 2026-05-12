import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";
import { urlFor } from "@/sanity/image";
import { getBlogPost, getBlogSlugs } from "@/sanity/posts";

type Params = { params: Promise<{ slug: string }> };

function displayDate(date: string) {
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({ ...post.seo, path: `/blog/${post.slug}/` });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const imageUrl = post.image ? urlFor(post.image).width(1280).height(720).fit("crop").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` }
  ];

  return (
    <>
      <div className="prose-page">
        <Container>
          <article className="blog-post-article">
            <header className="blog-post-hero">
              <div className="blog-post-heading">
                <p className="eyebrow">{post.category}</p>
                <h1>{post.title}</h1>
                <p>{post.excerpt}</p>
                <div className="blog-post-byline">
                  <Image src={post.author.image} alt={post.author.imageAlt} width={58} height={58} />
                  <div>
                    <strong>{post.author.name}</strong>
                    <span>{post.author.title}</span>
                    <small>{displayDate(post.date)}</small>
                  </div>
                </div>
              </div>
              <Image
                className="blog-post-featured-image"
                src={imageUrl}
                alt={post.featuredImageAlt}
                width={1280}
                height={720}
                priority
                sizes="(max-width: 900px) 100vw, 1040px"
              />
            </header>
            <div className="blog-post-content">
              {post.body?.length ? <PortableText value={post.body} /> : post.content?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            {post.relatedServices && post.relatedServices.length > 0 && (
              <aside className="blog-related-services" aria-label="Related veterinary services">
                <p className="eyebrow">Related Services</p>
                <h2>Related veterinary services from our Northern Kentucky team</h2>
                <ul>
                  {post.relatedServices.map((service) => (
                    <li key={service.href}>
                      <Link href={service.href}>{service.title}</Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="blog-post-cta-inline">
              <p>Have a question about your pet? Our Fort Thomas and Independence teams are here to help.</p>
              <div className="hero-actions">
                <Button href="/contact/" data-track="click_book_appointment">Request an Appointment</Button>
                <Button href="/new-patients/" variant="ghost" data-track="start_new_patient_form">New Patient Information</Button>
              </div>
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
