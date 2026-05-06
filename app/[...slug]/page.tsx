import { notFound } from 'next/navigation';
import { BlogPreview, ContactCards, Locations, NewPatients, ServicesGrid, Team } from '@/components/Sections';
import { getPage, pages, normalizeSlug } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

export function generateStaticParams() { return pages.filter((p) => p.slug && !['services'].includes(p.slug)).map((p) => ({ slug: p.slug.split('/') })); }
export function generateMetadata({ params }: { params: { slug: string[] } }) { const page = getPage(normalizeSlug(params.slug)); if (!page) return {}; return buildMetadata(page.seo, `/${page.slug}/`); }

export default function PageRoute({ params }: { params: { slug: string[] } }) {
  const page = getPage(normalizeSlug(params.slug));
  if (!page) notFound();
  return <><section className="page-hero"><div className="page-hero-inner"><div className="sec-eye"><span className="sec-lbl">Veterinary Medical Center</span><span className="sec-rule"/></div><h1 className="hero-h1">{page.title}</h1><p className="hero-body">{('intro' in page.acf ? String(page.acf.intro) : page.seo.description)}</p></div></section><section className="content-section"><div className="content-inner">{page.template === 'services' && <ServicesGrid/>}{page.template === 'new-patients' && <NewPatients/>}{page.template === 'contact' && <ContactCards/>}{page.template === 'about' && <><Team/><Locations/></>}{page.template === 'portal' && <p>Existing clients can access online booking and patient resources. If you need help, call Fort Thomas at (859) 442-4420 or Independence at (859) 356-2242.</p>}{page.template === 'pharmacy' && <p>For medication refills and preventives, contact our team so we can connect you with the correct pharmacy resource for your pet.</p>}{page.template === 'landing' && <><Locations/><ServicesGrid/></>}<BlogPreview/></div></section></>;
}
