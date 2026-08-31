import type { LeadPayload } from '@/lib/lead-data';

export type LeadStorageResult = { ok: true; leadId: string } | { ok: false; reason: 'not_configured' | 'storage_failed' };

export async function persistLead(_lead: LeadPayload): Promise<LeadStorageResult> {
  // 실제 운영 저장소가 결정되면 이 서버 전용 함수 안에서만 연결합니다.
  // 관리자 키·웹훅 시크릿은 Vercel 서버 환경변수로 주입하고 클라이언트 번들에 포함하지 않습니다.
  // 저장 성공과 영구 ID가 확인된 경우에만 { ok: true, leadId }를 반환해야 합니다.
  return { ok: false, reason: 'not_configured' };
}
