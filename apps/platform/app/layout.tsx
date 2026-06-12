import type { Metadata, Viewport } from 'next';

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
  themeColor: '#08080A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: '#0A0A0B',
          color: '#F0F0F2',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
