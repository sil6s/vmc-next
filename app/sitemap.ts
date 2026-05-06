import { MetadataRoute } from 'next';
import { locations, pages, posts, services, site } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap { const urls=['/', '/blog/', '/services/', '/locations/', ...pages.filter(p=>p.slug).map(p=>`/${p.slug}/`), ...posts.map(p=>`/blog/${p.slug}/`), ...services.map(s=>`/services/${s.slug}/`), ...locations.map(l=>`/locations/${l.slug}/`)]; return urls.map((url)=>({url:`${site.siteUrl}${url}`, lastModified:new Date()})); }
