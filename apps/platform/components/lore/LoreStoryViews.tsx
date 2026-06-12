'use client';

import Link from 'next/link';
import { getWorldLore, type LoreLegend, type LoreLegendaryObject } from '@foundry/lore-engine';

const ACCENT = '#C8A96E';

export function LoreLegendView({ worldSlug, legendId }: { worldSlug: string; legendId: string }) {
  const lore = getWorldLore(worldSlug);
  const legend = lore?.legends?.find((l) => l.id === legendId);
  if (!legend) return <p style={{ color: '#8A8A8E' }}>Legend not found.</p>;
  return <StoryPage backHref={`/${worldSlug}/lore`} backLabel="Mythology" item={legend} type="legend" />;
}

export function LoreObjectView({ worldSlug, objectId }: { worldSlug: string; objectId: string }) {
  const lore = getWorldLore(worldSlug);
  const obj = lore?.legendaryObjects?.find((o) => o.id === objectId);
  if (!obj) return <p style={{ color: '#8A8A8E' }}>Object not found.</p>;
  return <StoryPage backHref={`/${worldSlug}/lore`} backLabel="Mythology" item={obj} type="object" />;
}

function StoryPage({
  backHref,
  backLabel,
  item,
  type,
}: {
  backHref: string;
  backLabel: string;
  item: LoreLegend | LoreLegendaryObject;
  type: 'legend' | 'object';
}) {
  const title = type === 'legend' ? (item as LoreLegend).title : (item as LoreLegendaryObject).name;
  const hook = type === 'legend' ? (item as LoreLegend).hook : (item as LoreLegendaryObject).tagline;
  const story = type === 'object' ? (item as LoreLegendaryObject).story : undefined;
  const chapters = item.chapters;
  const footer = type === 'legend' ? (item as LoreLegend).whyRemembered : (item as LoreLegendaryObject).whyLegendary;
  const extraHref = type === 'legend' ? (item as LoreLegend).href : (item as LoreLegendaryObject).href;

  return (
    <div>
      <Link href={backHref} style={{ color: '#6B6B70', fontSize: 13 }}>← {backLabel}</Link>
      <p style={{ color: ACCENT, fontSize: 11, marginTop: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {type === 'legend' ? 'Legend' : 'Legendary object — not a review'}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8, lineHeight: 1.25 }}>{title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 12, lineHeight: 1.6 }}>{hook}</p>
      {story && <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 16, lineHeight: 1.65 }}>{story}</p>}

      {chapters.map((ch) => (
        <article key={ch.heading} style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 10 }}>
          <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{ch.heading}</p>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{ch.body}</p>
        </article>
      ))}

      <article style={{ marginTop: 28, padding: 20, background: '#2A2520', borderRadius: 10, border: `1px solid ${ACCENT}44` }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Why people remember this</p>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 10, lineHeight: 1.6 }}>{footer}</p>
      </article>

      {extraHref && (
        <Link href={extraHref} style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
          Related rabbit hole →
        </Link>
      )}
    </div>
  );
}
