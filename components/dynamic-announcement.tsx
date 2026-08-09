'use client';

import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase';

const fallback = 'Land Arrangement Umrah • Visa Umrah & Mesir • Haramain Train • NWBus • Bagasi Cairo ⇄ Jakarta';

export function DynamicAnnouncement() {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.from('site_settings').select('value').eq('key', 'announcement').maybeSingle().then(({ data }) => {
      const value = data?.value as { text?: string; active?: boolean } | null;
      if (value?.active !== false && value?.text) setText(value.text);
    });
  }, []);
  return <div className="marquee min-w-0 flex-1 text-[10px] font-semibold text-slate-300 sm:text-xs"><div className="marquee-track"><span className="px-5">{text}</span><span className="px-5 text-[#d3ab5a]">✦</span><span className="px-5">{text}</span><span className="px-5 text-[#d3ab5a]">✦</span></div></div>;
}
