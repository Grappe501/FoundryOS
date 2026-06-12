'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONNECTION_NODES, getConnectedNodes, getNode } from '../../../lib/bourbon-level-1/wild/connections';

const ACCENT = 'var(--foundry-primary)';

export function BourbonConnectionsGraph() {
  const [selected, setSelected] = useState('bourbon');
  const center = getNode(selected);
  const connected = getConnectedNodes(selected);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, lineHeight: 1.65 }}>
        Click a topic — see what connects. This is Wikipedia energy, not a syllabus.
      </p>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CONNECTION_NODES.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setSelected(n.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              border: `1px solid ${selected === n.id ? ACCENT : 'var(--foundry-border)'}`,
              background: selected === n.id ? 'var(--foundry-border-warm)' : 'var(--foundry-surface-raised)',
              color: selected === n.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {center && (
        <article style={{ marginTop: 28, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: `1px solid ${ACCENT}55` }}>
          <h2 style={{ fontSize: 20, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>{center.label}</h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>{center.tease}</p>
          {center.href && (
            <Link href={center.href} style={{ color: ACCENT, fontSize: 13, marginTop: 12, display: 'inline-block' }}>
              Go deeper →
            </Link>
          )}
        </article>
      )}

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Connected to {center?.label}</h3>
        <div style={{ marginTop: 12, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {connected.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelected(n.id)}
              style={{
                padding: 16,
                textAlign: 'left',
                background: 'var(--foundry-surface)',
                border: '1px solid var(--foundry-border-subtle)',
                borderRadius: 8,
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{n.label}</p>
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{n.tease}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
