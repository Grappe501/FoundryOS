'use client';

import { useState } from 'react';
import {
  LIVE_EVENT_WORLDS,
  WORLD_EVENT_TYPES,
  EVENT_TYPE_LABELS,
  validateEventPools,
  allEventDefinitions,
  getActiveWorldEvents,
} from '@foundry/world-events-engine';

const WORLD_LABELS: Record<string, string> = {
  bourbon: 'Bourbon',
  'ai-builder': 'AI Builder',
  'public-speaking': 'Public Speaking',
  'civic-engagement': 'Civic Engagement',
  bbq: 'BBQ',
  poker: 'Poker',
  'financial-independence': 'Financial Independence',
};

export function OperatorEventsViewer() {
  const [world, setWorld] = useState<string>('all');
  const validation = validateEventPools();
  const defs = allEventDefinitions();
  const activeByWorld = LIVE_EVENT_WORLDS.map((w) => ({
    world: w,
    snapshot: getActiveWorldEvents(w),
  }));

  const filtered = world === 'all' ? defs : defs.filter((d) => d.world_slug === world);

  return (
    <div style={{ marginTop: 28 }}>
      <section style={{ padding: 16, background: validation.ok ? '#0F1210' : '#1A1010', borderRadius: 8, border: `1px solid ${validation.ok ? '#2A3A2A' : '#3A2A2A'}` }}>
        <p style={{ color: validation.ok ? 'var(--foundry-success)' : '#8B4545', fontSize: 13, margin: 0 }}>
          Pool validation: {validation.ok ? 'All 7 worlds × 8 event types' : validation.errors.join('; ')}
        </p>
      </section>

      <section style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <Stat label="Definitions" value={defs.length} />
        <Stat label="Worlds" value={LIVE_EVENT_WORLDS.length} />
        <Stat label="Event types" value={WORLD_EVENT_TYPES.length} />
      </section>

      <section style={{ marginTop: 24 }}>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 12, margin: '0 0 12px' }}>Active rotation today</p>
        {activeByWorld.map(({ world: w, snapshot }) => (
          <div key={w} style={{ marginBottom: 16, padding: 14, background: 'var(--foundry-surface)', borderRadius: 8 }}>
            <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{WORLD_LABELS[w] ?? w}</p>
            {snapshot ? (
              <>
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{snapshot.hero_title}</p>
                <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 4 }}>{snapshot.events.length} active events · {snapshot.date_key}</p>
              </>
            ) : (
              <p style={{ color: '#8B4545', fontSize: 12, marginTop: 6 }}>No snapshot</p>
            )}
          </div>
        ))}
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24, marginBottom: 16 }}>
        <FilterChip active={world === 'all'} onClick={() => setWorld('all')} label="All" />
        {LIVE_EVENT_WORLDS.map((w) => (
          <FilterChip key={w} active={world === w} onClick={() => setWorld(w)} label={WORLD_LABELS[w] ?? w} />
        ))}
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {filtered.map((d) => (
          <article key={d.event_id} style={{ padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 10, margin: 0 }}>
              {WORLD_LABELS[d.world_slug]} · {EVENT_TYPE_LABELS[d.event_type]} · {d.event_id}
            </p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: '6px 0 0' }}>{d.title}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 6 }}>{d.short_hook}</p>
            {d.collector_action && (
              <p style={{ color: 'var(--foundry-success)', fontSize: 11, marginTop: 8 }}>
                Collector: {d.collector_action.action_type}:{d.collector_action.action_id}
              </p>
            )}
            {d.related_collections?.length ? (
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 4 }}>Collections: {d.related_collections.join(', ')}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: 14, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>{label}</p>
      <p style={{ color: 'var(--foundry-text)', fontSize: 22, marginTop: 6, fontWeight: 300 }}>{value}</p>
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
