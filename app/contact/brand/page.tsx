import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell'; import { LeadForm } from '@/components/lead-form';
export const metadata:Metadata={title:'브랜드 상담 | 틱톡커머스랩',description:'틱톡샵 진출과 라이브커머스 운영을 위한 브랜드 상담을 신청하세요.',alternates:{canonical:'/contact/brand'}};
export default function Page(){return <SiteShell><section className="mx-auto max-w-[1100px] px-5 py-20 lg:px-10 lg:py-28"><LeadForm kind="brand"/></section></SiteShell>}
