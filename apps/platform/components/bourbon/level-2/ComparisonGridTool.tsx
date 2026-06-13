'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COMPARISON_GRID_PRESETS, GRID_COLUMNS, getGridPreset } from '../../../lib/bourbon-level-2/comparison-grids';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { saveGridSession, getGridSessions } from '../../../lib/bourbon-level-2/storage';
import { RabbitHoleFooter } from '../level-1/RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function ComparisonGridTool({ initialPresetId }: { initialPresetId?: string }) {
  const [presetId, setPresetId] = useState(initialPresetId ?? COMPARISON_GRID_PRESETS[0].id);
  const preset = getGridPreset(presetId) ?? COMPARISON_GRID_PRESETS[0];
  const cols = GRID_COLUMNS.filter((c) => preset.columns.includes(c.key));

  const [cells, setCells] = useState<Record<string, Record<string, string>>>(() => ({}));
  const [winnerSlug, setWinnerSlug] = useState('');
  const [lesson, setLesson] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCells({});
    setWinnerSlug('');
    setLesson('');
    setSaved(false);
  }, [presetId]);

  function cellKey(slug: string, col: string) {
    return `${slug}:${col}`;
  }

  function setCell(slug: string, col: string, value: string) {
    setCells((prev) => ({
      ...prev,
      [slug]: { ...prev[slug], [col]: value },
    }));
    setSaved(false);
  }

  function handleSave() {
    saveGridSession({
      presetId,
      cells,
      winnerSlug,
      lesson,
      savedAt: new Date().toISOString(),
    });
    setSaved(true);
  }

  const sessionCount = typeof window !== 'undefined' ? getGridSessions().length : 0;

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Structured comparison — one variable held sacred. Fill the grid, declare a winner, write what the variable taught you.
      </p>

      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {COMPARISON_GRID_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPresetId(p.id)}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 6,
              border: `1px solid ${presetId === p.id ? ACCENT : 'var(--foundry-border)'}`,
              background: presetId === p.id ? 'var(--foundry-border-warm)' : 'transparent',
              color: presetId === p.id ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <article style={{ marginTop: 20, padding: 18, background: 'var(--foundry-surface-raised)', borderRadius: 10 }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0, textTransform: 'uppercase' }}>Variable</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 6 }}>{preset.variable}</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{preset.prompt}</p>
      </article>

      <div style={{ marginTop: 24, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--foundry-text-faint)', borderBottom: '1px solid var(--foundry-border)' }}>Bottle</th>
              {cols.map((c) => (
                <th key={c.key} style={{ textAlign: 'left', padding: '10px 8px', color: 'var(--foundry-text-faint)', borderBottom: '1px solid var(--foundry-border)', minWidth: 100 }}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preset.bottleSlugs.map((slug) => {
              const b = getBottle(slug);
              if (!b) return null;
              return (
                <tr key={slug}>
                  <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--foundry-border-subtle)', verticalAlign: 'top' }}>
                    <p style={{ margin: 0, color: 'var(--foundry-text)' }}>{b.name}</p>
                    <p style={{ margin: '4px 0 0', color: 'var(--foundry-text-faint)', fontSize: 11 }}>{b.proof} pf</p>
                  </td>
                  {cols.map((c) => (
                    <td key={c.key} style={{ padding: '8px', borderBottom: '1px solid var(--foundry-border-subtle)', verticalAlign: 'top' }}>
                      <input
                        value={cells[slug]?.[c.key] ?? ''}
                        onChange={(e) => setCell(slug, c.key, e.target.value)}
                        placeholder={c.hint}
                        style={{ width: '100%', padding: '6px 8px', fontSize: 12, borderRadius: 4, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface)', color: 'var(--foundry-text)' }}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section style={{ marginTop: 24, display: 'grid', gap: 12, maxWidth: 480 }}>
        <label style={{ display: 'block' }}>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Winner tonight</span>
          <select
            value={winnerSlug}
            onChange={(e) => setWinnerSlug(e.target.value)}
            style={{ width: '100%', marginTop: 6, padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
          >
            <option value="">Select…</option>
            {preset.bottleSlugs.map((slug) => {
              const b = getBottle(slug);
              return (
                <option key={slug} value={slug}>
                  {b?.name ?? slug}
                </option>
              );
            })}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>What did the variable teach you?</span>
          <textarea
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            rows={2}
            style={{ width: '100%', marginTop: 6, padding: 10, fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
          />
        </label>
        <button
          type="button"
          onClick={handleSave}
          style={{ padding: '10px 20px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer', fontWeight: 600, justifySelf: 'start' }}
        >
          Save grid
        </button>
        {saved && <p style={{ color: ACCENT, fontSize: 13, margin: 0 }}>Grid saved — use as Level 2 checkpoint evidence.</p>}
      </section>

      <Link href="/bourbon/compare" style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
        Full compare tool with presets →
      </Link>
      <RabbitHoleFooter seed="comparison-grid" />
    </div>
  );
}
