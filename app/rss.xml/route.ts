import { publishedInsightPosts } from '@/lib/insights-data';
import { site } from '@/lib/site-data';

export function GET() {
  const items = publishedInsightPosts.map((post) => `<item><title><![CDATA[${post.title}]]></title><link>${site.url}/insights/${post.slug}</link><guid isPermaLink="true">${site.url}/insights/${post.slug}</guid><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate><category><![CDATA[${post.category.name}]]></category><description><![CDATA[${post.summary}]]></description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${site.name} 커머스 인사이트</title><link>${site.url}/insights</link><atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/><description>${site.description}</description><language>ko-KR</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } });
}
