import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Quote,
  Radio,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { getPublishedCase, publishedCases, type CaseMetric } from "@/lib/cases-data";
import { site } from "@/lib/site-data";

type CasePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublishedCase(slug);
  if (!item) return { title: "사례를 찾을 수 없습니다" };

  const pageTitle = `${item.title} | 틱톡커머스랩 성공사례`;
  const canonical = `${site.url}/cases/${item.slug}`;
  const images = item.thumbnail
    ? [
        {
          url: item.thumbnail.src,
          width: item.thumbnail.width,
          height: item.thumbnail.height,
          alt: item.thumbnail.alt,
        },
      ]
    : [];
  return {
    title: { absolute: pageTitle },
    description: item.summary,
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: item.summary,
      type: "article",
      url: canonical,
      images,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title: pageTitle,
      description: item.summary,
      images: images.map((image) => image.url),
    },
  };
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = getPublishedCase(slug);
  if (!item) notFound();

  const canonical = `${site.url}/cases/${item.slug}`;
  const relatedCases = publishedCases
    .filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category)
    .slice(0, 3);
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    url: canonical,
    ...(item.publishedAt ? { datePublished: item.publishedAt } : {}),
    ...(item.thumbnail ? { image: `${site.url}${item.thumbnail.src}` } : {}),
    ...(item.clientName ? { about: item.clientName } : {}),
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: site.url },
      { "@type": "ListItem", position: 2, name: "성공사례", item: `${site.url}/cases` },
      { "@type": "ListItem", position: 3, name: item.title, item: canonical },
    ],
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <article>
        <header className="relative isolate overflow-hidden border-b border-white/8">
          <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_35%,rgba(254,44,85,.16),transparent_32%),radial-gradient(circle_at_18%_75%,rgba(37,244,238,.09),transparent_28%)]"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-[1200px] px-5 py-12 lg:px-10 lg:py-16">
            <nav
              aria-label="현재 위치"
              className="flex flex-wrap items-center gap-2 text-sm text-white/42"
            >
              <Link href="/" className="min-h-11 content-center hover:text-white">
                홈
              </Link>
              <ChevronRight className="size-4" aria-hidden="true" />
              <Link href="/cases" className="min-h-11 content-center hover:text-white">
                성공사례
              </Link>
              <ChevronRight className="size-4" aria-hidden="true" />
              <span aria-current="page" className="text-white/70">
                {item.title}
              </span>
            </nav>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#25f4ee]/30 bg-[#25f4ee]/6 px-3 text-xs font-black text-[#70fffb]">
                  <Radio className="size-3.5" aria-hidden="true" /> {item.category}
                </span>
                <h1 className="article-title mt-6 max-w-4xl">
                  {item.title}
                </h1>
                <p className="mt-6 max-w-3xl break-keep text-lg leading-8 text-white/58">
                  {item.summary}
                </p>
              </div>
              {item.clientName || item.industry || item.period || item.services.length ? (
                <dl className="grid gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-6 text-sm">
                  {item.clientName ? <MetaRow label="프로젝트" value={item.clientName} /> : null}
                  {item.industry ? <MetaRow label="업종" value={item.industry} /> : null}
                  {item.period ? <MetaRow label="진행 기간" value={item.period} /> : null}
                  {item.services.length ? (
                    <MetaRow label="수행 업무" value={item.services.join(" · ")} />
                  ) : null}
                </dl>
              ) : null}
            </div>
          </div>
        </header>

        {item.thumbnail || item.videoUrl ? (
          <DetailSection>
            {item.thumbnail ? (
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={item.thumbnail.src}
                  alt={item.thumbnail.alt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1120px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}
            {item.videoUrl ? (
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 font-extrabold text-[#25f4ee]"
              >
                프로젝트 영상 보기 <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </DetailSection>
        ) : null}

        {item.context?.length ? (
          <DetailSection eyebrow="BACKGROUND" title="프로젝트 배경">
            <TextList items={item.context} />
          </DetailSection>
        ) : null}
        {item.challenge ? (
          <DetailSection eyebrow="CHALLENGE" title="해결해야 했던 문제" dark>
            <p className="max-w-4xl break-keep text-lg leading-8 text-white/62">{item.challenge}</p>
          </DetailSection>
        ) : null}
        {item.goals?.length ? (
          <DetailSection eyebrow="GOAL" title="목표와 측정 기준">
            <TextList items={item.goals} numbered />
          </DetailSection>
        ) : null}
        {item.solution ? (
          <DetailSection eyebrow="SOLUTION" title="해결 방향" dark>
            <p className="max-w-4xl break-keep text-lg leading-8 text-white/62">{item.solution}</p>
          </DetailSection>
        ) : null}
        {item.strategy?.length ? (
          <DetailSection eyebrow="STRATEGY" title="실행 전략" dark>
            <TextList items={item.strategy} numbered />
          </DetailSection>
        ) : null}
        {item.execution?.length ? (
          <DetailSection eyebrow="EXECUTION" title="실제 진행 과정">
            <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {item.execution.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/[.03] p-5"
                >
                  <span className="text-xs font-black text-[#25f4ee]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/48">{step.description}</p>
                </li>
              ))}
            </ol>
          </DetailSection>
        ) : null}

        {item.keyResults?.length || (item.beforeMetrics?.length && item.afterMetrics?.length) ? (
          <DetailSection eyebrow="RESULT" title="확인 가능한 결과" dark>
            {item.keyResults?.length ? <MetricGrid metrics={item.keyResults} /> : null}
            {item.beforeMetrics?.length && item.afterMetrics?.length ? (
              <BeforeAfter before={item.beforeMetrics} after={item.afterMetrics} />
            ) : null}
          </DetailSection>
        ) : null}

        {item.insights?.length || item.improvements?.length ? (
          <DetailSection eyebrow="LEARNINGS" title="핵심 인사이트">
            <div className="grid gap-5 md:grid-cols-2">
              {item.insights?.length ? (
                <InsightCard title="무엇이 작동했는지" items={item.insights} />
              ) : null}
              {item.improvements?.length ? (
                <InsightCard title="다음 실행에서 개선할 부분" items={item.improvements} />
              ) : null}
            </div>
          </DetailSection>
        ) : null}

        {item.testimonial ? (
          <DetailSection>
            <blockquote className="rounded-3xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-8 sm:p-10">
              <Quote className="size-8 text-[#25f4ee]" aria-hidden="true" />
              <p className="mt-5 break-keep text-xl font-bold leading-9">
                {item.testimonial.quote}
              </p>
              {item.testimonial.author ? (
                <footer className="mt-5 text-sm text-white/45">
                  {item.testimonial.author}
                  {item.testimonial.role ? ` · ${item.testimonial.role}` : ""}
                </footer>
              ) : null}
            </blockquote>
          </DetailSection>
        ) : null}

        {item.gallery?.length ? (
          <DetailSection eyebrow="GALLERY" title="프로젝트 기록">
            <div className="grid gap-5 md:grid-cols-2">
              {item.gallery.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-video overflow-hidden rounded-2xl border border-white/10"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </DetailSection>
        ) : null}

        {relatedCases.length ? (
          <DetailSection eyebrow="RELATED CASES" title="관련 사례" dark>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedCases.map((related) => (
                <Link
                  key={related.slug}
                  href={`/cases/${related.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-[#25f4ee]/35"
                >
                  <span className="text-xs font-black text-[#25f4ee]">{related.category}</span>
                  <h3 className="mt-3 text-xl font-black">{related.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{related.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                    상세보기 <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </DetailSection>
        ) : null}

        <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-[#fe2c55]/40 bg-[radial-gradient(circle_at_18%_50%,rgba(37,244,238,.13),transparent_30%),radial-gradient(circle_at_82%_45%,rgba(254,44,85,.22),transparent_36%),#0b0c0f] p-8 text-center sm:p-12">
            <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <h2 className="cta-title">
                비슷한 프로젝트를 준비하고 있나요?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl break-keep leading-7 text-white/52">
                상품과 현재 판매 상황을 알려주시면 라이브 적용 가능성과 실행 범위를 함께 검토합니다.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/live-agency#consultation-form" className="cta-primary">
                  비슷한 프로젝트 상담하기 <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/cases" className="cta-secondary">
                  <ArrowLeft className="size-4" aria-hidden="true" /> 성공사례 목록
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold text-white/35">{label}</dt>
      <dd className="mt-1.5 break-keep font-bold text-white/72">{value}</dd>
    </div>
  );
}

function DetailSection({
  eyebrow,
  title,
  dark,
  children,
}: {
  eyebrow?: string;
  title?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={dark ? "border-y border-white/8 bg-[#090a0d]" : ""}>
      <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-20">
        {title ? (
          <div className="section-heading">
            {eyebrow ? <p>{eyebrow}</p> : null}
            <h2>{title}</h2>
          </div>
        ) : null}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

function TextList({ items, numbered }: { items: string[]; numbered?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((text, index) => (
        <div
          key={text}
          className="flex gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-6"
        >
          {numbered ? (
            <span className="font-black text-[#fe2c55]">{String(index + 1).padStart(2, "0")}</span>
          ) : (
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#25f4ee]" aria-hidden="true" />
          )}
          <p className="break-keep leading-7 text-white/58">{text}</p>
        </div>
      ))}
    </div>
  );
}

function MetricGrid({ metrics }: { metrics: CaseMetric[] }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[.035] p-6">
          <dt className="text-sm text-white/40">{metric.label}</dt>
          <dd className="mt-3 text-3xl font-black">
            {metric.value}
            {metric.unit ?? ""}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function BeforeAfter({ before, after }: { before: CaseMetric[]; after: CaseMetric[] }) {
  const afterByLabel = new Map(after.map((metric) => [metric.label, metric]));
  const pairs = before.flatMap((metric) => {
    const afterMetric = afterByLabel.get(metric.label);
    return afterMetric
      ? [
          {
            label: metric.label,
            before: metric.value,
            after: afterMetric.value,
            unit: afterMetric.unit ?? metric.unit,
          },
        ]
      : [];
  });
  return pairs.length ? (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
      <div className="grid grid-cols-[1fr_.8fr_.8fr] bg-white/[.045] px-5 py-3 text-xs font-black text-white/38">
        <span>지표</span>
        <span>Before</span>
        <span>After</span>
      </div>
      {pairs.map((pair) => (
        <div
          key={pair.label}
          className="grid grid-cols-[1fr_.8fr_.8fr] border-t border-white/8 px-5 py-4 text-sm"
        >
          <strong>{pair.label}</strong>
          <span className="text-white/45">
            {pair.before}
            {pair.unit ?? ""}
          </span>
          <span className="font-black text-[#25f4ee]">
            {pair.after}
            {pair.unit ?? ""}
          </span>
        </div>
      ))}
    </div>
  ) : null;
}

function InsightCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
      <h3 className="text-xl font-black">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-white/52">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#25f4ee]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
