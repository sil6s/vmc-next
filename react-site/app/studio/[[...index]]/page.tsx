import { redirect } from "next/navigation";

// Keep the familiar /studio URL, but use Sanity's own authentication and
// permissions instead of the retired site-admin/Supabase gate.
const studioUrl =
  process.env.SANITY_STUDIO_URL ||
  "https://www.sanity.io/@o16as6XUr/studio/u77ghhfbtjfpm8zpe99guvsx/veterinary-medical-center";

export default function StudioPage() {
  redirect(studioUrl);
}
