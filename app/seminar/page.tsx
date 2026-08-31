import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell'; import { LeadForm } from '@/components/lead-form';
export const metadata:Metadata={title:'무료특강 신청 | 틱톡커머스랩',description:'틱톡샵 한국과 라이브커머스 준비 무료특강을 신청하세요.',alternates:{canonical:'/seminar'}};
export default function Page(){return <SiteShell><section className="mx-auto max-w-[1100px] px-5 py-20 lg:px-10 lg:py-28"><LeadForm kind="seminar"/></section></SiteShell>}
