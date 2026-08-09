import type { Metadata } from 'next';
import { BrochureGrid } from '@/components/brochure-grid';
export const metadata: Metadata = { title: 'Promo & Brosur', description: 'Galeri brosur layanan Barokah Group.' };
export default function PromoPage(){return <section className="section"><div className="shell"><span className="eyebrow text-[#9f7d3d]">Promo & Brosur</span><h1 className="serif mt-3 max-w-3xl text-5xl font-semibold">Galeri materi layanan Barokah Group.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">Brosur existing dipertahankan sebagai aset visual. Detail harga, tanggal, dan ketersediaan di dalam materi lama tetap perlu dikonfirmasi ke admin.</p><div className="mt-10"><BrochureGrid/></div></div></section>}
