import type { Metadata } from "next";
import { SanityStudioClient } from "@/components/dashboard/SanityStudioClient";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sanity Studio | Veterinary Medical Centers",
  robots: {
    index: false,
    follow: false
  }
};

export default async function StudioPage() {
  await requireAdminSession("/studio/");

  return (
    <div className="standalone-studio-shell">
      <SanityStudioClient />
    </div>
  );
}
