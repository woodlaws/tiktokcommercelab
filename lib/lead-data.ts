export const leadTypes = ['tiktok-shop', 'live-agency', 'brand-growth', 'education', 'free-class', 'creator', 'product-sourcing', 'corporate-training', 'partnership', 'other'] as const;
export type LeadType = (typeof leadTypes)[number];

export type LeadCampaign = { source?: string; medium?: string; campaign?: string; content?: string; term?: string };
export type LeadPayload = {
  type: LeadType; name: string; phone: string; email: string; organization?: string; role?: string;
  product?: string; currentChannel?: string; monthlySales?: string; budget?: string; timeline?: string;
  goal: string; preferredContact?: string; privacyConsent: boolean; marketingConsent: boolean;
  sourcePath: string; referrer?: string; campaign: LeadCampaign; context?: Record<string, string | string[]>;
  websiteConfirmation?: string; startedAt: number;
};

export type LeadApiResult =
  | { ok: true; leadId: string }
  | { ok: false; reason: 'validation_failed' | 'spam_detected' | 'rate_limited' | 'not_configured' | 'request_failed'; message: string; errors?: Record<string, string> };

export const leadTypeOptions: Array<{ value: LeadType; label: string; description: string; service: string; accent: 'mint' | 'pink' }> = [
  { value: 'tiktok-shop', label: '틱톡샵 진출', description: '입점 준비, 상품·정책·판매 구조를 점검합니다.', service: '틱톡샵 진출 컨설팅', accent: 'mint' },
  { value: 'live-agency', label: '라이브 운영대행', description: '상품 진단부터 방송 기획·운영·분석을 상담합니다.', service: '라이브커머스 에이전시', accent: 'pink' },
  { value: 'brand-growth', label: '브랜드 성장', description: '숏폼·광고·크리에이터·판매 퍼널을 연결합니다.', service: '브랜드 성장 컨설팅', accent: 'mint' },
  { value: 'education', label: '셀러 아카데미', description: '실전 교육과 사전등록 가능성을 확인합니다.', service: '틱톡커머스 셀러 실전 아카데미', accent: 'pink' },
  { value: 'free-class', label: '무료특강', description: '무료특강 일정과 참여 방식 문의를 분류합니다.', service: '틱톡커머스 무료특강', accent: 'mint' },
  { value: 'creator', label: '크리에이터·셀러', description: '콘텐츠·판매·프로젝트 참여 방향을 상담합니다.', service: '크리에이터·셀러 성장', accent: 'pink' },
  { value: 'product-sourcing', label: '상품 소싱', description: '판매 상품 발굴과 협업 가능성을 확인합니다.', service: '상품 소싱·판매 협업', accent: 'mint' },
  { value: 'corporate-training', label: '기업·기관 교육', description: '조직 맞춤형 교육과 프로젝트 범위를 상담합니다.', service: '기업·기관 교육', accent: 'pink' },
  { value: 'partnership', label: '파트너십', description: '브랜드, 기관, 크리에이터와 협업을 검토합니다.', service: '사업 제휴·파트너십', accent: 'mint' },
  { value: 'other', label: '기타 문의', description: '위 유형에 해당하지 않는 문의를 남깁니다.', service: '기타 문의', accent: 'pink' },
];

export const monthlySalesOptions = ['판매 전', '월 1천만원 미만', '월 1천만~5천만원', '월 5천만~1억원', '월 1억원 이상', '공개 어려움'];
export const budgetOptions = ['미정', '500만원 미만', '500만~1천만원', '1천만~3천만원', '3천만원 이상', '상담 후 결정'];
export const timelineOptions = ['가능한 빠르게', '1개월 이내', '1~3개월', '3개월 이후', '아직 미정'];

export function isLeadType(value: unknown): value is LeadType { return typeof value === 'string' && (leadTypes as readonly string[]).includes(value); }
export function getLeadOption(type: LeadType) { return leadTypeOptions.find((option) => option.value === type) ?? leadTypeOptions[9]; }

const phonePattern = /^[0-9+()\s-]{8,24}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateLeadPayload(payload: Partial<LeadPayload>) {
  const errors: Record<string, string> = {};
  if (!isLeadType(payload.type)) errors.type = '문의 유형을 선택해 주세요.';
  if (!payload.name?.trim() || payload.name.trim().length > 60) errors.name = '이름을 60자 이내로 입력해 주세요.';
  if (!payload.phone?.trim() || !phonePattern.test(payload.phone.trim())) errors.phone = '연락처 형식을 확인해 주세요.';
  if (!payload.email?.trim() || payload.email.length > 254 || !emailPattern.test(payload.email.trim())) errors.email = '이메일 형식을 확인해 주세요.';
  if (!payload.goal?.trim() || payload.goal.trim().length < 10 || payload.goal.trim().length > 2000) errors.goal = '문의 내용은 10~2,000자로 입력해 주세요.';
  if (!payload.privacyConsent) errors.privacyConsent = '개인정보 수집·이용 동의가 필요합니다.';
  for (const key of ['organization', 'role', 'product', 'currentChannel', 'preferredContact'] as const) if ((payload[key]?.length ?? 0) > 200) errors[key] = '200자 이내로 입력해 주세요.';
  return errors;
}
