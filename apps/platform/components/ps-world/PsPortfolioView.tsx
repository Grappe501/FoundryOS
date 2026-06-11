'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorldPortfolio, type PortfolioEntry } from '../world/WorldMissionRunner';
import { PS_MISSIONS, PS_PORTFOLIO_KEY, PS_PORTFOLIO_SECTIONS } from '../../lib/public-speaking-world';

export function PsPortfolioView() {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  useEffect(() => {
    setEntries(getWorldPortfolio(PS_PORTFOLIO_KEY));
  }, []);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7 }}>
        Talks, stories, reviews, and reflections — proof you can communicate value.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {PS_PORTFOLIO_SECTIONS.map((section) => (
          <div key={section.slug} style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #2A3548' }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{section.title}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{section.description}</p>
            <p style={{ color: '#6B8BB8', fontSize: 20, fontWeight: 300, marginTop: 12 }}>{section.slug === 'talks' ? entries.length : '—'}</p>
          </div>
        ))}
      </div>
      {entries.length === 0 ? (
        <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 24 }}>
          No missions yet.{' '}
          <Link href="/public-speaking/missions/first-talk" style={{ color: '#6B8BB8' }}>Start Mission 1 →</Link>
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
