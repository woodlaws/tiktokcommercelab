import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell'; import { LeadForm } from '@/components/lead-form';
export const metadata:Metadata={title:'셀러 등록 | 틱톡커머스랩',description:'라이브 셀러 교육과 프로젝트 참여를 위한 사전 등록 페이지입니다.',alternates:{canonical:'/contact/seller'}};
export default function Page(){return <SiteShell><section className="mx-auto max-w-[1100px] px-5 py-20 lg:px-10 lg:py-28"><LeadForm kind="seller"/></section></SiteShell>}
