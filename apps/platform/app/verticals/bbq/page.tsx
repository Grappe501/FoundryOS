import Link from 'next/link';

export const metadata = {
  title: 'BBQ — Operator Proof',
  description: 'Factory-generated operator proof for BBQ World.',
};

export default function BbqVerticalPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link href="/verticals" style={{ color: '#6B6B70', fontSize: 13 }}>← Vertical Domains</Link>
      <p style={{ color: '#B06B50', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 16 }}>
        bbq.foundryos.com · PASS-024 factory proof
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>BBQ</h1>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>Create Experiences · Become a Pitmaster</p>
      <p style={{ color: '#6B9B6B', fontSize: 12, marginTop: 8 }}>
        Consumer world:{' '}
        <Link href="/bbq" style={{ color: '#6B9B6B' }}>/bbq</Link>
      </p>

      <section style={{ marginTop: 32, padding: 24, background: '#0F0F12', borderRadius: 8, border: '1px solid #4A3020' }}>
        <h2 style={{ fontSize: 14, color: '#B06B50', margin: 0 }}>Factory layers</h2>
        <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 16, lineHeight: 1.9 }}>
          <li>World hub + 5 missions</li>
          <li>Academy · Portfolio · Parents · Glossary · Careers · Playground · Community</li>
          <li>marketing/domains/bbq/ launch pack</li>
          <li>Explore catalog registration (live)</li>
        </ul>
      </section>

      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
        <p style={{ color: '#6B6B70', fontSize: 11, margin: 0, textTransform: 'uppercase' }}>Core promise</p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>Create experiences around the pit — patience, hosting, and craft that feeds a crowd.</p>
      </section>
    </main>
  );
}
