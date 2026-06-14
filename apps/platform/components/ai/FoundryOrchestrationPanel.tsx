'use client';

import Link from 'next/link';
import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ORCHESTRATION_ACTION_LABELS,
  ORCHESTRATION_VERSION,
  type FoundryOrchestrationAction,
  type OrchestrationResponse,
} from '@foundry/ai-orchestration';
import type { AtlasAskPrompt } from '@foundry/atlas-aware-ai';
import type { UserSegment } from '../../lib/world-governance';
import { ACTIVE_WORLD_SLUGS } from '../../lib/world-depth/registry';
import { runFoundryOrchestration } from '../../lib/ai-orchestration/assemble';

const ATLAS_PROMPTS: { id: AtlasAskPrompt; label: string }[] = [
  { id: 'why_care', label: 'Why care' },
  { id: 'explore_next', label: 'Explore next' },
  { id: 'connect_shelf', label: 'Connect shelf' },
  { id: 'what_unknown', label: 'What unknown' },
];

const DEMO_ENTITY = 'wild-turkey-101';

type Props = {
  defaultWorld?: string;
  defaultSegment?: UserSegment;
  defaultEntity?: string;
};

export function FoundryOrchestrationPanel({
  defaultWorld = 'bourbon',
  defaultSegment = 'adult',
  defaultEntity = DEMO_ENTITY,
}: Props) {
  const [worldSlug, setWorldSlug] = useState(defaultWorld);
  const [segment, setSegment] = useState<UserSegment>(defaultSegment);
  const [action, setAction] = useState<FoundryOrchestrationAction>('ask_atlas');
  const [entitySlug, setEntitySlug] = useState(defaultEntity);
  const [atlasPrompt, setAtlasPrompt] = useState<AtlasAskPrompt>('explore_next');
  const [response, setResponse] = useState<OrchestrationResponse | null>(null);
  const [apiMode, setApiMode] = useState(false);

  async function run() {
    const payload = {
      world_slug: worldSlug,
      action,
      user_segment: segment,
      entity_slug: entitySlug || undefined,
      atlas_prompt: action === 'ask_atlas' ? atlasPrompt : undefined,
    };

    if (apiMode) {
      const res = await fetch('/api/ai/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setResponse((await res.json()) as OrchestrationResponse);
      return;
    }

    setResponse(runFoundryOrchestration(payload, { world_slug: worldSlug, entity_slug: entitySlug || undefined }));
  }

  return (
    <div style={{ marginTop: 24 }}>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: 0 }}>
        {ORCHESTRATION_VERSION} · channels: copilot · atlas · mentor · social · comparison
      </p>

      <div style={{ marginTop: 16, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Field label="World">
          <select value={worldSlug} onChange={(e) => setWorldSlug(e.target.value)} style={selectStyle}>
            {ACTIVE_WORLD_SLUGS.map((s) => (
              <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
            ))}
          </select>
        </Field>
        <Field label="Segment">
          <select value={segment} onChange={(e) => setSegment(e.target.value as UserSegment)} style={selectStyle}>
            {(['student', 'teen', 'parent', 'adult', 'caregiver', 'operator'] as UserSegment[]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Action">
          <select value={action} onChange={(e) => setAction(e.target.value as FoundryOrchestrationAction)} style={selectStyle}>
            {(Object.entries(ORCHESTRATION_ACTION_LABELS) as [FoundryOrchestrationAction, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="Graph entity slug">
          <input value={entitySlug} onChange={(e) => setEntitySlug(e.target.value)} placeholder="wild-turkey-101" style={selectStyle} />
        </Field>
      </div>

      {action === 'ask_atlas' && (
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ATLAS_PROMPTS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setAtlasPrompt(id)}
              style={{
                padding: '8px 12px',
                fontSize: 12,
                borderRadius: 6,
                border: `1px solid ${atlasPrompt === id ? 'var(--foundry-primary)' : 'var(--foundry-border-subtle)'}`,
                background: atlasPrompt === id ? 'var(--foundry-surface-raised)' : 'transparent',
                color: atlasPrompt === id ? 'var(--foundry-primary)' : 'var(--foundry-text-muted)',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <button type="button" onClick={run} style={runBtnStyle}>
          Run full orchestration
        </button>
        <label style={{ fontSize: 12, color: 'var(--foundry-text-muted)', display: 'flex', gap: 6, alignItems: 'center' }}>
          <input type="checkbox" checked={apiMode} onChange={(e) => setApiMode(e.target.checked)} />
          Via API route
        </label>
        <Link href="/operator/ai-context" style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Atlas debugger →</Link>
      </div>

      {response && (
        <article style={{ marginTop: 20, padding: 20, background: response.blocked ? '#1A0F0F' : 'var(--foundry-surface-raised)', border: `1px solid ${response.blocked ? '#4A2A2A' : 'var(--foundry-border-subtle)'}`, borderRadius: 8 }}>
          <p style={{ color: 'var(--foundry-success)', fontSize: 11, margin: 0 }}>
            {response.persona} · {response.channel} · {response.engines_used.join(' + ')}
          </p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 8, lineHeight: 1.6 }}>{response.message}</p>
          {response.confidence_notice && (
            <p style={{ color: 'var(--foundry-accent)', fontSize: 12, marginTop: 8 }}>{response.confidence_notice}</p>
          )}
          {response.blocked && response.block_reason && (
            <p style={{ color: '#B06B6B', fontSize: 13, marginTop: 8 }}>{response.block_reason}</p>
          )}
          {response.grounded_in_foundry && (
            <p style={{ color: 'var(--foundry-success)', fontSize: 11, marginTop: 8 }}>Grounded in Foundry universe</p>
          )}
          {response.citations && response.citations.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {response.citations.map((c) => (
                <Link key={`${c.href}-${c.label}`} href={c.href} style={{ fontSize: 12, color: 'var(--foundry-primary)' }}>
                  {c.label} →
                </Link>
              ))}
            </div>
          )}
          {response.suggestions.length > 0 && (
            <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, paddingLeft: 18 }}>
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ fontSize: 13, color: 'var(--foundry-text-muted)' }}>
      {label}
      <div style={{ marginTop: 6 }}>{children}</div>
    </label>
  );
}

const selectStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 10,
  background: 'var(--foundry-surface)',
  border: '1px solid var(--foundry-border)',
  borderRadius: 6,
  color: 'var(--foundry-text)',
};

const runBtnStyle: CSSProperties = {
  padding: '12px 20px',
  background: 'var(--foundry-success-bg)',
  border: 'none',
  borderRadius: 6,
  color: 'var(--foundry-text)',
  cursor: 'pointer',
};
