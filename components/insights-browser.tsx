'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Search, Sparkles, X } from 'lucide-react';
import { insightCategories, publishedInsightPosts } from '@/lib/insights-data';

const PAGE_SIZE = 6;

export function InsightsBrowser() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('ko-KR'));
  const filtered = useMemo(() => publishedInsightPosts.filter((post) => {
    const matchesCategory = category === 'all' || post.category.slug === category;
    const searchable = `${post.title} ${post.summary} ${post.category.name} ${post.tags.map((tag) => tag.name).join(' ')}`.toLocaleLowerCase('ko-KR');
    return matchesCategory && searchable.includes(deferredQuery);
  }), [category, deferredQuery]);
  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectCategory(value: string) { setCategory(value); setPage(1); }

  return <>
    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><label className="relative block w-full"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-white/35" aria-hidden="true" /><span className="sr-only">인사이트 검색</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="틱톡샵, 라이브, 광고, 숏폼을 검색하세요" className="h-13 w-full rounded-xl border border-white/12 bg-black/25 pl-12 pr-12 text-sm outline-none focus:border-[#25f4ee] focus:ring-2 focus:ring-[#25f4ee]/20" />{query ? <button type="button" onClick={() => { setQuery(''); setPage(1); }} className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-white/40 hover:bg-white/6 hover:text-white" aria-label="검색어 지우기"><X className="size-4" aria-hidden="true" /></button> : null}</label><div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="카테고리 필터"><button type="button" onClick={() => selectCategory('all')} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${category === 'all' ? 'border-[#25f4ee]/50 bg-[#25f4ee]/10 text-[#7dfffb]' : 'border-white/10 text-white/48 hover:text-white'}`}>전체</button>{insightCategories.map((item) => <button type="button" key={item.slug} onClick={() => selectCategory(item.slug)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${category === item.slug ? 'border-[#25f4ee]/50 bg-[#25f4ee]/10 text-[#7dfffb]' : 'border-white/10 text-white/48 hover:text-white'}`}>{item.name}</button>)}</div></div>
    <div className="mt-5 flex items-center justify-between text-sm text-white/38"><span>{filtered.length}개의 공개 콘텐츠</span>{category !== 'all' ? <Link href={`/insights/category/${category}`} className="font-bold text-[#25f4ee]">카테고리 페이지 보기 <ArrowRight className="inline size-4" aria-hidden="true" /></Link> : null}</div>
    {visible.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((post) => <InsightCard key={post.slug} post={post} />)}</div> : <div className="mt-8 rounded-2xl border border-white/10 p-12 text-center"><Search className="mx-auto size-8 text-white/18" aria-hidden="true" /><h2 className="mt-4 font-black">검색 결과가 없습니다</h2><p className="mt-2 text-sm text-white/38">다른 키워드나 카테고리를 선택해 보세요.</p></div>}
    {total > 1 ? <nav className="mt-10 flex items-center justify-center gap-3" aria-label="콘텐츠 페이지 이동"><button type="button" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="min-h-10 rounded-lg border border-white/12 bg-white/4 px-4 text-sm disabled:opacity-35">이전</button><span className="text-sm text-white/48">{page} / {total}</span><button type="button" disabled={page === total} onClick={() => setPage((current) => Math.min(total, current + 1))} className="min-h-10 rounded-lg border border-white/12 bg-white/4 px-4 text-sm disabled:opacity-35">다음</button></nav> : null}
  </>;
}

function InsightCard({ post }: { post: (typeof publishedInsightPosts)[number] }) {
  return <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#101216] transition hover:-translate-y-1 hover:border-[#25f4ee]/30"><Link href={`/insights/${post.slug}`} className="block"><div className="relative h-44 overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(37,244,238,.28),transparent_30%),radial-gradient(circle_at_22%_75%,rgba(254,44,85,.28),transparent_35%),linear-gradient(135deg,#161921,#08090b)] p-5"><span className="inline-flex rounded-full border border-white/12 bg-black/25 px-3 py-1 text-[11px] font-bold text-white/65">{post.category.name}</span><Sparkles className="absolute bottom-6 right-6 size-11 text-white/12" aria-hidden="true" />{post.featured ? <span className="absolute right-4 top-4 rounded bg-[#fe2c55] px-2 py-1 text-[10px] font-black">추천</span> : null}</div><div className="p-6"><div className="flex items-center gap-3 text-xs text-white/34"><time dateTime={post.publishedAt}>{post.publishedAt}</time><span className="flex items-center gap-1"><Clock className="size-3" aria-hidden="true" />{post.readTime}</span></div><h2 className="mt-3 text-xl font-black leading-snug tracking-[-.025em] group-hover:text-[#6ffbf7]">{post.title}</h2><p className="mt-3 line-clamp-2 text-sm leading-6 text-white/48">{post.summary}</p><div className="mt-4 flex flex-wrap gap-2">{post.tags.slice(0, 2).map((tag) => <span key={tag.slug} className="text-[11px] font-bold text-white/32">#{tag.name}</span>)}</div><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/70">읽어보기 <ArrowRight className="size-4" aria-hidden="true" /></span></div></Link></article>;
}
