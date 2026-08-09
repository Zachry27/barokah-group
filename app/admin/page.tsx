'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CalendarDays, Image as ImageIcon, LayoutDashboard, LogOut, Megaphone, Package, Plus, Quote, Save, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from '@/lib/supabase';

const ADMIN_EMAIL = 'zachry133@gmail.com';
type Tab = 'overview' | 'announcement' | 'baggage' | 'products' | 'brochures' | 'testimonials';
type Row = Record<string, string | number | boolean | null>;

export default function AdminPage() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const [baggage, setBaggage] = useState<Row[]>([]);
  const [products, setProducts] = useState<Row[]>([]);
  const [brochures, setBrochures] = useState<Row[]>([]);
  const [testimonials, setTestimonials] = useState<Row[]>([]);

  async function refresh() {
    const [setting, bag, prod, brochure, test] = await Promise.all([
      supabase.from('site_settings').select('value').eq('key','announcement').maybeSingle(),
      supabase.from('baggage_schedules').select('*').order('sort_order'),
      supabase.from('products').select('*').order('sort_order'),
      supabase.from('brochures').select('*').order('sort_order'),
      supabase.from('testimonials').select('*').order('sort_order'),
    ]);
    const firstError = [setting, bag, prod, brochure, test].find(result => result.error)?.error;
    if (firstError) setNotice(firstError.message);
    const value = setting.data?.value as { text?: string } | null;
    setAnnouncement(value?.text || ''); setBaggage((bag.data || []) as Row[]); setProducts((prod.data || []) as Row[]); setBrochures((brochure.data || []) as Row[]); setTestimonials((test.data || []) as Row[]);
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => { setSession(data.session); if (data.session) await refresh(); setLoading(false); });
    const { data } = supabase.auth.onAuthStateChange(async (_event, next) => { setSession(next); if (next) await refresh(); });
    return () => data.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  async function authSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setNotice(''); const fd = new FormData(e.currentTarget); const email = String(fd.get('email') || '').toLowerCase().trim(); const password = String(fd.get('password') || '');
    if (email !== ADMIN_EMAIL) return setNotice('Email ini tidak memiliki akses admin.');
    const login = await supabase.auth.signInWithPassword({ email, password }); if (!login.error) return;
    const signup = await supabase.auth.signUp({ email, password }); setNotice(signup.error ? signup.error.message : 'Akun dibuat. Cek email konfirmasi Supabase jika diminta, lalu login kembali.');
  }

  async function saveAnnouncement() { const { error } = await supabase.from('site_settings').upsert({ key:'announcement', value:{ text: announcement, active:true } }, { onConflict:'key' }); setNotice(error ? error.message : 'Pengumuman berhasil disimpan.'); }
  async function saveRow(table: string, row: Row) { const { error } = await supabase.from(table).update(row).eq('id', row.id); setNotice(error ? error.message : 'Perubahan berhasil disimpan.'); if (!error) await refresh(); }
  async function addRow(table: string, defaults: Row) { const { error } = await supabase.from(table).insert(defaults); setNotice(error ? error.message : 'Item baru berhasil ditambahkan.'); if (!error) await refresh(); }

  if (loading) return <div className="grid min-h-screen place-items-center bg-[#07131f] text-[#d3ab5a]">Memuat dashboard…</div>;
  if (!session) return <main className="grid min-h-screen place-items-center bg-[#07131f] p-4"><form onSubmit={authSubmit} className="w-full max-w-md rounded-3xl border border-[#b8903a]/30 bg-[#0a1420] p-7 text-white shadow-2xl"><div className="grid size-12 place-items-center rounded-2xl bg-[#b8903a] text-[#07131f]"><ShieldCheck/></div><h1 className="serif mt-6 text-4xl font-bold text-[#f5e9c8]">Admin Barokah Group</h1><p className="mt-2 text-xs leading-6 text-slate-400">Kelola konten website secara langsung tanpa membuka source code.</p><label className="mt-7 block text-xs font-black">Email<input name="email" type="email" defaultValue={ADMIN_EMAIL} className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-normal outline-none focus:border-[#b8903a]"/></label><label className="mt-4 block text-xs font-black">Password<input name="password" type="password" minLength={8} required className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-normal outline-none focus:border-[#b8903a]" placeholder="Minimal 8 karakter"/></label><button className="btn-gold mt-6 w-full rounded-xl py-3 text-sm font-black">Login / Buat akun pertama</button>{notice&&<p className="mt-4 rounded-xl bg-white/5 p-3 text-xs leading-6 text-slate-300">{notice}</p>}</form></main>;

  const menu: {id:Tab;label:string;icon:typeof LayoutDashboard}[] = [{id:'overview',label:'Overview',icon:LayoutDashboard},{id:'announcement',label:'Pengumuman',icon:Megaphone},{id:'baggage',label:'Jadwal Bagasi',icon:CalendarDays},{id:'products',label:'Produk & Promo',icon:Package},{id:'brochures',label:'Brosur',icon:ImageIcon},{id:'testimonials',label:'Testimoni',icon:Quote}];
  return <main className="min-h-screen bg-slate-100 text-[#07131f]"><div className="grid min-h-screen lg:grid-cols-[260px_1fr]"><aside className="bg-[#07131f] p-5 text-white"><div className="flex items-center gap-3 border-b border-white/10 pb-5"><span className="grid size-10 place-items-center rounded-xl bg-[#b8903a] text-[#07131f]"><Sparkles size={19}/></span><div><p className="serif text-xl font-bold text-[#f5e9c8]">Barokah Admin</p><p className="text-[9px] uppercase tracking-wider text-slate-500">Content Management</p></div></div><nav className="mt-5 grid gap-2">{menu.map(item=>{const Icon=item.icon;return <button key={item.id} onClick={()=>setTab(item.id)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold ${tab===item.id?'bg-[#b8903a] text-[#07131f]':'text-slate-300 hover:bg-white/5'}`}><Icon size={17}/>{item.label}</button>})}</nav><button onClick={()=>supabase.auth.signOut()} className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white"><LogOut size={15}/> Keluar</button></aside><section className="p-4 sm:p-7 lg:p-10"><div className="mx-auto max-w-6xl"><div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#96721f]">Owner Dashboard</p><h1 className="serif mt-1 text-4xl font-bold">{menu.find(x=>x.id===tab)?.label}</h1></div><p className="text-xs text-slate-500">Login: {session.user.email}</p></div>{notice&&<div className="mb-5 rounded-xl border border-[#b8903a]/25 bg-amber-50 p-3 text-xs">{notice}</div>}
  {tab==='overview'&&<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Jadwal Bagasi',baggage.length],['Produk',products.length],['Brosur',brochures.length],['Testimoni',testimonials.length]].map(([a,b])=><div key={String(a)} className="premium-card p-5"><p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{a}</p><p className="mt-3 text-2xl font-black">{b}</p></div>)}</div>}
  {tab==='announcement'&&<div className="premium-card max-w-3xl p-6"><label className="text-xs font-black">Teks berjalan<textarea value={announcement} onChange={e=>setAnnouncement(e.target.value)} rows={5} className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-4 font-normal outline-none focus:border-[#b8903a]"/></label><button onClick={saveAnnouncement} className="btn-gold mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-black"><Save size={15}/> Simpan pengumuman</button></div>}
  {tab==='baggage'&&<><AddButton onClick={()=>addRow('baggage_schedules',{route:'Cairo → Jakarta',departure_date:null,status:'OPEN',note:'Masukkan informasi jadwal bagasi.',sort_order:baggage.length+1,is_active:true})} label="Tambah jadwal"/><EditableRows rows={baggage} fields={['route','departure_date','status','note','sort_order','is_active']} onSave={row=>saveRow('baggage_schedules',row)}/></>}
  {tab==='products'&&<><AddButton onClick={()=>addRow('products',{title:'Produk Baru',category:'Layanan',description:'Deskripsi produk',badge:null,cta_label:'Konsultasi',cta_message:'Saya ingin konsultasi produk ini.',sort_order:products.length+1,is_active:true})} label="Tambah produk"/><EditableRows rows={products} fields={['title','category','description','badge','cta_label','cta_message','sort_order','is_active']} onSave={row=>saveRow('products',row)}/></>}
  {tab==='brochures'&&<><AddButton onClick={()=>addRow('brochures',{title:'Brosur Baru',image_url:'/brochures/ringkasan-layanan.jpg',alt_text:'Brosur Barokah Group',caption:'Tulis keterangan produk atau layanan yang ditampilkan pada brosur.',sort_order:brochures.length+1,is_active:true})} label="Tambah brosur"/><BrochureRows supabase={supabase} rows={brochures} onSave={row=>saveRow('brochures',row)} onNotice={setNotice}/></>}
  {tab==='testimonials'&&<><AddButton onClick={()=>addRow('testimonials',{name:'Nama Pelanggan',role:'Pelanggan Barokah Group',quote:'Pelayanannya responsif dan proses koordinasinya sangat membantu perjalanan kami.',rating:5,sort_order:testimonials.length+1,is_active:true})} label="Tambah testimoni"/><EditableRows rows={testimonials} fields={['name','role','quote','rating','sort_order','is_active']} onSave={row=>saveRow('testimonials',row)}/></>}
  </div></section></div></main>;
}

function AddButton({onClick,label}:{onClick:()=>void;label:string}) { return <button onClick={onClick} className="mb-4 inline-flex items-center gap-2 rounded-xl bg-[#07131f] px-4 py-2.5 text-xs font-black text-[#d3ab5a]"><Plus size={15}/>{label}</button>; }

function BrochureRows({supabase,rows,onSave,onNotice}:{supabase:SupabaseClient;rows:Row[];onSave:(row:Row)=>void;onNotice:(message:string)=>void}) {
  const [drafts,setDrafts]=useState<Row[]>(rows); const [uploading,setUploading]=useState<string|null>(null); useEffect(()=>setDrafts(rows),[rows]);
  async function upload(index:number,file:File) {
    if (!file.type.startsWith('image/')) return onNotice('File harus berupa gambar.');
    if (file.size > 10 * 1024 * 1024) return onNotice('Ukuran gambar maksimal 10 MB.');
    setUploading(String(drafts[index].id));
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'; const safe = file.name.replace(/[^a-zA-Z0-9.-]/g,'-').replace(/\.[^.]+$/,''); const path = `brochures/${Date.now()}-${safe}.${ext}`;
    const { error } = await supabase.storage.from('cms-images').upload(path,file,{cacheControl:'3600',upsert:false});
    if (error) onNotice(error.message); else { const { data } = supabase.storage.from('cms-images').getPublicUrl(path); setDrafts(v=>v.map((x,i)=>i===index?{...x,image_url:data.publicUrl}:x)); onNotice('Gambar berhasil diupload. Klik Simpan untuk menerapkannya ke brosur.'); }
    setUploading(null);
  }
  return <div className="grid gap-4">{drafts.map((row,index)=><div key={String(row.id)} className="premium-card p-5"><div className="grid gap-5 lg:grid-cols-[180px_1fr]"><div><div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">{row.image_url?<img src={String(row.image_url)} alt="Preview brosur" className="h-full w-full object-cover object-top"/>:<div className="grid h-full place-items-center text-xs text-slate-400">Belum ada gambar</div>}</div><label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#b8903a]/60 bg-amber-50 px-3 py-3 text-xs font-black text-[#785a19]"><UploadCloud size={16}/>{uploading===String(row.id)?'Mengupload…':'Upload gambar'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" disabled={Boolean(uploading)} onChange={e=>{const f=e.target.files?.[0];if(f)void upload(index,f)}}/></label><p className="mt-2 text-[9px] leading-4 text-slate-400">JPG, PNG, WEBP, GIF • maks. 10 MB</p></div><div className="grid gap-4 md:grid-cols-2"><Field row={row} index={index} field="title" drafts={drafts} setDrafts={setDrafts}/><Field row={row} index={index} field="alt_text" drafts={drafts} setDrafts={setDrafts}/><div className="md:col-span-2"><Field row={row} index={index} field="caption" drafts={drafts} setDrafts={setDrafts} textarea/></div><div className="md:col-span-2"><Field row={row} index={index} field="image_url" drafts={drafts} setDrafts={setDrafts}/></div><Field row={row} index={index} field="sort_order" drafts={drafts} setDrafts={setDrafts}/><label className="flex items-center gap-3 text-xs font-black"><input type="checkbox" checked={Boolean(row.is_active)} onChange={e=>setDrafts(v=>v.map((x,i)=>i===index?{...x,is_active:e.target.checked}:x))}/> Tampilkan di website</label></div></div><button onClick={()=>onSave(row)} className="btn-gold mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black"><Save size={14}/> Simpan brosur</button></div>)}</div>;
}

function Field({row,index,field,drafts,setDrafts,textarea=false}:{row:Row;index:number;field:string;drafts:Row[];setDrafts:(rows:Row[])=>void;textarea?:boolean}) { const change=(value:string)=>setDrafts(drafts.map((x,i)=>i===index?{...x,[field]:field==='sort_order'?Number(value):value}:x)); return <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">{field.replaceAll('_',' ')}{textarea?<textarea rows={4} value={String(row[field]??'')} onChange={e=>change(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 font-normal normal-case tracking-normal outline-none focus:border-[#b8903a]"/>:<input value={String(row[field]??'')} onChange={e=>change(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 font-normal normal-case tracking-normal outline-none focus:border-[#b8903a]"/>}</label>; }

function EditableRows({rows,fields,onSave}:{rows:Row[];fields:string[];onSave:(row:Row)=>void}) { const [drafts,setDrafts]=useState<Row[]>(rows); useEffect(()=>setDrafts(rows),[rows]); return <div className="grid gap-4">{drafts.map((row,index)=><div key={String(row.id)} className="premium-card p-5"><div className="grid gap-4 md:grid-cols-2">{fields.map(field=>field==='is_active'?<label key={field} className="flex items-center gap-3 text-xs font-black"><input type="checkbox" checked={Boolean(row[field])} onChange={e=>setDrafts(v=>v.map((x,i)=>i===index?{...x,[field]:e.target.checked}:x))}/> Aktif</label>:<label key={field} className={`text-[10px] font-black uppercase tracking-wider text-slate-500 ${['description','note','quote','cta_message'].includes(field)?'md:col-span-2':''}`}>{field.replaceAll('_',' ')}{['description','note','quote','cta_message'].includes(field)?<textarea rows={3} value={String(row[field]??'')} onChange={e=>setDrafts(v=>v.map((x,i)=>i===index?{...x,[field]:e.target.value}:x))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 font-normal normal-case tracking-normal outline-none focus:border-[#b8903a]"/>:<input value={String(row[field]??'')} onChange={e=>setDrafts(v=>v.map((x,i)=>i===index?{...x,[field]:field==='sort_order'||field==='rating'?Number(e.target.value):e.target.value}:x))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 font-normal normal-case tracking-normal outline-none focus:border-[#b8903a]"/>}</label>)}</div><button onClick={()=>onSave(row)} className="btn-gold mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black"><Save size={14}/> Simpan</button></div>)}</div>; }
