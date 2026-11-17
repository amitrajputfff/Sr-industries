import type { MetadataRoute } from 'next';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { SITE_URL } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE_URL}/products?category=${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
