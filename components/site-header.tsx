'use client';

import Link from 'next/link';
import { Building2, Calculator, CircleHelp, Instagram, Landmark, Menu, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import { whatsappUrl } from '@/lib/site';
import { DynamicAnnouncement } from '@/components/dynamic-announcement';

const nav = [
  ['Produk & Brosur', '/promo-brosur'],
  ['Layanan', '/#layanan'],
  ['Visa', '/visa'],
  ['Bagasi Cairo', '/bagasi-cairo-jakarta'],
  ['Untuk Travel', '/b2b'],
  ['Pertanyaan Umum', '/faq'],
  ['Tentang', '/tentang'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="relative z-50 overflow-hidden border-b border-white/5 bg-[#04080e] text-white">
      <div className="shell flex min-h-10 items-center gap-4 py-2">
        <span className="shrink-0 rounded-md bg-[#b8903a] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#04080e]">Info Terbaru</span>
        <DynamicAnnouncement />
        <div className="hidden shrink-0 items-center gap-4 text-[10px] font-semibold text-slate-400 xl:flex">
          <a href="https://instagram.com/barokahgroup_" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#d3ab5a]"><Instagram size={13}/> @barokahgroup_</a>
          <span className="h-4 w-px bg-white/10" />
          <span className="flex items-center gap-1.5 text-[#d3ab5a]"><ShieldCheck size={13}/> Layanan Lintas Negara</span>
        </div>
      </div>
    </div>

    <header className="sticky top-0 z-40 border-b border-[#b8903a]/25 bg-[#07131f]/95 text-white shadow-xl shadow-black/10 backdrop-blur-xl">
      <div className="shell flex min-h-[76px] items-center justify-between gap-4 py-3">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#dfbf72] via-[#d3ab5a] to-[#96721f] text-[#07131f] shadow-lg transition group-hover:scale-105"><Landmark size={22} strokeWidth={2.2}/></span>
          <span>
            <b className="serif block text-[22px] leading-none tracking-tight text-white">BAROKAH <span className="text-[#d3ab5a]">GROUP</span></b>
            <small className="mt-1.5 block text-[8px] font-bold uppercase tracking-[.17em] text-[#d3ab5a]">Travel & Land Arrangement</small>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">{nav.map(([label, href], index) => <Link key={label} href={href} className={`text-[11px] font-bold transition hover:text-[#d3ab5a] ${index === 0 ? 'rounded-lg border border-[#b8903a]/30 bg-[#b8903a]/10 px-3 py-2 text-[#d3ab5a]' : 'text-slate-300'}`}>{label}</Link>)}</nav>
        <div className="hidden shrink-0 items-center gap-2 xl:flex"><Link href="/b2b" className="inline-flex items-center gap-2 rounded-xl border border-[#b8903a]/45 px-3.5 py-2.5 text-[11px] font-extrabold text-[#d3ab5a] transition hover:bg-[#b8903a]/10"><Calculator size={15}/> Minta Penawaran</Link><a href={whatsappUrl("Assalamu'alaikum Barokah Group, saya ingin konsultasi layanan perjalanan.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-[11px] font-extrabold text-white shadow-lg transition hover:bg-emerald-500"><MessageCircle size={15}/> Konsultasi WhatsApp</a></div>
        <button aria-label="Buka menu" className="grid size-10 place-items-center rounded-lg border border-white/10 lg:hidden" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
      </div>
      {open && <div className="border-t border-white/10 bg-[#07131f] lg:hidden"><nav className="shell grid py-4">{nav.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/8 py-3 text-sm font-bold text-slate-200"><span className="flex items-center gap-2">{label === 'Pertanyaan Umum' && <CircleHelp size={16} className="text-[#d3ab5a]"/>}{label}</span><span className="text-[#d3ab5a]">→</span></Link>)}<Link href="/b2b" onClick={() => setOpen(false)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-[#b8903a]/40 py-3 text-sm font-black text-[#d3ab5a]"><Building2 size={16}/> Minta Penawaran untuk Travel</Link><a href={whatsappUrl("Assalamu'alaikum Barokah Group, saya ingin konsultasi layanan perjalanan.")} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-black"><MessageCircle size={16}/> Konsultasi WhatsApp</a></nav></div>}
    </header>
  </>;
}
