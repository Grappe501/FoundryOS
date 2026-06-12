'use client';

import Link from 'next/link';
import { BOURBON_ECONOMY_TOPICS } from '../../../lib/bourbon-level-1/agency/economy';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function BourbonEconomy() {
  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Why bourbon costs what it costs — allocation, distributors, secondary market, MSRP fiction.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gap: 14 }}>
        {BOURBON_ECONOMY_TOPICS.map((t) => (
          <article key={t.id} style={{ padding: 22, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: '1px solid var(--foundry-border-subtle)' }}>
            <p style={{ color: 'var(--foundry-text)', fontSize: 17, margin: 0 }}>{t.title}</p>
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 8 }}>{t.tease}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 14, lineHeight: 1.65 }}>{t.explanation}</p>
            {t.rabbitHole && (
              <Link href={t.rabbitHole.href} style={{ display: 'inline-block', marginTop: 14, color: ACCENT, fontSize: 13 }}>
                {t.rabbitHole.label} →
              </Link>
            )}
          </article>
        ))}
      </div>
      <RabbitHoleFooter seed="economy" />
    </div>
  );
}
