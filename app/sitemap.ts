import type { MetadataRoute } from 'next';
import { publishedCases } from '@/lib/cases-data';
import { insightCategories, insightTags, publishedInsightPosts } from '@/lib/insights-data';
import { pageContent, site } from '@/lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'insights', 'tiktok-shop-korea', 'seller-academy', 'free-class', 'live-agency', 'cases', 'contact/academy', 'contact/brand', 'contact/seller', 'privacy', 'terms', ...Object.keys(pageContent)];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: new Date(),
      changeFrequency: path === 'insights' ? 'daily' as const : 'monthly' as const,
      priority: path === '' ? 1 : path === 'cases' ? .85 : .7,
    })),
    ...publishedInsightPosts.map((post) => ({
      url: `${site.url}/insights/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: .8,
    })),
    ...insightCategories.map((category) => ({ url: `${site.url}/insights/category/${category.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: .72 })),
    ...insightTags.map((tag) => ({ url: `${site.url}/insights/tag/${tag.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: .65 })),
    ...publishedCases.map((item) => ({
      url: `${site.url}/cases/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: .8,
    })),
  ];
}
