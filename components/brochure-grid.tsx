'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { brochures as fallbackBrochures } from '@/lib/content';
import { createSupabaseClient } from '@/lib/supabase';

type Brochure = { id?: number; src: string; title: string; alt: string };

export function BrochureGrid({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Brochure[]>(fallbackBrochures);
  const move = (dir: number) => ref.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('brochures').select('id,title,image_url,alt_text').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data?.length) setItems(data.map(row => ({ id: row.id, src: row.image_url, title: row.title, alt: row.alt_text || row.title })));
    });
  }, []);

  return <div>
    <div ref={ref} className="brochure-scroll flex snap-x gap-5 overflow-x-auto pb-5">
      {items.map((b, i) => <article key={b.id ?? b.src} className={`group min-w-[82vw] snap-start overflow-hidden rounded-2xl border border-[#b8903a]/25 bg-[#0a1420] shadow-2xl shadow-black/20 sm:min-w-[360px] ${compact ? 'lg:min-w-[300px]' : 'lg:min-w-[380px]'}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
          <Image src={b.src} alt={b.alt} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width: 640px) 82vw, 380px" priority={i === 0}/>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04080e]/80 to-transparent"/>
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#07131f]/85 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#d3ab5a] backdrop-blur">Produk {String(i + 1).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 text-white">
          <div><p className="serif text-xl font-bold text-[#f5e9c8]">{b.title}</p><p className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">Barokah Group</p></div>
          <a href={b.src} target="_blank" rel="noreferrer" aria-label={`Buka ${b.title}`} className="grid size-10 place-items-center rounded-xl border border-[#b8903a]/30 text-[#d3ab5a] transition hover:bg-[#b8903a]/10"><ExternalLink size={16}/></a>
        </div>
      </article>)}
    </div>
    <div className="mt-1 flex gap-2"><button onClick={() => move(-1)} aria-label="Geser produk ke kiri" className="grid size-10 place-items-center rounded-xl border border-[#b8903a]/30 bg-[#07131f] text-[#d3ab5a] transition hover:bg-[#142132]"><ArrowLeft size={16}/></button><button onClick={() => move(1)} aria-label="Geser produk ke kanan" className="grid size-10 place-items-center rounded-xl border border-[#b8903a]/30 bg-[#07131f] text-[#d3ab5a] transition hover:bg-[#142132]"><ArrowRight size={16}/></button></div>
  </div>;
}
