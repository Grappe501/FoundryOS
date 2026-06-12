'use client';

import { useState } from 'react';
import { BOTTLE_STYLES, SERVE_METHODS, getPourAdvice } from '../../../lib/bourbon-level-1/wild/pour-guide';

const ACCENT = '#C8A96E';

export function PourImpactGuide() {
  const [styleId, setStyleId] = useState(BOTTLE_STYLES[0].id);
  const [methodId, setMethodId] = useState(SERVE_METHODS[0].id);
  const style = BOTTLE_STYLES.find((s) => s.id === styleId)!;
  const method = SERVE_METHODS.find((m) => m.id === methodId)!;
  const advice = getPourAdvice(styleId, methodId);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Same bottle, different serve — completely different experience. Pick your bottle style and how you pour.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Bottle style</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {BOTTLE_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStyleId(s.id)}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: `1px solid ${styleId === s.id ? ACCENT : '#2A2A2E'}`,
                background: styleId === s.id ? '#2A2520' : 'transparent',
                color: styleId === s.id ? '#E8E8EC' : '#8A8A8E',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Examples: {style.examples}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Serve method</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVE_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethodId(m.id)}
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                border: `1px solid ${methodId === m.id ? ACCENT : '#2A2A2E'}`,
                background: methodId === m.id ? '#2A2520' : 'transparent',
                color: methodId === m.id ? '#E8E8EC' : '#8A8A8E',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <article style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 12, border: `1px solid ${ACCENT}44` }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>{style.label} · {method.label}</p>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{method.description}</p>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 16, lineHeight: 1.7 }}>{advice}</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 16, fontSize: 11, color: '#6B6B70' }}>
          <span>Dilution: {method.dilution}</span>
          <span>Heat: {method.heat}</span>
        </div>
      </article>

      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 20, lineHeight: 1.6 }}>
        Tasting education starts neat or with a splash. Mixed drinks and juleps are a different mode — enjoyable, not inferior.
      </p>
    </div>
  );
}
