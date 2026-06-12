'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BourbonProducer } from '../../lib/world-depth/bourbon-producers';
import type { ProducerDepthOverlay } from '../../lib/bourbon-depth/types';
import type { BourbonPerson } from '../../lib/bourbon-depth/types';
import { RabbitHolePanel } from '../living-worlds/RabbitHolePanel';

const ACCENT = 'var(--foundry-primary)';

type Props = {
  producer: BourbonProducer;
  compareTargets: { slug: string; name: string }[];
  depth?: ProducerDepthOverlay;
  masters?: BourbonPerson[];
};

export function ProducerProfileView({ producer: p, compareTargets, depth, masters = [] }: Props) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  return (
    <article>
      <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>
        <Link href="/bourbon/producers" style={{ color: '#6B6B70' }}>Producer Atlas</Link>
        {' · '}
        <Link href="/bourbon/academy" style={{ color: '#6B6B70' }}>Academy</Link>
      </p>

      <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 16, lineHeight: 1.2 }}>{p.name}</h1>
      <p style={{ color: ACCENT, fontSize: 15, marginTop: 10 }}>{p.tagline}</p>

      <blockquote
        style={{
          margin: '24px 0 0',
          padding: '18px 20px',
          borderLeft: `3px solid ${ACCENT}`,
          background: '#0F0F12',
          color: '#A8A8AC',
          fontSize: 15,
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}
      >
        {p.hookQuestion}
      </blockquote>

      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        <MetaChip label="Founded" value={p.founded} />
        <MetaChip label="HQ" value={p.headquarters} />
        <MetaChip label="Parent" value={p.parentCompany} />
        {p.dspNote && <MetaChip label="DSP" value={p.dspNote} />}
      </div>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: ACCENT, fontWeight: 400, letterSpacing: '0.06em' }}>WHAT MAKES THEM DIFFERENT</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>{p.differentiator}</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 16, lineHeight: 1.7 }}>
          <strong style={{ color: ACCENT, fontWeight: 400 }}>Mash signature: </strong>
          {p.mashBillSignature}
        </p>
      </section>

      {depth && (
        <>
          <section style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 14, color: ACCENT, fontWeight: 400, letterSpacing: '0.06em' }}>HOW THE COMPANY CAME TO BE</h2>
            <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{depth.foundingStory}</p>
          </section>
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 14, color: '#E8E8EC', fontWeight: 400 }}>How they survived</h2>
            <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.85 }}>{depth.survivalStory}</p>
          </section>
          <section style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 13, color: '#6B6B70' }}>Distinguishing facts</h2>
            <ul style={{ color: '#E8E8EC', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>
              {depth.distinguishingFacts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {p.history.map((block) => (
        <section key={block.heading} style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 17, color: '#E8E8EC', fontWeight: 400, margin: 0 }}>{block.heading}</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.8 }}>{block.body}</p>
        </section>
      ))}

      <section style={{ marginTop: 36, padding: 24, background: '#0F0F12', borderRadius: 10, border: '1px solid #1A1A1E' }}>
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Timeline</h2>
        <div style={{ marginTop: 16 }}>
          {p.timeline.map((t) => (
            <div key={t.year} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid #1A1A1E' }}>
              <span style={{ color: ACCENT, fontSize: 13, minWidth: 48 }}>{t.year}</span>
              <span style={{ color: '#8A8A8E', fontSize: 13, lineHeight: 1.6 }}>{t.event}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Sweet spot shelf — where to spend your money</h2>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{p.priceLadder.tier} · {p.priceLadder.range}</p>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{p.priceLadder.note}</p>
        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
          {p.sweetSpot.map((b) => (
            <div
              key={b.name}
              style={{
                padding: 18,
                background: '#111114',
                borderRadius: 8,
                border: b.role === 'daily' ? `1px solid ${ACCENT}44` : '1px solid #1A1A1E',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: '#E8E8EC', fontSize: 15 }}>{b.name}</span>
                <span style={{ color: ACCENT, fontSize: 12 }}>{b.priceUsd} · {b.proof} proof</span>
              </div>
              <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 6, textTransform: 'uppercase' }}>{b.role.replace('-', ' ')}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 10, lineHeight: 1.65 }}>{b.whatToExpect}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: 32,
          padding: 24,
          background: 'linear-gradient(135deg, #1A160F 0%, #111114 100%)',
          border: `1px solid ${ACCENT}33`,
          borderRadius: 10,
        }}
      >
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Crown jewel — best they produce</h2>
        <p style={{ color: '#E8E8EC', fontSize: 17, marginTop: 12 }}>{p.crownJewel.name}</p>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>{p.crownJewel.priceUsd} · {p.crownJewel.proof} proof</p>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{p.crownJewel.whatToExpect}</p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: '#E8E8EC', margin: 0 }}>Your first pour from this house</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.8 }}>{p.firstPourExpectation}</p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Questions you did not know to ask</h2>
        <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>Tap each — these are the rabbit holes stewards live in.</p>
        <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
          {p.hiddenQuestions.map((hq, i) => (
            <div key={hq.question} style={{ background: '#111114', borderRadius: 8, overflow: 'hidden', border: '1px solid #1A1A1E' }}>
              <button
                type="button"
                onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: '#E8E8EC',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {openQuestion === i ? '−' : '+'} {hq.question}
              </button>
              {openQuestion === i && (
                <p style={{ color: '#8A8A8E', fontSize: 13, margin: 0, padding: '0 16px 16px', lineHeight: 1.75 }}>{hq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {masters.length > 0 && (
        <section style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>Masters & makers</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {masters.map((m) => (
              <Link key={m.slug} href={`/bourbon/people/${m.slug}`} style={{ display: 'block', padding: 18, background: '#111114', borderRadius: 8, textDecoration: 'none', border: '1px solid #1A1A1E' }}>
                <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{m.name}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{m.hook}</p>
              </Link>
            ))}
          </div>
          <Link href="/bourbon/people" style={{ display: 'inline-block', marginTop: 12, color: '#6B6B70', fontSize: 13 }}>All masters →</Link>
        </section>
      )}

      {depth && depth.pairings.length > 0 && (
        <section style={{ marginTop: 36, padding: 24, background: '#0F1018', borderRadius: 10, border: '1px solid #2A2520' }}>
          <h2 style={{ fontSize: 14, color: ACCENT, margin: 0 }}>When is this house best?</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{depth.whenBest}</p>
          <div style={{ marginTop: 20, display: 'grid', gap: 14 }}>
            {depth.pairings.map((pair) => (
              <div key={pair.occasion} style={{ padding: 16, background: '#111114', borderRadius: 8 }}>
                <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0 }}>{pair.occasion}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.65 }}>{pair.why}</p>
                {pair.serve && <p style={{ color: ACCENT, fontSize: 12, marginTop: 8 }}>{pair.serve}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {depth?.competitorView && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: '#6B6B70' }}>What rivals say</h2>
          <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.75, fontStyle: 'italic' }}>{depth.competitorView}</p>
        </section>
      )}

      {compareTargets.length > 0 && (
        <section style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>Compare side-by-side</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {compareTargets.map((c) => (
              <Link
                key={c.slug}
                href={`/bourbon/compare?mode=producers&a=${p.slug}&b=${c.slug}`}
                style={{
                  padding: '8px 14px',
                  background: '#1A2530',
                  border: `1px solid ${ACCENT}44`,
                  borderRadius: 999,
                  color: '#E8E8EC',
                  fontSize: 12,
                  textDecoration: 'none',
                }}
              >
                vs {c.name.split(' ')[0]} — chart →
              </Link>
            ))}
          </div>
        </section>
      )}

      {compareTargets.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 14, color: '#6B6B70', margin: 0 }}>Read next house</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {compareTargets.map((c) => (
              <Link
                key={c.slug}
                href={`/bourbon/producers/${c.slug}`}
                style={{
                  padding: '8px 14px',
                  background: '#0F0F12',
                  border: '1px solid #2A2A2E',
                  borderRadius: 999,
                  color: '#8A8A8E',
                  fontSize: 12,
                  textDecoration: 'none',
                }}
              >
                {c.name.split(' ')[0]} profile →
              </Link>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1A1A1E', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Link href="/bourbon/experiences/tasting-journal" style={{ color: ACCENT, fontSize: 14 }}>
          Log a pour in your journal →
        </Link>
        {p.academyLessonSlug && (
          <Link href={`/bourbon/academy/${p.academyLessonSlug}`} style={{ color: '#8A8A8E', fontSize: 14 }}>
            Related academy lesson →
          </Link>
        )}
        <Link href="/bourbon/academy/build-your-producer-triangle" style={{ color: '#8A8A8E', fontSize: 14 }}>
          Build your producer triangle →
        </Link>
      </div>
      <RabbitHolePanel producerSlug={p.slug} accent={ACCENT} />
    </article>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 12, background: '#111114', borderRadius: 6 }}>
      <p style={{ color: '#6B6B70', fontSize: 10, margin: 0, textTransform: 'uppercase' }}>{label}</p>
      <p style={{ color: '#E8E8EC', fontSize: 12, marginTop: 6, lineHeight: 1.4 }}>{value}</p>
    </div>
  );
}
