'use client';

import Link from 'next/link';
import { getDidYouKnowForDate } from '../../../lib/bourbon-level-1/wild/did-you-know';

const ACCENT = 'var(--foundry-primary)';

export function DidYouKnowStrip({ compact = false }: { compact?: boolean }) {
  const card = getDidYouKnowForDate();

  return (
    <section
      style={{
        marginTop: compact ? 16 : 24,
        padding: compact ? 16 : 20,
        background: '#1A160F',
        borderRadius: 10,
        border: '1px dashed var(--foundry-primary)55',
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Did you know?
      </p>
      <p style={{ color: '#E8E8EC', fontSize: compact ? 14 : 16, marginTop: 10, lineHeight: 1.45, fontWeight: 400 }}>
        {card.headline}
      </p>
      {!compact && (
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{card.body}</p>
      )}
      {card.rabbitHoleHref && (
        <Link href={card.rabbitHoleHref} style={{ color: ACCENT, fontSize: 13, marginTop: 12, display: 'inline-block' }}>
          {card.rabbitHoleLabel ?? 'Go down the rabbit hole'} →
        </Link>
      )}
    </section>
  );
}
