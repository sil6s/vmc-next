"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Clipboard, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export type DashboardResourceItem = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  resourceType: string;
  author: string;
  status: string;
  updatedAt: string;
  updatedAtValue: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  seoWarnings: string[];
};

const all = "All";

export function ResourceDashboardGallery({ resources }: { resources: DashboardResourceItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(all);
  const [status, setStatus] = useState(all);
  const [sort, setSort] = useState("updated");
  const categories = useMemo(() => [all, ...Array.from(new Set(resources.map((item) => item.category))).sort()], [resources]);
  const statuses = useMemo(() => [all, ...Array.from(new Set(resources.map((item) => item.status))).sort()], [resources]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resources
      .filter((item) => !query || `${item.title} ${item.excerpt} ${item.author} ${item.slug}`.toLowerCase().includes(query))
      .filter((item) => category === all || item.category === category)
      .filter((item) => status === all || item.status === status)
      .sort((a, b) => {
        if (sort === "title") return a.title.localeCompare(b.title);
        if (sort === "category") return a.category.localeCompare(b.category);
        if (sort === "author") return a.author.localeCompare(b.author);
        return new Date(b.updatedAtValue).getTime() - new Date(a.updatedAtValue).getTime();
      });
  }, [category, resources, search, sort, status]);

  async function copySlug(slug: string) {
    await navigator.clipboard.writeText(slug);
  }

  return (
    <section className="resource-gallery-section" aria-labelledby="current-content-heading">
      <div className="resource-gallery-head">
        <div>
          <p className="dashboard-eyebrow">Current Content</p>
          <h2 id="current-content-heading">Resource article gallery</h2>
        </div>
        <Badge variant="muted">{filtered.length} shown</Badge>
      </div>

      <div className="resource-gallery-controls">
        <label className="dashboard-field">
          <span>Search resources</span>
          <div className="resource-search-field">
            <Search aria-hidden="true" size={16} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, slug, author..." />
          </div>
        </label>
        <label className="dashboard-field">
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="dashboard-field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="dashboard-field">
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="updated">Recently updated</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
            <option value="author">Author</option>
          </select>
        </label>
      </div>

      <div className="resource-gallery-grid">
        {filtered.map((item) => (
          <Card className="resource-admin-card" key={item.slug}>
            <div className="resource-admin-thumb">
              <Image src={item.imageUrl} alt={item.imageAlt || item.title} width={520} height={320} sizes="(max-width: 760px) 100vw, 33vw" unoptimized />
            </div>
            <CardContent>
              <div className="resource-admin-card-meta">
                <Badge variant="red">{item.category}</Badge>
                <Badge variant="muted">{item.resourceType}</Badge>
                <Badge variant={item.status === "Published" ? "default" : "gold"}>{item.status}</Badge>
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <dl>
                <div><dt>Author</dt><dd>{item.author}</dd></div>
                <div><dt>Updated</dt><dd>{item.updatedAt}</dd></div>
              </dl>
              {item.seoWarnings.length > 0 && (
                <div className="resource-seo-warning">
                  {item.seoWarnings.map((warning) => <Badge variant="gold" key={warning}>{warning}</Badge>)}
                </div>
              )}
              <div className="resource-admin-actions">
                <ShadButton asChild size="sm" variant="ghost">
                  <Link href={`/studio/structure/post;${item.id || `post-${item.slug}`}`} target="_blank" rel="noopener noreferrer">
                    Edit in Studio <ExternalLink aria-hidden="true" size={14} />
                  </Link>
                </ShadButton>
                <ShadButton asChild size="sm" variant="ghost">
                  <Link href={`/resources/${item.slug}/`} target="_blank" rel="noopener noreferrer">
                    View Public Page
                  </Link>
                </ShadButton>
                <ShadButton size="sm" variant="ghost" type="button" onClick={() => copySlug(item.slug)}>
                  <Clipboard aria-hidden="true" size={14} />
                  Copy Slug
                </ShadButton>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="resource-gallery-empty">
            <CardContent>
              <h3>No resources found</h3>
              <p>Try a different search, category, status, or sort setting.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
