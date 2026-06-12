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
        const levelMeta = bundle.academyLevelMeta?.find((l) => l.level === levelNum);
        const isAuthoredLevel = lessons.some((l) => l.sections?.length);
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
            {levelMeta && (
              <p style={{ color: '#E8E8EC', fontSize: 18, fontWeight: 300, margin: '8px 0 0' }}>{levelMeta.title}</p>
            )}
            {levelMeta && (
              <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>{levelMeta.tagline}</p>
            )}
            {isAuthoredLevel && (
              <p style={{ color: bundle.accentColor, fontSize: 12, marginTop: 12 }}>
                Full curriculum available — start with Lesson 1
              </p>
            )}
            {lessons.map((lesson) => {
              const hasFullLesson = Boolean(lesson.sections?.length);
              return (
                <div key={lesson.slug} style={{ marginTop: 20 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 400, margin: 0, color: '#E8E8EC' }}>
                    {hasFullLesson ? (
                      <Link href={`${basePath}/academy/${lesson.slug}`} style={{ color: '#E8E8EC', textDecoration: 'none' }}>
                        {lesson.title}
                      </Link>
                    ) : (
                      lesson.title
                    )}
                  </h2>
                  <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{lesson.description}</p>
                  <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
                    <strong style={{ color: bundle.accentColor, fontWeight: 400 }}>You will:</strong> {lesson.outcome}
                  </p>
                  {lesson.estimatedMinutes && (
                    <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 6 }}>~{lesson.estimatedMinutes} min</p>
                  )}
                  {hasFullLesson && (
                    <Link
                      href={`${basePath}/academy/${lesson.slug}`}
                      style={{ display: 'inline-block', marginTop: 10, color: bundle.accentColor, fontSize: 13 }}
                    >
                      Read lesson →
                    </Link>
                  )}
                  {lesson.recommendedMission && (
                    <Link
                      href={`${basePath}/missions/${lesson.recommendedMission}`}
                      style={{ display: 'inline-block', marginTop: 10, marginLeft: hasFullLesson ? 16 : 0, color: '#6B6B70', fontSize: 13 }}
                    >
                      Mission →
                    </Link>
                  )}
                </div>
              );
            })}
          </article>
        );
      })}
    </section>
  );
}
