import Link from 'next/link';
import { ConsumerNav } from '../../components/ConsumerNav';
import { TrinityJourneyProgress } from '../../components/trinity/TrinityJourneyProgress';
import { TRINITY_WORLDS } from '../../lib/trinity-worlds';

export const metadata = {
  title: 'My Journey | Foundry',
  description: 'Your Future-Proof progress across AI Builder, Financial Independence, and Public Speaking.',
};

export default function MyJourneyPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <ConsumerNav />
      <section style={{ marginTop: 16 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Student dashboard
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12 }}>I am becoming something.</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 12, lineHeight: 1.7 }}>
          One person growing across three worlds. Your missions, reflections, and portfolios live here — on this device for now.
        </p>

        <TrinityJourneyProgress compact />

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>Your portfolios</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            {TRINITY_WORLDS.map((w) => (
              <Link
                key={w.slug}
                href={`${w.href}/portfolio`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 18,
                  background: '#0F0F12',
                  border: `1px solid ${w.border}`,
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div>
                  <p style={{ color: w.accent, fontSize: 11, margin: 0 }}>{w.frame}</p>
                  <p style={{ color: '#E8E8EC', fontSize: 15, margin: '4px 0 0' }}>{w.portfolioLabel}</p>
                </div>
                <span style={{ color: '#6B6B70', fontSize: 13 }}>View →</span>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8, border: '1px dashed #2A2A2E' }}>
          <p style={{ color: '#6B6B70', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            Coming soon: sign in to sync your journey across devices, share progress with parents, and unlock community features.
          </p>
        </section>

        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/trinity" style={{ color: '#6B9B6B', fontSize: 14, textDecoration: 'none' }}>
            Explore the Trinity →
          </Link>
          <Link href="/future-proof" style={{ color: '#6B6B70', fontSize: 14, textDecoration: 'none' }}>
            Retake assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
