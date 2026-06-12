import Link from 'next/link';
import {
  ACADEMIC_OPPORTUNITY,
  AI_BUILDER_DNA,
  COMMUNITY_SPEAKER_GRAPH_EXAMPLE,
  DNA_REGISTRY,
  FOUNDRY_OBJECT_HIERARCHY,
  FOUNDRY_PRODUCTS,
  HIERARCHY_FLOW,
  PASS_009_FACTORY_MISSION,
  PASS_009_FACTORY_NAME,
  PASS_009_GUIDANCE,
  PRIMARY_DASHBOARD_QUESTION,
  PUBLIC_SPEAKING_DNA,
  TRANSFORMATION_DATA_VISION,
  TRANSFORMATION_TEMPLATES,
} from '@foundry/outcome-engine';

export default function TransformationPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>{PASS_009_FACTORY_NAME}</h1>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 15, marginTop: 8 }}>{PASS_009_FACTORY_MISSION}</p>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{PASS_009_GUIDANCE}</p>
      <Link href="/transformation-graph" style={{ color: 'var(--foundry-primary)', fontSize: 13, display: 'inline-block', marginTop: 12 }}>
        Transformation Graph — defensibility moat →
      </Link>

      <section style={{ marginTop: 28, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>North Star</h2>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 12 }}>{PRIMARY_DASHBOARD_QUESTION}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
          {TRANSFORMATION_DATA_VISION.headline}: {TRANSFORMATION_DATA_VISION.understands.join(' · ')}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Object Hierarchy</h2>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{HIERARCHY_FLOW}</p>
        {FOUNDRY_OBJECT_HIERARCHY.map((h) => (
          <div key={h.key} style={{ padding: '8px 0', fontSize: 13, color: '#8A8A8E', borderBottom: '1px solid #1A1A1E' }}>
            <span style={{ color: '#E8E8EC' }}>{h.label}</span>
            <span style={{ color: '#4A4A4E', marginLeft: 8 }}>— {h.question}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: 16, background: '#0F0F12', borderRadius: 8, fontSize: 12 }}>
          {Object.entries(COMMUNITY_SPEAKER_GRAPH_EXAMPLE).map(([k, v]) => (
            <div key={k} style={{ padding: '3px 0', color: '#8A8A8E' }}>
              <span style={{ color: 'var(--foundry-primary)' }}>{k.replace(/_/g, ' ')}:</span> {v}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Transformation Templates</h2>
        {TRANSFORMATION_TEMPLATES.map((t) => (
          <div key={t.slug} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E' }}>
            <div style={{ color: '#E8E8EC', fontSize: 14 }}>{t.display_name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{t.layers.join(' · ')}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>DNA Blueprints ({DNA_REGISTRY.length})</h2>
        {[PUBLIC_SPEAKING_DNA, AI_BUILDER_DNA].map((dna) => (
          <pre key={dna.domain} style={{ marginTop: 12, padding: 16, background: '#0F0F12', borderRadius: 8, fontSize: 11, color: '#8A8A8E', overflow: 'auto' }}>
            {JSON.stringify(dna, null, 2)}
          </pre>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Academic Opportunity</h2>
        <p style={{ color: '#6B6B70', fontSize: 12 }}>Not: {ACADEMIC_OPPORTUNITY.not.join(' · ')}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{ACADEMIC_OPPORTUNITY.but.join(' · ')}</p>
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 8 }}>{ACADEMIC_OPPORTUNITY.principle}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Business Model</h2>
        {FOUNDRY_PRODUCTS.map((p) => (
          <div key={p.slug} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <span style={{ color: '#E8E8EC' }}>{p.name}</span>
            <span style={{ color: 'var(--foundry-primary)', marginLeft: 8 }}>{p.price}</span>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{p.includes.join(' · ')}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
