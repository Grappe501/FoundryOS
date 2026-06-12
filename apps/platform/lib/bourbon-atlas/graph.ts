/**
 * PASS-034P.5 — Atlas Phase 2 graph layer (operator/factory — not consumer UI yet)
 * Builds typed relationship edges from Atlas entries + relationship seeds.
 */

import { listAtlasEntries } from './registry';
import { BOURBON_RELATIONSHIP_SEEDS, getRelationshipSeed, type AtlasRelationshipSeed } from './relationship-seeds';
import type { AtlasEntry } from './types';

export type AtlasGraphEdgeKind =
  | 'related_term'
  | 'cousin_idea'
  | 'geography'
  | 'forward_link'
  | 'people'
  | 'place'
  | 'organization'
  | 'event'
  | 'controversy'
  | 'mystery'
  | 'collection'
  | 'object'
  | 'timeline'
  | 'artifact'
  | 'world';

export type AtlasGraphEdge = {
  from: string;
  to: string;
  kind: AtlasGraphEdgeKind;
  label?: string;
};

export type AtlasGraph = {
  world_slug: string;
  nodes: { slug: string; title: string }[];
  edges: AtlasGraphEdge[];
};

function pushEdges(edges: AtlasGraphEdge[], from: string, items: string[] | undefined, kind: AtlasGraphEdgeKind) {
  if (!items) return;
  for (const item of items) {
    edges.push({ from, to: item.toLowerCase().replace(/\s+/g, '-'), kind, label: item });
  }
}

function pushTimelineEdges(edges: AtlasGraphEdge[], from: string, items: AtlasRelationshipSeed['timeline']) {
  if (!items) return;
  for (const item of items) {
    edges.push({
      from,
      to: item.label.toLowerCase().replace(/\s+/g, '-'),
      kind: 'timeline',
      label: item.era ? `${item.label} (${item.era})` : item.label,
    });
  }
}

/** v1 — derive graph from bourbon atlas seeds + Phase 2 relationship seeds */
export function buildBourbonAtlasGraph(): AtlasGraph {
  const entries = listAtlasEntries();
  const nodes = entries.map((e) => ({ slug: e.slug, title: e.title }));
  const edges: AtlasGraphEdge[] = [];

  for (const entry of entries) {
    for (const rel of entry.relatedTerms) {
      const target = entries.find((e) => e.title.toLowerCase() === rel.toLowerCase() || e.slug === rel);
      if (target) {
        edges.push({ from: entry.slug, to: target.slug, kind: 'related_term' });
      }
    }
    for (const cousin of entry.cousinIdeas) {
      edges.push({ from: entry.slug, to: cousin.toLowerCase().replace(/\s+/g, '-'), kind: 'cousin_idea', label: cousin });
    }
    if (entry.geography) {
      edges.push({ from: entry.slug, to: 'geography-root', kind: 'geography', label: entry.geography });
    }
    for (const link of entry.forwardLinks) {
      edges.push({ from: entry.slug, to: link.href, kind: 'forward_link', label: link.label });
    }

    const seed = getRelationshipSeed(entry.slug);
    if (seed) {
      pushEdges(edges, entry.slug, seed.people, 'people');
      pushEdges(edges, entry.slug, seed.places, 'place');
      pushEdges(edges, entry.slug, seed.organizations, 'organization');
      pushEdges(edges, entry.slug, seed.events, 'event');
      pushEdges(edges, entry.slug, seed.controversies, 'controversy');
      pushEdges(edges, entry.slug, seed.mysteries, 'mystery');
      pushEdges(edges, entry.slug, seed.collections, 'collection');
      pushEdges(edges, entry.slug, seed.objects, 'object');
      pushTimelineEdges(edges, entry.slug, seed.timeline);
    }
  }

  for (const seed of BOURBON_RELATIONSHIP_SEEDS) {
    if (!entries.some((e) => e.slug === seed.slug)) {
      nodes.push({ slug: seed.slug, title: seed.slug.replace(/-/g, ' ') });
    }
  }

  return { world_slug: 'bourbon', nodes, edges };
}

export function atlasGraphStats(graph: AtlasGraph) {
  const byKind: Record<string, number> = {};
  for (const e of graph.edges) {
    byKind[e.kind] = (byKind[e.kind] ?? 0) + 1;
  }
  return { nodes: graph.nodes.length, edges: graph.edges.length, byKind };
}

export type AtlasPhase2Schema = Pick<
  AtlasEntry,
  'slug' | 'title' | 'relatedTerms' | 'cousinIdeas' | 'geography' | 'forwardLinks'
> & {
  relatedPeople?: string[];
  relatedPlaces?: string[];
  relatedOrganizations?: string[];
  relatedEvents?: string[];
  relatedControversies?: string[];
  relatedMysteries?: string[];
  relatedCollections?: string[];
  relatedObjects?: string[];
  relatedTimelines?: { label: string; era?: string }[];
  relatedWorlds?: string[];
};
