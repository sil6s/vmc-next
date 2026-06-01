import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // If a secret is configured, validate it
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (secret) {
    const incoming = request.headers.get("sanity-webhook-signature") ?? request.headers.get("x-webhook-secret");
    if (incoming !== secret) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  try {
    const body = await request.json().catch(() => ({})) as { _type?: string; slug?: { current?: string } };
    const docType = body?._type;
    const slug = body?.slug?.current;

    if (!docType || docType === "post") {
      revalidatePath("/resources/", "page");
      revalidatePath("/", "page");
      if (slug) revalidatePath(`/resources/${slug}/`, "page");
      else revalidatePath("/resources/[slug]/", "page");
    }

    if (docType === "service") {
      revalidatePath("/services/", "page");
      if (slug) revalidatePath(`/services/${slug}/`, "page");
      else revalidatePath("/services/[slug]/", "page");
    }

    if (docType === "settings" || docType === "siteSettings") {
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      type: docType ?? "unknown",
      slug: slug ?? null,
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
