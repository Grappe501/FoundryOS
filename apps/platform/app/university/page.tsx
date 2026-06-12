import Link from 'next/link';
import {
  ACADEMIC_DOMAIN_CATALOG,
  ACADEMIC_DOMAIN_EXAMPLES,
  AI_ERA_LEARNING,
  FOUNDRY_UNIVERSITY_TAGLINE,
  LEARNING_PYRAMID,
  LIFELONG_EXPERT_DEVELOPMENT,
  TUTORING_VS_FOUNDRY,
} from '@foundry/learning-pyramid';
import {
  FOUNDRY_FACTORY_ECOSYSTEM,
  MASTERY_ROAD_CATALOG,
  MENTOR_ENGINE_TAGLINE,
  ROAD_TO_MENTOR,
} from '@foundry/mentor-engine';

export default function UniversityPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Foundry University</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8, fontSize: 14 }}>{FOUNDRY_UNIVERSITY_TAGLINE}</p>

      <section style={{ marginTop: 28, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <div style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>Human Capability Development</div>
        <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 8 }}>
          Tutoring: {TUTORING_VS_FOUNDRY.tutoring} · Foundry: <span style={{ color: 'var(--foundry-primary)' }}>{TUTORING_VS_FOUNDRY.foundry}</span>
        </p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
          AI era: {AI_ERA_LEARNING.join(' → ')} — AI handles recall, humans develop judgment.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Learning Pyramid (Every Academic Domain)</h2>
        {LEARNING_PYRAMID.map((l) => (
          <div key={l.layer} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-primary)' }}>Layer {l.level}</span>
            <span style={{ color: 'var(--foundry-text)', marginLeft: 8 }}>{l.question}</span>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{l.description}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Exemplar Academic Domains ({ACADEMIC_DOMAIN_CATALOG.length})</h2>
        {ACADEMIC_DOMAIN_CATALOG.map((d) => (
          <div key={d.slug} style={{ padding: '16px 0', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <div style={{ color: 'var(--foundry-text)' }}>{d.display_name}</div>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{d.discipline} · {d.road_slug}</div>
            <div style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 8 }}>{d.care_reason}</div>
            <div style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 8 }}>
              L1: {d.layers.definitions.slice(0, 3).join(', ')}… → L5: {d.layers.mastery.join(', ')}
            </div>
          </div>
        ))}
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 16 }}>
          Full registry: {ACADEMIC_DOMAIN_EXAMPLES.join(' · ')}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Mastery Roads</h2>
        {MASTERY_ROAD_CATALOG.map((r) => (
          <div key={r.slug} style={{ padding: '10px 0', fontSize: 13, color: 'var(--foundry-text-muted)' }}>
            <span style={{ color: 'var(--foundry-text)' }}>{r.display_name}</span>
            <span style={{ marginLeft: 8 }}>{r.levels.map((l) => l.name).join(' → ')}</span>
          </div>
        ))}
        <div style={{ padding: '12px 0', fontSize: 13, color: 'var(--foundry-primary)', marginTop: 8 }}>
          {ROAD_TO_MENTOR.display_name} — {ROAD_TO_MENTOR.tagline}
        </div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{MENTOR_ENGINE_TAGLINE}</p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>{LIFELONG_EXPERT_DEVELOPMENT.headline}</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
          Not owned by: {LIFELONG_EXPERT_DEVELOPMENT.not_owned_by.join(' · ')}
        </p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
          {LIFELONG_EXPERT_DEVELOPMENT.foundry_owns}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Factory Ecosystem (PASS-009+)</h2>
        {FOUNDRY_FACTORY_ECOSYSTEM.map((f) => (
          <div key={f.key} style={{ padding: '8px 0', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-text)' }}>{f.name}</span>
            <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>— {f.output}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
