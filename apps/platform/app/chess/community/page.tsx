import Link from 'next/link';
import { CHESS_COMMUNITY } from '../../../lib/chess-world';

export const metadata = { title: `${CHESS_COMMUNITY.name} | Chess` };

export default function ChessCommunityPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{CHESS_COMMUNITY.name}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Club players, tournament grinders, and coaches — post-mortems with honesty, not excuses.
      </p>
      {CHESS_COMMUNITY.features.map((f) => (
        <section key={f.title} style={{ marginTop: 20, padding: 20, background: '#0F0F12', borderRadius: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>{f.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{f.description}</p>
        </section>
      ))}
      <p style={{ marginTop: 24, fontSize: 13, color: '#6B6B70' }}>
        Full community hub ships with PASS-034. For now, run study locally and log evidence in your portfolio.
      </p>
      <Link href="/chess/missions/lead-study-session" style={{ display: 'inline-block', marginTop: 16, fontSize: 13, color: '#8A9B7A', textDecoration: 'none' }}>
        Mission 15: Lead a Study Session →
      </Link>
    </section>
  );
}
