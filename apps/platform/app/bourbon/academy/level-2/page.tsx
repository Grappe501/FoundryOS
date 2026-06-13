import Link from 'next/link';
import { BOURBON_DEPTH } from '../../../../lib/world-depth/bundles/bourbon';
import type { AcademyLesson } from '../../../../lib/world-depth/types';

export const metadata = {
  title: 'Level 2 Academy — Confident Taster | Bourbon | Foundry',
  description: 'Ten lessons: mash bill, flavor wheel, category cousins, checkpoint.',
};

export default function AcademyLevel2Page() {
  const lessons = BOURBON_DEPTH.academyLessons.filter(
    (l: AcademyLesson) => l.level === 2 && l.sections?.length,
  );

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Level 2 — Confident Taster</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Identify flavors and compare pours with purpose. Each lesson links to Tasting Lab flights and tools — read, then pour.
      </p>
      <div style={{ marginTop: 28, display: 'grid', gap: 14 }}>
        {lessons.map((l) => (
          <Link
            key={l.slug}
            href={`/bourbon/academy/${l.slug}`}
            style={{
              display: 'block',
              padding: 20,
              background: 'var(--foundry-surface-raised)',
              borderRadius: 10,
              border: `1px solid ${l.checkpoint ? 'var(--foundry-primary-border-dim)' : 'var(--foundry-border-subtle)'}`,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ color: l.checkpoint ? 'var(--foundry-primary)' : 'var(--foundry-text-faint)', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {l.checkpoint ? 'Checkpoint' : `Lesson · ${l.estimatedMinutes ?? 20} min`}
            </p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 17, margin: '8px 0 0', fontWeight: 500 }}>{l.title}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{l.description}</p>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: 32, color: 'var(--foundry-text-faint)', fontSize: 13 }}>
        <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)' }}>Level 1 lessons</Link>
        {' · '}
        <Link href="/bourbon/tasting-lab" style={{ color: 'var(--foundry-primary)' }}>Tasting Lab →</Link>
      </p>
    </section>
  );
}
