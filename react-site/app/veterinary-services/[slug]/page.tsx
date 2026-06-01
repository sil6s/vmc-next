import { permanentRedirect } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

export default async function VeterinaryServicePage({ params }: Params) {
  const { slug } = await params;
  permanentRedirect(`/services/${slug}/`);
}
