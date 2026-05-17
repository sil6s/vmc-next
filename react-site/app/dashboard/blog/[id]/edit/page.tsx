import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/dashboard/BlogEditor";
import { getManagedBlogPost } from "@/lib/blog-admin";

type Params = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Params) {
  const { id } = await params;
  const post = await getManagedBlogPost(id);
  if (!post) notFound();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Blog</p>
        <h1>Edit article</h1>
        <p>Update the article content, SEO metadata, publishing state, and preview text.</p>
      </div>
      <BlogEditor post={post} />
    </>
  );
}
