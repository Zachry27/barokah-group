import type { Metadata } from 'next';
import { faqs } from '@/lib/content';
export const metadata: Metadata = { title: 'FAQ' };
export default function FAQPage(){return <section className="section"><div className="shell max-w-4xl"><span className="eyebrow text-[#9f7d3d]">FAQ</span><h1 className="serif mt-3 text-5xl font-semibold">Pertanyaan yang sering muncul.</h1><div className="mt-9 grid gap-4">{faqs.map((item,i)=><details key={item.q} className="card group p-5 sm:p-6"><summary className="cursor-pointer list-none font-black"><span className="mr-3 text-[#b58d47]">0{i+1}</span>{item.q}</summary><p className="mt-4 border-t border-black/10 pt-4 text-sm leading-7 text-slate-500">{item.a}</p></details>)}</div></div></section>}
