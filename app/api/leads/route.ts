import { NextResponse } from 'next/server';
import { isLeadType, validateLeadPayload, type LeadApiResult, type LeadPayload } from '@/lib/lead-data';
import { persistLead } from '@/lib/server/lead-storage';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return respond({ ok: false, reason: 'spam_detected', message: '요청 출처를 확인할 수 없습니다.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return respond({ ok: false, reason: 'validation_failed', message: '지원하지 않는 요청 형식입니다.' }, 415);
  const raw = await request.text();
  if (raw.length > 20_000) return respond({ ok: false, reason: 'validation_failed', message: '입력 가능한 범위를 초과했습니다.' }, 413);
  let input: Partial<LeadPayload>;
  try { input = JSON.parse(raw) as Partial<LeadPayload>; } catch { return respond({ ok: false, reason: 'validation_failed', message: '요청 내용을 확인할 수 없습니다.' }, 400); }
  if (input.websiteConfirmation || !input.startedAt || Date.now() - input.startedAt < 2_000 || input.startedAt > Date.now()) return respond({ ok: false, reason: 'spam_detected', message: '자동화 요청으로 판단되어 처리하지 않았습니다.' }, 400);
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now(); const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (attempts.size > 1_000) for (const [candidate, times] of attempts) if (!times.some((time) => now - time < WINDOW_MS)) attempts.delete(candidate);
  if (recent.length >= MAX_ATTEMPTS) return respond({ ok: false, reason: 'rate_limited', message: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' }, 429);
  attempts.set(key, [...recent, now]);
  const errors = validateLeadPayload(input);
  if (Object.keys(errors).length || !isLeadType(input.type)) return respond({ ok: false, reason: 'validation_failed', message: '필수 항목과 입력 형식을 확인해 주세요.', errors }, 400);
  const payload = input as LeadPayload;
  const stored = await persistLead(payload);
  if (!stored.ok) return respond({ ok: false, reason: 'not_configured', message: '현재 상담 저장 시스템이 연결되지 않아 입력 내용은 저장되지 않았습니다. 운영 연결 후 실제 접수가 활성화됩니다.' }, 503);
  return respond({ ok: true, leadId: stored.leadId }, 201);
}

function respond(result: LeadApiResult, status: number) { return NextResponse.json(result, { status, headers: { 'Cache-Control': 'no-store' } }); }
