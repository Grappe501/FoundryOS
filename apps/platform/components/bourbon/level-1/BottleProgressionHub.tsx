'use client';

import Link from 'next/link';
import { listBottleProgressions, getBottleProgression } from '../../../lib/bourbon-level-1/agency/bottle-progression';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = '#C8A96E';

export function BottleProgressionHub() {
  const bottles = listBottleProgressions();

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Not ratings. Not reviews. What each bottle teaches — who it is for — what comes next.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {bottles.map((b) => {
          const bottle = getBottle(b.slug)!;
          return (
            <Link
              key={b.slug}
              href={`/bourbon/bottles/${b.slug}`}
              style={{
                display: 'block',
                padding: 18,
                background: '#111114',
                borderRadius: 10,
                border: '1px solid #1A1A1E',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{bottle.name}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>${bottle.priceUsd} · {bottle.proof} proof</p>
              <p style={{ color: ACCENT, fontSize: 12, marginTop: 8 }}>{b.whatItTeaches[0]}</p>
            </Link>
          );
        })}
      </div>
      <RabbitHoleFooter seed="bottles" />
    </div>
  );
}

export function BottleProgressionView({ slug }: { slug: string }) {
  const b = getBottleProgression(slug);
  const bottle = getBottle(slug);

  if (!b || !bottle) return <p style={{ color: '#8A8A8E' }}>Bottle not found.</p>;

  return (
    <div>
      <Link href="/bourbon/bottles" style={{ color: '#6B6B70', fontSize: 13 }}>← All bottles</Link>
      <h2 style={{ fontWeight: 300, fontSize: '1.75rem', marginTop: 12 }}>{bottle.name}</h2>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{bottle.oneLiner}</p>

      <section style={{ marginTop: 28 }}>
        <h3 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>What you&apos;ll learn</h3>
        <ul style={{ color: '#E8E8EC', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
          {b.whatItTeaches.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <article style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Who it&apos;s for</p>
          <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8 }}>{b.whoItsFor}</p>
        </article>
        <article style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>When to buy</p>
          <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8 }}>{b.whenToBuy}</p>
        </article>
      </section>

      {(b.nextBottle || b.thenBottle) && (
        <section style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>Progression path</h3>
          {b.nextBottle && (
            <Link href={`/bourbon/bottles/${b.nextBottle.slug}`} style={{ display: 'block', marginTop: 12, padding: 16, background: '#2A2520', borderRadius: 8, textDecoration: 'none', border: `1px solid ${ACCENT}44` }}>
              <p style={{ color: ACCENT, fontSize: 11, margin: 0 }}>Next bottle</p>
              <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 6 }}>{b.nextBottle.name}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{b.nextBottle.why}</p>
            </Link>
          )}
          {b.thenBottle && (
            <Link href={`/bourbon/bottles/${b.thenBottle.slug}`} style={{ display: 'block', marginTop: 10, padding: 16, background: '#111114', borderRadius: 8, textDecoration: 'none' }}>
              <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Then</p>
              <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 6 }}>{b.thenBottle.name}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{b.thenBottle.why}</p>
            </Link>
          )}
        </section>
      )}

      <Link href={`/bourbon/x-ray?bottle=${slug}`} style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
        X-Ray breakdown →
      </Link>
      <RabbitHoleFooter seed={slug} />
    </div>
  );
}
