import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  Radio,
  ShoppingBag,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { TikTokShopReadiness } from "@/components/tiktok-shop-readiness";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  contentHubTopics,
  getSource,
  koreaGuideFaqs,
  koreaGuideSources,
  koreaGuideStatus,
  koreaStatusCards,
  participantModels,
  policyItems,
  roadmap,
  salesFunnel,
  shopFeatures,
  shopJourney,
  shoppingComparison,
  statusLabels,
} from "@/lib/tiktok-shop-korea-data";
import { posts, site } from "@/lib/site-data";

const title = "틱톡샵 한국 가이드 | 국내 현황·입점 준비·라이브커머스";
const description =
  "틱톡샵의 구조와 한국 공식 진행 현황, 브랜드·셀러·크리에이터가 지금 준비할 체크리스트를 공식 출처와 함께 확인하세요.";
const canonical = `${site.url}/tiktok-shop-korea`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "틱톡샵 한국",
    "틱톡샵 입점",
    "틱톡샵 셀러",
    "틱톡샵 수수료",
    "틱톡샵 라이브",
    "틱톡샵 크리에이터",
    "틱톡샵 교육",
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonical,
    locale: "ko_KR",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "틱톡샵 한국 가이드" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function TikTokShopKoreaPage() {
  const publishedPostSlugs = new Set(posts.map((post) => post.slug));
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: site.url },
      { "@type": "ListItem", position: 2, name: "틱톡샵 한국 가이드", item: canonical },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified: koreaGuideStatus.lastUpdatedIso,
    inLanguage: "ko-KR",
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: koreaGuideFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_28%,rgba(37,244,238,.13),transparent_28%),radial-gradient(circle_at_72%_82%,rgba(254,44,85,.17),transparent_34%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-12 md:py-14 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:px-10 lg:py-16">
          <div className="min-w-0">
            <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#25f4ee]/30 bg-[#25f4ee]/6 px-3 text-xs font-black tracking-[.12em] text-[#70fffb]">
              <Radio className="size-3.5" aria-hidden="true" /> TIKTOK SHOP KOREA GUIDE
            </p>
            <h1 className="page-title mt-7 max-w-[800px]">
              <span className="block break-keep">틱톡샵 한국,</span>
              <span className="block break-keep">무엇이 달라지고 무엇을 준비해야 할까</span>
            </h1>
            <p className="mt-6 max-w-[720px] break-keep text-lg leading-8 text-white/58">
              틱톡샵의 구조부터 국내 진행 현황, 브랜드·셀러·크리에이터의 준비 전략까지 한 페이지에서
              확인하세요.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/free-class" className="cta-primary">
                무료특강 신청하기 <ArrowRight className="size-4" />
              </Link>
              <Link href="/seller-academy" className="cta-secondary">
                셀러 아카데미 사전등록
              </Link>
              <Link href="#readiness-check" className="cta-secondary">
                우리 브랜드 준비 수준 진단하기
              </Link>
            </div>
            <a
              href="#official-sources"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#25f4ee]"
            >
              공식 출처 확인 <ExternalLink className="size-4" />
            </a>
          </div>
          <HeroStatusVisual />
        </div>
      </section>

      <PageSection eyebrow="VERIFIED STATUS" title="틱톡샵 한국 현황, 핵심만 먼저 확인하세요">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {koreaStatusCards.map((item) => {
            const source = getSource(item.sourceId);
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
              >
                <StatusBadge status={item.status} />
                <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                <p className="mt-3 break-keep text-sm leading-6 text-white/50">{item.summary}</p>
                {source ? <SourceLink source={source} /> : null}
              </article>
            );
          })}
        </div>
        <p className="mt-6 rounded-2xl border border-[#fe2c55]/25 bg-[#fe2c55]/7 p-5 text-sm leading-6 text-white/58">
          <CircleAlert className="mr-2 inline size-4 text-[#fe6d8e]" />
          현재 공개 자료를 바탕으로 한 상태입니다. 한국 로컬 서비스 출시·정책이 공식 발표되면
          데이터와 확인일을 함께 갱신해야 합니다.
        </p>
      </PageSection>

      <PageSection
        eyebrow="DISCOVERY COMMERCE"
        title="틱톡샵은 영상 안에서 발견부터 구매까지 연결합니다"
        intro="콘텐츠가 관심을 만들고, 상품 정보와 LIVE가 구매 판단을 돕는 발견형 커머스 구조입니다."
        dark
      >
        <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {shopJourney.map((step, index) => (
            <li
              key={step}
              className="relative rounded-2xl border border-white/10 bg-white/[.035] p-5 text-center"
            >
              <span
                className={`mx-auto grid size-11 place-items-center rounded-full ${index % 2 ? "bg-[#25f4ee]/9 text-[#25f4ee]" : "bg-[#fe2c55]/10 text-[#fe2c55]"}`}
              >
                {index + 1}
              </span>
              <strong className="mt-4 block break-keep text-sm">{step}</strong>
              {index < shopJourney.length - 1 ? (
                <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden size-5 text-white/25 xl:block" />
              ) : null}
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shopFeatures.map(([feature, text]) => (
            <article
              key={feature}
              className="rounded-2xl border border-white/10 bg-white/[.035] p-6"
            >
              <h3 className="font-black text-[#25f4ee]">{feature}</h3>
              <p className="mt-3 break-keep text-sm leading-6 text-white/48">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-white/40">
          기능별 제공 여부와 자격은 국가마다 다를 수 있습니다. 위 설명은 일반적인 구조이며 한국
          제공을 의미하지 않습니다.
        </p>
      </PageSection>

      <PageSection
        eyebrow="COMPARISON"
        title="검색해서 사는 쇼핑에서 발견하고 사는 쇼핑으로"
        intro="각 방식은 서로 대체 관계라기보다 상품과 고객 여정에 따라 조합할 수 있는 판매 구조입니다."
      >
        <div
          className="overflow-x-auto rounded-2xl border border-white/10"
          tabIndex={0}
          aria-label="쇼핑 방식 비교표, 모바일에서는 가로로 스크롤할 수 있습니다"
        >
          <table className="min-w-[860px] w-full border-collapse text-left text-sm">
            <thead className="bg-white/[.055]">
              <tr>
                <th className="p-5">항목</th>
                {["기존 오픈마켓", "SNS 공동구매", "라이브커머스", "틱톡샵"].map((heading) => (
                  <th key={heading} className="p-5">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shoppingComparison.map((row) => (
                <tr key={row[0]} className="border-t border-white/8">
                  <th className="p-5 font-black text-[#25f4ee]">{row[0]}</th>
                  {row.slice(1).map((cell, index) => (
                    <td key={`${row[0]}-${index}`} className="p-5 text-white/52">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        eyebrow="PARTICIPATION MODELS"
        title="누가, 어떤 방식으로 참여할 수 있을까요?"
        dark
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {participantModels.map((model, index) => (
            <article
              key={model.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[.035] p-6"
            >
              <span
                className={`grid size-12 place-items-center rounded-xl ${index % 2 ? "bg-[#25f4ee]/9 text-[#25f4ee]" : "bg-[#fe2c55]/10 text-[#fe2c55]"}`}
              >
                {index === 0 ? (
                  <Store />
                ) : index === 1 ? (
                  <ShoppingBag />
                ) : index === 2 ? (
                  <UserRound />
                ) : (
                  <UsersRound />
                )}
              </span>
              <h3 className="mt-5 text-xl font-black">{model.title}</h3>
              <ul className="mt-5 flex-1 space-y-3">
                {model.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/52">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#25f4ee]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={model.href} className="cta-secondary mt-7">
                {model.cta}
              </Link>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="SALES SYSTEM"
        title="상품만 등록한다고 팔리는 구조는 아닙니다"
        intro="판매는 상품·콘텐츠·크리에이터·LIVE·운영 데이터가 반복해서 연결될 때 시스템이 됩니다."
      >
        <ol className="grid gap-4 lg:grid-cols-7">
          {salesFunnel.map((stage, index) => (
            <li key={stage.title} className="rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <span className="text-xs font-black text-[#fe2c55]">STEP {index + 1}</span>
              <h3 className="mt-3 min-h-12 font-black leading-6">{stage.title}</h3>
              <StageDetail label="해야 할 일" text={stage.task} />
              <StageDetail label="콘텐츠" text={stage.content} />
              <StageDetail label="확인 지표" text={stage.metric} />
              <StageDetail label="흔한 실패" text={stage.failure} warning />
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        id="readiness-check"
        eyebrow="LOCAL READINESS CHECK"
        title="출시 여부만 기다리지 말고, 지금 준비할 수 있습니다"
        intro="개인정보 없이 이 브라우저에만 체크 상태를 저장합니다. 준비 항목을 점검하고 다음 실행을 정리해보세요."
        dark
      >
        <TikTokShopReadiness />
      </PageSection>

      <PageSection
        eyebrow="KOREA POLICY CHECK"
        title="입점부터 정산까지 확인해야 할 항목"
        intro="해외 정책을 한국 기준으로 복사하지 않고, 공식 확인 상태·미확정 내용·준비 항목·출처를 함께 표시합니다."
      >
        <Accordion className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
          {policyItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-white/10 px-5 sm:px-7">
              <AccordionTrigger className="min-h-16 py-5 hover:no-underline">
                <span className="flex flex-wrap items-center gap-3 text-left">
                  <StatusBadge status={item.koreaStatus} />
                  <strong>{item.title}</strong>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-7">
                <p className="break-keep text-sm leading-6 text-white/55">{item.summary}</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <PolicyList
                    title="현재 확인된 내용"
                    items={
                      item.confirmedFacts.length
                        ? item.confirmedFacts
                        : ["한국 공식 정책 확인 후 업데이트 예정"]
                    }
                  />
                  <PolicyList title="아직 미확정" items={item.unconfirmedItems} warning />
                  <PolicyList title="사업자가 준비할 사항" items={item.preparationSteps} />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/38">
                  <span>확인일 {item.updatedAt.replaceAll("-", ".")}</span>
                  {item.sourceIds.map((sourceId) => {
                    const source = getSource(sourceId);
                    return source ? (
                      <a
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 font-bold text-[#25f4ee]"
                      >
                        {source.publisher} <ExternalLink className="size-3" />
                      </a>
                    ) : null;
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>

      <PageSection
        eyebrow="30 DAY ROADMAP"
        title="한국 사업자를 위한 틱톡커머스 30일 준비 로드맵"
        intro="플랫폼 출시를 가정한 일정이 아니라, 지금 실행할 수 있는 상품·콘텐츠·운영 준비 순서입니다."
        dark
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roadmap.map(([week, itemTitle, items], index) => (
            <article key={week} className="rounded-2xl border border-white/10 bg-white/[.035] p-6">
              <span className="text-xs font-black text-[#25f4ee]">{week}</span>
              <h3 className="mt-3 text-xl font-black">{itemTitle}</h3>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/52">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#25f4ee]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 h-1 rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#25f4ee] to-[#fe2c55]"
                  style={{ width: `${(index + 1) * 25}%` }}
                />
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-white/40">
          체크리스트 PDF는 아직 연결되지 않았습니다. 실제 파일이 준비되기 전에는 다운로드 버튼을
          제공하지 않습니다.
        </p>
      </PageSection>

      <PageSection eyebrow="CONTENT HUB" title="틱톡샵을 더 깊이 알아보세요">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contentHubTopics.map((topic) => {
            const active = topic.slug && publishedPostSlugs.has(topic.slug);
            return active ? (
              <Link
                key={topic.title}
                href={`/insights/${topic.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[.03] p-6 transition hover:border-[#25f4ee]/35"
              >
                <span className="text-[10px] font-black text-[#25f4ee]">PUBLISHED</span>
                <h3 className="mt-4 break-keep font-black leading-6">{topic.title}</h3>
                <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/52 group-hover:text-white">
                  읽어보기 <ArrowRight className="size-4" />
                </span>
              </Link>
            ) : (
              <article
                key={topic.title}
                className="rounded-2xl border border-dashed border-white/12 bg-white/[.02] p-6"
              >
                <span className="text-[10px] font-black text-white/25">PREPARING</span>
                <h3 className="mt-4 break-keep font-black leading-6 text-white/62">
                  {topic.title}
                </h3>
                <p className="mt-6 text-xs text-white/30">콘텐츠 준비 중</p>
              </article>
            );
          })}
        </div>
        <Link href="/insights" className="cta-secondary mt-8">
          틱톡샵 전체 콘텐츠 보기 <ArrowRight className="size-4" />
        </Link>
      </PageSection>

      <section className="border-y border-white/8 bg-[#090a0d]">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <ConversionCard
            eyebrow="FREE LIVE CLASS"
            title="정보만 보는 것보다, 내 사업에 적용해보세요"
            text="무료특강에서 틱톡커머스 준비 순서를 이해하고, 셀러 아카데미에서 직접 실행할 결과물을 만듭니다."
            href="/free-class"
            cta="틱톡커머스 무료특강 신청"
            secondaryHref="/seller-academy"
            secondaryCta="셀러 아카데미 보기"
          />
          <ConversionCard
            eyebrow="CONSULTATION"
            title="우리 상품은 틱톡샵에 적합할까요?"
            text="상품 진단, 틱톡샵 준비, 라이브커머스, 크리에이터 협업, 콘텐츠 운영과 교육 문의를 함께 점검합니다."
            href="/contact?type=tiktok-shop"
            cta="브랜드·셀러 상담 신청"
            secondaryHref="/live-agency"
            secondaryCta="라이브 에이전시 보기"
          />
        </div>
      </section>

      <PageSection eyebrow="FAQ" title="틱톡샵 한국, 자주 묻는 질문">
        <Accordion className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
          {koreaGuideFaqs.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`faq-${index}`}
              className="border-white/10 px-5 sm:px-7"
            >
              <AccordionTrigger className="min-h-16 py-5 text-left text-base font-black hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8 text-sm leading-7 text-white/52">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>

      <section id="official-sources" className="border-t border-white/8 bg-[#090a0d]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
          <div className="section-heading">
            <p>PRIMARY SOURCES</p>
            <h2>공식 확인 자료와 확인일</h2>
          </div>
          <div className="mt-8 grid gap-3">
            {koreaGuideSources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[.03] px-5 transition hover:border-[#25f4ee]/30"
              >
                <span>
                  <strong className="block break-keep text-sm">{source.title}</strong>
                  <small className="mt-1 block text-white/36">
                    {source.publisher}
                    {source.publishedAt
                      ? ` · 발표 ${source.publishedAt.replaceAll("-", ".")}`
                      : ""}{" "}
                    · 확인 {source.verifiedAt.replaceAll("-", ".")}
                  </small>
                </span>
                <ExternalLink className="size-4 shrink-0 text-[#25f4ee]" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function HeroStatusVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[620px]"
      role="img"
      aria-label="숏폼 상품 태그, LIVE, 장바구니와 판매자 확인 상태를 표현한 커머스 대시보드"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-[#fe2c55]/8 blur-3xl" />
      <div className="rounded-[28px] border border-white/12 bg-[#101216]/94 p-4 shadow-2xl">
        <div className="grid gap-3 sm:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[22px] border border-white/10 bg-black/28 p-4">
            <div className="flex items-center justify-between">
              <span className="rounded bg-[#fe2c55] px-2 py-1 text-[9px] font-black">SHORTS</span>
              <span className="size-2 rounded-full bg-[#25f4ee]" />
            </div>
            <div className="mt-4 min-h-64 rounded-2xl bg-[radial-gradient(circle_at_50%_30%,rgba(37,244,238,.18),transparent_22%),linear-gradient(160deg,#20242c,#0a0b0d)] p-4">
              <div className="flex min-h-56 flex-col justify-end">
                <span className="w-fit rounded-full border border-[#25f4ee]/25 bg-black/45 px-3 py-1 text-[9px] font-black text-[#25f4ee]">
                  PRODUCT TAG
                </span>
                <strong className="mt-3 text-lg">
                  발견에서
                  <br />
                  상품 관심까지
                </strong>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
              <div className="flex items-center justify-between text-xs text-white/45">
                <span className="flex gap-2">
                  <Radio className="size-4 text-[#fe2c55]" /> LIVE
                </span>
                <ShoppingBag className="size-4 text-[#25f4ee]" />
              </div>
              <div className="mt-5 grid gap-2">
                {["크리에이터 추천", "상품 상세 확인", "장바구니 연결", "주문 흐름 확인"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg bg-black/22 px-3 py-2 text-[10px] text-white/50"
                    >
                      <span
                        className={`size-1.5 rounded-full ${index === 3 ? "bg-[#fe2c55]" : "bg-[#25f4ee]"}`}
                      />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-4">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <BarChart3 className="size-4 text-[#25f4ee]" /> 판매자 준비 대시보드
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["로컬 출시", "미확정"],
                  ["크로스보더", "공식 확인"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-black/20 p-3">
                    <span className="text-[9px] text-white/34">{label}</span>
                    <strong className="mt-1 block text-xs">{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageSection({
  id,
  eyebrow,
  title: sectionTitle,
  intro,
  dark,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${dark ? "border-y border-white/8 bg-[#090a0d]" : ""}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="section-heading">
          <p>{eyebrow}</p>
          <h2 className="max-w-4xl">{sectionTitle}</h2>
        </div>
        {intro ? (
          <p className="mt-5 max-w-3xl break-keep leading-7 text-white/50">{intro}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: keyof typeof statusLabels }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black ${status === "official" ? "border-[#25f4ee]/25 bg-[#25f4ee]/7 text-[#25f4ee]" : status === "unconfirmed" ? "border-[#fe2c55]/28 bg-[#fe2c55]/8 text-[#ff8ba5]" : "border-white/12 bg-white/5 text-white/50"}`}
    >
      {statusLabels[status]}
    </span>
  );
}

function SourceLink({ source }: { source: NonNullable<ReturnType<typeof getSource>> }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-[#25f4ee]"
    >
      {source.publisher} · {source.verifiedAt.replaceAll("-", ".")} 확인{" "}
      <ExternalLink className="size-3.5" />
    </a>
  );
}

function StageDetail({ label, text, warning }: { label: string; text: string; warning?: boolean }) {
  return (
    <div className="mt-4">
      <span className={`text-[10px] font-black ${warning ? "text-[#fe6d8e]" : "text-[#25f4ee]"}`}>
        {label}
      </span>
      <p className="mt-1 break-keep text-xs leading-5 text-white/45">{text}</p>
    </div>
  );
}

function PolicyList({
  title: listTitle,
  items,
  warning,
}: {
  title: string;
  items: string[];
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/16 p-4">
      <h4 className={`text-xs font-black ${warning ? "text-[#fe6d8e]" : "text-[#25f4ee]"}`}>
        {listTitle}
      </h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-5 text-white/48">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-current" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConversionCard({
  eyebrow,
  title: cardTitle,
  text,
  href,
  cta,
  secondaryHref,
  secondaryCta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  secondaryHref?: string;
  secondaryCta?: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(37,244,238,.08),rgba(254,44,85,.08))] p-7 sm:p-9">
      <span className="text-xs font-black tracking-[.14em] text-[#25f4ee]">{eyebrow}</span>
      <h2 className="panel-title mt-4 break-keep">{cardTitle}</h2>
      <p className="mt-5 break-keep text-sm leading-7 text-white/52">{text}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href={href} className="cta-primary">
          {cta} <ArrowRight className="size-4" />
        </Link>
        {secondaryHref && secondaryCta ? (
          <Link href={secondaryHref} className="cta-secondary">
            {secondaryCta}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
