"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  budgetOptions,
  getLeadOption,
  leadTypeOptions,
  monthlySalesOptions,
  timelineOptions,
  type LeadCampaign,
  type LeadPayload,
  type LeadType,
  validateLeadPayload,
} from "@/lib/lead-data";
import { submitLead } from "@/lib/lead-submission";

type Message = { tone: "error" | "success"; text: string } | null;
const fieldClass =
  "h-12 w-full rounded-lg border border-white/12 bg-black/25 px-3 text-sm outline-none focus:border-[#25f4ee] focus:ring-2 focus:ring-[#25f4ee]/20";

export function UnifiedContactForm({
  initialType,
  campaign,
}: {
  initialType: LeadType;
  campaign: LeadCampaign;
}) {
  const [type, setType] = useState<LeadType>(initialType);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<Message>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [referrer, setReferrer] = useState("");
  const selected = getLeadOption(type);

  useEffect(() => {
    if (!document.referrer) return;
    try {
      const url = new URL(document.referrer);
      setReferrer(url.origin === window.location.origin ? url.pathname : url.origin);
    } catch {
      setReferrer("");
    }
  }, []);

  async function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: LeadPayload = {
      type,
      name: text(data, "name"),
      phone: text(data, "phone"),
      email: text(data, "email"),
      organization: text(data, "organization") || undefined,
      role: text(data, "role") || undefined,
      product: text(data, "product") || undefined,
      currentChannel: text(data, "currentChannel") || undefined,
      monthlySales: text(data, "monthlySales") || undefined,
      budget: text(data, "budget") || undefined,
      timeline: text(data, "timeline") || undefined,
      goal: text(data, "goal"),
      preferredContact: text(data, "preferredContact") || undefined,
      privacyConsent: data.get("privacyConsent") === "on",
      marketingConsent: data.get("marketingConsent") === "on",
      sourcePath: "/contact",
      referrer,
      campaign,
      websiteConfirmation: text(data, "websiteConfirmation") || undefined,
      startedAt,
    };
    const nextErrors = validateLeadPayload(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setMessage({ tone: "error", text: "필수 항목과 입력 형식을 확인해 주세요." });
      requestAnimationFrame(() =>
        document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus(),
      );
      return;
    }
    setIsSubmitting(true);
    const result = await submitLead(payload);
    setIsSubmitting(false);
    if (result.ok) {
      form.reset();
      setMessage({
        tone: "success",
        text: "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.",
      });
      return;
    }
    setErrors(result.errors ?? {});
    setMessage({ tone: "error", text: result.message });
  }

  return (
    <section id="contact-form" className="scroll-mt-24 border-y border-white/8 bg-[#08090b]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">UNIFIED CONTACT</p>
          <h2 className="panel-title mt-4">
            목적에 맞는 상담으로
            <br />
            바로 연결하세요
          </h2>
          <p className="mt-5 max-w-md break-keep leading-7 text-white/52">
            문의 유형을 선택하면 담당자가 확인해야 할 핵심 정보를 한 번에 정리할 수 있습니다.
          </p>
          <div className="mt-7 rounded-2xl border border-[#fe2c55]/25 bg-[#fe2c55]/7 p-5 text-sm leading-6 text-white/58">
            <AlertCircle className="mb-3 size-5 text-[#fe6689]" aria-hidden="true" />
            <strong className="text-white/78">현재 저장 시스템 연결 전</strong>
            <p className="mt-2">
              서버 검증 API는 준비됐지만 실제 저장소가 없어 입력 정보가 저장되지 않습니다. 저장 연결
              전에는 접수 완료로 표시하지 않습니다.
            </p>
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/9 bg-white/[.03] p-5 text-sm leading-6 text-white/45">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#25f4ee]" aria-hidden="true" />
            <span>
              캠페인 정보와 유입 경로는 서버 전송용 데이터에만 포함하며, 개인정보를 URL·콘솔·분석
              이벤트에 기록하지 않습니다.
            </span>
          </div>
          <div className="mt-6 rounded-2xl border border-[#25f4ee]/20 bg-[#25f4ee]/5 p-5">
            <span className="text-xs font-black text-[#25f4ee]">추천 서비스</span>
            <strong className="mt-2 block text-lg">{selected.service}</strong>
            <p className="mt-2 text-sm leading-6 text-white/46">{selected.description}</p>
          </div>
        </div>
        <form
          onSubmit={submit}
          className="rounded-3xl border border-white/10 bg-[#101216] p-5 shadow-2xl sm:p-8"
          noValidate
          aria-label="통합 상담 문의 폼"
        >
          <fieldset>
            <legend className="text-sm font-black">
              1. 문의 유형 선택 <em className="not-italic text-[#fe2c55]">*</em>
            </legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {leadTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-xl border p-4 transition focus-within:ring-2 focus-within:ring-[#25f4ee]/35 ${type === option.value ? "border-[#25f4ee]/45 bg-[#25f4ee]/7" : "border-white/9 bg-black/15 hover:border-white/20"}`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={type === option.value}
                    onChange={() => setType(option.value)}
                    className="mt-1 size-4 accent-[#fe2c55]"
                  />
                  <span>
                    <strong className="block text-sm">{option.label}</strong>
                    <small className="mt-1 block text-xs leading-5 text-white/38">
                      {option.description}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="my-7 border-t border-white/8" />
          <div className="mb-5 flex items-center justify-between">
            <strong className="text-sm">2. 상담 정보 입력</strong>
            <span className="text-xs text-white/32">
              <em className="not-italic text-[#fe2c55]">*</em> 필수
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="이름" error={errors.name} required>
              <input id="contact-name" name="name" autoComplete="name" className={fieldClass} />
            </Field>
            <Field id="phone" label="연락처" error={errors.phone} required>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={fieldClass}
              />
            </Field>
            <Field id="email" label="이메일" error={errors.email} required>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={fieldClass}
              />
            </Field>
            <Field id="organization" label="회사·브랜드·활동명">
              <input
                id="contact-organization"
                name="organization"
                autoComplete="organization"
                className={fieldClass}
              />
            </Field>
            <Field id="role" label="담당 역할">
              <input
                id="contact-role"
                name="role"
                placeholder="대표, 마케터, 셀러, 크리에이터 등"
                className={fieldClass}
              />
            </Field>
            <Field id="product" label="상품·서비스">
              <input id="contact-product" name="product" className={fieldClass} />
            </Field>
            <Field id="currentChannel" label="현재 판매·운영 채널">
              <input
                id="contact-currentChannel"
                name="currentChannel"
                placeholder="자사몰, 오픈마켓, TikTok 등"
                className={fieldClass}
              />
            </Field>
            <Field id="monthlySales" label="현재 월 매출 구간">
              <Select id="contact-monthlySales" name="monthlySales" options={monthlySalesOptions} />
            </Field>
            <Field id="budget" label="예상 예산">
              <Select id="contact-budget" name="budget" options={budgetOptions} />
            </Field>
            <Field id="timeline" label="희망 시작 시점">
              <Select id="contact-timeline" name="timeline" options={timelineOptions} />
            </Field>
            <Field id="preferredContact" label="선호 연락 방식">
              <Select
                id="contact-preferredContact"
                name="preferredContact"
                options={["전화", "이메일", "문자", "협의 가능"]}
              />
            </Field>
            <Field id="goal" label="현재 상황과 상담 목표" error={errors.goal} required wide>
              <textarea
                id="contact-goal"
                name="goal"
                className="min-h-36 w-full rounded-lg border border-white/12 bg-black/25 px-3 py-3 text-sm outline-none focus:border-[#25f4ee] focus:ring-2 focus:ring-[#25f4ee]/20"
                placeholder="현재 상황, 해결하고 싶은 문제와 기대하는 결과를 10자 이상 입력해 주세요"
              />
            </Field>
          </div>
          <div
            className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label>
              웹사이트 확인
              <input name="websiteConfirmation" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="mt-7 space-y-3 border-t border-white/8 pt-6">
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg p-2 text-sm leading-6 text-white/58 focus-within:ring-2 focus-within:ring-[#25f4ee]/40">
              <input
                id="contact-privacyConsent"
                type="checkbox"
                name="privacyConsent"
                className="mt-0.5 size-5 shrink-0 accent-[#fe2c55]"
              />
              <span>
                <strong className="text-[#fe6689]">[필수]</strong> 개인정보 수집·이용에 동의합니다.
              </span>
            </label>
            {errors.privacyConsent ? (
              <p className="pl-10 text-xs font-bold text-[#ff8aa4]">{errors.privacyConsent}</p>
            ) : null}
            <details className="rounded-xl border border-white/9 bg-black/18 p-4 text-sm text-white/48">
              <summary className="min-h-8 cursor-pointer font-bold text-white/70">
                개인정보 수집·이용 내용 보기
              </summary>
              <dl className="mt-4 grid gap-3 text-xs leading-6">
                <div>
                  <dt className="font-bold text-white/70">수집 항목</dt>
                  <dd>이름, 연락처, 이메일 및 상담자가 직접 입력한 사업·문의 정보</dd>
                </div>
                <div>
                  <dt className="font-bold text-white/70">이용 목적</dt>
                  <dd>문의 분류, 상담 대응과 제안 준비</dd>
                </div>
                <div>
                  <dt className="font-bold text-white/70">운영 주체·보유 기간</dt>
                  <dd>
                    현재 저장 시스템이 없어 서버에 보유하지 않습니다. 실제 저장 연결 전 운영 주체와
                    보유 기간을 확정해 고지해야 합니다.
                  </dd>
                </div>
              </dl>
              <Link
                href="/privacy"
                className="mt-3 inline-flex min-h-11 items-center text-xs font-bold text-[#25f4ee] underline underline-offset-4"
              >
                개인정보처리방침 보기
              </Link>
            </details>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg p-2 text-sm leading-6 text-white/48">
              <input
                type="checkbox"
                name="marketingConsent"
                className="mt-0.5 size-5 shrink-0 accent-[#25f4ee]"
              />
              <span>
                <strong className="text-white/65">[선택]</strong> 교육·서비스·콘텐츠 안내 수신에
                동의합니다.
              </span>
            </label>
          </div>
          {message ? (
            <output
              role={message.tone === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-5 block rounded-xl border p-4 text-sm leading-6 ${message.tone === "error" ? "border-[#fe2c55]/28 bg-[#fe2c55]/8 text-[#ff9cb2]" : "border-[#25f4ee]/22 bg-[#25f4ee]/6 text-[#8ffefa]"}`}
            >
              {message.text}
            </output>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#fe174f] px-5 text-base font-black transition hover:bg-[#ff3767] disabled:opacity-55"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> 서버 확인 중
              </>
            ) : (
              <>
                상담 정보 확인 및 접수 시도 <Send className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function text(data: FormData, name: string) {
  return String(data.get(name) ?? "").trim();
}
function Select({ id, name, options }: { id: string; name: string; options: string[] }) {
  return (
    <select id={id} name={name} className={fieldClass}>
      <option value="">선택해 주세요</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
function Field({
  id,
  label,
  error,
  required,
  wide,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={`contact-${id}`} className={wide ? "sm:col-span-2" : ""}>
      <span className="mb-2 block text-sm font-bold">
        {label}
        {required ? <em className="ml-1 not-italic text-[#fe2c55]">*</em> : null}
      </span>
      {children}
      {error ? <span className="mt-2 block text-xs font-bold text-[#ff8aa4]">{error}</span> : null}
    </label>
  );
}

export function ContactServiceCard({ type }: { type: LeadType }) {
  const option = getLeadOption(type);
  return (
    <Link
      href={`/contact?type=${type}#contact-form`}
      className="group rounded-2xl border border-white/10 bg-white/[.03] p-6 transition hover:-translate-y-1 hover:border-[#25f4ee]/35"
    >
      <span
        className={`grid size-10 place-items-center rounded-xl ${option.accent === "mint" ? "bg-[#25f4ee]/8 text-[#25f4ee]" : "bg-[#fe2c55]/10 text-[#fe6689]"}`}
      >
        <CheckCircle2 className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-black">{option.label}</h3>
      <p className="mt-3 text-sm leading-6 text-white/44">{option.description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
        선택하기 <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
