import Link from 'next/link';
import { Suspense } from 'react';
import { ThemedShelfPageClient } from './ThemedShelfPageClient';

export const metadata = { title: 'Themed Shelf | Bourbon Level 3 | Foundry' };

export default function ThemedShelfPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-3" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 3 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Themed Shelf</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Twelve shelf themes — each bottle earns a role. Value, education, host, craft, and premium tiers.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <ThemedShelfPageClient />
      </Suspense>
    </section>
  );
}
