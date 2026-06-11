import Link from 'next/link';
import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
  basePath: string;
};

export function WorldAcademyDepth({ bundle, basePath }: Props) {
  const levels = [...new Set(bundle.academyLessons.map((l) => l.level))].sort((a, b) => a - b);

  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>Academy</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
        Seven levels · five lessons each · progress by building, not by quizzes.
      </p>
      {levels.map((levelNum) => {
        const lessons = bundle.academyLessons.filter((l) => l.level === levelNum);
        return (
          <article
            key={levelNum}
            style={{
              padding: 24,
              marginTop: 16,
              background: levelNum === 1 ? '#0F0F12' : '#111114',
              border: levelNum === 1 ? `1px solid ${bundle.accentColor}44` : '1px solid #1A1A1E',
              borderRadius: 8,
            }}
          >
            <p style={{ color: bundle.accentColor, fontSize: 11, margin: 0 }}>Level {levelNum}</p>
            {lessons.map((lesson) => (
              <div key={lesson.slug} style={{ marginTop: levelNum === 1 && lesson === lessons[0] ? 12 : 20 }}>
                <h2 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>{lesson.title}</h2>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{lesson.description}</p>
                <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
                  <strong style={{ color: bundle.accentColor, fontWeight: 400 }}>You will:</strong> {lesson.outcome}
                </p>
                {lesson.recommendedMission && (
                  <Link
                    href={`${basePath}/missions/${lesson.recommendedMission}`}
                    style={{ display: 'inline-block', marginTop: 12, color: bundle.accentColor, fontSize: 13 }}
                  >
                    Recommended mission →
                  </Link>
                )}
              </div>
            ))}
          </article>
        );
      })}
    </section>
  );
}
