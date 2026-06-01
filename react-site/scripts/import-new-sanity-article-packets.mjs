import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { createClient } from "next-sanity";

const zipPath = process.argv[2];
if (!zipPath) {
  throw new Error("Usage: node scripts/import-new-sanity-article-packets.mjs /path/to/articles.zip");
}

const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split(/\r?\n/)
    .filter((line) => line.includes("="))
    .map((line) => {
      const [key, ...value] = line.split("=");
      return [key, value.join("=").replace(/^["']|["']$/g, "")];
    })
);

const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zk507aly",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-01",
  useCdn: false,
  token
});

let keyIndex = 0;
function key(prefix = "k") {
  keyIndex += 1;
  return `${prefix}-${Date.now().toString(36)}-${keyIndex.toString(36)}`;
}

function headingName(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanScalar(value = "") {
  return value.trim().replace(/^>\s?/gm, "").trim();
}

function sections(markdown) {
  const result = new Map();
  let current = null;
  let buffer = [];

  function commit() {
    if (!current) return;
    result.set(current, buffer.join("\n").trim());
    buffer = [];
  }

  for (const line of markdown.replace(/\r\n/g, "\n").split("\n")) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      commit();
      current = headingName(match[1]);
      continue;
    }
    if (current) buffer.push(line);
  }
  commit();
  return result;
}

function parseList(value = "") {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-*+]\s+/, "").trim())
    .filter(Boolean);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function markdownLinks(value = "") {
  const links = [];
  const matcher = /\[([^\]]+)]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)|^\s*[-*]\s+(\/[^)\s]+)\s*$/gm;
  let match;
  while ((match = matcher.exec(value))) {
    const label = match[1]?.trim();
    const href = (match[2] || match[3])?.trim();
    if (!href) continue;
    links.push({
      _key: key("link"),
      label: label || labelForPath(href),
      href,
      ...(href.startsWith("http") ? { source: new URL(href).hostname.replace(/^www\./, "") } : {})
    });
  }
  return links;
}

function labelForPath(path) {
  const labels = {
    "/services/pet-wellness-exams/": "Pet wellness exams",
    "/services/sick-pet-exams/": "Sick pet exams",
    "/services/pet-dental-care/": "Pet dental care",
    "/services/pet-surgery/": "Pet surgery",
    "/services/diagnostics/": "Diagnostics and lab work",
    "/services/vaccinations/": "Dog and cat vaccinations",
    "/book-appointment/": "Book an appointment",
    "/contact/": "Contact Veterinary Medical Centers",
    "/new-patients/": "New patient information",
    "/locations/vet-in-fort-thomas-ky/": "Fort Thomas veterinary clinic",
    "/locations/vet-in-independence-ky/": "Independence veterinary clinic"
  };
  return labels[path] || path.replace(/^\/|\/$/g, "").replace(/-/g, " ");
}

function parseBodyRichText(value) {
  const match = value.match(/```json\s*([\s\S]*?)```/);
  if (!match) throw new Error("Missing bodyRichText JSON fence.");
  return JSON.parse(match[1]);
}

function addKeysAndNormalize(value) {
  if (Array.isArray(value)) return value.map(addKeysAndNormalize);
  if (!value || typeof value !== "object") return value;

  const next = { ...value };
  if (!next._key) next._key = key(next._type || "item");

  if (next._type === "span") {
    next.marks = Array.isArray(next.marks) ? next.marks : [];
    return next;
  }

  if (next._type === "block") {
    next.markDefs = Array.isArray(next.markDefs) ? next.markDefs : [];
    next.children = addKeysAndNormalize(next.children || []);
    return next;
  }

  if (next._type === "comparisonTable") {
    next.headers = next.headers || next.columns || [];
    delete next.columns;
    next.rows = (next.rows || []).map((row) => ({
      _key: row._key || key("row"),
      cells: row.cells || []
    }));
    return next;
  }

  if (next._type === "callout") {
    if (next.tone === "important") next.tone = "warning";
    if (!["tip", "warning", "next-step", "vet-note"].includes(next.tone)) next.tone = "vet-note";
    return next;
  }

  if (next._type === "cta") {
    if (next.primaryButton) {
      next.primaryLabel = next.primaryButton.label;
      next.primaryHref = next.primaryButton.href;
      delete next.primaryButton;
    }
    if (next.secondaryButton) {
      next.secondaryLabel = next.secondaryButton.label;
      next.secondaryHref = next.secondaryButton.href;
      delete next.secondaryButton;
    }
    return next;
  }

  if (next._type === "faq") {
    const questions = next.questions || next.items || next.faqs || [];
    next.questions = questions.map((item) => ({
      _key: item._key || key("faq-item"),
      question: item.question,
      answer: item.answer
    }));
    delete next.items;
    delete next.faqs;
    if (!next.title) next.title = "Common questions";
    return next;
  }

  return Object.fromEntries(Object.entries(next).map(([entryKey, entryValue]) => [entryKey, addKeysAndNormalize(entryValue)]));
}

function removeSourceSection(blocks) {
  const index = blocks.findIndex(
    (block) =>
      block?._type === "block" &&
      ["h2", "h3"].includes(block.style) &&
      block.children?.some((child) => /trusted sources|further reading/i.test(child.text || ""))
  );
  return index >= 0 ? blocks.slice(0, index) : blocks;
}

function allowedCategory(value) {
  const allowed = new Set(["Dog care", "Cat care", "New patients", "Wellness", "Clinic News"]);
  return allowed.has(value) ? value : "Wellness";
}

function packetFromMarkdown(markdown) {
  const data = sections(markdown);
  const get = (name) => cleanScalar(data.get(headingName(name)) || "");
  const title = get("title");
  const slug = get("slug") || slugify(title);
  const body = removeSourceSection(addKeysAndNormalize(parseBodyRichText(data.get("bodyrichtext") || "")));
  return {
    title,
    slug,
    excerpt: get("excerpt"),
    seoTitle: get("seoTitle"),
    seoDescription: get("seoDescription"),
    focusKeyword: get("focusKeyword"),
    secondaryKeywords: parseList(get("secondaryKeywords")),
    tags: parseList(get("tags")),
    category: allowedCategory(get("category")),
    readingTime: get("readingTime").replace(/\bminutes\b/i, "min read"),
    lastReviewedAt: get("lastReviewedAt") || "2026-06-01",
    body,
    internalLinks: markdownLinks(data.get("internallinks") || "").filter((link) => link.href.startsWith("/")),
    externalLinks: markdownLinks(data.get("externallinks") || "").filter((link) => link.href.startsWith("http"))
  };
}

const files = execFileSync("unzip", ["-Z1", zipPath], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter((name) => /^\d{2}-.+\.md$/i.test(name) && !name.endsWith("00-index.md"))
  .sort();

const author = await client.fetch('*[_type == "author" && slug.current == "kristi-baker"][0]{_id}');
if (!author?._id) throw new Error("Could not find Kristi Baker author in Sanity.");

const existing = new Set(await client.fetch('*[_type == "post" && defined(slug.current)].slug.current'));
const packets = files.map((file) => {
  const markdown = execFileSync("unzip", ["-p", zipPath, file], { encoding: "utf8", maxBuffer: 1024 * 1024 });
  return packetFromMarkdown(markdown);
});

const duplicateSlugs = packets.filter((packet) => existing.has(packet.slug)).map((packet) => packet.slug);
if (duplicateSlugs.length) {
  throw new Error(`Refusing to overwrite existing posts: ${duplicateSlugs.join(", ")}`);
}

for (const packet of packets) {
  const doc = {
    _id: `post-${packet.slug}`,
    _type: "post",
    title: packet.title,
    resourceType: "education",
    contentMode: "standard",
    slug: { _type: "slug", current: packet.slug },
    excerpt: packet.excerpt,
    author: { _type: "reference", _ref: author._id },
    category: packet.category,
    tags: packet.tags,
    secondaryKeywords: packet.secondaryKeywords,
    readingTime: packet.readingTime,
    body: packet.body,
    internalLinks: packet.internalLinks,
    externalLinks: packet.externalLinks,
    seoTitle: packet.seoTitle,
    seoDescription: packet.seoDescription,
    focusKeyword: packet.focusKeyword,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastReviewedAt: packet.lastReviewedAt
  };

  await client.create(doc);
  console.log(`Published ${packet.slug}`);
}

console.log(`Published ${packets.length} new resource articles.`);
