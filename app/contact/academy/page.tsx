import type { Metadata } from 'next';
import { LeadForm } from '@/components/lead-form';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: '셀러 아카데미 사전등록 | 틱톡커머스랩',
  description: '틱톡커머스 셀러 실전 아카데미 과정 안내를 위한 사전등록 및 교육 상담 페이지입니다.',
  alternates: { canonical: '/contact/academy' },
};

export default function AcademyContactPage() {
  return <SiteShell><section className="mx-auto max-w-[1100px] px-5 py-20 lg:px-10 lg:py-28"><LeadForm kind="academy" /></section></SiteShell>;
}
