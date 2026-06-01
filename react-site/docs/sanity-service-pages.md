# Sanity Service Pages

The public service pages at `/services/[slug]/` are powered by Sanity `service` documents.

## Editing A Service

Open Studio, choose **Service Page**, then edit the document for the service. The most important tabs are:

- **Page Identity**: title, slug, category, icon, featured status, short description.
- **SEO**: SEO title, meta description, focus keyword, secondary keywords, canonical URL, noindex.
- **Hero**: H1, subtitle, and CTA copy.
- **Main Content**: quick summary, best-for cards, reasons to schedule, main rich text, visit steps, approach cards.
- **Tables & Charts**: comparison table, content table, and optional timeline blocks.
- **FAQs**: visible page FAQs that also feed FAQ schema.
- **Links & CTAs**: related services, related resources, external references, location mentions, final CTA.
- **Images**: hero image and Open Graph image with alt text.
- **Schema & Review Info**: reviewer, last reviewed date, schema type, and medical disclaimer.

## Publishing Rules

Keep each service page at 1200+ words in the **Main educational content** field, use one clear H1 in the hero title, and keep the page published unless `noindex` is intentionally enabled. Published, indexable services are included in the sitemap automatically.

## Canonical URLs

The canonical pattern is:

`https://nky.vet/services/service-slug/`

The old `/veterinary-services/[slug]/` route redirects to the matching `/services/[slug]/` page.
