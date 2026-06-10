import Link from 'next/link';

export default function ArchitecturePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Architecture</h1>

      <pre style={{ marginTop: 24, padding: 20, background: '#0F0F12', border: '1px solid #1E1E22', borderRadius: 8, fontSize: 12, lineHeight: 1.8, color: '#8A8A8E', overflow: 'auto' }}>
{`FoundryOS
├── Verticals        → books.foundryos.com
├── Categories       → grouping within vertical
├── Topics           → 1,961 pages (not sites)
├── Collections      → user-owned (Tier 2)
├── Users
└── AI Experts

Packages:
├── @foundry/seo-engine
├── @foundry/knowledge-graph
├── @foundry/topic-registry
├── @foundry/self-build
└── @foundry/core

Apps:
├── platform         → foundryos.com (Mission Control)
├── admin            → admin.foundryos.com
└── site-engine      → *.foundryos.com (vertical domains)`}
      </pre>

      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 24 }}>
        Course correction: docs/COURSE_CORRECTION.md
      </p>
    </main>
  );
}
