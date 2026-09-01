import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tiktokcommercelab.vercel.app'),
  title: { default:'틱톡커머스랩 | 틱톡샵·숏폼·라이브커머스', template:'%s | 틱톡커머스랩' },
  description: '틱톡샵, 숏폼 콘텐츠, 라이브커머스, 크리에이터, 광고와 교육을 연결하는 독립 틱톡커머스 전문 플랫폼입니다.',
  alternates: { canonical:'/' },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: { title:'틱톡커머스랩 | 틱톡샵·숏폼·라이브커머스', description:'틱톡샵, 숏폼 콘텐츠, 라이브커머스, 크리에이터, 광고와 교육을 연결하는 독립 틱톡커머스 전문 플랫폼입니다.', url:'/', type:'website', locale:'ko_KR', siteName:'틱톡커머스랩', images:[{url:'/og-tiktok-commerce-lab.png',width:1200,height:630,alt:'틱톡커머스랩'}] },
  twitter: { card:'summary_large_image', title:'틱톡커머스랩', description:'틱톡샵·숏폼·라이브·크리에이터·광고·교육', images:['/og-tiktok-commerce-lab.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className="dark"><body>{children}</body></html>;
}
