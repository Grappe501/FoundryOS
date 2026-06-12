'use client';

import Link from 'next/link';
import { getLivingMediaFeed, LIVING_MEDIA_VOICE, hasLivingMedia } from '@foundry/lore-engine';

type Props = { worldSlug: string; accent?: string };

const KIND_STYLE: Record<string, string> = {
  mystery: 'var(--foundry-primary)',
  debate: '#D4847A',
  story: '#9B8FD4',
  history: '#6B9B6B',
  'rabbit-hole': '#7BA3C9',
  object: 'var(--foundry-primary)',
  original: '#E8B86D',
};

export function WorldLivingMedia({ worldSlug, accent = 'var(--foundry-primary)' }: Props) {
  if (!hasLivingMedia(worldSlug)) return null;
  const feed = getLivingMediaFeed(worldSlug);
  if (!feed) return null;

  return (
    <section
      style={{
        marginTop: 24,
        padding: 28,
        background: 'linear-gradient(160deg, #0A0A0E 0%, #12121A 50%, #0F0F12 100%)',
        border: `1px solid ${accent}44`,
        borderRadius: 12,
      }}
    >
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
        {LIVING_MEDIA_VOICE.kicker}
      </p>
      <h2 style={{ fontSize: 22, fontWeight: 400, marginTop: 12, color: '#E8E8EC', lineHeight: 1.35 }}>
        {feed.headline}
      </h2>
      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{feed.date_key}</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {feed.items.map((item) => (
          <article
            key={item.id}
            style={{
              padding: 18,
              background: '#111114',
              borderRadius: 10,
              border: `1px solid ${KIND_STYLE[item.kind] ?? accent}33`,
            }}
          >
            <p style={{ color: KIND_STYLE[item.kind] ?? accent, fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {item.title}
            </p>
            <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 10, lineHeight: 1.45 }}>{item.body}</p>
            {item.href && (
              <Link href={item.href} style={{ display: 'inline-block', marginTop: 12, color: accent, fontSize: 13 }}>
                {item.cta ?? 'Go →'}
              </Link>
            )}
          </article>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Link href={`/${worldSlug}/today`} style={{ color: accent, fontSize: 14 }}>
          Full today page →
        </Link>
        <Link href={`/${worldSlug}/lore`} style={{ color: '#6B6B70', fontSize: 14 }}>
          Enter mythology →
        </Link>
        {worldSlug === 'bourbon' && (
          <Link href="/bourbon/universe" style={{ color: '#6B6B70', fontSize: 14 }}>
            Universe map →
          </Link>
        )}
      </div>
    </section>
  );
}

export function WorldTodayFull({ worldSlug, accent = 'var(--foundry-primary)' }: Props) {
  const feed = getLivingMediaFeed(worldSlug);
  if (!feed) {
    return <p style={{ color: '#8A8A8E' }}>Living media for this world is coming soon.</p>;
  }

  return (
    <div>
      <header>
        <p style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Not a lesson — a reason to open Foundry today
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>What&apos;s alive today</h1>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{feed.date_key}</p>
      </header>
      <div style={{ marginTop: 28, display: 'grid', gap: 12 }}>
        {feed.items.map((item) => (
          <article key={item.id} style={{ padding: 18, background: '#111114', borderRadius: 10, border: `1px solid ${accent}33` }}>
            <p style={{ color: accent, fontSize: 11, margin: 0, textTransform: 'uppercase' }}>{item.title}</p>
            <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 10, lineHeight: 1.45 }}>{item.body}</p>
            {item.href && (
              <Link href={item.href} style={{ display: 'inline-block', marginTop: 12, color: accent, fontSize: 13 }}>
                {item.cta ?? 'Go →'}
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
