'use client';

import Link from 'next/link';
import { getWatchtowerWeek } from '../../../lib/bourbon-level-1/intelligence/watchtower';

const ACCENT = 'var(--foundry-primary)';

const KIND_LABEL: Record<string, string> = {
  discussed: 'Most discussed',
  rising: 'Rising fast',
  value: 'Value signal',
  controversial: 'Controversial',
  'distillery-debate': 'Distillery debate',
};

export function BourbonWatchtower() {
  const week = getWatchtowerWeek();

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        What people are talking about — signals, not ratings. The market watch floor.
      </p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Week of {week.weekKey}</p>
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {week.signals.map((s) => (
          <article key={s.id} style={{ padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)' }}>
            <p style={{ color: ACCENT, fontSize: 11, margin: 0, textTransform: 'uppercase' }}>{KIND_LABEL[s.kind] ?? s.label}</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 17, marginTop: 10 }}>{s.subject}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{s.signal}</p>
            <Link href={s.href} style={{ display: 'inline-block', marginTop: 12, color: ACCENT, fontSize: 13 }}>
              Investigate signal →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
