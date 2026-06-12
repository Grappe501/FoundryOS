import Link from 'next/link';
import { getWorldLore, hasWorldLore } from '@foundry/lore-engine';

type Props = { worldSlug: string; accent?: string };

export function WorldLoreTeaser({ worldSlug, accent = '#C8A96E' }: Props) {
  if (!hasWorldLore(worldSlug)) return null;
  const lore = getWorldLore(worldSlug)!;

  return (
    <section
      style={{
        marginTop: 24,
        padding: 28,
        background: 'linear-gradient(135deg, #0F0F12 0%, #141418 100%)',
        border: `1px solid ${accent}33`,
        borderRadius: 12,
      }}
    >
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Most people never learn this
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 400, marginTop: 12, color: '#E8E8EC', lineHeight: 1.35 }}>
        Mythology that pulls you back — not lessons
      </h2>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.65, maxWidth: 560 }}>
        {lore.tagline}
      </p>
      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {lore.heroes.slice(0, 3).map((h) => (
          <span key={h.id} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 999, border: '1px solid #2A2A2E', color: '#8A8A8E' }}>
            {h.name}
          </span>
        ))}
        {lore.mysteries.length > 0 && (
          <span style={{ padding: '6px 12px', fontSize: 12, borderRadius: 999, border: '1px solid #2A2A2E', color: '#8A8A8E' }}>
            {lore.mysteries.length} mysteries
          </span>
        )}
      </div>
      <Link
        href={`/${worldSlug}/today`}
        style={{
          display: 'inline-block',
          marginTop: 12,
          marginRight: 12,
          padding: '8px 14px',
          borderRadius: 8,
          border: `1px solid ${accent}`,
          color: accent,
          fontSize: 13,
          textDecoration: 'none',
        }}
      >
        What&apos;s alive today →
      </Link>
      <Link
        href={`/${worldSlug}/lore`}
        style={{
          display: 'inline-block',
          marginTop: 20,
          padding: '10px 18px',
          borderRadius: 8,
          background: `${accent}22`,
          border: `1px solid ${accent}`,
          color: accent,
          fontSize: 14,
          textDecoration: 'none',
        }}
      >
        Enter the lore →
      </Link>
    </section>
  );
}
