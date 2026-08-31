import {
  Blocks,
  Boxes,
  Building2,
  Clapperboard,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  Megaphone,
  Radio,
  Route,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  UserRound,
  UsersRound,
} from 'lucide-react';

export type FreeClassStatus = 'scheduled' | 'open' | 'closingSoon' | 'closed' | 'completed';

export type FreeClassConfig = {
  title: string;
  subtitle: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  applicationDeadline?: string;
  format?: string;
  location?: string;
  meetingUrl?: string;
  price?: string;
  capacity?: number;
  remainingSeats?: number;
  status: FreeClassStatus;
  instructorNames: string[];
  benefits: Array<{ title: string; fileUrl?: string }>;
  applicationOpen: boolean;
  notice?: string;
  scheduleFallback?: string;
  privacyController?: string;
  privacyRetentionPeriod?: string;
};

export const freeClassConfig: FreeClassConfig = {
  title: '틱톡샵 한국 진출과 라이브커머스 매출 시스템 무료특강',
  subtitle: '틱톡에서 조회수를 만드는 방법이 아니라 콘텐츠를 실제 구매와 매출로 연결하는 구조를 공개합니다.',
  format: '온라인 LIVE',
  price: '무료',
  status: 'open',
  instructorNames: ['백운덕 대표', '임헌수 대표'],
  benefits: [
    { title: '틱톡 커머스 준비 체크리스트' },
    { title: '상품별 라이브 적합도 자가진단표' },
    { title: '브랜드·셀러·크리에이터 실행 로드맵' },
    { title: '특강 일정 및 관련 자료 우선 안내' },
  ],
  applicationOpen: true,
  notice: '사전 신청 접수 중',
  scheduleFallback: '신청자에게 우선 안내',
};

export const statusLabels: Record<FreeClassStatus, string> = {
  scheduled: '일정 안내 예정',
  open: '사전 신청 접수 중',
  closingSoon: '신청 마감 임박',
  closed: '신청 마감',
  completed: '특강 종료',
};

export const freeClassProblems = [
  '조회수만 보고 판매 구조를 설계하지 않는다.',
  '숏폼과 라이브 방송이 따로 운영된다.',
  '상품의 판매 포인트가 콘텐츠에 드러나지 않는다.',
  '광고·크리에이터·라이브가 하나의 퍼널로 연결되지 않는다.',
  '방송 이후 고객 데이터와 후속 판매가 남지 않는다.',
  '틱톡샵 변화에 무엇부터 준비해야 할지 모른다.',
];

export const freeClassCurriculum = [
  { icon: Blocks, title: '틱톡 커머스 시장의 구조', items: ['콘텐츠, 라이브, 상품 판매가 연결되는 방식', '브랜드·셀러·크리에이터의 역할'] },
  { icon: Store, title: '틱톡샵 준비 전략', items: ['국내 사업자가 먼저 준비할 항목', '상품, 운영, 콘텐츠, 판매 체계 점검'] },
  { icon: Target, title: '팔리는 상품과 콘텐츠', items: ['상품의 판매 포인트 발굴', '숏폼에서 구매 욕구를 만드는 구조'] },
  { icon: Radio, title: '라이브커머스 판매 설계', items: ['방송 전 모객', '방송 중 구매 전환', '방송 후 재판매'] },
  { icon: UsersRound, title: '크리에이터 협업과 어필리에이트', items: ['협업 대상 선정', '콘텐츠와 판매 성과를 연결하는 방식'] },
  { icon: Route, title: '실행 로드맵', items: ['브랜드·셀러·크리에이터별 첫 30일 실행 계획'] },
];

export const freeClassAudiences = [
  { icon: Building2, title: '브랜드·제조사', text: '자체 제품을 틱톡 콘텐츠와 라이브 판매 구조에 연결합니다.' },
  { icon: ShoppingBag, title: '온라인 셀러', text: '기존 판매 채널을 넘어 새로운 고객 유입 경로를 설계합니다.' },
  { icon: Megaphone, title: '마케팅 실무자', text: '콘텐츠·광고·크리에이터·라이브를 하나의 퍼널로 이해합니다.' },
  { icon: Radio, title: '라이브커머스 사업자', text: '방송 전후까지 이어지는 반복 가능한 판매 흐름을 점검합니다.' },
  { icon: UserRound, title: '크리에이터', text: '팔로워와 콘텐츠 영향력을 상품 판매와 수익화로 연결합니다.' },
  { icon: Sparkles, title: '예비 창업자', text: '틱톡 커머스 사업을 시작할 때 필요한 첫 실행 순서를 찾습니다.' },
];

export const commerceFunnel = [
  { icon: Clapperboard, title: '숏폼 콘텐츠' },
  { icon: Gauge, title: '관심과 유입' },
  { icon: Radio, title: '라이브 방송' },
  { icon: ShoppingBag, title: '상품 구매' },
  { icon: ClipboardCheck, title: '고객 데이터' },
  { icon: Boxes, title: '재구매와 확산' },
];

export const freeClassInstructors = [
  {
    name: '백운덕 대표',
    color: '#fe2c55',
    image: '',
    roles: ['틱톡·라이브커머스 현장 운영', '상품 소개 및 실시간 판매', '크리에이터와 라이브 콘텐츠', '실전 커머스 실행'],
    channels: [
      { label: 'TikTok 채널 보기', url: 'https://www.tiktok.com/@threebaek' },
      { label: '창고남 YouTube 보기', url: 'https://www.youtube.com/@%EC%B0%BD%EA%B3%A0%EB%82%A8%EC%9E%90' },
    ],
  },
  {
    name: '임헌수 대표',
    color: '#25f4ee',
    image: '',
    roles: ['AI 마케팅 및 콘텐츠 전략', '콘텐츠·리드·판매 퍼널 설계', '교육 프로그램 기획과 운영', '사업화 및 수익모델 구축'],
    channels: [],
  },
];

export const freeClassFaqs = [
  { q: '무료특강은 정말 무료인가요?', a: '네. 현재 사전 신청을 받고 있는 특강의 참가비는 무료입니다.' },
  { q: '틱톡을 운영하지 않아도 참여할 수 있나요?', a: '가능합니다. 틱톡을 시작하기 전 무엇을 준비할지 확인하려는 분도 참여할 수 있습니다.' },
  { q: '판매할 상품이 없어도 신청할 수 있나요?', a: '가능합니다. 크리에이터, 마케터, 예비 창업자 관점에서 커머스 구조를 이해할 수 있도록 구성합니다.' },
  { q: '브랜드 직원이나 마케팅 실무자도 들을 수 있나요?', a: '네. 콘텐츠와 판매를 연결해야 하는 브랜드 담당자와 마케팅 실무자도 주요 대상입니다.' },
  { q: '특강은 온라인으로 진행되나요?', a: '현재 진행 방식은 온라인 LIVE로 안내하고 있습니다. 구체적인 참여 방법은 신청자에게 우선 안내합니다.' },
  { q: '일정은 언제 안내되나요?', a: '세부 일정이 확정되면 신청할 때 입력한 연락처로 우선 안내합니다.' },
  { q: '녹화본이 제공되나요?', a: '녹화본 제공 여부는 아직 확정되지 않았습니다. 확정된 내용만 신청자에게 안내합니다.' },
  { q: '신청 후 개별 상담도 가능한가요?', a: '신청 폼에서 희망 상담 유형을 선택할 수 있습니다. 실제 상담 진행 여부와 방법은 별도 안내합니다.' },
];

export const userTypeOptions = ['브랜드·제조사', '온라인 셀러', '마케터·대행사', '크리에이터', '예비 창업자', '기타'];
export const interestOptions = ['틱톡샵 입점', '라이브커머스 판매', '틱톡 콘텐츠', '크리에이터 협업', '광고·마케팅', '셀러 교육', '라이브 운영대행'];
export const consultationOptions = ['특강만 신청', '상품 진단 상담 희망', '라이브 운영대행 상담 희망', '교육과정 상담 희망'];

export const benefitIcon = GraduationCap;
