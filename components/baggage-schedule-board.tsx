'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Luggage, MessageCircle, PlaneTakeoff, Sparkles } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';
import { whatsappUrl } from '@/lib/site';

type Schedule = { id: number; route: string; departure_date: string | null; status: string; note: string | null };
const fallback: Schedule[] = [
  { id: 1, route: 'Cairo → Jakarta', departure_date: '2026-08-22', status: 'OPEN', note: 'Pendaftaran bagasi dibuka. Slot tersedia selama kuota masih ada.' },
  { id: 2, route: 'Jakarta → Cairo', departure_date: '2026-08-29', status: 'OPEN', note: 'Reservasi awal tersedia untuk pengiriman menuju Cairo.' },
];

function prettyDate(value: string | null) {
  if (!value) return 'Jadwal segera diumumkan';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function dateParts(value: string | null) {
  if (!value) return { day: '—', month: 'SEGERA' };
  const date = new Date(`${value}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date).replace('.', '').toUpperCase(),
  };
}

function statusInfo(status: string) {
  if (status === 'OPEN') return { label: 'Pendaftaran Dibuka', className: 'bg-emerald-400 text-emerald-950', dot: 'bg-emerald-500' };
  if (status === 'FULL') return { label: 'Kuota Penuh', className: 'bg-rose-400 text-rose-950', dot: 'bg-rose-500' };
  return { label: 'Segera Dibuka', className: 'bg-amber-300 text-amber-950', dot: 'bg-amber-400' };
}

export function BaggageScheduleBoard({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<Schedule[]>(fallback);
  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('baggage_schedules').select('id,route,departure_date,status,note').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data?.length) setItems(data as Schedule[]);
    });
  }, []);

  return <div className={`grid gap-6 ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}>
    {items.map((item, index) => {
      const parts = dateParts(item.departure_date);
      const status = statusInfo(item.status);
      return <article key={item.id} className="group relative overflow-hidden rounded-[28px] border border-[#b8903a]/25 bg-white shadow-[0_20px_60px_rgba(15,23,42,.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,.16)]">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-gradient-to-bl from-[#d3ab5a]/16 to-transparent" />
        <div className="relative bg-gradient-to-br from-[#07131f] via-[#0b1a29] to-[#142132] p-6 text-white sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-[#d3ab5a]"><Sparkles size={13}/> Jadwal Bagasi Terbaru</p>
              <h3 className="serif mt-3 text-3xl font-bold text-[#f5e9c8] sm:text-4xl">{item.route}</h3>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1.5 text-[9px] font-black ${status.className}`}>{status.label}</span>
          </div>
          <div className="mt-6 flex items-end gap-4 border-t border-white/10 pt-5">
            <div className="grid min-w-20 place-items-center rounded-2xl border border-[#d3ab5a]/30 bg-[#d3ab5a]/10 px-4 py-3 text-center">
              <span className="serif text-4xl font-bold leading-none text-[#f5e9c8]">{parts.day}</span>
              <span className="mt-1 text-[9px] font-black tracking-[.16em] text-[#d3ab5a]">{parts.month}</span>
            </div>
            <div className="pb-1">
              <p className="flex items-center gap-2 text-xs font-bold text-white"><PlaneTakeoff size={16} className="text-[#d3ab5a]"/> Keberangkatan</p>
              <p className="mt-1 text-sm text-slate-300">{prettyDate(item.departure_date)}</p>
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"><span className="grid size-9 place-items-center rounded-xl bg-[#07131f] text-[#d3ab5a]"><Luggage size={17}/></span><div><p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Layanan</p><p className="mt-1 text-xs font-black text-[#07131f]">Bagasi Cairo ⇄ Jakarta</p></div></div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"><span className="grid size-9 place-items-center rounded-xl bg-[#07131f] text-[#d3ab5a]"><Clock3 size={17}/></span><div><p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Status</p><p className="mt-1 flex items-center gap-1.5 text-xs font-black text-[#07131f]"><span className={`size-2 rounded-full ${status.dot}`}/>{status.label}</p></div></div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">{item.note}</p>
          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[10px] font-semibold text-slate-500"><CheckCircle2 size={15} className="text-emerald-600"/> Tanya ketersediaan slot sebelum mengirim barang</p>
            <a href={whatsappUrl(`Assalamu'alaikum Barokah Group, saya ingin pesan bagasi rute ${item.route} untuk jadwal ${prettyDate(item.departure_date)}. Estimasi berat: ... kg. Jenis barang: ...`)} target="_blank" rel="noreferrer" className="btn-gold inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-black"><MessageCircle size={16}/> Pesan Slot <ArrowRight size={14}/></a>
          </div>
          {index === 0 && <span className="absolute -right-8 -top-3 rotate-12 rounded-full bg-[#b8903a] px-10 py-1 text-[8px] font-black uppercase tracking-wider text-[#07131f]">Terdekat</span>}
        </div>
      </article>;
    })}
  </div>;
}
