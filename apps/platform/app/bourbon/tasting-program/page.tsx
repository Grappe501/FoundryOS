import Link from 'next/link';
import { Suspense } from 'react';
import { TastingProgramPageClient } from './TastingProgramPageClient';

export const metadata = { title: '8-Week Tasting Program | Bourbon Level 2 | Foundry' };

export default function TastingProgramPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>8-Week Confident Taster Program</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Structured path from mash bill fork to host night and checkpoint — mark weeks complete when homework is done.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <TastingProgramPageClient />
      </Suspense>
    </section>
  );
}
