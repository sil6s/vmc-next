import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
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
  const imageUrl = post.image ? urlFor(post.image).width(1100).height(620).fit("crop").url() : null;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` }
  ];

  return (
    <>
      <div className="prose-page">
        <Container>
          <article>
            <p className="eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <p>{displayDate(post.date)}</p>
            {imageUrl && <Image src={imageUrl} alt={post.title} width={1100} height={620} sizes="(max-width: 900px) 100vw, 860px" />}
            {post.body?.length ? <PortableText value={post.body} /> : post.content?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        </Container>
      </div>
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />
      <CTASection title="Need veterinary care instead of an article?" body="If something is going on with your pet, call either clinic or send us a message so we can help you choose the safest next step." />
      <JsonLd data={[articleSchema(post), breadcrumbSchema(crumbs)]} />
    </>
  );
}
