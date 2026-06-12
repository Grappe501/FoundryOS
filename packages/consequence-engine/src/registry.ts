import type { ConsequenceChain, ConsequenceTrigger, DiscoveryGraph } from './types';
import { BOURBON_DETECTIVE_CHAINS } from './worlds/bourbon';
import { AI_BUILDER_CHAINS } from './worlds/ai-builder';
import { PUBLIC_SPEAKING_CHAINS } from './worlds/public-speaking';
import { CIVIC_CHAINS } from './worlds/civic-engagement';
import { WORLD_EVENT_CONSEQUENCE_CHAINS } from './worlds/world-events';

export const ALL_CONSEQUENCE_CHAINS: ConsequenceChain[] = [
  ...BOURBON_DETECTIVE_CHAINS,
  ...AI_BUILDER_CHAINS,
  ...PUBLIC_SPEAKING_CHAINS,
  ...CIVIC_CHAINS,
  ...WORLD_EVENT_CONSEQUENCE_CHAINS,
];

export function getConsequenceChain(id: string): ConsequenceChain | undefined {
  return ALL_CONSEQUENCE_CHAINS.find((c) => c.id === id);
}

export function findChainForTrigger(trigger: ConsequenceTrigger): ConsequenceChain | undefined {
  return ALL_CONSEQUENCE_CHAINS.find(
    (c) =>
      c.trigger.world_slug === trigger.world_slug &&
      c.trigger.action_type === trigger.action_type &&
      c.trigger.action_id === trigger.action_id,
  );
}

export function chainsForWorld(worldSlug: string): ConsequenceChain[] {
  return ALL_CONSEQUENCE_CHAINS.filter((c) => c.trigger.world_slug === worldSlug);
}

export function buildDiscoveryGraph(worldSlug?: string): DiscoveryGraph {
  const chains = worldSlug ? chainsForWorld(worldSlug) : ALL_CONSEQUENCE_CHAINS;
  const nodeMap = new Map<string, ConsequenceChain['nodes'][0]>();
  const edgeSet = new Set<string>();
  const edges: DiscoveryGraph['edges'] = [];

  for (const chain of chains) {
    for (const node of chain.nodes) {
      nodeMap.set(node.id, node);
    }
    for (const edge of chain.edges) {
      const key = `${edge.from}→${edge.to}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push(edge);
      }
    }
  }

  return {
    world_slug: worldSlug ?? 'all',
    chains,
    nodes: [...nodeMap.values()],
    edges,
  };
}

export const LIVE_WORLDS_WITH_CONSEQUENCES = [
  'bourbon',
  'ai-builder',
  'public-speaking',
  'civic-engagement',
] as const;
