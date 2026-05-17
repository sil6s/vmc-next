"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-auth";
import { saveManagedBlogPost } from "@/lib/blog-admin";

const optionalUrl = z
  .string()
  .trim()
  .refine((value) => !value || value.startsWith("/") || /^https?:\/\//i.test(value), "Use a full https:// URL or a site path that starts with /.");

const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Title is required."),
  slug: z.string().trim().min(3, "Slug is required.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL slug."),
  excerpt: z.string().trim().min(20, "Excerpt is required."),
  featuredImageUrl: optionalUrl,
  featuredImageAlt: z.string().trim(),
  author: z.string().trim().min(2),
  category: z.string().trim().min(2),
  tags: z.array(z.string().trim()).default([]),
  body: z.string().trim().min(80, "Body content is required before publishing."),
  seoTitle: z.string().trim().min(3),
  seoMetaDescription: z.string().trim().min(20).max(180),
  openGraphImage: optionalUrl,
  status: z.enum(["draft", "published", "scheduled", "archived"]),
  publishDate: z.string().trim()
});

export async function saveBlogPost(input: unknown) {
  const admin = await requireAdminSession();
  const parsed = blogPostSchema.parse(input);

  try {
    const id = await saveManagedBlogPost(parsed, admin.email);
    revalidatePath("/blog/");
    revalidatePath(`/blog/${parsed.slug}/`);
    revalidatePath("/dashboard/");
    revalidatePath("/dashboard/blog/");
    revalidatePath("/dashboard/activity/");
    return { ok: true, message: parsed.status === "published" ? "Blog post published successfully." : "Blog post saved successfully.", id };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Unable to save blog post." };
  }
}
