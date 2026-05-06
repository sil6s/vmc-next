import type { Metadata } from 'next';
import { Playfair_Display, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/content';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument' });

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: site.name,
  description: 'Trusted Northern Kentucky veterinary care for dogs and cats.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${playfair.variable} ${instrument.variable}`}><body><Header/><main>{children}</main><Footer/></body></html>;
}
