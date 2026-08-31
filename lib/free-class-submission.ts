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
  startedAt: number;
};

export type FreeClassSubmissionResult =
  | { ok: true; applicationId: string }
  | { ok: false; reason: 'not_configured' | 'request_failed'; message: string };

export async function submitFreeClassApplication(application: FreeClassApplication): Promise<FreeClassSubmissionResult> {
  const { submitLead } = await import('@/lib/lead-submission');
  const result = await submitLead({ type: 'free-class', name: application.name, phone: application.phone, email: application.email, organization: application.company, role: application.userType, product: application.product, currentChannel: application.salesChannels, goal: application.challenge || `관심 분야: ${application.interests.join(', ')}`, privacyConsent: application.privacyConsent, marketingConsent: application.marketingConsent, sourcePath: '/free-class', referrer: application.referrer, campaign: { source: application.utmSource, medium: application.utmMedium, campaign: application.utmCampaign }, context: { interests: application.interests, tiktokStatus: application.tiktokStatus ?? '', consultationType: application.consultationType ?? '' }, startedAt: application.startedAt });
  if (result.ok) return { ok: true, applicationId: result.leadId };
  return { ok: false, reason: result.reason === 'not_configured' ? 'not_configured' : 'request_failed', message: result.message };
}
