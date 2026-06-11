import Link from 'next/link';
import { NextRecommendedWorld } from '../../components/trinity/NextRecommendedWorld';
import { TrinityJourneyProgress } from '../../components/trinity/TrinityJourneyProgress';
import {
  FI_ACADEMY_LEVELS,
  FI_CAREERS,
  FI_COMMUNITY,
  FI_LOOP,
  FI_MISSIONS,
  FI_PLAYGROUND_LABS,
} from '../../lib/financial-independence-world';

export const metadata = {
  title: 'Financial Independence World | Foundry',
  description: 'Keep value. Budget, save, invest — missions not courses. The Keep Value path in Become Future-Proof.',
};

export default function FiWorldPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <section style={{ padding: 32, background: '#0F0F12', border: '1px solid #4A4020', borderRadius: 8 }}>
        <p style={{ color: '#C8A96E', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Keep value · Future-Proof Trinity
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12 }}>Financial Independence World</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>
          AI Builder helps you <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>create value</strong>. Financial Independence helps you{' '}
          <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>keep it</strong>. Missions, not worksheets.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/financial-independence/missions/first-budget" style={{ padding: '14px 24px', background: '#4A4020', borderRadius: 6, color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
            Start Mission 1 →
          </Link>
          <Link href="/financial-independence/parents" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            For Parents
          </Link>
          <Link href="/ai-builder" style={{ padding: '14px 24px', border: '1px solid #2A4A2A', borderRadius: 6, color: '#6B9B6B', fontSize: 14, textDecoration: 'none' }}>
            AI Builder (Create Value)
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>How Foundry works</h2>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {FI_LOOP.map((item, i) => (
            <span key={item.step} style={{ fontSize: 12, color: '#8A8A8E' }}>
              {i > 0 && ' → '}{item.step}
            </span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Missions</h2>
        {FI_MISSIONS.map((m) => (
          <Link key={m.slug} href={`/financial-independence/missions/${m.slug}`} style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid #1A1A1E', textDecoration: 'none', color: '#E8E8EC', fontSize: 14 }}>
            Mission {m.number}: {m.title}
          </Link>
        ))}
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>{FI_COMMUNITY.name}</h2>
        {FI_COMMUNITY.features.map((f) => (
          <p key={f.title} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}><strong style={{ color: '#E8E8EC', fontWeight: 400 }}>{f.title}</strong> — {f.description}</p>
        ))}
      </section>

      <TrinityJourneyProgress compact />
      <NextRecommendedWorld currentSlug="financial-independence" />

      <p style={{ marginTop: 24, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>Future-Proof Assessment</Link>
        {' · '}
        <Link href="/explore/financial-independence" style={{ color: '#6B6B70' }}>Explore path</Link>
      </p>
    </section>
  );
}
