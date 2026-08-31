'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { trackFreeClassEvent, type FreeClassEventName } from '@/lib/free-class-analytics';

export function TrackedAnchor({ href, className, children, eventName = 'free_class_cta_click', label }: { href: string; className?: string; children: React.ReactNode; eventName?: FreeClassEventName; label: string }) {
  return <a href={href} className={className} onClick={() => trackFreeClassEvent(eventName, { label })}>{children}</a>;
}

export function InstructorChannelLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/12 bg-white/[.035] px-4 text-sm font-extrabold text-white/68 transition hover:border-[#25f4ee]/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25f4ee]" onClick={() => trackFreeClassEvent('instructor_channel_click', { href })}>{children}<ExternalLink className="size-4" aria-hidden="true" /></a>;
}

export function FreeClassStickyCta() {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    trackFreeClassEvent('free_class_view');
    const form = document.getElementById('free-class-form');
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (formVisible) return null;

  return <a href="#free-class-form" className="fixed inset-x-4 bottom-4 z-40 flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#fe174f] px-5 text-base font-black text-white shadow-[0_18px_55px_rgba(0,0,0,.5),0_0_35px_rgba(254,23,79,.25)] transition hover:bg-[#ff3767] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25f4ee] md:inset-x-auto md:bottom-6 md:right-6 md:min-w-56" onClick={() => trackFreeClassEvent('free_class_cta_click', { label: 'sticky_cta' })}>무료특강 신청 <ArrowRight className="size-4" aria-hidden="true" /></a>;
}
