import { randomUUID } from "node:crypto";
import { posts as staticPosts } from "@/data/posts";
import { ensureSettingsTables, getPool, hasDatabase } from "@/lib/settings/db";

export type BlogPostStatus = "draft" | "published" | "scheduled" | "archived";

export type ManagedBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  author: string;
  category: string;
  tags: string[];
  body: string;
  seoTitle: string;
  seoMetaDescription: string;
  openGraphImage: string;
  status: BlogPostStatus;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostInput = Omit<ManagedBlogPost, "id" | "createdAt" | "updatedAt"> & { id?: string };

function normalizeStatus(value: string): BlogPostStatus {
  return ["draft", "published", "scheduled", "archived"].includes(value) ? (value as BlogPostStatus) : "draft";
}

type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  body?: string;
  seo_title?: string;
  seo_meta_description?: string;
  open_graph_image?: string;
  status: string;
  publish_date?: Date | string | null;
  created_at?: Date | string;
  updated_at?: Date | string;
};

function dateString(value?: Date | string | null) {
  if (!value) return "";
  return value instanceof Date ? value.toISOString() : value;
}

function rowToPost(row: BlogPostRow): ManagedBlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    featuredImageUrl: row.featured_image_url || "",
    featuredImageAlt: row.featured_image_alt || row.title,
    author: row.author || "Veterinary Medical Center Team",
    category: row.category || "Pet Care",
    tags: row.tags || [],
    body: row.body || "",
    seoTitle: row.seo_title || `${row.title} | Veterinary Medical Center`,
    seoMetaDescription: row.seo_meta_description || row.excerpt || "",
    openGraphImage: row.open_graph_image || row.featured_image_url || "",
    status: normalizeStatus(row.status),
    publishDate: dateString(row.publish_date),
    createdAt: dateString(row.created_at),
    updatedAt: dateString(row.updated_at)
  };
}

function staticManagedPosts(): ManagedBlogPost[] {
  return staticPosts.map((post) => ({
    id: `static-${post.slug}`,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    featuredImageUrl: post.featuredImage,
    featuredImageAlt: post.featuredImageAlt,
    author: post.author.name,
    category: post.category,
    tags: [],
    body: post.content.join("\n\n"),
    seoTitle: post.seo.title,
    seoMetaDescription: post.seo.description,
    openGraphImage: post.featuredImage,
    status: "published",
    publishDate: post.date,
    createdAt: post.date,
    updatedAt: post.date
  }));
}

export async function getManagedBlogPosts({ publicOnly = false } = {}) {
  if (!hasDatabase()) {
    return publicOnly ? staticManagedPosts().filter((post) => post.status === "published") : staticManagedPosts();
  }

  await ensureSettingsTables();
  const where = publicOnly ? "where status = 'published' and (publish_date is null or publish_date <= now())" : "";
  const result = await getPool().query(`select * from blog_posts ${where} order by coalesce(publish_date, updated_at) desc`);
  return result.rows.map(rowToPost);
}

export async function getManagedBlogPost(identifier: string) {
  if (!hasDatabase()) {
    return staticManagedPosts().find((post) => post.id === identifier || post.slug === identifier) || null;
  }

  await ensureSettingsTables();
  const result = await getPool().query("select * from blog_posts where id = $1 or slug = $1 limit 1", [identifier]);
  return result.rows[0] ? rowToPost(result.rows[0]) : null;
}

export async function saveManagedBlogPost(input: BlogPostInput, userEmail: string) {
  if (!hasDatabase()) {
    throw new Error("Persistent blog editing requires DATABASE_URL or POSTGRES_URL.");
  }

  await ensureSettingsTables();
  const id = input.id?.startsWith("static-") ? randomUUID() : input.id || randomUUID();
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("begin");
    await client.query(
      `insert into blog_posts (
        id, title, slug, excerpt, featured_image_url, featured_image_alt, author, category, tags, body,
        seo_title, seo_meta_description, open_graph_image, status, publish_date, created_by, updated_by, created_at, updated_at
      )
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$16,now(),now())
      on conflict (id) do update set
        title = excluded.title,
        slug = excluded.slug,
        excerpt = excluded.excerpt,
        featured_image_url = excluded.featured_image_url,
        featured_image_alt = excluded.featured_image_alt,
        author = excluded.author,
        category = excluded.category,
        tags = excluded.tags,
        body = excluded.body,
        seo_title = excluded.seo_title,
        seo_meta_description = excluded.seo_meta_description,
        open_graph_image = excluded.open_graph_image,
        status = excluded.status,
        publish_date = excluded.publish_date,
        updated_by = excluded.updated_by,
        updated_at = now()`,
      [
        id,
        input.title,
        input.slug,
        input.excerpt,
        input.featuredImageUrl,
        input.featuredImageAlt,
        input.author,
        input.category,
        input.tags,
        input.body,
        input.seoTitle,
        input.seoMetaDescription,
        input.openGraphImage,
        input.status,
        input.publishDate ? new Date(input.publishDate) : null,
        userEmail
      ]
    );
    await client.query(
      `insert into activity_log (user_email, action, details, status, section, setting_key, new_value)
       values ($1, $2, $3, 'success', 'blog', $4, $5::jsonb)`,
      [userEmail, input.status === "published" ? "Blog post published" : "Blog draft saved", input.title, input.slug, JSON.stringify({ id, status: input.status })]
    );
    await client.query("commit");
    return id;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
