export type AcademyStatus =
  | 'pre_registration'
  | 'recruiting'
  | 'closing_soon'
  | 'closed'
  | 'in_progress'
  | 'completed';

export type AcademyConfig = {
  title: string;
  subtitle: string;
  description: string;
  status: AcademyStatus;
  cohort?: string;
  startDate?: string;
  endDate?: string;
  schedule?: string;
  duration?: string;
  format: string;
  location?: string;
  price?: number;
  originalPrice?: number;
  capacity?: number;
  applicationDeadline?: string;
  instructors: string[];
  benefits: string[];
  applicationOpen: boolean;
  paymentOpen: boolean;
};

export const academyConfig: AcademyConfig = {
  title: '틱톡커머스 셀러 실전 아카데미',
  subtitle: '보는 교육이 아니라\n콘텐츠를 만들고 실제 판매를 시작하는 과정',
  description:
    '상품과 타깃 분석부터 틱톡 숏폼, 라이브커머스, 크리에이터 협업, 첫 판매 프로젝트까지 단계별로 직접 실행합니다.',
  status: 'pre_registration',
  format: '실전 워크숍 · 피드백 · 프로젝트형 교육',
  instructors: ['백운덕 대표', '임헌수 대표'],
  benefits: ['과제별 실행 템플릿', '콘텐츠·라이브 피드백', '첫 판매 프로젝트 설계', '수료 후 실행 체크리스트'],
  applicationOpen: true,
  paymentOpen: false,
};

export const academyStatusLabels: Record<AcademyStatus, string> = {
  pre_registration: '사전등록 중',
  recruiting: '모집 중',
  closing_soon: '모집 마감 임박',
  closed: '모집 마감',
  in_progress: '과정 진행 중',
  completed: '과정 종료',
};

export const academyGoals = [
  '틱톡커머스 수익구조를 이해한다.',
  '판매할 대표상품과 타깃을 선정한다.',
  '구매로 연결되는 숏폼을 직접 제작한다.',
  '라이브 판매 방송을 기획하고 실행한다.',
  '크리에이터 협업 구조를 설계한다.',
  '교육 종료 후에도 반복 가능한 판매 시스템을 만든다.',
];

export const academyAudiences = [
  { title: '상품은 있지만 틱톡 판매가 막막한 브랜드', text: '대표상품과 타깃을 좁히고 콘텐츠에서 구매까지 이어지는 실행 순서를 만듭니다.' },
  { title: '콘텐츠를 매출로 연결하고 싶은 셀러', text: '조회수만 보는 대신 상품 클릭, 문의, 구매로 이어지는 메시지와 오퍼를 설계합니다.' },
  { title: '판매 역량을 갖추고 싶은 크리에이터', text: '상품을 고르는 기준부터 숏폼과 LIVE에서 신뢰를 만드는 소개 방식을 훈련합니다.' },
  { title: '틱톡커머스를 직접 운영할 마케터', text: '콘텐츠, 크리에이터, 라이브, 지표를 하나의 커머스 운영 체계로 연결합니다.' },
];

export const academyCurriculum = [
  { phase: 'FOUNDATION', title: '틱톡커머스 구조와 목표 설계', topics: ['콘텐츠에서 구매까지의 고객 여정', '브랜드·셀러·크리에이터의 수익구조', '첫 프로젝트 목표와 핵심 지표'], output: '나의 틱톡커머스 실행 목표표' },
  { phase: 'PRODUCT', title: '대표상품·타깃·오퍼 선정', topics: ['시연과 설명이 쉬운 상품 찾기', '고객 문제와 구매 이유 정리', '마진·혜택·구성 점검'], output: '대표상품 한 장 기획서' },
  { phase: 'SHORT FORM', title: '구매로 연결되는 숏폼 제작', topics: ['첫 3초 훅과 고객 언어', '문제·시연·근거·행동 유도', '반복 제작을 위한 포맷 설계'], output: '판매 숏폼 기획안과 제작물' },
  { phase: 'LIVE', title: '라이브커머스 기획과 실행', topics: ['방송 흐름과 대본 작성', '질문·시연·오퍼 반복 구조', '진행·운영·댓글 역할 분담'], output: '라이브 대본과 리허설 피드백' },
  { phase: 'CREATOR', title: '크리에이터 협업 구조 만들기', topics: ['적합한 크리에이터 선별 기준', '브리프와 콘텐츠 가이드', '성과 측정과 재협업 기준'], output: '크리에이터 협업 브리프' },
  { phase: 'LAUNCH', title: '첫 판매 프로젝트와 개선', topics: ['작게 시작하는 실행 범위', '유입·체류·클릭·구매 기록', '다음 콘텐츠와 방송 개선'], output: '첫 판매 프로젝트 실행안' },
];

export const academyMethod = [
  { title: '배우기', text: '핵심 개념과 실제 운영 구조를 짧고 명확하게 이해합니다.' },
  { title: '만들기', text: '내 상품을 기준으로 기획안, 숏폼, 대본과 협업 문서를 직접 만듭니다.' },
  { title: '피드백', text: '고객 관점과 판매 흐름을 기준으로 결과물을 함께 점검합니다.' },
  { title: '실행', text: '완성한 자료를 첫 콘텐츠와 판매 프로젝트에 적용합니다.' },
  { title: '반복', text: '기록한 반응과 지표를 다음 콘텐츠와 방송에 반영합니다.' },
];

export const academyInstructors = [
  { name: '백운덕 대표', role: '라이브커머스 실전 운영', bio: '라이브 현장의 상품 구성, 진행, 고객 소통과 구매 전환 경험을 교육에 연결합니다.' },
  { name: '임헌수 대표', role: '마케팅·AI·교육 시스템 설계', bio: '상품과 고객 분석, 콘텐츠 제작, 마케팅 실행을 반복 가능한 시스템으로 설계합니다.' },
];

export const academyFaqs = [
  { question: '교육 일정과 기간은 언제 확정되나요?', answer: '현재 최종 조율 중입니다. 확정 전까지 임의의 일정을 안내하지 않으며, 사전등록자에게 먼저 안내할 예정입니다.' },
  { question: '수강료는 얼마인가요?', answer: '수강료와 결제 일정은 아직 확정되지 않았습니다. 현재 페이지에서는 결제를 받지 않으며, 가격 확정 후 별도 안내합니다.' },
  { question: '틱톡 계정이나 판매 경험이 없어도 참여할 수 있나요?', answer: '과정은 입문자도 구조를 이해할 수 있도록 시작하지만, 실제 결과물을 만드는 과제가 포함됩니다. 현재 수준과 목표를 사전상담에 남겨주시면 과정 적합성을 함께 확인합니다.' },
  { question: '상품이 없는 크리에이터도 참여할 수 있나요?', answer: '크리에이터 협업과 상품 소개 역량을 배우는 경로를 포함할 예정입니다. 다만 세부 참여 조건과 실습 방식은 최종 과정 안내에서 확인해야 합니다.' },
  { question: '온라인 과정인가요, 오프라인 과정인가요?', answer: '운영 형식과 장소는 확정 전입니다. 확정되지 않은 방식은 약속하지 않으며 설정 정보가 결정되는 즉시 이 페이지에 반영합니다.' },
  { question: '사전등록하면 바로 수강이 확정되나요?', answer: '아닙니다. 사전등록은 관심자 우선 안내를 위한 절차이며 수강 확정이나 결제를 의미하지 않습니다.' },
  { question: '매출이나 성과를 보장하나요?', answer: '특정 매출이나 판매 성과를 보장하지 않습니다. 교육은 실행 역량과 반복 가능한 운영 체계를 만드는 데 초점을 둡니다.' },
  { question: '현재 사전등록 정보가 실제로 저장되나요?', answer: '현재 온라인 상담 폼은 저장 시스템 연결 전 상태이며, 입력 내용이 저장되지 않는다는 안내를 폼에서 제공합니다. 저장 시스템이 연결되기 전에는 완료 메시지를 표시하지 않습니다.' },
];

export const academyApplicationHref = '/contact?type=education';
