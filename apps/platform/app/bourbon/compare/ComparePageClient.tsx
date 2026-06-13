'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CompareFiveTool } from '../../../components/bourbon/level-1/CompareFiveTool';
import { CompareAnyTwoTool } from '../../../components/bourbon/level-1/CompareAnyTwoTool';
import { CompareCategoriesTool } from '../../../components/bourbon/level-1/CompareCategoriesTool';

export default function ComparePageClient() {
  const params = useSearchParams();
  const modeParam = params.get('mode');
  const mode = modeParam === 'producers' ? 'producers' : modeParam === 'categories' ? 'categories' : 'bottles';
  const a = params.get('a') ?? undefined;
  const b = params.get('b') ?? undefined;

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Compare bourbon</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, marginTop: 10 }}>
        Side-by-side charts — bottles, distilleries, or whiskey categories. Not star ratings. Differences that matter.
      </p>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {[
          { href: '/bourbon/compare', label: 'Bottles & producers', active: mode !== 'categories' },
          { href: '/bourbon/compare?mode=categories', label: 'Whiskey categories', active: mode === 'categories' },
          { href: '/bourbon/whiskey-map', label: 'Full whiskey map', active: false },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 999,
              textDecoration: 'none',
              border: `1px solid ${tab.active ? 'var(--foundry-primary-border-dim)' : 'var(--foundry-border)'}`,
              background: tab.active ? 'var(--foundry-primary-bg-subtle)' : 'transparent',
              color: tab.active ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
            }}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {mode === 'categories' ? (
        <section style={{ marginTop: 32 }}>
          <CompareCategoriesTool />
        </section>
      ) : (
        <>
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 17, color: 'var(--foundry-primary)', fontWeight: 400 }}>Compare any two</h2>
            <div style={{ marginTop: 16 }}>
              <CompareAnyTwoTool initialMode={mode} initialA={a} initialB={b} />
            </div>
          </section>

          <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--foundry-border-subtle)' }}>
            <h2 style={{ fontSize: 17, color: 'var(--foundry-text)', fontWeight: 400 }}>Compare up to five bottles</h2>
            <CompareFiveTool />
          </section>
        </>
      )}
    </section>
  );
}
