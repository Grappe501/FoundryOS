'use client';

import Link from 'next/link';
import type { GraphConnection } from '@foundry/atlas-graph-engine';
import { BourbonGraphHallway } from './BourbonGraphHallway';
import { inferGraphRef, resolveBourbonGraph, groupConnections } from '../../lib/bourbon-graph';

const ACCENT = '#C8A96E';

export function BourbonGraphExplorer({ slug }: { slug: string }) {
  const ref = inferGraphRef(slug);
  const graph = ref ? resolveBourbonGraph(ref) : null;

  if (!graph) {
    return (
      <main style={{ minHeight: '60vh', padding: '2rem', color: '#E8E8EC' }}>
        <Link href="/bourbon/bottles" style={{ color: '#6B6B70', fontSize: 13 }}>
          ← Bourbon
        </Link>
        <h1 style={{ fontWeight: 300, marginTop: 16 }}>Graph node not found</h1>
        <p style={{ color: '#8A8A8E' }}>No hallway mapped for &quot;{slug}&quot; yet.</p>
      </main>
    );
  }

  const grouped = groupConnections(graph.connections);
  const bottles = graph.connections.filter((c: GraphConnection) => c.entity_type === 'bottle');
  const producers = graph.connections.filter((c: GraphConnection) => c.entity_type === 'producer');
  const people = graph.connections.filter((c: GraphConnection) => c.entity_type === 'person');
  const terms = graph.connections.filter((c: GraphConnection) => c.entity_type === 'atlas_term');
  const collections = graph.connections.filter((c: GraphConnection) => c.entity_type === 'collection');
  const mysteries = graph.connections.filter((c: GraphConnection) => c.entity_type === 'mystery');

  return (
    <main style={{ minHeight: '60vh', padding: '2rem', maxWidth: 820, margin: '0 auto', color: '#E8E8EC' }}>
      <Link href="/bourbon/bottles" style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>
        ← Bourbon
      </Link>
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

      <section style={{ marginTop: 28, padding: 20, background: '#0F1018', borderRadius: 10, border: `1px solid ${ACCENT}33` }}>
        <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Center node</p>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 10, lineHeight: 1.75 }}>
          {graph.why_should_i_care ?? graph.why_it_matters}
        </p>
      </section>

      {['Bottles', 'Producers', 'Known people', 'Atlas terms', 'Collections', 'Mysteries'].map((label) => {
        const key = label.toLowerCase();
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
                <li key={c.id} style={{ marginBottom: 8 }}>
                  <Link href={c.href} style={{ color: '#E8E8EC', fontSize: 14, textDecoration: 'none' }}>
                    {c.title}
                  </Link>
                  <span style={{ color: '#6B6B70', fontSize: 11, marginLeft: 8 }}>{c.confidence ?? 'editorial'}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <div style={{ marginTop: 32 }}>
        <BourbonGraphHallway graph={graph} compact />
      </div>

      <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 24 }}>
        Groups: {Object.keys(grouped).join(' · ')}
      </p>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 12, background: '#111114', borderRadius: 8 }}>
      <p style={{ color: ACCENT, fontSize: 20, margin: 0, fontWeight: 300 }}>{value}</p>
      <p style={{ color: '#6B6B70', fontSize: 10, marginTop: 4 }}>{label}</p>
    </div>
  );
}
