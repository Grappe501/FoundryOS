import type { Metadata, Viewport } from 'next';
import './talent-foundry.css';

export const metadata: Metadata = {
  title: 'Foundry',
  description: 'A private invitation.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#07070a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function TalentFoundryLayout({ children }: { children: React.ReactNode }) {
  return <div className="tf tf-shell">{children}</div>;
}
