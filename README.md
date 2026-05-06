# VMC Veterinary Medical Center – Standalone Next.js Site

This repository is now a standalone, static-first Next.js App Router application for Veterinary Medical Center. It has no runtime dependency on the former publishing stack or any external content system.

## Project structure

```txt
app/                         Next.js App Router routes, metadata, sitemap, robots
components/                  Reusable React templates and section components
content/                     Version-controlled migrated content
  pages/pages.json           Static page records and flattened custom fields
  posts/posts.json           Blog post content and SEO metadata
  services/services.json     Service CPT replacement data
  locations/locations.json   Location CPT replacement data
  site.json                  Navigation, contact info, global settings
lib/                         Typed content helpers and metadata utilities
public/uploads/              Local migrated media
```

## Content data format

Content records are JSON objects with stable slugs, SEO metadata, and flattened `acf` fields:

```json
{
  "title": "Example Service",
  "slug": "example-service",
  "seo": {
    "title": "Example Service | VMC",
    "description": "Search description used by generateMetadata()."
  },
  "acf": {
    "intro": "Intro copy",
    "highlights": ["One", "Two"]
  }
}
```

## Example migrated page

The homepage lives in `content/pages/pages.json` with the empty slug (`"slug": ""`) and `template: "home"`. Hero copy, image path, alt text, ticker items, and SEO metadata are local JSON values rendered by `app/page.tsx`.

## Example dynamic route

Service detail pages use `app/services/[slug]/page.tsx`. `generateStaticParams()` maps over local service JSON and `generateMetadata()` reads each service's local SEO object. No runtime content-service fetch happens.

## Adding or editing content

1. Edit the relevant JSON file in `content/`.
2. Put any new media in `public/uploads/`.
3. Reference media with site-local paths such as `/uploads/example.jpg`.
4. Run `npm run build` to validate static generation.

## Former platform removal confirmation

The former platform is no longer required to build, run, edit, or deploy this site. All migrated content, navigation, SEO metadata, structured data, and media references are local and version-controlled. The site is Vercel-ready and uses static export settings in `next.config.mjs`.
