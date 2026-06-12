'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HOUSE_OF_BOURBON_ROOT, ORIGIN_BRANCHES, ORIGIN_MYTH } from '../../../lib/bourbon-level-1/wild/origins';

const ACCENT = 'var(--foundry-primary)';

export function BourbonOriginsMap() {
  const [branch, setBranch] = useState<'whiskey' | 'street'>('whiskey');
  const active = ORIGIN_BRANCHES.find((b) => b.id === branch)!;

  return (
    <div>
      <article style={{ padding: 24, background: '#111114', borderRadius: 12, border: `1px solid ${ACCENT}44` }}>
        <h2 style={{ fontSize: 20, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>{HOUSE_OF_BOURBON_ROOT.title}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>{HOUSE_OF_BOURBON_ROOT.body}</p>
      </article>

      <div style={{ marginTop: 20, padding: 16, background: '#1A160F', borderRadius: 8, border: '1px solid #402020' }}>
        <p style={{ color: '#B88', fontSize: 13, margin: 0 }}>Myth: {ORIGIN_MYTH.myth}</p>
        <p style={{ color: ACCENT, fontSize: 14, marginTop: 8 }}>Truth: {ORIGIN_MYTH.truth}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
        {ORIGIN_BRANCHES.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBranch(b.id)}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 8,
              border: `1px solid ${branch === b.id ? ACCENT : '#2A2A2E'}`,
              background: branch === b.id ? '#2A2520' : '#0F0F12',
              color: branch === b.id ? '#E8E8EC' : '#8A8A8E',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {b.title.replace('Branch 1 → ', '').replace('Branch 2 → ', '')}
          </button>
        ))}
      </div>

      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16 }}>{active.subtitle}</p>

      <div style={{ marginTop: 16, position: 'relative', paddingLeft: 20, borderLeft: `2px solid ${ACCENT}` }}>
        {active.nodes.map((node, i) => (
          <div key={node.id} style={{ marginBottom: i === active.nodes.length - 1 ? 0 : 24, position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: -27,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: ACCENT,
              }}
            />
            <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{node.label}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{node.detail}</p>
          </div>
        ))}
      </div>

      <Link href="/bourbon/wild/bourbon-street" style={{ display: 'inline-block', marginTop: 24, color: ACCENT, fontSize: 14 }}>
        Why is Bourbon Street called that? →
      </Link>
    </div>
  );
}
