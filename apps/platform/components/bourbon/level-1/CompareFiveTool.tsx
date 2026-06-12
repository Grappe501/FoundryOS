'use client';

import { useState } from 'react';
import { compareBottles, COMPARE_PRESETS, allCompareSlugs } from '../../../lib/bourbon-level-1/agency/compare-five';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = '#C8A96E';

export function CompareFiveTool() {
  const all = allCompareSlugs();
  const [selected, setSelected] = useState<string[]>(COMPARE_PRESETS[0].slugs);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 5) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  }

  function loadPreset(slugs: string[]) {
    setSelected(slugs.slice(0, 5));
  }

  const rows = compareBottles(selected);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Compare up to 5 bottles — bookmark this when you are deciding. Not reviews. Foundry perspective.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Presets</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COMPARE_PRESETS.map((p) => (
            <button key={p.id} type="button" onClick={() => loadPreset(p.slugs)} style={{ padding: '8px 12px', fontSize: 12, borderRadius: 999, border: '1px solid #2A2A2E', background: 'transparent', color: '#8A8A8E', cursor: 'pointer' }}>
              {p.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Pick bottles ({selected.length}/5)</h2>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 120, overflow: 'auto' }}>
          {all.map((b) => (
            <button key={b.slug} type="button" onClick={() => toggle(b.slug)} style={{ padding: '6px 10px', fontSize: 11, borderRadius: 6, border: `1px solid ${selected.includes(b.slug) ? ACCENT : '#2A2A2E'}`, background: selected.includes(b.slug) ? '#2A2520' : 'transparent', color: selected.includes(b.slug) ? '#E8E8EC' : '#6B6B70', cursor: 'pointer' }}>
              {b.name}
            </button>
          ))}
        </div>
      </section>

      {rows.length > 0 && (
        <div style={{ marginTop: 28, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2A2A2E', color: '#6B6B70', textAlign: 'left' }}>
                <th style={{ padding: '10px 8px' }}>Bottle</th>
                <th style={{ padding: '10px 8px' }}>Price</th>
                <th style={{ padding: '10px 8px' }}>Proof</th>
                <th style={{ padding: '10px 8px' }}>Age</th>
                <th style={{ padding: '10px 8px' }}>Mashbill</th>
                <th style={{ padding: '10px 8px' }}>Flavor</th>
                <th style={{ padding: '10px 8px' }}>Avail</th>
                <th style={{ padding: '10px 8px' }}>Value</th>
                <th style={{ padding: '10px 8px' }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} style={{ borderBottom: '1px solid #1A1A1E' }}>
                  <td style={{ padding: '12px 8px', color: '#E8E8EC' }}>{r.name}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E' }}>${r.priceUsd}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E' }}>{r.proof}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E' }}>{r.age}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E' }}>{r.mashbill}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E' }}>{r.flavorProfile}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E', fontSize: 11 }}>{r.availability}</td>
                  <td style={{ padding: '12px 8px', color: ACCENT }}>{r.valueScore}</td>
                  <td style={{ padding: '12px 8px', color: '#8A8A8E', fontSize: 11 }}>{r.bestUse.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <RabbitHoleFooter seed="compare" />
    </div>
  );
}
