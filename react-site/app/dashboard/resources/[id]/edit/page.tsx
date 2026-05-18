import { redirect } from "next/navigation";

type Params = { params: Promise<{ id: string }> };

export default async function EditResourcePage({ params }: Params) {
  await params;
  redirect("/dashboard/resources/studio/");
}
