import Link from 'next/link';
import { CIVIC_ENGAGEMENT_MISSIONS } from '../../../lib/civic-engagement-world';

export default function CivicEngagementMissionsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Missions</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>Improve Your Community — one mission at a time.</p>
      {CIVIC_ENGAGEMENT_MISSIONS.map((m) => (
        <Link key={m.slug} href={`/civic-engagement/missions/${m.slug}`} style={{ display: 'block', padding: 24, marginTop: 12, background: m.number === 1 ? '#0F0F12' : '#111114', border: m.number === 1 ? '1px solid #2A4A2A' : '1px solid #1A1A1E', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
          <p style={{ color: '#6B9B6B', fontSize: 11, margin: 0 }}>Mission {m.number}</p>
          <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{m.title}</h2>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{m.timeEstimate}</p>
        </Link>
      ))}
    </section>
  );
}
