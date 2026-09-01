import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content-page';
import { pageContent, site } from '@/lib/site-data';

export function generateStaticParams() { return Object.keys(pageContent).filter((section) => section !== 'brand-growth').map(section=>({section})); }
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{ const {section}=await params; const content=pageContent[section]; if(!content) return {}; return {title:`${content.title} | ${site.name}`,description:content.description,alternates:{canonical:`/${section}`},openGraph:{title:content.title,description:content.description,type:'website',url:`/${section}`,locale:'ko_KR',siteName:site.name,images:[{url:'/og-tiktok-commerce-lab.png',width:1200,height:630,alt:site.name}]},twitter:{card:'summary_large_image',title:content.title,description:content.description,images:['/og-tiktok-commerce-lab.png']}}; }
export default async function SectionPage({params}:{params:Promise<{section:string}>}) { const {section}=await params; const content=pageContent[section]; if(!content) notFound(); return <ContentPage content={content}/>; }
