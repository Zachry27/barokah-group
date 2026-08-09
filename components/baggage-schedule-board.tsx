'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, PackageCheck } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';
import { whatsappUrl } from '@/lib/site';

type Schedule = { id: number; route: string; departure_date: string | null; status: string; note: string | null };
const fallback: Schedule[] = [
  { id: 1, route: 'Cairo → Jakarta', departure_date: '2026-08-22', status: 'OPEN', note: 'Pendaftaran bagasi dibuka. Slot tersedia selama kuota masih ada.' },
  { id: 2, route: 'Jakarta → Cairo', departure_date: '2026-08-29', status: 'OPEN', note: 'Reservasi awal tersedia untuk pengiriman menuju Cairo.' },
];

function prettyDate(value: string | null) {
  if (!value) return 'Jadwal segera';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

export function BaggageScheduleBoard({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<Schedule[]>(fallback);
  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('baggage_schedules').select('id,route,departure_date,status,note').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data?.length) setItems(data as Schedule[]);
    });
  }, []);

  return <div className={`grid gap-5 ${compact ? 'md:grid-cols-2' : 'lg:grid-cols-2'}`}>
    {items.map(item => <article key={item.id} className="premium-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-[#07131f] px-5 py-4 text-white">
        <div><p className="text-[9px] font-black uppercase tracking-[.16em] text-[#d3ab5a]">Bagasi Schedule</p><h3 className="serif mt-1 text-2xl font-bold text-[#f5e9c8]">{item.route}</h3></div>
        <span className={`rounded-full px-3 py-1 text-[9px] font-black ${item.status === 'OPEN' ? 'bg-emerald-400 text-emerald-950' : item.status === 'FULL' ? 'bg-rose-400 text-rose-950' : 'bg-amber-300 text-amber-950'}`}>{item.status}</span>
      </div>
      <div className="p-5"><p className="flex items-center gap-2 text-sm font-black text-[#07131f]"><CalendarDays size={17} className="text-[#b8903a]"/> {prettyDate(item.departure_date)}</p><p className="mt-3 text-xs leading-6 text-slate-500">{item.note}</p><a href={whatsappUrl(`Assalamu'alaikum Barokah Group, saya ingin reservasi bagasi ${item.route} untuk jadwal ${prettyDate(item.departure_date)}. Estimasi berat: ... kg.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#96721f]"><PackageCheck size={16}/> Booking via WhatsApp <ArrowRight size={14}/></a></div>
    </article>)}
  </div>;
}
