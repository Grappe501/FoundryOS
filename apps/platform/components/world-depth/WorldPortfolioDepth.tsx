'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorldPortfolio, type PortfolioEntry } from '../world/WorldMissionRunner';
import { UpgradeMoment } from '../billing/UpgradeMoment';
import { ValueProgress } from '../billing/ValueProgress';
import { getUpgradeMoment } from '../../lib/upgrade-moments';
import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
  basePath: string;
  portfolioKey: string;
  missionCount: number;
  firstMissionSlug: string;
  sections: { slug: string; title: string; description: string }[];
};

export function WorldPortfolioDepth({
  bundle,
  basePath,
  portfolioKey,
  missionCount,
  firstMissionSlug,
  sections,
}: Props) {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);

  useEffect(() => {
    setEntries(getWorldPortfolio(portfolioKey));
  }, [portfolioKey]);

  const completed = entries.length;
  const nextMission = completed < missionCount;
  const portfolioUpgrade = completed >= 1 ? getUpgradeMoment(bundle.slug, 'portfolio_entry') : undefined;

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7 }}>
        {bundle.portfolioLabel} — completed missions, evidence, reflections, and your next recommended action.
      </p>

      <ValueProgress
        worldSlug={bundle.slug}
        missionsCompleted={completed}
        portfolioItems={entries.length}
      />

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {sections.map((section) => (
          <div key={section.slug} style={{ padding: 16, background: '#111114', borderRadius: 8, border: '1px solid #1A1A1E' }}>
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{section.title}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{section.description}</p>
          </div>
        ))}
      </div>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: bundle.accentColor, margin: 0 }}>Completed missions</h2>
        {entries.length === 0 ? (
          <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 16 }}>
            No missions yet.{' '}
            <Link href={`${basePath}/missions/${firstMissionSlug}`} style={{ color: bundle.accentColor }}>
              Start Mission 1 →
            </Link>
          </p>
        ) : (
          entries.map((e) => (
            <div key={e.missionSlug} style={{ padding: 16, marginTop: 12, background: '#0F0F12', borderRadius: 8 }}>
              <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{e.missionTitle}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{new Date(e.completedAt).toLocaleDateString()}</p>
              {e.reflection && <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{e.reflection}</p>}
            </div>
          ))
        )}
      </section>

      {portfolioUpgrade && (
        <UpgradeMoment
          tier={portfolioUpgrade.tier}
          headline={portfolioUpgrade.headline}
          body={portfolioUpgrade.body}
          premiumNext={portfolioUpgrade.premiumNext}
          worldSlug={bundle.slug}
          context="portfolio_entry"
        />
      )}

      {nextMission && (
        <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', borderRadius: 8, border: `1px solid ${bundle.accentColor}33` }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Next recommended action</p>
          <Link href={`${basePath}/missions`} style={{ display: 'inline-block', marginTop: 12, color: bundle.accentColor, fontSize: 14 }}>
            Continue your next mission →
          </Link>
        </section>
      )}
    </div>
  );
}
