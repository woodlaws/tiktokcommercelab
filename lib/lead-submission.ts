import type { LeadApiResult, LeadPayload } from '@/lib/lead-data';

export async function submitLead(payload: LeadPayload): Promise<LeadApiResult> {
  try {
    const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), credentials: 'same-origin' });
    const result = await response.json() as LeadApiResult;
    return result;
  } catch {
    return { ok: false, reason: 'request_failed', message: '요청을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }
}
