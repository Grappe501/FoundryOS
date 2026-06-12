'use client';

import Link from 'next/link';
import type { BourbonPerson } from '../../lib/bourbon-depth/types';
import { getBottle } from '../../lib/bourbon-level-1/bottles';
import { listBourbonPeople } from '../../lib/bourbon-depth/people';

const ACCENT = 'var(--foundry-primary)';

export function PersonProfileView({ person }: { person: BourbonPerson }) {
  return (
    <article>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: 0 }}>
        <Link href="/bourbon/people" style={{ color: 'var(--foundry-text-faint)' }}>Masters & Makers</Link>
        {' · '}
        {person.producerSlugs.map((s, i) => (
          <span key={s}>
            {i > 0 && ' · '}
            <Link href={`/bourbon/producers/${s}`} style={{ color: 'var(--foundry-text-faint)' }}>{s.replace(/-/g, ' ')}</Link>
          </span>
        ))}
      </p>

      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 16 }}>{person.name}</h1>
      <p style={{ color: ACCENT, fontSize: 14, marginTop: 8 }}>{person.title}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 6 }}>{person.era}</p>

      <blockquote style={{ margin: '24px 0 0', padding: '18px 20px', borderLeft: `3px solid ${ACCENT}`, background: 'var(--foundry-surface)', color: '#A8A8AC', fontSize: 15, fontStyle: 'italic', lineHeight: 1.6 }}>
        {person.hook}
      </blockquote>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: ACCENT, fontWeight: 400 }}>Origin</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{person.originStory}</p>
      </section>

      <section style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 10 }}>
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Career</h2>
        {person.careerHighlights.map((c) => (
          <div key={c.year + c.event} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid var(--foundry-border-subtle)' }}>
            <span style={{ color: ACCENT, fontSize: 13, minWidth: 52 }}>{c.year}</span>
            <span style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.65 }}>{c.event}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-text)' }}>Philosophy</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{person.philosophy}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-text)' }}>Legacy</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{person.legacy}</p>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)' }}>Distinguishing facts</h2>
        <ul style={{ color: 'var(--foundry-text)', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
          {person.distinguishingFacts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      {person.relatedBottleSlugs && person.relatedBottleSlugs.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: 'var(--foundry-text-faint)' }}>Related bottles</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {person.relatedBottleSlugs.map((slug) => {
              const bottle = getBottle(slug);
              return (
                <Link key={slug} href={`/bourbon/bottles/${slug}`} style={{ padding: '8px 12px', background: 'var(--foundry-surface)', borderRadius: 6, color: ACCENT, fontSize: 12, textDecoration: 'none' }}>
                  {bottle?.name ?? slug}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}

export function PeopleIndex() {
  const people = listBourbonPeople();

  return (
    <div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.75 }}>
        Not trivia cards — the individuals who shaped how bourbon tastes. Documentary profiles, not Wikipedia stubs.
      </p>
      <div style={{ marginTop: 28, display: 'grid', gap: 16 }}>
        {people.map((p) => (
          <Link
            key={p.slug}
            href={`/bourbon/people/${p.slug}`}
            style={{ display: 'block', padding: 22, background: 'var(--foundry-surface-raised)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)', textDecoration: 'none' }}
          >
            <p style={{ color: 'var(--foundry-text)', fontSize: 17, margin: 0 }}>{p.name}</p>
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 6 }}>{p.title}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>{p.hook}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
