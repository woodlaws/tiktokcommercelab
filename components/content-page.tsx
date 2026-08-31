import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { pageContent } from "@/lib/site-data";
import { SiteShell } from "@/components/site-shell";

type Content = (typeof pageContent)[string];
export function ContentPage({ content }: { content: Content }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": content.schema,
    name: content.title,
    description: content.description,
    provider: { "@type": "Organization", name: "틱톡커머스랩" },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://tiktok-commerce-lab.geosangbruce.chatgpt.site",
      },
      { "@type": "ListItem", position: 2, name: content.title },
    ],
  };
  const isShop = content.eyebrow === "TIKTOK SHOP KOREA";
  const faqs = [
    {
      q: "틱톡샵 한국 출시일은 확정됐나요?",
      a: "출시일과 정책은 변경될 수 있으므로 틱톡 공식 안내에서 최종 내용을 확인해야 합니다.",
    },
    {
      q: "브랜드는 무엇부터 준비해야 하나요?",
      a: "상품 적합성, 사업자·정산 정보, 물류·반품, 상품 콘텐츠와 라이브 운영 계획부터 준비하면 됩니다.",
    },
    { q: "상담 가격은 얼마인가요?", a: "상품과 목표, 실행 범위를 확인한 뒤 상담 후 제안합니다." },
  ];
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {isShop && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      )}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-32">
          <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">{content.eyebrow}</p>
          <h1 className="page-title mt-5 max-w-4xl">{content.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">{content.description}</p>
          <Link href={content.title.includes("셀러") ? "/contact?type=creator" : "/contact?type=brand-growth"} className="cta-primary mt-9">
            {content.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {content.sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-7">
              <h2 className="text-xl font-black">{section.title}</h2>
              <ul className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-white/58">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#25f4ee]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      {isShop && (
        <section className="mx-auto max-w-[1000px] px-5 pb-20 lg:px-10">
          <h2 className="panel-title">자주 묻는 질문</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-white/[.03] p-5">
                <summary className="cursor-pointer font-bold">{item.q}</summary>
                <p className="mt-4 text-sm leading-6 text-white/52">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-10">
        <div className="rounded-3xl border border-[#fe2c55]/35 bg-[linear-gradient(120deg,rgba(254,44,85,.14),rgba(37,244,238,.08))] p-8 text-center sm:p-12">
          <h2 className="cta-title">실행 가능한 다음 단계를 함께 찾겠습니다.</h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/free-class" className="cta-primary">
              무료특강 신청
            </Link>
            <Link href="/contact?type=brand-growth" className="cta-secondary">
              브랜드 상담
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
