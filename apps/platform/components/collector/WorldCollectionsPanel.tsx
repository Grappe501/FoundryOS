'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { CollectionProgressView } from '@foundry/collector-engine';
import { getAllCollections, getWorldCollections } from '../../lib/collector/client-state';

const WORLD_LABELS: Record<string, string> = {
  bourbon: 'Bourbon',
  'ai-builder': 'AI Builder',
  'public-speaking': 'Public Speaking',
  'civic-engagement': 'Civic Engagement',
  bbq: 'BBQ',
  poker: 'Poker',
  'financial-independence': 'Financial Independence',
};

type Props = {
  worldSlug?: string;
  title?: string;
  subtitle?: string;
  accent?: string;
  maxItems?: number;
  showEmpty?: boolean;
  compact?: boolean;
};

export function WorldCollectionsPanel({
  worldSlug,
  title,
  subtitle,
  accent = '#6B9B6B',
  maxItems,
  showEmpty = true,
  compact = false,
}: Props) {
  const [views, setViews] = useState<CollectionProgressView[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setViews(worldSlug ? getWorldCollections(worldSlug) : getAllCollections());
  }, [worldSlug]);

  if (!mounted) return null;

  const visible = maxItems ? views.slice(0, maxItems) : views;
  const hasProgress = views.some((v) => v.unlocked_count > 0);

  if (!showEmpty && !hasProgress) return null;

  const heading = title ?? (worldSlug === 'bourbon' ? 'Your Bourbon Collections' : 'Your Collections');

  return (
    <section
      style={{
        marginTop: compact ? 20 : 28,
        padding: compact ? 18 : 22,
        background: '#111114',
        borderRadius: 10,
        border: '1px solid #2A2A3A',
      }}
    >
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        {heading}
      </p>
      {subtitle && (
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{subtitle}</p>
      )}
      {!worldSlug && (
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
          Identity objects earned across worlds — not badges, but proof of who you are becoming.
        </p>
      )}

      <div
        style={{
          marginTop: 16,
          display: 'grid',
          gap: 12,
          gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
        }}
      >
        {visible.map((view) => (
          <CollectionCard key={view.definition.id} view={view} accent={accent} compact={compact} />
        ))}
      </div>

      {!worldSlug && hasProgress && (
        <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 16, marginBottom: 0 }}>
          {views.filter((v) => v.unlocked_count > 0).length} collections in progress across{' '}
          {new Set(views.filter((v) => v.unlocked_count > 0).map((v) => v.definition.world_slug)).size} worlds
        </p>
      )}
    </section>
  );
}

function CollectionCard({
  view,
  accent,
  compact,
}: {
  view: CollectionProgressView;
  accent: string;
  compact?: boolean;
}) {
  const { definition, unlocked_count, total_count, completed, progress_label, unlocked_items } = view;
  const pct = total_count > 0 ? Math.round((unlocked_count / total_count) * 100) : 0;
  const worldLabel = WORLD_LABELS[definition.world_slug] ?? definition.world_slug;
  const latest = unlocked_items[unlocked_items.length - 1];

  const inner = (
    <>
      {!compact && (
        <p style={{ color: '#6B6B70', fontSize: 10, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {worldLabel}
        </p>
      )}
      <p style={{ color: '#E8E8EC', fontSize: compact ? 15 : 16, margin: compact ? 0 : '6px 0 0', fontWeight: 400 }}>
        {definition.title}
      </p>
      <p style={{ color: accent, fontSize: 13, marginTop: 8 }}>{progress_label}</p>
      <div
        style={{
          marginTop: 10,
          height: 3,
          background: '#1A1A1E',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: completed ? 'var(--foundry-primary)' : accent,
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      {latest && (
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 10, lineHeight: 1.4 }}>
          Latest: {latest.label}
        </p>
      )}
      {!latest && unlocked_count === 0 && (
        <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 10, lineHeight: 1.4, fontStyle: 'italic' }}>
          {definition.story.slice(0, 80)}…
        </p>
      )}
      {completed && (
        <p style={{ color: 'var(--foundry-primary)', fontSize: 11, marginTop: 8, letterSpacing: '0.06em' }}>Complete</p>
      )}
    </>
  );

  if (definition.href) {
    return (
      <Link
        href={definition.href}
        style={{
          display: 'block',
          padding: compact ? 14 : 16,
          background: '#0F0F12',
          borderRadius: 8,
          border: `1px solid ${unlocked_count > 0 ? '#2A3A2A' : '#1A1A1E'}`,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      style={{
        padding: compact ? 14 : 16,
        background: '#0F0F12',
        borderRadius: 8,
        border: `1px solid ${unlocked_count > 0 ? '#2A3A2A' : '#1A1A1E'}`,
      }}
    >
      {inner}
    </div>
  );
}

/** Cross-world summary for My Journey — only collections with progress */
export function CrossWorldCollectionsSummary() {
  const [views, setViews] = useState<CollectionProgressView[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setViews(getAllCollections().filter((v) => v.unlocked_count > 0));
  }, []);

  if (!mounted || views.length === 0) return null;

  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 14, color: '#6B9B6B', fontWeight: 400 }}>Collections in progress</h2>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>
        Earned through action — each item is evidence, not a sticker.
      </p>
      <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
        {views.slice(0, 12).map((view) => (
          <CollectionCard key={view.definition.id} view={view} accent="#6B9B6B" compact />
        ))}
      </div>
    </section>
  );
}
