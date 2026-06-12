import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { FOUNDRY_PARENT_VIEW, TRINITY_WORLDS } from '../../lib/trinity-worlds';

export const metadata = {
  title: 'For Parents | Foundry',
  description: FOUNDRY_PARENT_VIEW.oneLiner,
};

export default function ParentsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 16 }}>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          For Parents
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>{FOUNDRY_PARENT_VIEW.headline}</h1>
        <p style={{ color: '#E8E8EC', fontSize: 17, marginTop: 16, lineHeight: 1.6 }}>{FOUNDRY_PARENT_VIEW.oneLiner}</p>

        {FOUNDRY_PARENT_VIEW.sections.map((s) => (
          <article key={s.title} style={{ padding: 24, marginTop: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
            <h2 style={{ fontSize: 15, color: 'var(--foundry-primary)', margin: 0 }}>{s.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{s.body}</p>
          </article>
        ))}

        <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
          <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>The three worlds</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {TRINITY_WORLDS.map((w) => (
              <Link
                key={w.slug}
                href={`${w.href}/parents`}
                style={{ display: 'block', padding: 16, background: '#0F0F12', borderRadius: 6, border: `1px solid ${w.border}`, textDecoration: 'none', color: 'inherit' }}
              >
                <span style={{ color: w.accent, fontSize: 12 }}>{w.frame}</span>
                <p style={{ color: '#E8E8EC', fontSize: 15, margin: '6px 0 0' }}>{w.name} — parent view →</p>
              </Link>
            ))}
          </div>
        </section>

        <Link
          href="/future-proof"
          style={{ display: 'inline-block', marginTop: 28, padding: '14px 24px', background: '#2A4A2A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}
        >
          Find the right starting world →
        </Link>
      </section>
    </main>
  );
}
