'use client';

import { useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';

type Testimonial = { id: number; name: string; role: string | null; quote: string; rating: number };
const fallback: Testimonial[] = [
  { id: 1, name: 'Ahmad Fauzan', role: 'Owner Travel Umrah • Jakarta', quote: 'Koordinasi kebutuhan group jauh lebih praktis karena hotel, transport, dan kebutuhan operasional bisa dibahas dari satu pintu.', rating: 5 },
  { id: 2, name: 'Nabila Rahma', role: 'Jamaah Mandiri • Cairo', quote: 'Respons admin cepat dan penjelasannya jelas. Proses konsultasi visa dan bagasi jadi terasa lebih mudah.', rating: 5 },
  { id: 3, name: 'Rizky Maulana', role: 'Group Organizer • Surabaya', quote: 'Untuk kebutuhan rombongan, alur komunikasinya rapi dan memudahkan kami menyiapkan detail sebelum keberangkatan.', rating: 5 },
];

export function TestimonialsCms() {
  const [items, setItems] = useState<Testimonial[]>(fallback);
  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('testimonials').select('id,name,role,quote,rating').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data?.length) setItems(data as Testimonial[]);
    });
  }, []);
  return <section className="section"><div className="shell"><div className="mx-auto max-w-2xl text-center"><span className="eyebrow text-[#96721f]">Cerita Pelanggan</span><h2 className="serif mt-4 text-4xl font-bold text-[#07131f]">Dipercaya untuk kebutuhan perjalanan lintas negara.</h2><p className="mt-4 text-sm leading-7 text-slate-500">Pengalaman pelanggan dan partner yang menggunakan layanan Barokah Group.</p></div><div className="mt-8 grid gap-5 md:grid-cols-3">{items.map(t => <article key={t.id} className="premium-card p-6"><div className="flex items-center justify-between"><Quote size={20} className="text-[#b8903a]"/><div className="flex gap-0.5 text-[#d3ab5a]">{Array.from({length: Math.max(1, Math.min(5, t.rating || 5))}).map((_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div></div><p className="mt-6 text-sm leading-7 text-slate-600">“{t.quote}”</p><div className="mt-7 border-t border-slate-200 pt-4"><p className="text-xs font-black text-[#07131f]">{t.name}</p><p className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">{t.role}</p></div></article>)}</div></div></section>;
}
