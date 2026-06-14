import Link from 'next/link';
import { Suspense } from 'react';
import { CompareFiveLabPageClient } from './CompareFiveLabPageClient';

export const metadata = { title: 'Compare Five Lab | Bourbon Level 4 | Foundry' };

export default function CompareFiveLabPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-4" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 4 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Compare Five Lab</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Twelve connoisseur presets — hypothesis before pour, defend winner after.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <CompareFiveLabPageClient />
      </Suspense>
    </section>
  );
}
