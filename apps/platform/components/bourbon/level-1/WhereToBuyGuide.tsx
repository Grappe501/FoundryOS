'use client';

import { useState } from 'react';
import { WHERE_TO_BUY } from '../../../lib/bourbon-level-1/wild/where-to-buy';

const ACCENT = 'var(--foundry-primary)';

export function WhereToBuyGuide() {
  const [regionId, setRegionId] = useState(WHERE_TO_BUY[0].id);
  const region = WHERE_TO_BUY.find((r) => r.id === regionId)!;

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Where to hunt bottles — regional tips, not affiliate links. Laws and allocation vary; always verify locally.
      </p>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {WHERE_TO_BUY.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRegionId(r.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: `1px solid ${regionId === r.id ? ACCENT : 'var(--foundry-border)'}`,
              background: regionId === r.id ? 'var(--foundry-border-warm)' : 'transparent',
              color: regionId === r.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {r.region}
          </button>
        ))}
      </div>

      <article style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>{region.region}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{region.context}</p>

        <p style={{ color: ACCENT, fontSize: 12, marginTop: 20, marginBottom: 8 }}>Best bets</p>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, paddingLeft: 18, lineHeight: 1.7 }}>
          {region.bestBets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <p style={{ color: ACCENT, fontSize: 12, marginTop: 16, marginBottom: 8 }}>Tips</p>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, paddingLeft: 18, lineHeight: 1.7 }}>
          {region.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <p style={{ color: '#B88', fontSize: 12, marginTop: 16, marginBottom: 8 }}>Watch for</p>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, paddingLeft: 18, lineHeight: 1.7 }}>
          {region.watchFor.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
