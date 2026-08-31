import {
  BarChart3,
  Bot,
  Boxes,
  ClipboardCheck,
  Clapperboard,
  FileChartColumn,
  Gauge,
  Megaphone,
  MessagesSquare,
  Radio,
  SearchCheck,
  ShoppingBag,
  Sparkles,
  Target,
  UsersRound,
} from 'lucide-react';

export const agencyProblems = [
  '라이브 방송을 했지만 시청자가 모이지 않는다.',
  '쇼호스트는 섭외했지만 상품의 강점이 전달되지 않는다.',
  '콘텐츠, 광고, 방송 운영이 각각 따로 움직인다.',
  '방송이 끝나면 고객과 데이터가 함께 사라진다.',
  '할인에만 의존해 수익성이 떨어진다.',
  '내부에 라이브를 운영할 전문 인력이 없다.',
];

export const agencyFlow = [
  { icon: SearchCheck, title: '상품 및 브랜드 진단', text: '상품 조건과 현재 채널을 먼저 확인합니다.' },
  { icon: Target, title: '고객·판매 포인트 설계', text: '누구에게 무엇을 제안할지 정리합니다.' },
  { icon: Clapperboard, title: '콘셉트·대본 기획', text: '시연과 설득, CTA 흐름을 설계합니다.' },
  { icon: UsersRound, title: '출연자 매칭', text: '상품과 방송 방식에 맞는 출연자를 검토합니다.' },
  { icon: Megaphone, title: '콘텐츠·광고 모객', text: '방송 전 고객 유입 경로를 준비합니다.' },
  { icon: ShoppingBag, title: '라이브·구매 전환', text: '현장 흐름과 고객 반응을 운영합니다.' },
  { icon: FileChartColumn, title: '분석·재방송 개선', text: '데이터를 다음 실행에 반영합니다.' },
];

export const agencyServices = [
  { icon: SearchCheck, title: '전략 진단', items: ['상품 경쟁력 분석', '핵심 판매 포인트 발굴', '타깃 고객 설정', '플랫폼·방송 방식 제안'] },
  { icon: Clapperboard, title: '방송 기획', items: ['라이브 콘셉트', '판매 시나리오', '방송 구성표', '대본·CTA 설계'] },
  { icon: UsersRound, title: '출연자 섭외', items: ['쇼호스트', '틱톡 크리에이터', '전문가 출연자', '상품별 적합도 매칭'] },
  { icon: Megaphone, title: '콘텐츠·모객', items: ['티저 숏폼', '사전 홍보 콘텐츠', '광고 소재', '방송 알림·유입 설계'] },
  { icon: Radio, title: '라이브 운영', items: ['방송 현장 운영', '상품 노출', '댓글·이벤트 관리', '구매 전환 흐름 관리'] },
  { icon: BarChart3, title: '성과 분석', items: ['유입·시청 데이터', '클릭·구매 전환', '이탈 구간 분석', '후속 콘텐츠·재방송 전략'] },
];

export const agencyDifferences = [
  { icon: Radio, title: '라이브 실전 경험', text: '현장 운영 관점에서 방송과 판매 흐름을 설계합니다.' },
  { icon: Gauge, title: '마케팅 시스템', text: '콘텐츠, 광고, 리드 수집, 재구매를 하나의 퍼널로 연결합니다.' },
  { icon: Bot, title: 'AI 기반 제작 효율', text: '기획, 대본, 숏폼, 광고 소재 제작 과정을 효율화합니다.' },
  { icon: ClipboardCheck, title: '교육과 내재화', text: '대행으로 끝내지 않고 내부에 운영 노하우가 남도록 지원합니다.' },
];

export const agencyPackages = [
  { title: '라이브 진단형', audience: '라이브 판매 가능성을 먼저 검토하려는 브랜드', items: ['상품 분석', '판매 포인트 진단', '방송 방향 제안', '실행 체크리스트'], cta: '진단 상담 신청' },
  { title: '1회 실행형', audience: '첫 방송을 실제로 테스트하려는 브랜드', items: ['방송 기획', '출연자 매칭', '대본', '현장 운영', '결과 리포트'], cta: '테스트 방송 문의' },
  { title: '월 운영 대행형', audience: '라이브를 정기적인 판매 채널로 구축하려는 브랜드', items: ['월간 방송 계획', '콘텐츠·사전 모객', '방송 운영', '데이터 분석', '반복 개선'], cta: '월 운영 상담', featured: true },
  { title: '틱톡 진출 패키지', audience: '틱톡 콘텐츠부터 커머스까지 함께 시작하려는 브랜드', items: ['계정·콘텐츠 전략', '숏폼 제작 구조', '라이브 운영', '광고·크리에이터 연계', '틱톡샵 연동 준비'], cta: '틱톡 진출 상담' },
];

export const agencyProcess = [
  ['상담 신청', '상품과 현재 운영 상황을 알려주세요.'],
  ['상품·목표 확인', '판매 조건과 원하는 결과를 함께 확인합니다.'],
  ['전략·견적 제안', '필요 범위와 운영 방식을 제안합니다.'],
  ['방송 준비', '콘셉트, 출연자, 대본과 유입을 준비합니다.'],
  ['라이브 실행', '현장과 고객 반응, 구매 흐름을 운영합니다.'],
  ['성과 리포트', '확인 가능한 데이터를 기준으로 정리합니다.'],
  ['다음 방송 개선', '배운 내용을 다음 콘텐츠와 방송에 반영합니다.'],
] as const;

export type AgencyCase = {
  industry: string;
  challenge: string;
  scope: string;
  outcome: string;
  href?: string;
};

// 검증된 프로젝트 자료가 확보되면 이 배열에 추가합니다.
export const agencyCases: AgencyCase[] = [];

export const agencyExperts = [
  { name: '백운덕 대표', image: '', socialUrl: '', roles: ['틱톡 및 라이브커머스 실전', '크리에이터·방송 운영', '현장 실행 총괄'] },
  { name: '임헌수 대표', image: '', socialUrl: '', roles: ['마케팅 전략', '콘텐츠와 리드 퍼널', 'AI 기반 커머스 시스템', '교육 및 사업화'] },
];

export const agencyFaqs = [
  { q: '어떤 상품이 라이브커머스에 적합한가요?', a: '화면에서 효용이나 차이를 보여줄 수 있고, 설명과 시연이 구매 불안을 줄여주는 상품이 유리합니다. 가격뿐 아니라 마진, 재고, 배송과 반품 조건까지 함께 진단합니다.' },
  { q: '상품만 있어도 방송을 시작할 수 있나요?', a: '상담은 가능합니다. 실제 방송 전에는 상품 정보, 판매 조건, 재고와 배송 체계, 고객 응대 기준을 확인하고 부족한 준비 항목을 정리합니다.' },
  { q: '쇼호스트와 크리에이터도 섭외해주나요?', a: '희망 서비스 범위에 따라 검토합니다. 상품, 타깃 고객, 방송 콘셉트와 예산을 확인한 뒤 적합한 출연자 유형과 섭외 방식을 제안합니다.' },
  { q: '한 번만 테스트 방송을 진행할 수 있나요?', a: '네. 1회 실행형으로 테스트할 수 있습니다. 다만 방송 한 번의 매출만 보기보다 유입, 시청 반응, 클릭과 구매 흐름을 다음 실험에 활용하는 것을 권합니다.' },
  { q: '광고와 사전 홍보도 함께 진행하나요?', a: '필요한 경우 티저 숏폼, 사전 콘텐츠, 방송 알림과 광고 소재까지 연결할 수 있습니다. 구체적인 매체와 집행 범위는 상담 후 결정합니다.' },
  { q: '방송 후에는 어떤 자료를 받을 수 있나요?', a: '계약 범위와 플랫폼에서 확인 가능한 데이터를 기준으로 유입, 시청, 클릭, 구매 전환과 주요 반응을 정리하고 다음 방송의 개선 항목을 제안합니다.' },
  { q: '틱톡 계정이나 틱톡샵이 없어도 상담 가능한가요?', a: '가능합니다. 현재 보유 채널과 준비 상태를 확인한 뒤 계정, 콘텐츠, 라이브, 틱톡샵 연동 준비 중 어디부터 시작할지 검토합니다.' },
  { q: '비용은 어떻게 산정되나요?', a: '상품 수, 방송 횟수, 출연자, 콘텐츠 제작, 광고, 현장 운영과 분석 범위에 따라 달라집니다. 상담에서 필요한 범위를 확인한 뒤 견적을 제안합니다.' },
];

export const agencyHeroStats = [
  { icon: MessagesSquare, label: '채팅 반응', value: '실시간 피드백' },
  { icon: Boxes, label: '상품 카드', value: '구매 흐름 연결' },
  { icon: Sparkles, label: '분석 리포트', value: '다음 방송 개선' },
];
