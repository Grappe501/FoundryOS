'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COMPARE_FIVE_LAB_PRESETS, getCompareFiveLabPreset } from '../../../lib/bourbon-level-4/compare-five-lab';
import { compareBottles } from '../../../lib/bourbon-level-1/agency/compare-five';
import { saveCompareFiveLabSession } from '../../../lib/bourbon-level-4/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialPresetId?: string };

export function CompareFiveLabTool({ initialPresetId }: Props) {
  const [presetId, setPresetId] = useState(initialPresetId ?? COMPARE_FIVE_LAB_PRESETS[0].id);
  const [hypothesis, setHypothesis] = useState('');
  const [winnerSlug, setWinnerSlug] = useState('');
  const [lesson, setLesson] = useState('');
  const [saved, setSaved] = useState(false);

  const preset = getCompareFiveLabPreset(presetId) ?? COMPARE_FIVE_LAB_PRESETS[0];
  const rows = compareBottles(preset.bottleSlugs);

  useEffect(() => {
    setHypothesis('');
    setWinnerSlug('');
    setLesson('');
    setSaved(false);
  }, [presetId]);

  function handleSave() {
    saveCompareFiveLabSession({
      presetId,
      hypothesis,
      winnerSlug,
      lesson,
      completedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Twelve connoisseur Compare Five presets — write hypothesis before pouring, defend winner after.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {COMPARE_FIVE_LAB_PRESETS.map((p) => (
          <button key={p.id} type="button" onClick={() => setPresetId(p.id)} style={chip(presetId === p.id)}>
            {p.title}
          </button>
        ))}
      </div>

      <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
        <p style={{ color: ACCENT, fontSize: 11, textTransform: 'uppercase', margin: 0 }}>{preset.variable}</p>
        <h2 style={{ fontWeight: 400, fontSize: '1.35rem', marginTop: 8 }}>{preset.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10 }}>{preset.hypothesisPrompt}</p>

        <textarea
          value={hypothesis}
          onChange={(e) => { setHypothesis(e.target.value); setSaved(false); }}
          placeholder="I expect ___ to win because ___"
          rows={2}
          style={textareaStyle}
        />

        <div style={{ marginTop: 20, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--foundry-border)', color: 'var(--foundry-text-faint)', textAlign: 'left' }}>
                <th style={{ padding: 8 }}>Bottle</th>
                <th style={{ padding: 8 }}>$</th>
                <th style={{ padding: 8 }}>Proof</th>
                <th style={{ padding: 8 }}>Age</th>
                <th style={{ padding: 8 }}>Mash</th>
                <th style={{ padding: 8 }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                  <td style={{ padding: 10, color: 'var(--foundry-text)' }}>{r.name}</td>
                  <td style={{ padding: 10 }}>${r.priceUsd}</td>
                  <td style={{ padding: 10 }}>{r.proof}</td>
                  <td style={{ padding: 10 }}>{r.age}</td>
                  <td style={{ padding: 10 }}>{r.mashbill}</td>
                  <td style={{ padding: 10 }}>{r.valueScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: 13, color: 'var(--foundry-text-faint)', marginTop: 16 }}>Winner + lesson</p>
        <select
          value={winnerSlug}
          onChange={(e) => { setWinnerSlug(e.target.value); setSaved(false); }}
          style={{ width: '100%', maxWidth: 360, padding: 10, fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
        >
          <option value="">Pick winner…</option>
          {rows.map((r) => (
            <option key={r.slug} value={r.slug}>{r.name}</option>
          ))}
        </select>
        <textarea
          value={lesson}
          onChange={(e) => { setLesson(e.target.value); setSaved(false); }}
          placeholder={preset.lessonHint}
          rows={2}
          style={{ ...textareaStyle, marginTop: 10 }}
        />

        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <button type="button" onClick={handleSave} disabled={!winnerSlug || !lesson.trim()} style={primaryBtn}>
            Save Compare Five lab
          </button>
          {preset.academySlug && (
            <Link href={`/bourbon/academy/${preset.academySlug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Lesson →</Link>
          )}
          <Link href="/bourbon/comparison-grid" style={{ color: ACCENT, fontSize: 12 }}>Full grid →</Link>
          {saved && <span style={{ color: ACCENT, fontSize: 13 }}>Saved</span>}
        </div>
      </section>
    </div>
  );
}

const textareaStyle = {
  width: '100%',
  marginTop: 12,
  padding: 12,
  fontSize: 13,
  borderRadius: 6,
  border: '1px solid var(--foundry-border-subtle)',
  background: 'var(--foundry-surface-raised)',
  color: 'var(--foundry-text)',
  resize: 'vertical' as const,
};

const primaryBtn = {
  padding: '10px 18px',
  fontSize: 13,
  borderRadius: 6,
  border: 'none',
  background: 'var(--foundry-primary)',
  color: 'var(--foundry-bg)',
  cursor: 'pointer' as const,
};

function chip(active: boolean) {
  return {
    padding: '6px 12px',
    fontSize: 11,
    borderRadius: 6,
    border: `1px solid ${active ? 'var(--foundry-primary)' : 'var(--foundry-border-subtle)'}`,
    background: active ? 'var(--foundry-surface-raised)' : 'transparent',
    color: active ? 'var(--foundry-primary)' : 'var(--foundry-text-faint)',
    cursor: 'pointer' as const,
  };
}
