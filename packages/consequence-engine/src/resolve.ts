import type { ConsequenceBundle, ConsequenceNode, ConsequenceTrigger } from './types';
import { findChainForTrigger } from './registry';

const MENTOR_LINES: Record<string, string> = {
  'bourbon-weller-mystery': 'You seem interested in allocation economics.',
  'bourbon-bib-guarantee': 'You trust labels that tell the truth — BiB is your shortcut.',
  'ai-builder-homework-assistant': 'Your homework bot is proof you can ship — what is next?',
  'ps-first-talk': 'You stood up once — that is the hardest rep.',
  'civic-voter-guide': 'You moved from opinion to participation.',
};

/** Resolve consequences for a completed action — effects exclude the action node */
export function resolveConsequences(trigger: ConsequenceTrigger): ConsequenceBundle | null {
  const chain = findChainForTrigger(trigger);
  if (!chain) return null;

  const actionNodeId = chain.nodes.find((n) => n.kind === 'action')?.id;
  const effects = chain.nodes.filter((n) => n.kind !== 'action');

  return {
    chain,
    effects,
    mentor_line: MENTOR_LINES[chain.id],
  };
}

export function downstreamOf(nodeId: string, chain: ConsequenceBundle['chain']): ConsequenceNode[] {
  const visited = new Set<string>();
  const queue = [nodeId];
  const result: ConsequenceNode[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const edge of chain.edges) {
      if (edge.from !== current || visited.has(edge.to)) continue;
      visited.add(edge.to);
      const node = chain.nodes.find((n) => n.id === edge.to);
      if (node && node.kind !== 'action') result.push(node);
      queue.push(edge.to);
    }
  }

  return result;
}

export function effectKindLabel(kind: ConsequenceNode['kind']): string {
  switch (kind) {
    case 'action':
      return 'Action';
    case 'unlock_debate':
      return 'Debate unlocked';
    case 'unlock_legendary_object':
      return 'Legendary object';
    case 'unlock_collector_progress':
      return 'Collector progress';
    case 'unlock_rabbit_hole':
      return 'Rabbit hole';
    case 'mentor_memory':
      return 'Mentor memory';
    case 'unlock_path':
      return 'Path unlocked';
    case 'unlock_collection':
      return 'Collection progress';
    case 'identity_signal':
      return 'Identity signal';
    case 'world_event_unlock':
      return 'World event';
    default:
      return kind;
  }
}
