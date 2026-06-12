'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBottleXRay, listXRayBottles } from '../../../lib/bourbon-level-1/agency/bottle-xray';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function BottleXRayTool({ initialSlug }: { initialSlug?: string }) {
  const bottles = listXRayBottles();
  const [slug, setSlug] = useState(initialSlug ?? bottles[0]?.slug ?? '');
  const xray = getBottleXRay(slug);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Football-analyst breakdown — mashbill, proof, warehouse, flavor sources. Pick a bottle.
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {bottles.map((b) => (
          <button
            key={b.slug}
            type="button"
            onClick={() => setSlug(b.slug)}
            style={{
              padding: '8px 12px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${slug === b.slug ? ACCENT : 'var(--foundry-border)'}`,
              background: slug === b.slug ? 'var(--foundry-border-warm)' : 'transparent',
              color: slug === b.slug ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {b.name}
          </button>
        ))}
      </div>

      {xray && (
        <>
          <article style={{ marginTop: 28, padding: 22, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: `1px solid ${ACCENT}33` }}>
            <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Analyst take</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 12, lineHeight: 1.65 }}>{xray.analystTake}</p>
          </article>

          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Layer breakdown</h2>
            <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
              {xray.layers.map((l) => (
                <div key={l.label} style={{ padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, display: 'grid', gap: 6, gridTemplateColumns: '120px 1fr' }}>
                  <span style={{ color: ACCENT, fontSize: 12 }}>{l.label}</span>
                  <div>
                    <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{l.value}</p>
                    <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{l.whyItMatters}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Where flavors come from</h2>
            <div style={{ marginTop: 14, display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {xray.flavorBreakdown.map((f) => (
                <article key={f.note} style={{ padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
                  <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{f.note}</p>
                  <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 6 }}>{f.from}</p>
                </article>
              ))}
            </div>
          </section>

          <Link href={`/bourbon/bottles/${slug}`} style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
            Bottle progression path →
          </Link>
        </>
      )}
      <RabbitHoleFooter seed={slug} />
    </div>
  );
}
