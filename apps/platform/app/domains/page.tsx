import Link from 'next/link';
import {
  FOUR_ENGINES,
  getDomainsByCategory,
  IDENTITY_DOMAIN_CATALOG,
  IDENTITY_DOMAIN_CATEGORIES,
  SELF_ASSEMBLY_PRINCIPLE,
  SELF_ASSEMBLY_STACK,
} from '@foundry/domain-registry';

export default function DomainsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Identity Domains</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8, fontSize: 14 }}>
        Not 1,961 apps. Lifelong identity domains — Poker, Bourbon, Public Speaking, Magic, and beyond.
      </p>

      <section style={{ marginTop: 28, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{SELF_ASSEMBLY_PRINCIPLE}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {SELF_ASSEMBLY_STACK.map((s) => (
            <span key={s} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: '#C8A96E' }}>{s}</span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Four Engines (Every Vertical)</h2>
        {FOUR_ENGINES.map((e) => (
          <div key={e.key} style={{ padding: '12px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13 }}>
            <span style={{ color: '#E8E8EC' }}>{e.name}</span>
            <span style={{ color: '#6B6B70', marginLeft: 8 }}>— {e.question}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Registry Categories</h2>
        {IDENTITY_DOMAIN_CATEGORIES.map((cat) => (
          <div key={cat.slug} style={{ marginTop: 20 }}>
            <div style={{ color: '#E8E8EC', fontSize: 14 }}>{cat.display_name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{cat.description}</div>
            <div style={{ color: '#8A8A8E', fontSize: 12, marginTop: 6 }}>{cat.examples.join(' · ')}</div>
            {getDomainsByCategory(cat.slug).length > 0 && (
              <div style={{ color: '#C8A96E', fontSize: 11, marginTop: 6 }}>
                Exemplars: {getDomainsByCategory(cat.slug).map((d) => d.display_name).join(', ')}
              </div>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Exemplar Domains ({IDENTITY_DOMAIN_CATALOG.length})</h2>
        {IDENTITY_DOMAIN_CATALOG.map((d) => (
          <div key={d.slug} style={{ padding: '16px 0', borderBottom: '1px solid #1A1A1E' }}>
            <div style={{ fontSize: 15, color: '#E8E8EC' }}>{d.display_name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{d.tagline}</div>
            <div style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>{d.care_reason}</div>
            <div style={{ color: '#4A4A4E', fontSize: 11, marginTop: 8 }}>
              {d.paths.length} paths · {d.projects.length} projects · {d.community_types.length} community types
            </div>
          </div>
        ))}
      </section>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 32 }}>
        docs/IDENTITY_DOMAINS.md · docs/FOUR_ENGINES.md · data/catalog/identity-domains.json
      </p>
    </main>
  );
}
