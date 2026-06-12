'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDailyBourbon } from '../../../lib/bourbon-level-1/daily-bourbon';
import { getDailySeen, markDailySeen } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function DailyBourbonCard({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const daily = getDailyBourbon();

  useEffect(() => {
    setMounted(true);
    if (getDailySeen() !== daily.dateKey) markDailySeen(daily.dateKey);
  }, [daily.dateKey]);

  if (!mounted) return null;

  return (
    <section
      style={{
        marginTop: compact ? 0 : 28,
        padding: compact ? 18 : 24,
        background: 'linear-gradient(135deg, var(--foundry-primary-bg-subtle) 0%, var(--foundry-surface) 100%)',
        border: `1px solid ${ACCENT}44`,
        borderRadius: 12,
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Daily Bourbon · {daily.dateKey}
      </p>
      <p style={{ color: 'var(--foundry-text)', fontSize: compact ? 14 : 15, marginTop: 12, lineHeight: 1.6 }}>
        <strong style={{ fontWeight: 500 }}>Fact:</strong> {daily.fact.text}
      </p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10 }}>
        <strong style={{ color: ACCENT, fontWeight: 500 }}>Bottle:</strong>{' '}
        <Link href={`/bourbon/what-should-i-buy`} style={{ color: 'var(--foundry-text)' }}>{daily.bottle.name}</Link>
        {' — '}{daily.bottle.hook}
      </p>
      {!compact && (
        <>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 10 }}>
            <strong style={{ color: 'var(--foundry-text-faint)' }}>Compare:</strong> {daily.comparison.question}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
            <Link href="/bourbon/games" style={{ padding: '8px 14px', background: '#2A4020', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 12, textDecoration: 'none' }}>
              {daily.challenge.text} →
            </Link>
            <Link href="/bourbon/myths" style={{ padding: '8px 14px', background: 'var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 12, textDecoration: 'none' }}>
              Myth: {daily.question.text.slice(0, 40)}…
            </Link>
            <Link href="/bourbon/daily" style={{ padding: '8px 14px', color: ACCENT, fontSize: 12, textDecoration: 'none' }}>
              Full daily →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
