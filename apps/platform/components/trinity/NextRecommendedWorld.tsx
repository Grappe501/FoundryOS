import Link from 'next/link';
import { getNextWorld, type TrinityWorldSlug } from '../../lib/trinity-worlds';

export function NextRecommendedWorld({ currentSlug }: { currentSlug: TrinityWorldSlug }) {
  const next = getNextWorld(currentSlug);

  return (
    <section
      style={{
        marginTop: 24,
        padding: 24,
        background: '#111114',
        borderRadius: 8,
        border: `1px solid ${next.border}`,
      }}
    >
      <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Next recommended world
      </p>
      <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 12 }}>
        Continue with{' '}
        <strong style={{ fontWeight: 400, color: next.accent }}>{next.name}</strong> — {next.frame.toLowerCase()}.
      </p>
      <Link
        href={next.mission1Href}
        style={{
          display: 'inline-block',
          marginTop: 16,
          padding: '12px 20px',
          background: '#0F0F12',
          border: `1px solid ${next.border}`,
          borderRadius: 6,
          color: next.accent,
          fontSize: 14,
          textDecoration: 'none',
        }}
      >
        Start {next.name} Mission 1 →
      </Link>
    </section>
  );
}
