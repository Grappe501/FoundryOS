'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  validateRecommendationEngine,
  summarizeRecommendationSignals,
  recommendationsFromArtifacts,
} from '@foundry/recommendation-engine-v2';
import { reviewsFromArtifacts } from '@foundry/review-engine';
import { ARTIFACTS_CHANGED_EVENT, listClientArtifacts } from '../../../lib/artifacts/client-store';

export default function OperatorRecommendationsPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const data = useMemo(() => {
    const validation = validateRecommendationEngine();
    const artifacts = listClientArtifacts();
    const recommendations = recommendationsFromArtifacts(artifacts);
    const reviews = reviewsFromArtifacts(artifacts);
    const summary = summarizeRecommendationSignals(artifacts);
    const byEntity = Object.entries(summary.by_entity).sort((a, b) => b[1] - a[1]);
    const reviewBacked = recommendations.filter((r) => r.based_on_reviews.length > 0).length;
    const graphLinked = summary.influence.recommendations_connected_to_graph;

    return {
      validation,
      recommendations,
      summary,
      byEntity,
      reviewBacked,
      graphLinked,
      reviewCount: reviews.length,
      conversionRate: reviews.length ? Math.round((reviewBacked / reviews.length) * 100) : 0,
    };
  }, [tick]);

  return (
    <main className="foundry-page foundry-page--wide" style={{ padding: '2rem' }}>
      <Link href="/operator" className="foundry-link-accent" style={{ fontSize: 13 }}>
        ← Mission Control
      </Link>
      <header style={{ marginTop: 16, marginBottom: 28 }}>
        <p className="foundry-eyebrow">PASS-040F · Recommendation Engine</p>
        <h1 className="foundry-mc-title">Recommendation Dashboard</h1>
        <p className="foundry-muted" style={{ marginTop: 8 }}>
          Human judgment artifacts — influence signals, not popularity algorithms.
        </p>
        <p style={{ fontSize: 13, marginTop: 10, color: data.validation.ok ? 'var(--foundry-success)' : 'var(--foundry-accent)' }}>
          validateRecommendationEngine: {data.validation.ok ? '✓ OK' : data.validation.errors.join('; ')}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
        <Stat label="Total recommendations" value={data.summary.total} />
        <Stat label="Private" value={data.summary.private_count} />
        <Stat label="Public" value={data.summary.public_count} />
        <Stat label="Graph-linked" value={data.graphLinked} />
        <Stat label="Review-backed" value={data.reviewBacked} />
        <Stat label="Review→rec %" value={data.conversionRate} suffix="%" />
      </div>

      <Section title="Influence signal stub">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 13 }}>
          {Object.entries(data.summary.influence).map(([k, v]) => (
            <p key={k} style={{ margin: '4px 0', color: 'var(--foundry-text-muted)' }}>
              {k.replace(/_/g, ' ')}: <span style={{ color: 'var(--foundry-text)' }}>{v}</span>
            </p>
          ))}
        </div>
      </Section>

      <Section title="Recommendations by world">
        {Object.entries(data.summary.by_world).map(([w, n]) => (
          <p key={w} style={{ fontSize: 14, margin: '6px 0' }}>
            {w}: {n}
          </p>
        ))}
        {Object.keys(data.summary.by_world).length === 0 && <Empty />}
      </Section>

      <Section title="Most recommended nodes">
        {data.byEntity.slice(0, 8).map(([key, n]) => (
          <p key={key} style={{ fontSize: 14, margin: '6px 0' }}>
            {key}: {n}
          </p>
        ))}
        {data.byEntity.length === 0 && <Empty note="No recommendations yet — expected for v1" />}
      </Section>

      <Section title="Latest recommendations">
        {data.recommendations.slice(0, 6).map((r) => (
          <p key={r.id} style={{ fontSize: 13, margin: '8px 0', color: 'var(--foundry-text-muted)' }}>
            {r.title} · {r.entity_slug} · {r.privacy}
            {r.based_on_reviews.length > 0 ? ' · review-backed' : ''}
          </p>
        ))}
        {data.recommendations.length === 0 && <Empty />}
      </Section>
    </main>
  );
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
      <p style={{ fontSize: 11, color: 'var(--foundry-text-faint)', margin: 0 }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 300, margin: '8px 0 0' }}>
        {value}
        {suffix ?? ''}
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 28, padding: 20, background: 'var(--foundry-surface)', borderRadius: 10 }}>
      <h2 style={{ fontSize: 14, fontWeight: 400, margin: '0 0 12px', color: 'var(--foundry-primary)' }}>{title}</h2>
      {children}
    </section>
  );
}

function Empty({ note }: { note?: string }) {
  return <p style={{ fontSize: 13, color: 'var(--foundry-text-faint)' }}>{note ?? 'None yet'}</p>;
}
