import Link from 'next/link';

export const metadata = {
  title: 'Poker — Operator Proof',
  description: 'Factory-generated operator proof for Poker World.',
};

export default function PokerVerticalPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/verticals" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Vertical Domains</Link>
      <p style={{ color: '#6B8BB8', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        poker.foundryos.com · PASS-024 factory proof
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Poker</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>Strategic Thinking · Become a Strategic Player</p>
      <p style={{ color: 'var(--foundry-success)', fontSize: 12, marginTop: 8 }}>
        Consumer world:{' '}
        <Link href="/poker" style={{ color: 'var(--foundry-success)' }}>/poker</Link>
      </p>

      <section style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid #3A4A6A' }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>Factory layers</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 16, lineHeight: 1.9 }}>
          <li>World hub + 5 missions</li>
          <li>Academy · Portfolio · Parents · Glossary · Careers · Playground · Community</li>
          <li>marketing/domains/poker/ launch pack</li>
          <li>Explore catalog registration (live)</li>
        </ul>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0, textTransform: 'uppercase' }}>Core promise</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>Build strategic thinking, bankroll discipline, and confidence at the table.</p>
      </section>
    </main>
  );
}
