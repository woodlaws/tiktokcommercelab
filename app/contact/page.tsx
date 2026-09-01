import type { Metadata } from "next";
import { ArrowRight, ClipboardCheck, Route, ShieldCheck, UsersRound } from "lucide-react";
import { ContactServiceCard, UnifiedContactForm } from "@/components/unified-contact-form";
import { SiteShell } from "@/components/site-shell";
import { isLeadType, leadTypeOptions, type LeadCampaign } from "@/lib/lead-data";
import { site } from "@/lib/site-data";

const title = "통합 문의·상담 | 틱톡커머스랩";
const description =
  "틱톡샵, 브랜드 성장, 라이브커머스 운영, 교육, 크리에이터와 파트너십 문의를 목적에 맞게 분류하는 통합 상담 페이지입니다.";
const canonical = `${site.url}/contact`;
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
    images: [{ url: "/og-tiktok-commerce-lab.png", width: 1200, height: 630, alt: "틱톡커머스랩 통합 문의" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-tiktok-commerce-lab.png"] },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawType = first(params.type);
  const initialType = isLeadType(rawType) ? rawType : "other";
  const campaign: LeadCampaign = {
    source: safe(params.utm_source),
    medium: safe(params.utm_medium),
    campaign: safe(params.utm_campaign),
    content: safe(params.utm_content),
    term: safe(params.utm_term),
  };
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_30%,rgba(37,244,238,.12),transparent_28%),radial-gradient(circle_at_68%_88%,rgba(254,44,85,.16),transparent_34%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-14 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">CONTACT ROUTER</p>
            <h1 className="page-title mt-5 max-w-[820px]">
              <span className="block break-keep">어떤 도움이 필요한지</span>
              <span className="block break-keep">알려주시면 적합한</span>
              <span className="block break-keep">상담으로 연결합니다</span>
            </h1>
            <p className="mt-7 max-w-[720px] break-keep text-lg leading-8 text-white/55">
              틱톡샵 진출, 라이브 운영, 브랜드 성장, 교육과 파트너십 문의를 한곳에서 분류하고 상담에
              필요한 정보를 정리합니다.
            </p>
            <a href="#contact-form" className="cta-primary mt-8">
              문의 유형 선택하기 <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [Route, "목적별 자동 분류"],
              [ClipboardCheck, "상담 정보 표준화"],
              [UsersRound, "담당 서비스 추천"],
              [ShieldCheck, "서버 검증·스팸 방지"],
            ].map(([Icon, label], index) => {
              const ItemIcon = Icon as typeof Route;
              return (
                <div
                  key={label as string}
                  className="rounded-2xl border border-white/10 bg-white/[.035] p-6"
                >
                  <ItemIcon
                    className={`size-6 ${index % 2 ? "text-[#fe6689]" : "text-[#25f4ee]"}`}
                    aria-hidden="true"
                  />
                  <strong className="mt-5 block">{label as string}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
        <div className="section-heading">
          <p>SERVICE ROUTER</p>
          <h2>문의 목적을 먼저 선택하세요</h2>
        </div>
        <p className="mt-5 max-w-2xl break-keep leading-7 text-white/48">
          선택한 유형은 URL의 `type` 값으로만 전달됩니다. 이름·연락처 등 개인정보는 URL에 포함하지
          않습니다.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {leadTypeOptions.map((option) => (
            <ContactServiceCard key={option.value} type={option.value} />
          ))}
        </div>
      </section>
      <UnifiedContactForm initialType={initialType} campaign={campaign} />
    </SiteShell>
  );
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
function safe(value: string | string[] | undefined) {
  const text = first(value)?.trim().slice(0, 100);
  return text || undefined;
}
