import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import { posts as staticPosts, type Post } from "@/data/posts";
import { getManagedBlogPost, getManagedBlogPosts, type ManagedBlogPost } from "@/lib/blog-admin";
import { client } from "./client";
import { POSTS_QUERY, POST_QUERY } from "./queries";
import { sanityEnabled } from "./env";

export type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category?: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  author?: BlogAuthor;
  body?: PortableTextBlock[];
};

export type BlogAuthor = {
  name: string;
  title: string;
  image: string;
  imageAlt: string;
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
  featuredImage?: string;
  featuredImageAlt: string;
  author: BlogAuthor;
  seo: {
    title: string;
    description: string;
  };
};

const options = { next: { revalidate: 30 } };

export const defaultBlogAuthor: BlogAuthor = {
  name: "Veterinary Medical Center Team",
  title: "Northern Kentucky dog and cat care team",
  image: "/images/vet-stock2.jpg",
  imageAlt: "Veterinary Medical Center team member with a pet"
};

function fromStaticPost(post: Post): BlogPost {
  return {
    source: "static",
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    featuredImageAlt: post.featuredImageAlt,
    author: post.author,
    seo: post.seo
  };
}

function fromSanityPost(post: SanityBlogPost): BlogPost {
  const excerpt = post.excerpt || "Veterinary Medical Center pet health article.";
  const author = post.author
    ? {
        name: post.author.name || defaultBlogAuthor.name,
        title: post.author.title || defaultBlogAuthor.title,
        image: post.author.image || defaultBlogAuthor.image,
        imageAlt: post.author.imageAlt || defaultBlogAuthor.imageAlt
      }
    : defaultBlogAuthor;

  return {
    source: "sanity",
    title: post.title,
    slug: post.slug,
    date: post.publishedAt,
    category: post.category || "Pet Care",
    excerpt,
    body: post.body,
    image: post.image,
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: post.imageAlt || `${post.title} from Veterinary Medical Center`,
    author,
    seo: {
      title: post.seoTitle || `${post.title} | Veterinary Medical Center`,
      description: post.seoDescription || excerpt
    }
  };
}

function fromManagedPost(post: ManagedBlogPost): BlogPost {
  return {
    source: "static",
    title: post.title,
    slug: post.slug,
    date: post.publishDate || post.updatedAt,
    category: post.category,
    excerpt: post.excerpt,
    content: post.body.split(/\n{2,}/).filter(Boolean),
    featuredImage: post.featuredImageUrl || "/images/veterinary-care-hero.jpg",
    featuredImageAlt: post.featuredImageAlt || `${post.title} from Veterinary Medical Center`,
    author: {
      name: post.author,
      title: "Veterinary Medical Center Team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Center team member with a pet"
    },
    seo: {
      title: post.seoTitle || `${post.title} | Veterinary Medical Center`,
      description: post.seoMetaDescription || post.excerpt
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
  if (sanityPosts.length) return sanityPosts;

  const managedPosts = await getManagedBlogPosts({ publicOnly: true });
  if (managedPosts.length) {
    return managedPosts.slice(0, limit).map(fromManagedPost);
  }

  return staticPosts.slice(0, limit).map(fromStaticPost);
}

export async function getBlogPost(slug: string) {
  const sanityPost = await fetchSanityPost(slug);
  if (sanityPost) return sanityPost;

  const managedPost = await getManagedBlogPost(slug);
  if (managedPost?.status === "published") return fromManagedPost(managedPost);

  const staticPost = staticPosts.find((post) => post.slug === slug);
  return staticPost ? fromStaticPost(staticPost) : null;
}

export async function getBlogSlugs() {
  const posts = await getBlogPosts(50);
  return posts.map((post) => post.slug);
}
