import Link from 'next/link';
import { BOURBON_DEPTH } from '../../../../lib/world-depth/bundles/bourbon';
import type { AcademyLesson } from '../../../../lib/world-depth/types';

export const metadata = {
  title: 'Level 4 Academy — Connoisseur | Bourbon | Foundry',
  description: 'Ten lessons: label anatomy, DSP, NAS, single barrel, NCF, cask strength, store picks, checkpoint.',
};

export default function AcademyLevel4Page() {
  const lessons = BOURBON_DEPTH.academyLessons.filter(
    (l: AcademyLesson) => l.level === 4 && l.sections?.length,
  );

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-4" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 4 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Level 4 — Connoisseur</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
        Label literacy, DSP sourcing, Compare Five discipline, and process labs before Level 5 blind hosting.
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
        <Link href="/bourbon/academy/level-3" style={{ color: 'var(--foundry-text-faint)' }}>Level 3 lessons</Link>
        {' · '}
        <Link href="/bourbon/label-decoder" style={{ color: 'var(--foundry-primary)' }}>Label Decoder →</Link>
      </p>
    </section>
  );
}
