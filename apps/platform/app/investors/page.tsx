import Link from 'next/link';

const VISION = `Human Potential Infrastructure.

Lifelong Expert Development is what we do. Human Potential Infrastructure is what we become.

Help me become the person I want to be. Foundry starts with goals, not subjects.

Every subject has a path.
Every path has a community.
Every community creates knowledge.
Every contribution helps someone else master the craft.

MasterClass teaches — "Watch this."
Foundry transforms — "Become this."

The 1,961 niche apps are the delivery mechanism. The real product is expertise, identity, collections, and communities.`;

const SECTIONS = [
  { title: 'Vision', body: VISION },
  { title: 'Roadmap', body: 'Transformation Operating System. Agency over consumption. PASS-010 Transformation Intelligence: momentum + next best step. Bourbon PASS-014.' },
  { title: 'Milestones', body: '1,961 topics registered. Ownership graph live in schema. Supabase deployment readiness complete — awaiting production keys.' },
  { title: 'Architecture', body: 'Vertical domains (books.foundryos.com) not 1,961 sites. Knowledge graph drives internal linking. SEO engine generates programmatic pages.' },
  { title: 'Growth Model', body: 'Lifelong Expert Development — category nobody owns. 1 platform, 10k domains: Academic, Skills, Hobbies, Careers, Lifestyles, Communities. Foundry University: Road to Mastery, not courses.' },
  { title: 'Transparency', body: 'Public build journal. Every pass visible. Execution velocity as moat.' },
];

export default function InvestorsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Investors</h1>
      <p style={{ color: 'var(--foundry-text-muted)', marginTop: 8 }}>Vision, roadmap, milestones, architecture — live from the platform.</p>

      <div style={{ marginTop: 32 }}>
        {SECTIONS.map((s) => (
          <section key={s.title} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <h2 style={{ fontSize: 16, color: 'var(--foundry-primary)', fontWeight: 500 }}>{s.title}</h2>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, lineHeight: 1.7, marginTop: 8 }}>{s.body}</p>
          </section>
        ))}
      </div>

      <p style={{ color: 'var(--foundry-text-dim)', fontSize: 12, marginTop: 24 }}>
        Full pitch: docs/INVESTOR_PITCH.md · Roadmap: docs/ROADMAP.md
      </p>
    </main>
  );
}
