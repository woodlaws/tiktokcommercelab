import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  MessageCircleMore,
  PackageCheck,
  Radio,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LiveAgencyForm } from "@/components/live-agency-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  agencyCases,
  agencyDifferences,
  agencyExperts,
  agencyFaqs,
  agencyFlow,
  agencyHeroStats,
  agencyPackages,
  agencyProblems,
  agencyProcess,
  agencyServices,
} from "@/lib/live-agency-data";

const title = "틱톡 라이브커머스 대행·운영 | 틱톡커머스랩";
const description =
  "상품 진단부터 방송 기획, 쇼호스트·크리에이터 섭외, 사전 모객, 라이브 운영과 성과 분석까지 연결하는 틱톡 라이브커머스 전문 서비스입니다.";
const canonical = "https://tiktokcommercelab.vercel.app/live-agency";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "틱톡 라이브커머스",
    "라이브커머스 대행",
    "틱톡 라이브 대행",
    "라이브 방송대행",
    "쇼호스트 섭외",
    "틱톡 마케팅 대행",
    "틱톡샵 운영",
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonical,
    locale: "ko_KR",
    siteName: "틱톡커머스랩",
    images: [{ url: "/og-live-agency.png", width: 1200, height: 630, alt: "라이브 한 번이 아닌 반복 판매 시스템" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-live-agency.png"] },
};

export default function LiveAgencyPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "틱톡 라이브커머스 대행·운영",
    description,
    url: canonical,
    serviceType: "틱톡 라이브커머스 기획 및 운영",
    provider: {
      "@type": "Organization",
      name: "틱톡커머스랩",
      url: "https://tiktokcommercelab.vercel.app/",
    },
    areaServed: { "@type": "Country", name: "대한민국" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://tiktokcommercelab.vercel.app/",
      },
      { "@type": "ListItem", position: 2, name: "라이브 에이전시", item: canonical },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: agencyFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(37,244,238,.12),transparent_28%),radial-gradient(circle_at_72%_78%,rgba(254,44,85,.14),transparent_32%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid min-h-[calc(100svh-112px)] max-w-[1440px] items-start gap-12 px-5 py-12 md:py-14 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-14 lg:px-10 lg:py-16 xl:py-20">
          <div className="min-w-0">
            <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#25f4ee]/30 bg-[#25f4ee]/6 px-3 text-xs font-black tracking-[.12em] text-[#70fffb]">
              <Radio className="size-3.5" aria-hidden="true" /> TIKTOK LIVE COMMERCE AGENCY
            </p>
            <h1 className="live-agency-title mt-8">
              <span className="block">라이브 한 번이 아니라</span>
              <span className="block">반복되는 판매 시스템을</span>
              <span className="block">만듭니다</span>
            </h1>
            <div
              className="mt-6 h-1.5 w-56 rounded-full bg-gradient-to-r from-[#25f4ee] via-white to-[#fe2c55]"
              aria-hidden="true"
            />
            <p className="mt-8 max-w-[700px] break-keep text-base leading-[1.7] text-white/62">
              상품 분석부터 방송 기획, 쇼호스트·크리에이터 섭외, 사전 모객, 라이브 운영과 성과
              분석까지 하나의 매출 흐름으로 연결합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#consultation-form" className="cta-primary">
                우리 상품 라이브 가능성 진단받기{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="#services" className="cta-secondary">
                서비스 구성 살펴보기 <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/tiktok-shop-korea" className="cta-secondary">
                틱톡샵 한국 가이드
              </Link>
            </div>
            <div className="mt-8 grid max-w-[680px] gap-3 sm:grid-cols-3">
              {agencyHeroStats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-white/9 bg-white/[.035] p-4">
                  <Icon className="size-4 text-[#25f4ee]" aria-hidden="true" />
                  <span className="mt-3 block text-[11px] text-white/40">{label}</span>
                  <strong className="mt-1 block text-sm">{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-[650px]"
            role="img"
            aria-label="라이브 방송의 시청자, 주문, 상품과 성과 데이터를 보여주는 운영 대시보드 예시"
          >
            <div
              className="absolute -inset-10 -z-10 rounded-full bg-[#fe2c55]/8 blur-3xl"
              aria-hidden="true"
            />
            <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[#101216]/94 p-4 shadow-2xl">
              <div className="relative min-h-[430px] overflow-hidden rounded-[20px] border border-white/8 bg-[linear-gradient(135deg,#191d24,#090a0c_58%,#151018)] p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#fe2c55] px-2 py-1 text-[11px] font-black">
                    LIVE
                  </span>
                  <span className="rounded-full bg-black/55 px-3 py-1 text-xs text-white/70">
                    ● 시청 데이터
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-[1.2fr_.8fr]">
                  <div className="relative min-h-56 rounded-2xl border border-white/8 bg-black/28 p-4">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <UserRound className="size-4 text-[#25f4ee]" aria-hidden="true" /> 라이브 진행
                      화면
                    </div>
                    <div className="absolute inset-x-4 bottom-4 space-y-2">
                      {[
                        "상품 특징을 다시 보여주세요",
                        "구성 옵션이 궁금해요",
                        "배송 일정을 확인했어요",
                      ].map((text, index) => (
                        <p
                          key={text}
                          className="rounded-full bg-white/[.055] px-3 py-2 text-[11px] text-white/65"
                          style={{ opacity: 1 - index * 0.15 }}
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-4">
                    <p className="text-[11px] text-white/42">성과 흐름</p>
                    <svg viewBox="0 0 180 70" className="mt-5 w-full" aria-hidden="true">
                      <path
                        d="M2 61 24 48 45 52 66 32 88 39 110 18 132 28 156 8 178 15"
                        fill="none"
                        stroke="#fe2c55"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="mt-6 rounded-xl border border-white/8 bg-black/20 p-3">
                      <PackageCheck className="size-5 text-[#25f4ee]" aria-hidden="true" />
                      <strong className="mt-2 block text-sm">상품 카드 연결</strong>
                      <span className="mt-1 block text-[11px] text-white/38">구매 동선 점검</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/8 bg-white/[.035] p-4">
                    <MessageCircleMore className="size-4 text-[#25f4ee]" aria-hidden="true" />
                    <span className="mt-2 block text-xs text-white/45">채팅 반응</span>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-white/[.035] p-4">
                    <ShoppingBag className="size-4 text-[#fe2c55]" aria-hidden="true" />
                    <span className="mt-2 block text-xs text-white/45">주문 흐름</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageSection
        eyebrow="WHY IT STOPS"
        title="방송은 켰는데, 왜 매출은 남지 않을까요?"
        intro="실행이 분리되면 방송은 일회성 이벤트로 끝납니다."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agencyProblems.map((problem, index) => (
            <article
              key={problem}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
            >
              <span className="text-xs font-black text-[#fe2c55]">0{index + 1}</span>
              <p className="mt-4 break-keep text-base font-bold leading-7">{problem}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-[#fe2c55]/25 bg-[#fe2c55]/7 p-6 text-center text-lg font-black">
          문제는 방송 기술이 아니라 방송 전후의 판매 구조입니다.
        </p>
      </PageSection>

      <PageSection
        eyebrow="CONNECTED FLOW"
        title="라이브 전·중·후를 하나의 판매 시스템으로 연결합니다"
        dark
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {agencyFlow.map(({ icon: Icon, title: itemTitle, text }, index) => (
            <article
              key={itemTitle}
              className="relative rounded-2xl border border-white/10 bg-white/[.035] p-5"
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#25f4ee]/9 text-[#25f4ee]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="mt-5 block text-[11px] font-black text-white/30">
                STEP {index + 1}
              </span>
              <h3 className="mt-2 font-black leading-snug">{itemTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
              {index < agencyFlow.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 z-10 hidden size-5 text-[#25f4ee]/40 xl:block"
                  aria-hidden="true"
                />
              )}
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="services"
        eyebrow="SERVICES"
        title="필요한 범위만 선택하거나 전체 운영을 맡길 수 있습니다"
        intro="상품과 내부 역량에 맞춰 진단, 기획, 운영과 분석 범위를 조합합니다."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agencyServices.map(({ icon: Icon, title: itemTitle, items }) => (
            <article key={itemTitle} className="card-premium">
              <span className="grid size-12 place-items-center rounded-xl bg-[#25f4ee]/8 text-[#25f4ee]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-black">{itemTitle}</h3>
              <ul className="mt-5 grid gap-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/55">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#25f4ee]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="WHY US" title="방송대행이 아니라 커머스 전체를 봅니다" dark>
        <div className="grid gap-5 md:grid-cols-2">
          {agencyDifferences.map(({ icon: Icon, title: itemTitle, text }) => (
            <article
              key={itemTitle}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/[.035] p-6"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#fe2c55]/10 text-[#fe2c55]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-black">{itemTitle}</h3>
                <p className="mt-3 break-keep text-sm leading-6 text-white/50">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="PACKAGES"
        title="브랜드 상황에 맞춰 시작할 수 있습니다"
        intro="모든 패키지는 상품과 실행 범위를 확인한 뒤 견적을 제안합니다."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {agencyPackages.map((item) => (
            <article
              key={item.title}
              className={`relative flex flex-col rounded-2xl border p-6 ${item.featured ? "border-[#fe2c55]/55 bg-[linear-gradient(160deg,rgba(254,44,85,.16),rgba(255,255,255,.025))] shadow-[0_0_45px_rgba(254,44,85,.12)]" : "border-white/10 bg-white/[.03]"}`}
            >
              {item.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-[#fe2c55] px-3 py-1 text-[10px] font-black">
                  추천
                </span>
              )}
              <h3 className="pr-12 text-xl font-black">{item.title}</h3>
              <p className="mt-2 text-sm font-bold text-[#25f4ee]">상담 후 견적</p>
              <p className="mt-5 min-h-16 break-keep text-sm leading-6 text-white/48">
                {item.audience}
              </p>
              <ul className="mt-5 flex-1 space-y-3">
                {item.items.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm text-white/58">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#25f4ee]"
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
              <Link
                href="#consultation-form"
                className={item.featured ? "cta-primary mt-7" : "cta-secondary mt-7"}
              >
                {item.cta}
              </Link>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="PROCESS" title="상담부터 다음 방송까지 이렇게 진행됩니다" dark>
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {agencyProcess.map(([step, text], index) => (
            <li key={step} className="rounded-2xl border border-white/10 bg-white/[.035] p-5">
              <span className="text-xs font-black text-[#25f4ee]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-black">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        eyebrow="CASES"
        title="결과는 실제 사례로 증명하겠습니다"
        intro="확인 가능한 자료만 공개하며, 검증되지 않은 고객명이나 성과 수치는 사용하지 않습니다."
      >
        {agencyCases.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {agencyCases.map((item) => (
              <article key={`${item.industry}-${item.challenge}`} className="card-premium">
                <span className="text-xs font-black text-[#25f4ee]">{item.industry}</span>
                <h3 className="mt-4 text-xl font-black">{item.challenge}</h3>
                <dl className="mt-5 space-y-3 text-sm text-white/55">
                  <div>
                    <dt className="font-bold text-white/80">진행 범위</dt>
                    <dd className="mt-1">{item.scope}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-white/80">핵심 성과</dt>
                    <dd className="mt-1">{item.outcome}</dd>
                  </div>
                </dl>
                {item.href && (
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 font-bold text-[#25f4ee]"
                  >
                    사례 상세 <ArrowRight className="size-4" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/18 bg-white/[.025] p-8 text-center sm:p-12">
            <CircleAlert className="mx-auto size-8 text-[#25f4ee]" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-black">성공사례 업데이트 예정</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/48">
              업종, 브랜드 과제, 진행 범위, 확인 가능한 핵심 성과와 상세 링크가 준비되는 순서대로
              등록합니다.
            </p>
          </div>
        )}
        <div className="mt-7 text-center">
          <Link href="/cases" className="cta-secondary">
            전체 성공사례 보기 <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </PageSection>

      <PageSection eyebrow="OPERATORS" title="라이브 현장과 마케팅 시스템이 만났습니다" dark>
        <div className="grid gap-5 md:grid-cols-2">
          {agencyExperts.map((expert, index) => (
            <article
              key={expert.name}
              className="grid gap-6 rounded-2xl border border-white/10 bg-white/[.035] p-6 sm:grid-cols-[120px_1fr]"
            >
              <div className="grid min-h-32 place-items-center rounded-xl border border-dashed border-white/16 bg-black/25">
                <UserRound
                  className={`size-10 ${index ? "text-[#25f4ee]" : "text-[#fe2c55]"}`}
                  aria-hidden="true"
                />
                <span className="sr-only">운영진 사진 자료 입력 예정</span>
              </div>
              <div>
                <h3 className="text-2xl font-black">{expert.name}</h3>
                <ul className="mt-5 space-y-3">
                  {expert.roles.map((role) => (
                    <li key={role} className="flex gap-2 text-sm text-white/55">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#25f4ee]"
                        aria-hidden="true"
                      />
                      {role}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-white/30">사진·세부 경력·SNS 링크 자료 입력 예정</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection eyebrow="FAQ" title="라이브커머스 운영, 먼저 확인해보세요">
        <Accordion className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
          {agencyFaqs.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`faq-${index}`}
              className="border-white/10 px-5 sm:px-7"
            >
              <AccordionTrigger className="min-h-16 py-5 text-base font-black hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8 text-sm leading-7 text-white/52">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageSection>

      <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#fe2c55]/40 bg-[radial-gradient(circle_at_15%_50%,rgba(37,244,238,.14),transparent_30%),radial-gradient(circle_at_85%_45%,rgba(254,44,85,.22),transparent_36%),#0b0c0f] p-8 text-center sm:p-14">
          <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">
              START WITH A DIAGNOSIS
            </p>
            <h2 className="cta-title mt-4">
              우리 상품도 라이브로 팔릴 수 있을까요?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl break-keep leading-7 text-white/55">
              상품과 현재 운영 상황을 알려주시면 적합한 방송 방식과 시작 범위를 함께 검토해드립니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#consultation-form" className="cta-primary">
                무료 진단 상담 신청 <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="#consultation-form" className="cta-secondary">
                서비스 문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LiveAgencyForm />
    </SiteShell>
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
        {intro && <p className="mt-5 max-w-2xl break-keep leading-7 text-white/50">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
