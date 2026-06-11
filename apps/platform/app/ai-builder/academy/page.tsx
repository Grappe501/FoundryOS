import Link from 'next/link';
import { AI_BUILDER_ACADEMY_LEVELS, AI_BUILDER_ACADEMY_TOPICS } from '../../../lib/ai-builder-world';

export const metadata = { title: 'Academy | AI Builder World' };

export default function AcademyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>AI Builder Academy</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Seven levels — each unlocks missions and labs. Progress by building, not by passing quizzes.
      </p>
      <section style={{ marginTop: 24, padding: 20, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Core topics (woven into missions)</h2>
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AI_BUILDER_ACADEMY_TOPICS.map((topic) => (
            <span key={topic} style={{ fontSize: 13, color: '#8A8A8E', padding: '8px 12px', background: '#0F0F12', borderRadius: 6 }}>
              {topic}
            </span>
          ))}
        </div>
      </section>
      <div style={{ marginTop: 28 }}>
        {AI_BUILDER_ACADEMY_LEVELS.map((level) => (
          <article
            key={level.slug}
            style={{
              padding: 24,
              marginBottom: 12,
              background: level.level === 1 ? '#0F0F12' : '#111114',
              border: level.level === 1 ? '1px solid #2A4A2A' : '1px solid #1A1A1E',
              borderRadius: 8,
            }}
          >
            <p style={{ color: '#6B9B6B', fontSize: 11, margin: 0 }}>Level {level.level}</p>
            <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{level.title}</h2>
            <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{level.tagline}</p>
            <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
              Unlocks: {level.unlocks.join(' · ')}
            </p>
            {level.level === 1 && (
              <Link href="/ai-builder/missions/homework-assistant" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 14 }}>
                Start with Mission 1 →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
