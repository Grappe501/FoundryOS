import Link from 'next/link';
import { POKER_COMMUNITY, POKER_CORE_PROMISE, POKER_LOOP, POKER_MISSIONS } from '../../lib/poker-world';

export const metadata = {
  title: 'Poker World | Foundry',
  description: POKER_CORE_PROMISE,
};

export default function PokerWorldPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <section style={{ padding: 32, background: '#0F0F12', border: '1px solid #3A4A6A', borderRadius: 8 }}>
        <p style={{ color: '#6B8BB8', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Strategic Thinking · Passion Trinity
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12 }}>Poker World</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>{POKER_CORE_PROMISE}</p>
        <p style={{ color: '#6B8BB8', fontSize: 14, marginTop: 16 }}>Outcome: Become a Strategic Player</p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/poker/missions/track-bankroll" style={{ padding: '14px 24px', background: '#3A4A6A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
            Start Mission 1 →
          </Link>
          <Link href="/poker/parents" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            For Parents
          </Link>
          <Link href="/poker/community" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            Poker Study Circle
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>How Foundry works</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          {POKER_LOOP.map((item, i) => (
            <span key={item.step}>{i > 0 ? ' → ' : ''}{item.step}</span>
          ))}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>Missions</h2>
        {POKER_MISSIONS.map((m) => (
          <Link key={m.slug} href={`/poker/missions/${m.slug}`} style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid #1A1A1E', textDecoration: 'none', color: '#E8E8EC', fontSize: 14 }}>
            Mission {m.number}: {m.title}
          </Link>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B8BB8', margin: 0 }}>{POKER_COMMUNITY.name}</h2>
        {POKER_COMMUNITY.features.map((f) => (
          <p key={f.title} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
            <strong style={{ color: '#E8E8EC', fontWeight: 400 }}>{f.title}</strong> — {f.description}
          </p>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8, border: '1px solid #3A4A6A' }}>
        <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Next recommended world</p>
        <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 12 }}>
          Continue the Passion Trinity with the next world — start Mission 1 when you are ready.
        </p>
        <Link href="/bourbon/missions" style={{ display: 'inline-block', marginTop: 16, padding: '12px 20px', background: '#0F0F12', border: '1px solid #3A4A6A', borderRadius: 6, color: '#6B8BB8', fontSize: 14, textDecoration: 'none' }}>
          Explore next world →
        </Link>
      </section>

      <p style={{ marginTop: 24, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/explore/poker" style={{ color: '#6B6B70' }}>Explore path</Link>
        {' · '}
        <Link href="/poker/learn" style={{ color: '#6B6B70' }}>Guides</Link>
      </p>
    </section>
  );
}
