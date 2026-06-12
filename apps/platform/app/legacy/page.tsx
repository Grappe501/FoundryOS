import Link from 'next/link';
import {
  EXAMPLE_STEVE_LEGACY,
  EXAMPLE_STEVE_LEGACY_MILESTONES,
  LEGACY_TAGLINE,
} from '@foundry/ownership-graph';
import { REMEMBERS_JOURNEYS } from '@foundry/project-engine';

export default function LegacyPage() {
  const legacy = EXAMPLE_STEVE_LEGACY;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Legacy Engine</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8, fontSize: 14 }}>{LEGACY_TAGLINE}</p>

      <section style={{ marginTop: 28, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, margin: 0, lineHeight: 1.7 }}>{REMEMBERS_JOURNEYS}</p>
      </section>

      <section style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}>
        <div style={{ fontSize: 22, fontWeight: 300 }}>{legacy.display_name}</div>
        <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>Joined {legacy.joined_year}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20, fontSize: 13, color: 'var(--foundry-text-muted)' }}>
          <div>Paths Completed: <span style={{ color: 'var(--foundry-text)' }}>{legacy.paths_completed}</span></div>
          <div>Projects Completed: <span style={{ color: 'var(--foundry-text)' }}>{legacy.projects_completed}</span></div>
          <div>People Mentored: <span style={{ color: 'var(--foundry-text)' }}>{legacy.people_mentored}</span></div>
          <div>Communities Built: <span style={{ color: 'var(--foundry-text)' }}>{legacy.communities_built}</span></div>
          <div>Knowledge Contributions: <span style={{ color: 'var(--foundry-text)' }}>{legacy.knowledge_contributions.toLocaleString()}</span></div>
          <div>Legacy Impact: <span style={{ color: 'var(--foundry-primary)' }}>{Math.round(legacy.legacy_impact_score).toLocaleString()}</span></div>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Year 1 → Year 20</h2>
        {EXAMPLE_STEVE_LEGACY_MILESTONES.map((m) => (
          <div key={m.year} style={{ padding: '14px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-primary)' }}>Year {m.year}</span>
            <span style={{ color: 'var(--foundry-text)', marginLeft: 12 }}>{m.title}</span>
          </div>
        ))}
      </section>

      <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 32 }}>
        Not because of a score — because people want their effort to matter. docs/LEGACY_ENGINE.md
      </p>
    </main>
  );
}
