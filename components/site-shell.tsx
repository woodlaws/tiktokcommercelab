import Link from 'next/link';
import { Menu, ArrowRight } from 'lucide-react';
import { navigation, site } from '@/lib/site-data';

export function Header() {
  return (
    <>
      <div className="border-b border-white/7 bg-black px-4 py-2 text-center text-[10px] leading-4 text-white/42 sm:text-xs">{site.notice}</div>
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050607]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/68 xl:flex" aria-label="주요 메뉴">{navigation.map(item=><Link key={item.href} href={item.href} className="transition hover:text-white">{item.label}</Link>)}</nav>
          <div className="flex items-center gap-2">
            <Link href="/free-class" className="hidden rounded-lg bg-[#fe174f] px-5 py-3 text-sm font-extrabold shadow-[0_0_30px_rgba(254,23,79,.2)] transition hover:bg-[#ff3767] sm:inline-flex">무료특강 신청</Link>
            <details className="group relative xl:hidden"><summary className="grid size-11 cursor-pointer list-none place-items-center rounded-lg border border-white/14 bg-white/5" aria-label="메뉴 열기"><Menu className="size-5"/></summary><nav className="absolute right-0 top-14 grid w-[min(82vw,330px)] gap-1 rounded-2xl border border-white/10 bg-[#0c0e12] p-3 shadow-2xl">{navigation.map(item=><Link key={item.href} href={item.href} className="rounded-lg px-4 py-3 text-sm font-bold hover:bg-white/7">{item.label}</Link>)}<Link href="/experts" className="rounded-lg px-4 py-3 text-sm font-bold hover:bg-white/7">전문가 소개</Link><Link href="/about" className="rounded-lg px-4 py-3 text-sm font-bold hover:bg-white/7">회사 소개</Link><Link href="/free-class" className="cta-primary mt-2">무료특강 신청 <ArrowRight className="size-4"/></Link></nav></details>
          </div>
        </div>
      </header>
    </>
  );
}

export function Logo() { return <Link href="/" className="leading-none" aria-label="틱톡커머스랩 홈"><span className="block text-[15px] font-black tracking-[-.03em]">TIKTOK COMMERCE LAB</span><span className="mt-1 block text-[11px] font-semibold text-white/50">틱톡커머스랩</span></Link>; }

export function Footer() {
  return <footer className="border-t border-white/10 bg-[#030405]"><div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] lg:px-10"><div><Logo/><p className="mt-5 max-w-md text-sm leading-7 text-white/44">{site.description}</p><p className="mt-4 text-xs leading-6 text-white/34">{site.notice}</p></div><div><h3 className="text-sm font-bold">바로가기</h3><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/48"><Link href="/about">회사 소개</Link><Link href="/experts">전문가 소개</Link><Link href="/insights">인사이트</Link><Link href="/free-class">무료특강</Link><Link href="/contact/brand">브랜드 상담</Link><Link href="/contact/seller">셀러 등록</Link></div></div><div><h3 className="text-sm font-bold">사업자정보</h3><dl className="mt-4 space-y-2 text-sm text-white/44"><div><dt className="inline">이메일 </dt><dd className="inline">{site.email}</dd></div><div><dt className="inline">전화 </dt><dd className="inline">{site.phone}</dd></div><div><dt className="inline">주소 </dt><dd className="inline">{site.address}</dd></div></dl><div className="mt-4 flex gap-4 text-xs text-white/40"><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link></div></div></div><div className="border-t border-white/7 px-5 py-5 text-center text-xs text-white/30">© 2026 TIKTOK COMMERCE LAB. All rights reserved.</div></footer>;
}

export function SiteShell({ children }:{children:React.ReactNode}) { return <><Header/><main>{children}</main><Footer/></>; }
