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

## Content Structure

- `src/data/site.ts`: practice settings, phones, addresses, external portal and pharmacy URLs
- `src/data/navigation.ts`: header, footer, and utility navigation
- `src/data/services.ts`: service pages replacing WordPress service CPT and ACF fields
- `src/data/locations.ts`: location pages replacing WordPress location CPT and ACF fields
- `src/data/pages.ts`: static page SEO and hero content
- `src/data/faqs.ts`: FAQ content and schema source
- `src/data/posts.ts`: temporary static blog data

## Future Sanity Blog

`src/sanity/` is reserved for the future blog integration. The current site does not require Sanity environment variables and does not depend on a CMS.

## Deployment

Deploy the `react-site` folder to Vercel. Set `NEXT_PUBLIC_SITE_URL=https://vmcnky.com` and any contact email provider variables in Vercel Project Settings.
