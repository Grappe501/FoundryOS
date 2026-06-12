'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BOURBON_TRAIL_PLANNER, KENTUCKY_REGIONS } from '../../../lib/bourbon-level-1/regions';

const ACCENT = 'var(--foundry-primary)';

export function KentuckyMap() {
  const [selected, setSelected] = useState(KENTUCKY_REGIONS[0]);
  const [tab, setTab] = useState<'map' | 'trail'>('map');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Tab active={tab === 'map'} onClick={() => setTab('map')}>Interactive map</Tab>
        <Tab active={tab === 'trail'} onClick={() => setTab('trail')}>Trail planner</Tab>
      </div>

      {tab === 'map' ? (
        <>
          <div style={{ position: 'relative', height: 320, background: 'linear-gradient(180deg, #0F1210 0%, var(--foundry-primary-bg-subtle) 100%)', borderRadius: 12, border: '1px solid var(--foundry-border-warm)' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <path d="M35,25 L55,20 L70,30 L75,45 L68,65 L55,75 L40,70 L30,55 Z" fill="#1A2018" stroke="#3A4030" strokeWidth="0.5" />
              {KENTUCKY_REGIONS.map((r) => (
                <circle
                  key={r.slug}
                  cx={r.x}
                  cy={r.y}
                  r={selected.slug === r.slug ? 4 : 3}
                  fill={selected.slug === r.slug ? ACCENT : 'var(--foundry-text-faint)'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(r)}
                />
              ))}
            </svg>
            <p style={{ position: 'absolute', bottom: 12, left: 16, color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Simplified KY — click a dot</p>
          </div>
          <article style={{ marginTop: 20, padding: 22, background: 'var(--foundry-surface-raised)', borderRadius: 10 }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>{selected.name}</h2>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{selected.history}</p>
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 14 }}>Distilleries</p>
            <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6, paddingLeft: 18 }}>
              {selected.distilleries.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 14 }}>Famous brands</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{selected.famousBrands.join(' · ')}</p>
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {KENTUCKY_REGIONS.map((r) => (
                <button key={r.slug} type="button" onClick={() => setSelected(r)} style={{ padding: '6px 12px', fontSize: 11, borderRadius: 999, border: `1px solid ${selected.slug === r.slug ? ACCENT : 'var(--foundry-border)'}`, background: selected.slug === r.slug ? 'var(--foundry-primary-border-dim)' : 'transparent', color: 'var(--foundry-text-muted)', cursor: 'pointer' }}>
                  {r.name.split(' / ')[0]}
                </button>
              ))}
            </div>
          </article>
        </>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {BOURBON_TRAIL_PLANNER.map((day) => (
            <article key={day.day} style={{ padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)' }}>
              <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Day {day.day} · {day.region}</p>
              {day.stops.map((s) => (
                <div key={s.name} style={{ marginTop: 14 }}>
                  <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: 0 }}>{s.name} <span style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>({s.hours})</span></p>
                  <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 4 }}>{s.why}</p>
                </div>
              ))}
            </article>
          ))}
          <Link href="/bourbon/producers" style={{ color: ACCENT, fontSize: 14 }}>Study houses before you go →</Link>
        </div>
      )}
    </div>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: active ? 'var(--foundry-primary-border-dim)' : 'var(--foundry-border-subtle)', color: active ? 'var(--foundry-text)' : 'var(--foundry-text-muted)', cursor: 'pointer', fontSize: 13 }}>
      {children}
    </button>
  );
}
