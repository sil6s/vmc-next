import { SanityStudioClient } from "@/components/dashboard/SanityStudioClient";

export const dynamic = "force-dynamic";

export default function SanityStudioPage() {
  return (
    <div className="dashboard-studio-shell">
      <SanityStudioClient />
    </div>
  );
}
