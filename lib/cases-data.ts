export const caseCategories = [
  '전체',
  '라이브커머스',
  '틱톡 콘텐츠',
  '유튜브 콘텐츠',
  '상품 소싱·기획',
  '브랜드 성장',
  '교육·컨설팅',
] as const;

export type CaseCategory = Exclude<(typeof caseCategories)[number], '전체'>;
export type CaseStatus = 'template' | 'draft' | 'published';

export type CaseMetric = {
  label: string;
  value: string;
  before?: string;
  after?: string;
  unit?: string;
};

export type CaseMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  status: CaseStatus;
  category: CaseCategory;
  title: string;
  summary: string;
  clientName?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  services: string[];
  period?: string;
  thumbnail?: CaseMedia;
  beforeMetrics?: CaseMetric[];
  afterMetrics?: CaseMetric[];
  keyResults?: CaseMetric[];
  gallery?: CaseMedia[];
  videoUrl?: string;
  testimonial?: { quote: string; author?: string; role?: string };
  featured?: boolean;
  publishedAt?: string;
  context?: string[];
  goals?: string[];
  strategy?: string[];
  execution?: Array<{ title: string; description: string }>;
  insights?: string[];
  improvements?: string[];
};

export type PublicChannel = {
  channelName: string;
  handle: string;
  platform: 'TikTok' | 'YouTube';
  description: string;
  publicBio?: string;
  profileImage?: string;
  followerCount?: string;
  videoCount?: string;
  totalViews?: string;
  channelUrl: string;
  featuredVideoUrl?: string;
  lastVerifiedAt: string;
};

export type ChannelVideo = {
  platform: PublicChannel['platform'];
  title: string;
  thumbnail?: CaseMedia;
  url: string;
  embedUrl?: string;
  publishedAt?: string;
  views?: string;
  description?: string;
  featured?: boolean;
};

export type CaseDashboardMetric = {
  key: 'experience' | 'broadcasts' | 'revenue' | 'products' | 'views' | 'brands';
  label: string;
  value?: string;
  note?: string;
};

export const publicChannels: PublicChannel[] = [
  {
    channelName: '창고남',
    handle: '@threebaek',
    platform: 'TikTok',
    description: '숏폼과 라이브를 통한 상품 소개 및 판매 활동',
    publicBio: '창고 물량을 공개하고, 매번 달라지는 상품을 짧고 직접적인 언어로 소개합니다.',
    channelUrl: 'https://www.tiktok.com/@threebaek',
    lastVerifiedAt: '2026-08-31',
  },
  {
    channelName: '창고남',
    handle: '@창고남자',
    platform: 'YouTube',
    description: '👇창고에 있는 모든것을 퍼 드립니다👇',
    publicBio: '상품 현장 소개, 숏폼과 장시간 라이브 방송을 함께 운영하는 공개 채널입니다.',
    channelUrl: 'https://www.youtube.com/@%EC%B0%BD%EA%B3%A0%EB%82%A8%EC%9E%90',
    lastVerifiedAt: '2026-08-31',
  },
];

// 검증된 수치를 받은 항목만 value를 입력합니다. value가 없는 카드는 화면에 렌더링되지 않습니다.
export const caseDashboardMetrics: CaseDashboardMetric[] = [
  { key: 'experience', label: '라이브 운영 경력' },
  { key: 'broadcasts', label: '누적 방송 횟수' },
  { key: 'revenue', label: '누적 라이브 매출' },
  { key: 'products', label: '판매 상품 수' },
  { key: 'views', label: '누적 콘텐츠 조회' },
  { key: 'brands', label: '협업 브랜드 수' },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'live-sales-operation',
    status: 'template',
    category: '라이브커머스',
    title: '라이브 판매 운영',
    summary: '상품 분석부터 방송 구성, 실시간 댓글 대응과 후속 리포트까지 한 흐름으로 운영합니다.',
    services: ['상품 진단', '방송 기획', '현장 운영', '결과 정리'],
  },
  {
    slug: 'shortform-to-live',
    status: 'template',
    category: '틱톡 콘텐츠',
    title: '숏폼에서 라이브로 연결',
    summary: '짧은 콘텐츠로 궁금증을 만들고, 라이브에서 시연과 구매 행동으로 이어지는 동선을 설계합니다.',
    services: ['숏폼 기획', '사전 모객', '라이브 연결'],
  },
  {
    slug: 'product-selling-points',
    status: 'template',
    category: '상품 소싱·기획',
    title: '상품의 판매 포인트 발굴',
    summary: '제품 설명을 고객이 바로 이해할 수 있는 문제·차이·사용 장면 중심의 판매 언어로 바꿉니다.',
    services: ['상품 분석', '고객 질문 정리', '판매 언어 설계'],
  },
  {
    slug: 'live-feedback-loop',
    status: 'template',
    category: '라이브커머스',
    title: '실시간 고객 반응을 활용한 방송 개선',
    summary: '댓글과 질문, 시청 흐름을 기록해 다음 방송의 순서와 시연, 제안 방식을 정교하게 다듬습니다.',
    services: ['댓글 운영', '반응 기록', '방송 개선'],
  },
  {
    slug: 'multi-channel-operation',
    status: 'template',
    category: '유튜브 콘텐츠',
    title: '유튜브와 틱톡 멀티채널 운영',
    summary: '플랫폼별 시청 맥락에 맞춰 숏폼, 상품 소개와 라이브 기록이 서로 이어지도록 구성합니다.',
    services: ['채널 전략', '콘텐츠 재구성', '라이브 운영'],
  },
  {
    slug: 'brand-live-system',
    status: 'template',
    category: '브랜드 성장',
    title: '브랜드 라이브 시스템 구축',
    summary: '한 번의 방송이 아니라 준비, 실행, 측정과 반복 개선이 가능한 내부 운영 구조를 설계합니다.',
    services: ['운영 체계', '역할 설계', '측정 기준', '교육·내재화'],
  },
];

// 공개 허용된 대표 영상만 추가합니다. 비어 있으면 iframe이나 깨진 미디어가 렌더링되지 않습니다.
export const channelVideos: ChannelVideo[] = [];

export const publishedCases = caseStudies.filter((item) => item.status === 'published');
export const featuredCases = publishedCases.filter((item) => item.featured);
export const visibleCaseDashboardMetrics = caseDashboardMetrics.filter((item) => item.value);

export function getPublishedCase(slug: string) {
  return publishedCases.find((item) => item.slug === slug);
}
