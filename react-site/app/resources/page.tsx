import Image from "next/image";
import Link from "next/link";
import { BookOpenText, CalendarCheck, Heart, Pill, Stethoscope } from "lucide-react";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { ResourceBrowser, type ResourceCardItem } from "@/components/sections/ResourceBrowser";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/data/site";
import { breadcrumbSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { urlFor } from "@/sanity/image";
import { getBlogPosts, type BlogPost, type ResourceType } from "@/sanity/posts";

const seo = {
  title: "Pet Health Guides & Resources | Northern Kentucky Vet | VMC",
  description:
    "Practical pet health guides from Northern Kentucky veterinarians on wellness, dental care, puppies, kittens, senior pets, and when to call the vet."
};

const hubLinks = [
  { icon: BookOpenText, title: "New patient guide", text: "What to expect, what to bring, and how to book your first visit.", href: "/new-patients/" },
  { icon: Stethoscope, title: "Veterinary services", text: "Wellness, dental care, surgery, diagnostics, vaccines, and sick visits.", href: "/services/" },
  { icon: CalendarCheck, title: "Patient portal", text: "Book online and manage your pet's records and reminders.", href: "/patient-portal-online-booking/" },
  { icon: Pill, title: "Online pharmacy", text: "Order approved medications, prevention, and refills from home.", href: "/online-vet-pharmacy-northern-kentucky-cincinnati/" }
];

const resourceFaqs = [
  {
    question: "Where do these pet health guides come from?",
    answer:
      "Our guides are published by Veterinary Medical Centers in Fort Thomas and Independence, KY, and focus on the questions Northern Kentucky pet owners ask us most. Each guide lists its author."
  },
  {
    question: "Can an article replace a vet visit?",
    answer:
      "No. Our guides help you understand what you are seeing and what questions to ask, but they cannot diagnose your pet. If something seems wrong, call your clinic or book an appointment."
  },
  {
    question: "What should I do if my pet has an emergency?",
    answer:
      "If your pet is having trouble breathing, collapses, has uncontrolled bleeding, repeated seizures, or a suspected poisoning, contact an emergency veterinary hospital right away."
  }
];

const resourceTypeLabels: Record<ResourceType, string> = {
  blog: "Blog",
  education: "Education",
  "clinic-news": "Clinic News",
  faq: "FAQ"
};

export const metadata = pageMetadata({ ...seo, path: "/resources/" });

function featuredImageUrl(post: BlogPost) {
  return post.image ? urlFor(post.image).width(760).height(460).fit("crop").auto("format").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

function featuredPostForToday(posts: BlogPost[]) {
  if (!posts.length) return undefined;
  const featuredPool = posts.filter((post) => post.resourceType === "education" || post.tags.some((tag) => /featured|wellness|new patient/i.test(tag)));
  const pool = featuredPool.length ? featuredPool : posts;
  const day = Math.floor(Date.now() / 86_400_000);
  return pool[day % pool.length];
}

export default async function ResourcesPage() {
  const posts = await getBlogPosts(100);
  const featured = featuredPostForToday(posts);
  const browserResources: ResourceCardItem[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    resourceTypeLabel: resourceTypeLabels[post.resourceType],
    imageUrl: featuredImageUrl(post),
    imageAlt: post.featuredImageAlt,
    authorName: post.author.name,
    authorImage: post.author.image,
    authorImageAlt: post.author.imageAlt,
    readingTime: post.readingTime || post.author.title,
    tags: post.tags,
    sortKey: new Date(post.updatedAt || post.date).getTime() || 0
  }));

  return (
    <>
      <Hero
        eyebrow="Pet health resources"
        title="Pet health guides from your"
        emphasis="Northern Kentucky vet."
        body="Practical, plain-language articles from Veterinary Medical Centers on wellness, dental care, puppies and kittens, senior pets, and knowing when it's time to call."
        image="/images/northern-kentucky-vet-hero.jpg"
        imageAlt="Northern Kentucky veterinarian examining a calm cat"
        primaryCta={{ label: "Browse Guides", href: "#browse" }}
        secondaryCta={{ label: "Book an Appointment", href: "/book-appointment/" }}
        showStats={false}
        inlineEmphasis
        compact
      />

      <div className="home-love-banner">
        <p className="home-love-banner-inner">
          <Heart aria-hidden="true" size={13} />
          {posts.length} free pet care guides · Dogs &amp; cats · Fort Thomas &amp; Independence
        </p>
      </div>

      {featured && (
        <Section tone="white" eyebrow="Featured guide" title={<>Start with <em>this one.</em></>}>
          <article className="resource-featured-article">
            <Link className="resource-featured-image" href={`/resources/${featured.slug}/`} aria-label={`Read ${featured.title}`}>
              <Image src={featuredImageUrl(featured)} alt={featured.featuredImageAlt} fill sizes="(max-width: 900px) 100vw, 520px" />
            </Link>
            <div>
              <p className="eyebrow">{resourceTypeLabels[featured.resourceType]} · {featured.category}</p>
              <h3><Link href={`/resources/${featured.slug}/`}>{featured.title}</Link></h3>
              <p>{featured.excerpt}</p>
              <div className="resource-meta-row">
                <Image src={featured.author.image} alt={featured.author.imageAlt} width={44} height={44} />
                <span><strong>{featured.author.name}</strong><small>{featured.readingTime || "Pet care resource"}</small></span>
              </div>
              <Link className="text-link" href={`/resources/${featured.slug}/`}>Read the guide →</Link>
            </div>
          </article>
        </Section>
      )}

      <Section id="browse" tone="cream" eyebrow="Browse every guide" title={<>Pet care answers for <em>dogs and cats.</em></>} intro="Search by symptom or topic, or filter by life stage. New guides are added regularly for Northern Kentucky dog and cat owners.">
        <ResourceBrowser resources={browserResources} />
      </Section>

      <Section tone="dark" eyebrow="Helpful tools" title={<>Ready for the <em>next step?</em></>} intro="When a guide raises a question, these are the fastest ways to get help from our team." className="home-life-stages">
        <div className="resource-hub-grid">
          {hubLinks.map(({ icon: Icon, title, text, href }) => (
            <Link href={href} className="home-life-stage-card" key={href}>
              <Icon aria-hidden="true" size={25} />
              <h3>{title}</h3>
              <p>{text}</p>
              <span>Open →</span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQSection faqs={resourceFaqs} title="Questions about our pet health guides" />

      <FinalInvitation
        actions={<>
          <Link className="btn btn-secondary" href="/book-appointment/">Book an Appointment</Link>
          <a className="btn btn-ghost" href={`tel:${site.locations[0].tel}`}>Call Fort Thomas</a>
          <a className="btn btn-ghost" href={`tel:${site.locations[1].tel}`}>Call Independence</a>
        </>}
      />

      <JsonLd
        data={[
          { ...webpageSchema("/resources/", seo.title, seo.description), "@type": "CollectionPage" },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Pet health guides from Veterinary Medical Centers",
            itemListElement: posts.map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/resources/${post.slug}/`),
              name: post.title
            }))
          },
          faqSchema(resourceFaqs)
        ]}
      />
    </>
  );
}
