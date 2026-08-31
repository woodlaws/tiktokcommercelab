export type FreeClassEventName =
  | 'free_class_view'
  | 'free_class_cta_click'
  | 'free_class_form_start'
  | 'free_class_form_submit'
  | 'free_class_form_success'
  | 'free_class_form_error'
  | 'instructor_channel_click'
  | 'live_agency_click';

export function trackFreeClassEvent(name: FreeClassEventName, detail: Record<string, string | boolean> = {}) {
  if (typeof window === 'undefined') return;

  // 분석 도구를 연결할 때 이 사용자 정의 이벤트를 GTM, GA4 등의 어댑터에서 수신합니다.
  window.dispatchEvent(new CustomEvent('tiktok-commerce-lab:analytics', { detail: { name, ...detail } }));
}
