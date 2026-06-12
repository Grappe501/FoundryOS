'use client';

import Link from 'next/link';
import { groupConnections, type EntityGraphView, type GraphConfidence } from '@foundry/atlas-graph-engine';
import { SECTION_INTROS } from '../../lib/bourbon-graph/edge-copy';

const ACCENT = 'var(--foundry-primary)';

const CONFIDENCE_COLOR: Record<GraphConfidence, string> = {
  verified: '#6B9B6B',
  producer_disclosed: '#6B9BC9',
  commonly_reported: 'var(--foundry-primary)',
  editorial: '#8A8A8E',
  unknown: '#6B6B70',
};

function ConfidenceBadge({ confidence }: { confidence?: GraphConfidence }) {
  if (!confidence) return null;
  return (
    <span
      style={{
        fontSize: 10,
        padding: '2px 7px',
        borderRadius: 4,
        background: '#111114',
        color: CONFIDENCE_COLOR[confidence],
        border: `1px solid ${CONFIDENCE_COLOR[confidence]}44`,
        marginLeft: 8,
        textTransform: 'lowercase',
      }}
    >
      {confidence.replace(/_/g, ' ')}
    </span>
  );
}

function EdgeLink({ c }: { c: EntityGraphView['connections'][0] }) {
  return (
    <Link
      href={c.href}
      style={{
        display: 'block',
        padding: '12px 14px',
        background: '#0F0F12',
        borderRadius: 6,
        border: '1px solid #1A1A1E',
        textDecoration: 'none',
      }}
    >
      <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {c.title}
        <ConfidenceBadge confidence={c.confidence} />
      </p>
      <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 6, lineHeight: 1.55 }}>{c.teaser}</p>
      {c.source_label && c.confidence === 'verified' && (
        <p style={{ color: '#6B6B70', fontSize: 10, marginTop: 6, marginBottom: 0 }}>Source: {c.source_label}</p>
      )}
    </Link>
  );
}

const SECTION_ORDER = [
  'Producer',
  'Brand family',
  'Known people',
  'Leader slots',
  'Mash style',
  'Terroir disclosure',
  'Legal category',
  'Comparable bottles',
  'Atlas terms',
  'Mysteries',
  'Debates',
  'Collections',
  'Artifacts',
  'Investigations',
  'Missions',
  'Suggested next stop',
  'Rival bottles',
  'Places',
  'Pilgrimages',
  'Lore',
  'Eras & events',
  'Organizations',
  'Bottles',
  'Compare',
  'Graph',
];

function orderedGroups(grouped: Record<string, EntityGraphView['connections']>) {
  const keys = Object.keys(grouped);
  return [
    ...SECTION_ORDER.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !SECTION_ORDER.includes(k)).sort(),
  ];
}

/** PASS-040B2 — Inventory edge → visible rabbit hole hallway */
export function BourbonGraphHallway({ graph, compact }: { graph: EntityGraphView; compact?: boolean }) {
  const grouped = groupConnections(graph.connections);
  const groups = orderedGroups(grouped);

  return (
    <section
      style={{
        marginTop: compact ? 0 : 36,
        padding: 24,
        background: 'linear-gradient(135deg, #0A1218 0%, #111114 100%)',
        border: '1px solid #2A3A4A',
        borderRadius: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ color: '#6B9BC9', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Why this bottle matters
        </p>
        <Link href={`/bourbon/graph/${graph.slug}`} style={{ color: ACCENT, fontSize: 12, textDecoration: 'none' }}>
          Open graph map →
        </Link>
      </div>
      <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12, lineHeight: 1.75 }}>
        {graph.why_should_i_care ?? graph.why_it_matters}
      </p>

      {graph.identities && graph.identities.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {graph.identities.map((id) => (
            <span
              key={id}
              style={{
                padding: '4px 10px',
                fontSize: 11,
                color: ACCENT,
                background: '#1A2530',
                borderRadius: 4,
                border: `1px solid ${ACCENT}33`,
              }}
            >
              {id.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}

      <p style={{ color: '#6B6B70', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '24px 0 0' }}>
        The hallway · {graph.connection_count} connections
      </p>

      {graph.suggested_next && (
        <div style={{ marginTop: 18 }}>
          <p style={{ color: ACCENT, fontSize: 11, margin: '0 0 8px' }}>Suggested next stop</p>
          <EdgeLink c={graph.suggested_next} />
        </div>
      )}

      {groups.map((group) => (
        <div key={group} style={{ marginTop: 24 }}>
          <p style={{ color: '#6B6B70', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
            {group}
          </p>
          {SECTION_INTROS[group] && (
            <p style={{ color: '#8A8A8E', fontSize: 13, lineHeight: 1.65, margin: '0 0 10px' }}>{SECTION_INTROS[group]}</p>
          )}
          <div style={{ display: 'grid', gap: 8 }}>
            {grouped[group].map((c) => (
              <EdgeLink key={c.id} c={c} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/** @deprecated use BourbonGraphHallway */
export function GraphConnectionsPanel({ graph }: { graph: EntityGraphView }) {
  return <BourbonGraphHallway graph={graph} />;
}
