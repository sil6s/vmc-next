import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureSettingsTables, getPool, hasDatabase } from "@/lib/settings/db";

export type AdminSession = {
  email: string;
  name: string;
  image?: string | null;
};

function envAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL_ALLOWLIST || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isApprovedAdmin(email?: string | null) {
  if (!email) return false;

  const normalized = email.toLowerCase();
  if (envAdminEmails().includes(normalized)) return true;

  if (!hasDatabase()) return false;

  await ensureSettingsTables();
  const result = await getPool().query(
    "select 1 from admin_roles where lower(email) = $1 and is_active = true limit 1",
    [normalized]
  );
  return Boolean(result.rowCount);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !(await isApprovedAdmin(user.email))) return null;

  return {
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
    image: user.user_metadata?.avatar_url || user.user_metadata?.picture || null
  };
}

export async function requireAdminSession(callbackUrl = "/dashboard/") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect(`/login/?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (!(await isApprovedAdmin(user.email))) {
    redirect("/not-authorized/");
  }

  return {
    email: user.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
    image: user.user_metadata?.avatar_url || user.user_metadata?.picture || null
  };
}
