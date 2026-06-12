/** Assemble identity signal bundles from client state (localStorage v1) */

import type { IdentitySignalBundle } from '@foundry/identity-narrative-engine';
import { ALL_CONSEQUENCE_CHAINS } from '@foundry/consequence-engine';
import { ACTIVE_WORLDS } from '../living-worlds/active-worlds';
import { buildLivingJourneySnapshot } from '../living-worlds/client-journey';
import { getWorldCollections } from '../collector/client-state';
import { getWorldEventsState } from '../world-events/client-state';
import { getLocalUserId, listClientArtifacts } from '../artifacts/client-store';

const CONSEQUENCE_KEY = 'foundry-consequence-state';

function readConsequenceNodeIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem(CONSEQUENCE_KEY) ?? 'null');
    return raw?.appliedNodes ? Object.keys(raw.appliedNodes) : [];
  } catch {
    return [];
  }
}

function labelsForNodes(nodeIds: string[], worldSlug: string): string[] {
  const labels: string[] = [];
  for (const chain of ALL_CONSEQUENCE_CHAINS) {
    if (chain.trigger.world_slug !== worldSlug) continue;
    for (const node of chain.nodes) {
      if (nodeIds.includes(node.id)) labels.push(node.label);
    }
  }
  return labels;
}

function nodeIdsForWorld(allIds: string[], worldSlug: string): string[] {
  const worldNodeIds = new Set<string>();
  for (const chain of ALL_CONSEQUENCE_CHAINS) {
    if (chain.trigger.world_slug !== worldSlug) continue;
    for (const node of chain.nodes) {
      if (allIds.includes(node.id)) worldNodeIds.add(node.id);
    }
  }
  return [...worldNodeIds];
}

function readPortfolio(key: string): { missionTitle: string; reflection: string }[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
}

export function assembleSignalBundle(worldSlug: string): IdentitySignalBundle {
  const world = ACTIVE_WORLDS.find((w) => w.slug === worldSlug);
  const portfolio = world ? readPortfolio(world.portfolioKey) : [];
  const allNodes = readConsequenceNodeIds();
  const worldNodes = nodeIdsForWorld(allNodes, worldSlug);
  const collections = getWorldCollections(worldSlug);
  const events = getWorldEventsState();
  const artifacts = listClientArtifacts({ user_id: getLocalUserId(), world_slug: worldSlug });

  const worldEventIds = (id: string) => id.startsWith(worldSlug) || id.includes(worldSlug.replace('-', ''));

  return {
    world_slug: worldSlug,
    missions_completed: portfolio.length,
    mission_titles: portfolio.map((m) => m.missionTitle),
    reflections: portfolio.map((m) => m.reflection).filter(Boolean),
    consequence_node_ids: worldNodes,
    consequence_labels: labelsForNodes(worldNodes, worldSlug),
    active_collections: collections.map((c) => ({
      id: c.definition.id,
      title: c.definition.title,
      unlocked: c.unlocked_count,
      total: c.total_count,
    })),
    completed_collection_ids: collections.filter((c) => c.completed).map((c) => c.definition.id),
    events_voted: Object.keys(events.votes).filter(worldEventIds),
    events_completed: events.completed.filter(worldEventIds),
    events_saved: events.saved.filter(worldEventIds),
    debate_topics: Object.keys(events.debate_choices).filter(worldEventIds),
    journal_entries: world?.legendaryStorageKey
      ? (() => {
          try {
            return JSON.parse(localStorage.getItem(world.legendaryStorageKey!) ?? '[]').length;
          } catch {
            return 0;
          }
        })()
      : 0,
    artifact_count: artifacts.length,
    recent_artifact_titles: artifacts.slice(0, 5).map((a) => a.metadata.title),
    recent_artifact_types: artifacts.slice(0, 5).map((a) => a.type),
  };
}

export function assembleAllSignalBundles(): IdentitySignalBundle[] {
  return ACTIVE_WORLDS.map((w) => assembleSignalBundle(w.slug));
}

export function assembleFromJourney(displayName?: string) {
  const snapshot = buildLivingJourneySnapshot(displayName);
  const bundles = assembleAllSignalBundles();
  return { snapshot, bundles };
}
