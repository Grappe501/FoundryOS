import Link from 'next/link';
import { Suspense } from 'react';
import { ComparisonGridPageClient } from './ComparisonGridPageClient';
import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';

export const metadata = { title: 'Comparison Grid | Bourbon Level 2 | Foundry' };

export default function ComparisonGridPage() {
  const content = getBourbonPageDepth('comparison-grid');
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Comparison grid</h1>
      {content && (
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          {content.whyItMatters.slice(0, 220)}…
        </p>
      )}
      <Suspense fallback={<p style={{ color: 'var(--foundry-text-faint)', marginTop: 16 }}>Loading grid…</p>}>
        <ComparisonGridPageClient />
      </Suspense>
    </section>
  );
}
