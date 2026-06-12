import Link from 'next/link';
import type { WorldExperience } from '../../lib/immersion/types';

export function WorldExperiencesHub({
  worldName,
  basePath,
  experiences,
  estimatedHours,
  accent = 'var(--foundry-primary)',
}: {
  worldName: string;
  basePath: string;
  experiences: WorldExperience[];
  estimatedHours: string;
  accent?: string;
}) {
  return (
    <section style={{ marginTop: 16 }}>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Experiences</p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{worldName} Tools & Journals</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        An experience is remembered. A lesson is consumed. {estimatedHours} estimated across missions + tools.
      </p>
      <Link href={`${basePath}/missions`} style={{ color: 'var(--foundry-text-faint)', fontSize: 13, display: 'inline-block', marginTop: 12 }}>
        ← All missions
      </Link>

      <div style={{ marginTop: 28, display: 'grid', gap: 12 }}>
        {experiences.map((exp) => (
          <Link
            key={exp.slug}
            href={exp.href ?? `${basePath}/portfolio`}
            style={{
              display: 'block',
              padding: 20,
              background: 'var(--foundry-surface-raised)',
              border: '1px solid var(--foundry-border-subtle)',
              borderRadius: 8,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span style={{ color: 'var(--foundry-text-faint)', fontSize: 10, textTransform: 'uppercase' }}>{exp.category}</span>
            <h2 style={{ fontSize: 16, fontWeight: 400, marginTop: 6, color: 'var(--foundry-text)' }}>{exp.title}</h2>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{exp.description}</p>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 8 }}>
              {exp.estimatedMinutes != null ? `~${exp.estimatedMinutes} min per session` : 'Ongoing experience'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
