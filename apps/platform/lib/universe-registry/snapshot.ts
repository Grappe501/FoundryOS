/**
 * PASS-034U — Universe snapshot from live registries (read-only, no fiction)
 */

import { resolveEntityGraph } from '@foundry/atlas-graph-engine';
import { getArtifactEngineStats } from '@foundry/artifact-engine';
import { COLLECTION_DEFINITIONS, collectionsForWorld } from '@foundry/collector-engine';
import { LIVE_EVENT_WORLDS } from '@foundry/world-events-engine';
import { LIVE_NARRATIVE_WORLDS } from '@foundry/identity-narrative-engine';
import type {
  AtlasHealthRow,
  GraphNodeCoverage,
  HeatmapLayer,
  UniverseSnapshot,
  WorldLayerScores,
} from '@foundry/universe-registry';
import {
  HEATMAP_LAYERS,
  computeBuildQueue,
  computeGraphDensityAvg,
  computeWorldOverallScore,
  markWeakNodes,
  pickHighestRoiWorld,
  rankKnowledgeGravity,
  summarizeAtlasHealth,
} from '@foundry/universe-registry';

import { buildBourbonAtlasGraph } from '../bourbon-atlas/graph';
import { listAtlasEntries } from '../bourbon-atlas/registry';
import { BOURBON_RELATIONSHIP_SEEDS } from '../bourbon-atlas/relationship-seeds';
import { BOURBON_BOTTLES } from '../bourbon-level-1/bottles';
import { countLeaderSlots } from '../entity-slots/leaders';
import { INCOMING_WORLDS } from '../incoming-worlds';
import { auditAllWorldDepth } from '../world-depth/audit';
import { ACTIVE_WORLD_SLUGS } from '../world-depth/registry';
import { BOURBON_PRODUCERS } from '../world-depth/bourbon-producers';
import { auditAllWorldExperiences } from '../world-experience/audit';

function pct(actual: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((actual / target) * 100));
}

function collectUniqueFromSeeds(field: keyof (typeof BOURBON_RELATIONSHIP_SEEDS)[0]): string[] {
  const set = new Set<string>();
  for (const seed of BOURBON_RELATIONSHIP_SEEDS) {
    const items = seed[field] as string[] | undefined;
    if (items) for (const item of items) set.add(item);
  }
  return [...set];
}

function getGraphCoverage(): GraphNodeCoverage[] {
  const nodes: GraphNodeCoverage[] = [];

  for (const bottle of BOURBON_BOTTLES) {
    const graph = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'bottle', slug: bottle.slug });
    nodes.push({
      id: `bottle:${bottle.slug}`,
      label: bottle.name,
      entity_type: 'bottle',
      connections: graph?.connection_count ?? 0,
      weak: false,
    });
  }

  const bib = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });
  nodes.push({
    id: 'atlas_term:bottled-in-bond',
    label: 'Bottled in Bond',
    entity_type: 'atlas_term',
    connections: bib?.connection_count ?? 0,
    weak: false,
  });

  return markWeakNodes(nodes);
}

function getAtlasHealthRows(): AtlasHealthRow[] {
  const graph = buildBourbonAtlasGraph();
  const edgeCountBySlug = new Map<string, number>();
  for (const e of graph.edges) {
    edgeCountBySlug.set(e.from, (edgeCountBySlug.get(e.from) ?? 0) + 1);
  }

  const seedBySlug = new Map(BOURBON_RELATIONSHIP_SEEDS.map((s) => [s.slug, s]));

  return listAtlasEntries().map((entry) => {
    const seed = seedBySlug.get(entry.slug);
    const connections = edgeCountBySlug.get(entry.slug) ?? entry.relatedTerms.length;
    return {
      slug: entry.slug,
      title: entry.title,
      connections,
      missing_why_care: !entry.whyItMatters?.trim(),
      missing_geography: !entry.geography?.trim(),
      missing_debate: !seed?.controversies?.length,
      missing_mystery: !seed?.mysteries?.length,
      missing_collection: !seed?.collections?.length,
      missing_artifact: !seed?.objects?.length,
    };
  });
}

function getKnowledgeGravity() {
  const graph = buildBourbonAtlasGraph();
  const counts = new Map<string, { title: string; connections: number }>();
  for (const n of graph.nodes) {
    counts.set(n.slug, { title: n.title, connections: 0 });
  }
  for (const e of graph.edges) {
    const c = counts.get(e.from);
    if (c) c.connections += 1;
  }
  return rankKnowledgeGravity(
    [...counts.entries()].map(([slug, v]) => ({
      slug,
      title: v.title,
      connections: v.connections,
      world_slug: 'bourbon',
    })),
    10,
  );
}

function getWorldLayerScores(): WorldLayerScores[] {
  const depthRows = auditAllWorldDepth();
  const expRows = auditAllWorldExperiences();

  return ACTIVE_WORLD_SLUGS.map((slug) => {
    const depth = depthRows.find((r) => r.slug === slug);
    const exp = expRows.find((r) => r.slug === slug);
    const collections = collectionsForWorld(slug).length;
    const hasEvents = LIVE_EVENT_WORLDS.includes(slug as (typeof LIVE_EVENT_WORLDS)[number]);
    const hasIdentity = LIVE_NARRATIVE_WORLDS.includes(slug as (typeof LIVE_NARRATIVE_WORLDS)[number]);

    const atlasPct =
      slug === 'bourbon'
        ? pct(listAtlasEntries().length, 100)
        : pct(depth?.glossaryTerms ?? 0, 50);

    const layers: Record<HeatmapLayer, number> = {
      Atlas: atlasPct,
      Academy: pct(depth?.academyLessons ?? 0, 35),
      Missions: pct(depth?.missions ?? 0, 5),
      Experiences: exp?.totalScore ?? 0,
      Community: depth?.communityReady ? 100 : 50,
      Collections: pct(collections, 5),
      Events: hasEvents ? 100 : 0,
      Identity: hasIdentity ? 100 : 0,
      Memory: hasIdentity ? 85 : 40,
      Marketing: depth?.status === 'READY' ? 90 : 60,
      Revenue: 25,
    };

    return {
      slug,
      displayName: depth?.displayName ?? slug,
      layers,
      overallScore: computeWorldOverallScore(layers),
    };
  });
}

export function getAllGraphNodes(): GraphNodeCoverage[] {
  return getGraphCoverage();
}

export function getUniverseSnapshot(): UniverseSnapshot {
  const graphNodes = getGraphCoverage();
  const atlasRows = getAtlasHealthRows();
  const worldScores = getWorldLayerScores();
  const leaders = countLeaderSlots('bourbon');
  const artifactStats = getArtifactEngineStats();

  const incomingInput = INCOMING_WORLDS.map((w) => ({
    slug: w.slug,
    name: w.name,
    score: w.score,
    status: w.status,
    note: w.note,
    links_to_worlds:
      w.slug === 'entrepreneur' ? ['ai-builder', 'financial-independence', 'public-speaking', 'civic-engagement'] : undefined,
    factory_reuse_pct: w.slug === 'entrepreneur' ? 88 : 70,
    atlas_estimate: w.slug === 'entrepreneur' ? 220 : 120,
    lesson_estimate: w.slug === 'entrepreneur' ? 100 : 60,
    mission_estimate: w.slug === 'entrepreneur' ? 50 : 30,
  }));

  const buildQueue = computeBuildQueue({
    weak_graph_nodes: graphNodes,
    world_scores: worldScores,
    incoming_worlds: incomingInput,
    atlas_gaps: [
      { label: 'Why should I care?', count: atlasRows.filter((r) => r.missing_why_care).length },
      { label: 'Graph connections (10+)', count: graphNodes.filter((n) => n.weak).length },
      { label: 'Debate links', count: atlasRows.filter((r) => r.missing_debate).length },
    ],
  });

  return {
    generated_at: new Date().toISOString(),
    knowledge: {
      worlds: ACTIVE_WORLD_SLUGS.length,
      atlas_entries: listAtlasEntries().length,
      bottles: BOURBON_BOTTLES.length,
      producers: BOURBON_PRODUCERS.length,
      leader_slots: leaders.slots,
      verified_profiles: leaders.verified,
      places: collectUniqueFromSeeds('places').length,
      organizations: collectUniqueFromSeeds('organizations').length,
      debates: collectUniqueFromSeeds('controversies').length,
      mysteries: collectUniqueFromSeeds('mysteries').length,
      collections: COLLECTION_DEFINITIONS.length,
      artifacts: artifactStats.user_artifacts,
      reviews: 0,
    },
    graph_density_avg: computeGraphDensityAvg(graphNodes),
    graph_weak_nodes: graphNodes.filter((n) => n.weak),
    world_scores: worldScores.sort((a, b) => b.overallScore - a.overallScore),
    build_queue: buildQueue,
    atlas_health_summary: summarizeAtlasHealth(atlasRows),
    knowledge_gravity: getKnowledgeGravity(),
    highest_roi_world: pickHighestRoiWorld(buildQueue),
    artifact_metrics: {
      user_artifacts: artifactStats.user_artifacts,
      artifact_types_defined: artifactStats.artifact_types_defined,
      engine_ready: artifactStats.engine_ready,
      north_star_label: 'User artifacts — evidence the ecosystem is alive',
    },
  };
}

export { HEATMAP_LAYERS };
