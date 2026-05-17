import { redirect } from "next/navigation";

type Params = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Params) {
  await params;
  redirect("/dashboard/blog/studio/");
}
