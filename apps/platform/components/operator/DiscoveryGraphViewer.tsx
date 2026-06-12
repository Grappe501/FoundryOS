'use client';

import { useMemo, useState } from 'react';
import {
  ALL_CONSEQUENCE_CHAINS,
  LIVE_WORLDS_WITH_CONSEQUENCES,
  buildDiscoveryGraph,
  effectKindLabel,
  type ConsequenceChain,
  type ConsequenceNode,
} from '@foundry/consequence-engine';

const KIND_COLORS: Record<string, string> = {
  action: 'var(--foundry-text)',
  unlock_debate: '#9B6B9B',
  unlock_legendary_object: 'var(--foundry-primary)',
  unlock_collector_progress: 'var(--foundry-success)',
  unlock_rabbit_hole: '#6B8EBD',
  mentor_memory: '#BD8E6B',
  unlock_path: '#8E6BBD',
  unlock_collection: '#6BBD9B',
  identity_signal: '#BD6B8E',
  world_event_unlock: '#6B9BBD',
};

function ChainGraph({ chain }: { chain: ConsequenceChain }) {
  const ordered = useMemo(() => topologicalOrder(chain), [chain]);

  return (
    <article style={{ marginTop: 24, padding: 20, background: 'var(--foundry-surface)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)' }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0, color: 'var(--foundry-text)' }}>{chain.title}</h3>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>
        {chain.trigger.world_slug} · {chain.trigger.action_type} · {chain.trigger.action_id}
      </p>
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {ordered.map((node, i) => (
          <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <NodeCard node={node} />
            {i < ordered.length - 1 && (
              <div style={{ color: 'var(--foundry-text-dim)', fontSize: 18, lineHeight: 1, padding: '6px 0' }}>↓</div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function NodeCard({ node }: { node: ConsequenceNode }) {
  const color = KIND_COLORS[node.kind] ?? 'var(--foundry-text-faint)';
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        padding: '14px 16px',
        background: node.kind === 'action' ? 'var(--foundry-border-subtle)' : 'var(--foundry-surface-raised)',
        borderRadius: 8,
        border: `1px solid ${node.kind === 'action' ? '#3A3A3E' : color}44`,
        borderLeft: `4px solid ${color}`,
      }}
    >
      <span style={{ color, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{effectKindLabel(node.kind)}</span>
      <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: '6px 0 0', fontWeight: node.kind === 'action' ? 600 : 400 }}>{node.label}</p>
      {node.description && <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 4 }}>{node.description}</p>}
      {node.href && <p style={{ color: '#6B8EBD', fontSize: 11, marginTop: 6 }}>{node.href}</p>}
    </div>
  );
}

function topologicalOrder(chain: ConsequenceChain): ConsequenceNode[] {
  const action = chain.nodes.find((n) => n.kind === 'action');
  if (!action) return chain.nodes;

  const result: ConsequenceNode[] = [action];
  let current = action.id;
  const visited = new Set([current]);

  while (result.length < chain.nodes.length) {
    const edge = chain.edges.find((e) => e.from === current);
    if (!edge) break;
    const next = chain.nodes.find((n) => n.id === edge.to);
    if (!next || visited.has(next.id)) break;
    result.push(next);
    visited.add(next.id);
    current = next.id;
  }

  return result;
}

export function DiscoveryGraphViewer() {
  const [world, setWorld] = useState<string>('all');

  const chains = useMemo(() => {
    if (world === 'all') return ALL_CONSEQUENCE_CHAINS;
    return ALL_CONSEQUENCE_CHAINS.filter((c) => c.trigger.world_slug === world);
  }, [world]);

  const graph = useMemo(() => buildDiscoveryGraph(world === 'all' ? undefined : world), [world]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
        {['all', ...LIVE_WORLDS_WITH_CONSEQUENCES].map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWorld(w)}
            style={{
              padding: '8px 14px',
              borderRadius: 6,
              border: '1px solid',
              borderColor: world === w ? '#8E6BBD' : 'var(--foundry-border)',
              background: world === w ? '#1A1420' : 'transparent',
              color: world === w ? '#C8A0E8' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {w === 'all' ? 'All worlds' : w}
          </button>
        ))}
      </div>

      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 16 }}>
        {graph.chains.length} chains · {graph.nodes.length} nodes · {graph.edges.length} edges
      </p>

      <section style={{ marginTop: 8, padding: 16, background: '#0A0A0C', borderRadius: 8, border: '1px dashed var(--foundry-border)' }}>
        <p style={{ color: '#8E6BBD', fontSize: 12, margin: 0 }}>
          Map for building worlds — every trigger should chain: action → world change → identity → opportunity
        </p>
      </section>

      {chains.map((chain) => (
        <ChainGraph key={chain.id} chain={chain} />
      ))}
    </div>
  );
}
