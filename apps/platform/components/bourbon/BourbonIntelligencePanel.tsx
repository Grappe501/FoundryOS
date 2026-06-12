'use client';

import Link from 'next/link';
import { bottleChain, getBottleRecord, getProducerRecord, peopleForProducer } from '../../lib/bourbon-intelligence';

const ACCENT = '#C8A96E';

function ConfidenceBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        padding: '2px 6px',
        borderRadius: 4,
        background: '#1A1A1E',
        color: '#6B6B70',
        marginLeft: 6,
      }}
    >
      {label}
    </span>
  );
}

/** Sourced catalog facts from intelligence registry — not editorial depth copy */
export function BourbonIntelligencePanel({ slug }: { slug: string }) {
  const bottle = getBottleRecord(slug);
  if (!bottle) return null;

  const producer = getProducerRecord(bottle.producer_slug);
  const people = peopleForProducer(bottle.producer_slug).filter((p) => p.profile_publishable);
  const edges = bottleChain(slug).slice(0, 8);

  return (
    <section
      style={{
        marginTop: 24,
        padding: 20,
        background: '#0F1018',
        borderRadius: 10,
        border: '1px solid #1A2530',
      }}
    >
      <p style={{ color: ACCENT, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Intelligence registry
      </p>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 10, lineHeight: 1.7 }}>
        Catalog facts with source confidence — grain percentages shown only when disclosed.
      </p>

      <div style={{ marginTop: 16, fontSize: 13, lineHeight: 2 }}>
        <p style={{ margin: 0, color: '#E8E8EC' }}>
          Category: {bottle.category.replace(/_/g, ' ')}
          <ConfidenceBadge label="verified legal class" />
        </p>
        <p style={{ margin: 0, color: '#E8E8EC' }}>
          Proof: {bottle.proof.value}
          <ConfidenceBadge label={bottle.proof.confidence} />
        </p>
        <p style={{ margin: 0, color: '#E8E8EC' }}>
          Mash style: {bottle.mashbill_style.value}
          <ConfidenceBadge label={bottle.mashbill_style.confidence} />
        </p>
        {bottle.mash_bill_slug && (
          <p style={{ margin: 0, color: '#8A8A8E' }}>
            Mash bill record: {bottle.mash_bill_slug} · grain %: not publicly disclosed
          </p>
        )}
        {producer && (
          <p style={{ margin: '8px 0 0', color: '#8A8A8E' }}>
            Producer:{' '}
            <Link href={`/bourbon/producers/${producer.slug}`} style={{ color: ACCENT, textDecoration: 'none' }}>
              {producer.name.value}
            </Link>
            {producer.dsp_code && (
              <>
                {' '}
                · DSP {producer.dsp_code.value}
                <ConfidenceBadge label={producer.dsp_code.confidence} />
              </>
            )}
          </p>
        )}
        {people.length > 0 && (
          <p style={{ margin: '8px 0 0', color: '#8A8A8E' }}>
            Verified roles:{' '}
            {people.map((p) => (
              <span key={p.slug} style={{ color: '#E8E8EC' }}>
                {p.name.value} ({p.roles[0]?.role.replace(/_/g, ' ')})
              </span>
            ))}
          </p>
        )}
      </div>

      {edges.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Graph chain (sample)</p>
          <ul style={{ margin: '8px 0 0', paddingLeft: 18, color: '#8A8A8E', fontSize: 12, lineHeight: 1.8 }}>
            {edges.map((e) => (
              <li key={e.id}>
                {e.relation} → {e.to.entity_type}:{e.to.slug}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link href="/operator/bourbon/inventory" style={{ display: 'inline-block', marginTop: 14, color: '#6B6B70', fontSize: 11 }}>
        Operator inventory →
      </Link>
    </section>
  );
}
