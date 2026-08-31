import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ShareButton } from "@/components/share-button";
import { posts, site } from "@/lib/site-data";
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${site.name}`,
    description: post.summary,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `/insights/${slug}`,
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];
  if (!post) notFound();
  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/insights/${slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: site.url },
      { "@type": "ListItem", position: 2, name: "커머스 인사이트", item: `${site.url}/insights` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/insights/${slug}` },
    ],
  };
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <article>
        <header className="border-b border-white/8">
          <div className="mx-auto max-w-[900px] px-5 py-16 lg:px-10 lg:py-24">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"
            >
              <ArrowLeft className="size-4" />
              인사이트 목록
            </Link>
            <p className="mt-10 text-xs font-black text-[#25f4ee]">{post.category}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.16] tracking-[-.045em] sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/54">{post.summary}</p>
            <div className="mt-7 flex items-center gap-4 text-sm text-white/35">
              <time>{post.date}</time>
              <span>{post.readTime}</span>
              <ShareButton title={post.title} />
            </div>
          </div>
        </header>
        <div className="mx-auto grid max-w-[1000px] gap-10 px-5 py-14 lg:grid-cols-[220px_1fr] lg:px-10">
          <aside>
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <strong className="text-sm">목차</strong>
              <ol className="mt-4 space-y-3 text-sm text-white/44">
                {post.body.map((_, i) => (
                  <li key={i}>
                    <a href={`#section-${i + 1}`}>
                      {i + 1}. 핵심 내용 {i + 1}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div>
            <div className="rounded-2xl border border-[#25f4ee]/22 bg-[#25f4ee]/6 p-6">
              <h2 className="font-black text-[#88fffb]">핵심 요약</h2>
              <ul className="mt-4 space-y-3">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-white/65">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#25f4ee]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {post.body.map((text, i) => (
              <section key={i} id={`section-${i + 1}`} className="scroll-mt-28 pt-10">
                <h2 className="text-2xl font-black">
                  {i + 1}. {["먼저 확인할 기준", "실행을 위한 준비", "운영에 반영하는 방법"][i]}
                </h2>
                <p className="mt-5 text-[17px] leading-8 text-white/67">{text}</p>
              </section>
            ))}
            <section className="mt-12 border-t border-white/10 pt-8">
              <h2 className="font-black">출처·확인 안내</h2>
              {post.sources.map((source) => (
                <p key={source} className="mt-3 text-sm leading-6 text-white/43">
                  {source}
                </p>
              ))}
            </section>
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {index > 0 && (
                <Link
                  href={`/insights/${posts[index - 1].slug}`}
                  className="rounded-xl border border-white/10 p-4 text-sm text-white/55"
                >
                  ← 이전 글<br />
                  <strong className="mt-1 block text-white">{posts[index - 1].title}</strong>
                </Link>
              )}
              {index < posts.length - 1 && (
                <Link
                  href={`/insights/${posts[index + 1].slug}`}
                  className="rounded-xl border border-white/10 p-4 text-right text-sm text-white/55"
                >
                  다음 글 →<br />
                  <strong className="mt-1 block text-white">{posts[index + 1].title}</strong>
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
      <section className="mx-auto max-w-[1000px] px-5 pb-16 lg:px-10">
        <div className="rounded-3xl border border-[#fe2c55]/30 bg-[#fe2c55]/8 p-8 text-center">
          <h2 className="text-2xl font-black">읽는 것에서 실행으로 옮기세요.</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/free-class" className="cta-primary">
              무료특강 신청
            </Link>
            <Link href="/contact/brand" className="cta-secondary">
              브랜드 상담
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-black">관련 글</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/insights/${item.slug}`}
                  className="rounded-xl border border-white/10 p-5"
                >
                  <span className="text-xs text-[#25f4ee]">{item.category}</span>
                  <strong className="mt-2 block">{item.title}</strong>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
