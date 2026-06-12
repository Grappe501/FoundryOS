'use client';

import Link from 'next/link';
import { ConsumerNav } from '../../../components/ConsumerNav';
import { MemoryTimelinePanel } from '../../../components/world-continuity/ContinuityPanels';

export default function PassportTimelinePage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        Foundry Passport · Memory Timeline
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 8 }}>Your Story So Far</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>
        Not a resume of clicks — permanent milestones, closed mysteries, and collections that became part of who you are.
      </p>

      <MemoryTimelinePanel />

      <Link href="/passport" style={{ display: 'inline-block', marginTop: 28, color: '#6B9B6B', fontSize: 14 }}>
        ← Back to Passport
      </Link>
      <Link href="/my-journey" style={{ display: 'inline-block', marginTop: 28, marginLeft: 20, color: '#6B9BC9', fontSize: 14 }}>
        Continue your journey →
      </Link>
    </main>
  );
}
