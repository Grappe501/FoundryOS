'use client';

import Link from 'next/link';
import { LEVEL_1_TOOLS, LEVEL_1_LESSON_LINK } from '../../../lib/bourbon-level-1/hub';
import { DailyBourbonCard } from './DailyBourbonCard';
import { DidYouKnowStrip } from './DidYouKnowStrip';

const ACCENT = '#C8A96E';

export function Level1Hub() {
  const sorted = [...LEVEL_1_TOOLS].sort((a, b) => a.priority - b.priority);
  const decide = sorted.filter((t) => t.category === 'decide');
  const play = sorted.filter((t) => t.category === 'play');
  const explore = sorted.filter((t) => t.category === 'explore');
  const collect = sorted.filter((t) => t.category === 'collect');
  const wild = sorted.filter((t) => t.category === 'wild');
  const learn = sorted.filter((t) => t.category === 'learn');
  const investigate = sorted.filter((t) => t.category === 'investigate');

  return (
    <div>
      <header style={{ marginTop: 8 }}>
        <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Level 1 · Curious Drinker
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12, lineHeight: 1.25 }}>
          Your bourbon hobby headquarters
        </h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
          You did not wake up wanting Lesson 6. You woke up wondering if that bottle is worth buying,
          why Weller vanished, or what your shelf says about you. Start here.
        </p>
      </header>

      <DailyBourbonCard />
      <DidYouKnowStrip compact />

      <ToolSection title="Investigate — live inside bourbon" tools={investigate} />
      <ToolSection title="Beyond the bottle" tools={wild} />
      <ToolSection title="Decide" tools={decide} />
      <ToolSection title="Play" tools={play} />
      <ToolSection title="Explore" tools={explore} />
      <ToolSection title="Collect" tools={collect} />
      <ToolSection title="Learn (when you need it)" tools={learn} />

      <section style={{ marginTop: 40, padding: 20, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
        <p style={{ color: '#6B6B70', fontSize: 13, margin: 0 }}>{LEVEL_1_LESSON_LINK.label}</p>
        <Link href={LEVEL_1_LESSON_LINK.href} style={{ color: ACCENT, fontSize: 14, marginTop: 8, display: 'inline-block' }}>
          {LEVEL_1_LESSON_LINK.sub} →
        </Link>
        <span style={{ color: '#4A4A4E', margin: '0 8px' }}>·</span>
        <Link href="/bourbon/academy/what-bourbon-actually-is" style={{ color: '#6B6B70', fontSize: 13 }}>
          All Level 1 lessons
        </Link>
      </section>
    </div>
  );
}

function ToolSection({ title, tools }: { title: string; tools: typeof LEVEL_1_TOOLS }) {
  if (tools.length === 0) return null;
  return (
    <section style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
        {title}
      </h2>
      <div style={{ marginTop: 14, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            style={{
              display: 'block',
              padding: 18,
              background: '#111114',
              borderRadius: 10,
              border: '1px solid #1A1A1E',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.15s',
            }}
          >
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <p style={{ color: '#E8E8EC', fontSize: 15, margin: '10px 0 0', fontWeight: 400 }}>{t.title}</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{t.hook}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
