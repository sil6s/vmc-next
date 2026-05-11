import Link from "next/link";
import { HandHeart, MapPinned, MessageSquareText, ShieldCheck } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { LocationCards } from "@/components/sections/LocationCards";
import { QuickLinksSection } from "@/components/sections/QuickLinksSection";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { UrgentCareSection } from "@/components/sections/UrgentCareSection";
import { Section } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import { pages } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, faqSchema, webpageSchema } from "@/lib/schema";
import { getBlogPosts } from "@/sanity/posts";

export const metadata = pageMetadata({ ...pages.home.seo, path: "/" });

const whyCards = [
  {
    title: "Fear-Free visits",
    text:
      "Calmer handling, thoughtful pacing, and pre-visit planning help nervous pets, cats, puppies, and senior companions feel safer from arrival through exam.",
    icon: HandHeart
  },
  {
    title: "Familiar faces",
    text:
      "Our locally owned team values continuity, so families can build trust with veterinarians and staff who remember their pet's history over time.",
    icon: ShieldCheck
  },
  {
    title: "Clear answers",
    text:
      "We explain what we see, which options matter now, what can wait, and what each recommendation means before moving forward.",
    icon: MessageSquareText
  },
  {
    title: "Two NKY locations",
    text:
      "Fort Thomas and Independence make care easier across Northern Kentucky, with the same relationship-based standard at both clinics.",
    icon: MapPinned
  }
];

export default async function HomePage() {
  const hero = pages.home.hero;
  const posts = await getBlogPosts(3);

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        emphasis={hero.emphasis}
        body={hero.body}
        image={hero.image}
        imageAlt={hero.imageAlt}
        badgeTitle={hero.badgeTitle}
        badgeSub={hero.badgeSub}
        primaryCta={{ label: "Call Us Today", href: "/contact/" }}
        secondaryCta={{ label: "New patients start here", href: "/new-patients/" }}
      />
      <TrustBar items={pages.home.ticker} />
      <TestimonialGrid />
      <Section
        tone="white"
        eyebrow="Why Families Trust Us"
        title="A locally owned veterinary medical center that treats you like neighbors."
        intro="VMC is independently owned and rooted in Northern Kentucky. Our care is personal, consistent, and focused on honest communication, low-stress visits, and long-term relationships."
      >
        <div className="card-grid">
          {whyCards.map(({ title, text, icon: Icon }) => (
            <article className="card" key={title}>
              <span className="icon-mark">
                <Icon aria-hidden="true" size={22} strokeWidth={2.2} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <ServiceGrid />
      <UrgentCareSection />
      <LocationCards />
      <TeamSection />
      <Section
        tone="cream"
        eyebrow="New Patients"
        title="New patient vet visits in Northern Kentucky."
        intro="We welcome new dogs and cats at both locations. Bring prior records if you have them, complete the registration form, and our team will help you choose the right appointment type."
      >
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/new-patients/">Start here</Link>
          <Link className="btn btn-ghost" href="/new-patient-registration-form/">Registration form</Link>
        </div>
      </Section>
      <Section tone="white" eyebrow="Resources" title="Recent pet health articles.">
        <div className="card-grid compact">
          {posts.map((post) => (
            <article className="card" key={post.slug}>
              <p className="eyebrow">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}/`}>Read article</Link>
            </article>
          ))}
        </div>
      </Section>
      <QuickLinksSection />
      <Section tone="cream" eyebrow="Online Tools" title="Manage records, booking, and refills online." intro="Use our online utility pages for secure portal access, online vet booking, and medication refills tied to your local VMC team.">
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/patient-portal-online-booking/">Patient Portal & Online Booking</Link>
          <Link className="btn btn-primary" href="/online-vet-pharmacy-northern-kentucky-cincinnati/">Online Vet Pharmacy</Link>
        </div>
      </Section>
      <FAQSection faqs={homeFaqs} />
      <CTASection />
      <JsonLd data={[webpageSchema("/", pages.home.seo.title, pages.home.seo.description), faqSchema(homeFaqs)]} />
    </>
  );
}
