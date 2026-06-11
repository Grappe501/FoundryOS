import Link from 'next/link';
import {
  ENCYCLOPEDIA_SECTIONS,
  KNOWLEDGE_UNIVERSE_LAYERS,
  BOURBON_ACADEMY,
  SEMANTIC_SEARCH_EXAMPLES,
} from '@foundry/encyclopedia-engine';

export default function KnowledgeUniversePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Knowledge Universe</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        The actual moat — 100,000 living knowledge nodes, not a directory.
      </p>

      <section style={{ marginTop: 28, padding: 16, background: '#0F0F12', borderRadius: 8 }}>
        <div style={{ color: '#C8A96E', fontSize: 13, marginBottom: 12 }}>Layers</div>
        {KNOWLEDGE_UNIVERSE_LAYERS.map((l) => (
          <div key={l} style={{ fontSize: 13, color: '#8A8A8E', padding: '3px 0' }}>{l}</div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Encyclopedia — 10 Sections Per Entity</h2>
        <div style={{ marginTop: 12, fontSize: 13, color: '#8A8A8E', lineHeight: 1.9 }}>
          {ENCYCLOPEDIA_SECTIONS.map((s) => (
            <div key={s.slug}>{s.display_name} — {s.description}</div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Bourbon Academy — {BOURBON_ACADEMY.levels.length} Levels</h2>
        {BOURBON_ACADEMY.levels.map((l) => (
          <div key={l.level} style={{ fontSize: 13, color: '#8A8A8E', padding: '6px 0' }}>
            Level {l.level}: {l.title}
          </div>
        ))}
        <p style={{ fontSize: 12, color: '#4A4A4E', marginTop: 8 }}>
          Routed at bourbon.foundryos.com/academy — same engine, every vertical.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Semantic Search (reserved)</h2>
        {SEMANTIC_SEARCH_EXAMPLES.map((q) => (
          <div key={q} style={{ fontSize: 12, color: '#6B6B70', padding: '4px 0' }}>&quot;{q}&quot;</div>
        ))}
      </section>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>
        Factory: npm run build:topic now includes 10 encyclopedia sections + recipes.
      </p>
    </main>
  );
}
