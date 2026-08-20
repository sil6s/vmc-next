"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command as CommandPrimitive } from "cmdk";
import {
  ArrowRight,
  BookOpen,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Search,
  Stethoscope,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  SEARCH_CATEGORIES,
  SEARCH_ITEMS,
  type SearchCategory,
  type SearchItem,
} from "@/lib/search-data";

/* ─── Fuzzy filter ──────────────────────────────────────────────────────────
   Scores [0, 1] for cmdk's `filter` prop.
   value    = CommandItem value string (title + category + description joined)
   search   = current query
   keywords = per-item extra tokens that boost matches
──────────────────────────────────────────────────────────────────────────── */
function fuzzyFilter(value: string, search: string, keywords?: string[]): number {
  const haystack = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  const q = search.toLowerCase().trim();
  if (!q) return 1;

  // Exact substring — highest priority
  if (haystack.includes(q)) return 1;

  // All space-separated tokens present (any order)
  const tokens = q.split(/\s+/);
  if (tokens.every((t) => haystack.includes(t))) return 0.9;

  // Prefix match on any token
  if (tokens.some((t) => haystack.split(/\s+/).some((w) => w.startsWith(t)))) return 0.7;

  // Character-level fuzzy: all chars in order
  let pos = 0;
  for (const ch of q) {
    const idx = haystack.indexOf(ch, pos);
    if (idx === -1) return 0;
    pos = idx + 1;
  }
  return 0.4;
}

/* ─── Category icon map ───────────────────────────────────────────────────── */
const CATEGORY_ICON: Record<SearchCategory, React.ReactNode> = {
  Services: <Stethoscope size={15} aria-hidden="true" />,
  Resources: <BookOpen size={15} aria-hidden="true" />,
  Pages: <LayoutGrid size={15} aria-hidden="true" />,
  Locations: <MapPin size={15} aria-hidden="true" />,
  "Online Help": <MessageCircle size={15} aria-hidden="true" />,
};

/* ─── Detect OS for keyboard hint ────────────────────────────────────────── */
function useIsMac() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return isMac;
}

/* ─── Result item ─────────────────────────────────────────────────────────── */
function SearchResultItem({
  item,
  onSelect,
}: {
  item: SearchItem;
  onSelect: (href: string) => void;
}) {
  return (
    <CommandPrimitive.Item
      key={item.id}
      value={`${item.title} ${item.category} ${item.description}`}
      keywords={item.keywords}
      className="site-search-item"
      onSelect={() => onSelect(item.href)}
    >
      <span className="site-search-item-icon">{CATEGORY_ICON[item.category]}</span>
      <span className="site-search-item-text">
        <span className="site-search-item-title">{item.title}</span>
        <span className="site-search-item-desc">{item.description}</span>
      </span>
      <ArrowRight className="site-search-item-arrow" size={14} aria-hidden="true" />
    </CommandPrimitive.Item>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isMac = useIsMac();

  // Cmd+K / Ctrl+K to open, plus custom event from mobile nav trigger
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onEvent = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("vmc:open-search", onEvent);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("vmc:open-search", onEvent);
    };
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (!open) return;
    // Small delay for the dialog entrance animation
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  // Group items by category
  const itemsByCategory = SEARCH_CATEGORIES.reduce<Record<SearchCategory, SearchItem[]>>(
    (acc, cat) => {
      acc[cat] = SEARCH_ITEMS.filter((i) => i.category === cat);
      return acc;
    },
    {} as Record<SearchCategory, SearchItem[]>
  );

  return (
    <>
      {/* Trigger button — visible in nav */}
      <button
        type="button"
        className="site-search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
      >
        <Search size={16} aria-hidden="true" />
        <span className="site-search-trigger-label">Search</span>
        <span className="site-search-trigger-hint" aria-hidden="true">
          {isMac ? "⌘K" : "Ctrl K"}
        </span>
      </button>

      {/* Dialog */}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) setQuery("");
        }}
      >
        <DialogContent
          className="site-search-dialog"
          showClose={false}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">Search</DialogTitle>

          <CommandPrimitive
            className="site-search-command"
            filter={fuzzyFilter}
            shouldFilter={true}
            loop
          >
            {/* Input */}
            <div className="site-search-input-wrap">
              <Search className="site-search-search-icon" size={18} aria-hidden="true" />
              <CommandPrimitive.Input
                ref={inputRef}
                className="site-search-input"
                placeholder="Search services, resources, pages…"
                value={query}
                onValueChange={setQuery}
              />
              {query && (
                <button
                  type="button"
                  className="site-search-clear"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results */}
            <CommandPrimitive.List className="site-search-list">
              <CommandPrimitive.Empty className="site-search-empty">
                No results for <strong>&ldquo;{query}&rdquo;</strong> — try a service name, topic,
                or page.
              </CommandPrimitive.Empty>

              {SEARCH_CATEGORIES.map((cat) => (
                <CommandPrimitive.Group
                  key={cat}
                  heading={cat}
                  className="site-search-group"
                >
                  {itemsByCategory[cat].map((item) => (
                    <SearchResultItem key={item.id} item={item} onSelect={handleSelect} />
                  ))}
                </CommandPrimitive.Group>
              ))}
            </CommandPrimitive.List>

            {/* Footer */}
            <div className="site-search-footer" aria-hidden="true">
              <span className="site-search-footer-hint">
                <kbd className="site-search-kbd">↑</kbd>
                <kbd className="site-search-kbd">↓</kbd>
                navigate
              </span>
              <span className="site-search-footer-hint">
                <kbd className="site-search-kbd">↵</kbd>
                open
              </span>
              <span className="site-search-footer-hint">
                <kbd className="site-search-kbd">Esc</kbd>
                close
              </span>
            </div>
          </CommandPrimitive>
        </DialogContent>
      </Dialog>
    </>
  );
}
