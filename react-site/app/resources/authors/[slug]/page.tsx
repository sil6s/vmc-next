import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenText, CalendarDays, Stethoscope } from "lucide-react";
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
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd, webpageSchema } from "@/lib/schema";
import { authorDisplayName, authorTitleLine, getAuthorProfile, getAuthorSlugs } from "@/sanity/authors";

type Params = { params: Promise<{ slug: string }> };

function displayDate(date?: string) {
  if (!date) return "Recently updated";
  const parsed = date.includes("T") ? new Date(date) : new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorProfile(slug);
  if (!author) return {};

  const name = authorDisplayName(author);
  return pageMetadata({
    title: `${name} | Veterinary Medical Centers`,
    description: author.bio || `${name} shares pet health education from Veterinary Medical Centers in Northern Kentucky.`,
    path: `/resources/authors/${author.slug}/`
  });
}

export default async function AuthorProfilePage({ params }: Params) {
  const { slug } = await params;
  const author = await getAuthorProfile(slug);
  if (!author) notFound();

  const name = authorDisplayName(author);
  const titleLine = authorTitleLine(author);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources/" },
    { name, path: `/resources/authors/${author.slug}/` }
  ];

  return (
    <>
      <main className="author-profile-page">
        <section className="author-profile-hero" aria-labelledby="author-profile-title">
          <Container>
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
                  <BreadcrumbPage>{author.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="author-profile-hero-grid">
              <div className="author-profile-photo">
                <Image src={author.image} alt={author.imageAlt} width={420} height={420} priority />
              </div>
              <div className="author-profile-copy">
                <Badge variant="red">Author Profile</Badge>
                <h1 id="author-profile-title">{name}</h1>
                {titleLine && <p className="author-profile-credentials">{titleLine}</p>}
                <p>
                  {author.bio ||
                    "A member of the Veterinary Medical Centers team sharing practical pet health education for dog and cat owners in Fort Thomas, Independence, and Northern Kentucky."}
                </p>
                <div className="author-profile-actions">
                  <ShadButton asChild>
                    <Link href="/book-appointment/">
                      <Stethoscope aria-hidden="true" size={17} />
                      Book Appointment
                    </Link>
                  </ShadButton>
                  <ShadButton asChild variant="ghost">
                    <Link href="/resources/">Browse Resources</Link>
                  </ShadButton>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="author-profile-resources" aria-labelledby="author-profile-resources-title">
          <Container>
            <div className="resource-editorial-section-head">
              <div>
                <p className="eyebrow">Published Resources</p>
                <h2 id="author-profile-resources-title">Articles by {author.name}</h2>
              </div>
            </div>

            {author.posts.length ? (
              <div className="author-profile-resource-grid">
                {author.posts.map((post) => (
                  <Card className="author-profile-resource-card" key={post.slug}>
                    <CardContent>
                      <Badge variant="red">{post.category || "Pet Care"}</Badge>
                      <h3>
                        <Link href={`/resources/${post.slug}/`}>{post.title}</Link>
                      </h3>
                      <p>{post.excerpt || "Practical pet care guidance from Veterinary Medical Centers."}</p>
                      <span>
                        <CalendarDays aria-hidden="true" size={14} />
                        {displayDate(post.publishedAt)}
                      </span>
                      <Link className="resource-editorial-text-link" href={`/resources/${post.slug}/`}>
                        Read article <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="author-profile-empty-card">
                <CardContent>
                  <BookOpenText aria-hidden="true" size={28} />
                  <h3>Resources are being prepared.</h3>
                  <p>Check back for pet health articles and clinic education from this Veterinary Medical Centers contributor.</p>
                </CardContent>
              </Card>
            )}
          </Container>
        </section>
      </main>

      <JsonLd
        data={[
          webpageSchema(`/resources/authors/${author.slug}/`, `${name} | Veterinary Medical Centers`, author.bio || "Veterinary Medical Centers author profile."),
          breadcrumbSchema(crumbs)
        ]}
      />
    </>
  );
}
