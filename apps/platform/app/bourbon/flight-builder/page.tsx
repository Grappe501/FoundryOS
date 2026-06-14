import Link from 'next/link';
import { Suspense } from 'react';
import { FlightBuilderPageClient } from './FlightBuilderPageClient';

export const metadata = { title: 'Flight Builder | Bourbon Level 2 | Foundry' };

export default function FlightBuilderPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Flight Builder</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Build custom flights from the 55-bottle catalog — filter by mash bill, category, price, proof, and tags.
      </p>
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading…</p>}>
        <FlightBuilderPageClient />
      </Suspense>
    </section>
  );
}
