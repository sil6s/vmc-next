"use client";

import { useMemo, useState, useTransition } from "react";
import { Eye, Save, Send } from "lucide-react";
import { saveBlogPost } from "@/lib/blog-actions";
import type { ManagedBlogPost } from "@/lib/blog-admin";
import { StatusMessage } from "./StatusMessage";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function newPost(): ManagedBlogPost {
  const now = new Date().toISOString();
  return {
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    featuredImageUrl: "/images/veterinary-care-hero.jpg",
    featuredImageAlt: "",
    author: "Veterinary Medical Center Team",
    category: "Pet Care",
    tags: [],
    body: "",
    seoTitle: "",
    seoMetaDescription: "",
    openGraphImage: "",
    status: "draft",
    publishDate: now,
    createdAt: now,
    updatedAt: now
  };
}

function datetimeValue(value: string) {
  if (!value) return "";
  if (value.includes("T")) return value.slice(0, 16);
  return `${value}T09:00`;
}

export function BlogEditor({ post }: { post?: ManagedBlogPost | null }) {
  const [draft, setDraft] = useState<ManagedBlogPost>(post || newPost());
  const [status, setStatus] = useState({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();
  const previewParagraphs = useMemo(() => draft.body.split(/\n{2,}/).filter(Boolean), [draft.body]);

  const update = (key: keyof ManagedBlogPost, value: string | string[]) => {
    setDraft((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && !current.id && !current.slug) {
        next.slug = slugify(String(value));
        next.seoTitle = `${value} | Veterinary Medical Center`;
      }
      if (key === "excerpt" && !current.seoMetaDescription) {
        next.seoMetaDescription = String(value).slice(0, 180);
      }
      return next;
    });
  };

  const save = (nextStatus = draft.status) => {
    startTransition(async () => {
      const result = await saveBlogPost({ ...draft, status: nextStatus });
      if (result.ok && result.id) {
        setDraft((current) => ({ ...current, id: result.id || current.id, status: nextStatus }));
      }
      setStatus(result);
    });
  };

  return (
    <div className="dashboard-blog-editor">
      <section className="dashboard-card">
        <div className="dashboard-card-head compact">
          <div>
            <h2>Blog editor</h2>
            <p className="dashboard-muted">Write in simple paragraphs. Leave a blank line between sections for the public article layout.</p>
          </div>
        </div>

        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>Title</span>
            <input value={draft.title} onChange={(event) => update("title", event.target.value)} />
          </label>
          <label className="dashboard-field">
            <span>Slug</span>
            <input value={draft.slug} onChange={(event) => update("slug", slugify(event.target.value))} />
          </label>
          <label className="dashboard-field">
            <span>Author</span>
            <input value={draft.author} onChange={(event) => update("author", event.target.value)} />
          </label>
          <label className="dashboard-field">
            <span>Category</span>
            <input value={draft.category} onChange={(event) => update("category", event.target.value)} />
          </label>
        </div>

        <label className="dashboard-field">
          <span>Excerpt</span>
          <textarea value={draft.excerpt} onChange={(event) => update("excerpt", event.target.value)} />
        </label>

        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>Featured image URL</span>
            <input value={draft.featuredImageUrl} onChange={(event) => update("featuredImageUrl", event.target.value)} />
          </label>
          <label className="dashboard-field">
            <span>Featured image alt text</span>
            <input value={draft.featuredImageAlt} onChange={(event) => update("featuredImageAlt", event.target.value)} />
          </label>
          <label className="dashboard-field">
            <span>Tags</span>
            <input value={draft.tags.join(", ")} onChange={(event) => update("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
          </label>
          <label className="dashboard-field">
            <span>Publish date</span>
            <input type="datetime-local" value={datetimeValue(draft.publishDate)} onChange={(event) => update("publishDate", event.target.value)} />
          </label>
        </div>

        <label className="dashboard-field">
          <span>Body content</span>
          <textarea className="dashboard-blog-body" value={draft.body} onChange={(event) => update("body", event.target.value)} />
        </label>

        <div className="dashboard-form-grid">
          <label className="dashboard-field">
            <span>SEO title</span>
            <input value={draft.seoTitle} onChange={(event) => update("seoTitle", event.target.value)} />
          </label>
          <label className="dashboard-field">
            <span>Open Graph image</span>
            <input value={draft.openGraphImage} onChange={(event) => update("openGraphImage", event.target.value)} />
          </label>
        </div>
        <label className="dashboard-field">
          <span>SEO meta description</span>
          <textarea value={draft.seoMetaDescription} onChange={(event) => update("seoMetaDescription", event.target.value)} />
        </label>

        <div className="dashboard-actions">
          <button className="dashboard-primary-button" type="button" disabled={isPending} onClick={() => save("draft")}>
            <Save aria-hidden="true" size={15} />
            {isPending ? "Saving..." : "Save Draft"}
          </button>
          <button className="dashboard-primary-button secondary" type="button" disabled={isPending} onClick={() => save("published")}>
            <Send aria-hidden="true" size={15} />
            Publish
          </button>
          {draft.status === "published" && (
            <button className="dashboard-test-link" type="button" disabled={isPending} onClick={() => save("draft")}>
              Unpublish
            </button>
          )}
          {draft.slug && (
            <a className="dashboard-test-link" href={`/blog/${draft.slug}/`} target="_blank" rel="noopener noreferrer">
              <Eye aria-hidden="true" size={15} />
              Preview
            </a>
          )}
          <StatusMessage {...status} />
        </div>
      </section>

      <aside className="dashboard-card dashboard-blog-preview">
        <p className="dashboard-eyebrow">SEO Preview</p>
        <h2>{draft.seoTitle || draft.title || "Article title"}</h2>
        <p>{draft.seoMetaDescription || draft.excerpt || "Article description preview."}</p>
        <span>https://nky.vet/blog/{draft.slug || "article-slug"}/</span>
        <div className="dashboard-markdown-preview">
          <strong>{draft.title || "Article preview"}</strong>
          {previewParagraphs.slice(0, 3).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </aside>
    </div>
  );
}
