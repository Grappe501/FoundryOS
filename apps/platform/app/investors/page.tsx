import Link from 'next/link';

const SECTIONS = [
  { title: 'Vision', body: 'AI operating system hosting thousands of topics across vertical domains — with SEO, knowledge graph, and self-build built in.' },
  { title: 'Roadmap', body: 'PASS-000 through PASS-010 mapped. Bourbon and Books vertical launches at PASS-009/010.' },
  { title: 'Milestones', body: '1,961 topics registered. Foundation systems complete. Supabase wiring next.' },
  { title: 'Architecture', body: 'Vertical domains (books.foundryos.com) not 1,961 sites. Knowledge graph drives internal linking. SEO engine generates programmatic pages.' },
  { title: 'Growth Model', body: '$4 Tier 2 / $18 Tier 3 per vertical. Shared infra. ~$45M ARR conservative at scale.' },
  { title: 'Transparency', body: 'Public build journal. Every pass visible. Execution velocity as moat.' },
];

export default function InvestorsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Investors</h1>
      <p style={{ color: '#8A8A8E', marginTop: 8 }}>Vision, roadmap, milestones, architecture — live from the platform.</p>

      <div style={{ marginTop: 32 }}>
        {SECTIONS.map((s) => (
          <section key={s.title} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #1A1A1E' }}>
            <h2 style={{ fontSize: 16, color: '#C8A96E', fontWeight: 500 }}>{s.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 14, lineHeight: 1.7, marginTop: 8 }}>{s.body}</p>
          </section>
        ))}
      </div>

      <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 24 }}>
        Full pitch: docs/INVESTOR_PITCH.md · Roadmap: docs/ROADMAP.md
      </p>
    </main>
  );
}
