import Link from 'next/link';
import { Suspense } from 'react';
import { BlindFlightPageClient } from './BlindFlightPageClient';

export const metadata = { title: 'Blind Flight Lab | Bourbon Level 2 | Foundry' };

export default function BlindFlightPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Blind Flight Lab</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Seven blind presets — bag discipline, rank before reveal, save sessions for checkpoint evidence.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <BlindFlightPageClient />
      </Suspense>
    </section>
  );
}
