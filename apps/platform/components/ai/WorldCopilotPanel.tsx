'use client';

import { useState } from 'react';
import {
  COPILOT_ACTION_LABELS,
  orchestrateCopilot,
  type CopilotAction,
} from '@foundry/ai-orchestration';
import type { UserSegment } from '../../lib/world-governance';
import { ACTIVE_WORLD_SLUGS } from '../../lib/world-depth/registry';

type Props = {
  defaultWorld?: string;
  defaultSegment?: UserSegment;
};

export function WorldCopilotPanel({ defaultWorld = 'ai-builder', defaultSegment = 'adult' }: Props) {
  const [worldSlug, setWorldSlug] = useState(defaultWorld);
  const [segment, setSegment] = useState<UserSegment>(defaultSegment);
  const [action, setAction] = useState<CopilotAction>('recommend_next_mission');
  const [response, setResponse] = useState<ReturnType<typeof orchestrateCopilot> | null>(null);

  function run() {
    setResponse(orchestrateCopilot({ world_slug: worldSlug, action, user_segment: segment }));
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <label style={{ fontSize: 13, color: '#8A8A8E' }}>
          World
          <select
            value={worldSlug}
            onChange={(e) => setWorldSlug(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC' }}
          >
            {ACTIVE_WORLD_SLUGS.map((s) => (
              <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: 13, color: '#8A8A8E' }}>
          User segment
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as UserSegment)}
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC' }}
          >
            {(['student', 'teen', 'parent', 'adult', 'caregiver', 'operator'] as UserSegment[]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: 13, color: '#8A8A8E' }}>
          Action
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as CopilotAction)}
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, background: '#0F0F12', border: '1px solid #2A2A2E', borderRadius: 6, color: '#E8E8EC' }}
          >
            {(Object.entries(COPILOT_ACTION_LABELS) as [CopilotAction, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={run}
        style={{ marginTop: 16, padding: '12px 20px', background: '#2A4A2A', border: 'none', borderRadius: 6, color: '#E8E8EC', cursor: 'pointer' }}
      >
        Run copilot (foundation)
      </button>

      {response && (
        <article style={{ marginTop: 20, padding: 20, background: response.blocked ? '#1A0F0F' : '#111114', border: `1px solid ${response.blocked ? '#4A2A2A' : '#1A1A1E'}`, borderRadius: 8 }}>
          <p style={{ color: '#6B9B6B', fontSize: 11, margin: 0 }}>{response.persona}</p>
          <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 8, lineHeight: 1.6 }}>{response.message}</p>
          {response.blocked && response.block_reason && (
            <p style={{ color: '#B06B6B', fontSize: 13, marginTop: 8 }}>{response.block_reason}</p>
          )}
          {response.suggestions.length > 0 && (
            <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, paddingLeft: 18 }}>
              {response.suggestions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </article>
      )}
    </div>
  );
}
