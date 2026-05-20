"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, Check, CheckCircle, Clipboard, FileUp, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseResourcePacket, validateResourcePacket, type ResourcePacket } from "@/lib/resource-packet-parser";
import type { ResourceAuthorOption } from "@/sanity/authors";

type ResourceTypeValue = "education" | "faq" | "blog" | "clinic-news";
type ImportResult = { error?: string; publicUrl?: string; studioUrl?: string; title?: string; slug?: string };

const steps = ["Content Type", "Details", "Image & Notes", "AI Instructions", "Import", "Review"];
const categories = ["Pet Care", "Wellness", "Dental Care", "Puppy & Kitten Care", "Senior Pet Care", "Clinic News"];
const contentTypes: Array<{ value: ResourceTypeValue; title: string; body: string }> = [
  { value: "education", title: "Educational guide", body: "Best for helpful pet care articles, prevention guides, and condition overviews." },
  { value: "faq", title: "FAQ resource", body: "Best for answering common questions from pet owners." },
  { value: "blog", title: "Blog article", body: "Best for timely topics, seasonal advice, and general updates." },
  { value: "clinic-news", title: "Clinic news", body: "Best for announcements, location updates, and practice news." }
];

function authorLabel(author?: ResourceAuthorOption) {
  return author ? [author.name, author.credentials, author.title].filter(Boolean).join(" | ") : "Choose an author";
}

function optionalMissing(packet: ResourcePacket) {
  return [
    !packet.excerpt && "Excerpt",
    !packet.seoTitle && "SEO title",
    !packet.seoDescription && "SEO description",
    !packet.focusKeyword && "Focus keyword",
    !packet.tags.length && "Tags",
    !packet.faqMarkdown && "FAQ",
    !packet.sourcesMarkdown && "Source links",
    !packet.featuredImagePrompt && "Featured image prompt",
    !packet.featuredImageAlt && "Featured image alt text",
    !packet.featuredImageCaption && "Featured image caption",
    !packet.ogImageAlt && "Open Graph image alt text"
  ].filter(Boolean) as string[];
}

function buildPrompt({
  resourceType,
  subject,
  focusKeyword,
  category,
  author,
  notes,
  imageUrl,
  imagePrompt,
  imageAlt,
  imageCaption
}: {
  resourceType: ResourceTypeValue;
  subject: string;
  focusKeyword: string;
  category: string;
  author?: ResourceAuthorOption;
  notes: string;
  imageUrl: string;
  imagePrompt: string;
  imageAlt: string;
  imageCaption: string;
}) {
  return `Create one complete Sanity Advanced Markdown resource article packet for Veterinary Medical Centers.

Article subject: ${subject || "[ARTICLE SUBJECT]"}
Resource Type value: ${resourceType}
Category: ${category}
Focus keyword: ${focusKeyword || "[FOCUS KEYWORD]"}
Author: ${author?.name || "[Selected Sanity author]"}
Audience: Dog and cat owners in Fort Thomas, Independence, Cincinnati, and surrounding Northern Kentucky communities.
Content notes:
${notes || "[Add the exact points, services, symptoms, season, location, or angle the article should cover.]"}

Featured image direction:
Featured image URL, if provided: ${imageUrl || "[No image URL provided]"}
Featured image prompt: ${imagePrompt || "A realistic dog and cat in a calm Northern Kentucky veterinary exam room."}
Featured image alt text draft: ${imageAlt || "Veterinarian examining a dog and cat at Veterinary Medical Centers in Northern Kentucky."}
Featured image caption draft: ${imageCaption || "Preventive veterinary care for pets in Fort Thomas and Independence, Kentucky."}

Output one Markdown packet only. Do not use YAML frontmatter. Do not wrap the answer in a code fence. Use these exact headings:

## Content Mode
## Title
## Slug
## Resource Type
## Category
## Tags
## Reading Time
## Author
## Reviewed By
## Excerpt
## SEO Title
## SEO Description
## Focus Keyword
## Secondary Keywords
## Featured Image Prompt
## Featured Image Alt Text
## Featured Image Caption
## Open Graph Image Alt Text
## Article Body
## FAQ
## Source Links
## Suggested Internal Links
## Suggested CTA

Requirements:
- Use advanced for Content Mode.
- Use lowercase letters, numbers, and hyphens only for Slug.
- Use H2 and H3 headings inside Article Body.
- Include the focus keyword naturally in the title or intro, first 100 words, at least one heading, body copy, and FAQ.
- Include local language: Veterinary Medical Centers, Fort Thomas, Independence, Northern Kentucky, Cincinnati, preventive veterinary care, and scheduling when relevant.
- Use safe, general veterinary education. Do not diagnose pets or promise outcomes.
- Include urgent-care guidance when symptoms or safety are discussed.
- Use credible sources such as AVMA, AAHA, CAPC, CDC, FDA, Cornell Feline Health Center, Merck Veterinary Manual, PubMed, or PubMed Central.
- Featured image guidance should be realistic, warm, local, professional, and not distressing.
- Do not invent authors or reviewers. Keep Reviewed By blank unless a reviewer is explicitly provided.
- The selected Sanity author controls the actual linked author. Packet author text is preview-only.`;
}

function WizardStepper({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  return (
    <div className="create-wizard-stepper" aria-label="Create content steps">
      {steps.map((label, index) => (
        <button type="button" className={index === step ? "is-active" : index < step ? "is-complete" : ""} onClick={() => setStep(index)} key={label}>
          <strong>{index + 1}</strong>
          {label}
        </button>
      ))}
    </div>
  );
}

export function ResourceCreateWizard({ authors }: { authors: ResourceAuthorOption[] }) {
  const [step, setStep] = useState(0);
  const [resourceType, setResourceType] = useState<ResourceTypeValue | "">("");
  const [subject, setSubject] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [category, setCategory] = useState("Pet Care");
  const [authorId, setAuthorId] = useState(authors[0]?._id || "");
  const [notes, setNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "importing">("idle");
  const [result, setResult] = useState<ImportResult | null>(null);

  const selectedAuthor = useMemo(() => authors.find((author) => author._id === authorId), [authors, authorId]);
  const packet = useMemo(() => parseResourcePacket(markdown), [markdown]);
  const missing = useMemo(() => validateResourcePacket(packet), [packet]);
  const optional = useMemo(() => optionalMissing(packet), [packet]);
  const hasPacket = markdown.trim().length > 0;
  const prompt = useMemo(
    () => buildPrompt({ resourceType: (resourceType || "education") as ResourceTypeValue, subject, focusKeyword, category, author: selectedAuthor, notes, imageUrl, imagePrompt, imageAlt, imageCaption }),
    [category, focusKeyword, imageAlt, imageCaption, imagePrompt, imageUrl, notes, resourceType, selectedAuthor, subject]
  );

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function readFile(file?: File) {
    if (!file) return;
    if (!/\.(md|markdown)$/i.test(file.name)) {
      setResult({ error: "File must be a Markdown file." });
      return;
    }
    setResult(null);
    setFileName(file.name);
    setMarkdown(await file.text());
  }

  async function createArticle() {
    setStatus("importing");
    setResult(null);
    try {
      const response = await fetch("/api/sanity/import-resource-packet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown, authorId })
      });
      const data = (await response.json().catch(() => ({}))) as ImportResult;
      setResult(response.ok ? data : { error: data.error || "Import failed." });
    } catch {
      setResult({ error: "Import failed. Check your connection and try again." });
    } finally {
      setStatus("idle");
    }
  }

  if (result?.publicUrl) {
    return (
      <Card className="create-success-card">
        <CardContent>
          <CheckCircle aria-hidden="true" size={36} />
          <h1>Article created in Sanity</h1>
          <p>{result.title} is ready for review.</p>
          <div className="create-wizard-actions">
            {result.studioUrl && <ShadButton asChild><Link href={result.studioUrl} target="_blank" rel="noopener noreferrer">Edit in Studio</Link></ShadButton>}
            <ShadButton asChild variant="ghost"><Link href={result.publicUrl} target="_blank" rel="noopener noreferrer">View Public Page</Link></ShadButton>
            <ShadButton type="button" variant="ghost" onClick={() => window.location.reload()}>Create Another Article</ShadButton>
            <ShadButton asChild variant="ghost"><Link href="/dashboard/resources/">Back to Resources</Link></ShadButton>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="create-content-wizard">
      <WizardStepper step={step} setStep={setStep} />
      <Card className="create-wizard-card">
        {step === 0 && (
          <>
            <CardHeader><CardTitle>What are you creating?</CardTitle><CardDescription>Choose the type of resource article you want to build.</CardDescription></CardHeader>
            <CardContent>
              <div className="content-type-grid">
                {contentTypes.map((type) => (
                  <button type="button" className={resourceType === type.value ? "is-selected" : ""} onClick={() => setResourceType(type.value)} key={type.value}>
                    <Sparkles aria-hidden="true" size={20} />
                    <strong>{type.title}</strong>
                    <span>{type.body}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </>
        )}

        {step === 1 && (
          <>
            <CardHeader><CardTitle>Tell us the basics</CardTitle><CardDescription>These details shape the article and prevent duplicate authors.</CardDescription></CardHeader>
            <CardContent className="create-form-grid">
              <label className="dashboard-field"><span>Article subject</span><input value={subject} onChange={(event) => setSubject(event.target.value)} /><small>What should this article help pet owners understand?</small></label>
              <label className="dashboard-field"><span>Focus keyword</span><input value={focusKeyword} onChange={(event) => setFocusKeyword(event.target.value)} /><small>The main phrase someone might type into Google.</small></label>
              <label className="dashboard-field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><small>Where this article should live in the Resource Center.</small></label>
              <label className="dashboard-field"><span>Existing Sanity author</span><select value={authorId} onChange={(event) => setAuthorId(event.target.value)}>{authors.map((author) => <option value={author._id} key={author._id}>{authorLabel(author)}</option>)}</select><small>Choose the real author profile from Sanity. This prevents duplicate authors.</small></label>
              {authors.length === 0 && <Alert tone="danger"><AlertTriangle aria-hidden="true" size={18} /><div><AlertTitle>No Sanity authors found</AlertTitle><AlertDescription>Add or restore an author in Sanity before creating a resource article.</AlertDescription></div></Alert>}
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader><CardTitle>Add image guidance and article notes</CardTitle><CardDescription>Give AI the article direction and a clear featured image plan.</CardDescription></CardHeader>
            <CardContent className="create-notes-grid">
              <label className="dashboard-field"><span>Wanted content notes</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={8} /></label>
              <div>
                <Tabs defaultValue="describe">
                  <TabsList><TabsTrigger value="upload">Upload/select image</TabsTrigger><TabsTrigger value="url">Paste image URL</TabsTrigger><TabsTrigger value="describe">Describe image for later</TabsTrigger></TabsList>
                  <TabsContent value="upload"><Alert tone="default"><ImageIcon aria-hidden="true" size={18} /><div><AlertTitle>Coming soon</AlertTitle><AlertDescription>Use the image description fields for now. Sanity image upload can happen in Studio after creation.</AlertDescription></div></Alert></TabsContent>
                  <TabsContent value="url"><label className="dashboard-field"><span>Image URL</span><input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://example.com/image.jpg" /><small>If used, this is treated as image planning guidance unless Sanity image URL support is added.</small></label></TabsContent>
                  <TabsContent value="describe"><label className="dashboard-field"><span>Describe the image you want</span><textarea value={imagePrompt} onChange={(event) => setImagePrompt(event.target.value)} placeholder="A realistic dog and cat in a calm Northern Kentucky veterinary exam room." rows={4} /></label></TabsContent>
                </Tabs>
                <label className="dashboard-field"><span>Featured image alt text</span><input value={imageAlt} onChange={(event) => setImageAlt(event.target.value)} /><small>Describe the image for people using screen readers. Keep it natural and specific.</small></label>
                <label className="dashboard-field"><span>Featured image caption</span><input value={imageCaption} onChange={(event) => setImageCaption(event.target.value)} /></label>
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader><CardTitle>Copy the AI instructions</CardTitle><CardDescription>These instructions tell AI how to write the article, format the Markdown packet, include SEO fields, add image guidance, and use safe veterinary language.</CardDescription></CardHeader>
            <CardContent>
              <Alert tone="success" className="create-copy-card"><CheckCircle aria-hidden="true" size={20} /><div><AlertTitle>Your AI instructions are ready</AlertTitle><AlertDescription>Copy them, paste into ChatGPT or your AI writing tool, then return here with the generated Markdown packet.</AlertDescription></div></Alert>
              <div className="create-wizard-actions"><ShadButton type="button" onClick={copyPrompt}>{copied ? <Check aria-hidden="true" size={16} /> : <Clipboard aria-hidden="true" size={16} />}{copied ? "Copied" : "Copy AI Instructions"}</ShadButton></div>
              {copied && <p className="resource-copy-status" role="status">Copied. Paste these instructions into ChatGPT or your AI writing tool, then return here with the generated Markdown packet.</p>}
              <Accordion type="single" collapsible><AccordionItem value="prompt"><AccordionTrigger>View full AI instructions</AccordionTrigger><AccordionContent><pre className="resource-prompt-preview">{prompt}</pre></AccordionContent></AccordionItem></Accordion>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader><CardTitle>Import the finished article</CardTitle><CardDescription>Paste the Markdown packet generated by AI, or upload a .md file. The tool will check the fields before creating the Sanity article.</CardDescription></CardHeader>
            <CardContent>
              <Tabs defaultValue="paste">
                <TabsList><TabsTrigger value="paste">Paste Markdown</TabsTrigger><TabsTrigger value="upload">Upload .md File</TabsTrigger></TabsList>
                <TabsContent value="paste"><label className="dashboard-field"><span>Markdown packet</span><textarea value={markdown} onChange={(event) => setMarkdown(event.target.value)} rows={14} /></label></TabsContent>
                <TabsContent value="upload"><label className="resource-packet-dropzone"><FileUp aria-hidden="true" size={24} /><span><strong>{fileName || "Choose a .md file"}</strong><small>Markdown files only.</small></span><input type="file" accept=".md,.markdown,text/markdown,text/plain" onChange={(event) => readFile(event.target.files?.[0])} /></label></TabsContent>
              </Tabs>
              {result?.error && <p className="resource-packet-error">{result.error}</p>}
              {!hasPacket && <div className="resource-empty-packet-state"><FileTextIcon /><h3>No article packet added yet.</h3><p>Paste the generated Markdown packet or upload a .md file to continue.</p></div>}
            </CardContent>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader><CardTitle>Review before creating</CardTitle><CardDescription>Check the article summary, author connection, featured image guidance, and SEO details.</CardDescription></CardHeader>
            <CardContent className="review-create-grid">
              <ReviewBlock title="Article summary" items={[["Title", packet.title], ["Slug", packet.slug], ["Category", packet.category], ["Resource type", packet.resourceType], ["Focus keyword", packet.focusKeyword], ["Excerpt", packet.excerpt]]} />
              <ReviewBlock title="Author" items={[["Selected Sanity author", authorLabel(selectedAuthor)], ["Packet author text", `${packet.author || "Not found"} (preview only)`]]} />
              <ReviewBlock title="Featured image" imageUrl={imageUrl} imageAlt={imageAlt || packet.featuredImageAlt || packet.title} items={[["Image URL", imageUrl], ["Image prompt", packet.featuredImagePrompt], ["Alt text", packet.featuredImageAlt], ["Caption", packet.featuredImageCaption]]} />
              <ReviewBlock title="SEO" items={[["SEO title", packet.seoTitle], ["SEO description", packet.seoDescription], ["Secondary keywords", packet.secondaryKeywords.join(", ")], ["Open Graph image alt text", packet.ogImageAlt]]} />
              <div className="review-status-row">
                {missing.length === 0 ? <Badge variant="default">Ready</Badge> : <Badge variant="red">Missing required field</Badge>}
                {optional.length > 0 && <Badge variant="gold">Missing recommended field</Badge>}
              </div>
              {missing.length > 0 && <Alert tone="danger"><AlertTriangle aria-hidden="true" size={18} /><div><AlertTitle>Required fields missing</AlertTitle><AlertDescription>{missing.join(", ")}</AlertDescription></div></Alert>}
              <Alert tone="warning"><AlertTriangle aria-hidden="true" size={18} /><div><AlertTitle>Author source of truth</AlertTitle><AlertDescription>The selected Sanity author will be used as the linked author. Packet author text is only a reference and will not create a new author.</AlertDescription></div></Alert>
              {result?.error && <p className="resource-packet-error">{result.error}</p>}
              <ShadButton type="button" disabled={!hasPacket || missing.length > 0 || !authorId || status === "importing"} onClick={createArticle}>{status === "importing" ? <Loader2 aria-hidden="true" size={16} /> : <CheckCircle aria-hidden="true" size={16} />}{status === "importing" ? "Creating..." : "Create Article in Sanity"}</ShadButton>
            </CardContent>
          </>
        )}

        <CardContent className="create-wizard-footer">
          <ShadButton type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</ShadButton>
          <ShadButton type="button" disabled={(step === 0 && !resourceType) || (step === 1 && (!subject || !authorId)) || (step === 4 && !hasPacket) || step === 5} onClick={() => setStep(Math.min(5, step + 1))}>Continue</ShadButton>
        </CardContent>
      </Card>
    </div>
  );
}

function FileTextIcon() {
  return <Clipboard aria-hidden="true" size={28} />;
}

function ReviewBlock({ title, items, imageUrl, imageAlt }: { title: string; items: Array<[string, string | undefined]>; imageUrl?: string; imageAlt?: string }) {
  return (
    <Card className="review-block-card">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        {imageUrl && <img className="review-image-preview" src={imageUrl} alt={imageAlt || "Featured image preview"} />}
        {items.map(([label, value]) => <p key={label}><strong>{label}</strong><span>{value || "Not found"}</span></p>)}
      </CardContent>
    </Card>
  );
}
