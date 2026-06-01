export type ResourcePacket = {
  contentMode: "standard" | "advanced";
  title: string;
  slug: string;
  resourceType: "blog" | "education" | "clinic-news" | "faq";
  category: string;
  tags: string[];
  readingTime: string;
  author: string;
  reviewedBy: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  featuredImagePrompt: string;
  featuredImageAlt: string;
  featuredImageCaption: string;
  featuredImageUrl: string;
  ogImageAlt: string;
  canonicalUrl: string;
  bodyMarkdown: string;
  faqMarkdown: string;
  sourcesMarkdown: string;
  suggestedInternalLinksMarkdown: string;
  suggestedCtaMarkdown: string;
  rawMarkdown: string;
};

const fieldLabels = [
  "Content Mode",
  "Title",
  "Slug",
  "Resource Type",
  "Category",
  "Tags",
  "Reading Time",
  "Author",
  "Reviewed By",
  "Excerpt",
  "SEO Title",
  "SEO Description",
  "Focus Keyword",
  "Secondary Keywords",
  "Featured Image URL",
  "Featured Image Prompt",
  "Featured Image Alt Text",
  "Featured Image Caption",
  "Open Graph Image Alt Text",
  "Canonical URL",
  "Article Body Markdown",
  "FAQ Markdown",
  "Source Links Markdown",
  "Suggested Internal Links Markdown",
  "Suggested CTA Markdown"
] as const;

const fieldMap = new Map(fieldLabels.map((label) => [normalizeHeading(label), label]));

const fieldAliases = new Map<string, (typeof fieldLabels)[number]>([
  [normalizeHeading("Article Body"), "Article Body Markdown"],
  [normalizeHeading("FAQ"), "FAQ Markdown"],
  [normalizeHeading("Source Links"), "Source Links Markdown"],
  [normalizeHeading("Suggested Internal Links"), "Suggested Internal Links Markdown"],
  [normalizeHeading("Suggested CTA"), "Suggested CTA Markdown"],
  [normalizeHeading("Featured Image File or URL"), "Featured Image URL"]
]);

function normalizeHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanScalar(value = "") {
  return value.trim().replace(/^>\s?/gm, "").trim();
}

function parseList(value = "") {
  return value
    .split(/\r?\n/)
    .flatMap((line) => line.replace(/^\s*[-*+]\s+/, "").split(","))
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseResourceType(value: string): ResourcePacket["resourceType"] {
  const normalized = normalizeHeading(value);
  if (normalized.includes("clinic")) return "clinic-news";
  if (normalized.includes("faq")) return "faq";
  if (normalized.includes("blog")) return "blog";
  return "education";
}

function parseContentMode(value: string): ResourcePacket["contentMode"] {
  return normalizeHeading(value).includes("standard") ? "standard" : "advanced";
}

function fallbackSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function packetSections(markdown: string) {
  const sections = new Map<(typeof fieldLabels)[number], string>();
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let current: (typeof fieldLabels)[number] | null = null;
  let buffer: string[] = [];

  function commit() {
    if (!current) return;
    sections.set(current, buffer.join("\n").trim());
    buffer = [];
  }

  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    const normalizedField = match ? normalizeHeading(match[1]) : "";
    const field = match ? fieldMap.get(normalizedField) || fieldAliases.get(normalizedField) : undefined;

    if (field) {
      commit();
      current = field;
      continue;
    }

    if (current) {
      buffer.push(line);
    }
  }

  commit();
  return sections;
}

export function parseResourcePacket(markdown: string): ResourcePacket {
  const sections = packetSections(markdown);
  const get = (label: (typeof fieldLabels)[number]) => cleanScalar(sections.get(label) || "");
  const title = get("Title");
  const slug = get("Slug") || fallbackSlug(title);

  return {
    contentMode: parseContentMode(get("Content Mode")),
    title,
    slug,
    resourceType: parseResourceType(get("Resource Type")),
    category: get("Category"),
    tags: parseList(get("Tags")),
    readingTime: get("Reading Time"),
    author: get("Author") || "Veterinary Medical Centers Team",
    reviewedBy: get("Reviewed By"),
    excerpt: get("Excerpt"),
    seoTitle: get("SEO Title"),
    seoDescription: get("SEO Description"),
    focusKeyword: get("Focus Keyword"),
    secondaryKeywords: parseList(get("Secondary Keywords")),
    featuredImagePrompt: get("Featured Image Prompt"),
    featuredImageAlt: get("Featured Image Alt Text"),
    featuredImageCaption: get("Featured Image Caption"),
    featuredImageUrl: get("Featured Image URL"),
    ogImageAlt: get("Open Graph Image Alt Text"),
    canonicalUrl: get("Canonical URL"),
    bodyMarkdown: get("Article Body Markdown"),
    faqMarkdown: get("FAQ Markdown"),
    sourcesMarkdown: get("Source Links Markdown"),
    suggestedInternalLinksMarkdown: get("Suggested Internal Links Markdown"),
    suggestedCtaMarkdown: get("Suggested CTA Markdown"),
    rawMarkdown: markdown
  };
}

export function validateResourcePacket(packet: ResourcePacket) {
  const missing: string[] = [];
  if (!packet.title) missing.push("Title");
  if (!packet.slug) missing.push("Slug");
  if (!packet.category) missing.push("Category");
  if (!packet.bodyMarkdown) missing.push("Article Body");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(packet.slug)) missing.push("Valid slug");
  return missing;
}
