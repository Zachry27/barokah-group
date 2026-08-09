import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiteChrome } from '@/components/site-chrome';
import { siteUrl } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Barokah Group — Travel & Land Arrangement', template: '%s | Barokah Group' },
  description: 'Land Arrangement Umrah, Mesir & Turki, visa, tiket perjalanan, Haramain, NWBus, bagasi Cairo–Jakarta, dan layanan operasional travel.',
  openGraph: { title: 'Barokah Group', description: 'Travel & Land Arrangement lintas Saudi, Mesir, Turki, dan Indonesia.', type: 'website', locale: 'id_ID' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#07131f', colorScheme: 'light' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><SiteChrome>{children}</SiteChrome><Analytics/><SpeedInsights/></body></html>;
}
