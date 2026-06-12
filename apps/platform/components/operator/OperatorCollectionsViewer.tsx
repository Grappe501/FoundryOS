'use client';

import { useState } from 'react';
import {
  COLLECTION_DEFINITIONS,
  COLLECTION_EARN_RULES,
  LIVE_COLLECTOR_WORLDS,
  collectionsForWorld,
  earnRulesForCollection,
} from '@foundry/collector-engine';

const WORLD_LABELS: Record<string, string> = {
  bourbon: 'Bourbon',
  'ai-builder': 'AI Builder',
  'public-speaking': 'Public Speaking',
  'civic-engagement': 'Civic Engagement',
  bbq: 'BBQ',
  poker: 'Poker',
  'financial-independence': 'Financial Independence',
};

export function OperatorCollectionsViewer() {
  const [world, setWorld] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const definitions =
    world === 'all' ? COLLECTION_DEFINITIONS : collectionsForWorld(world);

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <FilterChip active={world === 'all'} onClick={() => setWorld('all')} label="All worlds" />
        {LIVE_COLLECTOR_WORLDS.map((w) => (
          <FilterChip
            key={w}
            active={world === w}
            onClick={() => setWorld(w)}
            label={WORLD_LABELS[w] ?? w}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {definitions.map((def) => {
          const rules = earnRulesForCollection(def.id);
          const open = expanded === def.id;
          return (
            <article
              key={def.id}
              style={{
                padding: 18,
                background: 'var(--foundry-surface)',
                borderRadius: 8,
                border: '1px solid var(--foundry-border-subtle)',
              }}
            >
              <button
                type="button"
                onClick={() => setExpanded(open ? null : def.id)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ color: 'var(--foundry-text-faint)', fontSize: 10, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {WORLD_LABELS[def.world_slug] ?? def.world_slug} · {def.id}
                    </p>
                    <p style={{ color: 'var(--foundry-text)', fontSize: 17, margin: '6px 0 0', fontWeight: 400 }}>{def.title}</p>
                  </div>
                  <p style={{ color: 'var(--foundry-success)', fontSize: 13, margin: 0 }}>{def.items.length} items</p>
                </div>
                <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>{def.story}</p>
              </button>

              {open && (
                <div style={{ marginTop: 16, borderTop: '1px solid var(--foundry-border-subtle)', paddingTop: 16 }}>
                  <p style={{ color: 'var(--foundry-primary)', fontSize: 11, margin: '0 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Items
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.8 }}>
                    {def.items.map((item) => (
                      <li key={item.id}>
                        <span style={{ color: 'var(--foundry-text)' }}>{item.label}</span>
                        {item.tease && <span style={{ color: 'var(--foundry-text-faint)' }}> — {item.tease}</span>}
                        <span style={{ color: 'var(--foundry-text-dim)', fontSize: 11 }}> ({item.id})</span>
                      </li>
                    ))}
                  </ul>

                  <p style={{ color: '#6B9BD4', fontSize: 11, margin: '18px 0 10px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    How earned
                  </p>
                  {rules.length === 0 ? (
                    <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>Via consequence chains or portfolio actions (rule TBD)</p>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.8 }}>
                      {rules.map((r) => (
                        <li key={r.id}>
                          <span style={{ color: 'var(--foundry-text)' }}>{r.label}</span>
                          <span style={{ color: 'var(--foundry-text-faint)' }}>
                            {' '}
                            · {r.action_type}
                            {r.action_id ? `:${r.action_id}` : ''}
                            {r.item_id ? ` → ${r.item_id}` : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <section style={{ marginTop: 32, padding: 18, background: '#0F1218', border: '1px solid #2A2A3A', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: 0 }}>Earn rule registry ({COLLECTION_EARN_RULES.length} rules)</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
          Consequence Engine emits unlock_collector_progress effects. Collector Engine maps them to collection_progress,
          collection_unlocked, and collection_completed events.
        </p>
      </section>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 14px',
        background: active ? 'var(--foundry-success-bg)' : 'var(--foundry-surface-raised)',
        border: `1px solid ${active ? '#3A5A3A' : 'var(--foundry-border-subtle)'}`,
        borderRadius: 6,
        color: active ? 'var(--foundry-text)' : 'var(--foundry-text-faint)',
        fontSize: 12,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
