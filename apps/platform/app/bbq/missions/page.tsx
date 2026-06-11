import Link from 'next/link';
import { BBQ_MISSIONS } from '../../../lib/bbq-world';

export default function BbqMissionsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Missions</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>Create Experiences — one mission at a time.</p>
      {BBQ_MISSIONS.map((m) => (
        <Link key={m.slug} href={`/bbq/missions/${m.slug}`} style={{ display: 'block', padding: 24, marginTop: 12, background: m.number === 1 ? '#0F0F12' : '#111114', border: m.number === 1 ? '1px solid #4A3020' : '1px solid #1A1A1E', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
          <p style={{ color: '#B06B50', fontSize: 11, margin: 0 }}>Mission {m.number}</p>
          <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{m.title}</h2>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{m.timeEstimate}</p>
        </Link>
      ))}
    </section>
  );
}
