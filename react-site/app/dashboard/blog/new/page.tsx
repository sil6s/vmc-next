import { BlogEditor } from "@/components/dashboard/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Blog</p>
        <h1>Create a new pet care article</h1>
        <p>Draft a polished article, preview the SEO card, then publish when it is ready.</p>
      </div>
      <BlogEditor />
    </>
  );
}
