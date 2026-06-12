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
      <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.65 }}>
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
              border: `1px solid ${selected === n.id ? ACCENT : '#2A2A2E'}`,
              background: selected === n.id ? '#2A2520' : '#111114',
              color: selected === n.id ? '#E8E8EC' : '#8A8A8E',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {center && (
        <article style={{ marginTop: 28, padding: 24, background: '#111114', borderRadius: 12, border: `1px solid ${ACCENT}55` }}>
          <h2 style={{ fontSize: 20, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>{center.label}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{center.tease}</p>
          {center.href && (
            <Link href={center.href} style={{ color: ACCENT, fontSize: 13, marginTop: 12, display: 'inline-block' }}>
              Go deeper →
            </Link>
          )}
        </article>
      )}

      <section style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Connected to {center?.label}</h3>
        <div style={{ marginTop: 12, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {connected.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setSelected(n.id)}
              style={{
                padding: 16,
                textAlign: 'left',
                background: '#0F0F12',
                border: '1px solid #1A1A1E',
                borderRadius: 8,
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{n.label}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 6 }}>{n.tease}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
