'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, LoaderCircle, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { submitLead } from '@/lib/lead-submission';

const services = ['상품 진단', '1회 라이브', '월 운영 대행', '틱톡 진출', '교육 문의', '기타'];

export function LiveAgencyForm() {
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState<{ tone: 'error' | 'success'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAt = useRef(Date.now());

  async function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !agree) {
      setMessage({ tone: 'error', text: '필수 입력 항목과 개인정보 수집·이용 동의를 확인해 주세요.' });
      form.reportValidity();
      return;
    }
    const data = new FormData(form); setIsSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    const result = await submitLead({ type: 'live-agency', name: String(data.get('name') ?? '').trim(), phone: String(data.get('phone') ?? '').trim(), email: String(data.get('email') ?? '').trim(), organization: String(data.get('company') ?? '').trim(), product: String(data.get('product') ?? '').trim(), currentChannel: String(data.get('salesChannel') ?? '').trim(), goal: String(data.get('message') ?? '').trim(), privacyConsent: agree, marketingConsent: false, sourcePath: '/live-agency', referrer: safeReferrer(document.referrer), campaign: { source: params.get('utm_source')?.slice(0, 100), medium: params.get('utm_medium')?.slice(0, 100), campaign: params.get('utm_campaign')?.slice(0, 100) }, context: { service: String(data.get('service') ?? '') }, startedAt: startedAt.current });
    setIsSubmitting(false);
    if (result.ok) { form.reset(); setAgree(false); setMessage({ tone: 'success', text: '상담 문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.' }); }
    else setMessage({ tone: 'error', text: result.message });
  }

  const fieldClass = 'h-12 border-white/12 bg-black/25 px-3 text-sm focus-visible:border-[#25f4ee] focus-visible:ring-[#25f4ee]/20';

  return (
    <section id="consultation-form" className="scroll-mt-28 border-t border-white/8 bg-[#08090b]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">LIVE COMMERCE CONSULTING</p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-.04em] sm:text-4xl">우리 상품의 라이브 가능성을<br />함께 진단합니다</h2>
          <p className="mt-5 max-w-md leading-7 text-white/52">상품과 현재 판매 상황을 남겨주시면 어떤 범위부터 검토할지 정리할 수 있도록 준비하고 있습니다.</p>
          <div className="mt-8 rounded-2xl border border-[#25f4ee]/22 bg-[#25f4ee]/6 p-5 text-sm leading-6 text-white/55">
            <AlertCircle className="mb-3 size-5 text-[#25f4ee]" aria-hidden="true" />
            현재 폼은 입력 검증만 제공하며 서버나 외부 상담 시스템에 연결되어 있지 않습니다. 개인정보는 저장되지 않습니다.
          </div>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-[#101216] p-5 shadow-2xl sm:p-8" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="이름" required><Input name="name" autoComplete="name" required className={fieldClass} /></Field>
            <Field label="회사명 또는 브랜드명" required><Input name="company" autoComplete="organization" required className={fieldClass} /></Field>
            <Field label="연락처" required><Input name="phone" type="tel" autoComplete="tel" required className={fieldClass} /></Field>
            <Field label="이메일" required><Input name="email" type="email" autoComplete="email" required className={fieldClass} /></Field>
            <Field label="상품 또는 서비스" required><Input name="product" required className={fieldClass} placeholder="판매하려는 상품을 알려주세요" /></Field>
            <Field label="현재 판매 채널" required><Input name="salesChannel" required className={fieldClass} placeholder="자사몰, 오픈마켓, 오프라인 등" /></Field>
            <Field label="희망 서비스" required wide>
              <NativeSelect name="service" required className="w-full [&_select]:h-12 [&_select]:border-white/12 [&_select]:bg-black/25 [&_select]:px-3">
                <NativeSelectOption value="">선택해 주세요</NativeSelectOption>
                {services.map(service => <NativeSelectOption key={service} value={service}>{service}</NativeSelectOption>)}
              </NativeSelect>
            </Field>
            <Field label="문의 내용" required wide><Textarea name="message" required className="min-h-36 border-white/12 bg-black/25 px-3 py-3 text-sm focus-visible:border-[#25f4ee] focus-visible:ring-[#25f4ee]/20" placeholder="상품, 목표, 희망 운영 방식이나 궁금한 점을 알려주세요" /></Field>
          </div>
          <label className="mt-6 flex min-h-11 cursor-pointer items-start gap-3 rounded-lg p-2 text-sm leading-6 text-white/58 focus-within:ring-2 focus-within:ring-[#25f4ee]/40">
            <input type="checkbox" checked={agree} onChange={event => setAgree(event.target.checked)} className="mt-1 size-5 shrink-0 accent-[#fe2c55]" required />
            <span>개인정보 수집·이용 안내를 확인했으며 이에 동의합니다. <Link href="/privacy" className="ml-1 underline underline-offset-4">개인정보처리방침</Link></span>
          </label>
          {message && <output role={message.tone === 'error' ? 'alert' : 'status'} aria-live="polite" className={`mt-5 block rounded-xl border p-4 text-sm leading-6 ${message.tone === 'error' ? 'border-[#fe2c55]/28 bg-[#fe2c55]/8 text-[#ff9cb2]' : 'border-[#25f4ee]/22 bg-[#25f4ee]/6 text-[#8ffefa]'}`}>{message.text}</output>}
          <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#fe174f] px-5 text-base font-black transition hover:bg-[#ff3767] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#25f4ee]/50 disabled:opacity-55">{isSubmitting ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> 서버 확인 중</> : <>상담 내용 확인 <Send className="size-4" aria-hidden="true" /></>}</button>
        </form>
      </div>
    </section>
  );
}

function safeReferrer(value: string) { if (!value) return undefined; try { const url = new URL(value); return url.origin === window.location.origin ? url.pathname : url.origin; } catch { return undefined; } }

function Field({ label, required, wide, children }: { label: string; required?: boolean; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? 'sm:col-span-2' : ''}><span className="mb-2 block text-sm font-bold">{label}{required && <em className="ml-1 not-italic text-[#fe2c55]">*</em>}</span>{children}</label>;
}
