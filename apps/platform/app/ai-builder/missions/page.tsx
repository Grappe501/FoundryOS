import Link from 'next/link';
import { AI_BUILDER_MISSIONS } from '../../../lib/ai-builder-world';

export const metadata = { title: 'Missions | AI Builder World' };

export default function MissionsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Missions</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Not courses. Real projects with evidence. Mission → Build → Show → Reflect → Improve → Mentor.
      </p>
      <div style={{ marginTop: 28 }}>
        {AI_BUILDER_MISSIONS.map((m) => (
          <Link
            key={m.slug}
            href={`/ai-builder/missions/${m.slug}`}
            style={{
              display: 'block',
              padding: 24,
              marginBottom: 12,
              background: m.number === 1 ? '#0F0F12' : '#111114',
              border: m.number === 1 ? '1px solid #2A4A2A' : '1px solid #1A1A1E',
              borderRadius: 8,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              Mission {m.number}
            </p>
            <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{m.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{m.subtitle}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
              {m.timeEstimate} · {m.requiredLevel} · Evidence: {m.evidence.split('—')[0]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
