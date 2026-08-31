export type FreeClassApplication = {
  name: string;
  phone: string;
  email: string;
  company: string;
  userType: string;
  interests: string[];
  product?: string;
  salesChannels?: string;
  tiktokStatus?: string;
  challenge?: string;
  consultationType?: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  createdAt: string;
};

export type FreeClassSubmissionResult =
  | { ok: true; applicationId: string }
  | { ok: false; reason: 'not_configured' | 'request_failed'; message: string };

export async function submitFreeClassApplication(_application: FreeClassApplication): Promise<FreeClassSubmissionResult> {
  // Supabase, Google Sheets, Notion 또는 서버 웹훅 연결 시 이 함수 내부만 교체합니다.
  // 현재는 저장 시스템이 없으므로 성공 상태나 신청 번호를 생성하지 않습니다.
  return {
    ok: false,
    reason: 'not_configured',
    message: '현재 신청 저장 시스템이 연결되지 않아 입력 내용이 전송되거나 저장되지 않았습니다. 운영 연결 후 실제 접수가 활성화됩니다.',
  };
}
