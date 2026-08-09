import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { faqs } from '@/lib/content';
import { whatsappUrl } from '@/lib/site';

export const metadata: Metadata = { title: 'Pertanyaan Umum', description: 'Jawaban untuk pertanyaan yang sering ditanyakan tentang layanan Barokah Group.' };

export default function FAQPage(){return <>
  <section className="bg-[#07131f] py-20 text-white"><div className="shell max-w-4xl text-center"><span className="eyebrow text-[#d3ab5a]">Pertanyaan Umum</span><h1 className="serif mt-4 text-balance text-5xl font-bold text-[#f5e9c8] sm:text-6xl">Jawaban cepat sebelum Anda menghubungi admin.</h1><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">Temukan jawaban seputar layanan, jadwal, pemesanan, visa, bagasi, dan perjalanan rombongan.</p></div></section>
  <section className="section"><div className="shell max-w-4xl"><div className="grid gap-4">{faqs.map((item,i)=><details key={item.q} className="premium-card group p-5 sm:p-6"><summary className="cursor-pointer list-none font-black text-[#07131f]"><span className="mr-3 text-[#b58d47]">0{i+1}</span>{item.q}</summary><p className="mt-4 border-t border-black/10 pt-4 text-sm leading-7 text-slate-500">{item.a}</p></details>)}</div><div className="dark-glass-card mt-10 rounded-3xl p-7 text-center text-white"><p className="serif text-3xl font-bold text-[#f5e9c8]">Belum menemukan jawaban yang Anda cari?</p><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">Hubungi admin Barokah Group. Ceritakan kebutuhan Anda dan kami akan membantu memilih layanan yang paling sesuai.</p><a href={whatsappUrl("Assalamu'alaikum Barokah Group, saya ingin bertanya tentang layanan perjalanan. Pertanyaan saya: ...")} target="_blank" rel="noreferrer" className="btn-gold mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black"><MessageCircle size={16}/> Tanya Admin via WhatsApp</a></div></div></section>
</>}
