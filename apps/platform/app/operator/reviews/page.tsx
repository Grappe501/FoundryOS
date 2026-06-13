'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { validateReviewEngine, summarizeReviewSignals, reviewsFromArtifacts } from '@foundry/review-engine';
import { ARTIFACTS_CHANGED_EVENT, listClientArtifacts } from '../../../lib/artifacts/client-store';

export default function OperatorReviewsPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(ARTIFACTS_CHANGED_EVENT, refresh);
  }, []);

  const data = useMemo(() => {
    const validation = validateReviewEngine();
    const artifacts = listClientArtifacts();
    const reviews = reviewsFromArtifacts(artifacts);
    const summary = summarizeReviewSignals(artifacts);
    const byEntity = Object.entries(summary.by_entity).sort((a, b) => b[1] - a[1]);
    const privateCount = summary.private_count;
    const publicCount = summary.public_count;

    return { validation, reviews, summary, byEntity, privateCount, publicCount, totalArtifacts: artifacts.filter((a) => a.type === 'review').length };
  }, [tick]);

  return (
    <main className="foundry-page foundry-page--wide" style={{ padding: '2rem' }}>
      <Link href="/operator" className="foundry-link-accent" style={{ fontSize: 13 }}>
        ← Mission Control
      </Link>
      <header style={{ marginTop: 16, marginBottom: 28 }}>
        <p className="foundry-eyebrow">PASS-040E · Review Engine</p>
        <h1 className="foundry-mc-title">Review Dashboard</h1>
        <p className="foundry-muted" style={{ marginTop: 8 }}>
          Artifact-backed reviews — no fake community data.
        </p>
        <p style={{ fontSize: 13, marginTop: 10, color: data.validation.ok ? 'var(--foundry-success)' : 'var(--foundry-accent)' }}>
          validateReviewEngine: {data.validation.ok ? '✓ OK' : data.validation.errors.join('; ')}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <Stat label="Total reviews" value={data.summary.total} />
        <Stat label="Private" value={data.privateCount} />
        <Stat label="Public" value={data.publicCount} />
        <Stat label="Review artifacts" value={data.totalArtifacts} />
      </div>

      <Section title="Reviews by world">
        {Object.entries(data.summary.by_world).map(([w, n]) => (
          <p key={w} style={{ fontSize: 14, margin: '6px 0' }}>
            {w}: {n}
          </p>
        ))}
        {Object.keys(data.summary.by_world).length === 0 && <Empty />}
      </Section>

      <Section title="Most reviewed nodes">
        {data.byEntity.slice(0, 8).map(([key, n]) => (
          <p key={key} style={{ fontSize: 14, margin: '6px 0' }}>
            {key}: {n}
          </p>
        ))}
        {data.byEntity.length === 0 && <Empty note="No reviews yet — expected for v1" />}
      </Section>

      <Section title="Latest reviews">
        {data.reviews.slice(0, 6).map((r) => (
          <p key={r.id} style={{ fontSize: 13, margin: '8px 0', color: 'var(--foundry-text-muted)' }}>
            {r.title} · {r.entity_slug} · {r.privacy}
          </p>
        ))}
        {data.reviews.length === 0 && <Empty />}
      </Section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
      <p style={{ fontSize: 11, color: 'var(--foundry-text-faint)', margin: 0 }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 300, margin: '8px 0 0' }}>{value}</p>
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
