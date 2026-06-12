'use client';

import { useState } from 'react';
import { BOTTLE_STYLES, SERVE_METHODS, getPourAdvice } from '../../../lib/bourbon-level-1/wild/pour-guide';

const ACCENT = 'var(--foundry-primary)';

export function PourImpactGuide() {
  const [styleId, setStyleId] = useState(BOTTLE_STYLES[0].id);
  const [methodId, setMethodId] = useState(SERVE_METHODS[0].id);
  const style = BOTTLE_STYLES.find((s) => s.id === styleId)!;
  const method = SERVE_METHODS.find((m) => m.id === methodId)!;
  const advice = getPourAdvice(styleId, methodId);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Same bottle, different serve — completely different experience. Pick your bottle style and how you pour.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Bottle style</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {BOTTLE_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyleId(s.id)}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: `1px solid ${styleId === s.id ? ACCENT : 'var(--foundry-border)'}`,
                background: styleId === s.id ? 'var(--foundry-border-warm)' : 'transparent',
                color: styleId === s.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>Examples: {style.examples}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Serve method</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVE_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethodId(m.id)}
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                border: `1px solid ${methodId === m.id ? ACCENT : 'var(--foundry-border)'}`,
                background: methodId === m.id ? 'var(--foundry-border-warm)' : 'transparent',
                color: methodId === m.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <article style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: `1px solid ${ACCENT}44` }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{style.label} · {method.label}</p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 8 }}>{method.description}</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>{advice}</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 16, fontSize: 11, color: 'var(--foundry-text-faint)' }}>
          <span>Dilution: {method.dilution}</span>
          <span>Heat: {method.heat}</span>
        </div>
      </article>

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 20, lineHeight: 1.6 }}>
        Tasting education starts neat or with a splash. Mixed drinks and juleps are a different mode — enjoyable, not inferior.
      </p>
    </div>
  );
}
