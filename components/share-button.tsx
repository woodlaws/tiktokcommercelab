'use client';
import { Share2 } from 'lucide-react';
export function ShareButton({title}:{title:string}){async function share(){const data={title,url:window.location.href};if(navigator.share)await navigator.share(data);else await navigator.clipboard.writeText(window.location.href)}return <button onClick={share} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/12 px-4 text-sm font-bold text-white/65 hover:text-white"><Share2 className="size-4"/>공유</button>}
