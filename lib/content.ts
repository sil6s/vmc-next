import site from '@/content/site.json';
import pages from '@/content/pages/pages.json';
import posts from '@/content/posts/posts.json';
import services from '@/content/services/services.json';
import locations from '@/content/locations/locations.json';

export type Seo = { title: string; description: string; canonical?: string; ogImage?: string };
export type Page = (typeof pages)[number];
export type Service = (typeof services)[number];
export type Location = (typeof locations)[number];
export type Post = (typeof posts)[number];

export { site, pages, posts, services, locations };

export function normalizeSlug(slug?: string | string[]) {
  if (!slug) return '';
  return Array.isArray(slug) ? slug.join('/') : slug.replace(/^\/+|\/+$/g, '');
}

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function absoluteUrl(path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${site.siteUrl}${clean}`;
}

export function tel(value: string) {
  return `tel:${value.replace(/[^0-9+]/g, '')}`;
}
