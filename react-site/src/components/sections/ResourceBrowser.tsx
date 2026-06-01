"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ResourceCardItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  resourceTypeLabel: string;
  imageUrl: string;
  imageAlt: string;
  authorName: string;
  authorImage: string;
  authorImageAlt: string;
  readingTime: string;
  tags: string[];
  sortKey: number;
};

const filters = [
  { id: "all", label: "All resources", match: () => true },
  { id: "dog", label: "Dog care", match: (item: ResourceCardItem) => matches(item, ["dog", "dogs", "puppy", "canine"]) },
  { id: "cat", label: "Cat care", match: (item: ResourceCardItem) => matches(item, ["cat", "cats", "kitten", "feline"]) },
  { id: "new-patients", label: "New patients", match: (item: ResourceCardItem) => matches(item, ["new patient", "first visit", "registration", "appointment"]) },
  { id: "wellness", label: "Wellness", match: (item: ResourceCardItem) => matches(item, ["wellness", "preventive", "vaccines", "senior", "dental"]) }
] as const;

type SortId = "newest" | "oldest" | "az";

const sortOptions: { id: SortId; label: string }[] = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "az", label: "A–Z" }
];

function matches(item: ResourceCardItem, terms: string[]) {
  const haystack = [item.title, item.excerpt, item.category, item.resourceTypeLabel, ...item.tags].join(" ").toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

function sortItems(items: ResourceCardItem[], sort: SortId) {
  const copy = [...items];
  if (sort === "newest") return copy.sort((a, b) => a.sortKey - b.sortKey);
  if (sort === "oldest") return copy.sort((a, b) => b.sortKey - a.sortKey);
  if (sort === "az") return copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy;
}

export function ResourceBrowser({ resources }: { resources: ResourceCardItem[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const [sort, setSort] = useState<SortId>("newest");

  const filter = filters.find((item) => item.id === active) || filters[0];
  const filtered = active === "all" ? resources : resources.filter(filter.match);
  const visible = sortItems(filtered, sort);

  return (
    <div className="resource-browser">
      <div className="resource-browser-toolbar">
        <Tabs value={active} onValueChange={(v) => setActive(v as (typeof filters)[number]["id"])}>
          <TabsList className="resource-filter-bar" aria-label="Filter pet health resources">
            {filters.map((item) => (
              <TabsTrigger value={item.id} key={item.id}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="resource-sort-control">
          <ArrowUpDown aria-hidden="true" size={14} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            aria-label="Sort resources"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="resource-browser-count" aria-live="polite">
        {visible.length === resources.length
          ? `Showing all ${visible.length} resources`
          : `Showing ${visible.length} of ${resources.length} resources`}
      </p>

      {visible.length ? (
        <div className="blog-card-grid">
          {visible.map((post) => (
            <article className="blog-card" key={post.slug}>
              <Link className="blog-card-image" href={`/resources/${post.slug}/`} aria-label={`Read ${post.title}`}>
                <Image src={post.imageUrl} alt={post.imageAlt} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 380px" />
              </Link>
              <div className="blog-card-body">
                <p className="eyebrow">{post.resourceTypeLabel} · {post.category}</p>
                <h3>
                  <Link href={`/resources/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <div className="blog-author-row">
                  <Image src={post.authorImage} alt={post.authorImageAlt} width={42} height={42} />
                  <div>
                    <strong>{post.authorName}</strong>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                <Link className="text-link" href={`/resources/${post.slug}/`}>
                  Read guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="resource-empty-state">
          <Search aria-hidden="true" size={28} />
          <h3>No resources found for this filter.</h3>
          <p>Try all resources, or add matching tags in Sanity like dog, cat, new patient, wellness, dental, puppy, kitten, or senior.</p>
        </div>
      )}
    </div>
  );
}
