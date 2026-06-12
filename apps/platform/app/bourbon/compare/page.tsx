import { Suspense } from 'react';
import ComparePageClient from './ComparePageClient';

export const metadata = { title: 'Compare Bourbon | Foundry' };

export default function ComparePage() {
  return (
    <Suspense fallback={<p style={{ color: 'var(--foundry-text-muted)', marginTop: 16 }}>Loading compare…</p>}>
      <ComparePageClient />
    </Suspense>
  );
}
