import Link from 'next/link';
import { StorePickAcademy } from '../../../components/bourbon/level-1/StorePickAcademy';

export const metadata = { title: 'Store Pick Academy | Bourbon | Foundry' };

export default function StorePicksPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Store Pick Academy</h1>
      <StorePickAcademy />
    </section>
  );
}
