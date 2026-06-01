"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ArrowUpDown, Search, X } from "lucide-react";

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
  { id: "all", label: "All" },
  { id: "dog", label: "Dogs", terms: ["dog", "dogs", "puppy", "canine"] },
  { id: "cat", label: "Cats", terms: ["cat", "cats", "kitten", "feline"] },
  { id: "new-patients", label: "New patients", terms: ["new patient", "first visit", "registration", "appointment"] },
  { id: "wellness", label: "Wellness", terms: ["wellness", "preventive", "vaccines", "senior", "dental"] }
] as const;

type FilterId = (typeof filters)[number]["id"];
type SortId = "newest" | "oldest" | "az";

const sortOptions: { id: SortId; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "az", label: "A–Z" }
];

function matchesFilter(item: ResourceCardItem, terms: readonly string[]) {
  const haystack = [item.title, item.excerpt, item.category, item.resourceTypeLabel, ...item.tags]
    .join(" ")
    .toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

function fuzzySearch(items: ResourceCardItem[], query: string) {
  if (!query.trim()) return items;
  const words = query.toLowerCase().trim().split(/\s+/);
  return items.filter((item) => {
    const haystack = [item.title, item.excerpt, item.category, item.resourceTypeLabel, ...item.tags]
      .join(" ")
      .toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

function sortItems(items: ResourceCardItem[], sort: SortId) {
  const copy = [...items];
  if (sort === "newest") return copy.sort((a, b) => a.sortKey - b.sortKey);
  if (sort === "oldest") return copy.sort((a, b) => b.sortKey - a.sortKey);
  if (sort === "az") return copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy;
}

export function ResourceBrowser({ resources }: { resources: ResourceCardItem[] }) {
  const [active, setActive] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("newest");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const activeFilter = filters.find((f) => f.id === active);
  const tabFiltered =
    active === "all" || !activeFilter || !("terms" in activeFilter)
      ? resources
      : resources.filter((item) => matchesFilter(item, activeFilter.terms));
  const searched = fuzzySearch(tabFiltered, deferredQuery);
  const visible = sortItems(searched, sort);
  const isSearching = deferredQuery.trim().length > 0;

  return (
    <div className="resource-browser">
      {/* Search bar */}
      <label className="resource-search-bar" htmlFor="resource-search">
        <Search aria-hidden="true" size={19} />
        <input
          id="resource-search"
          type="search"
          placeholder="Search guides, topics, and resources…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            type="button"
            className="resource-search-clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <X aria-hidden="true" size={16} />
          </button>
        )}
      </label>

      {/* Filter chips + sort */}
      <div className="resource-browser-toolbar">
        <div className="resource-filter-chips" role="group" aria-label="Filter by topic">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`resource-filter-chip${active === f.id ? " is-active" : ""}`}
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

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

      {/* Result count */}
      <p className="resource-browser-count" aria-live="polite">
        {isSearching
          ? `${visible.length} result${visible.length !== 1 ? "s" : ""} for "${deferredQuery.trim()}"`
          : visible.length === resources.length
          ? `${visible.length} resources`
          : `${visible.length} of ${resources.length} resources`}
      </p>

      {/* Grid or empty state */}
      {visible.length ? (
        <div className="blog-card-grid">
          {visible.map((post) => (
            <article className="blog-card" key={post.slug}>
              <Link
                className="blog-card-image"
                href={`/resources/${post.slug}/`}
                aria-label={`Read ${post.title}`}
              >
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 380px"
                />
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
          <h3>
            {isSearching
              ? `No results for "${deferredQuery.trim()}"`
              : "No resources found for this filter."}
          </h3>
          <p>
            {isSearching
              ? "Try different keywords, or clear your search to browse all resources."
              : "Try all resources, or add matching tags in Sanity like dog, cat, new patient, wellness, or dental."}
          </p>
        </div>
      )}
    </div>
  );
}
