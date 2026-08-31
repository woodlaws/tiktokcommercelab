import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tiktok-commerce-lab.geosangbruce.chatgpt.site'),
  title: { default:'틱톡커머스랩 | 라이브커머스 교육·컨설팅·운영', template:'%s | 틱톡커머스랩' },
  description: '틱톡샵, 라이브, 숏폼, 광고, 셀러 육성을 연결하는 독립 틱톡커머스 전문 플랫폼입니다.',
  alternates: { canonical:'/' },
  openGraph: { title:'틱톡커머스랩', description:'월 10억의 라이브 경험을 커머스 시스템으로', type:'website', locale:'ko_KR', siteName:'틱톡커머스랩', images:[{url:'/og.png',width:1200,height:630,alt:'틱톡커머스랩'}] },
  twitter: { card:'summary_large_image', title:'틱톡커머스랩', description:'월 10억의 라이브 경험을 커머스 시스템으로', images:['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className="dark"><body>{children}</body></html>;
}
