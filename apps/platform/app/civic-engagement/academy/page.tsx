import Link from 'next/link';
import { CIVIC_ENGAGEMENT_ACADEMY_LEVELS } from '../../../lib/civic-engagement-world';

export default function CivicEngagementAcademyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Academy</h1>
      {CIVIC_ENGAGEMENT_ACADEMY_LEVELS.map((level) => (
        <article key={level.slug} style={{ padding: 24, marginTop: 12, background: '#111114', borderRadius: 8 }}>
          <p style={{ color: '#6B9B6B', fontSize: 11, margin: 0 }}>Level {level.level}</p>
          <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8 }}>{level.title}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{level.tagline}</p>
          {level.level === 1 && (
            <Link href="/civic-engagement/missions/research-ballot" style={{ display: 'inline-block', marginTop: 16, color: '#6B9B6B', fontSize: 14 }}>Start Mission 1 →</Link>
          )}
        </article>
      ))}
    </section>
  );
}
