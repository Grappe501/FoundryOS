'use client';

import { BourbonDeepToolCard } from '../BourbonDeepToolCard';
import type { Level1Tool } from '../../../lib/bourbon-level-1/hub';
import { LEVEL_1_TOOLS } from '../../../lib/bourbon-level-1/hub';

const INTELLIGENCE_SLUGS = ['watchtower', 'rabbit-hole', 'hunt', 'shelf-intel', 'chains'];
const AGENCY_SLUGS = [
  'detective', 'x-ray', 'compare', 'shelf-psych', 'personalities', 'store-picks', 'economy',
  'campus', 'flavor-wheel', 'league', 'trail-planner', 'bottles-db',
];

function toolsBySlug(slugs: string[]): Level1Tool[] {
  return slugs.map((s) => LEVEL_1_TOOLS.find((t) => t.slug === s)).filter(Boolean) as Level1Tool[];
}

export function InvestigateHub({ toolsOnly = false }: { toolsOnly?: boolean }) {
  const intelligence = toolsBySlug(INTELLIGENCE_SLUGS);
  const agency = toolsBySlug(AGENCY_SLUGS);

  return (
    <div>
      {!toolsOnly && (
        <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7, maxWidth: 640, marginTop: 0 }}>
          Tools below assume you read the narrative above — each card explains why it exists, not just what it does.
        </p>
      )}

      <section style={{ marginTop: toolsOnly ? 0 : 28 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
          Living intelligence
        </h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {intelligence.map((t) => (
            <BourbonDeepToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
          Investigate
        </h2>
        <div style={{ marginTop: 14, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {agency.map((t) => (
            <BourbonDeepToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
