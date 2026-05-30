import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  FolderOpen,
  HeartPulse,
  Lightbulb,
  Mail,
  Navigation,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRound
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Separator } from "@/components/ui/separator";
import { absoluteUrl, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";
import { authorDisplayName, authorProfilePath, authorTitleLine } from "@/sanity/authors";
import { urlFor } from "@/sanity/image";
import { getBlogPost, getBlogSlugs, getRelatedBlogPosts, type BlogAuthor, type BlogPost } from "@/sanity/posts";

type Params = { params: Promise<{ slug: string }> };

type FallbackSection = {
  title: string;
  body: string[];
  list?: string[];
  callout?: {
    title: string;
    body: string;
    tone?: "tip" | "warning" | "next-step" | "vet-note";
  };
};

type FallbackArticle = {
  quickAnswer: string;
  sections: FallbackSection[];
};

type RelatedCardItem = {
  title: string;
  slug?: string;
  href: string;
  date?: string;
  category: string;
  excerpt: string;
  image?: string;
  imageAlt: string;
};

type PortableCallout = {
  tone?: "tip" | "warning" | "next-step" | "vet-note";
  title?: string;
  body?: unknown;
};

type PortableFaqBlock = {
  title?: string;
  questions?: Array<{ question?: string; answer?: unknown }>;
  items?: Array<{ question?: string; answer?: unknown }>;
  faqs?: Array<{ question?: string; answer?: unknown }>;
};

type PortableCtaBlock = {
  eyebrow?: string;
  title?: string;
  body?: unknown;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const resourceTypeLabels = {
  blog: "Blog",
  education: "Education Guide",
  "clinic-news": "Clinic News",
  faq: "FAQ Resource"
} as const;

const calloutLabels = {
  tip: "Vet Tip",
  warning: "Important",
  "next-step": "Next Step",
  "vet-note": "Vet Note"
} as const;

const calloutIcons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  "next-step": ShieldCheck,
  "vet-note": HeartPulse
} as const;

const calloutTones = {
  tip: "default",
  warning: "warning",
  "next-step": "success",
  "vet-note": "default"
} as const;

const fallbackRelatedCards: RelatedCardItem[] = [
  {
    title: "Pet Wellness Exams in Northern Kentucky",
    href: "/services/pet-wellness-exams-northern-kentucky/",
    date: "2026-01-15",
    category: "Preventive Care",
    excerpt: "What to expect from routine dog and cat wellness care at Veterinary Medical Centers.",
    image: "/images/veterinary-care-hero.jpg",
    imageAlt: "Veterinary Medical Centers clinic exterior in Northern Kentucky"
  },
  {
    title: "New Patient Resources",
    href: "/new-patients/",
    date: "2026-01-15",
    category: "New Patients",
    excerpt: "Helpful next steps for new dog and cat patients visiting our Fort Thomas or Independence clinics.",
    image: "/images/vet-stock2.jpg",
    imageAlt: "Veterinary team member helping a pet"
  },
  {
    title: "Preparing Your Cat for a Less Stressful Vet Visit",
    href: "/resources/preparing-your-cat-for-a-less-stressful-vet-visit/",
    date: "2026-02-10",
    category: "Cat Care",
    excerpt: "Simple carrier, travel, and appointment-prep tips for a calmer veterinary visit.",
    image: "/images/cat-closeup-hero.png",
    imageAlt: "Cat receiving gentle veterinary care"
  }
];

function displayDate(date?: string) {
  if (!date) return "Recently updated";
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

function imageUrl(post: BlogPost, width = 1280, height = 720) {
  return post.image ? urlFor(post.image).width(width).height(height).fit("crop").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

function schemaImageUrl(post: BlogPost) {
  return post.image ? urlFor(post.image).width(1200).height(630).fit("crop").url() : absoluteUrl(post.featuredImage || "/images/veterinary-care-hero.jpg");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function blockText(block: PortableTextBlock) {
  const children = Array.isArray(block.children) ? block.children : [];
  return children.map((child) => ("text" in child && typeof child.text === "string" ? child.text : "")).join("");
}

function portableTextPlainText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(portableTextPlainText).filter(Boolean).join(" ");
  if (typeof value === "object") {
    const objectValue = value as Record<string, unknown>;
    if (typeof objectValue.text === "string") return objectValue.text;
    if (Array.isArray(objectValue.children)) return portableTextPlainText(objectValue.children);
    if (Array.isArray(objectValue.body)) return portableTextPlainText(objectValue.body);
    if (typeof objectValue.body === "string") return objectValue.body;
  }
  return "";
}

function readingTime(post: BlogPost, markdownBody?: string) {
  if (post.readingTime) return post.readingTime;
  const markdownText = [markdownBody, post.faqMarkdown, post.sourcesMarkdown].filter(Boolean).join(" ");
  const richText = post.body?.length ? portableTextPlainText(post.body) : "";
  const text = post.contentMode === "advanced" ? markdownText || richText || post.excerpt : richText || markdownText || post.content?.join(" ") || post.excerpt;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 220))} min read`;
}

function shouldRenderMarkdown(post: BlogPost, markdownBody?: string) {
  return post.contentMode === "advanced" || (!post.body?.length && Boolean(markdownBody));
}

async function resolveMarkdownBody(post: BlogPost) {
  if (post.bodyMarkdown?.trim()) return post.bodyMarkdown;
  if (post.contentMode !== "advanced" || !post.bodyMarkdownFileUrl) return undefined;

  try {
    const response = await fetch(post.bodyMarkdownFileUrl, { next: { revalidate: 30 } });
    if (!response.ok) return undefined;
    return await response.text();
  } catch {
    return undefined;
  }
}

function headingIdFromText(text: string) {
  return slugify(text) || "section";
}

function headingId(block: PortableTextBlock) {
  const text = blockText(block);
  const keySuffix = typeof block._key === "string" ? `-${block._key.slice(-6)}` : "";
  return `${headingIdFromText(text)}${keySuffix}`;
}

function markdownPlainText(value: string) {
  return value
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitMarkdownQuickAnswer(value?: string) {
  if (!value?.trim()) return { body: value };
  const lines = value.trim().split(/\r?\n/);
  const start = lines.findIndex((line) => /^#{2,3}\s+quick answer\b/i.test(line.trim()));
  if (start === -1) return { body: value };

  const next = lines.findIndex((line, index) => index > start && /^##\s+/.test(line.trim()));
  const end = next === -1 ? lines.length : next;
  const quickAnswerMarkdown = lines.slice(start + 1, end).join("\n").trim();
  const body = [...lines.slice(0, start), ...lines.slice(end)].join("\n").trim();

  return {
    quickAnswer: quickAnswerMarkdown ? markdownPlainText(quickAnswerMarkdown) : undefined,
    body: body || undefined
  };
}

function fallbackArticle(post: BlogPost): FallbackArticle {
  if (post.slug === "how-often-should-my-pet-see-the-vet") {
    return {
      quickAnswer:
        "Most healthy adult dogs and cats should usually have a wellness visit at least once a year. Puppies, kittens, seniors, and pets with ongoing health needs may need visits more often.",
      sections: [
        {
          title: "Why routine vet visits matter",
          body: [
            "Wellness visits give your veterinary team a chance to track changes that may be hard to notice at home. Weight shifts, dental disease, skin concerns, mobility changes, and early behavior changes can all be easier to address when they are found sooner.",
            "These visits are also a practical time to review vaccines, parasite prevention, nutrition, lifestyle, and questions specific to your dog or cat."
          ]
        },
        {
          title: "Puppies and kittens",
          body: [
            "Young pets usually need several visits during their first months of life. These appointments help your veterinary team build a safe vaccine plan, check growth, discuss parasite prevention, and answer early training, nutrition, and behavior questions."
          ],
          list: [
            "Bring any vaccine or adoption records you have.",
            "Ask about timing for boosters, parasite prevention, and spay or neuter planning.",
            "Call if your puppy or kitten is not eating, vomiting, coughing, limping, or seems unusually tired."
          ]
        },
        {
          title: "Healthy adult dogs and cats",
          body: [
            "Many healthy adult pets do well with a yearly wellness exam. Even when your pet seems normal, a routine visit helps keep preventive care current and gives you a chance to discuss changes in activity, appetite, weight, dental health, or behavior."
          ]
        },
        {
          title: "Senior pets",
          body: [
            "Senior pets can change quickly, and many benefit from checkups more often than once a year. Your veterinarian may recommend more frequent exams or lab work depending on your pet's age, breed, lifestyle, and health history."
          ]
        },
        {
          title: "Pets with chronic conditions",
          body: [
            "Pets with ongoing conditions such as allergies, arthritis, dental disease, kidney concerns, thyroid disease, diabetes, heart disease, or recurring ear or skin problems often need a customized follow-up schedule.",
            "The right timing depends on your pet's diagnosis, medications, lab monitoring needs, and how stable the condition is."
          ]
        },
        {
          title: "Signs your pet should be seen sooner",
          body: [
            "Do not wait for a routine wellness visit if something changes suddenly or your pet seems uncomfortable. Contact the veterinary team so they can help you decide the safest next step."
          ],
          list: [
            "Vomiting, diarrhea, coughing, limping, or trouble breathing.",
            "Changes in appetite, thirst, urination, litter box habits, weight, or energy.",
            "New lumps, wounds, itching, ear odor, eye concerns, or signs of pain.",
            "Behavior changes such as hiding, restlessness, confusion, or aggression."
          ]
        },
        {
          title: "What happens during a wellness visit",
          body: [
            "A wellness visit usually includes a nose-to-tail physical exam, weight check, review of lifestyle and medical history, vaccine and parasite prevention discussion, and time for your questions.",
            "Depending on your pet's age and health, your veterinarian may also discuss dental care, lab work, nutrition, mobility, behavior, or monitoring for early disease."
          ]
        },
        {
          title: "Book care in Fort Thomas or Independence",
          body: [
            "Veterinary Medical Centers provide locally owned care for dogs and cats in Northern Kentucky. If you are not sure how often your pet should be seen, our team can help you choose a practical schedule for your pet's age, lifestyle, and health needs."
          ]
        }
      ]
    };
  }

  return {
    quickAnswer: post.excerpt || "This Veterinary Medical Centers resource gives pet owners practical guidance for common dog and cat care questions.",
    sections: (post.content?.length ? post.content : [post.excerpt]).map((paragraph, index) => ({
      title: index === 0 ? "Helpful guidance for your pet" : `What to know ${index + 1}`,
      body: [paragraph]
    }))
  };
}

function ResourceActions({ includeNewPatient = false, className = "" }: { includeNewPatient?: boolean; className?: string }) {
  return (
    <div className={`resource-editorial-actions ${className}`}>
      <ShadButton asChild>
        <Link href="/book-appointment/" aria-label="Book an appointment with Veterinary Medical Centers">
          <CalendarCheck aria-hidden="true" size={17} />
          Book Appointment
        </Link>
      </ShadButton>
      <ShadButton asChild variant="ghost">
        <Link href="/contact/" aria-label="Contact the Veterinary Medical Centers team">
          <Mail aria-hidden="true" size={17} />
          Contact Our Team
        </Link>
      </ShadButton>
      {includeNewPatient && (
        <ShadButton asChild variant="ghost">
          <Link href="/new-patient-registration-form/" aria-label="Open the new patient form">
            <FileText aria-hidden="true" size={17} />
            New Patient Form
          </Link>
        </ShadButton>
      )}
    </div>
  );
}

function ResourceHero({ post, resourceLabel, readTime }: { post: BlogPost; resourceLabel: string; readTime: string }) {
  return (
    <header className="resource-editorial-hero" aria-labelledby="resource-title">
      <Container className="resource-editorial-container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/resources/">Resources</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.category}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="resource-editorial-hero-copy">
          <Badge variant="red">{resourceLabel}</Badge>
          <h1 id="resource-title">{post.title}</h1>
          <p>{post.excerpt || "Helpful pet care guidance from Veterinary Medical Centers for Northern Kentucky dog and cat owners."}</p>
          <div className="resource-editorial-meta" aria-label="Article details">
            <span>
              <FolderOpen aria-hidden="true" size={16} />
              {post.category}
            </span>
            <span>
              <CalendarDays aria-hidden="true" size={16} />
              {displayDate(post.date)}
            </span>
            <span>
              <Clock3 aria-hidden="true" size={16} />
              {readTime}
            </span>
            <span>
              <UserRound aria-hidden="true" size={16} />
              {post.author.name}
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

function FeaturedImage({ post }: { post: BlogPost }) {
  return (
    <Container className="resource-editorial-container">
      <figure className="resource-editorial-image-frame">
        <Image
          className="resource-editorial-image"
          src={imageUrl(post)}
          alt={post.featuredImageAlt || `${post.title} from Veterinary Medical Centers`}
          width={1280}
          height={720}
          priority
          sizes="(max-width: 900px) 100vw, 1120px"
        />
        {post.featuredImageCaption && <figcaption>{post.featuredImageCaption}</figcaption>}
      </figure>
    </Container>
  );
}

function AuthorOrReviewCard({ post, readTime }: { post: BlogPost; readTime: string }) {
  return (
    <Container className="resource-editorial-container">
      <Card className="resource-editorial-info-card">
        <CardContent>
          <div className="resource-editorial-author-stack">
            <ArticleAuthorCard label="Written by" author={post.author} />
          </div>
          <Separator />
          <div className="resource-editorial-info-list">
            <p>
              <CheckCircle2 aria-hidden="true" size={17} />
              Written for dog and cat owners in Northern Kentucky.
            </p>
            <p>
              <Clock3 aria-hidden="true" size={17} />
              Estimated reading time: {readTime}.
            </p>
            <p>
              <Stethoscope aria-hidden="true" size={17} />
              For specific guidance, contact our veterinary team before changing your pet&apos;s care routine.
            </p>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

function ArticleAuthorCard({ label, author }: { label: string; author: BlogAuthor }) {
  const href = authorProfilePath(author);
  const credentialLine = authorTitleLine(author) || "Locally owned veterinary care for dogs and cats in Northern Kentucky.";
  const name = authorDisplayName(author);
  const heading = <h2>{name}</h2>;

  return (
    <div className="resource-editorial-author">
      <Avatar src={author.image} alt={author.imageAlt} size={58} />
      <div>
        <p className="eyebrow">{label}</p>
        {href ? (
          <Link className="resource-editorial-author-link" href={href}>
            {heading}
          </Link>
        ) : (
          heading
        )}
        <p>{credentialLine}</p>
        {href && <Link className="resource-editorial-profile-link" href={href}>View profile</Link>}
      </div>
    </div>
  );
}

function QuickAnswerCard({ children }: { children: string }) {
  return (
    <Card className="resource-quick-answer-card">
      <CardContent>
        <p className="eyebrow">Quick answer</p>
        <p>{children}</p>
        <p className="resource-quick-disclaimer">
          This resource is general education, not a diagnosis or emergency guidance. If you think your pet may be having an emergency, call a veterinary hospital or seek urgent care now.
        </p>
        <ResourceActions className="resource-quick-actions" />
      </CardContent>
    </Card>
  );
}

function BottomCTA() {
  return (
    <Card className="resource-editorial-cta resource-editorial-cta-bottom" aria-label="Veterinary Medical Centers next steps">
      <CardContent>
        <div className="resource-editorial-cta-main">
          <div className="resource-editorial-cta-copy">
            <div>
              <p className="eyebrow">Care in Northern Kentucky</p>
              <h2>Book care at our Fort Thomas or Independence clinic.</h2>
              <p>
                Our locally owned team can help with wellness visits, sick visits, dental care, diagnostics, surgery, and practical guidance before your appointment.
              </p>
            </div>
          </div>
          <ResourceActions includeNewPatient />
        </div>

        <div className="resource-location-map-grid" aria-label="Veterinary Medical Centers office locations">
          {site.locations.map((location) => (
            <article className="resource-location-map-card" key={location.id}>
              <div className="resource-location-map">
                <iframe
                  src={location.mapEmbedUrl}
                  title={`Map to Veterinary Medical Centers ${location.name}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="resource-location-map-content">
                <h3>{location.name}</h3>
                <address>{location.address}</address>
                <div className="resource-location-actions">
                  <a href={`tel:${location.tel}`}>
                    <Phone aria-hidden="true" size={15} />
                    {location.phone}
                  </a>
                  <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" size={15} />
                    Directions
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PortableCta({ value }: { value: PortableCtaBlock }) {
  const primaryHref = value.primaryHref || "/book-appointment/";
  const secondaryHref = value.secondaryHref || "/contact/";

  return (
    <Card className="resource-portable-cta">
      <CardContent className="resource-portable-cta-content">
        <div>
          <p className="eyebrow">{value.eyebrow || "Next step"}</p>
          <h3>{value.title || "Talk with our care team."}</h3>
          <p>{portableTextPlainText(value.body) || "We can help you decide what makes sense for your pet and your visit."}</p>
        </div>
        <div className="resource-editorial-actions">
          <ShadButton asChild>
            <Link href={primaryHref}>{value.primaryLabel || "Book Appointment"}</Link>
          </ShadButton>
          <ShadButton asChild variant="ghost">
            <Link href={secondaryHref}>{value.secondaryLabel || "Contact Our Team"}</Link>
          </ShadButton>
        </div>
      </CardContent>
    </Card>
  );
}

function PortableFaq({ value }: { value: PortableFaqBlock }) {
  const questions = value.questions || value.items || value.faqs || [];
  if (!questions.length) return null;

  return (
    <section className="resource-faq-block" aria-label={value.title || "Resource frequently asked questions"}>
      <h2>{value.title || "Common Questions"}</h2>
      <Accordion type="single" collapsible>
        {questions.map((item, index) => (
          <AccordionItem value={`faq-${index}`} key={`${item.question || "Question"}-${index}`}>
            <AccordionTrigger>{item.question || "Question"}</AccordionTrigger>
            <AccordionContent>
              <p>{portableTextPlainText(item.answer) || "Please contact our team for guidance specific to your pet."}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function StructuredSources({ post }: { post: BlogPost }) {
  if (!post.externalLinks.length || post.sourcesMarkdown) return null;

  return (
    <section className="resource-sources-section" aria-labelledby="article-sources">
      <h2 id="article-sources">Sources and references</h2>
      <ul className="resource-structured-sources">
        {post.externalLinks.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
            {link.source && <span>{link.source}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function reactNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return reactNodeText(props.children);
  }
  return "";
}

function MarkdownContent({ value, className = "" }: { value?: string; className?: string }) {
  if (!value?.trim()) return null;

  const components: Components = {
    h2: ({ children }) => <h2 id={headingIdFromText(reactNodeText(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={headingIdFromText(reactNodeText(children))}>{children}</h3>,
    p: ({ children }) => <p>{children}</p>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    hr: () => <Separator className="resource-markdown-separator" />,
    a: ({ href, children }) => {
      const linkHref = href || "#";
      const isExternal = /^https?:\/\//.test(linkHref);
      return isExternal ? (
        <a href={linkHref} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <Link href={linkHref}>{children}</Link>
      );
    },
    img: ({ src, alt }) => {
      if (!src) return null;
      return (
        <span className="resource-markdown-image">
          {/* eslint-disable-next-line @next/next/no-img-element -- Markdown images can come from arbitrary source URLs. */}
          <img src={src} alt={alt || ""} loading="lazy" />
        </span>
      );
    },
    table: ({ children }) => (
      <div className="resource-markdown-table-wrap">
        <table>{children}</table>
      </div>
    ),
    th: ({ children }) => <th>{children}</th>,
    td: ({ children }) => <td>{children}</td>,
    code: ({ children, className }) => <code className={className}>{children}</code>
  };

  return (
    <div className={`resource-markdown-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {value}
      </ReactMarkdown>
    </div>
  );
}

function portableComponents(): PortableTextComponents {
  return {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        return (
          <figure className="resource-inline-image">
            <Image
              src={urlFor(value).width(1100).height(680).fit("crop").url()}
              alt={value.alt || "Veterinary Medical Centers pet care resource image"}
              width={1100}
              height={680}
              sizes="(max-width: 900px) 100vw, 760px"
            />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      },
      callout: ({ value }) => {
        const callout = value as PortableCallout;
        const tone = callout.tone || "vet-note";
        const Icon = calloutIcons[tone] || HeartPulse;
        const label = calloutLabels[tone] || calloutLabels["vet-note"];

        return (
          <Alert className={`resource-callout resource-callout-${tone}`} tone={calloutTones[tone]} aria-label={label}>
            <Icon aria-hidden="true" size={22} />
            <div>
              <p className="eyebrow">{label}</p>
              {callout.title && <AlertTitle>{callout.title}</AlertTitle>}
              {callout.body ? <AlertDescription>{portableTextPlainText(callout.body)}</AlertDescription> : null}
            </div>
          </Alert>
        );
      },
      faq: ({ value }) => <PortableFaq value={value as PortableFaqBlock} />,
      faqs: ({ value }) => <PortableFaq value={value as PortableFaqBlock} />,
      cta: ({ value }) => <PortableCta value={value as PortableCtaBlock} />
    },
    block: {
      h2: ({ children, value }) => <h2 id={headingId(value as PortableTextBlock)}>{children}</h2>,
      h3: ({ children, value }) => <h3 id={headingId(value as PortableTextBlock)}>{children}</h3>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>
    },
    marks: {
      internalLink: ({ value, children }) => <Link href={value?.href || "/resources/"}>{children}</Link>,
      externalLink: ({ value, children }) => (
        <a href={value?.href || "#"} target={value?.openInNewTab === false ? undefined : "_blank"} rel="noopener noreferrer">
          {children}
        </a>
      ),
      link: ({ value, children }) => {
        const href = value?.href || "#";
        const isExternal = /^https?:\/\//.test(href);
        return isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ) : (
          <Link href={href}>{children}</Link>
        );
      }
    }
  };
}

function ArticleBody({ markdownBody, post }: { markdownBody?: string; post: BlogPost }) {
  const fallback = fallbackArticle(post);
  const components = portableComponents();
  const renderMarkdown = shouldRenderMarkdown(post, markdownBody);
  const markdownParts = renderMarkdown ? splitMarkdownQuickAnswer(markdownBody) : { body: undefined, quickAnswer: undefined };

  return (
    <Container className="resource-article-container">
      <article className="resource-article-card" aria-labelledby="resource-title">
        <div className="resource-article-content">
          <QuickAnswerCard>{markdownParts.quickAnswer || fallback.quickAnswer}</QuickAnswerCard>

          {renderMarkdown && markdownBody ? (
            <MarkdownContent value={markdownParts.body || markdownBody} />
          ) : post.body?.length ? (
            <PortableText value={post.body} components={components} />
          ) : (
            <>
              {fallback.sections.map((section) => (
                <FallbackSectionBlock section={section} key={section.title} />
              ))}
            </>
          )}

          {post.faqMarkdown && (
            <section className="resource-markdown-section" aria-label="Article frequently asked questions">
              <MarkdownContent value={post.faqMarkdown} className="resource-markdown-faq" />
            </section>
          )}

          {post.sourcesMarkdown && (
            <section className="resource-sources-section" aria-labelledby="article-sources">
              <h2 id="article-sources">Sources and references</h2>
              <MarkdownContent value={post.sourcesMarkdown} className="resource-markdown-sources" />
            </section>
          )}
          <StructuredSources post={post} />

          <section className="resource-next-step-section" aria-labelledby="ready-for-next-visit">
            <h2 id="ready-for-next-visit">Ready for your next visit</h2>
            <p>
              Bring any records, medication names, diet details, and a short list of questions. If something feels urgent or unsafe, do not use this article as emergency advice. Call a veterinary hospital or seek urgent care.
            </p>
            <ResourceActions />
          </section>
        </div>
      </article>
    </Container>
  );
}

function FallbackSectionBlock({ section }: { section: FallbackSection }) {
  return (
    <section aria-labelledby={headingIdFromText(section.title)}>
      <h2 id={headingIdFromText(section.title)}>{section.title}</h2>
      {section.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.list && (
        <ul>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.callout && (
        <Alert className={`resource-callout resource-callout-${section.callout.tone || "vet-note"}`} tone={calloutTones[section.callout.tone || "vet-note"]}>
          <AlertTriangle aria-hidden="true" size={22} />
          <div>
            <p className="eyebrow">{calloutLabels[section.callout.tone || "vet-note"]}</p>
            <AlertTitle>{section.callout.title}</AlertTitle>
            <AlertDescription>{section.callout.body}</AlertDescription>
          </div>
        </Alert>
      )}
    </section>
  );
}

function relatedItems(post: BlogPost, relatedPosts: BlogPost[]): RelatedCardItem[] {
  const seen = new Set([post.slug]);
  const sanityItems = relatedPosts
    .filter((item) => !seen.has(item.slug))
    .map((item) => {
      seen.add(item.slug);
      return {
        title: item.title,
        slug: item.slug,
        href: `/resources/${item.slug}/`,
        date: item.date,
        category: item.category,
        excerpt: item.excerpt,
        image: imageUrl(item, 720, 440),
        imageAlt: item.featuredImageAlt
      };
    });

  const fallbackItems = fallbackRelatedCards.filter((item) => item.slug !== post.slug && !seen.has(item.slug || item.href));
  return [...sanityItems, ...fallbackItems].slice(0, 3);
}

function RelatedResources({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const items = relatedItems(post, relatedPosts);

  return (
    <section className="resource-related-editorial" aria-labelledby="related-resources-heading">
      <Container className="resource-editorial-container">
        <div className="resource-editorial-section-head">
          <div>
            <p className="eyebrow">Keep Reading</p>
            <h2 id="related-resources-heading">Related Pet Care Resources</h2>
          </div>
          <ShadButton asChild variant="ghost">
            <Link href="/resources/">
              View all resources <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </ShadButton>
        </div>
        <div className="resource-related-editorial-grid">
          {items.map((item) => (
            <Card className="resource-related-editorial-card" key={`${item.href}-${item.title}`}>
              <Link className="resource-related-editorial-image" href={item.href} aria-label={`Read ${item.title}`}>
                <Image src={item.image || "/images/veterinary-care-hero.jpg"} alt={item.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" />
              </Link>
              <CardContent>
                <Badge variant="red">{item.category}</Badge>
                <h3>
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p>{item.excerpt}</p>
                <span className="resource-related-date">
                  <CalendarDays aria-hidden="true" size={14} />
                  {displayDate(item.date)}
                </span>
                <Link className="resource-editorial-text-link" href={item.href}>
                  Read article <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BottomCTASection() {
  return (
    <section className="resource-bottom-editorial" aria-label="Schedule veterinary care">
      <Container className="resource-editorial-container">
        <BottomCTA />
      </Container>
    </section>
  );
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const ogImage = post.openGraphImage ? urlFor(post.openGraphImage).width(1200).height(630).fit("crop").url() : schemaImageUrl(post);
  return pageMetadata({
    ...post.seo,
    image: ogImage,
    canonicalUrl: post.seo.canonicalUrl,
    path: `/resources/${post.slug}/`,
    type: "article"
  });
}

export default async function ResourceArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const [markdownBody, relatedPosts] = await Promise.all([resolveMarkdownBody(post), getRelatedBlogPosts(post, 3)]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources/" },
    { name: post.title, path: `/resources/${post.slug}/` }
  ];
  const resourceLabel = resourceTypeLabels[post.resourceType];
  const readTime = readingTime(post, markdownBody);

  return (
    <>
      <main className="resource-editorial-page">
        <ResourceHero post={post} resourceLabel={resourceLabel} readTime={readTime} />
        <FeaturedImage post={post} />
        <AuthorOrReviewCard post={post} readTime={readTime} />
        <ArticleBody post={post} markdownBody={markdownBody} />
        <RelatedResources post={post} relatedPosts={relatedPosts} />
        <BottomCTASection />
      </main>

      <JsonLd
        data={[
          articleSchema({ ...post, schemaImage: schemaImageUrl(post), canonicalUrl: post.seo.canonicalUrl }),
          breadcrumbSchema(crumbs)
        ]}
      />
    </>
  );
}
