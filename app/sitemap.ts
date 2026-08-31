import type { MetadataRoute } from 'next';
import { publishedCases } from '@/lib/cases-data';
import { pageContent, posts, site } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'insights', 'tiktok-shop-korea', 'free-class', 'live-agency', 'cases', 'contact/brand', 'contact/seller', 'privacy', 'terms', ...Object.keys(pageContent)];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: new Date(),
      changeFrequency: path === 'insights' ? 'daily' as const : 'monthly' as const,
      priority: path === '' ? 1 : path === 'cases' ? .85 : .7,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: .8,
    })),
    ...publishedCases.map((item) => ({
      url: `${site.url}/cases/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: .8,
    })),
  ];
}
