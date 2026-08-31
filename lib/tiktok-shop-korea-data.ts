export type VerificationStatus = 'official' | 'reported' | 'expected' | 'unconfirmed' | 'update_required';

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;
  verifiedAt: string;
  type: 'official' | 'government' | 'news' | 'industry';
};

export type PolicyItem = {
  id: string;
  category: string;
  title: string;
  summary: string;
  koreaStatus: VerificationStatus;
  confirmedFacts: string[];
  unconfirmedItems: string[];
  preparationSteps: string[];
  sourceIds: string[];
  updatedAt: string;
};

export const koreaGuideStatus = {
  localService: '한국 내 로컬 출시 시점 미확정',
  latestAnnouncement: '한국 사업자의 일본 TikTok Shop 진출 지원 발표',
  verification: 'TikTok 공식 뉴스룸 확인',
  lastUpdated: '2026.08.31',
  lastUpdatedIso: '2026-08-31',
  caution: '정책과 제공 기능은 국가·시점·사업자 유형에 따라 달라질 수 있습니다. 실제 입점이나 계약 전 해당 국가의 공식 Seller Center 안내를 다시 확인하세요.',
};

export const koreaGuideSources: Source[] = [
  {
    id: 'ceo-circle-2026',
    title: '틱톡샵 CEO 서클 2026 개최해 대한민국 브랜드의 글로벌 확산 가속화',
    publisher: 'TikTok Newsroom',
    url: 'https://newsroom.tiktok.com/ttsceocircle-2026?lang=ko-KR',
    publishedAt: '2026-01-13',
    verifiedAt: '2026-08-31',
    type: 'official',
  },
  {
    id: 'jp-crossborder-2026',
    title: '국내 브랜드 일본 진출 돕는 코리아-JP 크로스보더 솔루션 출시',
    publisher: 'TikTok Newsroom',
    url: 'https://newsroom.tiktok.com/ttsjpcb?lang=ko-KR',
    publishedAt: '2026-07-23',
    verifiedAt: '2026-08-31',
    type: 'official',
  },
  {
    id: 'koipa-mou-2026',
    title: '한국지식재산보호원과 K-브랜드 보호 업무협약 체결',
    publisher: 'TikTok Newsroom',
    url: 'https://newsroom.tiktok.com/koipa-mou?lang=ko-KR',
    publishedAt: '2026-08-28',
    verifiedAt: '2026-08-31',
    type: 'official',
  },
  {
    id: 'shop-warning-2024',
    title: 'TikTok Shop 사칭 광고 및 웹사이트 주의 안내',
    publisher: 'TikTok Newsroom',
    url: 'https://newsroom.tiktok.com/alert-regarding-a-website-claiming-to-be-tiktok-shop?lang=ko-KR',
    publishedAt: '2024-03-19',
    verifiedAt: '2026-08-31',
    type: 'official',
  },
  {
    id: 'affiliate-us',
    title: 'Affiliate Marketing | TikTok Shop US',
    publisher: 'TikTok Shop',
    url: 'https://business.tiktokshop.com/us/affiliate',
    verifiedAt: '2026-08-31',
    type: 'official',
  },
];

export const statusLabels: Record<VerificationStatus, string> = {
  official: '공식 확인',
  reported: '보도 확인',
  expected: '예상',
  unconfirmed: '미확정',
  update_required: '한국 공식 확인 필요',
};

export const koreaStatusCards = [
  { status: 'official' as const, title: '현재 공식 서비스 상태', summary: '2026년 1월 13일 TikTok 공식 발표 기준, 한국 내 TikTok Shop 진출 시점은 확정되지 않았습니다.', sourceId: 'ceo-circle-2026' },
  { status: 'official' as const, title: '공식 발표에서 확인된 내용', summary: '한국 기업은 공식 크로스보더 솔루션을 통해 미국·동남아 5개국에 이어 일본 시장 진출 지원을 받을 수 있습니다.', sourceId: 'jp-crossborder-2026' },
  { status: 'unconfirmed' as const, title: '아직 확정되지 않은 항목', summary: '한국 로컬 판매자 가입 자격, 수수료, 정산, 배송·반품 기준과 소비자 구매 기능은 공식 확인이 필요합니다.', sourceId: 'ceo-circle-2026' },
  { status: 'official' as const, title: '브랜드가 준비할 수 있는 것', summary: '상품 인증·표시, 마진, 재고, 지식재산권, 해외 배송과 콘텐츠 운영 체계를 미리 점검할 수 있습니다.', sourceId: 'koipa-mou-2026' },
  { status: 'update_required' as const, title: '셀러가 준비할 수 있는 것', summary: '사업자 자료, 상품 정보, 주문·CS 프로세스를 정리하되 실제 제출 항목은 국가별 Seller Center에서 확인해야 합니다.', sourceId: 'jp-crossborder-2026' },
  { status: 'update_required' as const, title: '크리에이터가 준비할 수 있는 것', summary: '카테고리 전문성, 상품 시연 콘텐츠와 라이브 역량을 준비할 수 있습니다. 한국 어필리에이트 자격은 공식 안내가 필요합니다.', sourceId: 'affiliate-us' },
];

export const shopJourney = ['콘텐츠 발견', '상품 관심', '상품 상세 확인', '라이브·리뷰 확인', '플랫폼 내 구매', '재추천과 재구매'];

export const shopFeatures = [
  ['쇼퍼블 비디오', '숏폼 콘텐츠에 상품을 연결해 발견과 구매 행동을 잇는 구조'],
  ['라이브 쇼핑', '실시간 시연·질문·혜택 안내와 구매 동선을 연결하는 구조'],
  ['상품 쇼케이스', '판매자 또는 크리에이터 프로필에서 상품을 탐색하는 구조'],
  ['셀러 기능', '상품·주문·물류·정산을 관리하는 판매 운영 기능'],
  ['크리에이터 어필리에이트', '크리에이터의 콘텐츠·LIVE 판매와 성과 기반 보상을 연결하는 구조'],
  ['광고와 커머스 연계', '콘텐츠와 상품 데이터를 활용해 유입과 전환을 확장하는 구조'],
];

export const shoppingComparison = [
  ['유입 방식', '검색 중심', '인플루언서 중심', '방송 중심', '콘텐츠 추천 중심'],
  ['구매 계기', '필요와 가격', '관계와 신뢰', '실시간 설명', '발견과 몰입'],
  ['핵심 콘텐츠', '상품 상세', '게시물·스토리', '라이브 방송', '숏폼·라이브'],
  ['판매 주체', '셀러', '인플루언서', '브랜드·쇼호스트', '셀러·브랜드·크리에이터'],
  ['반복 구조', '검색·광고', '팔로워', '방송 편성', '알고리즘·콘텐츠·어필리에이트'],
];

export const participantModels = [
  { title: '브랜드·제조사', items: ['상품 공급', '자체 콘텐츠', '라이브 방송', '크리에이터 협업', '브랜드 성장'], cta: '브랜드 진출 상담', href: '/contact?type=tiktok-shop' },
  { title: '온라인 셀러', items: ['상품 등록', '판매 페이지 운영', '숏폼·라이브 판매', '어필리에이트 연계', '주문·CS 관리'], cta: '셀러 준비 진단', href: '#readiness-check' },
  { title: '크리에이터', items: ['상품 콘텐츠 제작', '라이브 판매', '어필리에이트 수익', '브랜드 협업', '전문 카테고리 구축'], cta: '크리에이터 교육 관심 등록', href: '/seller-academy' },
  { title: '대행사·마케터', items: ['콘텐츠 운영', '광고', '셀러 지원', '라이브 운영', '브랜드 컨설팅'], cta: '파트너십 문의', href: '/contact?type=partnership' },
];

export const salesFunnel = [
  { title: '상품 경쟁력', task: '팔릴 이유와 핵심 고객을 정의', content: '상품 증빙·비교·사용 장면', metric: '마진·반품 가능성', failure: '유행만 보고 상품을 선택' },
  { title: '콘텐츠 소재 발굴', task: '고객 질문과 사용 맥락을 수집', content: '문제·시연·후기 소재', metric: '소재 후보와 제작 난도', failure: '광고 문구만 반복' },
  { title: '숏폼 발행', task: '여러 훅과 화자를 짧게 실험', content: '15~60초 세로 영상', metric: '완주·저장·댓글·클릭', failure: '한 편 성과로 결론' },
  { title: '크리에이터 확산', task: '카테고리 적합 파트너를 발굴', content: '리뷰·비교·사용 콘텐츠', metric: '유효 콘텐츠·기여 전환', failure: '팔로워 수만 보고 선정' },
  { title: '라이브 판매', task: '모객·시연·제안·응대를 설계', content: '대본·데모·FAQ·혜택', metric: '체류·상품 클릭·질문', failure: '방송만 켜면 팔린다고 기대' },
  { title: '구매 전환', task: '가격·구성·배송 불안을 해소', content: '상품 상세·혜택·정책', metric: '장바구니·구매·취소', failure: '매출만 보고 이익을 누락' },
  { title: '데이터 분석과 반복', task: '성과와 실패를 다음 실행에 반영', content: '리포트·소재 재가공', metric: '공헌이익·반품·재구매', failure: '방송 종료 후 기록 없음' },
];

export const readinessAreas = [
  { id: 'business', title: '사업 기본', items: ['사업자 정보', '통신판매업 신고', '개인정보처리방침', '이용약관', '고객 응대 체계'] },
  { id: 'product', title: '상품', items: ['핵심 상품 선정', '가격과 마진', '재고', '인증·표시사항', '반품 가능성'] },
  { id: 'content', title: '콘텐츠', items: ['숏폼 소재', '제품 사용 장면', '후기와 증빙', '출연자', '반복 제작 체계'] },
  { id: 'live', title: '라이브', items: ['방송 기획', '판매 대본', '쇼호스트', '촬영 환경', '재고와 이벤트'] },
  { id: 'operations', title: '운영', items: ['배송', '교환·반품', '고객 문의', '정산', '성과 분석'] },
];

const koreaUnconfirmed = ['한국 로컬 서비스의 세부 기준은 공개된 공식 자료만으로 확인되지 않았습니다.'];
const prepareOfficial = ['국가·사업자 유형별 공식 Seller Center 안내가 공개되면 실제 항목을 대조합니다.'];

export const policyItems: PolicyItem[] = [
  ['seller-signup', '계정', '판매자 가입', '한국 로컬 판매자 가입 화면과 절차는 공식 확인이 필요합니다.'],
  ['eligibility', '계정', '입점 자격', '한국 사업자 유형별 자격과 제출 서류는 아직 확정해 표시할 수 없습니다.'],
  ['listing', '상품', '상품 등록', '상품 정보·이미지·재고·표시사항을 준비하되 한국 심사 기준은 공식 확인이 필요합니다.'],
  ['content-link', '콘텐츠', '콘텐츠 연결', '운영 국가에서는 쇼퍼블 콘텐츠와 LIVE를 상품에 연결하지만 한국 제공 기능은 미확정입니다.'],
  ['fees', '비용', '수수료', '다른 국가의 판매·어필리에이트 수수료를 한국 기준으로 적용할 수 없습니다.'],
  ['settlement', '정산', '정산', '한국 통화·계좌·정산 주기·공제 기준은 공식 확인 후 업데이트해야 합니다.'],
  ['shipping', '물류', '배송', '국내 로컬 배송 기준은 미확정이며 크로스보더는 대상 국가별 요건을 따라야 합니다.'],
  ['returns', '물류', '교환·반품', '소비자 보호와 플랫폼 반품 규칙은 판매 국가별 공식 정책을 확인해야 합니다.'],
  ['service', '운영', '고객 서비스', '응답 시간과 분쟁 처리 기준은 한국 공식 정책 공개 후 업데이트해야 합니다.'],
  ['violations', '정책', '정책 위반', '금지·제한 품목, 표시·광고, 지식재산권 기준을 판매 국가 정책과 함께 확인해야 합니다.'],
].map(([id, category, title, summary]) => ({
  id,
  category,
  title,
  summary,
  koreaStatus: 'update_required',
  confirmedFacts: id === 'violations' ? ['TikTok은 한국지식재산보호원과 K-브랜드 보호 및 위조상품 대응 협력을 발표했습니다.'] : [],
  unconfirmedItems: koreaUnconfirmed,
  preparationSteps: id === 'violations' ? ['상품 권리 자료, 인증·표시 근거, 콘텐츠 사용 권한을 정리합니다.'] : prepareOfficial,
  sourceIds: id === 'violations' ? ['koipa-mou-2026'] : ['ceo-circle-2026'],
  updatedAt: '2026-08-31',
}));

export const roadmap = [
  ['1주차', '상품과 타깃', ['대표 상품 선정', '타깃 정의', '판매 포인트 정리']],
  ['2주차', '콘텐츠', ['숏폼 주제 설계', '촬영 템플릿', '콘텐츠 발행 시작']],
  ['3주차', '라이브와 크리에이터', ['방송 구조', '출연자', '협업 후보 발굴']],
  ['4주차', '판매 시스템', ['주문·배송·CS 점검', '성과 지표 설정', '첫 테스트 실행 계획']],
] as const;

export const contentHubTopics = [
  { title: '틱톡샵 한국 진출 최신 현황', slug: 'tiktok-shop-korea-launch' },
  { title: '틱톡샵 판매자 시작 가이드', slug: 'seller-center-checklist' },
  { title: '틱톡샵 상품 등록 준비' },
  { title: '틱톡샵 수수료와 정산' },
  { title: '틱톡샵 배송과 반품' },
  { title: '크리에이터 어필리에이트' },
  { title: '틱톡샵 라이브 판매', slug: 'live-sales-structure' },
  { title: '틱톡샵 광고 전략', slug: 'ads-vs-organic-shortform' },
];

export const koreaGuideFaqs = [
  { q: '틱톡샵은 무엇인가요?', a: '숏폼과 LIVE 등 콘텐츠에서 상품 발견, 탐색과 구매를 연결하는 커머스 구조입니다. 실제 제공 기능은 국가마다 다를 수 있습니다.' },
  { q: '한국에서 현재 이용할 수 있나요?', a: '2026년 1월 13일 TikTok 공식 발표는 한국 진출 시점이 아직 확정되지 않았다고 밝혔습니다. 이후 한국 기업의 해외 TikTok Shop 진출을 지원하는 크로스보더 솔루션은 확대됐지만, 이는 한국 로컬 서비스 출시와 구분해야 합니다.' },
  { q: '일반 쇼핑몰과 무엇이 다른가요?', a: '검색이나 가격 비교뿐 아니라 추천 콘텐츠와 LIVE를 통해 상품을 발견하고 구매로 이어지는 흐름에 초점을 둡니다.' },
  { q: '개인도 판매자로 가입할 수 있나요?', a: '한국 로컬 판매자의 개인·사업자 가입 자격은 한국 공식 정책 확인 후 업데이트할 예정입니다.' },
  { q: '판매할 상품이 없어도 참여할 수 있나요?', a: '운영 국가에서는 크리에이터가 어필리에이트 상품을 콘텐츠와 LIVE로 소개하는 구조가 있습니다. 한국 제공 여부와 자격은 공식 안내가 필요합니다.' },
  { q: '크리에이터는 어떻게 수익을 얻나요?', a: '일부 운영 국가에서는 판매 성과에 따른 커미션 구조가 있습니다. 수익률과 자격은 국가·캠페인별로 다르며 한국 기준으로 확정할 수 없습니다.' },
  { q: '라이브 방송을 반드시 해야 하나요?', a: 'TikTok Shop 운영 시장에서도 숏폼, 쇼케이스, 어필리에이트 등 여러 경로가 활용됩니다. LIVE는 선택 가능한 판매 방식 중 하나로 이해할 수 있습니다.' },
  { q: '수수료와 정산 방식은 어떻게 되나요?', a: '한국 공식 수수료율·정산 주기·통화·공제 기준은 확인 후 업데이트 예정입니다. 다른 국가 정책을 한국 기준으로 사용하면 안 됩니다.' },
  { q: '지금 무엇부터 준비해야 하나요?', a: '상품의 마진·재고·인증, 배송·반품·CS, 숏폼 소재, 라이브 운영 인력과 성과 기록 체계를 먼저 점검할 수 있습니다.' },
  { q: '틱톡커머스랩은 공식 TikTok 운영사인가요?', a: '아닙니다. 틱톡커머스랩은 TikTok 또는 ByteDance가 운영하는 공식 사이트가 아니라 독립적으로 운영되는 교육·마케팅 정보 플랫폼입니다.' },
];

export function getSource(id: string) {
  return koreaGuideSources.find((source) => source.id === id);
}
