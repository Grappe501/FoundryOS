import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { WorldDepthBundle } from '../../lib/world-depth/types';

type Props = {
  bundle: WorldDepthBundle;
  basePath: string;
  lessonSlug: string;
};

export function WorldAcademyLesson({ bundle, basePath, lessonSlug }: Props) {
  const lesson = bundle.academyLessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const hasBody = Boolean(lesson.sections?.length);

  return (
    <section style={{ marginTop: 16, maxWidth: 720 }}>
      <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>
        <Link href={basePath} style={{ color: '#6B6B70' }}>
          {bundle.displayName}
        </Link>
        {' · '}
        <Link href={`${basePath}/academy`} style={{ color: '#6B6B70' }}>
          Academy
        </Link>
        {' · '}
        <span style={{ color: bundle.accentColor }}>Level {lesson.level}</span>
      </p>

      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16, lineHeight: 1.25 }}>{lesson.title}</h1>

      {lesson.estimatedMinutes && (
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
          ~{lesson.estimatedMinutes} min {lesson.checkpoint ? '· checkpoint' : ''}
        </p>
      )}

      <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 16, lineHeight: 1.7 }}>
        {lesson.summary ?? lesson.description}
      </p>

      <p
        style={{
          marginTop: 20,
          padding: '12px 16px',
          background: '#0F0F12',
          borderLeft: `3px solid ${bundle.accentColor}`,
          color: '#A8A8AC',
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: bundle.accentColor, fontWeight: 400 }}>You will: </strong>
        {lesson.outcome}
      </p>

      {!hasBody && (
        <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 24, lineHeight: 1.7 }}>{lesson.description}</p>
      )}

      {lesson.sections?.map((section) => (
        <article key={section.heading} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 17, color: bundle.accentColor, fontWeight: 400, margin: 0 }}>{section.heading}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.75 }}>{section.body}</p>
        </article>
      ))}

      {lesson.historyNote && (
        <article
          style={{
            marginTop: 32,
            padding: 20,
            background: '#111114',
            border: '1px solid #1A1A1E',
            borderRadius: 8,
          }}
        >
          <h2 style={{ fontSize: 14, color: bundle.accentColor, fontWeight: 400, margin: 0 }}>
            {lesson.historyNote.heading}
          </h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.75 }}>{lesson.historyNote.body}</p>
        </article>
      )}

      {lesson.flavorWords && lesson.flavorWords.length > 0 && (
        <article style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 14, color: bundle.accentColor, fontWeight: 400, margin: 0 }}>Flavor words for this lesson</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.8 }}>
            {lesson.flavorWords.map((w) => (
              <span
                key={w}
                style={{
                  display: 'inline-block',
                  marginRight: 8,
                  marginBottom: 8,
                  padding: '4px 10px',
                  background: '#0F0F12',
                  border: `1px solid ${bundle.accentColor}33`,
                  borderRadius: 4,
                  fontSize: 13,
                }}
              >
                {w}
              </span>
            ))}
          </p>
        </article>
      )}

      {lesson.tryThis && (
        <article
          style={{
            marginTop: 32,
            padding: 20,
            background: '#0F0F12',
            border: `1px solid ${bundle.accentColor}44`,
            borderRadius: 8,
          }}
        >
          <h2 style={{ fontSize: 16, color: '#E8E8EC', fontWeight: 400, margin: 0 }}>Try this: {lesson.tryThis.title}</h2>
          <ol style={{ color: '#8A8A8E', fontSize: 14, marginTop: 16, paddingLeft: 20, lineHeight: 1.8 }}>
            {lesson.tryThis.steps.map((step) => (
              <li key={step} style={{ marginBottom: 8 }}>
                {step}
              </li>
            ))}
          </ol>
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 16, lineHeight: 1.6 }}>
            <strong style={{ color: bundle.accentColor, fontWeight: 400 }}>What to notice: </strong>
            {lesson.tryThis.whatToNotice}
          </p>
        </article>
      )}

      {lesson.glossaryTerms && lesson.glossaryTerms.length > 0 && (
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 28, lineHeight: 1.6 }}>
          Glossary:{' '}
          {lesson.glossaryTerms.map((term, i) => (
            <span key={term}>
              {i > 0 ? ' · ' : ''}
              <Link href={`${basePath}/glossary`} style={{ color: bundle.accentColor }}>
                {term}
              </Link>
            </span>
          ))}
        </p>
      )}

      <div style={{ marginTop: 40, display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid #1A1A1E' }}>
        {lesson.recommendedMission && (
          <Link href={`${basePath}/missions/${lesson.recommendedMission}`} style={{ color: bundle.accentColor, fontSize: 14 }}>
            Enter mission →
          </Link>
        )}
        <Link href={`${basePath}/experiences/tasting-journal`} style={{ color: '#8A8A8E', fontSize: 14 }}>
          Tasting journal →
        </Link>
        <Link href={`${basePath}/academy`} style={{ color: '#6B6B70', fontSize: 14 }}>
          All academy levels →
        </Link>
      </div>
    </section>
  );
}

export function levelTitleForLesson(bundle: WorldDepthBundle, level: number): string | undefined {
  const fromMeta = bundle.academyLessons.find((l) => l.level === level);
  if (!fromMeta) return undefined;
  return `Level ${level}`;
}
