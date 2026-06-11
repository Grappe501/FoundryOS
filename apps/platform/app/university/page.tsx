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
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Foundry University</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>{FOUNDRY_UNIVERSITY_TAGLINE}</p>

      <section style={{ marginTop: 28, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <div style={{ color: '#C8A96E', fontSize: 13 }}>Human Capability Development</div>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 8 }}>
          Tutoring: {TUTORING_VS_FOUNDRY.tutoring} · Foundry: <span style={{ color: '#C8A96E' }}>{TUTORING_VS_FOUNDRY.foundry}</span>
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          AI era: {AI_ERA_LEARNING.join(' → ')} — AI handles recall, humans develop judgment.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Learning Pyramid (Every Academic Domain)</h2>
        {LEARNING_PYRAMID.map((l) => (
          <div key={l.layer} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <span style={{ color: '#C8A96E' }}>Layer {l.level}</span>
            <span style={{ color: '#E8E8EC', marginLeft: 8 }}>{l.question}</span>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{l.description}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Exemplar Academic Domains ({ACADEMIC_DOMAIN_CATALOG.length})</h2>
        {ACADEMIC_DOMAIN_CATALOG.map((d) => (
          <div key={d.slug} style={{ padding: '16px 0', borderBottom: '1px solid #1A1A1E' }}>
            <div style={{ color: '#E8E8EC' }}>{d.display_name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{d.discipline} · {d.road_slug}</div>
            <div style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>{d.care_reason}</div>
            <div style={{ color: '#4A4A4E', fontSize: 11, marginTop: 8 }}>
              L1: {d.layers.definitions.slice(0, 3).join(', ')}… → L5: {d.layers.mastery.join(', ')}
            </div>
          </div>
        ))}
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 16 }}>
          Full registry: {ACADEMIC_DOMAIN_EXAMPLES.join(' · ')}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Mastery Roads</h2>
        {MASTERY_ROAD_CATALOG.map((r) => (
          <div key={r.slug} style={{ padding: '10px 0', fontSize: 13, color: '#8A8A8E' }}>
            <span style={{ color: '#E8E8EC' }}>{r.display_name}</span>
            <span style={{ marginLeft: 8 }}>{r.levels.map((l) => l.name).join(' → ')}</span>
          </div>
        ))}
        <div style={{ padding: '12px 0', fontSize: 13, color: '#C8A96E', marginTop: 8 }}>
          {ROAD_TO_MENTOR.display_name} — {ROAD_TO_MENTOR.tagline}
        </div>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{MENTOR_ENGINE_TAGLINE}</p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>{LIFELONG_EXPERT_DEVELOPMENT.headline}</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          Not owned by: {LIFELONG_EXPERT_DEVELOPMENT.not_owned_by.join(' · ')}
        </p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
          {LIFELONG_EXPERT_DEVELOPMENT.foundry_owns}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Factory Ecosystem (PASS-009+)</h2>
        {FOUNDRY_FACTORY_ECOSYSTEM.map((f) => (
          <div key={f.key} style={{ padding: '8px 0', fontSize: 13 }}>
            <span style={{ color: '#E8E8EC' }}>{f.name}</span>
            <span style={{ color: '#6B6B70', marginLeft: 8 }}>— {f.output}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
