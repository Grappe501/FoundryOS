import type { EntityGraphView } from '@foundry/atlas-graph-engine';
import { listAllBottleGraphs, resolveBourbonGraph } from './resolve-graph';

export type GraphHealthStats = {
  total_nodes: number;
  total_edges: number;
  average_edge_count: number;
  bottle_count: number;
  bib_edge_count: number;
  nodes_missing_why: number;
  nodes_under_3_edges: number;
  nodes_under_10_edges: number;
  edges_missing_confidence: number;
  verified_edges_missing_source: number;
};

export function collectAllGraphNodes(): EntityGraphView[] {
  const bottles = listAllBottleGraphs();
  const bib = resolveBourbonGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });
  const priorityProducers = ['wild-turkey', 'buffalo-trace', 'makers-mark']
    .map((slug) => resolveBourbonGraph({ world_slug: 'bourbon', entity_type: 'producer', slug }))
    .filter(Boolean) as EntityGraphView[];
  return [...bottles, ...(bib ? [bib] : []), ...priorityProducers];
}

export function computeGraphHealthStats(): GraphHealthStats {
  const nodes = collectAllGraphNodes();
  const totalEdges = nodes.reduce((s, n) => s + n.connection_count, 0);
  let edgesMissingConfidence = 0;
  let verifiedMissingSource = 0;

  for (const node of nodes) {
    for (const edge of node.connections) {
      if (!edge.confidence) edgesMissingConfidence++;
      if (edge.confidence === 'verified' && !edge.source_label?.trim()) {
        verifiedMissingSource++;
      }
    }
  }

  const bib = resolveBourbonGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });

  return {
    total_nodes: nodes.length,
    total_edges: totalEdges,
    average_edge_count: nodes.length ? Math.round(totalEdges / nodes.length) : 0,
    bottle_count: listAllBottleGraphs().length,
    bib_edge_count: bib?.connection_count ?? 0,
    nodes_missing_why: nodes.filter((n) => !n.why_should_i_care?.trim()).length,
    nodes_under_3_edges: nodes.filter((n) => n.connection_count < 3).length,
    nodes_under_10_edges: nodes.filter((n) => n.connection_count < 10).length,
    edges_missing_confidence: edgesMissingConfidence,
    verified_edges_missing_source: verifiedMissingSource,
  };
}
