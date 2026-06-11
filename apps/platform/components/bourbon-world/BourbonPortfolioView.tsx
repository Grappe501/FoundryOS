'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorldPortfolio, type PortfolioEntry } from '../world/WorldMissionRunner';
import { BOURBON_MISSIONS, BOURBON_PORTFOLIO_KEY } from '../../lib/bourbon-world';
import { BOURBON_PORTFOLIO_SECTIONS } from '../../lib/bourbon-world-meta';

export function BourbonPortfolioView() {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  useEffect(() => {
    setEntries(getWorldPortfolio(BOURBON_PORTFOLIO_KEY));
  }, []);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7 }}>
        Mission evidence and debrief notes — proof logged from missions, not a consumption diary.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {BOURBON_PORTFOLIO_SECTIONS.map((section) => (
          <div key={section.slug} style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #4A4020' }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{section.title}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{section.description}</p>
            <p style={{ color: '#C8A96E', fontSize: 20, fontWeight: 300, marginTop: 12 }}>{section.slug === 'tastings' ? entries.length : '—'}</p>
          </div>
        ))}
      </div>
      {entries.length === 0 ? (
        <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 24 }}>
          No missions yet.{' '}
          <Link href="/bourbon/missions/first-tasting" style={{ color: '#C8A96E' }}>Start Mission 1 →</Link>
        </p>
      ) : (
        entries.map((e) => (
          <div key={e.missionSlug} style={{ padding: 16, marginTop: 12, background: '#0F0F12', borderRadius: 8 }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{e.missionTitle}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{e.reflection}</p>
          </div>
        ))
      )}
    </div>
  );
}
