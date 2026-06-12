import type { ConsequenceChain } from '../types';

function action(id: string, world: string, label: string): ConsequenceChain['nodes'][0] {
  return { id, world_slug: world, label, kind: 'action' };
}

export const PUBLIC_SPEAKING_FIRST_TALK_CHAIN: ConsequenceChain = {
  id: 'ps-first-talk',
  title: 'First Talk Mission',
  trigger: {
    world_slug: 'public-speaking',
    action_type: 'mission_completed',
    action_id: 'first-talk',
  },
  nodes: [
    action('first-talk', 'public-speaking', 'First Talk Complete'),
    {
      id: 'track-event-host',
      world_slug: 'public-speaking',
      label: 'Event Host track unlocked',
      kind: 'unlock_path',
      target_id: 'event-host',
      href: '/public-speaking/missions',
      description: 'Host tastings, meetings, gatherings',
    },
    {
      id: 'collection-first-stage',
      world_slug: 'public-speaking',
      label: 'First Stage (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'first-stage',
      href: '/public-speaking/portfolio',
      metadata: { item_id: 'first-talk' },
    },
    {
      id: 'collection-confidence-builder',
      world_slug: 'public-speaking',
      label: 'Confidence Builder (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'confidence-builder',
      href: '/public-speaking/portfolio',
      metadata: { item_id: 'confidence-reflection' },
    },
    {
      id: 'rabbit-speech-analysis',
      world_slug: 'public-speaking',
      label: 'Speech analysis rabbit hole',
      kind: 'unlock_rabbit_hole',
      href: '/public-speaking/playground',
    },
    {
      id: 'cross-host-tasting',
      world_slug: 'public-speaking',
      label: 'Cross-world: Host a bourbon tasting',
      kind: 'unlock_rabbit_hole',
      href: '/bourbon/level-1',
      description: 'Speaking + bourbon — natural pairing',
    },
    {
      id: 'mentor-first-stage',
      world_slug: 'public-speaking',
      label: 'Mentor remembers your first stage',
      kind: 'mentor_memory',
      description: 'You stood up once — that is the hardest rep.',
    },
  ],
  edges: [
    { from: 'first-talk', to: 'collection-first-stage' },
    { from: 'collection-first-stage', to: 'collection-confidence-builder' },
    { from: 'collection-confidence-builder', to: 'track-event-host' },
    { from: 'track-event-host', to: 'rabbit-speech-analysis' },
    { from: 'rabbit-speech-analysis', to: 'cross-host-tasting' },
    { from: 'cross-host-tasting', to: 'mentor-first-stage' },
  ],
};

export const PUBLIC_SPEAKING_CHAINS: ConsequenceChain[] = [PUBLIC_SPEAKING_FIRST_TALK_CHAIN];
