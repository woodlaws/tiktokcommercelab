import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/content-page';
import { pageContent, site } from '@/lib/site-data';

export function generateStaticParams() { return Object.keys(pageContent).map(section=>({section})); }
export async function generateMetadata({params}:{params:Promise<{section:string}>}):Promise<Metadata>{ const {section}=await params; const content=pageContent[section]; if(!content) return {}; return {title:`${content.title} | ${site.name}`,description:content.description,alternates:{canonical:`/${section}`},openGraph:{title:content.title,description:content.description,type:'website',url:`/${section}`},twitter:{card:'summary_large_image',title:content.title,description:content.description}}; }
export default async function SectionPage({params}:{params:Promise<{section:string}>}) { const {section}=await params; const content=pageContent[section]; if(!content) notFound(); return <ContentPage content={content}/>; }
