import { posts as legacyPosts, type Post as LegacyPost } from '@/lib/site-data';

export type PostStatus = 'idea' | 'draft' | 'review' | 'scheduled' | 'published' | 'archived';

export type InsightCategory = {
  slug: string;
  name: string;
  description: string;
  topics: string[];
};

export type InsightTag = { slug: string; name: string };

export type InsightPost = Omit<LegacyPost, 'category' | 'date'> & {
  status: PostStatus;
  category: InsightCategory;
  tags: InsightTag[];
  publishedAt: string;
  updatedAt: string;
  author: string;
};

export const insightCategories: InsightCategory[] = [
  { slug: 'tiktok-shop', name: '틱톡샵', description: '한국 진출 현황부터 입점, 상품 등록, 수수료·정산과 정책 변화까지 다룹니다.', topics: ['한국 진출 현황', '판매자 입점', '상품 등록', '수수료·정산', '배송·반품', '정책 변화'] },
  { slug: 'tiktok-marketing', name: '틱톡 마케팅', description: '계정 운영, 알고리즘, 콘텐츠 전략과 브랜드 성장 사례를 정리합니다.', topics: ['계정 운영', '알고리즘', '콘텐츠 전략', '브랜드 마케팅', '사례 분석'] },
  { slug: 'live-commerce', name: '라이브커머스', description: '방송 기획과 대본, 사전 모객, 구매 전환 및 성과 분석을 설명합니다.', topics: ['방송 기획', '판매 대본', '쇼호스트', '사전 모객', '구매 전환', '성과 분석'] },
  { slug: 'tiktok-ads', name: '틱톡 광고', description: '캠페인 구조, 광고 소재, 타깃과 성과 측정 기준을 다룹니다.', topics: ['광고 구조', '캠페인', '소재 제작', '타깃', '성과 측정', '광고 사례'] },
  { slug: 'short-form', name: '숏폼 콘텐츠', description: '3초 훅부터 대본, 촬영, 편집과 구매 CTA까지 제작 실무를 정리합니다.', topics: ['3초 훅', '대본', '촬영', '편집', '콘텐츠 시리즈', '구매 CTA'] },
  { slug: 'seller-growth', name: '셀러 성장', description: '상품 선정, 마진, 판매 퍼널, 고객 데이터와 재구매 시스템을 다룹니다.', topics: ['상품 선정', '가격과 마진', '판매 퍼널', '고객 데이터', '재구매', '운영 시스템'] },
  { slug: 'creator-affiliate', name: '크리에이터·어필리에이트', description: '크리에이터 협업, 어필리에이트와 브랜드 수익화 구조를 정리합니다.', topics: ['크리에이터 협업', '상품 선정', '제안서', '수익화', '어필리에이트', '브랜드 협찬'] },
  { slug: 'news-policy', name: '뉴스·정책', description: 'TikTok 공식 발표, 국내외 정책과 플랫폼 업데이트를 추적합니다.', topics: ['TikTok 공식 발표', '국내외 정책', '시장 동향', '플랫폼 업데이트'] },
];

export const insightTags: InsightTag[] = [
  { slug: 'korea-launch', name: '한국 진출' }, { slug: 'seller-center', name: '셀러센터' },
  { slug: 'policy', name: '정책' }, { slug: 'account-safety', name: '계정 안전' },
  { slug: 'live-sales', name: '라이브 판매' }, { slug: 'conversion', name: '구매 전환' },
  { slug: 'short-form', name: '숏폼' }, { slug: 'ads', name: '광고' },
  { slug: 'product-selection', name: '상품 선정' }, { slug: 'creator', name: '크리에이터' },
  { slug: 'japan', name: '일본' }, { slug: 'operations', name: '운영 시스템' },
];

const categoryBySlug = new Map(insightCategories.map((category) => [category.slug, category]));
const tagBySlug = new Map(insightTags.map((tag) => [tag.slug, tag]));

const migrations: Record<string, { category: string; tags: string[]; updatedAt?: string }> = {
  'tiktok-shop-korea-launch': { category: 'news-policy', tags: ['korea-launch', 'policy'] },
  'seller-center-checklist': { category: 'tiktok-shop', tags: ['seller-center', 'policy'] },
  'live-sales-structure': { category: 'live-commerce', tags: ['live-sales', 'conversion'] },
  'account-suspension-reasons': { category: 'news-policy', tags: ['account-safety', 'policy'] },
  'ads-vs-organic-shortform': { category: 'tiktok-ads', tags: ['ads', 'short-form'] },
  'brand-launch-seven': { category: 'seller-growth', tags: ['product-selection', 'operations'] },
  'products-for-live-commerce': { category: 'live-commerce', tags: ['product-selection', 'live-sales'] },
  'japan-tiktok-shop-lessons': { category: 'tiktok-shop', tags: ['japan', 'creator'] },
  'shortform-to-live': { category: 'short-form', tags: ['short-form', 'live-sales'] },
  'ten-billion-live-principles': { category: 'seller-growth', tags: ['live-sales', 'operations'] },
};

function migratePost(post: LegacyPost): InsightPost {
  const migration = migrations[post.slug];
  const category = categoryBySlug.get(migration?.category ?? 'tiktok-marketing') ?? insightCategories[1];
  const tags = (migration?.tags ?? []).flatMap((slug) => {
    const tag = tagBySlug.get(slug);
    return tag ? [tag] : [];
  });

  return {
    ...post,
    status: 'published',
    category,
    tags,
    publishedAt: post.date,
    updatedAt: migration?.updatedAt ?? post.date,
    author: '틱톡커머스랩 편집팀',
  };
}

export const insightPosts = legacyPosts.map(migratePost);
export const publishedInsightPosts = insightPosts.filter((post) => post.status === 'published');

export function getInsightCategory(slug: string) {
  return insightCategories.find((category) => category.slug === slug);
}

export function getInsightTag(slug: string) {
  return insightTags.find((tag) => tag.slug === slug);
}

export function getInsightPost(slug: string) {
  return publishedInsightPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(slug: string) {
  return publishedInsightPosts.filter((post) => post.category.slug === slug);
}

export function getPostsByTag(slug: string) {
  return publishedInsightPosts.filter((post) => post.tags.some((tag) => tag.slug === slug));
}
