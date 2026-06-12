'use client';

import Link from 'next/link';
import { listBottleProgressions, getBottleProgression } from '../../../lib/bourbon-level-1/agency/bottle-progression';
import { getBottle } from '../../../lib/bourbon-level-1/bottles';
import { getBottleDepth } from '../../../lib/bourbon-depth/bottle-depth';
import { resolveBourbonBottleGraph } from '../../../lib/bourbon-atlas/resolve-bottle-graph';
import { BourbonGraphHallway } from '../BourbonGraphHallway';
import { ArtifactExperiencePanel } from '../../artifacts/ArtifactExperiencePanel';
import { BourbonIntelligencePanel } from '../BourbonIntelligencePanel';
import { enrichBottleIntro } from '../../../lib/bourbon-graph/enrich-narrative';
import { LinkedParagraph } from '../LinkedParagraph';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = 'var(--foundry-primary)';

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
  const depth = getBottleDepth(slug);
  const graph = resolveBourbonBottleGraph(slug);

  if (!b || !bottle) return <p style={{ color: '#8A8A8E' }}>Bottle not found.</p>;

  return (
    <div>
      <Link href="/bourbon/bottles" style={{ color: '#6B6B70', fontSize: 13 }}>← All bottles</Link>
      <Link href={`/bourbon/producers/${bottle.producerSlug}`} style={{ color: '#6B6B70', fontSize: 13, marginLeft: 12 }}>
        {bottle.producerName} →
      </Link>
      <Link href={`/bourbon/graph/${slug}`} style={{ color: ACCENT, fontSize: 13, marginLeft: 12, textDecoration: 'none' }}>
        Graph map →
      </Link>
      <h2 style={{ fontWeight: 300, fontSize: '1.75rem', marginTop: 12 }}>{bottle.name}</h2>
      <LinkedParagraph segments={enrichBottleIntro(slug)} style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10 }} />
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>${bottle.priceUsd} · {bottle.proof} proof · {bottle.mashbill}</p>

      {graph && <BourbonGraphHallway graph={graph} linkifyTeasers />}

      <BourbonIntelligencePanel slug={slug} />

      <ArtifactExperiencePanel
        worldSlug="bourbon"
        entityType="bottle"
        slug={slug}
        entityName={bottle.name}
      />

      {depth && (
        <>
          <section style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 14, color: ACCENT, fontWeight: 400 }}>History</h3>
            <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{depth.history}</p>
          </section>
          <section style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 14, color: '#E8E8EC', fontWeight: 400 }}>How it&apos;s made</h3>
            <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{depth.howItsMade}</p>
          </section>
          <section style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 13, color: '#6B6B70' }}>Distinguishing facts</h3>
            <ul style={{ color: '#E8E8EC', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
              {depth.distinguishingFacts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          {depth.masterNote && (
            <blockquote style={{ marginTop: 24, padding: 16, borderLeft: `3px solid ${ACCENT}`, background: '#0F0F12', color: '#A8A8AC', fontSize: 14, fontStyle: 'italic' }}>
              {depth.masterNote}
            </blockquote>
          )}
          <section style={{ marginTop: 28, padding: 20, background: '#0F1018', borderRadius: 10 }}>
            <h3 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>When is this bottle best?</h3>
            <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{depth.whenBest}</p>
            <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
              {depth.pairings.map((pair) => (
                <div key={pair.occasion} style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
                  <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{pair.occasion}</p>
                  <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6 }}>{pair.why}</p>
                  {pair.serve && <p style={{ color: ACCENT, fontSize: 12, marginTop: 6 }}>{pair.serve}</p>}
                </div>
              ))}
            </div>
          </section>
          {depth.compareWith.length > 0 && (
            <section style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 13, color: '#6B6B70' }}>Compare side-by-side</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {depth.compareWith.map((other) => {
                  const ob = getBottle(other);
                  return (
                    <Link
                      key={other}
                      href={`/bourbon/compare?mode=bottles&a=${slug}&b=${other}`}
                      style={{ padding: '8px 12px', background: '#1A2530', borderRadius: 999, color: '#E8E8EC', fontSize: 12, textDecoration: 'none', border: `1px solid ${ACCENT}44` }}
                    >
                      vs {ob?.name ?? other} →
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

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
