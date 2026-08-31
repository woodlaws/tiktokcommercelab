import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clapperboard,
  FileCheck2,
  Radio,
  ShoppingBag,
  TicketCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { FreeClassForm } from "@/components/free-class-form";
import {
  FreeClassStickyCta,
  InstructorChannelLink,
  TrackedAnchor,
} from "@/components/free-class-actions";
import { SiteShell } from "@/components/site-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  benefitIcon,
  commerceFunnel,
  freeClassAudiences,
  freeClassConfig,
  freeClassCurriculum,
  freeClassFaqs,
  freeClassInstructors,
  freeClassProblems,
  statusLabels,
} from "@/lib/free-class-data";
import { site } from "@/lib/site-data";

const title = "틱톡샵·라이브커머스 무료특강 | 틱톡커머스랩";
const description =
  "틱톡 숏폼부터 라이브 방송, 틱톡샵, 상품 판매와 크리에이터 협업까지 콘텐츠를 매출로 연결하는 틱톡커머스 무료특강입니다.";
const canonical = `${site.url}/free-class`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "틱톡 무료특강",
    "틱톡샵 교육",
    "틱톡 라이브커머스",
    "라이브커머스 교육",
    "틱톡 셀러 교육",
    "틱톡 마케팅 강의",
    "틱톡샵 한국",
  ],
  alternates: { canonical },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonical,
    locale: "ko_KR",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "틱톡커머스랩 무료특강" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function FreeClassPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: site.url },
      { "@type": "ListItem", position: 2, name: "무료특강", item: canonical },
    ],
  };
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: freeClassConfig.title,
    description,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    instructor: freeClassConfig.instructorNames.map((name) => ({ "@type": "Person", name })),
    isAccessibleForFree: true,
    url: canonical,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: freeClassFaqs.map((item) => ({
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_30%,rgba(37,244,238,.12),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(254,44,85,.16),transparent_34%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:py-14 lg:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] lg:gap-14 lg:px-10 lg:py-16">
          <div className="min-w-0">
            <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#25f4ee]/30 bg-[#25f4ee]/6 px-3 text-xs font-black tracking-[.13em] text-[#70fffb]">
              <Radio className="size-3.5" aria-hidden="true" /> FREE LIVE CLASS
            </p>
            <h1 className="page-title mt-7 max-w-[760px]">
              <span className="block break-keep lg:whitespace-nowrap">틱톡샵 시대,</span>
              <span className="block break-keep lg:whitespace-nowrap">
                콘텐츠를 매출로 바꾸는 법
              </span>
            </h1>
            <p className="mt-6 max-w-[720px] break-keep text-lg font-extrabold leading-8 text-white/78">
              {freeClassConfig.title}
            </p>
            <p className="mt-3 max-w-[700px] break-keep text-sm font-bold leading-6 text-[#8ffefa]">
              {freeClassConfig.subtitle}
            </p>
            <p className="mt-4 max-w-[680px] break-keep leading-7 text-white/50">
              틱톡 숏폼, 라이브 방송, 상품 판매, 크리에이터 협업을 하나의 커머스 구조로 연결하는
              방법을 실제 현장 관점에서 알려드립니다.
            </p>
            <div className="mt-7 grid max-w-[720px] grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                [Radio, "진행 방식", freeClassConfig.format],
                [TicketCheck, "참가비", freeClassConfig.price],
                [CalendarDays, "일정", freeClassConfig.date ?? freeClassConfig.scheduleFallback],
                [UsersRound, "대상", "브랜드·셀러·마케터·크리에이터"],
              ].map(([Icon, label, value]) => {
                const ItemIcon = Icon as typeof Radio;
                return (
                  <div
                    key={label as string}
                    className="rounded-xl border border-white/10 bg-white/[.035] p-4"
                  >
                    <ItemIcon className="size-4 text-[#25f4ee]" aria-hidden="true" />
                    <span className="mt-3 block text-[10px] text-white/35">{label as string}</span>
                    <strong className="mt-1 block break-keep text-[11px] leading-4">
                      {value as string}
                    </strong>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedAnchor href="#free-class-form" className="cta-primary" label="hero_primary">
                무료특강 신청하기 <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedAnchor>
              <TrackedAnchor href="#curriculum" className="cta-secondary" label="hero_curriculum">
                특강 내용 먼저 보기
              </TrackedAnchor>
              <TrackedAnchor
                href="/seller-academy"
                className="cta-secondary"
                label="hero_seller_academy"
              >
                셀러 아카데미 보기
              </TrackedAnchor>
              <TrackedAnchor
                href="/tiktok-shop-korea"
                className="cta-secondary"
                label="hero_korea_guide"
              >
                틱톡샵 한국 가이드
              </TrackedAnchor>
            </div>
            <p className="mt-4 text-xs font-bold text-[#25f4ee]">
              {freeClassConfig.notice ?? statusLabels[freeClassConfig.status]}
            </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      <PageSection eyebrow="WHY SALES STOP" title="틱톡을 시작해도 매출로 이어지지 않는 이유">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {freeClassProblems.map((problem, index) => (
            <article
              key={problem}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
            >
              <span className="text-xs font-black text-[#fe2c55]">0{index + 1}</span>
              <p className="mt-4 break-keep font-bold leading-7">{problem}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-[#25f4ee]/24 bg-[#25f4ee]/6 p-6 text-center text-lg font-black">
          필요한 것은 영상 한 편이 아니라 콘텐츠에서 구매까지 이어지는 커머스 시스템입니다.
        </p>
      </PageSection>

      <PageSection
        id="curriculum"
        eyebrow="CURRICULUM"
        title="무료특강에서 이 6가지를 알려드립니다"
        dark
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {freeClassCurriculum.map(({ icon: Icon, title: itemTitle, items }, index) => (
            <article
              key={itemTitle}
              className="rounded-2xl border border-white/10 bg-white/[.035] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-[#25f4ee]/8 text-[#25f4ee]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-black text-white/25">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-black">{itemTitle}</h3>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-white/48">
                    <CheckCircle2
                      className="mt-1 size-4 shrink-0 text-[#25f4ee]"
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

      <PageSection eyebrow="WHO SHOULD JOIN" title="이런 분이라면 반드시 들어야 합니다">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {freeClassAudiences.map(({ icon: Icon, title: itemTitle, text }) => (
            <article
              key={itemTitle}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#fe2c55]/9 text-[#fe2c55]">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-black">{itemTitle}</h3>
                <p className="mt-2 break-keep text-sm leading-6 text-white/46">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="COMMERCE FUNNEL"
        title="틱톡커머스는 콘텐츠 하나로 끝나지 않습니다"
        intro="특강에서는 이 흐름에서 자신의 현재 위치와 가장 먼저 구축해야 할 단계를 찾게 됩니다."
        dark
      >
        <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {commerceFunnel.map(({ icon: Icon, title: itemTitle }, index) => (
            <li
              key={itemTitle}
              className="relative rounded-2xl border border-white/10 bg-white/[.035] p-5 text-center"
            >
              <span
                className={`mx-auto grid size-12 place-items-center rounded-full ${index % 2 ? "bg-[#25f4ee]/9 text-[#25f4ee]" : "bg-[#fe2c55]/10 text-[#fe2c55]"}`}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <strong className="mt-4 block break-keep text-sm">{itemTitle}</strong>
              {index < commerceFunnel.length - 1 ? (
                <ArrowRight
                  className="absolute -right-3 top-1/2 z-10 hidden size-5 text-white/25 xl:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection eyebrow="INSTRUCTORS" title="현장 경험과 마케팅 시스템을 함께 알려드립니다">
        <div className="grid gap-5 md:grid-cols-2">
          {freeClassInstructors.map((instructor) => (
            <article
              key={instructor.name}
              className="grid gap-6 rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:grid-cols-[120px_1fr]"
            >
              <div className="grid min-h-32 place-items-center rounded-2xl border border-dashed border-white/16 bg-[radial-gradient(circle,rgba(255,255,255,.07),transparent_65%),#090a0c]">
                <UserRound
                  className="size-10"
                  style={{ color: instructor.color }}
                  aria-hidden="true"
                />
                <span className="sr-only">강사 사진 교체 영역</span>
              </div>
              <div>
                <h3 className="text-2xl font-black">{instructor.name}</h3>
                <ul className="mt-4 space-y-2">
                  {instructor.roles.map((role) => (
                    <li key={role} className="flex gap-2 text-sm leading-6 text-white/48">
                      <CheckCircle2
                        className="mt-1 size-4 shrink-0"
                        style={{ color: instructor.color }}
                        aria-hidden="true"
                      />
                      {role}
                    </li>
                  ))}
                </ul>
                {instructor.channels.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {instructor.channels.map((channel) => (
                      <InstructorChannelLink key={channel.url} href={channel.url}>
                        {channel.label}
                      </InstructorChannelLink>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="APPLICATION BENEFITS"
        title="신청자에게 드리는 실행 자료"
        intro="자료는 신청자 대상 제공을 위해 준비하며, 실제 파일이 연결된 항목만 다운로드할 수 있도록 구성했습니다."
        dark
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {freeClassConfig.benefits.map((benefit, index) => {
            const BenefitIcon = benefitIcon;
            return (
              <article
                key={benefit.title}
                className="rounded-2xl border border-white/10 bg-white/[.035] p-6"
              >
                <BenefitIcon className="size-6 text-[#25f4ee]" aria-hidden="true" />
                <span className="mt-5 block text-xs font-black text-white/25">
                  RESOURCE {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 break-keep font-black leading-6">{benefit.title}</h3>
                {benefit.fileUrl ? (
                  <a
                    href={benefit.fileUrl}
                    className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-[#25f4ee]"
                  >
                    자료 받기 <ArrowRight className="ml-2 size-4" />
                  </a>
                ) : (
                  <p className="mt-4 text-xs leading-5 text-white/34">신청자 대상 제공 예정</p>
                )}
              </article>
            );
          })}
        </div>
      </PageSection>

      <FreeClassForm />

      <PageSection eyebrow="FAQ" title="무료특강 신청 전 확인하세요">
        <Accordion className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
          {freeClassFaqs.map((item, index) => (
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

      <section className="mx-auto max-w-[1200px] px-5 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#fe2c55]/40 bg-[radial-gradient(circle_at_15%_50%,rgba(37,244,238,.13),transparent_30%),radial-gradient(circle_at_85%_45%,rgba(254,44,85,.22),transparent_36%),#0b0c0f] p-8 text-center sm:p-12">
          <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">
              START BEFORE THE MARKET MOVES
            </p>
            <h2 className="cta-title mt-4">
              틱톡샵 시대를 구경할 것인가,
              <br />
              먼저 판매 구조를 만들 것인가
            </h2>
            <p className="mx-auto mt-5 max-w-2xl break-keep leading-7 text-white/52">
              무료특강에서 우리 상품과 역량을 틱톡 커머스에 연결하는 첫 단계를 확인하세요.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <TrackedAnchor href="#free-class-form" className="cta-primary" label="final_cta">
                무료특강 신청하기 <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedAnchor>
              <TrackedAnchor
                href="/seller-academy"
                className="cta-secondary"
                label="final_seller_academy"
              >
                실전 아카데미 알아보기
              </TrackedAnchor>
            </div>
          </div>
        </div>
      </section>
      <FreeClassStickyCta />
    </SiteShell>
  );
}

function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-[590px]"
      role="img"
      aria-label="숏폼 콘텐츠가 라이브 방송과 상품 구매로 연결되는 커머스 흐름 예시"
    >
      <div
        className="absolute -inset-10 -z-10 rounded-full bg-[#fe2c55]/8 blur-3xl"
        aria-hidden="true"
      />
      <div className="grid grid-cols-[.72fr_1fr] gap-3 rounded-[28px] border border-white/12 bg-[#101216]/94 p-4 shadow-2xl">
        <div className="rounded-[22px] border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between">
            <span className="rounded bg-[#fe2c55] px-2 py-1 text-[9px] font-black">SHORTS</span>
            <span className="size-2 rounded-full bg-[#25f4ee]" />
          </div>
          <div className="mt-4 min-h-64 rounded-2xl bg-[radial-gradient(circle_at_50%_35%,rgba(37,244,238,.2),transparent_22%),linear-gradient(160deg,#20242c,#0a0b0d)] p-4">
            <div className="flex min-h-56 flex-col justify-end">
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[9px] font-black tracking-[.12em] text-[#25f4ee]">
                CONTENT
              </span>
              <strong className="mt-3 break-keep text-lg leading-tight">
                콘텐츠에서
                <br />
                구매까지
              </strong>
              <div className="mt-4 flex items-center gap-2 text-[9px] text-white/35">
                <span>숏폼</span>
                <ArrowRight className="size-3" />
                <span>라이브</span>
                <ArrowRight className="size-3" />
                <span>구매</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-white/45">
                <Radio className="size-4 text-[#fe2c55]" /> LIVE
              </span>
              <ShoppingBag className="size-4 text-[#25f4ee]" />
            </div>
            <div className="mt-5 space-y-2">
              {["상품 특징 확인", "라이브에서 시연", "구매 동선 연결"].map((item) => (
                <div
                  key={item}
                  className="rounded-full bg-black/25 px-3 py-2 text-[10px] text-white/52"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-4">
            <div className="flex items-center gap-2 text-xs text-white/42">
              <BarChart3 className="size-4 text-[#25f4ee]" /> 실시간 흐름
            </div>
            <svg viewBox="0 0 180 54" className="mt-4 w-full" aria-hidden="true">
              <path
                d="M2 47 25 35 47 39 70 24 92 30 115 12 138 19 178 5"
                fill="none"
                stroke="#fe2c55"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              [Clapperboard, "숏폼 피드"],
              [FileCheck2, "주문 알림"],
            ].map(([Icon, label]) => {
              const ItemIcon = Icon as typeof Clapperboard;
              return (
                <div
                  key={label as string}
                  className="rounded-xl border border-white/8 bg-white/[.03] p-3"
                >
                  <ItemIcon className="size-4 text-[#25f4ee]" />
                  <span className="mt-2 block text-[9px] text-white/35">{label as string}</span>
                </div>
              );
            })}
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
  title: React.ReactNode;
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
          <p className="mt-5 max-w-2xl break-keep leading-7 text-white/50">{intro}</p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
