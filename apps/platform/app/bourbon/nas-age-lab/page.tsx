import Link from 'next/link';
import { Suspense } from 'react';
import { NasAgeLabPageClient } from './NasAgeLabPageClient';

export const metadata = { title: 'NAS vs Age Lab | Bourbon Level 4 | Foundry' };

export default function NasAgeLabPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-4" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 4 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>NAS vs Age Lab</h1>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <NasAgeLabPageClient />
      </Suspense>
    </section>
  );
}
