import { Pool } from "pg";

type GlobalWithPool = typeof globalThis & {
  vmcSettingsPool?: Pool;
  vmcSettingsMigration?: Promise<void>;
};

const globalForPool = globalThis as GlobalWithPool;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function getPool() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL or POSTGRES_URL is required for persistent dashboard settings.");
  }

  if (!globalForPool.vmcSettingsPool) {
    globalForPool.vmcSettingsPool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? undefined : { rejectUnauthorized: false },
      max: 4
    });
  }

  return globalForPool.vmcSettingsPool;
}

export async function ensureSettingsTables() {
  if (!hasDatabase()) {
    return;
  }

  if (!globalForPool.vmcSettingsMigration) {
    globalForPool.vmcSettingsMigration = getPool().query(`
      create table if not exists users (
        email text primary key,
        name text,
        image text,
        last_login_at timestamptz default now()
      );

      create table if not exists admin_roles (
        email text primary key,
        role text not null default 'admin',
        is_active boolean not null default true,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create table if not exists site_settings (
        key text primary key,
        value jsonb not null,
        updated_by text,
        updated_at timestamptz not null default now()
      );

      create table if not exists business_hours (
        location_id text not null,
        day_of_week text not null,
        is_open boolean not null default true,
        open_time text not null default '',
        close_time text not null default '',
        note text not null default '',
        updated_by text,
        updated_at timestamptz not null default now(),
        primary key (location_id, day_of_week)
      );

      create table if not exists external_links (
        key text primary key,
        url text not null default '',
        label text not null default '',
        helper_text text not null default '',
        updated_by text,
        updated_at timestamptz not null default now()
      );

      create table if not exists activity_log (
        id bigserial primary key,
        user_email text not null,
        action text not null default '',
        details text not null default '',
        status text not null default 'success',
        section text not null,
        setting_key text not null,
        previous_value jsonb,
        new_value jsonb,
        created_at timestamptz not null default now()
      );

      alter table activity_log add column if not exists action text not null default '';
      alter table activity_log add column if not exists details text not null default '';
      alter table activity_log add column if not exists status text not null default 'success';

      create table if not exists blog_posts (
        id text primary key,
        title text not null,
        slug text not null unique,
        excerpt text not null default '',
        featured_image_url text not null default '',
        featured_image_alt text not null default '',
        author text not null default 'Veterinary Medical Center Team',
        category text not null default 'Pet Care',
        tags text[] not null default '{}',
        body text not null default '',
        seo_title text not null default '',
        seo_meta_description text not null default '',
        open_graph_image text not null default '',
        status text not null default 'draft',
        publish_date timestamptz,
        created_by text,
        updated_by text,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );

      create table if not exists new_patient_submissions (
        id text primary key,
        owner_email text not null,
        owner_name text not null,
        pet_name text not null,
        preferred_location text not null,
        reason_for_visit text not null,
        payload jsonb not null,
        uploaded_file_names text[] not null default '{}',
        uploaded_file_objects jsonb not null default '[]'::jsonb,
        created_at timestamptz not null default now()
      );

      alter table new_patient_submissions add column if not exists uploaded_file_objects jsonb not null default '[]'::jsonb;
    `).then(() => undefined);
  }

  return globalForPool.vmcSettingsMigration;
}
