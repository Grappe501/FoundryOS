'use client';

import Link from 'next/link';
import type { ConsequenceBundle } from '@foundry/consequence-engine';
import { effectKindLabel } from '@foundry/consequence-engine';

const ACCENT = 'var(--foundry-primary)';

const KIND_COLORS: Record<string, string> = {
  unlock_debate: '#9B6B9B',
  unlock_legendary_object: 'var(--foundry-primary)',
  unlock_collector_progress: 'var(--foundry-success)',
  unlock_rabbit_hole: '#6B8EBD',
  mentor_memory: '#BD8E6B',
  unlock_path: '#8E6BBD',
  unlock_collection: '#6BBD9B',
  identity_signal: '#BD6B8E',
  world_event_unlock: '#6B9BBD',
};

export function ConsequenceUnlockPanel({ bundle }: { bundle: ConsequenceBundle }) {
  return (
    <section style={{ marginTop: 20, padding: 20, background: '#0A0A0E', borderRadius: 10, border: '1px solid #2A2A3A' }}>
      <p style={{ color: '#8E6BBD', fontSize: 11, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        The world changed
      </p>
      <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 10, lineHeight: 1.5 }}>
        Because you completed <strong style={{ fontWeight: 500 }}>{bundle.chain.title}</strong>, new doors opened:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {bundle.effects.map((node) => (
          <li
            key={node.id}
            style={{
              marginTop: 10,
              padding: '12px 14px',
              background: 'var(--foundry-surface-raised)',
              borderRadius: 8,
              borderLeft: `3px solid ${KIND_COLORS[node.kind] ?? 'var(--foundry-text-dim)'}`,
            }}
          >
            <span style={{ color: KIND_COLORS[node.kind] ?? 'var(--foundry-text-faint)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {effectKindLabel(node.kind)}
            </span>
            {node.href ? (
              <Link href={node.href} style={{ display: 'block', color: 'var(--foundry-text)', fontSize: 14, marginTop: 4, textDecoration: 'none' }}>
                {node.label} →
              </Link>
            ) : (
              <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: '4px 0 0' }}>{node.label}</p>
            )}
            {node.description && <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{node.description}</p>}
          </li>
        ))}
      </ul>
      {bundle.mentor_line && (
        <blockquote style={{ marginTop: 20, padding: '14px 16px', background: '#1A1814', borderRadius: 8, borderLeft: `3px solid ${ACCENT}`, color: 'var(--foundry-primary)', fontSize: 14, fontStyle: 'italic' }}>
          Mentor: &ldquo;{bundle.mentor_line}&rdquo;
        </blockquote>
      )}
    </section>
  );
}
