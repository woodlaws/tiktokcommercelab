import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  CircleDot,
  Clapperboard,
  ClipboardCheck,
  Compass,
  Film,
  Layers3,
  Megaphone,
  MessageSquareText,
  Play,
  Radio,
  RefreshCw,
  Search,
  ShoppingBag,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  brandFaqs,
  brandProblems,
  brandProfiles,
  brandServices,
  collaborationModels,
  contentFormats,
  growthSteps,
  kpiGroups,
  preparationItems,
  roadmap,
} from "@/lib/brand-growth-data";
import { site } from "@/lib/site-data";

const title = "틱톡 브랜드 마케팅·틱톡커머스 성장 전략 | 틱톡커머스랩";
const description =
  "숏폼 콘텐츠, 크리에이터 협업, 라이브커머스, 광고와 데이터 분석을 연결해 브랜드의 틱톡커머스 성장을 설계합니다.";
const canonical = `${site.url}/brand-growth`;
const contactHref = "/contact?type=brand-growth";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "틱톡커머스랩 브랜드 성장 시스템" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

const growthIcons = [Search, Compass, Film, UsersRound, ShoppingBag, RefreshCw];
const serviceIcons = [Search, Compass, Layers3, Clapperboard, UsersRound, Radio, Megaphone, BarChart3];
const formatIcons = [MessageSquareText, Sparkles, Play, UsersRound, BadgeCheck, Radio];

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}

export default function BrandGrowthPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brandFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: site.url },
      { "@type": "ListItem", position: 2, name: "브랜드 성장", item: canonical },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "틱톡커머스 브랜드 통합 성장 컨설팅 및 운영",
    description,
    url: canonical,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "대한민국" },
    serviceType: ["틱톡 진출 전략", "숏폼 콘텐츠", "크리에이터 협업", "라이브커머스", "광고", "데이터 분석"],
  };

  return (
    <SiteShell>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <section className="relative isolate overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(37,244,238,.12),transparent_28%),radial-gradient(circle_at_22%_85%,rgba(254,44,85,.14),transparent_34%)]" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)] lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">BRAND GROWTH SYSTEM</p>
            <h1 className="page-title mt-5 max-w-[760px]">
              <span className="block break-keep">발견되는 브랜드에서</span>
              <span className="block break-keep text-white/45">판매되는 브랜드로</span>
            </h1>
            <p className="mt-7 max-w-[720px] break-keep text-[17px] leading-[1.7] text-white/58">
              틱톡커머스랩은 시장 진입 전략, 숏폼 콘텐츠, 크리에이터 협업, 라이브커머스, 광고,
              데이터 분석을 하나의 성장 시스템으로 연결합니다.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="핵심 서비스">
              {["전략 설계", "콘텐츠 제작", "판매 전환", "성과 개선"].map((item) => (
                <li key={item} className="rounded-full border border-white/12 bg-white/[.045] px-4 py-2 text-sm font-bold text-white/68">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={contactHref} className="cta-primary">
                우리 브랜드 성장 가능성 진단받기 <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href="#services" className="cta-secondary">
                서비스 구성 살펴보기 <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute inset-0 rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(37,244,238,.11),transparent_45%,rgba(254,44,85,.12))] blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0d1014]/94 p-5 shadow-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/8 pb-5">
                <div>
                  <span className="text-[11px] font-black tracking-[.14em] text-[#25f4ee]">GROWTH FLOW</span>
                  <strong className="mt-1 block text-base">발견부터 재구매까지</strong>
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-[#fe2c55]" />
                  <span className="size-2 rounded-full bg-[#25f4ee]" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {["콘텐츠 노출", "상품 관심", "상세페이지 방문", "장바구니", "구매", "재구매"].map((item, index) => (
                  <div key={item} className="group grid grid-cols-[36px_1fr_auto] items-center gap-3">
                    <span className={`grid size-9 place-items-center rounded-full text-xs font-black ${index < 2 ? "bg-[#25f4ee] text-black" : index > 3 ? "bg-[#fe2c55] text-white" : "border border-white/14 bg-white/5 text-white/72"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative overflow-hidden rounded-xl border border-white/9 bg-white/[.035] px-4 py-3">
                      <div className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,rgba(37,244,238,.16),rgba(254,44,85,.08))]" style={{ width: `${96 - index * 9}%` }} aria-hidden="true" />
                      <strong className="relative text-sm">{item}</strong>
                    </div>
                    {index < 5 ? <ArrowDown className="size-4 text-white/28" aria-hidden="true" /> : <RefreshCw className="size-4 text-[#fe6689]" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/8 pt-5 text-center text-[11px] font-bold text-white/42">
                <span>CONTENT</span><span>COMMERCE</span><span>CRM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-5 pb-10 lg:px-10">
          <p className="flex max-w-4xl items-start gap-3 break-keep text-[15px] leading-7 text-white/45">
            <CircleDot className="mt-1 size-4 shrink-0 text-[#25f4ee]" aria-hidden="true" />
            브랜드의 상품, 가격, 마진, 콘텐츠 자산과 운영 역량을 먼저 분석한 후 필요한 범위만 제안합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="WHY IT STOPS">틱톡 브랜드가 매출로 연결되지 않는 이유</SectionHeading>
        <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">틱톡을 시작했지만, 왜 매출로 연결되지 않을까요?</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {brandProblems.map((problem, index) => (
            <article key={problem} className="group rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-white/20">
              <span className="font-mono text-xs font-bold text-[#fe6689]">0{index + 1}</span>
              <h3 className="mt-5 break-keep text-lg font-extrabold leading-[1.45]">{problem}</h3>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border-l-2 border-[#25f4ee] bg-[#25f4ee]/5 px-6 py-5 text-[16px] font-bold leading-7 text-white/72">
          문제는 콘텐츠 한 편이 아니라 전략, 콘텐츠, 상품, 판매 운영이 연결되지 않았다는 데 있습니다.
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#08090b]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="SIX-STEP SYSTEM">틱톡커머스 성장 시스템</SectionHeading>
          <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">콘텐츠가 매출로 이어지는 6단계 성장 시스템입니다.</p>
          <div className="relative mt-12 grid gap-4 lg:grid-cols-3">
            <div className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-[linear-gradient(90deg,#25f4ee,rgba(255,255,255,.12),#fe2c55)] lg:block" aria-hidden="true" />
            {growthSteps.map((step, index) => {
              const Icon = growthIcons[index];
              return (
                <article key={step.number} className="relative rounded-2xl border border-white/9 bg-[#0f1115] p-6">
                  <div className="flex items-center justify-between">
                    <span className={`grid size-14 place-items-center rounded-2xl ${index % 2 ? "bg-[#fe2c55]/12 text-[#fe6689]" : "bg-[#25f4ee]/10 text-[#25f4ee]"}`}><Icon className="size-6" aria-hidden="true" /></span>
                    <span className="font-mono text-sm font-black text-white/28">{step.number}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black">{step.title}</h3>
                  <p className="mt-2 break-keep text-[15px] leading-6 text-white/45">{step.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {step.items.map((item) => <li key={item} className="flex gap-2.5 text-[15px] leading-6 text-white/62"><Check className="mt-1 size-4 shrink-0 text-[#25f4ee]" aria-hidden="true" />{item}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="SERVICE MODULES">틱톡 브랜드 마케팅 서비스</SectionHeading>
        <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">브랜드 상황에 따라 필요한 서비스를 조합합니다.</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {brandServices.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={service.title} className="min-h-[280px] bg-[#0c0e11] p-6">
                <div className="flex items-center justify-between">
                  <Icon className={`size-6 ${index % 3 === 1 ? "text-[#fe6689]" : "text-[#25f4ee]"}`} aria-hidden="true" />
                  <span className="font-mono text-xs text-white/25">{service.number}</span>
                </div>
                <h3 className="mt-7 break-keep text-lg font-black">{service.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {service.items.map((item) => <li key={item} className="flex gap-2 text-[15px] leading-6 text-white/48"><span className="mt-2 size-1 shrink-0 rounded-full bg-white/28" />{item}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
        <div className="mt-9 text-center"><Link href={contactHref} className="cta-primary">필요한 서비스 조합 상담하기 <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
      </section>

      <section className="border-y border-white/8 bg-[#08090b]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="BY BRAND STAGE">브랜드 유형별 솔루션</SectionHeading>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {brandProfiles.map((profile) => (
              <article key={profile.key} className="rounded-2xl border border-white/10 bg-white/[.03] p-6 sm:p-7">
                <div className="flex items-start gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/7 font-mono font-black text-[#25f4ee]">{profile.key}</span><h3 className="pt-1.5 break-keep text-lg font-black">{profile.title}</h3></div>
                <p className="mt-6 text-xs font-black tracking-[.14em] text-white/35">추천 실행 순서</p>
                <ol className="mt-3 flex flex-wrap items-center gap-2">
                  {profile.flow.map((item, index) => <li key={item} className="flex items-center gap-2"><span className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-[15px] font-bold text-white/68">{item}</span>{index < profile.flow.length - 1 ? <ArrowRight className="size-3.5 text-[#fe6689]" aria-hidden="true" /> : null}</li>)}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="FIRST 90 DAYS">90일 성장 로드맵</SectionHeading>
        <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">첫 90일, 진단에서 판매 확장까지 순서대로 실행합니다.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roadmap.map((phase, index) => (
            <article key={phase.range} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-7">
              <div className={`absolute inset-x-0 top-0 h-1 ${index === 1 ? "bg-white/18" : index === 2 ? "bg-[#fe2c55]" : "bg-[#25f4ee]"}`} />
              <span className="font-mono text-sm font-black text-white/38">{phase.range}</span>
              <h3 className="mt-4 text-xl font-black">{phase.title}</h3>
              <ul className="mt-6 space-y-3">{phase.items.map((item) => <li key={item} className="flex gap-3 text-[15px] leading-6 text-white/55"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#25f4ee]" aria-hidden="true" />{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="mt-6 break-keep text-[15px] leading-7 text-white/38">브랜드의 준비 상태, 상품 특성 및 예산에 따라 기간과 실행 범위는 달라질 수 있습니다.</p>
      </section>

      <section className="border-y border-white/8 bg-[#08090b]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="CONTENT FORMATS">무엇을 올릴지 고민하지 않도록 콘텐츠 포맷부터 설계합니다</SectionHeading>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {contentFormats.map((format, index) => {
              const Icon = formatIcons[index];
              return (
                <article key={format}>
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.45rem] border border-white/12 bg-[linear-gradient(145deg,#141820,#08090b)] p-3 shadow-xl">
                    <div className="flex items-center justify-between text-[8px] font-bold text-white/35"><span>FORMAT {index + 1}</span><span>●</span></div>
                    <div className={`mt-4 grid aspect-square place-items-center rounded-2xl ${index % 2 ? "bg-[radial-gradient(circle,#fe2c5544,transparent_66%)]" : "bg-[radial-gradient(circle,#25f4ee35,transparent_66%)]"}`}><Icon className={`size-9 ${index % 2 ? "text-[#fe6689]" : "text-[#25f4ee]"}`} aria-hidden="true" /></div>
                    <div className="mt-4 h-2 w-3/4 rounded-full bg-white/15" /><div className="mt-2 h-2 w-1/2 rounded-full bg-white/8" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between"><div className="h-5 w-5 rounded-full border border-white/15" /><div className="grid gap-1"><span className="size-1.5 rounded-full bg-white/24" /><span className="size-1.5 rounded-full bg-white/16" /><span className="size-1.5 rounded-full bg-white/10" /></div></div>
                  </div>
                  <h3 className="mt-4 break-keep text-[15px] font-extrabold leading-6">{format}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="MEASUREMENT">성과 측정 지표</SectionHeading>
        <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">조회수 하나만 보고 운영하지 않습니다.</p>
        <div className="mt-10 grid gap-3 lg:grid-cols-[1fr_.9fr_.8fr_.7fr]">
          {kpiGroups.map((group, index) => (
            <article key={group.title} className={`rounded-2xl border p-6 ${index === 0 ? "border-[#25f4ee]/25 bg-[#25f4ee]/6" : index === 3 ? "border-[#fe2c55]/28 bg-[#fe2c55]/7" : "border-white/10 bg-white/[.035]"}`}>
              <div className="flex items-center justify-between"><h3 className="text-lg font-black">{group.title}</h3><span className="font-mono text-xs text-white/28">0{index + 1}</span></div>
              <ul className="mt-5 space-y-2.5">{group.items.map((item) => <li key={item} className="text-[15px] leading-6 text-white/56">{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="mt-6 break-keep text-[15px] leading-7 text-white/42">브랜드의 목표와 판매 환경에 맞춰 실제로 추적 가능한 지표를 먼저 정의합니다.</p>
      </section>

      <section className="border-y border-white/8 bg-[#08090b]">
        <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="ENGAGEMENT MODELS">협업 방식</SectionHeading>
          <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">컨설팅부터 통합 운영까지 선택할 수 있습니다.</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {collaborationModels.map((model, index) => (
              <article key={model.title} className={`rounded-2xl border p-7 ${index === 1 ? "border-[#25f4ee]/25 bg-[#25f4ee]/5" : "border-white/10 bg-white/[.03]"}`}>
                <span className="font-mono text-xs font-bold text-white/30">MODEL 0{index + 1}</span>
                <h3 className="mt-4 text-xl font-black">{model.title}</h3>
                <div className="mt-6 min-h-[112px] rounded-xl border border-white/8 bg-black/20 p-4"><span className="text-xs font-black text-[#25f4ee]">적합 대상</span><p className="mt-2 break-keep text-[15px] leading-6 text-white/57">{model.fit}</p></div>
                <p className="mt-6 text-xs font-black tracking-[.12em] text-white/35">제공 범위</p>
                <ul className="mt-3 space-y-2.5">{model.items.map((item) => <li key={item} className="flex gap-2.5 text-[15px] leading-6 text-white/60"><Check className="mt-1 size-4 shrink-0 text-[#fe6689]" aria-hidden="true" />{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[.035] p-6 md:flex-row md:items-center">
            <p className="break-keep text-[15px] leading-7 text-white/52">상품 수, 콘텐츠 제작량, 라이브 운영, 광고 범위에 따라 상담 후 제안합니다.</p>
            <Link href={contactHref} className="cta-primary shrink-0">우리 브랜드에 맞는 운영 방식 상담하기</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 lg:grid-cols-[.82fr_1.18fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">PREP CHECKLIST</p>
          <h2 className="panel-title mt-3">상담 전에 이것만 준비해 주세요</h2>
          <p className="mt-5 max-w-md break-keep leading-7 text-white/48">자료가 모두 준비되지 않아도 상담은 가능하며, 우선순위를 함께 정리해드립니다.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {preparationItems.map((item) => <li key={item} className="flex min-h-16 items-center gap-3 rounded-xl border border-white/9 bg-white/[.03] px-5 py-3 text-[15px] font-bold text-white/65"><ClipboardCheck className="size-5 shrink-0 text-[#25f4ee]" aria-hidden="true" />{item}</li>)}
        </ul>
      </section>

      <section className="border-y border-white/8 bg-[#08090b]">
        <div className="mx-auto max-w-[920px] px-5 py-20 lg:px-10 lg:py-24">
          <SectionHeading eyebrow="FAQ">자주 묻는 질문</SectionHeading>
          <Accordion className="mt-9 overflow-hidden rounded-2xl border border-white/10 bg-[#0e1013]">
            {brandFaqs.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index}`} className="border-white/9 px-5 sm:px-6">
                <AccordionTrigger className="min-h-17 py-5 text-[16px] font-extrabold no-underline hover:no-underline"><span className="pr-5 break-keep">{item.q}</span></AccordionTrigger>
                <AccordionContent className="pb-5 pr-8"><p className="break-keep text-[15px] leading-7 text-white/52">{item.a}</p></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(125deg,#fe174f_0%,#a9176e_45%,#087f88_100%)] px-6 py-12 text-center shadow-[0_30px_100px_rgba(254,23,79,.18)] sm:px-10 sm:py-16">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" aria-hidden="true" />
          <Target className="mx-auto size-8 text-white/90" aria-hidden="true" />
          <h2 className="cta-title mx-auto mt-5 max-w-[760px]">
            <span className="block break-keep">우리 브랜드의 다음 성장 단계,</span>
            <span className="block break-keep">틱톡커머스랩과 함께 설계해보세요.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl break-keep text-[16px] leading-7 text-white/78">상품과 목표를 알려주시면 지금 필요한 전략, 콘텐츠, 크리에이터, 라이브 및 광고의 우선순위를 제안합니다.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={contactHref} className="inline-flex min-h-13 items-center justify-center whitespace-nowrap rounded-lg bg-black px-6 text-[15px] font-black text-white transition hover:bg-[#111]">브랜드 성장 상담 신청</Link>
            <Link href="/free-class" className="inline-flex min-h-13 items-center justify-center whitespace-nowrap rounded-lg border border-white/55 bg-white/10 px-6 text-[15px] font-black text-white transition hover:bg-white/18">무료특강 먼저 들어보기</Link>
          </div>
          <p className="mt-6 text-[15px] leading-6 text-white/68">상담 신청 후 담당자가 내용을 확인하여 순차적으로 연락드립니다.</p>
        </div>
      </section>
    </SiteShell>
  );
}
