'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorldPortfolio, type PortfolioEntry } from '../world/WorldMissionRunner';
import { POKER_MISSIONS, POKER_PORTFOLIO_KEY } from '../../lib/poker-world';
import { POKER_PORTFOLIO_SECTIONS } from '../../lib/poker-world-meta';

export function PokerPortfolioView() {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  useEffect(() => {
    setEntries(getWorldPortfolio(POKER_PORTFOLIO_KEY));
  }, []);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, lineHeight: 1.7 }}>
        Mission evidence and debrief notes — hand histories and session logs from missions.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {POKER_PORTFOLIO_SECTIONS.map((section) => (
          <div key={section.slug} style={{ padding: 16, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid #3A4A6A' }}>
            <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{section.title}</p>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{section.description}</p>
            <p style={{ color: '#6B8BB8', fontSize: 20, fontWeight: 300, marginTop: 12 }}>{section.slug === 'sessions' ? entries.length : '—'}</p>
          </div>
        ))}
      </div>
      {entries.length === 0 ? (
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 14, marginTop: 24 }}>
          No missions yet.{' '}
          <Link href="/poker/missions/track-bankroll" style={{ color: '#6B8BB8' }}>Start Mission 1 →</Link>
        </p>
      ) : (
        entries.map((e) => (
          <div key={e.missionSlug} style={{ padding: 16, marginTop: 12, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{e.missionTitle}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{e.reflection}</p>
          </div>
        ))
      )}
    </div>
  );
}
