'use client';

import { startTransition, useDeferredValue, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, Clapperboard, Layers3, Radio, ScanSearch, Workflow } from 'lucide-react';
import { caseCategories, type CaseCategory, type CaseStudy } from '@/lib/cases-data';

type CasesBrowserProps = {
  cases: CaseStudy[];
};

const thumbnailIcons = [Radio, Clapperboard, ScanSearch, BarChart3, Layers3, Workflow];

export function CasesBrowser({ cases }: CasesBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof caseCategories)[number]>('전체');
  const deferredCategory = useDeferredValue(activeCategory);
  const visibleCases = deferredCategory === '전체' ? cases : cases.filter((item) => item.category === deferredCategory);

  function chooseCategory(category: (typeof caseCategories)[number]) {
    startTransition(() => setActiveCategory(category));
  }

  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:px-0" aria-label="성공사례 카테고리">
        <div className="flex min-w-max gap-2" role="group">
          {caseCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => chooseCategory(category)}
              aria-pressed={activeCategory === category}
              className={`min-h-11 rounded-full border px-5 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25f4ee] ${
                activeCategory === category
                  ? 'border-[#25f4ee]/70 bg-[#25f4ee]/12 text-white'
                  : 'border-white/10 bg-white/[.035] text-white/52 hover:border-white/25 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleCases.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        {visibleCases.map((item) => {
          const sourceIndex = cases.findIndex((candidate) => candidate.slug === item.slug);
          const Icon = thumbnailIcons[sourceIndex % thumbnailIcons.length];
          return <CaseCard key={item.slug} item={item} icon={Icon} />;
        })}
      </div> : <div className="mt-8 rounded-2xl border border-dashed border-white/14 bg-white/[.025] p-8 text-center" aria-live="polite"><h3 className="text-lg font-black">선택한 영역의 공개 사례를 확인하고 있습니다</h3><p className="mx-auto mt-3 max-w-xl break-keep text-sm leading-6 text-white/45">공개 동의와 근거 자료가 정리된 사례만 등록합니다. 관련 프로젝트 범위는 상담에서 먼저 확인할 수 있습니다.</p><Link href="/live-agency#consultation-form" className="cta-secondary mt-6">이 영역으로 상담하기 <ArrowRight className="size-4" aria-hidden="true" /></Link></div>}
    </>
  );
}

function CaseCard({ item, icon: Icon }: { item: CaseStudy; icon: typeof Radio }) {
  const isPublished = item.status === 'published';
  const href = isPublished ? `/cases/${item.slug}` : `/live-agency#consultation-form`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f13] transition duration-200 hover:-translate-y-1 hover:border-[#25f4ee]/35 hover:shadow-[0_22px_70px_rgba(0,0,0,.32)]">
      <div className="relative aspect-video overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_76%_18%,rgba(254,44,85,.23),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(37,244,238,.16),transparent_35%),#11141a] p-5" role="img" aria-label={`${item.title} 프로젝트 유형 시각화`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:32px_32px]" aria-hidden="true" />
        <div className="relative flex items-center justify-between">
          <span className="rounded-md bg-[#fe2c55] px-2 py-1 text-[10px] font-black tracking-[.08em]">LIVE FLOW</span>
          <span className="text-[10px] font-bold tracking-[.14em] text-white/34">CASE FRAME</span>
        </div>
        <div className="relative mt-7 flex items-end justify-between">
          <span className="grid size-16 place-items-center rounded-2xl border border-white/10 bg-black/35 text-[#25f4ee] shadow-[0_0_35px_rgba(37,244,238,.1)]"><Icon className="size-7" aria-hidden="true" /></span>
          <svg viewBox="0 0 150 55" className="w-[48%]" aria-hidden="true"><path d="M2 49 25 38 43 42 64 26 85 32 108 13 128 20 148 6" fill="none" stroke="#fe2c55" strokeWidth="3" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div className="p-6">
        <span className="text-xs font-black text-[#25f4ee]">{item.category}</span>
        <h3 className="mt-3 text-xl font-black tracking-[-.025em]">{item.title}</h3>
        <p className="mt-3 line-clamp-2 min-h-12 break-keep text-sm leading-6 text-white/48">{item.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="제공 업무">
          {item.services.slice(0, 4).map((service) => <li key={service} className="rounded-full border border-white/9 bg-white/[.035] px-3 py-1.5 text-[11px] font-bold text-white/48">{service}</li>)}
        </ul>
        {item.keyResults?.length ? <dl className="mt-5 grid grid-cols-2 gap-2">{item.keyResults.map((metric) => <div key={metric.label} className="rounded-xl bg-white/[.035] p-3"><dt className="text-[10px] text-white/35">{metric.label}</dt><dd className="mt-1 font-black">{metric.value}</dd></div>)}</dl> : null}
        <Link href={href} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-white transition hover:text-[#25f4ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25f4ee]">
          {isPublished ? '사례 상세보기' : '이 유형으로 상담하기'} <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export type { CaseCategory };
