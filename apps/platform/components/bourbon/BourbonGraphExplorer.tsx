'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { GraphConnection } from '@foundry/atlas-graph-engine';
import { BourbonGraphHallway } from './BourbonGraphHallway';
import { GraphWanderFooter } from './GraphWanderFooter';
import { LinkedParagraph } from './LinkedParagraph';
import {
  inferGraphRef,
  resolveBourbonGraph,
  groupConnections,
  buildWanderFooter,
} from '../../lib/bourbon-graph';
import { enrichGraphNarrative } from '../../lib/bourbon-graph/enrich-narrative';
import { linkifyParagraph } from '../../lib/bourbon-graph/inline-links';
import { AskTheAtlasPanel } from './AskTheAtlasPanel';
import { GraphReviewsPanel } from '../reviews/GraphReviewsPanel';
import { GraphRecommendationsPanel } from '../recommendations/GraphRecommendationsPanel';
import { recordGraphView, recordSavedRabbitHole } from '../../lib/world-memory/memory-store';
import { resolveConnectionHref } from '../../lib/bourbon-graph/connection-href';

const ACCENT = 'var(--foundry-primary)';

export function BourbonGraphExplorer({ slug }: { slug: string }) {
  const ref = inferGraphRef(slug);
  const graph = ref ? resolveBourbonGraph(ref) : null;
  const [savedHole, setSavedHole] = useState(false);

  useEffect(() => {
    if (graph) {
      recordGraphView('bourbon', slug, graph.title);
    }
  }, [slug, graph?.title]);

  if (!graph) {
    const atlasEntry = inferGraphRef(slug)?.entity_type === 'atlas_term';
    return (
      <main style={{ minHeight: '60vh', padding: '2rem', color: 'var(--foundry-text)' }}>
        <Link href="/bourbon/bottles" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
          ← Bourbon
        </Link>
        {atlasEntry && (
          <Link href={`/bourbon/atlas/${slug}`} style={{ color: ACCENT, fontSize: 13, marginLeft: 16 }}>
            Atlas entry →
          </Link>
        )}
        <h1 style={{ fontWeight: 300, marginTop: 16 }}>Graph node not found</h1>
        <p style={{ color: 'var(--foundry-text-muted)' }}>No hallway mapped for &quot;{slug}&quot; yet.</p>
      </main>
    );
  }

  const grouped = groupConnections(graph.connections);
  const wander = buildWanderFooter(graph);
  const narrative = enrichGraphNarrative(graph);
  const bottles = graph.connections.filter((c: GraphConnection) => c.entity_type === 'bottle');
  const producers = graph.connections.filter((c: GraphConnection) => c.entity_type === 'producer' || c.entity_type === 'organization');
  const people = graph.connections.filter((c: GraphConnection) => c.entity_type === 'person');
  const terms = graph.connections.filter((c: GraphConnection) => c.entity_type === 'atlas_term');
  const collections = graph.connections.filter((c: GraphConnection) => c.entity_type === 'collection');
  const mysteries = graph.connections.filter((c: GraphConnection) => c.entity_type === 'mystery');

  return (
    <main style={{ minHeight: '60vh', padding: '2rem', maxWidth: 820, margin: '0 auto', color: 'var(--foundry-text)' }}>
      <Link href="/bourbon/bottles" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, textDecoration: 'none' }}>
        ← Bourbon
      </Link>
      {graph.entity_type === 'bottle' && (
        <Link href={`/bourbon/bottles/${slug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16, textDecoration: 'none' }}>
          Bottle page →
        </Link>
      )}
      {graph.entity_type === 'atlas_term' && (
        <Link href={`/bourbon/atlas/${slug}`} style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16, textDecoration: 'none' }}>
          Atlas entry →
        </Link>
      )}
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 20 }}>
        Graph hallway · {graph.entity_type.replace(/_/g, ' ')}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{graph.title}</h1>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        <Stat label="Total edges" value={graph.connection_count} />
        <Stat label="Bottles" value={bottles.length} />
        <Stat label="People" value={people.length} />
        <Stat label="Atlas terms" value={terms.length} />
        <Stat label="Collections" value={collections.length} />
        <Stat label="Mysteries" value={mysteries.length} />
      </div>

      <AskTheAtlasPanel slug={slug} graphTitle={graph.title} />

      <GraphReviewsPanel
        worldSlug="bourbon"
        entityType={graph.entity_type}
        slug={slug}
        graphTitle={graph.title}
        relatedBottleSlug={graph.entity_type === 'bottle' ? slug : bottles[0]?.slug}
        relatedBottleName={graph.entity_type === 'bottle' ? graph.title : bottles[0]?.title}
      />

      <GraphRecommendationsPanel
        worldSlug="bourbon"
        entityType={graph.entity_type}
        slug={slug}
        graphTitle={graph.title}
        relatedBottleSlug={graph.entity_type === 'bottle' ? slug : bottles[0]?.slug}
        relatedBottleName={graph.entity_type === 'bottle' ? graph.title : bottles[0]?.title}
      />

      <section style={{ marginTop: 28, padding: 20, background: '#0F1018', borderRadius: 10, border: `1px solid ${ACCENT}33` }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>Why this matters · click to wander</p>
        <div style={{ marginTop: 10 }}>
          <LinkedParagraph segments={narrative} style={{ color: 'var(--foundry-text)', fontSize: 15 }} />
        </div>
      </section>

      <button
        type="button"
        onClick={() => {
          recordSavedRabbitHole('bourbon', slug, graph.title);
          setSavedHole(true);
          setTimeout(() => setSavedHole(false), 2500);
        }}
        style={{
          marginTop: 16,
          padding: '8px 14px',
          background: savedHole ? 'var(--foundry-success-bg-subtle)' : 'var(--foundry-surface-raised)',
          border: `1px solid ${savedHole ? 'var(--foundry-success)' : ACCENT}44`,
          borderRadius: 6,
          color: savedHole ? 'var(--foundry-success)' : ACCENT,
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        {savedHole ? 'Rabbit hole saved — Foundry will remember' : 'Save this rabbit hole'}
      </button>

      {['Bottles', 'Producers', 'Known people', 'Atlas terms', 'Collections', 'Mysteries'].map((label) => {
        const items =
          label === 'Bottles'
            ? bottles
            : label === 'Producers'
              ? producers
              : label === 'Known people'
                ? people
                : label === 'Atlas terms'
                  ? terms
                  : label === 'Collections'
                    ? collections
                    : mysteries;
        if (!items.length) return null;
        return (
          <section key={label} style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 14, color: '#6B9BC9', fontWeight: 400 }}>{label}</h2>
            <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none' }}>
              {items.map((c: GraphConnection) => (
                <li key={c.id} style={{ marginBottom: 10 }}>
                  <Link href={resolveConnectionHref(c)} style={{ color: 'var(--foundry-text)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>
                    {c.title} →
                  </Link>
                  <div style={{ marginTop: 4 }}>
                    <LinkedParagraph
                      segments={linkifyParagraph(c.teaser, { preferGraph: true })}
                      style={{ color: 'var(--foundry-text-muted)', fontSize: 12 }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <GraphWanderFooter {...wander} />

      <div style={{ marginTop: 32 }}>
        <BourbonGraphHallway graph={graph} compact linkifyTeasers />
      </div>

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 24 }}>
        Groups: {Object.keys(grouped).join(' · ')}
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 12, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
      <p style={{ color: ACCENT, fontSize: 20, margin: 0, fontWeight: 300 }}>{value}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 10, marginTop: 4 }}>{label}</p>
    </div>
  );
}
