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
  updatedAt?: string;
  lastReviewedAt?: string;
  resourceType?: ResourceType;
  category?: string;
  tags?: string[];
  readingTime?: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  imageCaption?: string;
  openGraphImage?: SanityImageSource;
  openGraphImageAlt?: string;
  author?: BlogAuthor;
  reviewedBy?: BlogAuthor;
  internalLinks?: ResourceLink[];
  externalLinks?: ResourceLink[];
  body?: PortableTextBlock[];
};

export type ResourceType = "blog" | "education" | "clinic-news" | "faq";

export type BlogAuthor = {
  name: string;
  title: string;
  image: string;
  imageAlt: string;
  credentials?: string;
  bio?: string;
  slug?: string;
};

export type ResourceLink = {
  label: string;
  href: string;
  source?: string;
};

export type BlogPost = {
  source: "sanity" | "static";
  resourceType: ResourceType;
  title: string;
  slug: string;
  date: string;
  updatedAt?: string;
  lastReviewedAt?: string;
  category: string;
  tags: string[];
  readingTime?: string;
  excerpt: string;
  content?: string[];
  body?: PortableTextBlock[];
  image?: SanityImageSource;
  featuredImage?: string;
  featuredImageAlt: string;
  featuredImageCaption?: string;
  openGraphImage?: SanityImageSource;
  openGraphImageAlt?: string;
  author: BlogAuthor;
  reviewedBy?: BlogAuthor;
  internalLinks: ResourceLink[];
  externalLinks: ResourceLink[];
  seo: {
    title: string;
    description: string;
    image?: string;
    canonicalUrl?: string;
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
    resourceType: "blog",
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    tags: [],
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    featuredImageAlt: post.featuredImageAlt,
    author: post.author,
    internalLinks: [],
    externalLinks: [],
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
        imageAlt: post.author.imageAlt || defaultBlogAuthor.imageAlt,
        credentials: post.author.credentials,
        bio: post.author.bio,
        slug: post.author.slug
      }
    : defaultBlogAuthor;
  const reviewedBy = post.reviewedBy
    ? {
        name: post.reviewedBy.name || defaultBlogAuthor.name,
        title: post.reviewedBy.title || defaultBlogAuthor.title,
        image: post.reviewedBy.image || defaultBlogAuthor.image,
        imageAlt: post.reviewedBy.imageAlt || defaultBlogAuthor.imageAlt,
        credentials: post.reviewedBy.credentials,
        bio: post.reviewedBy.bio,
        slug: post.reviewedBy.slug
      }
    : undefined;

  return {
    source: "sanity",
    resourceType: post.resourceType || "blog",
    title: post.title,
    slug: post.slug,
    date: post.publishedAt,
    updatedAt: post.updatedAt,
    lastReviewedAt: post.lastReviewedAt,
    category: post.category || "Pet Care",
    tags: post.tags || [],
    readingTime: post.readingTime,
    excerpt,
    body: post.body,
    image: post.image,
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: post.imageAlt || `${post.title} from Veterinary Medical Center`,
    featuredImageCaption: post.imageCaption,
    openGraphImage: post.openGraphImage,
    openGraphImageAlt: post.openGraphImageAlt,
    author,
    reviewedBy,
    internalLinks: post.internalLinks || [],
    externalLinks: post.externalLinks || [],
    seo: {
      title: post.seoTitle || `${post.title} | Veterinary Medical Center`,
      description: post.seoDescription || excerpt,
      canonicalUrl: post.canonicalUrl
    }
  };
}

function fromManagedPost(post: ManagedBlogPost): BlogPost {
  return {
    source: "static",
    resourceType: "blog",
    title: post.title,
    slug: post.slug,
    date: post.publishDate || post.updatedAt,
    category: post.category,
    tags: [],
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
    internalLinks: [],
    externalLinks: [],
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
