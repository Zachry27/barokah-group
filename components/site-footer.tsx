import Link from 'next/link';
import { ExternalLink, Landmark, MessageCircle } from 'lucide-react';
import { whatsappGroupUrl, whatsappUrl } from '@/lib/site';

export function SiteFooter() {
  return <footer className="border-t border-[#b8903a]/20 bg-[#04080e] text-white">
    <div className="shell grid gap-10 py-14 md:grid-cols-[1.25fr_.75fr_.75fr]">
      <div>
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#dfbf72] to-[#96721f] text-[#07131f]"><Landmark size={20}/></span><div><p className="serif text-2xl font-bold text-[#f5e9c8]">BAROKAH <span className="text-[#d3ab5a]">GROUP</span></p><p className="text-[8px] font-bold uppercase tracking-[.18em] text-[#b8903a]">Travel & LA Hub Lintas Negara</p></div></div>
        <p className="mt-5 max-w-md text-xs leading-7 text-slate-400">Land Arrangement, visa, tiket, transport, Haramain, NWBus, dan bagasi Cairo ⇄ Jakarta untuk kebutuhan individual maupun travel agent.</p>
        <a href={whatsappUrl("Assalamu'alaikum Barokah Group, saya ingin konsultasi layanan.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black shadow-lg transition hover:bg-emerald-500"><MessageCircle size={15}/> WhatsApp Admin</a>
      </div>
      <div><p className="eyebrow text-[#d3ab5a]">Layanan</p><div className="mt-5 grid gap-3 text-xs font-semibold text-slate-400"><Link href="/visa">Visa Hub</Link><Link href="/bagasi-cairo-jakarta">Bagasi Cairo–Jakarta</Link><Link href="/b2b">B2B Travel Agent</Link><Link href="/promo-brosur">Promo & Brosur</Link></div></div>
      <div><p className="eyebrow text-[#d3ab5a]">Connect</p><div className="mt-5 grid gap-3 text-xs font-semibold text-slate-400"><a href={whatsappGroupUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">WhatsApp Group <ExternalLink size={13}/></a><Link href="/kontak">Kontak</Link><Link href="/faq">FAQ</Link><Link href="/tentang">Tentang Kami</Link></div></div>
    </div>
    <div className="border-t border-white/8"><div className="shell flex flex-col gap-2 py-5 text-[9px] uppercase tracking-[.16em] text-slate-600 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Barokah Group</span><span>Informasi final dikonfirmasi admin</span></div></div>
  </footer>;
}
