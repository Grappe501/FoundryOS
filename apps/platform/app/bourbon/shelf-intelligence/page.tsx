import Link from 'next/link';
import { ShelfIntelligencePanel } from '../../../components/bourbon/intelligence/ShelfIntelligencePanel';

export const metadata = { title: 'Shelf Intelligence | Bourbon | Foundry' };

export default function ShelfIntelligencePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/portfolio" style={{ color: '#6B6B70', fontSize: 13 }}>← My Shelf</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Shelf intelligence</h1>
      <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 8 }}>Your shelf talks back — gaps, next moves, blind spots.</p>
      <ShelfIntelligencePanel />
    </section>
  );
}
