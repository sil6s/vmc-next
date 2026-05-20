"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
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
};

const filters = [
  { id: "all", label: "All resources", match: () => true },
  { id: "dog", label: "Dog care", match: (item: ResourceCardItem) => matches(item, ["dog", "dogs", "puppy", "canine"]) },
  { id: "cat", label: "Cat care", match: (item: ResourceCardItem) => matches(item, ["cat", "cats", "kitten", "feline"]) },
  { id: "new-patients", label: "New patients", match: (item: ResourceCardItem) => matches(item, ["new patient", "first visit", "registration", "appointment"]) },
  { id: "wellness", label: "Wellness", match: (item: ResourceCardItem) => matches(item, ["wellness", "preventive", "vaccines", "senior", "dental"]) }
] as const;

function matches(item: ResourceCardItem, terms: string[]) {
  const haystack = [item.title, item.excerpt, item.category, item.resourceTypeLabel, ...item.tags].join(" ").toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

export function ResourceBrowser({ resources }: { resources: ResourceCardItem[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const filter = filters.find((item) => item.id === active) || filters[0];
  const visible = active === "all" ? resources : resources.filter(filter.match);

  return (
    <Tabs className="resource-browser" value={active} onValueChange={(value) => setActive(value as (typeof filters)[number]["id"])}>
      <TabsList className="resource-filter-bar" aria-label="Filter pet health resources">
        {filters.map((item) => (
          <TabsTrigger value={item.id} key={item.id}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

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
          <h3>No resources found for this filter yet.</h3>
          <p>Try all resources, or add matching tags in Sanity like dog, cat, new patient, wellness, dental, puppy, kitten, or senior.</p>
        </div>
      )}
    </Tabs>
  );
}
