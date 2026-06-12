import type {
  AtlasHealthRow,
  BuildQueueItem,
  GraphNodeCoverage,
  HeatmapLayer,
  KnowledgeGravityNode,
  WorldLayerScores,
} from './types';
import { HEATMAP_LAYERS } from './types';

const WEAK_CONNECTION_THRESHOLD = 10;

export function markWeakNodes(nodes: GraphNodeCoverage[]): GraphNodeCoverage[] {
  return nodes.map((n) => ({ ...n, weak: n.connections < WEAK_CONNECTION_THRESHOLD }));
}

export function computeGraphDensityAvg(nodes: GraphNodeCoverage[]): number {
  if (nodes.length === 0) return 0;
  return Math.round(nodes.reduce((s, n) => s + n.connections, 0) / nodes.length);
}

export function computeWorldOverallScore(layers: Record<HeatmapLayer, number>): number {
  const vals = HEATMAP_LAYERS.map((l) => layers[l]);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function rankKnowledgeGravity(
  nodes: { slug: string; title: string; connections: number; world_slug: string }[],
  limit = 10,
): KnowledgeGravityNode[] {
  return [...nodes].sort((a, b) => b.connections - a.connections).slice(0, limit);
}

export function summarizeAtlasHealth(rows: AtlasHealthRow[]) {
  const n = rows.length || 1;
  const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.connections, 0) / rows.length) : 0;
  return {
    entries: rows.length,
    avg_connections: avg,
    missing_why_care: rows.filter((r) => r.missing_why_care).length,
    missing_geography: rows.filter((r) => r.missing_geography).length,
    missing_debate: rows.filter((r) => r.missing_debate).length,
    missing_mystery: rows.filter((r) => r.missing_mystery).length,
    missing_collection: rows.filter((r) => r.missing_collection).length,
    missing_artifact: rows.filter((r) => r.missing_artifact).length,
  };
}

export type IncomingWorldInput = {
  slug: string;
  name: string;
  score: number;
  status: string;
  note: string;
  links_to_worlds?: string[];
  factory_reuse_pct?: number;
  atlas_estimate?: number;
  lesson_estimate?: number;
  mission_estimate?: number;
};

export function computeBuildQueue(input: {
  weak_graph_nodes: GraphNodeCoverage[];
  world_scores: WorldLayerScores[];
  incoming_worlds: IncomingWorldInput[];
  atlas_gaps: { label: string; count: number }[];
}): BuildQueueItem[] {
  const items: BuildQueueItem[] = [];

  for (const node of input.weak_graph_nodes.filter((n) => n.weak).slice(0, 5)) {
    items.push({
      rank: 0,
      target: node.label,
      target_type: 'graph_node',
      score: 100 - node.connections * 5,
      reasons: [`Only ${node.connections} connections (target ${WEAK_CONNECTION_THRESHOLD}+)`, 'Graph density is the depth moat'],
    });
  }

  for (const world of input.world_scores.filter((w) => w.overallScore < 75)) {
    const weakLayers = (Object.entries(world.layers) as [HeatmapLayer, number][])
      .filter(([, v]) => v < 50)
      .map(([k]) => k);
    if (weakLayers.length) {
      items.push({
        rank: 0,
        target: world.displayName,
        target_type: 'layer',
        world_slug: world.slug,
        score: 100 - world.overallScore,
        reasons: weakLayers.map((l) => `${l} at ${world.layers[l]}%`),
      });
    }
  }

  for (const gap of input.atlas_gaps.filter((g) => g.count > 0).slice(0, 3)) {
    items.push({
      rank: 0,
      target: gap.label,
      target_type: 'atlas_gap',
      score: Math.min(95, 40 + gap.count),
      reasons: [`${gap.count} entries missing this field`, 'Atlas quality gate'],
    });
  }

  for (const w of input.incoming_worlds.filter((i) => i.status === 'queued').slice(0, 3)) {
    const reasons: string[] = [];
    if (w.links_to_worlds?.length) reasons.push(`Links to ${w.links_to_worlds.length} existing worlds`);
    if (w.factory_reuse_pct) reasons.push(`Factory reuse ~${w.factory_reuse_pct}%`);
    if (w.atlas_estimate) reasons.push(`Atlas estimate: ${w.atlas_estimate} entries`);
    reasons.push(`Pipeline score: ${w.score}`);
    items.push({
      rank: 0,
      target: w.name,
      target_type: 'world',
      world_slug: w.slug,
      score: w.score,
      reasons,
      estimated_hours: (w.atlas_estimate ?? 100) + (w.lesson_estimate ?? 50) + (w.mission_estimate ?? 25),
    });
  }

  return items
    .sort((a, b) => b.score - a.score)
    .map((item, i) => ({ ...item, rank: i + 1 }));
}

export function pickHighestRoiWorld(queue: BuildQueueItem[]): BuildQueueItem | null {
  return queue.find((q) => q.target_type === 'world') ?? queue[0] ?? null;
}
