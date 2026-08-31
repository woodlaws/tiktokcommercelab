import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Box,
  Clapperboard,
  ExternalLink,
  MessageCircleMore,
  MousePointerClick,
  PackageSearch,
  Play,
  Radio,
  Repeat2,
  ShoppingBag,
} from 'lucide-react';
import { CasesBrowser } from '@/components/cases-browser';
import { SiteShell } from '@/components/site-shell';
import {
  caseStudies,
  channelVideos,
  publicChannels,
  visibleCaseDashboardMetrics,
} from '@/lib/cases-data';
import { site } from '@/lib/site-data';

const title = '틱톡·라이브커머스 성공사례 | 틱톡커머스랩';
const description = '틱톡 숏폼, 유튜브, 라이브커머스 운영과 브랜드 판매 시스템 구축 사례를 확인하세요.';
const canonical = `${site.url}/cases`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    type: 'website',
    url: canonical,
    locale: 'ko_KR',
    siteName: site.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '틱톡커머스랩 성공사례' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

const operatingSteps = [
  { icon: PackageSearch, title: '상품 이해', text: '제품의 특징과 고객이 구매해야 할 이유를 정리합니다.' },
  { icon: MessageCircleMore, title: '현장 언어로 전환', text: '설명문이 아닌 실제 방송에서 바로 이해되는 말로 바꿉니다.' },
  { icon: Radio, title: '실시간 고객 반응', text: '질문, 댓글과 시청 흐름에 맞춰 판매 포인트를 조정합니다.' },
  { icon: Repeat2, title: '반복 개선', text: '방송에서 확인한 반응을 다음 콘텐츠와 라이브 기획에 반영합니다.' },
];

const recordFramework = ['고객의 상황', '해결해야 할 문제', '실행 전략', '콘텐츠와 라이브 운영', '결과 측정', '다음 개선'];

export default function CasesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: site.url },
      { '@type': 'ListItem', position: 2, name: '성공사례', item: canonical },
    ],
  };
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '라이브커머스 프로젝트 유형',
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      url: `${canonical}#case-types`,
    })),
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }} />

      <section className="relative isolate overflow-hidden border-b border-white/8">
        <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_28%,rgba(37,244,238,.12),transparent_28%),radial-gradient(circle_at_65%_88%,rgba(254,44,85,.14),transparent_33%)]" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-12 md:py-14 lg:grid-cols-[minmax(0,51fr)_minmax(0,49fr)] lg:gap-14 lg:px-10 lg:py-16">
          <div className="min-w-0">
            <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#25f4ee]/30 bg-[#25f4ee]/6 px-3 text-xs font-black tracking-[.12em] text-[#70fffb]"><Radio className="size-3.5" aria-hidden="true" /> LIVE COMMERCE CASE STUDIES</p>
            <h1 className="mt-7 max-w-[760px] text-[clamp(2.5rem,4.4vw,4.25rem)] font-black leading-[1.08] tracking-[-.045em]">
              <span className="block break-keep">현장에서 팔아본 경험을</span>
              <span className="block break-keep">브랜드의 성장 구조로 바꿉니다</span>
            </h1>
            <div className="mt-6 h-1.5 w-56 rounded-full bg-gradient-to-r from-[#25f4ee] via-white to-[#fe2c55]" aria-hidden="true" />
            <p className="mt-7 max-w-[680px] break-keep text-base leading-[1.7] text-white/58 sm:text-lg">틱톡과 유튜브 라이브 현장에서 축적한 상품 소개, 고객 소통, 판매 운영 경험을 브랜드별 전략과 실행 사례로 정리합니다.</p>
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <Link href="/live-agency#consultation-form" className="cta-primary">라이브 프로젝트 상담하기 <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <details className="group relative">
                <summary className="cta-secondary cursor-pointer list-none">백운덕 대표 채널 보기 <ArrowDown className="size-4 transition group-open:rotate-180" aria-hidden="true" /></summary>
                <div className="absolute left-0 top-[calc(100%+.6rem)] z-20 grid min-w-64 gap-2 rounded-2xl border border-white/12 bg-[#111318] p-3 shadow-2xl">
                  {publicChannels.map((channel) => <a key={channel.platform} href={channel.channelUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-bold text-white/70 transition hover:bg-white/7 hover:text-white" aria-label={`${channel.platform} ${channel.channelName} 채널 새 탭에서 보기`}><span>{channel.platform} · {channel.handle}</span><ExternalLink className="size-4" aria-hidden="true" /></a>)}
                </div>
              </details>
            </div>
          </div>

          <HeroDashboard />
        </div>
      </section>

      <PageSection eyebrow="PUBLIC CHANNELS" title="직접 방송하고, 소개하고, 판매해왔습니다" intro="공개 채널에서 확인할 수 있는 활동만 연결했습니다. 변동 가능한 채널 수치는 고정해 표시하지 않습니다.">
        <div className="grid gap-5 md:grid-cols-2">
          {publicChannels.map((channel) => {
            const metrics = [channel.followerCount, channel.videoCount, channel.totalViews].filter(Boolean);
            return <article key={channel.platform} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-6 sm:p-7">
              <div className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl ${channel.platform === 'TikTok' ? 'bg-[#25f4ee]/10' : 'bg-[#fe2c55]/12'}`} aria-hidden="true" />
              <div className="relative flex items-center justify-between"><span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-black/30">{channel.platform === 'TikTok' ? <Clapperboard className="size-5 text-[#25f4ee]" aria-hidden="true" /> : <Play className="size-6 text-[#fe2c55]" aria-hidden="true" />}</span><span className="text-xs font-black tracking-[.12em] text-white/30">{channel.platform}</span></div>
              <h3 className="relative mt-6 text-2xl font-black">{channel.channelName} <span className="ml-2 text-base text-white/38">{channel.handle}</span></h3>
              <p className="relative mt-4 break-keep text-base font-bold leading-7 text-white/72">{channel.description}</p>
              {channel.publicBio ? <p className="relative mt-3 break-keep text-sm leading-6 text-white/42">{channel.publicBio}</p> : null}
              {metrics.length ? <div className="relative mt-5 flex gap-3">{metrics.map((metric) => <span key={metric} className="rounded-lg bg-white/5 px-3 py-2 text-sm font-black">{metric}</span>)}</div> : null}
              <a href={channel.channelUrl} target="_blank" rel="noopener noreferrer" className="relative mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-[#25f4ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25f4ee]" aria-label={`${channel.platform} ${channel.channelName} 채널 새 탭에서 보기`}>{channel.platform} 채널 보기 <ExternalLink className="size-4" aria-hidden="true" /></a>
            </article>;
          })}
        </div>
      </PageSection>

      {visibleCaseDashboardMetrics.length ? <PageSection eyebrow="VERIFIED METRICS" title="숫자로 확인하는 라이브 현장" dark><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleCaseDashboardMetrics.map((metric) => <article key={metric.key} className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><span className="text-sm text-white/42">{metric.label}</span><strong className="mt-3 block text-3xl font-black">{metric.value}</strong>{metric.note ? <p className="mt-2 text-xs text-white/35">{metric.note}</p> : null}</article>)}</div></PageSection> : null}

      <PageSection id="case-types" eyebrow="CASE LIBRARY" title="프로젝트 유형부터 확인해보세요" intro="현재는 제공 가능한 업무 유형을 먼저 보여드립니다. 공개 동의와 근거가 확보된 실제 사례만 상세페이지로 연결됩니다." dark>
        <CasesBrowser cases={caseStudies} />
      </PageSection>

      <PageSection eyebrow="LIVE OPERATING METHOD" title={<>상품을 설명하는 사람이 아니라<br />사고 싶게 만드는 흐름을 설계합니다</>}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {operatingSteps.map(({ icon: Icon, title: stepTitle, text }, index) => <article key={stepTitle} className="rounded-2xl border border-white/10 bg-white/[.03] p-6"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-xl bg-[#25f4ee]/8 text-[#25f4ee]"><Icon className="size-5" aria-hidden="true" /></span><span className="text-xs font-black text-white/25">0{index + 1}</span></div><h3 className="mt-5 text-xl font-black">{stepTitle}</h3><p className="mt-3 break-keep text-sm leading-6 text-white/48">{text}</p></article>)}
        </div>
      </PageSection>

      <PageSection eyebrow="WATCH THE FIELD" title="라이브와 영상으로 확인하세요" intro="미디어를 복제하지 않고 공식 채널과 공개가 허용된 콘텐츠만 연결합니다." dark>
        <div className="grid gap-5 md:grid-cols-2">
          {publicChannels.map((channel) => <a key={channel.platform} href={channel.channelUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-32 items-center justify-between rounded-2xl border border-white/10 bg-white/[.035] p-6 transition hover:border-[#25f4ee]/35" aria-label={`${channel.platform} 최신 콘텐츠 새 탭에서 보기`}><div><span className="text-xs font-black text-[#25f4ee]">{channel.platform}</span><h3 className="mt-2 text-xl font-black">{channel.handle} 최신 활동 보기</h3><p className="mt-2 text-sm text-white/42">공식 채널에서 영상과 라이브 기록을 확인하세요.</p></div><span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/7 text-white transition group-hover:bg-[#fe2c55] group-hover:text-white"><Play className="ml-0.5 size-5" aria-hidden="true" /></span></a>)}
        </div>
        {channelVideos.length ? <div className="mt-6 grid gap-5 md:grid-cols-3">{channelVideos.map((video) => <a key={video.url} href={video.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 p-5"><span className="text-xs text-[#25f4ee]">{video.platform}</span><h3 className="mt-2 font-black">{video.title}</h3></a>)}</div> : <div className="mt-6 grid gap-4 md:grid-cols-3">{['대표 숏폼', '라이브 리플레이', '상품 스토리'].map((label, index) => <div key={label} className="aspect-video rounded-2xl border border-dashed border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,.035),transparent)] p-5"><span className="text-[10px] font-black tracking-[.14em] text-white/25">FEATURED {String(index + 1).padStart(2, '0')}</span><h3 className="mt-8 text-lg font-black text-white/62">{label}</h3><p className="mt-2 text-xs leading-5 text-white/30">공개 허용된 콘텐츠를 선별해 연결하는 영역입니다.</p></div>)}</div>}
      </PageSection>

      <PageSection eyebrow="CASE RECORD" title="프로젝트는 같은 기준으로 기록합니다" intro="상황과 실행, 결과와 다음 개선을 같은 프레임으로 기록해 의사결정에 필요한 맥락을 남깁니다.">
        <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {recordFramework.map((item, index) => <li key={item} className="relative rounded-2xl border border-white/10 bg-white/[.03] p-5"><span className="text-xs font-black text-[#fe2c55]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-4 break-keep font-black leading-snug">{item}</h3>{index < recordFramework.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 text-[#25f4ee]/35 xl:block" aria-hidden="true" /> : null}</li>)}
        </ol>
      </PageSection>

      <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#fe2c55]/40 bg-[radial-gradient(circle_at_16%_50%,rgba(37,244,238,.13),transparent_30%),radial-gradient(circle_at_84%_45%,rgba(254,44,85,.22),transparent_36%),#0b0c0f] p-8 sm:p-12">
          <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">CREATE THE NEXT CASE</p><h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-.04em] sm:text-5xl">다음 성공사례의 주인공은<br />당신의 브랜드일 수 있습니다</h2><p className="mt-5 max-w-2xl break-keep leading-7 text-white/52">상품과 현재 판매 상황을 알려주시면 라이브커머스 적용 가능성과 적합한 실행 범위를 함께 검토해드립니다.</p></div><div className="flex flex-wrap gap-3 lg:justify-end"><Link href="/live-agency#consultation-form" className="cta-primary">라이브 프로젝트 상담하기 <ArrowRight className="size-4" aria-hidden="true" /></Link><Link href="/live-agency" className="cta-secondary">라이브 에이전시 서비스 보기</Link><Link href="/seller-academy" className="cta-secondary">셀러 아카데미 보기</Link></div></div>
        </div>
      </section>
    </SiteShell>
  );
}

function HeroDashboard() {
  return <div className="relative mx-auto w-full max-w-[620px]" role="img" aria-label="라이브 화면, 상품 카드, 실시간 댓글, 주문 알림과 분석 흐름을 보여주는 대시보드 예시"><div className="absolute -inset-10 -z-10 rounded-full bg-[#fe2c55]/8 blur-3xl" aria-hidden="true" /><div className="overflow-hidden rounded-[26px] border border-white/12 bg-[#101216]/95 p-4 shadow-2xl"><div className="rounded-[18px] border border-white/8 bg-[linear-gradient(135deg,#1a1d24,#08090b_58%,#151018)] p-5"><div className="flex items-center justify-between"><span className="rounded bg-[#fe2c55] px-2 py-1 text-[10px] font-black">LIVE</span><span className="text-[10px] font-bold tracking-[.12em] text-white/35">COMMERCE CONTROL</span></div><div className="mt-5 grid gap-3 sm:grid-cols-[1.15fr_.85fr]"><div className="min-h-52 rounded-2xl border border-white/8 bg-black/25 p-4"><div className="flex items-center gap-2 text-xs text-white/46"><Radio className="size-4 text-[#25f4ee]" aria-hidden="true" /> 라이브 화면</div><div className="mt-16 space-y-2">{['상품 특징이 궁금해요', '구성 옵션을 보여주세요', '배송 안내를 확인했어요'].map((text) => <p key={text} className="rounded-full bg-white/[.055] px-3 py-2 text-[11px] text-white/55">{text}</p>)}</div></div><div className="grid gap-3"><div className="rounded-2xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-4"><div className="flex items-center gap-2 text-xs text-white/42"><ShoppingBag className="size-4 text-[#25f4ee]" aria-hidden="true" /> 상품 카드</div><span className="mt-5 block h-2 rounded-full bg-white/8"><span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-[#25f4ee] to-[#fe2c55]" /></span></div><div className="rounded-2xl border border-white/8 bg-white/[.035] p-4"><div className="flex items-center gap-2 text-xs text-white/42"><BarChart3 className="size-4 text-[#fe2c55]" aria-hidden="true" /> 성과 흐름</div><svg viewBox="0 0 160 46" className="mt-4 w-full" aria-hidden="true"><path d="M2 40 24 29 44 33 66 18 88 25 112 8 135 14 158 3" fill="none" stroke="#fe2c55" strokeWidth="3" strokeLinecap="round" /></svg></div></div></div><div className="mt-3 grid grid-cols-3 gap-3">{[[MessageCircleMore,'실시간 댓글'],[Box,'주문 알림'],[MousePointerClick,'영상 타임라인']].map(([Icon,label]) => { const ItemIcon = Icon as typeof Box; return <div key={label as string} className="rounded-xl border border-white/8 bg-white/[.03] p-3"><ItemIcon className="size-4 text-[#25f4ee]" aria-hidden="true" /><span className="mt-2 block text-[10px] text-white/38">{label as string}</span></div>; })}</div></div></div></div>;
}

function PageSection({ id, eyebrow, title: sectionTitle, intro, dark, children }: { id?: string; eyebrow: string; title: React.ReactNode; intro?: string; dark?: boolean; children: React.ReactNode }) {
  return <section id={id} className={`scroll-mt-24 ${dark ? 'border-y border-white/8 bg-[#090a0d]' : ''}`}><div className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-24"><div className="section-heading"><p>{eyebrow}</p><h2 className="max-w-4xl">{sectionTitle}</h2></div>{intro ? <p className="mt-5 max-w-2xl break-keep leading-7 text-white/50">{intro}</p> : null}<div className="mt-10">{children}</div></div></section>;
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
