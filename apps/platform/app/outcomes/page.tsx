import Link from 'next/link';
import {
  CORE_ENGINES,
  DOMAIN_PURPOSE_EXAMPLES,
  FOUNDRY_STARTS_WITH,
  HUMAN_DEVELOPMENT_LAYERS,
  HUMAN_OUTCOMES_REGISTRY,
  HUMAN_POTENTIAL_INFRASTRUCTURE,
  NOT_EDUCATION_NOT_SOCIAL_NOT_AI,
  OUTCOME_PRINCIPLE,
  PURPOSE_QUESTION,
  TWENTY_YEAR_VISION,
  ULTIMATE_FACTORY_ECOSYSTEM,
} from '@foundry/outcome-engine';

export default function OutcomesPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Human Potential Infrastructure</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8, fontSize: 14 }}>
        {HUMAN_POTENTIAL_INFRASTRUCTURE.does} is what we do. {HUMAN_POTENTIAL_INFRASTRUCTURE.becomes} is what we become.
      </p>

      <section style={{ marginTop: 28, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <div style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>Foundry starts with</div>
        <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 8 }}>
          Education: <span style={{ color: 'var(--foundry-text-faint)' }}>{FOUNDRY_STARTS_WITH.education}</span>
          {' · '}
          Foundry: <span style={{ color: 'var(--foundry-primary)' }}>{FOUNDRY_STARTS_WITH.foundry}</span>
        </p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>{OUTCOME_PRINCIPLE}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Human Development Layers</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginBottom: 12 }}>{NOT_EDUCATION_NOT_SOCIAL_NOT_AI}</p>
        {HUMAN_DEVELOPMENT_LAYERS.map((l) => (
          <div key={l.key} style={{ padding: '8px 0', fontSize: 13, color: 'var(--foundry-text-muted)' }}>
            <span style={{ color: 'var(--foundry-text)', textTransform: 'capitalize' }}>{l.key}</span> — {l.question}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Core Engines</h2>
        {CORE_ENGINES.map((e) => (
          <div key={e.key} style={{ padding: '10px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-text)' }}>{e.name}</span>
            <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>— {e.question}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Purpose Engine — {PURPOSE_QUESTION}</h2>
        {DOMAIN_PURPOSE_EXAMPLES.map((p) => (
          <div key={p.domain_slug} style={{ padding: '16px 0', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <div style={{ color: 'var(--foundry-text)' }}>{p.domain_display_name}</div>
            <div style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 6 }}>Wikipedia: {p.wikipedia_answer}</div>
            <div style={{ color: 'var(--foundry-primary)', fontSize: 12, marginTop: 6 }}>Foundry: {p.foundry_answer}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Human Outcomes Registry ({HUMAN_OUTCOMES_REGISTRY.length})</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginBottom: 16 }}>The most important registry — goals, not subjects.</p>
        {HUMAN_OUTCOMES_REGISTRY.map((o) => (
          <div key={o.slug} style={{ padding: '16px 0', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <div style={{ color: 'var(--foundry-text)', fontSize: 15 }}>{o.display_name}</div>
            <div style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{o.goal_statement}</div>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 8 }}>
              Domains: {o.linked_domains.join(' · ')}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>20-Year Vision</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12 }}>
          Join at {TWENTY_YEAR_VISION.join_at}. Tracks: {TWENTY_YEAR_VISION.tracks.join(', ')}.
        </p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 13, marginTop: 12 }}>
          At 32, Foundry shows: {TWENTY_YEAR_VISION.at_32_shows.join(' · ')}.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Ultimate Factory Ecosystem</h2>
        {ULTIMATE_FACTORY_ECOSYSTEM.map((f) => (
          <div key={f.key} style={{ padding: '6px 0', fontSize: 13, color: 'var(--foundry-text-muted)' }}>
            <span style={{ color: 'var(--foundry-text)' }}>{f.name}</span> — {f.output}
          </div>
        ))}
      </section>
    </main>
  );
}
