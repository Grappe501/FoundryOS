import Link from 'next/link';
import { Suspense } from 'react';
import { ShelfGapPageClient } from './ShelfGapPageClient';

export const metadata = { title: 'Shelf Gap Analysis | Bourbon Level 3 | Foundry' };

export default function ShelfGapPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-3" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 3 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Gap Analysis</h1>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <ShelfGapPageClient />
      </Suspense>
    </section>
  );
}
