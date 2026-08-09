import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/content';
import { whatsappUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params; const s=services.find(x=>x.slug===slug); return {title:s?.title??'Layanan',description:s?.summary}}
export default async function ServiceDetail({params}:Props){const {slug}=await params; const service=services.find(x=>x.slug===slug); if(!service) notFound(); const Icon=service.icon; return <>
  <section className="bg-[#07131f] py-20 text-white"><div className="shell grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-center"><div><span className="eyebrow text-[#d6b66f]">{service.kicker}</span><h1 className="serif mt-4 text-5xl font-semibold text-[#f4e9d3] sm:text-6xl">{service.title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-white/55">{service.summary}</p><a href={whatsappUrl(`Assalamu'alaikum Barokah Group, saya ingin konsultasi ${service.title}. Detail kebutuhan saya: ...`)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c6a25a] px-5 py-3 text-sm font-black text-[#07131f]">Konsultasi layanan <ArrowRight size={16}/></a></div><div className="grid place-items-center"><div className="grid size-52 place-items-center rounded-full border border-[#c6a25a]/25 bg-[#c6a25a]/10 text-[#c6a25a]"><Icon size={76}/></div></div></div></section>
  <section className="section"><div className="shell grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><span className="eyebrow text-[#9f7d3d]">Yang bisa dibahas</span><h2 className="serif mt-3 text-4xl font-semibold">Mulai dari kebutuhan, bukan paket generik.</h2></div><div className="grid gap-4 sm:grid-cols-2">{service.features.map(f=><div key={f} className="card flex items-start gap-3 p-5"><CheckCircle2 size={18} className="mt-1 shrink-0 text-[#b58d47]"/><p className="text-sm font-bold leading-6">{f}</p></div>)}</div></div></section>
</>}
