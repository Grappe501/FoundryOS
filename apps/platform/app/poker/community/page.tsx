import Link from 'next/link';
import { POKER_COMMUNITY } from '../../../lib/poker-world';

export default function PokerCommunityPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{POKER_COMMUNITY.name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Shared mastery — members, projects, and evidence. Not just social.
      </p>
      {POKER_COMMUNITY.features.map((f) => (
        <article key={f.title} style={{ padding: 20, marginTop: 12, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <h2 style={{ fontSize: 15, color: '#6B8BB8', margin: 0 }}>{f.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{f.description}</p>
        </article>
      ))}
      <Link href="/poker/missions/track-bankroll" style={{ display: 'inline-block', marginTop: 24, color: '#6B8BB8', fontSize: 14 }}>Start with Mission 1 →</Link>
    </section>
  );
}
