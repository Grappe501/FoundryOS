import Link from 'next/link';

export const metadata = {
  title: 'Civic Engagement — Operator Proof',
  description: 'Factory-generated operator proof for Civic Engagement World.',
};

export default function CivicEngagementVerticalPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/verticals" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Vertical Domains</Link>
      <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        civic-engagement.foundryos.com · PASS-024 factory proof
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Civic Engagement</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>Serve Your Community · Become an Informed Citizen</p>
      <p style={{ color: 'var(--foundry-success)', fontSize: 12, marginTop: 8 }}>
        Consumer world:{' '}
        <Link href="/civic-engagement" style={{ color: 'var(--foundry-success)' }}>/civic-engagement</Link>
      </p>

      <section style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-success-bg)' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>Factory layers</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16, lineHeight: 1.9 }}>
          <li>World hub + 5 missions</li>
          <li>Academy · Portfolio · Parents · Glossary · Careers · Playground · Community</li>
          <li>marketing/domains/civic-engagement/ launch pack</li>
          <li>Explore catalog registration (live)</li>
        </ul>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0, textTransform: 'uppercase' }}>Core promise</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>Serve your community through research, participation, and leadership that lasts.</p>
      </section>
    </main>
  );
}
