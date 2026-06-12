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
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Identity Domains</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8, fontSize: 14 }}>
        Not 1,961 apps. Lifelong identity domains — Poker, Bourbon, Public Speaking, Magic, and beyond.
      </p>

      <section style={{ marginTop: 28, padding: 20, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{SELF_ASSEMBLY_PRINCIPLE}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {SELF_ASSEMBLY_STACK.map((s) => (
            <span key={s} style={{ padding: '6px 12px', background: 'var(--foundry-surface-raised)', borderRadius: 4, fontSize: 12, color: 'var(--foundry-primary)' }}>{s}</span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Four Engines (Every Vertical)</h2>
        {FOUR_ENGINES.map((e) => (
          <div key={e.key} style={{ padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)', fontSize: 13 }}>
            <span style={{ color: 'var(--foundry-text)' }}>{e.name}</span>
            <span style={{ color: 'var(--foundry-text-faint)', marginLeft: 8 }}>— {e.question}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Registry Categories</h2>
        {IDENTITY_DOMAIN_CATEGORIES.map((cat) => (
          <div key={cat.slug} style={{ marginTop: 20 }}>
            <div style={{ color: 'var(--foundry-text)', fontSize: 14 }}>{cat.display_name}</div>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{cat.description}</div>
            <div style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 6 }}>{cat.examples.join(' · ')}</div>
            {getDomainsByCategory(cat.slug).length > 0 && (
              <div style={{ color: 'var(--foundry-primary)', fontSize: 11, marginTop: 6 }}>
                Exemplars: {getDomainsByCategory(cat.slug).map((d) => d.display_name).join(', ')}
              </div>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Exemplar Domains ({IDENTITY_DOMAIN_CATALOG.length})</h2>
        {IDENTITY_DOMAIN_CATALOG.map((d) => (
          <div key={d.slug} style={{ padding: '16px 0', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <div style={{ fontSize: 15, color: 'var(--foundry-text)' }}>{d.display_name}</div>
            <div style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{d.tagline}</div>
            <div style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>{d.care_reason}</div>
            <div style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 8 }}>
              {d.paths.length} paths · {d.projects.length} projects · {d.community_types.length} community types
            </div>
          </div>
        ))}
      </section>

      <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 32 }}>
        docs/IDENTITY_DOMAINS.md · docs/FOUR_ENGINES.md · data/catalog/identity-domains.json
      </p>
    </main>
  );
}
