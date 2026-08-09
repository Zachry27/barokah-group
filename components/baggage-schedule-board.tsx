'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Luggage, MessageCircle, PlaneTakeoff, Sparkles } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';
import { whatsappUrl } from '@/lib/site';

type Schedule = { id: number; route: string; departure_date: string | null; status: string; note: string | null };
const fallback: Schedule[] = [
  { id: 1, route: 'Cairo → Jakarta', departure_date: '2026-08-22', status: 'OPEN', note: 'Pendaftaran bagasi dibuka. Slot tersedia selama kuota masih ada.' },
  { id: 2, route: 'Jakarta → Cairo', departure_date: '2026-08-29', status: 'OPEN', note: 'Reservasi awal tersedia untuk pengiriman menuju Cairo.' },
];

function prettyDate(value: string | null) {
  if (!value) return 'Segera diumumkan';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));
}

function shortDate(value: string | null) {
  if (!value) return { day: '—', month: 'SEGERA' };
  const date = new Date(`${value}T12:00:00`);
  return {
    day: new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(date),
    month: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date).replace('.', '').toUpperCase(),
  };
}

function statusInfo(status: string) {
  if (status === 'OPEN') return { label: 'Dibuka', className: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25', dot: 'bg-emerald-400' };
  if (status === 'FULL') return { label: 'Penuh', className: 'bg-rose-400/15 text-rose-300 border-rose-400/25', dot: 'bg-rose-400' };
  return { label: 'Segera', className: 'bg-amber-300/15 text-amber-200 border-amber-300/25', dot: 'bg-amber-300' };
}

export function BaggageScheduleBoard({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<Schedule[]>(fallback);

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('baggage_schedules').select('id,route,departure_date,status,note').eq('is_active', true).order('sort_order').then(({ data }) => {
      if (data?.length) setItems(data as Schedule[]);
    });
  }, []);

  return <article className="overflow-hidden rounded-[30px] border border-[#b8903a]/30 bg-gradient-to-br from-[#07131f] via-[#0b1927] to-[#04080e] text-white shadow-[0_28px_80px_rgba(7,19,31,.22)]">
    <div className={`flex flex-col gap-5 border-b border-white/10 ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'} lg:flex-row lg:items-center lg:justify-between`}>
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#d3ab5a]/25 bg-[#d3ab5a]/10 text-[#d3ab5a]"><Luggage size={22}/></span>
        <div>
          <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.19em] text-[#d3ab5a]"><Sparkles size={12}/> Jadwal Bagasi Terbaru</p>
          <h3 className="serif mt-1 text-2xl font-bold text-[#f5e9c8] sm:text-3xl">Cairo ⇄ Jakarta</h3>
          <p className="mt-1 text-xs leading-5 text-slate-400">Pilih jadwal yang paling sesuai, lalu konfirmasi slot langsung ke admin.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] font-bold text-slate-300">
        <CheckCircle2 size={14} className="text-emerald-400"/> Jadwal diperbarui melalui dashboard admin
      </div>
    </div>

    <div className="divide-y divide-white/10">
      {items.map((item, index) => {
        const date = shortDate(item.departure_date);
        const status = statusInfo(item.status);
        return <div key={item.id} className={`group grid gap-4 p-4 transition hover:bg-white/[.035] sm:p-5 ${compact ? 'lg:grid-cols-[92px_1.1fr_.9fr_auto]' : 'lg:grid-cols-[110px_1.1fr_1fr_auto]'} lg:items-center`}>
          <div className="flex items-center gap-3 lg:block lg:text-center">
            <div className="inline-grid min-w-16 place-items-center rounded-xl border border-[#d3ab5a]/25 bg-[#d3ab5a]/10 px-3 py-2.5">
              <span className="serif text-2xl font-bold leading-none text-[#f5e9c8]">{date.day}</span>
              <span className="mt-1 text-[8px] font-black tracking-[.14em] text-[#d3ab5a]">{date.month}</span>
            </div>
            {index === 0 && <span className="rounded-full bg-[#b8903a] px-2 py-1 text-[8px] font-black uppercase tracking-wider text-[#07131f] lg:mt-2 lg:inline-block">Terdekat</span>}
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[.14em] text-slate-500">Rute</p>
            <p className="serif mt-1 text-xl font-bold text-[#f5e9c8]">{item.route}</p>
            <p className="mt-1 text-[11px] text-slate-400"><PlaneTakeoff size={13} className="mr-1.5 inline text-[#d3ab5a]"/>{prettyDate(item.departure_date)}</p>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[9px] font-black ${status.className}`}><span className={`size-1.5 rounded-full ${status.dot}`}/>{status.label}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-slate-400">{item.note}</p>
          </div>

          <a href={whatsappUrl(`Assalamu'alaikum Barokah Group, saya ingin pesan bagasi rute ${item.route} untuk jadwal ${prettyDate(item.departure_date)}. Estimasi berat: ... kg. Jenis barang: ...`)} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-black lg:justify-self-end"><MessageCircle size={14}/> Pilih Jadwal <ArrowRight size={13}/></a>
        </div>;
      })}
    </div>

    <div className="flex flex-col gap-3 border-t border-white/10 bg-black/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-[10px] leading-5 text-slate-400">Harga dan ketersediaan slot mengikuti berat, jenis barang, serta jadwal yang dipilih.</p>
      <a href={whatsappUrl("Assalamu'alaikum Barokah Group, saya ingin konsultasi bagasi Cairo-Jakarta. Estimasi berat saya: ... kg.")} target="_blank" rel="noreferrer" className="text-[10px] font-black text-[#d3ab5a] hover:text-[#f5e9c8]">Tanya harga & ketentuan →</a>
    </div>
  </article>;
}
