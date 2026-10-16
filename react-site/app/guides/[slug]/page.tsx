import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/sections/GuidePage";
import { getGuide, guides } from "@/data/guides";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
// Re-render every 6 hours so the "Last reviewed" date stays current (see src/lib/review-date.ts).
export const revalidate = 21600;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({ ...guide.seo, path: `/guides/${guide.slug}/`, type: "article" });
}

export default async function GuideRoute({ params }: Params) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
