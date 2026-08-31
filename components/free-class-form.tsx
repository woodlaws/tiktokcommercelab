"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
  consultationOptions,
  freeClassConfig,
  interestOptions,
  userTypeOptions,
} from "@/lib/free-class-data";
import { trackFreeClassEvent } from "@/lib/free-class-analytics";
import { submitFreeClassApplication, type FreeClassApplication } from "@/lib/free-class-submission";

type FormErrors = Record<string, string>;
type FormMessage = { tone: "error" | "notice"; text: string } | null;

const phonePattern = /^[0-9+()\-\s]{8,20}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldClass =
  "h-12 border-white/12 bg-black/25 px-3 text-sm focus-visible:border-[#25f4ee] focus-visible:ring-[#25f4ee]/20 aria-invalid:border-[#fe2c55]";

export function FreeClassForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<FormMessage>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);
  const startedAt = useRef(Date.now());
  const submissionLock = useRef(false);

  useEffect(() => {
    setSubmitted(sessionStorage.getItem("free-class-application-complete") === "true");
  }, []);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackFreeClassEvent("free_class_form_start");
  }

  function clearFieldError(event: React.FormEvent<HTMLFormElement>) {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (!target.name || !errors[target.name]) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[target.name];
      return next;
    });
  }

  async function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validateApplication(data);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setMessage({ tone: "error", text: "필수 항목과 입력 형식을 확인해 주세요." });
      trackFreeClassEvent("free_class_form_error", { reason: "validation" });
      requestAnimationFrame(() =>
        document.getElementById(`free-class-${Object.keys(nextErrors)[0]}`)?.focus(),
      );
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setErrors({});
    setMessage(null);
    trackFreeClassEvent("free_class_form_submit");

    const params = new URLSearchParams(window.location.search);
    const application: FreeClassApplication = {
      name: String(data.get("name")).trim(),
      phone: String(data.get("phone")).trim(),
      email: String(data.get("email")).trim(),
      company: String(data.get("company")).trim(),
      userType: String(data.get("userType")),
      interests: data.getAll("interests").map(String),
      product: optionalValue(data, "product"),
      salesChannels: optionalValue(data, "salesChannels"),
      tiktokStatus: optionalValue(data, "tiktokStatus"),
      challenge: optionalValue(data, "challenge"),
      consultationType: optionalValue(data, "consultationType"),
      privacyConsent: data.get("privacyConsent") === "on",
      marketingConsent: data.get("marketingConsent") === "on",
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      referrer: safeReferrer(document.referrer),
      createdAt: new Date().toISOString(),
      startedAt: startedAt.current,
    };

    try {
      const result = await submitFreeClassApplication(application);
      if (result.ok) {
        trackFreeClassEvent("free_class_form_success");
        sessionStorage.setItem("free-class-application-complete", "true");
        setSubmitted(true);
        form.reset();
      } else {
        trackFreeClassEvent("free_class_form_error", { reason: result.reason });
        setMessage({ tone: "notice", text: result.message });
      }
    } catch {
      trackFreeClassEvent("free_class_form_error", { reason: "request_failed" });
      setMessage({
        tone: "error",
        text: "신청 정보를 전송하지 못했습니다. 저장 시스템 연결 상태를 확인해 주세요.",
      });
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="free-class-form" className="scroll-mt-24 border-y border-white/8 bg-[#08090b]">
        <div className="mx-auto max-w-[900px] px-5 py-24 text-center lg:px-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#25f4ee]/10 text-[#25f4ee]">
            <CheckCircleIcon />
          </span>
          <h2 className="cta-title mt-6">
            무료특강 신청이 완료되었습니다
          </h2>
          <p className="mx-auto mt-5 max-w-2xl break-keep leading-7 text-white/52">
            일정과 참여 방법은 입력하신 연락처로 안내드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/insights" className="cta-secondary">
              틱톡커머스 인사이트 보기
            </Link>
            <Link
              href="/live-agency"
              className="cta-primary"
              onClick={() => trackFreeClassEvent("live_agency_click", { label: "success_screen" })}
            >
              라이브 에이전시 살펴보기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="free-class-form" className="scroll-mt-24 border-y border-white/8 bg-[#08090b]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-black tracking-[.16em] text-[#25f4ee]">EARLY APPLICATION</p>
          <h2 className="panel-title mt-4">
            무료특강 사전 신청
          </h2>
          <p className="mt-5 max-w-md break-keep leading-7 text-white/52">
            신청 정보를 남겨주시면 일정과 참여 방법을 우선 안내해드립니다.
          </p>
          <div className="mt-7 rounded-2xl border border-[#25f4ee]/22 bg-[#25f4ee]/6 p-5 text-sm leading-6 text-white/58">
            <AlertCircle className="mb-3 size-5 text-[#25f4ee]" aria-hidden="true" />
            현재 저장 시스템이 연결되지 않아 입력 정보는 서버나 외부 서비스로 전송되지 않습니다.
            실제 접수 연결 전에는 완료 화면도 표시하지 않습니다.
          </div>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/9 bg-white/[.03] p-5 text-sm leading-6 text-white/45">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#25f4ee]" aria-hidden="true" />
            <span>
              비밀키는 브라우저에 저장하지 않으며, 추후 서버 기반 저장 함수만 교체할 수 있도록
              분리했습니다.
            </span>
          </div>
        </div>

        <form
          onSubmit={submit}
          onFocusCapture={markStarted}
          onChange={clearFieldError}
          className="rounded-3xl border border-white/10 bg-[#101216] p-5 shadow-2xl sm:p-8"
          noValidate
          aria-label="무료특강 사전 신청 폼"
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/8 pb-5">
            <span className="text-sm font-black">신청자 정보</span>
            <span className="text-xs text-white/35">
              <em className="not-italic text-[#fe2c55]">*</em> 필수 입력
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="이름" error={errors.name} required>
              <Input
                id="free-class-name"
                name="name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "free-class-name-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="phone" label="휴대전화 번호" error={errors.phone} required>
              <Input
                id="free-class-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="숫자와 하이픈을 사용할 수 있습니다"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "free-class-phone-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="email" label="이메일" error={errors.email} required>
              <Input
                id="free-class-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "free-class-email-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="company" label="회사 또는 브랜드명" error={errors.company} required>
              <Input
                id="free-class-company"
                name="company"
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "free-class-company-error" : undefined}
                className={fieldClass}
              />
            </Field>
            <Field id="userType" label="현재 활동 유형" error={errors.userType} required>
              <NativeSelect
                id="free-class-userType"
                name="userType"
                aria-invalid={Boolean(errors.userType)}
                aria-describedby={errors.userType ? "free-class-userType-error" : undefined}
                className="w-full [&_select]:h-12 [&_select]:border-white/12 [&_select]:bg-black/25 [&_select]:px-3"
              >
                <NativeSelectOption value="">선택해 주세요</NativeSelectOption>
                {userTypeOptions.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field id="tiktokStatus" label="틱톡 운영 여부" optional>
              <NativeSelect
                id="free-class-tiktokStatus"
                name="tiktokStatus"
                className="w-full [&_select]:h-12 [&_select]:border-white/12 [&_select]:bg-black/25 [&_select]:px-3"
              >
                <NativeSelectOption value="">선택해 주세요</NativeSelectOption>
                {["운영 전", "개설했지만 운영 전", "콘텐츠 운영 중", "라이브 운영 중"].map(
                  (option) => (
                    <NativeSelectOption key={option} value={option}>
                      {option}
                    </NativeSelectOption>
                  ),
                )}
              </NativeSelect>
            </Field>
            <Field id="product" label="보유 상품 또는 서비스" optional>
              <Input id="free-class-product" name="product" className={fieldClass} />
            </Field>
            <Field id="salesChannels" label="현재 판매 채널" optional>
              <Input
                id="free-class-salesChannels"
                name="salesChannels"
                placeholder="자사몰, 오픈마켓, 오프라인 등"
                className={fieldClass}
              />
            </Field>
          </div>

          <fieldset
            className="mt-6"
            aria-describedby={errors.interests ? "free-class-interests-error" : undefined}
          >
            <legend className="text-sm font-bold">
              가장 관심 있는 분야 <em className="ml-1 not-italic text-[#fe2c55]">*</em>
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {interestOptions.map((option, index) => (
                <label
                  key={option}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-white/9 bg-black/18 px-3 text-sm text-white/58 transition hover:border-white/20 focus-within:ring-2 focus-within:ring-[#25f4ee]/35"
                >
                  <input
                    id={index === 0 ? "free-class-interests" : undefined}
                    type="checkbox"
                    name="interests"
                    value={option}
                    className="size-5 shrink-0 accent-[#fe2c55]"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.interests ? (
              <p id="free-class-interests-error" className="mt-2 text-xs font-bold text-[#ff6f91]">
                {errors.interests}
              </p>
            ) : null}
          </fieldset>

          <div className="mt-6 grid gap-5">
            <Field id="challenge" label="현재 가장 큰 고민" optional>
              <Textarea
                id="free-class-challenge"
                name="challenge"
                className="min-h-28 border-white/12 bg-black/25 px-3 py-3 text-sm focus-visible:border-[#25f4ee] focus-visible:ring-[#25f4ee]/20"
                placeholder="콘텐츠, 상품, 라이브 운영에서 막히는 지점을 알려주세요"
              />
            </Field>
            <Field id="consultationType" label="상담 희망 여부" optional>
              <NativeSelect
                id="free-class-consultationType"
                name="consultationType"
                className="w-full [&_select]:h-12 [&_select]:border-white/12 [&_select]:bg-black/25 [&_select]:px-3"
              >
                <NativeSelectOption value="">선택해 주세요</NativeSelectOption>
                {consultationOptions.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
          </div>

          <div className="mt-7 space-y-3 border-t border-white/8 pt-6">
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg p-2 text-sm leading-6 text-white/58 focus-within:ring-2 focus-within:ring-[#25f4ee]/40">
              <input
                id="free-class-privacyConsent"
                type="checkbox"
                name="privacyConsent"
                className="mt-0.5 size-5 shrink-0 accent-[#fe2c55]"
                aria-invalid={Boolean(errors.privacyConsent)}
                aria-describedby={
                  errors.privacyConsent ? "free-class-privacyConsent-error" : undefined
                }
              />
              <span>
                <strong className="text-[#fe6d8e]">[필수]</strong> 개인정보 수집·이용에 동의합니다.
              </span>
            </label>
            {errors.privacyConsent ? (
              <p
                id="free-class-privacyConsent-error"
                className="pl-10 text-xs font-bold text-[#ff6f91]"
              >
                {errors.privacyConsent}
              </p>
            ) : null}
            <details className="rounded-xl border border-white/9 bg-black/18 p-4 text-sm text-white/48">
              <summary className="min-h-8 cursor-pointer font-bold text-white/70">
                개인정보 수집·이용 내용 보기
              </summary>
              <dl className="mt-4 grid gap-3 text-xs leading-6">
                <div>
                  <dt className="font-bold text-white/70">수집 항목</dt>
                  <dd>
                    이름, 휴대전화 번호, 이메일, 회사·브랜드명, 활동 유형, 관심 분야 및 신청자가
                    입력한 선택 정보
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-white/70">이용 목적</dt>
                  <dd>무료특강 일정·참여 방법 안내 및 신청자가 선택한 상담 요청 확인</dd>
                </div>
                <div>
                  <dt className="font-bold text-white/70">보유 기간</dt>
                  <dd>
                    {freeClassConfig.privacyRetentionPeriod ??
                      "현재 저장 기능이 연결되지 않아 서버에 보유하지 않습니다. 저장 기능 연결 전 실제 보유 기간을 확정해 고지해야 합니다."}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-white/70">동의 거부 권리</dt>
                  <dd>
                    동의를 거부할 수 있으나 필수 정보 수집에 동의하지 않으면 특강 신청이 제한됩니다.
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
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg p-2 text-sm leading-6 text-white/50 focus-within:ring-2 focus-within:ring-[#25f4ee]/40">
              <input
                type="checkbox"
                name="marketingConsent"
                className="mt-0.5 size-5 shrink-0 accent-[#25f4ee]"
              />
              <span>
                <strong className="text-white/65">[선택]</strong> 향후 특강·교육·서비스 관련 마케팅
                안내 수신에 동의합니다.
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
            disabled={isSubmitting || !freeClassConfig.applicationOpen}
            className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#fe174f] px-5 text-base font-black transition hover:bg-[#ff3767] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25f4ee] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> 확인 중
              </>
            ) : (
              <>
                {freeClassConfig.applicationOpen ? "무료특강 신청 정보 확인" : "현재 신청 마감"}{" "}
                <Send className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function validateApplication(data: FormData) {
  const next: FormErrors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const company = String(data.get("company") ?? "").trim();
  const userType = String(data.get("userType") ?? "").trim();
  if (!name) next.name = "이름을 입력해 주세요.";
  if (!phone) next.phone = "휴대전화 번호를 입력해 주세요.";
  else if (!phonePattern.test(phone)) next.phone = "휴대전화 번호 형식을 확인해 주세요.";
  if (!email) next.email = "이메일을 입력해 주세요.";
  else if (!emailPattern.test(email)) next.email = "이메일 형식을 확인해 주세요.";
  if (!company) next.company = "회사 또는 브랜드명을 입력해 주세요.";
  if (!userType) next.userType = "현재 활동 유형을 선택해 주세요.";
  if (!data.getAll("interests").length) next.interests = "관심 분야를 하나 이상 선택해 주세요.";
  if (data.get("privacyConsent") !== "on")
    next.privacyConsent = "개인정보 수집·이용 동의가 필요합니다.";
  return next;
}

function optionalValue(data: FormData, name: string) {
  const value = String(data.get(name) ?? "").trim();
  return value || undefined;
}

function safeReferrer(value: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.origin === window.location.origin ? url.pathname : url.origin;
  } catch {
    return undefined;
  }
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={`free-class-${id}`}>
      <span className="mb-2 flex items-center gap-1 text-sm font-bold">
        {label}
        {required ? <em className="not-italic text-[#fe2c55]">*</em> : null}
        {optional ? <small className="ml-1 font-medium text-white/28">선택</small> : null}
      </span>
      {children}
      {error ? (
        <span id={`free-class-${id}-error`} className="mt-2 block text-xs font-bold text-[#ff6f91]">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
