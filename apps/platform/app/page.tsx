import Link from 'next/link';
import { ConsumerNav } from '../components/ConsumerNav';
import { TrinityHub } from '../components/trinity/TrinityHub';
import { TrinityJourneyProgress } from '../components/trinity/TrinityJourneyProgress';

export const metadata = {
  title: 'Foundry — Become Future-Proof',
  description:
    'Create value · Keep value · Communicate value. Real missions, real portfolios — not courses.',
};

export default function ConsumerHomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#08080A',
        color: '#E8E8EC',
        padding: '2rem',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      <ConsumerNav />

      <section style={{ marginTop: 24, padding: 36, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
          Foundry
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.75rem', marginTop: 12, lineHeight: 1.15 }}>
          Help me become the person I want to be.
        </h1>
        <p style={{ color: '#8A8A8E', fontSize: 17, marginTop: 16, lineHeight: 1.7, maxWidth: 560 }}>
          Not courses. Not worksheets. <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>Missions, builds, and portfolios</strong>{' '}
          across three worlds that make you future-proof.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/future-proof"
            style={{
              padding: '14px 24px',
              background: '#2A4A2A',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Take the assessment →
          </Link>
          <Link
            href="/ai-builder/missions/homework-assistant"
            style={{
              padding: '14px 24px',
              border: '1px solid #1A1A1E',
              borderRadius: 6,
              color: '#8A8A8E',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Start Mission 1 →
          </Link>
          <Link href="/parents" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            For Parents
          </Link>
        </div>
      </section>

      <TrinityJourneyProgress />

      <TrinityHub />

      <section style={{ marginTop: 32, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>How it works</h2>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>
          Mission → Build → Show → Reflect → Improve → Mentor. Every world follows the same loop. Your progress travels with you.
        </p>
        <Link href="/my-journey" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 14, textDecoration: 'none' }}>
          View my journey →
        </Link>
      </section>

      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/trinity" style={{ color: '#6B6B70' }}>The Trinity</Link>
        {' · '}
        <Link href="/explore" style={{ color: '#6B6B70' }}>Explore paths</Link>
        {' · '}
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>Future-Proof assessment</Link>
      </p>
    </main>
  );
}
