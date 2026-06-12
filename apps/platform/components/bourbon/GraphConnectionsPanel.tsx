'use client';

import Link from 'next/link';
import { groupConnections, type EntityGraphView } from '@foundry/atlas-graph-engine';

const ACCENT = '#C8A96E';

export function GraphConnectionsPanel({ graph }: { graph: EntityGraphView }) {
  const grouped = groupConnections(graph.connections);

  return (
    <section
      style={{
        marginTop: 36,
        padding: 24,
        background: 'linear-gradient(135deg, #0A1218 0%, #111114 100%)',
        border: '1px solid #2A3A4A',
        borderRadius: 10,
      }}
    >
      <p style={{ color: '#6B9BC9', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Why should I care?
      </p>
      <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>
        {graph.why_should_i_care ?? graph.why_it_matters}
      </p>

      {graph.identities && graph.identities.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {graph.identities.map((id) => (
            <span
              key={id}
              style={{
                padding: '4px 10px',
                fontSize: 11,
                color: ACCENT,
                background: '#1A2530',
                borderRadius: 4,
                border: `1px solid ${ACCENT}33`,
              }}
            >
              {id.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}

      <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '24px 0 0' }}>
        The graph · {graph.connection_count} connections
      </p>

      {graph.suggested_next && (
        <Link
          href={graph.suggested_next.href}
          style={{
            display: 'block',
            marginTop: 18,
            padding: 16,
            background: '#1A2530',
            borderRadius: 8,
            border: `1px solid ${ACCENT}55`,
            textDecoration: 'none',
          }}
        >
          <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Suggested next stop</p>
          <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 8 }}>{graph.suggested_next.title}</p>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{graph.suggested_next.teaser}</p>
        </Link>
      )}

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} style={{ marginTop: 24 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
            {group}
          </p>
          <div style={{ display: 'grid', gap: 8 }}>
            {items.map((c) => (
              <Link
                key={c.id}
                href={c.href}
                style={{
                  display: 'block',
                  padding: '12px 14px',
                  background: '#0F0F12',
                  borderRadius: 6,
                  border: '1px solid #1A1A1E',
                  textDecoration: 'none',
                }}
              >
                <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{c.title}</p>
                <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 6, lineHeight: 1.55 }}>{c.teaser}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
