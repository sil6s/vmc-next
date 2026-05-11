import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Container } from "@/components/ui/Container";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, JsonLd, webpageSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ ...service.seo, path: `/services/${service.slug}/` });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.title, path: `/services/${service.slug}/` }
  ];

  return (
    <>
      <Hero
        eyebrow="Veterinary Services"
        title={service.title}
        body={service.intro}
        image="/images/veterinary-care-hero.jpg"
        imageAlt={`${service.title} at Veterinary Medical Center`}
        badgeTitle="Serving Northern Kentucky"
        badgeSub="Fort Thomas and Independence"
        primaryCta={{ label: "Request Appointment", href: "/contact/" }}
        secondaryCta={{ label: "New Patients", href: "/new-patients/" }}
      />
      <Breadcrumbs items={crumbs.map((item) => ({ label: item.name, href: item.path }))} />
      <div className="prose-page">
        <Container>
          <article>
            <p className="eyebrow">About This Service</p>
            <h1>{service.title}</h1>
            {service.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>What this care often includes</h2>
            <ul>
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h2>Care at both VMC locations</h2>
            <p>
              This service is available through our Fort Thomas and Independence teams. Call first if your pet is sick,
              painful, or experiencing symptoms that may need urgent triage.
            </p>
          </article>
        </Container>
      </div>
      <FAQSection faqs={service.faqs} title={`Questions about ${service.title.toLowerCase()}.`} />
      <ServiceGrid compact />
      <CTASection />
      <JsonLd data={[webpageSchema(`/services/${service.slug}/`, service.seo.title, service.seo.description), breadcrumbSchema(crumbs), faqSchema(service.faqs)]} />
    </>
  );
}
