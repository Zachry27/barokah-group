import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { QuoteForm } from '@/components/quote-form';

export const metadata: Metadata = { title: 'Untuk Travel & Rombongan', description: 'Minta penawaran layanan perjalanan untuk travel agent, jamaah, dan rombongan bersama Barokah Group.' };

export default function B2BPage() {
  return <>
    <section className="bg-[#07131f] py-14 text-white sm:py-16 lg:py-18">
      <div className="shell grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-12">
        <div>
          <span className="eyebrow text-[#d6b66f]">Untuk Travel & Rombongan</span>
          <h1 className="serif mt-4 max-w-[760px] text-balance text-[clamp(2.7rem,7vw,4.4rem)] font-semibold leading-[1.01] text-[#f5ead5] lg:text-[4.35rem]">
            Kirim kebutuhan perjalanan rombongan Anda, kami bantu siapkan penawarannya.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Cukup informasikan jumlah peserta, tanggal, kota tujuan, hotel, visa, LA / Land Arrangement, handling, dan transportasi yang dibutuhkan. Tim Barokah Group akan membantu menyesuaikan layanan untuk rombongan Anda.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {['Umrah untuk Rombongan','Visa Group','LA / Land Arrangement','Hotel & Transportasi','Kereta Haramain / Bus','Handling & Pendampingan'].map(x=><div key={x} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm text-white/75"><CheckCircle2 size={18} className="shrink-0 text-[#c6a25a]"/>{x}</div>)}
        </div>
      </div>
    </section>
    <section className="section">
      <div className="shell grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
        <div>
          <span className="eyebrow text-[#9f7d3d]">Cara Memesan</span>
          <h2 className="serif mt-3 max-w-xl text-balance text-4xl font-semibold sm:text-5xl">Empat langkah sederhana untuk mendapatkan penawaran.</h2>
          <div className="mt-8 grid gap-5">
            {[['01','Isi kebutuhan rombongan'],['02','Tim kami memeriksa kebutuhan Anda'],['03','Dapatkan rincian layanan & penawaran'],['04','Lanjutkan pemesanan bersama admin']].map(([n,t])=><div key={n} className="flex gap-4 border-b border-black/10 pb-5"><span className="font-black text-[#b58d47]">{n}</span><div><p className="font-black">{t}</p><p className="mt-1 text-sm leading-6 text-slate-500">Admin akan menghubungi Anda untuk memastikan detail perjalanan dan ketersediaan layanan.</p></div></div>)}
          </div>
          <p className="mt-7 flex items-start gap-2 text-xs leading-6 text-slate-500"><ArrowRight size={15} className="mt-1 shrink-0"/> Isi informasi sejelas mungkin agar kami dapat memberikan penawaran yang lebih cepat dan sesuai kebutuhan.</p>
        </div>
        <QuoteForm />
      </div>
    </section>
  </>;
}
