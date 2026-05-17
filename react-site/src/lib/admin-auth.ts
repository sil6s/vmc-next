import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ensureSettingsTables, getPool, hasDatabase } from "@/lib/settings/db";
import { authOptions } from "@/lib/auth";

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
  if (!email) {
    return false;
  }

  const normalized = email.toLowerCase();
  if (envAdminEmails().includes(normalized)) {
    return true;
  }

  if (!hasDatabase()) {
    return false;
  }

  await ensureSettingsTables();
  const result = await getPool().query("select 1 from admin_roles where lower(email) = $1 and is_active = true limit 1", [normalized]);
  return Boolean(result.rowCount);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email || !(await isApprovedAdmin(email))) {
    return null;
  }

  return {
    email,
    name: session.user?.name || email,
    image: session.user?.image
  };
}

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect(`/login/?callbackUrl=${encodeURIComponent("/dashboard/")}`);
  }

  if (!(await isApprovedAdmin(session.user.email))) {
    redirect("/not-authorized/");
  }

  return {
    email: session.user.email,
    name: session.user.name || session.user.email,
    image: session.user.image
  };
}
