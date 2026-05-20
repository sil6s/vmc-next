import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ResourceCreateWizard } from "@/components/dashboard/ResourceCreateWizard";
import { ShadButton } from "@/components/ui/Button";
import { getResourceAuthorOptions } from "@/sanity/authors";

export default async function NewResourcePage() {
  const authors = await getResourceAuthorOptions();

  return (
    <>
      <div className="dashboard-page-head with-action resource-create-page-head">
        <div>
          <ShadButton asChild variant="ghost" size="sm">
            <Link href="/dashboard/resources/">
              <ArrowLeft aria-hidden="true" size={15} />
              Back to Resources
            </Link>
          </ShadButton>
          <p className="dashboard-eyebrow">Create New Content</p>
          <h1>Create New Content</h1>
          <p>Answer a few simple questions, copy AI instructions when needed, then import the finished article into Sanity.</p>
        </div>
        <div className="dashboard-studio-handoff-actions">
          <ShadButton asChild variant="ghost">
            <Link href="/studio/" target="_blank" rel="noopener noreferrer">
              Open Sanity Studio
              <ExternalLink aria-hidden="true" size={15} />
            </Link>
          </ShadButton>
        </div>
      </div>

      <ResourceCreateWizard authors={authors} />
    </>
  );
}
