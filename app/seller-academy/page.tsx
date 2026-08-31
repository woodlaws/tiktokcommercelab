import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircleMore,
  Radio,
  Repeat2,
  ShoppingBag,
  Sparkles,
  Target,
  UsersRound,
  Video,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import {
  academyApplicationHref,
  academyAudiences,
  academyConfig,
  academyCurriculum,
  academyFaqs,
  academyGoals,
  academyInstructors,
  academyMethod,
  academyStatusLabels,
} from "@/lib/seller-academy-data";
import { site } from "@/lib/site-data";

const canonical = `${site.url}/seller-academy`;

export const metadata: Metadata = {
  title: { absolute: `${academyConfig.title} | 틱톡커머스랩` },
  description: academyConfig.description,
  alternates: { canonical },
  openGraph: {
    title: academyConfig.title,
    description: academyConfig.description,
    url: canonical,
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: academyConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: academyConfig.title,
    description: academyConfig.description,
    images: ["/og.png"],
  },
};

export default function SellerAcademyPage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: academyConfig.title,
    description: academyConfig.description,
    url: canonical,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: academyConfig.format },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: academyFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <SiteShell>
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
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_28%,rgba(37,244,238,.13),transparent_28%),radial-gradient(circle_at_65%_88%,rgba(254,44,85,.17),transparent_34%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-12 md:py-14 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:px-10 lg:py-16">
          <div className="min-w-0">
            <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#25f4ee]/30 bg-[#25f4ee]/6 px-3 text-xs font-black tracking-[.12em] text-[#70fffb]">
              <Radio className="size-3.5" aria-hidden="true" /> SELLER ACADEMY ·{" "}
              {academyStatusLabels[academyConfig.status]}
            </p>
            <h1 className="page-title mt-7 max-w-[820px]">
              <span className="block break-keep">보는 교육이 아니라</span>
              <span className="block break-keep">콘텐츠를 만들고</span>
              <span className="block break-keep">실제 판매를 시작하는 과정</span>
            </h1>
            <p className="mt-7 max-w-[720px] break-keep text-base leading-[1.75] text-white/58 sm:text-lg">
              {academyConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={academyApplicationHref} className="cta-primary">
                아카데미 사전등록 <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/free-class" className="cta-secondary">
                무료특강 먼저 듣기
              </Link>
            </div>
            <p className="mt-5 break-keep text-xs leading-6 text-white/36">
              교육 일정·기간·가격·정원은 확정 후 안내합니다. 현재는 결제가 아닌 사전등록 및 상담
              단계입니다.
            </p>
          </div>
          <div
            className="relative mx-auto w-full max-w-[560px]"
            role="img"
            aria-label="상품 선정부터 콘텐츠, 라이브, 첫 판매까지 이어지는 셀러 아카데미 실행 보드"
          >
            <div
              className="absolute -inset-10 -z-10 rounded-full bg-[#fe2c55]/8 blur-3xl"
              aria-hidden="true"
            />
            <div className="rounded-[28px] border border-white/12 bg-[#101216]/95 p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-[.14em] text-white/38">
                  EXECUTION BOARD
                </span>
                <span className="rounded-full bg-[#fe2c55]/12 px-3 py-1 text-[10px] font-black text-[#ff6689]">
                  PRE-REGISTRATION
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  [ShoppingBag, "대표상품 선정", "상품·타깃·마진"],
                  [Sparkles, "숏폼 제작", "훅·시연·전환"],
                  [Radio, "라이브 실행", "대본·진행·피드백"],
                  [CircleDollarSign, "판매 시스템", "측정·개선·반복"],
                ].map(([Icon, title, text], index) => {
                  const ItemIcon = Icon as typeof ShoppingBag;
                  return (
                    <article
                      key={title as string}
                      className="rounded-2xl border border-white/9 bg-white/[.035] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <ItemIcon
                          className={`size-5 ${index % 2 ? "text-[#fe2c55]" : "text-[#25f4ee]"}`}
                          aria-hidden="true"
                        />
                        <span className="text-[10px] font-black text-white/25">0{index + 1}</span>
                      </div>
                      <h2 className="mt-5 font-black">{title as string}</h2>
                      <p className="mt-2 text-xs text-white/38">{text as string}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-4">
                <GraduationCap className="size-5 shrink-0 text-[#25f4ee]" aria-hidden="true" />
                <p className="text-sm font-bold text-white/62">
                  결과물을 만들고 첫 판매 실행으로 연결합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
        <div className="section-heading">
          <p>COURSE GOALS</p>
          <h2>교육이 끝났을 때 달라져야 할 것</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {academyGoals.map((goal) => (
            <article
              key={goal}
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-5"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#25f4ee]" aria-hidden="true" />
              <p className="break-keep text-sm font-bold leading-6 text-white/68">{goal}</p>
            </article>
          ))}
        </div>
      </section>

      <AcademySection
        eyebrow="WHO IT IS FOR"
        title="이런 분에게 필요한 실전 과정입니다"
        intro="현재 직함보다 중요한 것은 직접 결과물을 만들고 판매 실행까지 이어갈 의지입니다."
        dark
      >
        <div className="grid gap-4 md:grid-cols-2">
          {academyAudiences.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[.035] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-[#25f4ee]/8 text-[#25f4ee]">
                  {index === 0 ? (
                    <ShoppingBag className="size-5" aria-hidden="true" />
                  ) : index === 1 ? (
                    <BarChart3 className="size-5" aria-hidden="true" />
                  ) : index === 2 ? (
                    <Video className="size-5" aria-hidden="true" />
                  ) : (
                    <Target className="size-5" aria-hidden="true" />
                  )}
                </span>
                <span className="text-xs font-black text-white/24">0{index + 1}</span>
              </div>
              <h3 className="mt-5 break-keep text-xl font-black">{item.title}</h3>
              <p className="mt-3 break-keep text-sm leading-7 text-white/48">{item.text}</p>
            </article>
          ))}
        </div>
      </AcademySection>

      <AcademySection
        eyebrow="CURRICULUM"
        title="상품 선정부터 첫 판매 프로젝트까지"
        intro="강의를 듣는 순서가 아니라 실제 판매를 시작하는 순서로 커리큘럼을 구성합니다."
      >
        <div className="space-y-4">
          {academyCurriculum.map((module, index) => (
            <article
              key={module.phase}
              className="grid gap-6 rounded-2xl border border-white/10 bg-white/[.03] p-6 md:grid-cols-[90px_1fr_260px] md:items-center sm:p-7"
            >
              <div>
                <span className="text-xs font-black tracking-[.12em] text-[#fe5b80]">
                  0{index + 1}
                </span>
                <p className="mt-2 text-[10px] font-black tracking-[.13em] text-white/28">
                  {module.phase}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black">{module.title}</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex gap-2 text-sm leading-6 text-white/46">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#25f4ee]" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#25f4ee]/18 bg-[#25f4ee]/5 p-4">
                <span className="flex items-center gap-2 text-[10px] font-black tracking-[.12em] text-[#25f4ee]">
                  <FileText className="size-4" aria-hidden="true" /> OUTPUT
                </span>
                <strong className="mt-2 block text-sm leading-6">{module.output}</strong>
              </div>
            </article>
          ))}
        </div>
      </AcademySection>

      <AcademySection eyebrow="LEARN BY DOING" title="배우고, 만들고, 피드백 받고, 실행합니다" dark>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {academyMethod.map((item, index) => (
            <li
              key={item.title}
              className="relative rounded-2xl border border-white/10 bg-white/[.035] p-5"
            >
              <span className="text-xs font-black text-[#25f4ee]">
                STEP {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 break-keep text-sm leading-6 text-white/44">{item.text}</p>
              {index < academyMethod.length - 1 ? (
                <ArrowRight
                  className="absolute -right-3 top-1/2 z-10 hidden size-5 text-[#fe2c55]/45 lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </AcademySection>

      <AcademySection
        eyebrow="COURSE OUTPUTS"
        title="수료증보다 중요한 것은 실행할 수 있는 자료입니다"
        intro="과정의 각 단계에서 다음 판매 실행에 바로 사용할 결과물을 만듭니다."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {academyConfig.benefits.map((benefit, index) => (
            <article
              key={benefit}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.015))] p-6"
            >
              <span
                className={`grid size-11 place-items-center rounded-xl ${index % 2 ? "bg-[#fe2c55]/9 text-[#fe6689]" : "bg-[#25f4ee]/8 text-[#25f4ee]"}`}
              >
                {index === 0 ? (
                  <FileText className="size-5" aria-hidden="true" />
                ) : index === 1 ? (
                  <MessageCircleMore className="size-5" aria-hidden="true" />
                ) : index === 2 ? (
                  <Radio className="size-5" aria-hidden="true" />
                ) : (
                  <Repeat2 className="size-5" aria-hidden="true" />
                )}
              </span>
              <h3 className="mt-5 break-keep text-lg font-black">{benefit}</h3>
            </article>
          ))}
        </div>
      </AcademySection>

      <AcademySection eyebrow="INSTRUCTORS" title="현장 운영과 마케팅 시스템을 함께 배웁니다" dark>
        <div className="grid gap-5 md:grid-cols-2">
          {academyInstructors.map((instructor, index) => (
            <article
              key={instructor.name}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-7"
            >
              <div
                className={`absolute right-0 top-0 h-36 w-36 rounded-full blur-3xl ${index ? "bg-[#fe2c55]/10" : "bg-[#25f4ee]/8"}`}
                aria-hidden="true"
              />
              <span className="relative grid size-12 place-items-center rounded-xl border border-white/10 bg-black/25">
                <GraduationCap
                  className={`size-6 ${index ? "text-[#fe5b80]" : "text-[#25f4ee]"}`}
                  aria-hidden="true"
                />
              </span>
              <h3 className="relative mt-6 text-2xl font-black">{instructor.name}</h3>
              <p className="relative mt-2 text-sm font-bold text-[#25f4ee]">{instructor.role}</p>
              <p className="relative mt-4 max-w-xl break-keep text-sm leading-7 text-white/48">
                {instructor.bio}
              </p>
            </article>
          ))}
        </div>
      </AcademySection>

      <AcademySection
        eyebrow="OPEN INFORMATION"
        title="확정된 정보만 안내합니다"
        intro="아래 정보는 설정 파일 한 곳에서 관리되며, 운영 내용이 확정되면 같은 페이지에 즉시 반영됩니다."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <dl className="grid gap-3 rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:grid-cols-2 sm:p-8">
            {[
              [Clock3, "교육 일정", academyConfig.schedule ?? "확정 후 안내"],
              [Repeat2, "교육 기간", academyConfig.duration ?? "확정 후 안내"],
              [MapPin, "운영 방식·장소", academyConfig.location ?? "확정 후 안내"],
              [
                CircleDollarSign,
                "수강료",
                academyConfig.price
                  ? `${academyConfig.price.toLocaleString("ko-KR")}원`
                  : "확정 후 안내",
              ],
              [
                UsersRound,
                "모집 정원",
                academyConfig.capacity ? `${academyConfig.capacity}명` : "확정 후 안내",
              ],
              [ClipboardCheck, "현재 상태", academyStatusLabels[academyConfig.status]],
            ].map(([Icon, label, value]) => {
              const ItemIcon = Icon as typeof Clock3;
              return (
                <div
                  key={label as string}
                  className="rounded-xl border border-white/8 bg-black/20 p-5"
                >
                  <dt className="flex items-center gap-2 text-xs font-bold text-white/36">
                    <ItemIcon className="size-4 text-[#25f4ee]" aria-hidden="true" />
                    {label as string}
                  </dt>
                  <dd className="mt-3 font-black">{value as string}</dd>
                </div>
              );
            })}
          </dl>
          <div className="rounded-3xl border border-[#fe2c55]/30 bg-[radial-gradient(circle_at_80%_20%,rgba(254,44,85,.16),transparent_34%),#101216] p-7 sm:p-9">
            <p className="text-xs font-black tracking-[.14em] text-[#fe6689]">PRE-REGISTRATION</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-.04em]">
              모집이 열리면
              <br />
              먼저 안내받으세요
            </h3>
            <p className="mt-5 break-keep text-sm leading-7 text-white/48">
              사전등록은 수강 확정이나 결제가 아닙니다. 일정, 가격과 참여 조건이 확정되면 내용을
              확인한 뒤 참여 여부를 결정할 수 있습니다.
            </p>
            <Link href={academyApplicationHref} className="cta-primary mt-7">
              교육 상담 및 사전등록 <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            {!academyConfig.paymentOpen ? (
              <p className="mt-4 text-xs leading-5 text-white/32">
                현재 온라인 결제는 제공하지 않습니다.
              </p>
            ) : null}
          </div>
        </div>
      </AcademySection>

      <AcademySection eyebrow="ACADEMY JOURNEY" title="무료특강에서 실전 실행으로 이어집니다" dark>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["01", "무료특강", "틱톡커머스의 구조와 준비 순서를 이해합니다."],
            ["02", "아카데미 사전등록", "목표와 현재 수준을 남기고 과정 안내를 받습니다."],
            ["03", "교육과 첫 판매 실행", "결과물을 만들고 작은 판매 프로젝트를 시작합니다."],
            ["04", "성장 지원", "필요에 따라 컨설팅·운영대행·후속 프로그램으로 연결합니다."],
          ].map(([step, title, text], index) => (
            <article
              key={step}
              className="relative rounded-2xl border border-white/10 bg-white/[.035] p-6"
            >
              <span className="text-xs font-black text-[#fe5b80]">{step}</span>
              <h3 className="mt-5 text-lg font-black">{title}</h3>
              <p className="mt-3 break-keep text-sm leading-6 text-white/44">{text}</p>
              {index < 3 ? (
                <ArrowRight
                  className="absolute -right-3 top-1/2 z-10 hidden size-5 text-[#25f4ee]/35 md:block"
                  aria-hidden="true"
                />
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/free-class" className="cta-secondary">
            무료특강부터 시작하기
          </Link>
          <Link href={academyApplicationHref} className="cta-primary">
            아카데미 사전등록 <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </AcademySection>

      <AcademySection eyebrow="FAQ" title="셀러 아카데미, 자주 묻는 질문">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]">
          {academyFaqs.map((item) => (
            <details
              key={item.question}
              className="group border-b border-white/8 px-5 last:border-b-0 sm:px-7"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-black">
                <span>{item.question}</span>
                <ChevronDown
                  className="size-5 shrink-0 text-white/35 transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 pr-8 break-keep text-sm leading-7 text-white/48">{item.answer}</p>
            </details>
          ))}
        </div>
      </AcademySection>

      <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#fe2c55]/40 bg-[radial-gradient(circle_at_16%_50%,rgba(37,244,238,.13),transparent_30%),radial-gradient(circle_at_84%_45%,rgba(254,44,85,.22),transparent_36%),#0b0c0f] p-8 sm:p-12">
          <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">
                MAKE, SELL, REPEAT
              </p>
              <h2 className="cta-title mt-4 max-w-3xl">
                배우는 데서 멈추지 말고
                <br />첫 판매 실행까지 준비하세요
              </h2>
              <p className="mt-5 max-w-2xl break-keep leading-7 text-white/52">
                확정된 모집 정보는 사전등록자에게 우선 안내합니다. 지금은 결제 없이 교육 관심과 상담
                내용을 남기는 단계입니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={academyApplicationHref} className="cta-primary">
                교육 상담 및 사전등록 <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/tiktok-shop-korea" className="cta-secondary">
                틱톡샵 한국 가이드
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function AcademySection({
  eyebrow,
  title,
  intro,
  dark,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={dark ? "border-y border-white/8 bg-[#090a0d]" : ""}>
      <div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="section-heading">
          <p>{eyebrow}</p>
          <h2 className="max-w-4xl">{title}</h2>
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
