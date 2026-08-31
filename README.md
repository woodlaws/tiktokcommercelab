# 틱톡커머스랩 홈페이지

틱톡·틱톡샵·숏폼·라이브커머스·광고에 관한 정보, 교육, 컨설팅, 판매대행을 소개하는 다페이지 사이트입니다. TikTok 및 ByteDance의 공식 운영 사이트가 아닙니다.

## 실행

Node.js 22.13 이상과 pnpm을 사용합니다.

```bash
pnpm install
pnpm dev
```

로컬 주소는 기본적으로 `http://localhost:3000`입니다.

## 빌드와 배포

```bash
pnpm build
pnpm start
```

표준 Next.js 16 App Router 프로젝트이며 GitHub와 Vercel에 바로 연결할 수 있습니다. 전체 검사는 다음 명령으로 실행합니다.

```bash
pnpm check
```

GitHub·Vercel 연결 순서와 환경변수 설정은 [`DEPLOYMENT.md`](./DEPLOYMENT.md)를 참고하세요. 기존 OpenAI Sites 설정은 현재 배포를 유지하기 위해 `.openai`에 보존되어 있으며 Vercel 빌드에는 사용되지 않습니다.

## 콘텐츠 수정

- 사이트 기본정보·연락처·사업자정보: `lib/site-data.ts`의 `site`
- 내비게이션: `lib/site-data.ts`의 `navigation`
- 실적·서비스·전문가: `metrics`, `services`, `experts`
- CTA 문구와 페이지 내용: `pageContent` 및 각 페이지 컴포넌트
- 외부 링크: `lib/site-data.ts`에서 관리

## 블로그 글 추가

`lib/site-data.ts`의 `posts` 배열에 새 글을 추가합니다. `slug`, 제목, 요약, 카테고리, 날짜, 읽기시간, 본문 문단, 핵심 요약, 출처 안내를 입력하면 목록·검색·카테고리·상세·RSS·사이트맵에 자동 반영됩니다.

## 썸네일 추가

현재 글 카드는 카테고리별 그래픽 플레이스홀더를 사용합니다. 실제 썸네일은 `public/images/insights/`에 WebP 또는 AVIF로 넣고, 글 데이터에 이미지 경로를 추가한 뒤 `components/insights-browser.tsx`의 카드 영역에서 불러오세요.

## 사진 교체

홈 히어로와 전문가 소개에는 명확한 사진 교체 영역이 있습니다. 최적화된 WebP/AVIF 사진을 `public/images/`에 넣고 해당 플레이스홀더를 `next/image`로 교체하세요. 이미지에는 구체적인 한글 `alt`를 입력합니다.

## 폼 백엔드 연결

`components/lead-form.tsx`의 `submit` 함수가 연결 지점입니다. 현재는 유효성 검사 후에도 저장하지 않으며 그 사실을 사용자에게 명확히 표시합니다. Supabase 또는 외부 폼 API 연결 시 서버 액션이나 API 라우트에서 저장하고, 성공·오류 상태를 실제 응답에 따라 표시하세요.

환경변수 예시:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
FORM_API_URL=
FORM_API_KEY=
```

## 교체가 필요한 임시 정보

- 이메일, 전화번호, 주소, 사업자정보
- 백운덕·임헌수 대표 실제 인물사진과 프로필 검수
- 라이브 셀러 현장 사진
- 월 매출 10억 관련 증빙 자료
- 공식 출시·정책 관련 최신 출처 링크
- 폼 저장 시스템과 개인정보 담당자 정보
