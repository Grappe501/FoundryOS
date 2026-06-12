import type { ConsequenceChain } from '../types';

function action(id: string, world: string, label: string): ConsequenceChain['nodes'][0] {
  return { id, world_slug: world, label, kind: 'action' };
}

export const AI_BUILDER_HOMEWORK_CHAIN: ConsequenceChain = {
  id: 'ai-builder-homework-assistant',
  title: 'Homework Assistant Mission',
  trigger: {
    world_slug: 'ai-builder',
    action_type: 'mission_completed',
    action_id: 'homework-assistant',
  },
  nodes: [
    action('homework-assistant', 'ai-builder', 'Homework Assistant Complete'),
    {
      id: 'path-entrepreneur',
      world_slug: 'ai-builder',
      label: 'Entrepreneur path unlocked',
      kind: 'unlock_path',
      target_id: 'entrepreneur',
      href: '/explore/entrepreneur',
      description: 'Natural evolution — build for others',
    },
    {
      id: 'path-software-creator',
      world_slug: 'ai-builder',
      label: 'Software Creator path unlocked',
      kind: 'unlock_path',
      target_id: 'software-creator',
      href: '/ai-builder/careers',
    },
    {
      id: 'collection-ai-workflow',
      world_slug: 'ai-builder',
      label: 'AI Workflow Collector (+1)',
      kind: 'unlock_collector_progress',
      target_id: 'ai-workflow-collector',
      href: '/ai-builder/portfolio',
      metadata: { item_id: 'homework-assistant' },
    },
    {
      id: 'mentor-prior-project',
      world_slug: 'ai-builder',
      label: 'Mentor references Homework Assistant',
      kind: 'mentor_memory',
      description: 'Your homework bot is proof you can ship — what is next?',
    },
    {
      id: 'cross-bourbon-app',
      world_slug: 'ai-builder',
      label: 'Cross-world: Build a bourbon app',
      kind: 'unlock_rabbit_hole',
      href: '/bourbon/level-1',
      description: 'If you love bourbon — build tools for collectors',
    },
  ],
  edges: [
    { from: 'homework-assistant', to: 'collection-ai-workflow' },
    { from: 'collection-ai-workflow', to: 'path-software-creator' },
    { from: 'path-software-creator', to: 'path-entrepreneur' },
    { from: 'path-entrepreneur', to: 'mentor-prior-project' },
    { from: 'mentor-prior-project', to: 'cross-bourbon-app' },
  ],
};

export const AI_BUILDER_CHAINS: ConsequenceChain[] = [AI_BUILDER_HOMEWORK_CHAIN];
