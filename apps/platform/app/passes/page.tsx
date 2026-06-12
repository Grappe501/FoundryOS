import Link from 'next/link';
import { PASSES } from '../../lib/mission-control';

export default function PassesPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Build Journal</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8 }}>Every Burt pass documented. Institutional memory from day one.</p>

      <div style={{ marginTop: 32 }}>
        {PASSES.map((p) => (
          <article
            key={p.code}
            style={{
              marginBottom: 24,
              padding: 20,
              background: 'var(--foundry-surface)',
              border: '1px solid var(--foundry-border-subtle)',
              borderRadius: 8,
              opacity: p.status === 'planned' ? 0.6 : 1,
              borderColor: p.status === 'in_progress' ? 'var(--foundry-border-warm)' : 'var(--foundry-border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h2 style={{ fontSize: 18, fontWeight: 400, color: 'var(--foundry-primary)', margin: 0 }}>{p.code}</h2>
              <span style={{ fontSize: 11, color: 'var(--foundry-text-faint)', textTransform: 'uppercase' }}>{p.status}</span>
            </div>
            <h3 style={{ fontSize: 15, margin: '8px 0', fontWeight: 400 }}>{p.title}</h3>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{p.summary}</p>
            {'date' in p && p.date && (
              <p style={{ color: 'var(--foundry-text-dim)', fontSize: 11, marginTop: 12 }}>{p.date}</p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
