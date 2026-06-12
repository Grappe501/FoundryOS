'use client';

import { useState } from 'react';
import { BOURBON_MYTHS, type BourbonMyth } from '../../../lib/bourbon-level-1/myths';

const ACCENT = 'var(--foundry-primary)';

export function MythsQuiz() {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const myth = BOURBON_MYTHS[idx];

  function answer(_guess: BourbonMyth['answer']) {
    setRevealed(true);
  }

  function next() {
    setRevealed(false);
    setIdx((i) => (i + 1) % BOURBON_MYTHS.length);
  }

  return (
    <div>
      <article style={{ padding: 28, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Myth {idx + 1} of {BOURBON_MYTHS.length}</p>
        <h2 style={{ fontSize: 20, fontWeight: 400, marginTop: 16, color: 'var(--foundry-text)', lineHeight: 1.4 }}>&ldquo;{myth.statement}&rdquo;</h2>
        {!revealed ? (
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {(['true', 'false', 'mostly-true', 'mostly-false'] as const).map((a) => (
              <button key={a} type="button" onClick={() => answer(a)} style={{ padding: '10px 18px', background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border)', borderRadius: 6, color: 'var(--foundry-text)', cursor: 'pointer', fontSize: 13, textTransform: 'capitalize' }}>
                {a.replace('-', ' ')}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 24 }}>
            <p style={{ color: myth.answer.includes('false') ? '#B66' : ACCENT, fontSize: 15, fontWeight: 500, textTransform: 'capitalize' }}>
              {myth.answer.replace('-', ' ')}
            </p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{myth.explanation}</p>
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 16, fontStyle: 'italic' }}>Surprise: {myth.surprise}</p>
            <button type="button" onClick={next} style={{ marginTop: 20, padding: '10px 18px', background: 'var(--foundry-primary-border-dim)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', cursor: 'pointer' }}>
              Next myth →
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
