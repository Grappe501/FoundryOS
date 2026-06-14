'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SHELF_THEMES, getShelfTheme } from '../../../lib/bourbon-level-3/shelf-themes';
import { analyzeShelfGap } from '../../../lib/bourbon-level-3/gap-analysis';
import { getShelfRoleLabel } from '../../../lib/bourbon-level-3/shelf-slots';
import { getCollection } from '../../../lib/bourbon-level-1/storage';
import { BOURBON_BOTTLES } from '../../../lib/bourbon-level-1/bottles';
import { markGapAnalysisRun } from '../../../lib/bourbon-level-3/storage';

const ACCENT = 'var(--foundry-primary)';

type Props = { initialThemeId?: string };

export function ShelfGapTool({ initialThemeId }: Props) {
  const [themeId, setThemeId] = useState(initialThemeId ?? SHELF_THEMES[0].id);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [ran, setRan] = useState(false);

  useEffect(() => {
    const owned = getCollection().filter((c) => c.status === 'owned').map((c) => c.bottleSlug);
    if (owned.length > 0) setSelected(new Set(owned));
  }, []);

  const result = useMemo(() => analyzeShelfGap(themeId, [...selected]), [themeId, selected, ran]);
  const theme = getShelfTheme(themeId) ?? SHELF_THEMES[0];

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
    setRan(false);
  }

  function runAnalysis() {
    markGapAnalysisRun();
    setRan(true);
  }

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Compare what you own against a theme ideal — missing roles, redundant mash bills, price spread.
      </p>

      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--foundry-text-faint)', marginBottom: 8 }}>Theme</p>
        <select
          value={themeId}
          onChange={(e) => { setThemeId(e.target.value); setRan(false); }}
          style={{ width: '100%', maxWidth: 400, padding: '10px 12px', fontSize: 13, borderRadius: 6, border: '1px solid var(--foundry-border-subtle)', background: 'var(--foundry-surface-raised)', color: 'var(--foundry-text)' }}
        >
          {SHELF_THEMES.map((t) => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      <section style={{ marginTop: 20, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
        <p style={{ fontSize: 13, color: 'var(--foundry-text-faint)', margin: '0 0 10px' }}>
          Select owned bottles ({selected.size} selected) — or log in <Link href="/bourbon/portfolio" style={{ color: ACCENT }}>My Bourbon Shelf</Link>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
          {BOURBON_BOTTLES.map((b) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => toggle(b.slug)}
              style={{
                padding: '4px 10px',
                fontSize: 11,
                borderRadius: 999,
                border: `1px solid ${selected.has(b.slug) ? ACCENT : 'var(--foundry-border-subtle)'}`,
                background: selected.has(b.slug) ? 'var(--foundry-surface-raised)' : 'transparent',
                color: selected.has(b.slug) ? ACCENT : 'var(--foundry-text-faint)',
                cursor: 'pointer',
              }}
            >
              {b.name}
            </button>
          ))}
        </div>
        <button type="button" onClick={runAnalysis} style={{ marginTop: 16, padding: '10px 18px', fontSize: 13, borderRadius: 6, border: 'none', background: ACCENT, color: 'var(--foundry-bg)', cursor: 'pointer' }}>
          Analyze gap
        </button>
      </section>

      {ran && result && (
        <section style={{ marginTop: 24, padding: 18, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-warm)' }}>
          <h2 style={{ fontWeight: 400, fontSize: '1.2rem', margin: 0 }}>{theme.title} — gap report</h2>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
            Price spread: ${result.priceSpread.min}–${result.priceSpread.max} · avg ${result.priceSpread.avg}
          </p>

          {result.missingRoles.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ color: ACCENT, fontSize: 12, margin: '0 0 8px' }}>Missing roles</p>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--foundry-text-muted)', fontSize: 13 }}>
                {result.missingRoles.map((r) => (
                  <li key={r}>{getShelfRoleLabel(r)}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '0 0 8px' }}>Recommendations</p>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.6 }}>
                {result.recommendations.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          <Link href={`/bourbon/shelf-defense?theme=${themeId}`} style={{ display: 'inline-block', marginTop: 16, color: ACCENT, fontSize: 13 }}>
            Write shelf defense →
          </Link>
        </section>
      )}
    </div>
  );
}
