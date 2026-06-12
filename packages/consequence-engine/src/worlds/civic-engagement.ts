import type { ConsequenceChain } from '../types';

function action(id: string, world: string, label: string): ConsequenceChain['nodes'][0] {
  return { id, world_slug: world, label, kind: 'action' };
}

export const CIVIC_VOTER_GUIDE_CHAIN: ConsequenceChain = {
  id: 'civic-voter-guide',
  title: 'Voter Guide Mission',
  trigger: {
    world_slug: 'civic-engagement',
    action_type: 'mission_completed',
    action_id: 'register-to-vote',
  },
  nodes: [
    action('register-to-vote', 'civic-engagement', 'Registered to Vote'),
    {
      id: 'collection-voter-guide',
      world_slug: 'civic-engagement',
      label: 'Voter Guide (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'voter-guide',
      href: '/civic-engagement/portfolio',
      metadata: { item_id: 'register-mission' },
    },
    {
      id: 'collection-forum-attendee',
      world_slug: 'civic-engagement',
      label: 'Forum Attendee (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'forum-attendee',
      href: '/civic-engagement/missions',
      metadata: { item_id: 'meeting-found' },
    },
    {
      id: 'mentor-civic-first-step',
      world_slug: 'civic-engagement',
      label: 'Mentor: first civic step',
      kind: 'mentor_memory',
      description: 'You moved from opinion to participation.',
    },
  ],
  edges: [
    { from: 'register-to-vote', to: 'collection-voter-guide' },
    { from: 'collection-voter-guide', to: 'collection-forum-attendee' },
    { from: 'collection-forum-attendee', to: 'mentor-civic-first-step' },
  ],
};

export const CIVIC_CHAINS: ConsequenceChain[] = [CIVIC_VOTER_GUIDE_CHAIN];
