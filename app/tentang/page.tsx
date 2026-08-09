import type { Metadata } from 'next';
import { Globe2, Network, Route, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'Tentang' };

const highlights = [
  { Icon: Globe2, label: 'Saudi • Mesir • Turki' },
  { Icon: Route, label: 'Travel operations' },
  { Icon: Users, label: 'B2B & retail' },
  { Icon: Network, label: 'Multi-service hub' },
];

export default function AboutPage() {
  return <>
    <section className="bg-[#07131f] py-20 text-white">
      <div className="shell">
        <span className="eyebrow text-[#d6b66f]">Tentang Barokah Group</span>
        <h1 className="serif mt-4 max-w-4xl text-balance text-5xl font-semibold text-[#f4ead7] sm:text-6xl">Travel & Land Arrangement hub untuk kebutuhan lintas negara.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/55">Website ini memusatkan informasi layanan Barokah Group agar kebutuhan individu, group, dan travel agent bisa dibahas dengan scope yang lebih jelas.</p>
      </div>
    </section>
    <section className="section">
      <div className="shell">
        <div className="grid gap-5 md:grid-cols-4">
          {highlights.map(({ Icon, label }) => <div key={label} className="card p-6"><Icon size={24} className="text-[#b58d47]"/><p className="mt-10 text-sm font-black">{label}</p></div>)}
        </div>
        <div className="mt-14 max-w-3xl">
          <span className="eyebrow text-[#9f7d3d]">Positioning</span>
          <h2 className="serif mt-3 text-4xl font-semibold">Bukan katalog janji. Ini titik masuk untuk koordinasi.</h2>
          <p className="mt-5 text-sm leading-8 text-slate-500">Harga, jadwal, ketersediaan, proses visa, hotel, transport, dan ketentuan operasional dapat berubah. Karena itu, detail transaksi dikonfirmasi admin setelah kebutuhan pengguna cukup jelas.</p>
        </div>
      </div>
    </section>
  </>;
}
