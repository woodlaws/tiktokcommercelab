# GitHub · Vercel 배포 가이드

## 1. GitHub 저장소 만들기

1. GitHub에서 빈 저장소를 만듭니다.
2. 이 프로젝트 폴더의 Git 원격 저장소를 GitHub 주소로 연결합니다.
3. `main` 브랜치를 푸시합니다.
4. GitHub Actions의 `CI` 작업이 통과하는지 확인합니다.

`node_modules`, `.next`, `.vercel`, 환경변수와 빌드 결과물은 저장소에 포함되지 않습니다.

## 2. Vercel 연결

1. Vercel 대시보드에서 **Add New → Project**를 선택합니다.
2. 위 GitHub 저장소를 가져옵니다.
3. Framework Preset은 **Next.js**, Root Directory는 저장소 루트로 둡니다.
4. Install Command는 `pnpm install --frozen-lockfile`, Build Command는 `pnpm build`입니다.
5. 환경변수 `NEXT_PUBLIC_SITE_URL`에 Vercel 프로덕션 주소 또는 커스텀 도메인을 입력합니다.
6. Deploy를 실행합니다.

GitHub의 기능 브랜치와 Pull Request는 Vercel Preview Deployment로, `main` 브랜치는 Production Deployment로 연결하는 방식을 권장합니다.

## 3. 환경변수

Vercel Project Settings → Environment Variables에서 관리합니다. 실제 값과 API 키를 GitHub에 커밋하지 않습니다.

- `NEXT_PUBLIC_SITE_URL`: canonical, Open Graph, sitemap, RSS에 사용할 실제 주소
- `FORM_API_URL`: 폼 백엔드 연결 주소
- `FORM_API_KEY`: 폼 백엔드 비밀키. 브라우저 코드에 직접 노출하지 않습니다.

## 4. 배포 전 확인

```bash
pnpm install --frozen-lockfile
pnpm check
```

폼 백엔드가 연결되기 전에는 신청 정보가 저장되지 않습니다. 실제 공개 전 연락처, 사업자정보, 인물사진, 매출 증빙자료를 교체해야 합니다.
