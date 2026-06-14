'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BLIND_FLIGHT_PRESETS, getBlindPreset } from '../../../lib/bourbon-level-2/blind-flights';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { saveBlindSession, getBlindSessions } from '../../../lib/bourbon-level-2/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialPresetId?: string };

export function BlindFlightTool({ initialPresetId }: Props) {
  const defaultId = initialPresetId ?? BLIND_FLIGHT_PRESETS[0].id;
  const [presetId, setPresetId] = useState(defaultId);
  const [difficulty, setDifficulty] = useState<string>('all');
  const preset = getBlindPreset(presetId) ?? BLIND_FLIGHT_PRESETS[0];

  const visible = useMemo(() => {
    if (difficulty === 'all') return BLIND_FLIGHT_PRESETS;
    return BLIND_FLIGHT_PRESETS.filter((p) => p.difficulty === difficulty);
  }, [difficulty]);

  const [ranks, setRanks] = useState<string[]>(() => preset.bottleSlugs.map(() => ''));
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setHistoryCount(getBlindSessions().length);
  }, [saved]);

  useEffect(() => {
    const p = getBlindPreset(presetId) ?? BLIND_FLIGHT_PRESETS[0];
    setRanks(p.bottleSlugs.map(() => ''));
    setNotes('');
    setSaved(false);
    setRevealed(false);
  }, [presetId]);

  const bottles = useMemo(
    () => preset.bottleSlugs.map((s) => getBottle(s)).filter(Boolean),
    [preset],
  );

  function handleSave() {
    saveBlindSession({
      presetId,
      ranks,
      notes,
      completedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Bag bottles, number glasses, score before reveal. Blind sessions save locally for Level 2 checkpoint evidence.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(['all', 'starter', 'intermediate', 'advanced'] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDifficulty(d)}
            style={{
              padding: '6px 12px',
              fontSize: 11,
              borderRadius: 6,
              border: '1px solid var(--foundry-border-subtle)',
              background: difficulty === d ? 'var(--foundry-surface-raised)' : 'transparent',
              color: difficulty === d ? ACCENT : 'var(--foundry-text-faint)',
              cursor: 'pointer',
            }}
          >
            {d === 'all' ? 'All' : d}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {visible.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPresetId(p.id)}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${presetId === p.id ? ACCENT : 'var(--foundry-border-subtle)'}`,
              background: presetId === p.id ? 'var(--foundry-surface-raised)' : 'var(--foundry-surface)',
              color: presetId === p.id ? ACCENT : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>{preset.variable}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8, marginBottom: 0 }}>{preset.title}</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>Difficulty: {preset.difficulty}</p>

        <ol style={{ color: 'var(--foundry-text-muted)', fontSize: 14, lineHeight: 1.65, marginTop: 16, paddingLeft: 20 }}>
          {preset.setupSteps.map((s) => (
            <li key={s} style={{ marginBottom: 6 }}>{s}</li>
          ))}
        </ol>

        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--foundry-text-faint)', margin: '0 0 10px' }}>Rank glasses 1–{preset.bottleSlugs.length} (flavor words only — no brand guesses)</p>
          {preset.bottleSlugs.map((_, idx) => (
            <div key={idx} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--foundry-text-faint)', fontSize: 13, minWidth: 24 }}>#{idx + 1}</span>
              <input
                value={ranks[idx]}
                onChange={(e) => {
                  const next = [...ranks];
                  next[idx] = e.target.value;
                  setRanks(next);
                  setSaved(false);
                }}
                placeholder="Nose · palate · finish — one line"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: 13,
                  borderRadius: 6,
                  border: '1px solid var(--foundry-border-subtle)',
                  background: 'var(--foundry-surface-raised)',
                  color: 'var(--foundry-text)',
                }}
              />
            </div>
          ))}
        </div>

        <textarea
          value={notes}
          onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
          placeholder="Rank order (e.g. 3,1,4,2) + reveal reaction"
          rows={3}
          style={{
            width: '100%',
            marginTop: 12,
            padding: 12,
            fontSize: 13,
            borderRadius: 6,
            border: '1px solid var(--foundry-border-subtle)',
            background: 'var(--foundry-surface-raised)',
            color: 'var(--foundry-text)',
            resize: 'vertical',
          }}
        />

        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            style={{
              padding: '10px 18px',
              fontSize: 13,
              borderRadius: 6,
              border: '1px solid var(--foundry-border-subtle)',
              background: 'transparent',
              color: 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {revealed ? 'Hide reveal' : 'Reveal bottles'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '10px 18px',
              fontSize: 13,
              borderRadius: 6,
              border: 'none',
              background: ACCENT,
              color: 'var(--foundry-bg)',
              cursor: 'pointer',
            }}
          >
            Save blind session
          </button>
          {saved && <span style={{ color: ACCENT, fontSize: 13 }}>Saved · {historyCount + 1} total</span>}
        </div>

        {revealed && (
          <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
            {bottles.map((b) => b && (
              <div key={b.slug} style={{ padding: '10px 12px', background: 'var(--foundry-surface-raised)', borderRadius: 6, fontSize: 13 }}>
                <strong style={{ color: 'var(--foundry-text)' }}>{b.name}</strong>
                <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>${b.priceUsd} · {b.proof} proof</span>
              </div>
            ))}
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 8, fontStyle: 'italic' }}>{preset.revealPrompt}</p>
          </div>
        )}

        {(preset.linkedFlightId || preset.linkedGridId) && (
          <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {preset.linkedFlightId && (
              <Link href={`/bourbon/tasting-lab?flight=${preset.linkedFlightId}`} style={{ color: ACCENT, fontSize: 12 }}>Visible prep flight →</Link>
            )}
            {preset.linkedGridId && (
              <Link href={`/bourbon/comparison-grid?preset=${preset.linkedGridId}`} style={{ color: ACCENT, fontSize: 12 }}>Matching grid →</Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
