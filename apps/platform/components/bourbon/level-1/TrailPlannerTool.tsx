'use client';

import { useState } from 'react';
import { buildTrailPlan, TRAVELER_OPTIONS, type TripProfile } from '../../../lib/bourbon-level-1/agency/trail-planner';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function TrailPlannerTool() {
  const [profile, setProfile] = useState<TripProfile>({
    days: 3,
    budget: 'moderate',
    traveler: 'first-timer',
  });

  const plan = buildTrailPlan(profile);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Not just a map — build your trip. Days, budget, traveler type. Foundry suggests the route.
      </p>

      <section style={{ marginTop: 24, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <div>
          <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>How many days?</p>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            {[2, 3, 4].map((d) => (
              <button key={d} type="button" onClick={() => setProfile({ ...profile, days: d })} style={{ padding: '8px 14px', borderRadius: 6, border: `1px solid ${profile.days === d ? ACCENT : '#2A2A2E'}`, background: profile.days === d ? '#2A2520' : 'transparent', color: '#E8E8EC', cursor: 'pointer' }}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>Budget</p>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(['budget', 'moderate', 'splurge'] as const).map((b) => (
              <button key={b} type="button" onClick={() => setProfile({ ...profile, budget: b })} style={{ padding: '8px 12px', fontSize: 12, borderRadius: 6, border: `1px solid ${profile.budget === b ? ACCENT : '#2A2A2E'}`, background: profile.budget === b ? '#2A2520' : 'transparent', color: '#8A8A8E', cursor: 'pointer' }}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>Traveler type</p>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TRAVELER_OPTIONS.map((t) => (
              <button key={t.id} type="button" onClick={() => setProfile({ ...profile, traveler: t.id })} style={{ padding: '8px 12px', fontSize: 12, borderRadius: 6, border: `1px solid ${profile.traveler === t.id ? ACCENT : '#2A2A2E'}`, background: profile.traveler === t.id ? '#2A2520' : 'transparent', color: '#8A8A8E', cursor: 'pointer' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ marginTop: 32 }}>
        {plan.map((day) => (
          <article key={day.day} style={{ marginBottom: 24, padding: 20, background: '#111114', borderRadius: 10 }}>
            <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Day {day.day} · {day.region}</p>
            <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8, fontStyle: 'italic' }}>{day.tip}</p>
            {day.stops.map((s) => (
              <div key={s.name} style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1A1A1E' }}>
                <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{s.name} <span style={{ color: '#6B6B70', fontSize: 12 }}>({s.hours})</span></p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{s.why}</p>
              </div>
            ))}
          </article>
        ))}
      </div>
      <RabbitHoleFooter seed="trail" />
    </div>
  );
}
