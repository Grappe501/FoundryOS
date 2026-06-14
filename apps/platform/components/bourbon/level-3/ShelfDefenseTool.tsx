'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SHELF_THEMES, getShelfTheme } from '../../../lib/bourbon-level-3/shelf-themes';
import { BOURBON_BOTTLES } from '../../../lib/bourbon-level-1/bottles';
import { saveShelfDefense, getLevel3Stats } from '../../../lib/bourbon-level-3/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialThemeId?: string };

export function ShelfDefenseTool({ initialThemeId }: Props) {
  const [themeId, setThemeId] = useState(initialThemeId ?? SHELF_THEMES[0].id);
  const [themeStatement, setThemeStatement] = useState('');
  const [giftBottleSlug, setGiftBottleSlug] = useState('');
  const [giftRationale, setGiftRationale] = useState('');
  const [nextBottleSlug, setNextBottleSlug] = useState('');
  const [nextBottleWhy, setNextBottleWhy] = useState('');
  const [gapNotes, setGapNotes] = useState('');
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  const theme = getShelfTheme(themeId) ?? SHELF_THEMES[0];

  useEffect(() => {
    setReady(getLevel3Stats().checkpointReady);
  }, [saved]);

  function handleSave() {
    saveShelfDefense({
      themeId,
      themeStatement,
      giftBottleSlug,
      giftRationale,
      nextBottleSlug,
      nextBottleWhy,
      gapNotes,
      savedAt: new Date().toISOString(),
    });
    setSaved(true);
    setReady(getLevel3Stats().checkpointReady);
  }

  const canSave = themeStatement.trim().length > 10 && giftBottleSlug && giftRationale.trim().length > 10;

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Checkpoint prep — defend your shelf in writing. Theme statement, gift pick, next bottle rationale, gap notes.
      </p>

      <div style={{ marginTop: 16 }}>
        <label style={{ fontSize: 13, color: 'var(--foundry-text-faint)' }}>Shelf theme</label>
        <select
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          style={{ display: 'block', width: '100%', maxWidth: 400, marginTop: 6, padding: '10px 12px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
        >
          {SHELF_THEMES.map((t) => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      <Field label="Theme statement (one sentence — why this shelf exists)" value={themeStatement} onChange={setThemeStatement} rows={2} placeholder={`e.g. "${theme.tagline.slice(0, 60)}…"`} />
      <Field label="Gift bottle — which would you give a curious friend?" value={giftRationale} onChange={setGiftRationale} rows={3} placeholder="Three sentences: why this bottle, who it's for, what they'll learn." />
      <div style={{ marginTop: 12 }}>
        <select value={giftBottleSlug} onChange={(e) => setGiftBottleSlug(e.target.value)} style={selectStyle}>
          <option value="">Pick gift bottle…</option>
          {BOURBON_BOTTLES.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name} · ${b.priceUsd}</option>
          ))}
        </select>
      </div>
      <Field label="Next bottle — what fills your gap?" value={nextBottleWhy} onChange={setNextBottleWhy} rows={2} placeholder="One sentence — role this bottle earns on the shelf." />
      <div style={{ marginTop: 12 }}>
        <select value={nextBottleSlug} onChange={(e) => setNextBottleSlug(e.target.value)} style={selectStyle}>
          <option value="">Pick next buy…</option>
          {BOURBON_BOTTLES.map((b) => (
            <option key={b.slug} value={b.slug}>{b.name} · ${b.priceUsd}</option>
          ))}
        </select>
      </div>
      <Field label="Gap notes (optional — from gap analysis)" value={gapNotes} onChange={setGapNotes} rows={2} placeholder="Missing BiB anchor? Redundant wheated row?" />

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <button type="button" onClick={handleSave} disabled={!canSave} style={{ padding: '10px 18px', fontSize: 13, borderRadius: 6, border: 'none', background: canSave ? ACCENT : 'var(--foundry-border-subtle)', color: 'var(--foundry-bg)', cursor: canSave ? 'pointer' : 'not-allowed' }}>
          Save shelf defense
        </button>
        {saved && <span style={{ color: ACCENT, fontSize: 13 }}>Saved — checkpoint evidence</span>}
        {ready && (
          <Link href="/bourbon/academy/level-3-checkpoint" style={{ color: ACCENT, fontSize: 13 }}>Open Level 3 checkpoint →</Link>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, rows, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows: number; placeholder: string }) {
  return (
    <div style={{ marginTop: 16 }}>
      <label style={{ fontSize: 13, color: 'var(--foundry-text-faint)' }}>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} style={{ width: '100%', marginTop: 6, padding: 12, fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)', resize: 'vertical' }} />
    </div>
  );
}

const selectStyle = {
  width: '100%',
  maxWidth: 400,
  padding: '10px 12px',
  fontSize: 13,
  borderRadius: 6,
  border: '1px solid var(--foundry-border-subtle)',
  background: 'var(--foundry-surface-raised)',
  color: 'var(--foundry-text)',
};
