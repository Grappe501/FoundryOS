import Link from 'next/link';
import { Suspense } from 'react';
import { TastingLabPageClient } from './TastingLabPageClient';
import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';

export const metadata = { title: 'Tasting Lab | Bourbon Level 2 | Foundry' };

export default function TastingLabPage() {
  const content = getBourbonPageDepth('tasting-lab');
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Tasting Lab</h1>
      {content && (
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          {content.openingNarrative.slice(0, 280)}…
        </p>
      )}
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading lab…</p>}>
        <TastingLabPageClient />
      </Suspense>
    </section>
  );
}
