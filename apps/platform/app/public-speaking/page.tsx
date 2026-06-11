import Link from 'next/link';
import { PS_COMMUNITY, PS_CORE_PROMISE, PS_LOOP, PS_MISSIONS } from '../../lib/public-speaking-world';

export const metadata = {
  title: 'Public Speaking World | Foundry',
  description: PS_CORE_PROMISE + ' Communicate Value — the third leg of the Future-Proof Trinity.',
};

export default function PsWorldPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <section style={{ padding: 32, background: '#0F0F12', border: '1px solid #3A4A6A', borderRadius: 8 }}>
        <p style={{ color: '#6B8BB8', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Communicate value · Future-Proof Trinity
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12 }}>Public Speaking World</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>{PS_CORE_PROMISE}</p>
        <p style={{ color: '#6B8BB8', fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>
          Create value (<Link href="/ai-builder" style={{ color: '#6B9B6B' }}>AI Builder</Link>) · Keep value (
          <Link href="/financial-independence" style={{ color: '#C8A96E' }}>Financial Independence</Link>) · Communicate value (here).
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/public-speaking/missions/first-talk" style={{ padding: '14px 24px', background: '#2A3548', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
            Start Mission 1 →
          </Link>
          <Link href="/public-speaking/parents" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            For Parents
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>How Foundry works</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          {PS_LOOP.map((item, i) => (
            <span key={item.step}>{i > 0 ? ' → ' : ''}{item.step}</span>
          ))}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>Missions</h2>
        {PS_MISSIONS.map((m) => (
          <Link key={m.slug} href={`/public-speaking/missions/${m.slug}`} style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid #1A1A1E', textDecoration: 'none', color: '#E8E8EC', fontSize: 14 }}>
            Mission {m.number}: {m.title}
          </Link>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>{PS_COMMUNITY.name}</h2>
        {PS_COMMUNITY.features.map((f) => (
          <p key={f.title} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
            <strong style={{ color: '#E8E8EC', fontWeight: 400 }}>{f.title}</strong> — {f.description}
          </p>
        ))}
      </section>

      <p style={{ marginTop: 24, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>Future-Proof Assessment</Link>
      </p>
    </section>
  );
}
