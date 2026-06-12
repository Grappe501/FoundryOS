import Link from 'next/link';
import { ShelfBuilder } from '../../../components/bourbon/level-1/ShelfBuilder';

export const metadata = { title: 'Shelf Builder | Bourbon | Foundry' };

export default function ShelfBuilderPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Build your shelf</h1>
      <ShelfBuilder />
    </section>
  );
}
