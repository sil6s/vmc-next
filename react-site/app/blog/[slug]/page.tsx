import { redirect } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

export default async function BlogArticleRedirectPage({ params }: Params) {
  const { slug } = await params;
  redirect(`/resources/${slug}/`);
}
