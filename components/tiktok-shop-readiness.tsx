'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { readinessAreas } from '@/lib/tiktok-shop-korea-data';

const storageKey = 'tiktok-shop-korea-readiness-v1';
const totalItems = readinessAreas.reduce((total, area) => total + area.items.length, 0);

export function TikTokShopReadiness() {
  const [checked, setChecked] = useState<string[]>([]);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      if (Array.isArray(saved)) setChecked(saved.filter((item): item is string => typeof item === 'string'));
    } catch {
      localStorage.removeItem(storageKey);
    } finally {
      setRestored(true);
    }
  }, []);

  const result = getReadinessResult(checked.length);

  function toggle(id: string) {
    setChecked((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  function reset() {
    setChecked([]);
    localStorage.removeItem(storageKey);
  }

  return <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
    <div className="grid gap-4 md:grid-cols-2">{readinessAreas.map((area) => <fieldset key={area.id} className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><legend className="px-2 text-lg font-black">{area.title}</legend><div className="mt-3 grid gap-2">{area.items.map((item) => { const id = `${area.id}:${item}`; const isChecked = checked.includes(id); return <label key={id} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border px-3 text-sm transition ${isChecked ? 'border-[#25f4ee]/35 bg-[#25f4ee]/7 text-white' : 'border-white/8 bg-black/15 text-white/52 hover:border-white/18'}`}><input type="checkbox" checked={isChecked} onChange={() => toggle(id)} className="size-5 shrink-0 accent-[#fe2c55]" />{item}</label>; })}</div></fieldset>)}</div>

    <aside className="h-fit rounded-3xl border border-[#25f4ee]/25 bg-[linear-gradient(160deg,rgba(37,244,238,.1),rgba(254,44,85,.07))] p-6 lg:sticky lg:top-28" aria-live="polite">
      <span className="text-xs font-black tracking-[.14em] text-[#25f4ee]">READINESS CHECK</span>
      <strong className="mt-4 block text-3xl font-black">{checked.length}<small className="ml-1 text-base text-white/35">/ {totalItems}</small></strong>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-gradient-to-r from-[#25f4ee] to-[#fe2c55] transition-[width]" style={{ width: `${checked.length / totalItems * 100}%` }} /></div>
      <p className="mt-5 text-xs text-white/38">{restored ? '이 기기의 브라우저에 체크 상태를 저장합니다.' : '체크 상태를 불러오는 중입니다.'}</p>
      <h3 className="mt-5 text-xl font-black">{result.label}</h3>
      <p className="mt-3 break-keep text-sm leading-6 text-white/52">{result.description}</p>
      <p className="mt-4 flex gap-2 text-xs leading-5 text-white/35"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#25f4ee]" />이 결과는 참고용이며 입점 승인이나 사업 성과를 보장하는 진단이 아닙니다.</p>
      <Link href={`/contact/brand?service=${encodeURIComponent('틱톡샵 준비')}&readiness=${encodeURIComponent(result.label)}&checked=${checked.length}`} className="cta-primary mt-6 w-full">내 준비 결과로 상담 신청 <ArrowRight className="size-4" /></Link>
      <button type="button" onClick={reset} disabled={!checked.length} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-bold text-white/42 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"><RotateCcw className="size-4" />체크 초기화</button>
    </aside>
  </div>;
}

function getReadinessResult(count: number) {
  if (count <= 6) return { label: '준비 시작', description: '상품과 운영의 기본 정보를 한 문서에 모으는 것부터 시작해보세요.' };
  if (count <= 13) return { label: '기본 준비', description: '기초 체계가 보입니다. 콘텐츠와 라이브 실행 항목을 더 구체화할 단계입니다.' };
  if (count <= 20) return { label: '실행 준비', description: '작은 상품군과 콘텐츠로 첫 테스트 계획을 만들 수 있는 상태입니다.' };
  return { label: '상담 권장', description: '여러 준비 영역이 연결됐습니다. 실제 시장·상품에 맞는 실행 범위를 전문가와 점검해보세요.' };
}
