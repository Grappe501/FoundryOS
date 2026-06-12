'use client';

import Link from 'next/link';
import { LEVEL_1_TOOLS, LEVEL_1_LESSON_LINK } from '../../../lib/bourbon-level-1/hub';
import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import { WorldCollectionsPanel } from '../../collector/WorldCollectionsPanel';
import { DailyBourbonCard } from './DailyBourbonCard';
import { DidYouKnowStrip } from './DidYouKnowStrip';

export function Level1Hub({ toolsOnly = false }: { toolsOnly?: boolean }) {
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
      {!toolsOnly && (
        <>
          <DailyBourbonCard />
          <DidYouKnowStrip compact />
        </>
      )}

      <WorldCollectionsPanel
        worldSlug="bourbon"
        title="Your Bourbon Collections"
        subtitle="Close cases, log bottles, visit houses — each item is part of who you are becoming."
        accent="#C8A96E"
        maxItems={6}
      />

      <section style={{ marginTop: 24, padding: 18, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A2520' }}>
        <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>The Atlas</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
          Every industry word is a doorway — mash bill, rickhouse, proof, allocation, and 100+ more with hover definitions and deep rabbit holes.
        </p>
        <Link href="/bourbon/atlas" style={{ display: 'inline-block', marginTop: 12, color: '#C8A96E', fontSize: 13 }}>
          Open The Atlas →
        </Link>
      </section>

      <ToolSection title="Investigate — live inside bourbon" tools={investigate} />
      <ToolSection title="Beyond the bottle" tools={wild} />
      <ToolSection title="Decide" tools={decide} />
      <ToolSection title="Play" tools={play} />
      <ToolSection title="Explore" tools={explore} />
      <ToolSection title="Collect" tools={collect} />
      <ToolSection title="Learn (when you need it)" tools={learn} />

      <section style={{ marginTop: 40, padding: 20, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
        <p style={{ color: '#6B6B70', fontSize: 13, margin: 0 }}>{LEVEL_1_LESSON_LINK.label}</p>
        <Link href={LEVEL_1_LESSON_LINK.href} style={{ color: '#C8A96E', fontSize: 14, marginTop: 8, display: 'inline-block' }}>
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
      <div style={{ marginTop: 14, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {tools.map((t) => (
          <BourbonDeepToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </section>
  );
}
