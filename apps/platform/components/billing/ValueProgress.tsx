'use client';

import Link from 'next/link';
import { getWorldNextSteps, tierBadge, type NextStep } from '../../lib/value-next-steps';

type Props = {
  worldSlug: string;
  missionsCompleted: number;
  portfolioItems: number;
  communityJoined?: boolean;
  currentTier?: 'explore' | 'build' | 'mastery';
};

const tierColor: Record<string, string> = {
  free: '#6B6B70',
  build: '#6B9B6B',
  mastery: 'var(--foundry-primary)',
};

export function ValueProgress({ worldSlug, missionsCompleted, portfolioItems, communityJoined, currentTier = 'explore' }: Props) {
  const nextSteps = getWorldNextSteps(worldSlug);

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Your progress</h2>
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        <Stat label="Missions completed" value={String(missionsCompleted)} />
        <Stat label="Portfolio items" value={String(portfolioItems)} />
        <Stat label="Community" value={communityJoined ? 'Joined' : 'Explore'} />
        <Stat label="Your tier" value={currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} />
      </div>

      {nextSteps && (
        <div style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>What comes next?</h3>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Some steps are premium — visible, not hidden.</p>
          {nextSteps.steps.map((step) => (
            <NextStepRow key={step.href} step={step} currentTier={currentTier} />
          ))}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
      <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>{label}</p>
      <p style={{ color: '#E8E8EC', fontSize: 22, fontWeight: 300, margin: '6px 0 0' }}>{value}</p>
    </div>
  );
}

function NextStepRow({ step, currentTier }: { step: NextStep; currentTier: string }) {
  const hasAccess =
    step.tier === 'free' ||
    (step.tier === 'build' && (currentTier === 'build' || currentTier === 'mastery')) ||
    (step.tier === 'mastery' && currentTier === 'mastery');

  return (
    <div style={{ marginTop: 12, padding: 14, background: '#0F0F12', borderRadius: 8, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <div>
        <Link href={step.href} style={{ color: hasAccess ? '#E8E8EC' : '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
          {step.label} →
        </Link>
        {step.description && <p style={{ color: '#6B6B70', fontSize: 12, margin: '4px 0 0' }}>{step.description}</p>}
      </div>
      <span style={{ fontSize: 11, color: tierColor[step.tier], letterSpacing: '0.05em' }}>{tierBadge(step.tier)}</span>
    </div>
  );
}
