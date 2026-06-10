import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FoundryOS Admin',
  description: 'Central admin dashboard — all apps, all sites, one control plane',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#08080A', color: '#E8E8EC', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
