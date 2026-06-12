import Link from 'next/link';

export default function ArchitecturePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Architecture</h1>

      <pre style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8, fontSize: 12, lineHeight: 1.8, color: 'var(--foundry-text-muted)', overflow: 'auto' }}>
{`FoundryOS
├── Verticals        → books.foundryos.com
├── Categories       → grouping within vertical
├── Topics           → 1,961 pages (not sites)
├── Collections      → user-owned (Tier 2)
├── Users
└── AI Experts

Packages:
├── @foundry/content-engine   ← CMS + SEO factory
├── @foundry/seo-engine
├── @foundry/knowledge-graph
├── @foundry/topic-registry
├── @foundry/self-build
└── @foundry/core

Data Model (PASS-002):
├── entity_types / entities / entity_attributes
├── entity_relationships (Knowledge Graph)
├── collections → collection_items → entities
├── reviews / rankings
└── user_reputation / badges / expertise / contributions

Apps:
├── platform         → foundryos.com (Mission Control)
├── admin            → admin.foundryos.com
└── site-engine      → *.foundryos.com (vertical domains)`}
      </pre>

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 24 }}>
        Course correction: docs/COURSE_CORRECTION.md
      </p>
    </main>
  );
}
