import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FoundryOS',
  description: 'Foundry helps people become experts. Every subject has a path. Every path has a community.',
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
