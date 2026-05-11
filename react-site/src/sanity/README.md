This folder contains Sanity integrations for blog posts and veterinary service pages.

Sanity is used for blog posts and service detail pages. If Sanity is unreachable, empty, or not configured with a readable public dataset/token, the site falls back to static TypeScript content in `src/data/posts.ts` and `src/data/serviceHub.ts`.

Environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=zk507aly`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01`
- `SANITY_API_READ_TOKEN=` only if the dataset is private
