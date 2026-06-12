import { Suspense } from 'react';
import ComparePageClient from './ComparePageClient';

export const metadata = { title: 'Compare Bourbon | Foundry' };

export default function ComparePage() {
  return (
    <Suspense fallback={<p style={{ color: '#8A8A8E', marginTop: 16 }}>Loading compare…</p>}>
      <ComparePageClient />
    </Suspense>
  );
}
