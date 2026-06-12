'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DISTILLERY_CAMPUSES, getCampus } from '../../../lib/bourbon-level-1/agency/campus-maps';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function DistilleryCampusMap() {
  const [slug, setSlug] = useState(DISTILLERY_CAMPUSES[0].producerSlug);
  const campus = getCampus(slug)!;
  const [activePoint, setActivePoint] = useState(campus.points[0]?.id ?? '');

  const point = campus.points.find((p) => p.id === activePoint) ?? campus.points[0];

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Click rickhouse, still, bottling — why this matters on campus.
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {DISTILLERY_CAMPUSES.map((c) => (
          <button key={c.producerSlug} type="button" onClick={() => { setSlug(c.producerSlug); setActivePoint(getCampus(c.producerSlug)!.points[0].id); }} style={{ padding: '8px 14px', fontSize: 12, borderRadius: 6, border: `1px solid ${slug === c.producerSlug ? ACCENT : 'var(--foundry-border)'}`, background: slug === c.producerSlug ? 'var(--foundry-border-warm)' : 'transparent', color: slug === c.producerSlug ? 'var(--foundry-text)' : 'var(--foundry-text-muted)', cursor: 'pointer' }}>
            {c.name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24, position: 'relative', height: 320, background: 'var(--foundry-surface)', borderRadius: 12, border: '1px solid var(--foundry-border-subtle)' }}>
        <p style={{ position: 'absolute', top: 12, left: 16, color: 'var(--foundry-text-faint)', fontSize: 12, margin: 0 }}>{campus.tagline}</p>
        {campus.points.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePoint(p.id)}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
              padding: '8px 10px',
              fontSize: 11,
              borderRadius: 6,
              border: `1px solid ${activePoint === p.id ? ACCENT : '#3A3A3E'}`,
              background: activePoint === p.id ? 'var(--foundry-border-warm)' : 'var(--foundry-surface-raised)',
              color: activePoint === p.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {point && (
        <article style={{ marginTop: 20, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10 }}>
          <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Why this matters</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 8 }}>{point.label}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{point.whyItMatters}</p>
        </article>
      )}

      <Link href={`/bourbon/producers/${slug}`} style={{ display: 'inline-block', marginTop: 16, color: ACCENT, fontSize: 14 }}>
        Full producer atlas →
      </Link>
      <RabbitHoleFooter seed={slug} />
    </div>
  );
}
