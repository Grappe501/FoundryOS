'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  listBourbonProducers,
  PRODUCER_STYLE_FILTERS,
  type BourbonProducer,
} from '../../lib/world-depth/bourbon-producers';

const ACCENT = 'var(--foundry-primary)';
const STORAGE_KEY = 'foundry-bourbon-producers-visited';

function loadVisited(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[];
  } catch {
    return [];
  }
}

function saveVisited(slugs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

export function ProducerAtlas() {
  const producers = listBourbonProducers();
  const [filter, setFilter] = useState<string>('all');
  const [visited, setVisited] = useState<string[]>([]);
  const [rabbitSlug, setRabbitSlug] = useState<string | null>(null);

  useEffect(() => {
    setVisited(loadVisited());
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return producers;
    return producers.filter((p) => p.styleTags.includes(filter as BourbonProducer['styleTags'][number]));
  }, [filter, producers]);

  const rabbit = rabbitSlug ? producers.find((p) => p.slug === rabbitSlug) : null;

  function pickRabbitHole() {
    const pool = filtered.length > 0 ? filtered : producers;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setRabbitSlug(pick.slug);
  }

  function markVisited(slug: string) {
    setVisited((prev) => {
      if (prev.includes(slug)) return prev;
      const next = [...prev, slug];
      saveVisited(next);
      return next;
    });
  }

  return (
    <div>
      <div
        style={{
          marginTop: 24,
          padding: 24,
          background: 'linear-gradient(135deg, var(--foundry-primary-bg-subtle) 0%, var(--foundry-surface) 100%)',
          border: `1px solid ${ACCENT}44`,
          borderRadius: 12,
        }}
      >
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Producer Atlas · Level 1
        </p>
        <h2 style={{ fontWeight: 300, fontSize: '1.75rem', marginTop: 12, lineHeight: 1.3 }}>
          Every house has a story — and a sweet spot on the shelf.
        </h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
          Deep dives on history, mash bills, price ladders, and the questions you did not know to ask.
          Explore one producer tonight; your tasting notes will sound different tomorrow.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20, alignItems: 'center' }}>
          <span style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
            {visited.length}/{producers.length} houses explored
          </span>
          <button
            type="button"
            onClick={pickRabbitHole}
            style={{
              padding: '10px 18px',
              background: '#2A4020',
              border: 'none',
              borderRadius: 8,
              color: 'var(--foundry-text)',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Random rabbit hole →
          </button>
        </div>
        {rabbit && (
          <Link
            href={`/bourbon/producers/${rabbit.slug}`}
            onClick={() => markVisited(rabbit.slug)}
            style={{
              display: 'block',
              marginTop: 16,
              padding: 16,
              background: 'var(--foundry-surface-raised)',
              borderRadius: 8,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ color: ACCENT, fontSize: 12, margin: 0 }}>Tonight&apos;s rabbit hole</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 16, margin: '8px 0 0' }}>{rabbit.name}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6, fontStyle: 'italic' }}>{rabbit.hookQuestion}</p>
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
        {PRODUCER_STYLE_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 14px',
              fontSize: 12,
              borderRadius: 999,
              border: `1px solid ${filter === f.id ? ACCENT : 'var(--foundry-border)'}`,
              background: filter === f.id ? 'var(--foundry-primary-bg-subtle)' : 'transparent',
              color: filter === f.id ? ACCENT : 'var(--foundry-text-muted)',
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'grid', gap: 14 }}>
        {filtered.map((p) => (
          <ProducerCard key={p.slug} producer={p} visited={visited.includes(p.slug)} onVisit={() => markVisited(p.slug)} />
        ))}
      </div>
    </div>
  );
}

function ProducerCard({
  producer: p,
  visited,
  onVisit,
}: {
  producer: BourbonProducer;
  visited: boolean;
  onVisit: () => void;
}) {
  const entry = p.sweetSpot.find((b) => b.role === 'entry' || b.role === 'daily') ?? p.sweetSpot[0];

  return (
    <Link
      href={`/bourbon/producers/${p.slug}`}
      onClick={onVisit}
      style={{
        display: 'block',
        padding: '20px 22px',
        background: 'var(--foundry-surface-raised)',
        border: `1px solid ${visited ? `${ACCENT}55` : 'var(--foundry-border-subtle)'}`,
        borderRadius: 10,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          {visited && (
            <span style={{ color: ACCENT, fontSize: 10, letterSpacing: '0.08em' }}>EXPLORED</span>
          )}
          <h3 style={{ fontSize: 18, fontWeight: 400, margin: visited ? '4px 0 0' : 0, color: 'var(--foundry-text)' }}>{p.name}</h3>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{p.headquarters} · est. {p.founded}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: ACCENT, fontSize: 12, margin: 0 }}>Sweet spot</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 4 }}>{entry?.name}</p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 2 }}>{entry?.priceUsd}</p>
        </div>
      </div>
      <p style={{ color: '#A8A8AC', fontSize: 13, marginTop: 14, fontStyle: 'italic', lineHeight: 1.5 }}>{p.hookQuestion}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>{p.styleTags.join(' · ')}</p>
    </Link>
  );
}
