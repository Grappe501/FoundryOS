import Link from 'next/link';
import { TRINITY_WORLDS } from '../../lib/trinity-worlds';

export function TrinityHub({ compact = false }: { compact?: boolean }) {
  return (
    <section style={{ marginTop: compact ? 0 : 24 }}>
      {!compact && (
        <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Future-Proof Trinity
        </p>
      )}
      {!compact && (
        <h2 style={{ fontWeight: 300, fontSize: '1.75rem', marginTop: 12, color: '#E8E8EC' }}>
          Create · Keep · Communicate
        </h2>
      )}
      <div
        style={{
          marginTop: compact ? 0 : 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
        }}
      >
        {TRINITY_WORLDS.map((world) => (
          <Link
            key={world.slug}
            href={world.href}
            style={{
              display: 'block',
              padding: 24,
              background: '#0F0F12',
              border: `1px solid ${world.border}`,
              borderRadius: 8,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ color: world.accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              {world.frame}
            </p>
            <p style={{ color: '#E8E8EC', fontSize: 18, fontWeight: 300, marginTop: 10 }}>{world.name}</p>
            <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
              {world.missionCount} missions · {world.portfolioLabel}
            </p>
            <p style={{ color: world.accent, fontSize: 13, marginTop: 16 }}>Enter world →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
