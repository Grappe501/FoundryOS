'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  compareCategories,
  CATEGORY_COMPARE_PRESETS,
  allCategorySlugs,
} from '../../../lib/bourbon-level-1/agency/whiskey-category-compare';

const ACCENT = 'var(--foundry-primary)';

export function CompareCategoriesTool() {
  const all = allCategorySlugs();
  const [selected, setSelected] = useState<string[]>(CATEGORY_COMPARE_PRESETS[0].slugs);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 4) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  }

  function loadPreset(slugs: string[]) {
    setSelected(slugs.slice(0, 4));
  }

  const rows = compareCategories(selected);

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Compare whiskey <em>categories</em> — legal identity, grain rules, and flavor families. Not bottle ratings.
        Start here before debating bourbon vs rye vs Tennessee on a shelf.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Category presets</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORY_COMPARE_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => loadPreset(p.slugs)}
              style={{
                padding: '8px 12px',
                fontSize: 12,
                borderRadius: 999,
                border: '1px solid var(--foundry-border)',
                background: 'transparent',
                color: 'var(--foundry-text-muted)',
                cursor: 'pointer',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>
          Pick categories ({selected.length}/4)
        </h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {all.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => toggle(c.slug)}
              style={{
                padding: '6px 10px',
                fontSize: 11,
                borderRadius: 6,
                border: `1px solid ${selected.includes(c.slug) ? ACCENT : 'var(--foundry-border)'}`,
                background: selected.includes(c.slug) ? 'var(--foundry-primary-bg-subtle)' : 'transparent',
                color: selected.includes(c.slug) ? 'var(--foundry-text)' : 'var(--foundry-text-faint)',
                cursor: 'pointer',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {rows.length > 0 && (
        <div style={{ marginTop: 28, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--foundry-border)', color: 'var(--foundry-text-faint)', textAlign: 'left' }}>
                <th style={{ padding: '10px 8px' }}>Category</th>
                <th style={{ padding: '10px 8px' }}>Grain rule</th>
                <th style={{ padding: '10px 8px' }}>Barrel rule</th>
                <th style={{ padding: '10px 8px' }}>Proof floor</th>
                <th style={{ padding: '10px 8px' }}>Typical flavor</th>
                <th style={{ padding: '10px 8px' }}>Examples</th>
                <th style={{ padding: '10px 8px' }}>Common confusion</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} style={{ borderBottom: '1px solid var(--foundry-border-subtle)' }}>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text)' }}>
                    <Link href={r.atlasHref} style={{ color: ACCENT, textDecoration: 'none' }}>
                      {r.label}
                    </Link>
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)' }}>{r.grainRule}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)', fontSize: 12 }}>{r.barrelRule}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)' }}>{r.proofFloor}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)', fontSize: 12 }}>{r.typicalFlavor}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)', fontSize: 12 }}>{r.exampleBrands}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--foundry-text-muted)', fontSize: 11 }}>{r.commonConfusion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ marginTop: 20, fontSize: 13, color: 'var(--foundry-text-faint)' }}>
        <Link href="/bourbon/whiskey-map" style={{ color: ACCENT }}>Open the full American Whiskey Map →</Link>
      </p>
    </div>
  );
}
