'use client';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useRef } from 'react';
import { brochures } from '@/lib/content';

export function BrochureGrid({compact=false}:{compact?:boolean}){
  const ref=useRef<HTMLDivElement>(null);
  const move=(dir:number)=>ref.current?.scrollBy({left:dir*340,behavior:'smooth'});
  return <div><div ref={ref} className="brochure-scroll flex snap-x gap-5 overflow-x-auto pb-4">{brochures.map((b,i)=><article key={b.src} className={`card min-w-[82vw] snap-start overflow-hidden bg-[#f6f2e9] sm:min-w-[360px] ${compact?'lg:min-w-[300px]':'lg:min-w-[380px]'}`}><div className="relative aspect-[4/5]"><Image src={b.src} alt={b.alt} fill className="object-cover" sizes="(max-width: 640px) 82vw, 380px" priority={i===0}/></div><div className="flex items-center justify-between gap-4 p-4"><div><p className="text-[10px] font-black uppercase tracking-widest text-[#9f7d3d]">Brosur {String(i+1).padStart(2,'0')}</p><p className="mt-1 text-sm font-black">{b.title}</p></div><a href={b.src} target="_blank" rel="noreferrer" aria-label={`Buka ${b.title}`} className="grid size-10 place-items-center rounded-full border border-black/10"><ExternalLink size={16}/></a></div></article>)}</div><div className="mt-4 flex gap-2"><button onClick={()=>move(-1)} aria-label="Geser brosur ke kiri" className="grid size-10 place-items-center rounded-full border border-black/15"><ArrowLeft size={16}/></button><button onClick={()=>move(1)} aria-label="Geser brosur ke kanan" className="grid size-10 place-items-center rounded-full border border-black/15"><ArrowRight size={16}/></button></div></div>
}
