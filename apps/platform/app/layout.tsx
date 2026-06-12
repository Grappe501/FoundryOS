import type { Metadata, Viewport } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { PortableIdentityHydrator } from '../components/identity/PortableIdentityHydrator';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FoundryOS',
  description: 'Foundry helps people become experts. Every subject has a path. Every path has a community.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Foundry',
    statusBarStyle: 'black-translucent',
  },
  applicationName: 'Foundry',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#060608',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body className="foundry-body">
        <PortableIdentityHydrator />
        {children}
      </body>
    </html>
  );
}
