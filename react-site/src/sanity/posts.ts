import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import { posts as staticPosts, type Post } from "@/data/posts";
import { client } from "./client";
import { POSTS_QUERY, POST_QUERY } from "./queries";
import { sanityEnabled } from "./env";

export type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  image?: SanityImageSource;
  body?: PortableTextBlock[];
};

export type BlogPost = {
  source: "sanity" | "static";
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string[];
  body?: PortableTextBlock[];
  image?: SanityImageSource;
  seo: {
    title: string;
    description: string;
  };
};

const options = { next: { revalidate: 30 } };

function fromStaticPost(post: Post): BlogPost {
  return {
    source: "static",
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    content: post.content,
    seo: post.seo
  };
}

function fromSanityPost(post: SanityBlogPost): BlogPost {
  const excerpt = post.excerpt || "Veterinary Medical Center pet health article.";

  return {
    source: "sanity",
    title: post.title,
    slug: post.slug,
    date: post.publishedAt,
    category: "Pet Care",
    excerpt,
    body: post.body,
    image: post.image,
    seo: {
      title: `${post.title} | Veterinary Medical Center`,
      description: excerpt
    }
  };
}

async function fetchSanityPosts(limit = 12) {
  if (!sanityEnabled) return [];

  try {
    const posts = await client.fetch<SanityBlogPost[]>(POSTS_QUERY, { limit }, options);
    return posts.map(fromSanityPost);
  } catch {
    return [];
  }
}

async function fetchSanityPost(slug: string) {
  if (!sanityEnabled) return null;

  try {
    const post = await client.fetch<SanityBlogPost | null>(POST_QUERY, { slug }, options);
    return post ? fromSanityPost(post) : null;
  } catch {
    return null;
  }
}

export async function getBlogPosts(limit = 12) {
  const sanityPosts = await fetchSanityPosts(limit);
  return sanityPosts.length ? sanityPosts : staticPosts.slice(0, limit).map(fromStaticPost);
}

export async function getBlogPost(slug: string) {
  const sanityPost = await fetchSanityPost(slug);
  if (sanityPost) return sanityPost;

  const staticPost = staticPosts.find((post) => post.slug === slug);
  return staticPost ? fromStaticPost(staticPost) : null;
}

export async function getBlogSlugs() {
  const posts = await getBlogPosts(50);
  return posts.map((post) => post.slug);
}
