'use client';

import Link from 'next/link';
import { DETECTIVE_CASES, getDetectiveCase } from '../../../lib/bourbon-level-1/agency/detective-cases';
import { getDetectiveSolved } from '../../../lib/bourbon-level-1/storage';
import { DetectiveMentorFollowUp } from '../intelligence/DetectiveMentorFollowUp';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

export function BourbonDetectiveHub() {
  const solved = typeof window !== 'undefined' ? getDetectiveSolved() : [];

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7 }}>
        Stop reading lessons. Start investigating. Pick a case — follow the clues — reach a verdict.
      </p>
      {solved.length > 0 && (
        <p style={{ color: ACCENT, fontSize: 13, marginTop: 12 }}>
          {solved.length} case{solved.length !== 1 ? 's' : ''} closed
        </p>
      )}
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {DETECTIVE_CASES.map((c) => (
          <Link
            key={c.slug}
            href={`/bourbon/detective/${c.slug}`}
            style={{
              display: 'block',
              padding: 20,
              background: 'var(--foundry-surface-raised)',
              borderRadius: 10,
              border: `1px solid ${solved.includes(c.slug) ? `${ACCENT}44` : 'var(--foundry-border-subtle)'}`,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <span style={{ fontSize: 11, color: 'var(--foundry-text-faint)', textTransform: 'uppercase' }}>{c.difficulty}</span>
            {solved.includes(c.slug) && <span style={{ marginLeft: 8, fontSize: 11, color: ACCENT }}>✓ closed</span>}
            <p style={{ color: 'var(--foundry-text)', fontSize: 16, margin: '8px 0 0', lineHeight: 1.4 }}>{c.title}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{c.hook}</p>
          </Link>
        ))}
      </div>
      <RabbitHoleFooter seed="detective-hub" />
    </div>
  );
}

export function DetectiveCaseView({ slug }: { slug: string }) {
  const c = getDetectiveCase(slug);
  if (!c) return <p style={{ color: 'var(--foundry-text-muted)' }}>Case not found.</p>;

  return (
    <div>
      <Link href="/bourbon/detective" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← All cases</Link>
      <p style={{ color: ACCENT, fontSize: 11, marginTop: 16, textTransform: 'uppercase' }}>Case file · {c.difficulty}</p>
      <h2 style={{ fontWeight: 300, fontSize: '1.75rem', marginTop: 8, lineHeight: 1.3 }}>{c.title}</h2>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12 }}>{c.hook}</p>

      <section style={{ marginTop: 28 }}>
        <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Clues to gather</h3>
        <ul style={{ marginTop: 12, paddingLeft: 20, color: 'var(--foundry-text)', fontSize: 14, lineHeight: 1.8 }}>
          {c.clues.map((cl) => (
            <li key={cl}>{cl}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 28 }}>
        <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Investigation</h3>
        {c.investigation.map((step) => (
          <article key={step.heading} style={{ marginTop: 16, padding: 18, background: 'var(--foundry-surface-raised)', borderRadius: 10 }}>
            <p style={{ color: 'var(--foundry-text)', fontSize: 15, margin: 0 }}>{step.heading}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{step.body}</p>
          </article>
        ))}
      </section>

      <article style={{ marginTop: 28, padding: 22, background: 'var(--foundry-border-warm)', borderRadius: 12, border: `1px solid ${ACCENT}` }}>
        <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Verdict</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 12, lineHeight: 1.65 }}>{c.verdict}</p>
        <DetectiveMentorFollowUp caseSlug={slug} />
      </article>

      {c.rabbitHole && (
        <Link href={c.rabbitHole.href} style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
          {c.rabbitHole.label} →
        </Link>
      )}

      {c.relatedCases.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 13, color: 'var(--foundry-text-faint)', fontWeight: 400 }}>Related cases</h3>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {c.relatedCases.map((rs) => {
              const related = getDetectiveCase(rs);
              if (!related) return null;
              return (
                <Link key={rs} href={`/bourbon/detective/${rs}`} style={{ padding: '8px 12px', fontSize: 12, borderRadius: 6, border: '1px solid var(--foundry-border)', color: 'var(--foundry-text-muted)', textDecoration: 'none' }}>
                  {related.title.slice(0, 40)}…
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <RabbitHoleFooter seed={slug} />
    </div>
  );
}
