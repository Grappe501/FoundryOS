import Link from 'next/link';
import { POKER_MISSIONS } from '../../../lib/poker-world';

export default function PokerMissionsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Missions</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>Strategic Thinking — one mission at a time.</p>
      {POKER_MISSIONS.map((m) => (
        <Link key={m.slug} href={`/poker/missions/${m.slug}`} style={{ display: 'block', padding: 24, marginTop: 12, background: m.number === 1 ? '#0F0F12' : '#111114', border: m.number === 1 ? '1px solid #3A4A6A' : '1px solid #1A1A1E', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
          <p style={{ color: '#6B8BB8', fontSize: 11, margin: 0 }}>Mission {m.number}</p>
          <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{m.title}</h2>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{m.timeEstimate}</p>
        </Link>
      ))}
    </section>
  );
}
