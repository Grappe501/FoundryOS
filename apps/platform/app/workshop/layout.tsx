import type { Metadata, Viewport } from 'next';
import '../../components/talent-foundry/workshop/workshop.css';

export const metadata: Metadata = {
  title: { absolute: 'Workshop' },
  description: '',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return <div className="ws">{children}</div>;
}
