import Link from "next/link";
import { ExternalLink, FileText, Plus, WandSparkles } from "lucide-react";
import { ResourceDashboardGallery, type DashboardResourceItem } from "@/components/dashboard/ResourceDashboardGallery";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { urlFor } from "@/sanity/image";
import { getBlogPosts, type BlogPost } from "@/sanity/posts";

export default async function ResourcesDashboardPage() {
  const posts = await getBlogPosts(60);
  const resources: DashboardResourceItem[] = posts.map((post) => resourceItem(post));

  return (
    <>
      <div className="dashboard-page-head with-action">
        <div>
          <p className="dashboard-eyebrow">Resources</p>
          <h1>Resources</h1>
          <p>Create, review, and manage Veterinary Medical Centers resource articles for pet owners in Fort Thomas, Independence, and Northern Kentucky.</p>
        </div>
        <div className="dashboard-studio-handoff-actions">
          <ShadButton asChild>
            <Link href="/dashboard/resources/new/">
              <Plus aria-hidden="true" size={16} />
              Create New Content
            </Link>
          </ShadButton>
          <ShadButton asChild variant="ghost">
            <Link href="/studio/" target="_blank" rel="noopener noreferrer">Open Sanity Studio</Link>
          </ShadButton>
          <ShadButton asChild variant="ghost">
            <Link href="/resources/" target="_blank" rel="noopener noreferrer">View Public Resources</Link>
          </ShadButton>
        </div>
      </div>

      <section className="resource-dashboard-overview">
        <Card>
          <CardHeader>
            <WandSparkles aria-hidden="true" size={22} />
            <div>
              <CardTitle>Create new content</CardTitle>
              <CardDescription>Start a focused wizard for educational guides, FAQ resources, blog articles, and clinic news.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ShadButton asChild>
              <Link href="/dashboard/resources/new/">Create New Content</Link>
            </ShadButton>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <FileText aria-hidden="true" size={22} />
            <div>
              <CardTitle>Quick links</CardTitle>
              <CardDescription>Use Studio for direct editing and the public page for final review.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="resource-dashboard-links">
            <Link href="/studio/" target="_blank" rel="noopener noreferrer">Open Studio <ExternalLink aria-hidden="true" size={14} /></Link>
            <Link href="/resources/" target="_blank" rel="noopener noreferrer">View public resources <ExternalLink aria-hidden="true" size={14} /></Link>
          </CardContent>
        </Card>
      </section>

      <ResourceDashboardGallery resources={resources} />
    </>
  );
}

function resourceImage(post: BlogPost) {
  return post.image ? urlFor(post.image).width(520).height(320).fit("crop").url() : post.featuredImage || "/images/veterinary-care-hero.jpg";
}

function resourceItem(post: BlogPost): DashboardResourceItem {
  const seoWarnings = [];
  if (!post.seo.title) seoWarnings.push("Missing SEO title");
  if (!post.seo.description) seoWarnings.push("Missing SEO description");
  if (!post.featuredImageAlt) seoWarnings.push("Missing image alt");
  const updatedAt = post.updatedAt || post.date || new Date().toISOString();

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    resourceType: post.resourceType,
    author: post.author.name,
    status: post.date ? "Published" : "Draft",
    updatedAt: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(updatedAt)),
    updatedAtValue: updatedAt,
    excerpt: post.excerpt,
    imageUrl: resourceImage(post),
    imageAlt: post.featuredImageAlt,
    seoWarnings
  };
}
