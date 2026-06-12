'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BOURBON_PAIRINGS } from '../../../lib/bourbon-level-1/pairings';

const ACCENT = 'var(--foundry-primary)';

export function PairingEngine() {
  const [pick, setPick] = useState(BOURBON_PAIRINGS[0]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {BOURBON_PAIRINGS.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setPick(p)}
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              border: `1px solid ${pick.slug === p.slug ? ACCENT : 'var(--foundry-border)'}`,
              background: pick.slug === p.slug ? 'var(--foundry-primary-border-dim)' : 'transparent',
              color: pick.slug === p.slug ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {p.food}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>Pour with {pick.food}</h2>
        {pick.bourbons.map((b) => (
          <article key={b.bottleSlug} style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--foundry-border-subtle)' }}>
            <p style={{ color: ACCENT, fontSize: 15, margin: 0 }}>{b.name}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>{b.why}</p>
          </article>
        ))}
        {pick.lessonSlug && (
          <Link href={`/bourbon/academy/${pick.lessonSlug}`} style={{ display: 'inline-block', marginTop: 20, color: 'var(--foundry-text-faint)', fontSize: 13 }}>
            Related lesson (optional) →
          </Link>
        )}
        <Link href="/bbq" style={{ display: 'block', marginTop: 12, color: ACCENT, fontSize: 13 }}>
          Cross-world: BBQ world pairs with bourbon nights →
        </Link>
      </section>
    </div>
  );
}
