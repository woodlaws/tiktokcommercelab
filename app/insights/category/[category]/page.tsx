import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightsArchivePage } from '@/components/insights-archive-page';
import { getInsightCategory, getPostsByCategory, insightCategories } from '@/lib/insights-data';
import { site } from '@/lib/site-data';

export function generateStaticParams() { return insightCategories.map((category) => ({ category: category.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params; const category = getInsightCategory(slug); if (!category) return {};
  const title = `${category.name} 인사이트 | 틱톡커머스랩`; const canonical = `${site.url}/insights/category/${slug}`;
  return { title: { absolute: title }, description: category.description, alternates: { canonical }, openGraph: { title, description: category.description, url: canonical, type: 'website', locale: 'ko_KR', siteName: site.name, images: [{ url: '/og-tiktok-commerce-lab.png', width: 1200, height: 630, alt: '틱톡커머스랩 인사이트' }] }, twitter: { card: 'summary_large_image', title, description: category.description, images: ['/og-tiktok-commerce-lab.png'] } };
}

export default async function InsightCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params; const category = getInsightCategory(slug); if (!category) notFound();
  return <InsightsArchivePage eyebrow="INSIGHT CATEGORY" title={category.name} description={category.description} posts={getPostsByCategory(slug)} />;
}
