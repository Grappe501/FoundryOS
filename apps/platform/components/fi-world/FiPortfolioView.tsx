'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorldPortfolio, type PortfolioEntry } from '../world/WorldMissionRunner';
import { FI_MISSIONS, FI_PORTFOLIO_KEY, FI_PORTFOLIO_SECTIONS } from '../../lib/financial-independence-world';

export function FiPortfolioView() {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  useEffect(() => {
    setEntries(getWorldPortfolio(FI_PORTFOLIO_KEY));
  }, []);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7 }}>
        Budgets, savings goals, analyses, and your wealth strategy — employable proof you understand money.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {FI_PORTFOLIO_SECTIONS.map((section) => (
          <div key={section.slug} style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #2A2520' }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{section.title}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{section.description}</p>
            <p style={{ color: '#C8A96E', fontSize: 20, fontWeight: 300, marginTop: 12 }}>{section.slug === 'budgets' ? entries.length : '—'}</p>
          </div>
        ))}
      </div>
      {entries.length === 0 ? (
        <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 24 }}>
          No missions yet.{' '}
          <Link href="/financial-independence/missions/first-budget" style={{ color: '#C8A96E' }}>Start Mission 1 →</Link>
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
