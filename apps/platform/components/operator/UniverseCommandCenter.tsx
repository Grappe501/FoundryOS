import Link from 'next/link';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/operator/universe', label: 'Universe' },
  { href: '/operator/worlds', label: 'Worlds' },
  { href: '/operator/worlds/incoming', label: 'Incoming' },
  { href: '/operator/atlas', label: 'Atlas Health' },
  { href: '/operator/atlas/graph', label: 'Graph' },
];

export function OperatorShell({
  pass,
  title,
  subtitle,
  children,
}: {
  pass: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <p style={{ color: '#6B9BC9', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>{pass}</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{title}</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6, maxWidth: 720 }}>{subtitle}</p>

      <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20, paddingBottom: 16, borderBottom: '1px solid var(--foundry-border-subtle)' }}>
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} style={{ color: 'var(--foundry-primary)', fontSize: 13, textDecoration: 'none' }}>
            {n.label}
          </Link>
        ))}
      </nav>

      {children}
    </main>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string | number; note?: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 24 }}>
      {items.map((s) => (
        <div key={s.label} style={{ padding: 16, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-subtle)', borderRadius: 8 }}>
          <div style={{ fontSize: 24, fontWeight: 300, color: 'var(--foundry-primary)' }}>{s.value}</div>
          <div style={{ fontSize: 11, color: 'var(--foundry-text-faint)', marginTop: 6 }}>{s.label}</div>
          {s.note && <div style={{ fontSize: 10, color: 'var(--foundry-text-dim)', marginTop: 4 }}>{s.note}</div>}
        </div>
      ))}
    </div>
  );
}

export function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 85 ? 'var(--foundry-success)' : value >= 60 ? 'var(--foundry-primary)' : '#C96B6B';
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--foundry-text-muted)' }}>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--foundry-border-subtle)', borderRadius: 3 }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
    </div>
  );
}
