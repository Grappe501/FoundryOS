'use client';

import { getWorldObsession } from '@foundry/mentor-engine';

type Props = { worldSlug: string; accent?: string };

export function WorldObsessionSection({ worldSlug, accent = '#6B9B6B' }: Props) {
  const obsession = getWorldObsession(worldSlug);
  if (!obsession) return null;

  return (
    <section
      style={{
        marginTop: 24,
        padding: 28,
        background: 'linear-gradient(135deg, #0F0F12 0%, #111114 100%)',
        border: `1px solid ${accent}33`,
        borderRadius: 12,
      }}
    >
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Why people fall in love with this
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 400, marginTop: 12, color: '#E8E8EC', lineHeight: 1.35 }}>
        {obsession.headline}
      </h2>
      <div style={{ marginTop: 20, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {obsession.reasons.map((r) => (
          <article key={r.title}>
            <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{r.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{r.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
