'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCollectorTrack, setCollectorTrack, type CollectorTrack } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

const TRACKS: { id: CollectorTrack; title: string; desc: string; tools: { label: string; href: string }[] }[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    desc: 'First bottle, first tasting, first label read. Tools over theory.',
    tools: [
      { label: 'What Should I Buy?', href: '/bourbon/what-should-i-buy' },
      { label: 'Bourbon Lab', href: '/bourbon/lab' },
      { label: 'Myths quiz', href: '/bourbon/myths' },
      { label: 'Starter shelf', href: '/bourbon/shelf-builder' },
    ],
  },
  {
    id: 'enthusiast',
    title: 'Enthusiast',
    desc: 'You know your mash bills. Now blind tastings, pairings, and producer depth.',
    tools: [
      { label: 'Blind games', href: '/bourbon/games' },
      { label: 'Distillery wars', href: '/bourbon/wars' },
      { label: 'Producer atlas', href: '/bourbon/producers' },
      { label: 'Pairing engine', href: '/bourbon/pairings' },
    ],
  },
  {
    id: 'collector',
    title: 'Collector',
    desc: 'Shelf value, house coverage, allocation hunts — obsession mode.',
    tools: [
      { label: 'Bourbon DNA', href: '/bourbon/dna' },
      { label: 'Collector shelf', href: '/bourbon/shelf-builder' },
      { label: 'My shelf tracker', href: '/bourbon/portfolio' },
      { label: 'Kentucky map', href: '/bourbon/map' },
    ],
  },
];

export function CollectorTrackPicker() {
  const [track, setTrack] = useState<CollectorTrack>('beginner');

  useEffect(() => {
    setTrack(getCollectorTrack());
  }, []);

  function pick(id: CollectorTrack) {
    setCollectorTrack(id);
    setTrack(id);
  }

  const active = TRACKS.find((t) => t.id === track)!;

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => pick(t.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: `1px solid ${track === t.id ? ACCENT : '#2A2A2E'}`,
              background: track === t.id ? '#4A4020' : 'transparent',
              color: track === t.id ? '#E8E8EC' : '#8A8A8E',
              cursor: 'pointer',
            }}
          >
            {t.title}
          </button>
        ))}
      </div>
      <article style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>{active.title} track</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{active.desc}</p>
        <div style={{ marginTop: 20, display: 'grid', gap: 8 }}>
          {active.tools.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ padding: 14, background: '#0F0F12', borderRadius: 6, color: ACCENT, fontSize: 14, textDecoration: 'none' }}>
              {tool.label} →
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
