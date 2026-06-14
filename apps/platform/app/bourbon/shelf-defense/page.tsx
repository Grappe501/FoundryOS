import Link from 'next/link';
import { Suspense } from 'react';
import { ShelfDefensePageClient } from './ShelfDefensePageClient';

export const metadata = { title: 'Shelf Defense | Bourbon Level 3 | Foundry' };

export default function ShelfDefensePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-3" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 3 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Shelf Defense</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Theme statement, gift pick, next bottle — checkpoint evidence before Level 4.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <ShelfDefensePageClient />
      </Suspense>
    </section>
  );
}
