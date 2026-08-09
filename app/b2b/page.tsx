import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { QuoteForm } from '@/components/quote-form';

export const metadata: Metadata = { title: 'B2B Travel Agent', description: 'Brief dan penawaran layanan operasional Barokah Group untuk travel agent dan group organizer.' };

export default function B2BPage() {
  return <>
    <section className="bg-[#07131f] py-20 text-white"><div className="shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><span className="eyebrow text-[#d6b66f]">B2B Travel Agent</span><h1 className="serif mt-4 text-balance text-5xl font-semibold text-[#f5ead5] sm:text-6xl">Dari kebutuhan group ke brief operasional yang siap dibahas.</h1><p className="mt-6 max-w-xl text-base leading-8 text-white/55">Kumpulkan city flow, pax, tanggal, hotel, visa, transport, Haramain, dan kebutuhan handling dalam satu alur sebelum masuk WhatsApp admin.</p></div><div className="grid gap-3 sm:grid-cols-2">{['Land Arrangement Umrah','Visa Group','Hotel & Transport','Haramain / NWBus','Land Arrangement Mesir','Land Arrangement Turki'].map(x=><div key={x} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm text-white/75"><CheckCircle2 size={18} className="text-[#c6a25a]"/>{x}</div>)}</div></div></section>
    <section className="section"><div className="shell grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><span className="eyebrow text-[#9f7d3d]">Cara kerja</span><h2 className="serif mt-3 text-4xl font-semibold">Lebih sedikit chat kosong. Lebih cepat masuk ke inti kebutuhan.</h2><div className="mt-8 grid gap-5">{[['01','Isi brief group'],['02','Admin review scope'],['03','Konfirmasi detail & penawaran'],['04','Lanjut koordinasi operasional']].map(([n,t])=><div key={n} className="flex gap-4 border-b border-black/10 pb-5"><span className="font-black text-[#b58d47]">{n}</span><div><p className="font-black">{t}</p><p className="mt-1 text-sm text-slate-500">Detail lanjutan dikonfirmasi langsung oleh admin sesuai kebutuhan aktual.</p></div></div>)}</div><p className="mt-7 flex items-start gap-2 text-xs leading-6 text-slate-500"><ArrowRight size={15} className="mt-1 shrink-0"/> Website tidak menjanjikan harga, hotel, atau proses tertentu sebelum admin mengonfirmasi ketersediaan.</p></div><QuoteForm /></div></section>
  </>;
}
