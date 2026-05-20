import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "next-sanity";
import { posts as staticPosts, type Post } from "@/data/posts";
import { getManagedBlogPost, getManagedBlogPosts, type ManagedBlogPost } from "@/lib/blog-admin";
import { client } from "./client";
import { POSTS_QUERY, POST_QUERY, RELATED_POSTS_QUERY } from "./queries";
import { sanityEnabled } from "./env";

export type SanityBlogPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  lastReviewedAt?: string;
  resourceType?: ResourceType;
  contentMode?: ContentMode;
  category?: string;
  tags?: string[];
  secondaryKeywords?: string[];
  readingTime?: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  imageCaption?: string;
  ogImageAlt?: string;
  openGraphImage?: SanityImageSource;
  openGraphImageAlt?: string;
  author?: BlogAuthor;
  reviewedBy?: BlogAuthor;
  internalLinks?: ResourceLink[];
  externalLinks?: ResourceLink[];
  bodyMarkdown?: string;
  bodyMarkdownFileUrl?: string;
  bodyMarkdownFileName?: string;
  faqMarkdown?: string;
  sourcesMarkdown?: string;
  body?: PortableTextBlock[];
};

export type ResourceType = "blog" | "education" | "clinic-news" | "faq";
export type ContentMode = "standard" | "advanced";

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
  id?: string;
  source: "sanity" | "static";
  resourceType: ResourceType;
  contentMode: ContentMode;
  title: string;
  slug: string;
  date: string;
  updatedAt?: string;
  lastReviewedAt?: string;
  category: string;
  tags: string[];
  secondaryKeywords: string[];
  readingTime?: string;
  excerpt: string;
  content?: string[];
  bodyMarkdown?: string;
  bodyMarkdownFileUrl?: string;
  bodyMarkdownFileName?: string;
  faqMarkdown?: string;
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
  sourcesMarkdown?: string;
  seo: {
    title: string;
    description: string;
    image?: string;
    canonicalUrl?: string;
  };
};

const options = { next: { revalidate: 30 } };

export const defaultBlogAuthor: BlogAuthor = {
  name: "Veterinary Medical Centers Team",
  title: "Northern Kentucky dog and cat care team",
  image: "/images/vet-stock2.jpg",
  imageAlt: "Veterinary Medical Centers team member with a pet"
};

function fromStaticPost(post: Post): BlogPost {
  return {
    source: "static",
    resourceType: "blog",
    contentMode: "standard",
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    tags: [],
    secondaryKeywords: [],
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
  const excerpt = post.excerpt || "Veterinary Medical Centers pet health article.";
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
    id: post._id,
    source: "sanity",
    resourceType: post.resourceType || "blog",
    contentMode: post.contentMode || ((post.bodyMarkdown || post.bodyMarkdownFileUrl) && !post.body?.length ? "advanced" : "standard"),
    title: post.title,
    slug: post.slug,
    date: post.publishedAt,
    updatedAt: post.updatedAt,
    lastReviewedAt: post.lastReviewedAt,
    category: post.category || "Pet Care",
    tags: post.tags || [],
    secondaryKeywords: post.secondaryKeywords || [],
    readingTime: post.readingTime,
    excerpt,
    bodyMarkdown: post.bodyMarkdown,
    bodyMarkdownFileUrl: post.bodyMarkdownFileUrl,
    bodyMarkdownFileName: post.bodyMarkdownFileName,
    faqMarkdown: post.faqMarkdown,
    body: post.body,
    image: post.image,
    featuredImage: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: post.imageAlt || `${post.title} from Veterinary Medical Centers`,
    featuredImageCaption: post.imageCaption,
    openGraphImage: post.openGraphImage,
    openGraphImageAlt: post.openGraphImageAlt,
    author,
    reviewedBy,
    internalLinks: post.internalLinks || [],
    externalLinks: post.externalLinks || [],
    sourcesMarkdown: post.sourcesMarkdown,
    seo: {
      title: post.seoTitle || `${post.title} | Veterinary Medical Centers`,
      description: post.seoDescription || excerpt,
      canonicalUrl: post.canonicalUrl
    }
  };
}

function fromManagedPost(post: ManagedBlogPost): BlogPost {
  return {
    source: "static",
    resourceType: "blog",
    contentMode: "advanced",
    title: post.title,
    slug: post.slug,
    date: post.publishDate || post.updatedAt,
    category: post.category,
    tags: [],
    secondaryKeywords: [],
    excerpt: post.excerpt,
    content: post.body.split(/\n{2,}/).filter(Boolean),
    bodyMarkdown: post.body,
    featuredImage: post.featuredImageUrl || "/images/veterinary-care-hero.jpg",
    featuredImageAlt: post.featuredImageAlt || `${post.title} from Veterinary Medical Centers`,
    author: {
      name: post.author,
      title: "Veterinary Medical Centers Team",
      image: "/images/vet-stock2.jpg",
      imageAlt: "Veterinary Medical Centers team member with a pet"
    },
    internalLinks: [],
    externalLinks: [],
    seo: {
      title: post.seoTitle || `${post.title} | Veterinary Medical Centers`,
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

async function fetchRelatedSanityPosts(post: BlogPost, limit = 3) {
  if (!sanityEnabled) return [];

  try {
    const posts = await client.fetch<SanityBlogPost[]>(
      RELATED_POSTS_QUERY,
      { slug: post.slug, category: post.category, tags: post.tags || [], limit },
      options
    );
    return posts.map(fromSanityPost);
  } catch {
    return [];
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

export async function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const relatedSanityPosts = await fetchRelatedSanityPosts(post, limit);
  if (relatedSanityPosts.length >= limit) return relatedSanityPosts.slice(0, limit);

  const latestPosts = await getBlogPosts(24);
  const seen = new Set([post.slug, ...relatedSanityPosts.map((item) => item.slug)]);
  const fallbackPosts = latestPosts
    .filter((item) => !seen.has(item.slug))
    .sort((a, b) => {
      const aScore = (a.category === post.category ? 2 : 0) + (a.tags.some((tag) => post.tags.includes(tag)) ? 1 : 0);
      const bScore = (b.category === post.category ? 2 : 0) + (b.tags.some((tag) => post.tags.includes(tag)) ? 1 : 0);
      return bScore - aScore;
    });

  return [...relatedSanityPosts, ...fallbackPosts].slice(0, limit);
}

export async function getBlogSlugs() {
  const posts = await getBlogPosts(50);
  return posts.map((post) => post.slug);
}
