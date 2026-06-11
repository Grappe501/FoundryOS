import Link from 'next/link';
import {
  AGENCY_BRIDGE,
  COMMUNITY_LEADER_OUTCOMES,
  EXAMPLE_TRANSFORMATION_INSIGHTS,
  FOUNDRY_EQUATION,
  FOUNDRY_EQUATION_FLOW,
  FOUNDRY_MISSION,
  getLifeJourney,
  LIFE_JOURNEYS_REGISTRY,
  PASS_009_GUIDANCE,
  REAL_MARKETS,
  SCOPE_DOCTRINE,
  TRANSFORMATION_DATA_PRINCIPLE,
  TRANSFORMATION_SYSTEM_COMPONENTS,
} from '@foundry/outcome-engine';

export default function EquationPage() {
  const communityLeader = getLifeJourney('become-community-leader');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>The Foundry Equation</h1>
      <p style={{ color: '#C8A96E', fontSize: 15, marginTop: 8 }}>{FOUNDRY_MISSION}</p>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{FOUNDRY_EQUATION_FLOW}</p>
      <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>{AGENCY_BRIDGE}</p>

      <section style={{ marginTop: 28 }}>
        {FOUNDRY_EQUATION.map((phase) => (
          <div key={phase.phase} style={{ padding: '16px 0', borderBottom: '1px solid #1A1A1E' }}>
            <div style={{ color: '#E8E8EC', fontSize: 16 }}>{phase.label}</div>
            <div style={{ color: '#8A8A8E', fontSize: 13, marginTop: 4 }}>{phase.question}</div>
            {phase.phase === 'agency' && (
              <div style={{ color: '#C8A96E', fontSize: 11, marginTop: 4 }}>Bridge between knowing and doing</div>
            )}
            <div style={{ color: '#4A4A4E', fontSize: 11, marginTop: 6 }}>
              Implements: {phase.implements.join(' · ')}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Scope Doctrine</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
          <span style={{ color: '#C8A96E' }}>Opportunity:</span> {SCOPE_DOCTRINE.opportunity}
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
          <span style={{ color: '#8B4545' }}>Risk:</span> {SCOPE_DOCTRINE.risk}
        </p>
        <p style={{ color: '#E8E8EC', fontSize: 13, marginTop: 12 }}>{SCOPE_DOCTRINE.rule}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>PASS-009 Guidance</h2>
        <p style={{ color: '#E8E8EC', fontSize: 14 }}>{PASS_009_GUIDANCE}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {TRANSFORMATION_SYSTEM_COMPONENTS.map((c) => (
            <span key={c} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: '#8A8A8E' }}>{c}</span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Real Markets</h2>
        {REAL_MARKETS.map((m) => (
          <div key={m.slug} style={{ padding: '10px 0', fontSize: 13, color: '#8A8A8E' }}>
            <span style={{ color: '#E8E8EC' }}>{m.display_name}</span> — {m.segments.join(' · ')}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Life Journeys Registry ({LIFE_JOURNEYS_REGISTRY.length})</h2>
        {LIFE_JOURNEYS_REGISTRY.map((j) => (
          <div key={j.slug} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <span style={{ color: '#E8E8EC' }}>{j.display_name}</span>
            <span style={{ color: '#6B6B70', marginLeft: 8 }}>({j.equation_phase})</span>
          </div>
        ))}
        {communityLeader && (
          <div style={{ marginTop: 16, padding: 16, background: '#0F0F12', borderRadius: 8, fontSize: 12, color: '#8A8A8E' }}>
            <div style={{ color: '#C8A96E', marginBottom: 8 }}>{communityLeader.display_name} — composed outcomes:</div>
            {COMMUNITY_LEADER_OUTCOMES.map((o) => (
              <div key={o} style={{ padding: '2px 0' }}>{o}</div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>{TRANSFORMATION_DATA_PRINCIPLE.headline}</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
          Not: {TRANSFORMATION_DATA_PRINCIPLE.not.join(' · ')}
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{TRANSFORMATION_DATA_PRINCIPLE.is}</p>
        {EXAMPLE_TRANSFORMATION_INSIGHTS.map((i) => (
          <div key={i.path_slug} style={{ padding: '14px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <div style={{ color: '#E8E8EC' }}>{i.display_name} (n={i.sample_size.toLocaleString()})</div>
            {i.top_predictors.map((p) => (
              <div key={p.rank} style={{ color: '#6B6B70', marginTop: 4 }}>
                {p.rank}. {p.project_or_milestone} — {p.impact}
              </div>
            ))}
            {i.average_time_to_mastery_years && (
              <div style={{ color: '#C8A96E', marginTop: 4 }}>Avg mastery: {i.average_time_to_mastery_years} years</div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
