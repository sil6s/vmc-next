import Link from "next/link";
import { Edit3, Eye, Plus, Send } from "lucide-react";
import { getManagedBlogPosts } from "@/lib/blog-admin";

function displayDate(value: string) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value.includes("T") ? value : `${value}T12:00:00`));
}

export default async function BlogDashboardPage() {
  const posts = await getManagedBlogPosts();

  return (
    <>
      <div className="dashboard-page-head with-action">
        <div>
          <p className="dashboard-eyebrow">Blog</p>
          <h1>Pet care article manager</h1>
          <p>Create, edit, preview, publish, and archive clinic-friendly blog posts.</p>
        </div>
        <Link className="dashboard-primary-button" href="/dashboard/blog/new/">
          <Plus aria-hidden="true" size={16} />
          New Post
        </Link>
      </div>
      <section className="dashboard-card">
        {posts.length ? (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Last Updated</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td><strong>{post.title}</strong></td>
                    <td>{post.slug}</td>
                    <td><span className={post.status === "published" ? "dashboard-badge is-active" : "dashboard-badge"}>{post.status}</span></td>
                    <td>{post.author}</td>
                    <td>{post.category}</td>
                    <td>{displayDate(post.updatedAt)}</td>
                    <td>{displayDate(post.publishDate)}</td>
                    <td>
                      <span className="dashboard-row-actions">
                        <Link className="dashboard-test-link" href={`/dashboard/blog/${post.id}/edit/`}><Edit3 aria-hidden="true" size={14} /> Edit</Link>
                        <Link className="dashboard-test-link" href={`/blog/${post.slug}/`} target="_blank"><Eye aria-hidden="true" size={14} /> Preview</Link>
                        <Link className="dashboard-test-link" href={`/dashboard/blog/${post.id}/edit/`}><Send aria-hidden="true" size={14} /> Publish</Link>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="dashboard-empty-state">
            <h2>No blog posts yet</h2>
            <p>Create the first Veterinary Medical Center pet care article.</p>
            <Link className="dashboard-primary-button" href="/dashboard/blog/new/">Create post</Link>
          </div>
        )}
      </section>
    </>
  );
}
