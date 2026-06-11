'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPortfolio, type PortfolioEntry } from './MissionRunner';
import { AI_BUILDER_MISSIONS, AI_BUILDER_PORTFOLIO_SECTIONS } from '../../lib/ai-builder-world';

export function PortfolioView() {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);

  useEffect(() => {
    setEntries(getPortfolio());
  }, []);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7 }}>
        Every mission you complete lands here — projects built, evidence earned, reflections written. This becomes
        employable proof.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {AI_BUILDER_PORTFOLIO_SECTIONS.map((section) => (
          <div key={section.slug} style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{section.title}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{section.description}</p>
            <p style={{ color: '#6B9B6B', fontSize: 20, fontWeight: 300, marginTop: 12 }}>
              {section.slug === 'projects' ? entries.length : '—'}
            </p>
          </div>
        ))}
      </div>
      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Completed missions</h2>
        {entries.length === 0 ? (
          <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 16 }}>
            No missions yet.{' '}
            <Link href="/ai-builder/missions/homework-assistant" style={{ color: '#6B9B6B' }}>
              Start Mission 1 →
            </Link>
          </p>
        ) : (
          <div style={{ marginTop: 16 }}>
            {entries.map((e) => (
              <div key={e.missionSlug} style={{ padding: 16, marginBottom: 12, background: '#0F0F12', borderRadius: 8 }}>
                <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{e.missionTitle}</p>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
                  {new Date(e.completedAt).toLocaleDateString()}
                </p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{e.reflection}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      {entries.length < AI_BUILDER_MISSIONS.length && (
        <Link
          href="/ai-builder/missions"
          style={{ display: 'inline-block', marginTop: 24, color: '#6B9B6B', fontSize: 14 }}
        >
          Take another mission →
        </Link>
      )}
    </div>
  );
}
