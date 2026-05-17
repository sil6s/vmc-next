# Veterinary Medical Center React Site

Standalone Next.js rebuild of the former WordPress/ACF website. The app is independent from WordPress, PHP, ACF, WordPress REST APIs, and plugin hosting.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS with custom global component styles
- Static TypeScript content files
- Vercel-ready route handlers, sitemap, robots, and metadata APIs

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` for local secrets. The site builds without email provider keys. If `RESEND_API_KEY` is present, `/api/contact/` sends through Resend. Brevo or SendGrid can be added in the same route handler later.

## Private Admin Dashboard

The admin dashboard is built into this Next.js app at `/dashboard/`. It uses the existing Google OAuth environment variables through NextAuth and requires a second authorization check before any dashboard page or write action is available.

Required auth variables:

```bash
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_URL=https://nky.vet
NEXTAUTH_SECRET=...
ADMIN_EMAILS=owner@nky.vet,manager@nky.vet
```

`AUTH_URL` and `AUTH_SECRET` are also supported as aliases. Do not commit OAuth secrets. If a client secret has been shared outside Vercel/local env storage, rotate it in Google Cloud before deploying.

Admin approval can be handled in either of two ways:

- Add comma-separated approved Google account emails to `ADMIN_EMAILS`.
- Add users to the `admin_roles` table:

```sql
insert into admin_roles (email, role)
values ('owner@nky.vet', 'owner')
on conflict (email)
do update set is_active = true, role = excluded.role, updated_at = now();
```

Dashboard settings are persisted in Postgres. Set one of:

```bash
DATABASE_URL=postgres://...
# or, for Vercel Postgres:
POSTGRES_URL=postgres://...
```

The app creates the required tables on first read/write if the database exists. The same schema is also available at `db/admin-dashboard-schema.sql` for manual setup. Without a database, public pages use safe defaults and admin writes return a clear configuration error.

Dashboard sections:

- `/dashboard/` overview and recent activity
- `/dashboard/live-chat/` Otto live chat enable/disable
- `/dashboard/location-hours/` clinic details and business hours
- `/dashboard/links/` portal, pharmacy, forms, social, and Google links
- `/dashboard/announcement/` announcement banner
- `/dashboard/analytics/` Umami analytics overview and local fallback metrics
- `/dashboard/blog/` built-in blog list and editor
- `/dashboard/blog/new/` new blog draft
- `/dashboard/blog/[id]/edit/` edit, preview, publish, or unpublish a blog post
- `/dashboard/settings/` admin settings hub
- `/dashboard/seo/` sitewide SEO fallbacks and schema fields
- `/dashboard/activity/` most recent 25 changes
- `/dashboard/integrations/` service connection status

## Umami Analytics

The public site loads Umami once from `app/layout.tsx` and skips the admin/login surfaces. Configure:

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=0813c9dd-6780-4f8b-b077-d436f710d058
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
UMAMI_API_KEY=...
UMAMI_API_CLIENT_ENDPOINT=https://cloud.umami.is/api
UMAMI_SHARE_URL=
```

`UMAMI_API_KEY` is server-only and must be set in Vercel or `.env.local`, not committed. If it is missing, `/dashboard/analytics/` shows polished local fallback data. The public site tracks important CTA clicks through `trackEvent(...)` and safe delegated link tracking.

## Built-In Blog Workflow

The dashboard includes a simple internal blog builder for clinic staff. Posts are stored in the `blog_posts` table when `DATABASE_URL` or `POSTGRES_URL` is configured. Public `/blog/` and `/blog/[slug]/` only show posts with `status = published` and a publish date that is not in the future.

Use `/dashboard/blog/new/` to save drafts, preview SEO, and publish. Activity is recorded when drafts are saved or posts are published.

## Content Structure

- `src/data/site.ts`: practice settings, phones, addresses, external portal and pharmacy URLs
- `src/data/navigation.ts`: header, footer, and utility navigation
- `src/data/services.ts`: service pages replacing WordPress service CPT and ACF fields
- `src/data/locations.ts`: location pages replacing WordPress location CPT and ACF fields
- `src/data/pages.ts`: static page SEO and hero content
- `src/data/faqs.ts`: FAQ content and schema source
- `src/data/posts.ts`: temporary static blog data

## Future Sanity Blog

`src/sanity/` remains available for a future Sanity Studio workflow. If Sanity Studio is embedded later with `next-sanity`, protect the Studio route behind the same admin checks and add the hosted domain to Sanity CORS origins with authenticated requests enabled.

## Deployment

Deploy the `react-site` folder to Vercel. Set `NEXT_PUBLIC_SITE_URL=https://nky.vet` and any contact email provider variables in Vercel Project Settings.
