import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightsArchivePage } from '@/components/insights-archive-page';
import { getInsightTag, getPostsByTag, insightTags } from '@/lib/insights-data';
import { site } from '@/lib/site-data';

export function generateStaticParams() { return insightTags.map((tag) => ({ tag: tag.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag: slug } = await params; const tag = getInsightTag(slug); if (!tag) return {};
  const title = `#${tag.name} 콘텐츠 | 틱톡커머스랩`; const description = `${tag.name}와 관련된 틱톡커머스 실전 콘텐츠를 모아봅니다.`; const canonical = `${site.url}/insights/tag/${slug}`;
  return { title: { absolute: title }, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: 'website', locale: 'ko_KR', siteName: site.name, images: [{ url: '/og-tiktok-commerce-lab.png', width: 1200, height: 630, alt: '틱톡커머스랩 인사이트' }] }, twitter: { card: 'summary_large_image', title, description, images: ['/og-tiktok-commerce-lab.png'] } };
}

export default async function InsightTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: slug } = await params; const tag = getInsightTag(slug); if (!tag) notFound();
  return <InsightsArchivePage eyebrow="INSIGHT TAG" title={`#${tag.name}`} description={`${tag.name}와 관련된 틱톡커머스 실전 콘텐츠를 모아봅니다.`} posts={getPostsByTag(slug)} />;
}
