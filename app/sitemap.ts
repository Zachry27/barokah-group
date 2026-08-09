import type { MetadataRoute } from 'next';
import { services } from '@/lib/content';
import { siteUrl } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap { const routes=['','/visa','/bagasi-cairo-jakarta','/b2b','/promo-brosur','/tentang','/faq','/kontak']; return [...routes.map(route=>({url:`${siteUrl}${route}`,lastModified:new Date(),changeFrequency:'weekly' as const,priority:route===''?1:.7})),...services.map(s=>({url:`${siteUrl}/layanan/${s.slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.6}))]; }
