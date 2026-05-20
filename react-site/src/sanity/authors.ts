import { defaultBlogAuthor, type BlogAuthor, type ResourceType } from "./posts";
import { client } from "./client";
import { sanityEnabled } from "./env";
import { AUTHOR_OPTIONS_QUERY, AUTHOR_QUERY, AUTHOR_SLUGS_QUERY } from "./queries";

type SanityAuthorPost = {
  title: string;
  slug: string;
  publishedAt?: string;
  category?: string;
  resourceType?: ResourceType;
  excerpt?: string;
};

export type AuthorProfile = BlogAuthor & {
  posts: SanityAuthorPost[];
};

export type ResourceAuthorOption = {
  _id: string;
  name: string;
  title?: string;
  credentials?: string;
  slug?: string;
};

const options = { next: { revalidate: 30 } };

function compactCredentials(credentials?: string) {
  if (!credentials) return undefined;
  const parenthetical = credentials.match(/\(([A-Z][A-Z.,\s&-]{1,20})\)/);
  if (parenthetical?.[1]) return parenthetical[1].trim();
  return /^[A-Z][A-Z.,\s&-]{1,20}$/.test(credentials.trim()) ? credentials.trim() : undefined;
}

export function authorDisplayName(author: Pick<BlogAuthor, "name" | "credentials">) {
  const credentials = compactCredentials(author.credentials);
  if (!credentials) return author.name;
  const normalizedName = author.name.toLowerCase();
  const normalizedCredentials = credentials.toLowerCase();
  return normalizedName.includes(normalizedCredentials) ? author.name : `${author.name}, ${credentials}`;
}

export function authorTitleLine(author: Pick<BlogAuthor, "credentials" | "title">) {
  const shouldShowCredentialsBelow = Boolean(author.credentials) && !compactCredentials(author.credentials);
  return [shouldShowCredentialsBelow ? author.credentials : undefined, author.title].filter(Boolean).join(" | ");
}

export function authorProfilePath(author: Pick<BlogAuthor, "slug">) {
  return author.slug ? `/resources/authors/${author.slug}/` : undefined;
}

export async function getAuthorProfile(slug: string) {
  if (!sanityEnabled) return null;

  try {
    const author = await client.fetch<AuthorProfile | null>(AUTHOR_QUERY, { slug }, options);
    if (!author) return null;

    return {
      ...author,
      title: author.title || defaultBlogAuthor.title,
      image: author.image || defaultBlogAuthor.image,
      imageAlt: author.imageAlt || defaultBlogAuthor.imageAlt,
      posts: author.posts || []
    };
  } catch {
    return null;
  }
}

export async function getAuthorSlugs() {
  if (!sanityEnabled) return [];

  try {
    const authors = await client.fetch<Array<{ slug?: string }>>(AUTHOR_SLUGS_QUERY, {}, options);
    return authors.map((author) => author.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}

export async function getResourceAuthorOptions() {
  if (!sanityEnabled) return [];

  try {
    return await client.fetch<ResourceAuthorOption[]>(AUTHOR_OPTIONS_QUERY, {}, options);
  } catch {
    return [];
  }
}
