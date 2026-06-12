'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getWorldLore } from '@foundry/lore-engine';

const ACCENT = 'var(--foundry-primary)';

export function BourbonUniverseMap() {
  const lore = getWorldLore('bourbon');
  const nodes = lore?.universeMap ?? [];
  const center = nodes.find((n) => n.distance === 0);
  const branches = nodes.filter((n) => n.distance > 0);
  const [active, setActive] = useState(center?.id ?? branches[0]?.id ?? '');

  const node = nodes.find((n) => n.id === active);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Wander the bourbon universe — every node is a rabbit hole. Not a syllabus.
      </p>

      <div
        style={{
          marginTop: 28,
          position: 'relative',
          height: 420,
          background: 'radial-gradient(circle at center, #1A1814 0%, #0A0A0E 70%)',
          borderRadius: 16,
          border: '1px solid var(--foundry-border-subtle)',
          overflow: 'hidden',
        }}
      >
        {center && (
          <button
            type="button"
            onClick={() => setActive(center.id)}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '14px 20px',
              borderRadius: '50%',
              border: `2px solid ${ACCENT}`,
              background: active === center.id ? 'var(--foundry-border-warm)' : 'var(--foundry-surface-raised)',
              color: 'var(--foundry-text)',
              fontSize: 14,
              cursor: 'pointer',
              zIndex: 2,
            }}
          >
            {center.label}
          </button>
        )}

        {branches.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const r = 38 + n.distance * 28;
          const x = 50 + Math.cos(rad) * r * 0.85;
          const y = 50 + Math.sin(rad) * r * 0.55;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(n.id)}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                padding: '8px 12px',
                borderRadius: 8,
                border: `1px solid ${active === n.id ? ACCENT : '#3A3A3E'}`,
                background: active === n.id ? 'var(--foundry-border-warm)' : 'var(--foundry-surface)',
                color: active === n.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
                fontSize: 11,
                cursor: 'pointer',
                maxWidth: 100,
                lineHeight: 1.3,
              }}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      {node && (
        <article style={{ marginTop: 24, padding: 22, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: `1px solid ${ACCENT}33` }}>
          <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Why this matters</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 18, marginTop: 8 }}>{node.label}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{node.tease}</p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 14, lineHeight: 1.65 }}>{node.body}</p>
          {node.href && (
            <Link href={node.href} style={{ display: 'inline-block', marginTop: 16, color: ACCENT, fontSize: 14 }}>
              Go deeper →
            </Link>
          )}
        </article>
      )}
    </div>
  );
}
