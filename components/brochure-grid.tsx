'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { brochures as fallbackBrochures } from '@/lib/content';
import { createSupabaseClient } from '@/lib/supabase';
import { whatsappUrl } from '@/lib/site';

type Brochure = { id?: number; src: string; title: string; alt: string; caption?: string | null };

export function BrochureGrid({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Brochure[]>(fallbackBrochures);
  const move = (dir: number) => ref.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('brochures').select('id,title,image_url,alt_text,caption').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data?.length) setItems(data.map(row => ({ id: row.id, src: row.image_url, title: row.title, alt: row.alt_text || row.title, caption: row.caption })));
    });
  }, []);

  return <div>
    <div ref={ref} className="brochure-scroll flex snap-x gap-5 overflow-x-auto pb-5">
      {items.map((b, i) => <article key={b.id ?? b.src} className={`group min-w-[82vw] snap-start overflow-hidden rounded-2xl border border-[#b8903a]/25 bg-[#0a1420] shadow-2xl shadow-black/20 sm:min-w-[360px] ${compact ? 'lg:min-w-[300px]' : 'lg:min-w-[380px]'}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
          <Image src={b.src} alt={b.alt} fill className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 82vw, 380px" priority={i === 0}/>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#04080e]/80 to-transparent"/>
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#07131f]/90 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#d3ab5a] backdrop-blur">Produk {String(i + 1).padStart(2, '0')}</span>
        </div>
        <div className="p-5 text-white">
          <p className="serif text-xl font-bold text-[#f5e9c8]">{b.title}</p>
          {b.caption && <p className="mt-2 min-h-12 text-[11px] leading-5 text-slate-400">{b.caption}</p>}
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
            <a href={b.src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#d3ab5a]"><ExternalLink size={14}/> Perbesar HD</a>
            <a href={whatsappUrl(`Assalamu'alaikum Barokah Group, saya ingin tanya tentang ${b.title}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[10px] font-black text-white"><MessageCircle size={14}/> Tanya WA</a>
          </div>
        </div>
      </article>)}
    </div>
    <div className="mt-1 flex gap-2"><button onClick={() => move(-1)} aria-label="Geser produk ke kiri" className="grid size-10 place-items-center rounded-xl border border-[#b8903a]/30 bg-[#07131f] text-[#d3ab5a] transition hover:bg-[#142132]"><ArrowLeft size={16}/></button><button onClick={() => move(1)} aria-label="Geser produk ke kanan" className="grid size-10 place-items-center rounded-xl border border-[#b8903a]/30 bg-[#07131f] text-[#d3ab5a] transition hover:bg-[#142132]"><ArrowRight size={16}/></button></div>
  </div>;
}
