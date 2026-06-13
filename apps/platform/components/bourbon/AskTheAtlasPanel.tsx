'use client';

import { useMemo, useState } from 'react';
import type { AtlasAskPrompt, MentorAnswer } from '@foundry/atlas-aware-ai';
import { getMemoryState } from '../../lib/world-memory/memory-store';
import { assembleSignalBundle } from '../../lib/identity-narrative/assemble-signals';
import { getLocalUserId, listClientArtifacts } from '../../lib/artifacts/client-store';
import { askAtlas, buildUserContextFromSignals } from '../../lib/atlas-aware-ai/assemble';

const PROMPTS: { id: AtlasAskPrompt; label: string }[] = [
  { id: 'why_care', label: 'Why should I care?' },
  { id: 'explore_next', label: 'What should I explore next?' },
  { id: 'connect_shelf', label: 'How does this connect to my shelf?' },
  { id: 'what_unknown', label: 'What is unknown here?' },
];

type Props = {
  slug: string;
  graphTitle: string;
};

export function AskTheAtlasPanel({ slug, graphTitle }: Props) {
  const [activePrompt, setActivePrompt] = useState<AtlasAskPrompt | null>(null);
  const [answer, setAnswer] = useState<MentorAnswer | null>(null);

  const userContext = useMemo(() => {
    const memory = getMemoryState();
    const signals = assembleSignalBundle('bourbon');
    const artifacts = listClientArtifacts({ user_id: getLocalUserId(), world_slug: 'bourbon' });
    return buildUserContextFromSignals(signals, memory, artifacts);
  }, [slug]);

  function runPrompt(prompt: AtlasAskPrompt) {
    setActivePrompt(prompt);
    const result = askAtlas(prompt, slug, userContext);
    setAnswer(result);
  }

  return (
    <section
      className="foundry-card foundry-card--glass"
      style={{ marginTop: 28, padding: 22 }}
    >
      <p className="foundry-eyebrow">Ask the Atlas</p>
      <p className="foundry-muted" style={{ fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
        Answers come from Foundry&apos;s graph, your artifacts, collections, and memory — not generic
        internet guesses.
      </p>

      <div className="foundry-btn-row" style={{ marginTop: 16 }}>
        {PROMPTS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => runPrompt(id)}
            className={`foundry-btn ${activePrompt === id ? 'foundry-btn--primary' : 'foundry-btn--secondary'}`}
            style={{ padding: '10px 16px', fontSize: 13 }}
          >
            {label}
          </button>
        ))}
      </div>

      {answer && (
        <div style={{ marginTop: 20, padding: 18, background: 'var(--foundry-surface)', borderRadius: 'var(--foundry-radius-md)', border: '1px solid var(--foundry-border-warm)' }}>
          <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            Atlas · {graphTitle}
          </p>
          <p style={{ color: 'var(--foundry-text)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{answer.answer}</p>

          {answer.citations.length > 0 && (
            <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {answer.citations.map((c) => (
                <a
                  key={`${c.href}-${c.label}`}
                  href={c.href}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--foundry-primary-bg-subtle)',
                    borderRadius: 999,
                    color: 'var(--foundry-primary-bright)',
                    fontSize: 12,
                    textDecoration: 'none',
                    border: '1px solid var(--foundry-primary-border-dim)',
                  }}
                >
                  {c.label}
                  {c.confidence === 'unknown' ? ' · unknown' : ''}
                </a>
              ))}
            </div>
          )}

          {answer.confidence_notice && (
            <p style={{ color: 'var(--foundry-accent)', fontSize: 12, marginTop: 14, lineHeight: 1.5 }}>
              ⚠ {answer.confidence_notice}
            </p>
          )}

          {answer.unknowns_acknowledged.length > 0 && activePrompt === 'what_unknown' && (
            <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: 'var(--foundry-text-muted)', fontSize: 12 }}>
              {answer.unknowns_acknowledged.slice(0, 6).map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
