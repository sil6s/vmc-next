"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Clipboard,
  ExternalLink,
  FileText,
  FileUp,
  Image as ImageIcon,
  Loader2,
  PencilLine,
  Sparkles
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseResourcePacket, validateResourcePacket, type ResourcePacket } from "@/lib/resource-packet-parser";
import type { ResourceAuthorOption } from "@/sanity/authors";

type ImportResult = {
  error?: string;
  publicUrl?: string;
  slug?: string;
  studioUrl?: string;
  title?: string;
};

type ResourceTypeValue = "education" | "faq" | "blog" | "clinic-news";

const resourceTypes: Array<{ value: ResourceTypeValue; label: string }> = [
  { value: "education", label: "Education guide" },
  { value: "faq", label: "FAQ resource" },
  { value: "blog", label: "Blog article" },
  { value: "clinic-news", label: "Clinic news" }
];

const categories = ["Pet Care", "Wellness", "Dental Care", "Puppy & Kitten Care", "Senior Pet Care", "Clinic News"];

const steps = [
  "Basics",
  "Direction and Image",
  "Prompt",
  "Import"
];

const emptyPacket = parseResourcePacket("");

function authorLabel(author?: ResourceAuthorOption) {
  if (!author) return "Choose an author";
  return [author.name, author.credentials, author.title].filter(Boolean).join(" | ");
}

function optionalMissing(packet: ResourcePacket) {
  const missing: string[] = [];
  if (!packet.excerpt) missing.push("Excerpt");
  if (!packet.seoTitle) missing.push("SEO title");
  if (!packet.seoDescription) missing.push("SEO description");
  if (!packet.focusKeyword) missing.push("Focus keyword");
  if (!packet.tags.length) missing.push("Tags");
  if (!packet.faqMarkdown) missing.push("FAQ");
  if (!packet.sourcesMarkdown) missing.push("Source links");
  if (!packet.featuredImagePrompt) missing.push("Featured image prompt");
  if (!packet.featuredImageAlt) missing.push("Featured image alt text");
  if (!packet.featuredImageCaption) missing.push("Featured image caption");
  if (!packet.ogImageAlt) missing.push("Open Graph image alt text");
  return missing;
}

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function buildPrompt({
  subject,
  focusKeyword,
  resourceType,
  category,
  selectedAuthor,
  contentNotes,
  featuredImageUrl,
  featuredImagePrompt,
  featuredImageAlt,
  featuredImageCaption
}: {
  subject: string;
  focusKeyword: string;
  resourceType: ResourceTypeValue;
  category: string;
  selectedAuthor?: ResourceAuthorOption;
  contentNotes: string;
  featuredImageUrl: string;
  featuredImagePrompt: string;
  featuredImageAlt: string;
  featuredImageCaption: string;
}) {
  const selectedResourceType = resourceTypes.find((type) => type.value === resourceType)?.label || "Education guide";
  const subjectLine = subject.trim() || "[ARTICLE SUBJECT]";
  const keywordLine = focusKeyword.trim() || "[FOCUS KEYWORD]";
  const notesLine = contentNotes.trim() || "[Add the exact points, services, symptoms, season, location, or angle the article should cover.]";
  const authorName = selectedAuthor?.name || "[Choose an existing Sanity author in the dashboard]";
  const imagePrompt = featuredImagePrompt.trim() || "A realistic dog and cat at a Northern Kentucky veterinary clinic exam room.";
  const imageAlt = featuredImageAlt.trim() || "Veterinarian examining a dog and cat at Veterinary Medical Centers in Northern Kentucky.";
  const imageCaption = featuredImageCaption.trim() || "Preventive veterinary care for pets in Fort Thomas and Independence, Kentucky.";
  const imageUrlLine = featuredImageUrl.trim() ? `Preferred featured image URL or reference: ${featuredImageUrl.trim()}` : "No image URL is attached yet. Provide featured image guidance for later selection or generation.";

  return `Create one complete Sanity Advanced Markdown resource article packet for Veterinary Medical Centers.

Article subject: ${subjectLine}
Article type: ${selectedResourceType}
Resource Type value: ${resourceType}
Category: ${category}
Focus keyword: ${keywordLine}
Author: ${authorName}
Audience: Dog and cat owners in Fort Thomas, Independence, Cincinnati, and surrounding Northern Kentucky communities.
Content notes and requested coverage:
${notesLine}

Featured image direction:
${imageUrlLine}
Featured image prompt or description: ${imagePrompt}
Featured image alt text draft: ${imageAlt}
Featured image caption draft: ${imageCaption}

Output one Markdown packet only. Do not use YAML frontmatter. Do not wrap the answer in a code fence. Use the exact field headings below in this exact order because the importer reads these headings.

## Content Mode
advanced

## Title
[Public article title]

## Slug
[short lowercase URL slug using only lowercase letters, numbers, and hyphens]

## Resource Type
${resourceType}

## Category
${category}

## Tags
- [short topic tag]
- [short topic tag]
- [short topic tag]

## Reading Time
[example: 5 min read]

## Author
${authorName}

## Reviewed By

## Excerpt
[1-2 sentence summary for cards and meta fallback]

## SEO Title
[search title, ideally under 60 characters]

## SEO Description
[meta description, around 150-160 characters]

## Focus Keyword
${keywordLine}

## Secondary Keywords
- [supporting keyword]
- [supporting local keyword]
- [related service keyword]

## Featured Image Prompt
[Describe a realistic, brand-appropriate featured image that could be generated or selected for this article.]

## Featured Image Alt Text
[Concise accessible alt text that naturally includes the article topic and location when appropriate. Do not keyword-stuff.]

## Featured Image Caption
[Optional short caption that reinforces the article topic and Veterinary Medical Centers' local care positioning.]

## Open Graph Image Alt Text
[Can match the featured image alt text or be slightly more social-sharing oriented.]

## Article Body
[Full article body here. Include a ## Quick answer section near the top.]

## FAQ
[FAQ content here. Use ### for each question.]

## Source Links
[Credible source links here as Markdown links.]

## Suggested Internal Links
[Recommended internal site links here as Markdown links.]

## Suggested CTA
[Recommended CTA here.]

Writing and SEO requirements:
- Use H2 and H3 headings inside Article Body.
- Include the focus keyword naturally in the title or intro, first 100 words, at least one heading, body copy, and FAQ.
- Include natural local language: Veterinary Medical Centers, Fort Thomas, Independence, Northern Kentucky, Cincinnati, preventive veterinary care, and scheduling when relevant.
- Keep paragraphs short and readable.
- Use bullets where they improve scanning.
- Avoid tables unless there is no clearer format.
- Do not diagnose a pet or promise outcomes.
- Use safe, general veterinary education.
- If symptoms or urgency are discussed, tell readers to contact a veterinarian or seek urgent care when appropriate.
- Use credible sources such as AVMA, AAHA, CAPC, CDC, FDA, Cornell Feline Health Center, Merck Veterinary Manual, PubMed, or PubMed Central.
- Suggest visual callouts, checklists, comparison tables, FAQs, CTA sections, diagrams, lifecycle visuals, prevention comparison charts, seasonal risk maps, or other image opportunities where useful.
- Featured image guidance should avoid fake medical claims, avoid distressing medical scenes, and feel warm, local, professional, and brand-appropriate.
- Do not invent authors or reviewers. Keep Reviewed By blank unless a reviewer is explicitly provided.
- The dashboard selected Sanity author controls the actual linked author. Packet author text is preview-only.`;
}

function Stepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="resource-workflow-stepper" aria-label="AI resource workflow steps">
      {steps.map((step, index) => (
        <span className={index <= activeStep ? "is-active" : ""} key={step}>
          <strong>{index + 1}</strong>
          {step}
        </span>
      ))}
    </div>
  );
}

function FieldPreview({ label, value, tone = "default" }: { label: string; value?: string | string[]; tone?: "default" | "warning" | "success" }) {
  const display = Array.isArray(value) ? value.join(", ") : value;
  return (
    <div className={`resource-preview-tile resource-preview-tile-${tone}`}>
      <dt>{label}</dt>
      <dd>{display || "Not found"}</dd>
    </div>
  );
}

function WorkflowCardHeader({ icon: Icon, eyebrow, title, description }: { icon: typeof FileText; eyebrow: string; title: string; description: string }) {
  return (
    <CardHeader className="resource-workflow-card-header">
      <Icon aria-hidden="true" size={22} />
      <div>
        <p className="dashboard-eyebrow">{eyebrow}</p>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
  );
}

function ManualWorkflowCard() {
  return (
    <Card className="resource-workflow-choice-card">
      <WorkflowCardHeader
        icon={PencilLine}
        eyebrow="Manual Studio Editing"
        title="Use Studio for handwritten work."
        description="Best for handwritten articles, direct edits, image uploads, author profile edits, and publishing review."
      />
      <CardContent className="resource-workflow-actions">
        <ShadButton asChild>
          <Link href="/studio/" target="_blank" rel="noopener noreferrer">
            Open Studio <ExternalLink aria-hidden="true" size={16} />
          </Link>
        </ShadButton>
        <ShadButton asChild variant="ghost">
          <Link href="/resources/" target="_blank" rel="noopener noreferrer">
            View Public Resources <ExternalLink aria-hidden="true" size={16} />
          </Link>
        </ShadButton>
      </CardContent>
    </Card>
  );
}

function AiWorkflowIntroCard() {
  return (
    <Card className="resource-workflow-choice-card">
      <WorkflowCardHeader
        icon={Sparkles}
        eyebrow="AI-Assisted Article Builder"
        title="Generate an import-ready article packet."
        description="Best for structured SEO articles with required Sanity fields, featured image guidance, FAQs, sources, and import-ready Markdown."
      />
      <CardContent className="resource-workflow-actions">
        <ShadButton asChild>
          <a href="#ai-resource-workflow">Start AI Article Workflow</a>
        </ShadButton>
      </CardContent>
    </Card>
  );
}

function WorkflowHelpAccordion() {
  const items = [
    {
      question: "When should I use Studio?",
      answer: "Use Studio for handwritten articles, careful edits, image uploads, author edits, and publishing review."
    },
    {
      question: "When should I use the AI workflow?",
      answer: "Use it when you want AI to generate a structured SEO article packet that can be imported into Sanity."
    },
    {
      question: "Does this create new authors?",
      answer: "No. The importer uses the selected Sanity author from the dropdown and links to that author's existing _id."
    },
    {
      question: "What happens to the packet author text?",
      answer: "It is only shown for preview/reference and does not control the linked author."
    },
    {
      question: "How do featured images work?",
      answer: "Featured image prompt, alt text, and caption are saved as Media guidance for later image creation or upload. The importer does not store external URLs as Sanity image assets."
    },
    {
      question: "Can I replace an existing article?",
      answer: "Yes. The importer creates or replaces the Sanity article by slug. Reusing an existing slug updates that article document."
    }
  ];

  return (
    <Card className="resource-workflow-help">
      <CardHeader>
        <CardTitle>How this workflow works</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem value={`help-${index}`} key={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function EmptyPacketState() {
  return (
    <div className="resource-empty-packet-state">
      <FileText aria-hidden="true" size={30} />
      <h3>No packet loaded yet</h3>
      <p>Paste or upload a generated Markdown packet to preview the parsed article fields before creating the Sanity document.</p>
      <small>Paste packet above or choose a .md file.</small>
    </div>
  );
}

function ParsedPacketPreview({
  packet,
  hasContent,
  missing,
  optional,
  selectedAuthor
}: {
  packet: ResourcePacket;
  hasContent: boolean;
  missing: string[];
  optional: string[];
  selectedAuthor?: ResourceAuthorOption;
}) {
  const status = !hasContent ? "No packet loaded" : missing.length ? "Missing required fields" : optional.length ? "Missing optional fields" : "Packet loaded";
  const statusVariant = !hasContent ? "muted" : missing.length ? "red" : optional.length ? "gold" : "default";

  return (
    <Card className="resource-packet-preview">
      <CardHeader className="resource-preview-header">
        <div>
          <p className="dashboard-eyebrow">Parsed Preview</p>
          <CardTitle>{hasContent ? packet.title || "Untitled packet" : "No packet loaded"}</CardTitle>
        </div>
        <Badge variant={statusVariant}>{status}</Badge>
      </CardHeader>
      <CardContent>
        {!hasContent ? (
          <EmptyPacketState />
        ) : (
          <>
            <dl className="resource-preview-grid">
              <FieldPreview label="Mode" value={packet.contentMode || emptyPacket.contentMode} />
              <FieldPreview label="Slug" value={packet.slug} tone={/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(packet.slug) ? "success" : "warning"} />
              <FieldPreview label="Resource Type" value={packet.resourceType} />
              <FieldPreview label="Category" value={packet.category} />
              <FieldPreview label="Tags" value={packet.tags} />
              <FieldPreview label="Focus Keyword" value={packet.focusKeyword} />
              <FieldPreview label="SEO Title" value={packet.seoTitle} />
              <FieldPreview label="Selected Sanity Author" value={authorLabel(selectedAuthor)} tone={selectedAuthor ? "success" : "warning"} />
              <FieldPreview label="Packet Author Text" value={packet.author} />
              <FieldPreview label="Featured Image Prompt" value={packet.featuredImagePrompt} />
              <FieldPreview label="Featured Image Alt Text" value={packet.featuredImageAlt} />
              <FieldPreview label="Featured Image Caption" value={packet.featuredImageCaption} />
              <FieldPreview label="Open Graph Image Alt Text" value={packet.ogImageAlt} />
            </dl>
            {missing.length > 0 && (
              <Alert tone="danger" className="resource-workflow-alert">
                <AlertTriangle aria-hidden="true" size={20} />
                <div>
                  <AlertTitle>Missing required fields</AlertTitle>
                  <AlertDescription>{missing.join(", ")}</AlertDescription>
                </div>
              </Alert>
            )}
            {missing.length === 0 && optional.length > 0 && (
              <Alert tone="warning" className="resource-workflow-alert">
                <AlertTriangle aria-hidden="true" size={20} />
                <div>
                  <AlertTitle>Recommended fields are missing</AlertTitle>
                  <AlertDescription>{optional.join(", ")}</AlertDescription>
                </div>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function ResourcePacketImporter({ authors }: { authors: ResourceAuthorOption[] }) {
  const [markdown, setMarkdown] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<"idle" | "importing">("idle");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(authors[0]?._id || "");
  const [subject, setSubject] = useState("");
  const [resourceType, setResourceType] = useState<ResourceTypeValue>("education");
  const [category, setCategory] = useState("Pet Care");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [contentNotes, setContentNotes] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [featuredImagePrompt, setFeaturedImagePrompt] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [featuredImageCaption, setFeaturedImageCaption] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileError, setFileError] = useState("");

  const packet = useMemo<ResourcePacket>(() => parseResourcePacket(markdown), [markdown]);
  const missing = useMemo(() => validateResourcePacket(packet), [packet]);
  const optional = useMemo(() => optionalMissing(packet), [packet]);
  const hasContent = markdown.trim().length > 0;
  const selectedAuthor = useMemo(() => authors.find((author) => author._id === selectedAuthorId), [authors, selectedAuthorId]);
  const imageUrlValid = isValidUrl(featuredImageUrl);
  const featuredImageAltRecommended = Boolean(featuredImageUrl.trim()) && !featuredImageAlt.trim();
  const prompt = useMemo(
    () =>
      buildPrompt({
        subject,
        focusKeyword,
        resourceType,
        category,
        selectedAuthor,
        contentNotes,
        featuredImageUrl,
        featuredImagePrompt,
        featuredImageAlt,
        featuredImageCaption
      }),
    [category, contentNotes, featuredImageAlt, featuredImageCaption, featuredImagePrompt, featuredImageUrl, focusKeyword, resourceType, selectedAuthor, subject]
  );

  const activeStep = hasContent ? 3 : copied ? 2 : contentNotes || featuredImagePrompt || featuredImageAlt || featuredImageCaption || featuredImageUrl ? 1 : 0;

  async function readFile(file?: File) {
    if (!file) return;
    if (!/(\.md|\.markdown)$/i.test(file.name) && !["text/markdown", "text/plain"].includes(file.type)) {
      setFileError("File must be a Markdown file.");
      return;
    }
    setFileError("");
    setFileName(file.name);
    setResult(null);
    setMarkdown(await file.text());
  }

  async function importPacket() {
    setStatus("importing");
    setResult(null);

    try {
      const response = await fetch("/api/sanity/import-resource-packet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, authorId: selectedAuthorId })
      });
      const data = (await response.json().catch(() => ({}))) as ImportResult;
      setResult(response.ok ? data : { error: data.error || "Import failed." });
    } catch {
      setResult({ error: "Import failed. Check your connection and try again." });
    } finally {
      setStatus("idle");
    }
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="resource-workflow-shell" aria-labelledby="ai-resource-workflow">
      <div className="resource-workflow-choice-grid">
        <ManualWorkflowCard />
        <AiWorkflowIntroCard />
      </div>

      <Card id="ai-resource-workflow" className="resource-ai-workflow-card">
        <CardHeader className="resource-ai-workflow-head">
          <div>
            <Badge variant="red">Admin tool</Badge>
            <CardTitle>Create a structured AI prompt, include featured image guidance, paste the generated Markdown packet, and import it directly into Sanity.</CardTitle>
            <CardDescription>
              The selected Sanity author controls the actual linked author. Packet author text is preview-only and will not create a new author.
            </CardDescription>
          </div>
          <Stepper activeStep={activeStep} />
        </CardHeader>
        <CardContent className="resource-ai-workflow-content">
          <section className="resource-workflow-step-card" aria-labelledby="article-basics-step">
            <div className="resource-step-heading">
              <span>1</span>
              <div>
                <h2 id="article-basics-step">Article Basics</h2>
                <p>Set the required article metadata and choose the existing Sanity author.</p>
              </div>
            </div>
            <div className="resource-form-grid">
              <label className="dashboard-field">
                <span>Article subject</span>
                <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Kitten vaccines in Northern Kentucky" />
                <small>What should this article help pet owners understand?</small>
              </label>
              <label className="dashboard-field">
                <span>Focus keyword</span>
                <input value={focusKeyword} onChange={(event) => setFocusKeyword(event.target.value)} placeholder="kitten vaccines Northern Kentucky" />
                <small>Primary SEO phrase, usually location-based.</small>
              </label>
              <label className="dashboard-field">
                <span>Article type</span>
                <select value={resourceType} onChange={(event) => setResourceType(event.target.value as ResourceTypeValue)}>
                  {resourceTypes.map((type) => (
                    <option value={type.value} key={type.value}>{type.label}</option>
                  ))}
                </select>
              </label>
              <label className="dashboard-field">
                <span>Category</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => (
                    <option value={item} key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="dashboard-field resource-form-grid-full">
                <span>Existing Sanity author</span>
                <select value={selectedAuthorId} onChange={(event) => setSelectedAuthorId(event.target.value)}>
                  {!authors.length && <option value="">No authors found</option>}
                  {authors.map((author) => (
                    <option value={author._id} key={author._id}>{authorLabel(author)}</option>
                  ))}
                </select>
                <small>This controls the actual linked Sanity author. Packet author text is only a preview.</small>
              </label>
            </div>
          </section>

          <Separator />

          <section className="resource-workflow-step-card" aria-labelledby="content-image-step">
            <div className="resource-step-heading">
              <span>2</span>
              <div>
                <h2 id="content-image-step">Content and Image Direction</h2>
                <p>Give AI the article angle, source expectations, and featured image guidance.</p>
              </div>
            </div>
            <div className="resource-direction-grid">
              <div className="resource-direction-main">
                <label className="dashboard-field">
                  <span>Wanted content</span>
                  <textarea
                    value={contentNotes}
                    onChange={(event) => setContentNotes(event.target.value)}
                    placeholder="Mention first-year vaccine timing, what records to bring, when to call sooner, Fort Thomas and Independence locations, and sources from AVMA/AAHA."
                    rows={7}
                  />
                </label>
                <Card className="resource-featured-image-card">
                  <CardHeader>
                    <ImageIcon aria-hidden="true" size={22} />
                    <div>
                      <CardTitle>Featured image</CardTitle>
                      <CardDescription>
                        Add or describe the main image for this resource article. This image should support SEO, accessibility, and social sharing.
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="resource-featured-image-fields">
                    <label className="dashboard-field">
                      <span>Featured image file or URL</span>
                      <input value={featuredImageUrl} onChange={(event) => setFeaturedImageUrl(event.target.value)} placeholder="https://example.com/image.jpg" />
                      <small>Upload support is not wired here yet. URLs are used as prompt/import guidance, not stored as Sanity image assets.</small>
                    </label>
                    {!imageUrlValid && <p className="resource-field-warning">Featured image URL is invalid.</p>}
                    <label className="dashboard-field">
                      <span>Featured image prompt/description</span>
                      <textarea
                        value={featuredImagePrompt}
                        onChange={(event) => setFeaturedImagePrompt(event.target.value)}
                        placeholder="A realistic dog and cat at a Northern Kentucky veterinary clinic exam room"
                        rows={3}
                      />
                    </label>
                    <label className="dashboard-field">
                      <span>Featured image alt text</span>
                      <input
                        value={featuredImageAlt}
                        onChange={(event) => setFeaturedImageAlt(event.target.value)}
                        placeholder="Veterinarian examining a dog and cat at Veterinary Medical Centers in Northern Kentucky"
                      />
                    </label>
                    {featuredImageAltRecommended && <p className="resource-field-warning">Featured image alt text is recommended when a featured image URL is provided.</p>}
                    <label className="dashboard-field">
                      <span>Featured image caption</span>
                      <input
                        value={featuredImageCaption}
                        onChange={(event) => setFeaturedImageCaption(event.target.value)}
                        placeholder="Preventive veterinary care for pets in Fort Thomas and Independence, Kentucky"
                      />
                    </label>
                  </CardContent>
                </Card>
              </div>
              <Alert tone="default" className="resource-guidance-card">
                <ImageIcon aria-hidden="true" size={20} />
                <div>
                  <AlertTitle>Content guidance</AlertTitle>
                  <AlertDescription>
                    Mention local Northern Kentucky and Cincinnati relevance. Include prevention tips, symptoms, when to call the vet, safe disclaimers, credible sources, visual callouts, FAQs, CTA sections, and image opportunities like diagrams, checklists, lifecycle visuals, comparison charts, or seasonal risk maps.
                  </AlertDescription>
                </div>
              </Alert>
            </div>
            <Alert tone="default" className="resource-workflow-alert">
              <ImageIcon aria-hidden="true" size={20} />
              <div>
                <AlertTitle>Featured image planning</AlertTitle>
                <AlertDescription>
                  Featured image fields help with SEO, accessibility, and social sharing. If no image is uploaded yet, the prompt and alt text can be saved as editorial guidance.
                </AlertDescription>
              </div>
            </Alert>
          </section>

          <Separator />

          <section className="resource-workflow-step-card" aria-labelledby="prompt-step">
            <div className="resource-step-heading">
              <span>3</span>
              <div>
                <h2 id="prompt-step">Generate Prompt</h2>
                <p>Copy this prompt into your AI tool, then bring the generated Markdown packet back here.</p>
              </div>
            </div>
            <Card className="resource-prompt-output-card">
              <CardHeader className="resource-prompt-output-head">
                <div>
                  <CardTitle>Prompt is ready</CardTitle>
                  <CardDescription>Includes SEO fields, featured image guidance, article body, FAQs, source links, internal links, and CTA guidance.</CardDescription>
                </div>
                <ShadButton type="button" onClick={copyPrompt}>
                  {copied ? <Check aria-hidden="true" size={16} /> : <Clipboard aria-hidden="true" size={16} />}
                  {copied ? "Copied" : "Copy Prompt"}
                </ShadButton>
              </CardHeader>
              <CardContent>
                <pre className="resource-prompt-preview" aria-label="Generated AI prompt">{prompt}</pre>
                {copied && <p className="resource-copy-status" role="status">Prompt copied to clipboard.</p>}
              </CardContent>
            </Card>
          </section>

          <Separator />

          <section className="resource-workflow-step-card" aria-labelledby="import-step">
            <div className="resource-step-heading">
              <span>4</span>
              <div>
                <h2 id="import-step">Import Packet</h2>
                <p>Paste the AI-generated Markdown packet or upload a .md file. The importer will preview the parsed fields, featured image guidance, SEO metadata, and author connection before creating the Sanity document.</p>
              </div>
            </div>

            <Tabs defaultValue="paste" className="resource-import-tabs">
              <TabsList>
                <TabsTrigger value="paste">Paste Markdown</TabsTrigger>
                <TabsTrigger value="upload">Upload Markdown File</TabsTrigger>
              </TabsList>
              <TabsContent value="paste">
                <label className="dashboard-field">
                  <span>Markdown packet</span>
                  <textarea
                    value={markdown}
                    onChange={(event) => {
                      setMarkdown(event.target.value);
                      setResult(null);
                    }}
                    placeholder="## Content Mode&#10;advanced&#10;&#10;## Title..."
                    rows={12}
                  />
                </label>
              </TabsContent>
              <TabsContent value="upload">
                <label className="resource-packet-dropzone">
                  <FileUp aria-hidden="true" size={24} />
                  <span>
                    <strong>{fileName || "Choose a .md packet file"}</strong>
                    <small>Markdown files only. You can also paste the packet in the Paste Markdown tab.</small>
                  </span>
                  <input type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={(event) => readFile(event.target.files?.[0])} />
                </label>
                {fileError && <p className="resource-packet-error">{fileError}</p>}
              </TabsContent>
            </Tabs>

            <ParsedPacketPreview packet={packet} hasContent={hasContent} missing={missing} optional={optional} selectedAuthor={selectedAuthor} />

            <Alert tone="warning" className="resource-workflow-alert">
              <AlertTriangle aria-hidden="true" size={20} />
              <div>
                <AlertTitle>Confirm the author before creation</AlertTitle>
                <AlertDescription>
                  The selected Sanity author from the dropdown will be used as the linked author. Packet author text is preview-only and will not create a new author.
                </AlertDescription>
              </div>
            </Alert>

            {result?.error && <p className="resource-packet-error">{result.error}</p>}
            {result?.publicUrl && (
              <p className="resource-packet-success">
                Imported <strong>{result.title}</strong>.{" "}
                <Link href={result.publicUrl} target="_blank" rel="noopener noreferrer">
                  View public article
                </Link>
                {result.studioUrl ? (
                  <>
                    {" "}or{" "}
                    <Link href={result.studioUrl} target="_blank" rel="noopener noreferrer">
                      open in Studio
                    </Link>
                  </>
                ) : null}
                .
              </p>
            )}

            <div className="resource-workflow-actions">
              <ShadButton
                type="button"
                disabled={!hasContent || !selectedAuthorId || missing.length > 0 || status === "importing"}
                onClick={importPacket}
              >
                {status === "importing" ? <Loader2 aria-hidden="true" size={16} /> : <CheckCircle aria-hidden="true" size={16} />}
                {status === "importing" ? "Importing..." : "Create Article in Sanity"}
              </ShadButton>
              <ShadButton asChild variant="ghost">
                <Link href="/studio/" target="_blank" rel="noopener noreferrer">
                  Open Studio
                </Link>
              </ShadButton>
            </div>
          </section>
        </CardContent>
      </Card>

      <WorkflowHelpAccordion />
    </section>
  );
}
