import { defaultDashboardSettings, defaultExternalLinks, dayNames } from "./defaults";
import { ensureSettingsTables, getPool, hasDatabase } from "./db";
import type {
  ActivityLogEntry,
  AnnouncementSettings,
  DashboardSettings,
  ExternalLinks,
  LiveChatSettings,
  ManagedLocation,
  QuickControls,
  SeoSettings
} from "./types";

type SettingSection = "liveChat" | "locations" | "externalLinks" | "announcement" | "seo" | "quickControls";

const sectionKeys = {
  liveChat: "live_chat",
  announcement: "announcement",
  seo: "seo",
  quickControls: "quick_controls"
} as const;

export async function getDashboardSettings(): Promise<DashboardSettings> {
  if (!hasDatabase()) {
    return defaultDashboardSettings;
  }

  await ensureSettingsTables();
  const pool = getPool();
  const [settingsResult, hoursResult, linksResult] = await Promise.all([
    pool.query("select key, value, updated_at from site_settings where key = any($1)", [
      [sectionKeys.liveChat, "locations", sectionKeys.announcement, sectionKeys.seo, sectionKeys.quickControls]
    ]),
    pool.query("select * from business_hours order by location_id, array_position($1::text[], day_of_week)", [dayNames]),
    pool.query("select key, url, updated_at from external_links")
  ]);

  const settingsRows = new Map(settingsResult.rows.map((row) => [row.key, row]));
  const liveChat = {
    ...defaultDashboardSettings.liveChat,
    ...(settingsRows.get(sectionKeys.liveChat)?.value || {})
  } as LiveChatSettings;
  const announcement = {
    ...defaultDashboardSettings.announcement,
    ...(settingsRows.get(sectionKeys.announcement)?.value || {})
  } as AnnouncementSettings;
  const seo = {
    ...defaultDashboardSettings.seo,
    ...(settingsRows.get(sectionKeys.seo)?.value || {})
  } as SeoSettings;
  const savedQuickControls = {
    ...defaultDashboardSettings.quickControls,
    ...(settingsRows.get(sectionKeys.quickControls)?.value || {})
  } as QuickControls;

  const linkMap = new Map<string, string>(linksResult.rows.map((row) => [row.key, row.url]));
  const externalLinks = Object.fromEntries(
    Object.entries(defaultExternalLinks).map(([key, value]) => [key, linkMap.get(key) ?? value])
  ) as ExternalLinks;

  const hourRowsByLocation = new Map<string, typeof hoursResult.rows>();
  for (const row of hoursResult.rows) {
    const current = hourRowsByLocation.get(row.location_id) || [];
    current.push(row);
    hourRowsByLocation.set(row.location_id, current);
  }

  const savedLocations = (settingsRows.get("locations")?.value || []) as ManagedLocation[];
  const locations = defaultDashboardSettings.locations.map((location) => {
    const savedLocation = savedLocations.find((item) => item.id === location.id);
    const rows = hourRowsByLocation.get(location.id);
    return {
      ...location,
      ...(savedLocation || {}),
      hours: rows?.length
        ? dayNames.map((day) => {
            const row = rows.find((item) => item.day_of_week === day);
            return row
              ? {
                  day,
                  isOpen: row.is_open,
                  openTime: row.open_time,
                  closeTime: row.close_time,
                  note: row.note
                }
              : location.hours.find((hour) => hour.day === day)!;
          })
        : savedLocation?.hours || location.hours
    };
  });

  const updatedDates = [
    ...settingsResult.rows.map((row) => row.updated_at?.toISOString?.() || null),
    ...linksResult.rows.map((row) => row.updated_at?.toISOString?.() || null),
    ...hoursResult.rows.map((row) => row.updated_at?.toISOString?.() || null)
  ].filter(Boolean) as string[];

  return {
    liveChat,
    locations,
    externalLinks,
    announcement,
    seo,
    quickControls: {
      ...savedQuickControls,
      liveChatEnabled: liveChat.liveChatEnabled,
      announcementEnabled: announcement.announcementEnabled
    },
    lastUpdatedAt: updatedDates.sort().at(-1) || null
  };
}

export async function getActivityLog(limit = 25): Promise<ActivityLogEntry[]> {
  if (!hasDatabase()) {
    return [];
  }

  await ensureSettingsTables();
  const result = await getPool().query(
    "select id, user_email, action, details, status, section, setting_key, previous_value, new_value, created_at from activity_log order by created_at desc limit $1",
    [limit]
  );

  return result.rows.map((row) => ({
    id: Number(row.id),
    userEmail: row.user_email,
    action: row.action || `Updated ${row.section}`,
    details: row.details || `${row.setting_key} changed`,
    status: row.status || "success",
    section: row.section,
    settingKey: row.setting_key,
    previousValue: row.previous_value,
    newValue: row.new_value,
    createdAt: row.created_at.toISOString()
  }));
}

export async function updateSettingSection(section: SettingSection, value: DashboardSettings[SettingSection], userEmail: string) {
  if (!hasDatabase()) {
    throw new Error("Persistent dashboard writes require DATABASE_URL or POSTGRES_URL.");
  }

  const previous = await getDashboardSettings();
  await ensureSettingsTables();
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("begin");

    if (section === "locations") {
      const locations = value as ManagedLocation[];
      for (const location of locations) {
        for (const hour of location.hours) {
          await client.query(
            `insert into business_hours (location_id, day_of_week, is_open, open_time, close_time, note, updated_by, updated_at)
             values ($1, $2, $3, $4, $5, $6, $7, now())
             on conflict (location_id, day_of_week) do update set
               is_open = excluded.is_open,
               open_time = excluded.open_time,
               close_time = excluded.close_time,
               note = excluded.note,
               updated_by = excluded.updated_by,
               updated_at = now()`,
            [location.id, hour.day, hour.isOpen, hour.openTime, hour.closeTime, hour.note, userEmail]
          );
        }
      }

      await client.query(
        `insert into site_settings (key, value, updated_by, updated_at)
         values ('locations', $1::jsonb, $2, now())
         on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = now()`,
        [JSON.stringify(locations), userEmail]
      );
    } else if (section === "externalLinks") {
      const links = value as ExternalLinks;
      for (const [key, url] of Object.entries(links)) {
        await client.query(
          `insert into external_links (key, url, updated_by, updated_at)
           values ($1, $2, $3, now())
           on conflict (key) do update set url = excluded.url, updated_by = excluded.updated_by, updated_at = now()`,
          [key, url, userEmail]
        );
      }
    } else if (section === "quickControls") {
      const controls = value as QuickControls;
      const liveChatValue: LiveChatSettings = {
        ...previous.liveChat,
        liveChatEnabled: controls.liveChatEnabled,
        liveChatStatusLabel: controls.liveChatEnabled ? "Active" : "Disabled"
      };
      const announcementValue: AnnouncementSettings = {
        ...previous.announcement,
        announcementEnabled: controls.announcementEnabled
      };

      await client.query(
        `insert into site_settings (key, value, updated_by, updated_at)
         values ($1, $2::jsonb, $3, now())
         on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = now()`,
        [sectionKeys.liveChat, JSON.stringify(liveChatValue), userEmail]
      );
      await client.query(
        `insert into site_settings (key, value, updated_by, updated_at)
         values ($1, $2::jsonb, $3, now())
         on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = now()`,
        [sectionKeys.announcement, JSON.stringify(announcementValue), userEmail]
      );
      await client.query(
        `insert into site_settings (key, value, updated_by, updated_at)
         values ($1, $2::jsonb, $3, now())
         on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = now()`,
        [sectionKeys.quickControls, JSON.stringify(controls), userEmail]
      );
    } else {
      const key = sectionKeys[section];
      await client.query(
        `insert into site_settings (key, value, updated_by, updated_at)
         values ($1, $2::jsonb, $3, now())
         on conflict (key) do update set value = excluded.value, updated_by = excluded.updated_by, updated_at = now()`,
        [key, JSON.stringify(value), userEmail]
      );
    }

    const actionLabel = section === "quickControls" ? "Updated quick controls" : `Updated ${section}`;
    await client.query(
      `insert into activity_log (user_email, action, details, status, section, setting_key, previous_value, new_value)
       values ($1, $2, $3, 'success', $4, $5, $6::jsonb, $7::jsonb)`,
      [userEmail, actionLabel, `${section} settings changed`, section, section, JSON.stringify(previous[section]), JSON.stringify(value)]
    );
    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

export async function upsertUser(email: string, name?: string | null, image?: string | null) {
  if (!hasDatabase()) {
    return;
  }

  await ensureSettingsTables();
  await getPool().query(
    `insert into users (email, name, image, last_login_at)
     values ($1, $2, $3, now())
     on conflict (email) do update set name = excluded.name, image = excluded.image, last_login_at = now()`,
    [email.toLowerCase(), name || "", image || ""]
  );
}
