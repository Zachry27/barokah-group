'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { MotionOrchestrator } from '@/components/motion-orchestrator';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  if (pathname.startsWith('/admin')) return <>{children}</>;
  return <><SiteHeader/><main>{children}</main><SiteFooter/><MotionOrchestrator/></>;
}
