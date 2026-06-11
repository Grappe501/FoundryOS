'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorldPortfolio } from '../world/WorldMissionRunner';
import { TRINITY_WORLDS } from '../../lib/trinity-worlds';

export function TrinityJourneyProgress({ compact = false }: { compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setMounted(true);
    const next: Record<string, number> = {};
    for (const world of TRINITY_WORLDS) {
      next[world.slug] = getWorldPortfolio(world.portfolioKey).length;
    }
    setCounts(next);
  }, []);

  const totalCompleted = Object.values(counts).reduce((a, b) => a + b, 0);
  const totalMissions = TRINITY_WORLDS.reduce((a, w) => a + w.missionCount, 0);

  return (
    <section style={{ marginTop: compact ? 0 : 24, padding: 24, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ fontSize: compact ? 14 : 16, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>
          Your Future-Proof Journey
        </h2>
        {!compact && (
          <Link href="/my-journey" style={{ color: '#6B9B6B', fontSize: 13, textDecoration: 'none' }}>
            Full dashboard →
          </Link>
        )}
      </div>
      {!mounted ? (
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>Loading your progress…</p>
      ) : (
        <>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>
            {totalCompleted === 0
              ? 'Start Mission 1 in any world — your progress follows you here.'
              : `${totalCompleted} of ${totalMissions} missions complete across the Trinity.`}
          </p>
          <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
            {TRINITY_WORLDS.map((world) => {
              const done = counts[world.slug] ?? 0;
              const pct = Math.round((done / world.missionCount) * 100);
              return (
                <div key={world.slug}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: '#E8E8EC' }}>{world.name}</span>
                    <span style={{ color: world.accent }}>
                      {done}/{world.missionCount} missions
                    </span>
                  </div>
                  <div style={{ height: 6, background: '#1A1A1E', borderRadius: 3, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: world.accent,
                        borderRadius: 3,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
