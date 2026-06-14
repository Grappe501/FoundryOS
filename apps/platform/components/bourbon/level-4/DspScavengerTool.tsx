'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DSP_SCAVENGER_HUNTS, getDspHunt, resolveDspForBottle } from '../../../lib/bourbon-level-4/dsp-scavenger';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { saveDspHuntSession } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

export function DspScavengerTool() {
  const [huntId, setHuntId] = useState(DSP_SCAVENGER_HUNTS[0].id);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const hunt = getDspHunt(huntId) ?? DSP_SCAVENGER_HUNTS[0];

  function toggleReveal(slug: string) {
    setRevealed((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  function handleSave() {
    saveDspHuntSession({ huntId, notes, completedAt: new Date().toISOString() });
    setSaved(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Match bottles to distillery numbers — sourcing literacy before store pick lottery.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {DSP_SCAVENGER_HUNTS.map((h) => (
          <button key={h.id} type="button" onClick={() => { setHuntId(h.id); setRevealed({}); setSaved(false); }} style={chip(huntId === h.id)}>
            {h.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <h2 style={{ fontWeight: 400, fontSize: '1.25rem', margin: 0 }}>{hunt.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8 }}>{hunt.goal}</p>

        <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {hunt.items.map((item) => {
            const b = getBottle(item.bottleSlug);
            return (
              <div key={item.bottleSlug} style={{ padding: 14, background: 'var(--foundry-surface-raised)', borderRadius: 8, fontSize: 13 }}>
                <p style={{ margin: 0, color: 'var(--foundry-text)' }}>{b?.name ?? item.bottleSlug}</p>
                <p style={{ margin: '6px 0', color: 'var(--foundry-text-muted)' }}>{item.clue}</p>
                {revealed[item.bottleSlug] ? (
                  <p style={{ margin: 0, color: ACCENT }}>{resolveDspForBottle(item.bottleSlug)}</p>
                ) : (
                  <button type="button" onClick={() => toggleReveal(item.bottleSlug)} style={{ padding: '4px 10px', fontSize: 11, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'transparent', color: ACCENT, cursor: 'pointer' }}>
                    Reveal DSP
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <textarea value={notes} onChange={(e) => { setNotes(e.target.value); setSaved(false); }} placeholder="Notes — which DSP surprised you?" rows={2} style={{ width: '100%', marginTop: 16, padding: 12, fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }} />

        <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="button" onClick={handleSave} style={{ padding: '10px 18px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer' }}>
            Mark hunt complete
          </button>
          {hunt.detectiveSlug && (
            <Link href={`/bourbon/detective/${hunt.detectiveSlug}`} style={{ color: ACCENT, fontSize: 12 }}>Detective case →</Link>
          )}
          {saved && <span style={{ color: ACCENT, fontSize: 13 }}>Saved</span>}
        </div>
      </section>
    </div>
  );
}

function chip(active: boolean) {
  return {
    padding: '8px 12px',
    fontSize: 11,
    borderRadius: 6,
    border: `1px solid ${active ? 'var(--foundry-primary)' : 'var(--foundry-border-subtle)'}`,
    background: active ? 'var(--foundry-surface-raised)' : 'transparent',
    color: active ? 'var(--foundry-primary)' : 'var(--foundry-text-faint)',
    cursor: 'pointer' as const,
  };
}
