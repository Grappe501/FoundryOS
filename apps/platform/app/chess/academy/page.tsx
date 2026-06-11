import Link from 'next/link';
import { CHESS_ACADEMY_LEVELS } from '../../../lib/chess-world';

export const metadata = { title: 'Academy | Chess' };

export default function ChessAcademyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Chess Academy</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>
        Eight levels from first complete game to leading study. Missions unlock evidence — rating, post-mortems, and repertoire — not badges for showing up.
      </p>
      {CHESS_ACADEMY_LEVELS.map((l) => (
        <section key={l.slug} style={{ marginTop: 20, padding: 20, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <p style={{ color: '#8A9B7A', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Level {l.level}</p>
          <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{l.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{l.tagline}</p>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>Unlocks: {l.unlocks.join(' · ')}</p>
        </section>
      ))}
      <Link href="/chess/missions/first-complete-game" style={{ display: 'inline-block', marginTop: 24, padding: '12px 20px', background: '#3A4A3A', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
        Start at Beginner →
      </Link>
    </section>
  );
}
