import Link from 'next/link';
import { ChoosePathLink } from '../../components/ChoosePathLink';
import { NextRecommendedWorld } from '../../components/trinity/NextRecommendedWorld';
import { TrinityJourneyProgress } from '../../components/trinity/TrinityJourneyProgress';
import {
  AI_BUILDER_ACADEMY_LEVELS,
  AI_BUILDER_CAREERS,
  AI_BUILDER_COMMUNITY,
  AI_BUILDER_LOOP,
  AI_BUILDER_MISSIONS,
  AI_BUILDER_PLAYGROUND_LABS,
} from '../../lib/ai-builder-world';

export const metadata = {
  title: 'AI Builder World | Foundry',
  description:
    'Not a course — a world. Missions, projects, portfolio, playground. Build real things with AI and become future-proof.',
};

export default function AiBuilderWorldPage() {
  return (
    <>
      <section style={{ marginTop: 16, padding: 32, background: '#0F0F12', border: '1px solid #2A4A2A', borderRadius: 8 }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Create value · Future-Proof Trinity
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.5rem', marginTop: 12, lineHeight: 1.2 }}>AI Builder World</h1>
        <p style={{ color: '#8A8A8E', fontSize: 16, marginTop: 16, lineHeight: 1.7, maxWidth: 640 }}>
          Not lessons and quizzes. <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>Missions, builds, and proof.</strong>{' '}
          You can actually build something here.
        </p>
        <p style={{ color: '#6B9B6B', fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>
          How does this help you become future-proof? AI is reshaping every career — builders who ship projects compound
          faster than people who watch tutorials.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/ai-builder/missions/homework-assistant"
            style={{
              padding: '14px 24px',
              background: '#2A4A2A',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Start Mission 1 →
          </Link>
          <ChoosePathLink />
          <Link href="/ai-builder/parents" style={{ padding: '14px 24px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}>
            For Parents
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 32, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>How Foundry works (not a course)</h2>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AI_BUILDER_LOOP.map((item, i) => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ color: '#4A4A4E' }}>→</span>}
              <div style={{ padding: '10px 14px', background: '#0F0F12', borderRadius: 6, border: '1px solid #1A1A1E' }}>
                <p style={{ color: '#E8E8EC', fontSize: 13, margin: 0 }}>{item.step}</p>
                <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 4 }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
          <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Missions</h2>
          <Link href="/ai-builder/missions" style={{ color: '#6B6B70', fontSize: 12, textDecoration: 'none' }}>
            All missions →
          </Link>
        </div>
        <div style={{ marginTop: 16 }}>
          {AI_BUILDER_MISSIONS.slice(0, 3).map((m) => (
            <Link
              key={m.slug}
              href={`/ai-builder/missions/${m.slug}`}
              style={{
                display: 'block',
                padding: '16px 0',
                borderBottom: '1px solid #1A1A1E',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span style={{ color: '#6B9B6B', fontSize: 12 }}>Mission {m.number}</span>
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: '4px 0 0' }}>{m.title}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{m.timeEstimate}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Academy — 7 levels, each unlocks projects</h2>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {AI_BUILDER_ACADEMY_LEVELS.map((level) => (
            <span key={level.slug} style={{ fontSize: 12, color: '#8A8A8E', padding: '6px 10px', background: '#0F0F12', borderRadius: 4 }}>
              L{level.level} {level.title}
            </span>
          ))}
        </div>
        <Link href="/ai-builder/academy" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 13 }}>
          Explore academy →
        </Link>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Playground — learn by experimenting</h2>
        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {AI_BUILDER_PLAYGROUND_LABS.map((lab) => (
            <div key={lab.slug} style={{ padding: 14, background: '#111114', borderRadius: 6 }}>
              <p style={{ color: '#E8E8EC', fontSize: 13, margin: 0 }}>{lab.title}</p>
              <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 6 }}>{lab.unlockLevel}+</p>
            </div>
          ))}
        </div>
        <Link href="/ai-builder/playground" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 13 }}>
          Enter playground →
        </Link>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>{AI_BUILDER_COMMUNITY.name}</h2>
        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          {AI_BUILDER_COMMUNITY.features.map((f) => (
            <div key={f.title}>
              <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{f.title}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 4 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>What careers use this?</h2>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AI_BUILDER_CAREERS.slice(0, 6).map((c) => (
            <span key={c.title} style={{ fontSize: 12, color: '#8A8A8E', padding: '6px 10px', border: '1px solid #1A1A1E', borderRadius: 4 }}>
              {c.title}
            </span>
          ))}
        </div>
        <Link href="/ai-builder/careers" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 13 }}>
          All career connections →
        </Link>
      </section>

      <TrinityJourneyProgress compact />
      <NextRecommendedWorld currentSlug="ai-builder" />

      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>Future-Proof Assessment</Link>
        {' · '}
        <Link href="/ai-builder/portfolio" style={{ color: '#6B6B70' }}>My AI Portfolio</Link>
        {' · '}
        <Link href="/explore" style={{ color: '#6B6B70' }}>Explore paths</Link>
      </p>
    </>
  );
}
