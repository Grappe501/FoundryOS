import Link from 'next/link';
import verticalSites from '../../../../data/vertical-sites.json';

export default function VerticalsPage() {
  const verticals = verticalSites.sites.filter((s) => s.type === 'vertical');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Vertical Domains</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8 }}>
        Public sites. Thousands of topic pages beneath each — not thousands of domains.
      </p>

      <div style={{ marginTop: 32, display: 'grid', gap: 12 }}>
        {verticals.map((v) => (
          <div
            key={v.domain}
            style={{ padding: 16, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ color: 'var(--foundry-primary)', fontSize: 15 }}>{v.domain}</span>
              <span style={{ color: 'var(--foundry-text-faint)', fontSize: 11, textTransform: 'uppercase' }}>{v.status ?? 'planned'}</span>
            </div>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, margin: '8px 0 0' }}>{v.display_name}</p>
            {'example_topics' in v && v.example_topics && (
              <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 8 }}>
                Topics: {(v.example_topics as string[]).join(' · ')}…
              </p>
            )}
            {'launch_pass' in v && v.launch_pass && (
              <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 4 }}>Launch: {v.launch_pass}</p>
            )}
            {v.slug === 'bourbon' && (
              <Link href="/verticals/bourbon" style={{ color: 'var(--foundry-primary)', fontSize: 12, marginTop: 8, display: 'inline-block' }}>
                Transformation context →
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
