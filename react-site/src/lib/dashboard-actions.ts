"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { updateSettingSection } from "@/lib/settings/settings";
import {
  announcementSchema,
  externalLinksSchema,
  liveChatSchema,
  locationsSchema,
  quickControlsSchema,
  seoSchema
} from "@/lib/settings/validation";

type ActionResult = {
  ok: boolean;
  message: string;
};

function errorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unable to save changes.";
}

function revalidateDashboard() {
  revalidatePath("/");
  revalidatePath("/dashboard/");
  revalidatePath("/dashboard/settings/");
  revalidatePath("/dashboard/announcement/");
  revalidatePath("/dashboard/live-chat/");
  revalidatePath("/dashboard/locations/");
  revalidatePath("/dashboard/location-hours/");
  revalidatePath("/dashboard/links/");
  revalidatePath("/dashboard/seo/");
  revalidatePath("/dashboard/analytics/");
  revalidatePath("/dashboard/blog/");
  revalidatePath("/dashboard/activity/");
}

export async function saveLiveChatSettings(input: unknown): Promise<ActionResult> {
  const admin = await requireAdminSession();
  const parsed = liveChatSchema.parse(input);
  const value = {
    ...parsed,
    liveChatStatusLabel: parsed.liveChatEnabled ? "Active" : "Disabled"
  } as const;

  try {
    await updateSettingSection("liveChat", value, admin.email);
    revalidateDashboard();
    return { ok: true, message: "Live chat settings saved successfully." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}

export async function saveLocationSettings(input: unknown): Promise<ActionResult> {
  const admin = await requireAdminSession();
  const parsed = locationsSchema.parse(input);

  try {
    await updateSettingSection("locations", parsed, admin.email);
    revalidateDashboard();
    return { ok: true, message: "Location and hours settings saved successfully." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}

export async function saveExternalLinks(input: unknown): Promise<ActionResult> {
  const admin = await requireAdminSession();
  const parsed = externalLinksSchema.parse(input);

  try {
    await updateSettingSection("externalLinks", parsed, admin.email);
    revalidateDashboard();
    return { ok: true, message: "Important links saved successfully." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}

export async function saveAnnouncementSettings(input: unknown): Promise<ActionResult> {
  const admin = await requireAdminSession();
  const parsed = announcementSchema.parse(input);

  try {
    await updateSettingSection("announcement", parsed, admin.email);
    revalidateDashboard();
    return { ok: true, message: "Announcement banner saved successfully." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}

export async function saveSeoSettings(input: unknown): Promise<ActionResult> {
  const admin = await requireAdminSession();
  const parsed = seoSchema.parse(input);

  try {
    await updateSettingSection("seo", parsed, admin.email);
    revalidateDashboard();
    return { ok: true, message: "SEO settings saved successfully." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}

export async function saveQuickControls(input: unknown): Promise<ActionResult> {
  const admin = await requireAdminSession();
  const parsed = quickControlsSchema.parse(input);

  try {
    await updateSettingSection("quickControls", parsed, admin.email);
    revalidateDashboard();
    return { ok: true, message: "Quick controls saved successfully." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}
