'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CompareFiveTool } from '../../../components/bourbon/level-1/CompareFiveTool';
import { CompareAnyTwoTool } from '../../../components/bourbon/level-1/CompareAnyTwoTool';

export default function ComparePageClient() {
  const params = useSearchParams();
  const mode = params.get('mode') === 'producers' ? 'producers' : 'bottles';
  const a = params.get('a') ?? undefined;
  const b = params.get('b') ?? undefined;

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Compare bourbon</h1>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7, marginTop: 10 }}>
        Side-by-side charts — any two bottles or any two distilleries. Not star ratings. Differences that matter.
      </p>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 17, color: '#C8A96E', fontWeight: 400 }}>Compare any two</h2>
        <div style={{ marginTop: 16 }}>
          <CompareAnyTwoTool initialMode={mode} initialA={a} initialB={b} />
        </div>
      </section>

      <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #1A1A1E' }}>
        <h2 style={{ fontSize: 17, color: '#E8E8EC', fontWeight: 400 }}>Compare up to five bottles</h2>
        <CompareFiveTool />
      </section>
    </section>
  );
}
