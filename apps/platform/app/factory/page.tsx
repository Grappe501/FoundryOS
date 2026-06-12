import Link from 'next/link';
import {
  CORE_ENGINES,
  ENTITY_CARE_QUESTION,
  EXPERT_FACTORY_OUTPUTS,
  FACTORY_PIPELINE,
  OUTCOME_PRINCIPLE,
  PASS_009_FACTORY_MISSION,
  PASS_009_FACTORY_NAME,
  SELF_ASSEMBLY_PRINCIPLE,
  TRANSFORMATION_PRINCIPLE,
  ULTIMATE_FACTORY_ECOSYSTEM,
} from '@foundry/factory';
import {
  ENTITY_WITHOUT_TRANSFORMATION,
  FOUNDRY_EQUATION_FLOW,
  HIERARCHY_FLOW,
  PASS_009_GUIDANCE,
  PASS_009_NOT,
  PRIMARY_DASHBOARD_QUESTION,
  TRANSFORMATION_SYSTEM_COMPONENTS,
} from '@foundry/outcome-engine';

const AI_SYSTEMS = [
  { id: 1, name: 'Entity Builder', output: 'Records, attributes, aliases, sources' },
  { id: 2, name: 'Content Builder', output: 'Overview, history, FAQ, guides, comparisons' },
  { id: 3, name: 'Relationship Builder', output: 'Pairs with, similar to, related to' },
  { id: 4, name: 'SEO Builder', output: 'Titles, schema, internal links, clusters' },
];

const PIPELINE_STAGES = ['Generate', 'Validate', 'Score', 'Store', 'Publish Decision', 'Queued'];

export default function FactoryPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>{PASS_009_FACTORY_NAME}</h1>
      <p style={{ color: 'var(--foundry-primary)', marginTop: 8, fontSize: 14 }}>{PASS_009_FACTORY_MISSION}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>
        Not {PASS_009_NOT}. North star: {PRIMARY_DASHBOARD_QUESTION}
      </p>

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <div style={{ color: 'var(--foundry-primary)', fontSize: 13, marginBottom: 12 }}>The Real Product</div>
        {FACTORY_PIPELINE.map((layer, i) => (
          <div key={layer} style={{ fontSize: 13, color: 'var(--foundry-text-muted)', padding: '4px 0' }}>
            {i > 0 && <span style={{ color: 'var(--foundry-text-dim)' }}>↓ </span>}
            {layer}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Pipeline Stages</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {PIPELINE_STAGES.map((s) => (
            <span key={s} style={{ padding: '6px 12px', background: 'var(--foundry-surface-raised)', borderRadius: 4, fontSize: 12, color: 'var(--foundry-text-muted)' }}>
              {s}
            </span>
          ))}
        </div>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
          OpenAI generates → Supabase owns. Generated ≠ Published.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Four AI Systems</h2>
        {AI_SYSTEMS.map((ai) => (
          <div key={ai.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-primary)' }}>AI #{ai.id}</span>
            <span style={{ color: 'var(--foundry-text)', marginLeft: 8 }}>{ai.name}</span>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{ai.output}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Core Engines</h2>
        {CORE_ENGINES.map((e) => (
          <div key={e.key} style={{ fontSize: 13, color: 'var(--foundry-text-muted)', padding: '4px 0' }}>
            <span style={{ color: 'var(--foundry-text)' }}>{e.name}</span> — {e.question}
          </div>
        ))}
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>{OUTCOME_PRINCIPLE}</p>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 8 }}>{SELF_ASSEMBLY_PRINCIPLE}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Ultimate Factory (PASS-009+)</h2>
        {ULTIMATE_FACTORY_ECOSYSTEM.map((f) => (
          <div key={f.key} style={{ fontSize: 13, color: 'var(--foundry-text-muted)', padding: '4px 0' }}>
            <span style={{ color: 'var(--foundry-text)' }}>{f.name}</span> — {f.output}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Object Hierarchy</h2>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 8 }}>{HIERARCHY_FLOW}</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 12 }}>{PASS_009_GUIDANCE}</p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{ENTITY_WITHOUT_TRANSFORMATION}</p>
        <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 8 }}>{FOUNDRY_EQUATION_FLOW}</p>
        <Link href="/transformation" style={{ color: 'var(--foundry-primary)', fontSize: 12, display: 'block', marginTop: 12 }}>Full Transformation Factory →</Link>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {TRANSFORMATION_SYSTEM_COMPONENTS.map((c) => (
            <span key={c} style={{ padding: '6px 12px', background: 'var(--foundry-surface-raised)', borderRadius: 4, fontSize: 12, color: 'var(--foundry-text-muted)' }}>{c}</span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Entity Outputs (within ecosystem)</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
          Every entity must answer: <span style={{ color: 'var(--foundry-primary)' }}>{ENTITY_CARE_QUESTION}</span>
        </p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 8 }}>{TRANSFORMATION_PRINCIPLE}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {EXPERT_FACTORY_OUTPUTS.map((o) => (
            <span key={o} style={{ padding: '6px 12px', background: 'var(--foundry-surface-raised)', borderRadius: 4, fontSize: 12, color: 'var(--foundry-text-muted)' }}>
              {o}
            </span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32, padding: 16, background: 'var(--foundry-surface)', borderRadius: 8, fontSize: 13 }}>
        <div style={{ color: 'var(--foundry-primary)', marginBottom: 8 }}>CLI</div>
        <code style={{ color: 'var(--foundry-text-muted)' }}>
          npm run build:topic -- --topic &quot;Buffalo Trace&quot; --slug buffalo-trace --type spirit
        </code>
      </section>

      <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 32 }}>
        100,000 entities &gt; 1,961 topics. Entities create ownership. Ownership creates retention.
      </p>
    </main>
  );
}
