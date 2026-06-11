import type { JourneyEvent } from './types';

/**
 * The Foundry Life Graph — five connected graphs.
 * Everything connects. Journeys are the moat.
 */
export const LIFE_GRAPHS = [
  { key: 'knowledge_graph', label: 'Knowledge Graph', description: 'Entities, relationships, encyclopedia' },
  { key: 'ownership_graph', label: 'Ownership Graph', description: 'Collections, reviews, rankings, shelf' },
  { key: 'identity_graph', label: 'Identity Graph', description: 'Mastery titles, portable Foundry Identity' },
  { key: 'project_graph', label: 'Project Graph', description: 'Projects transform knowledge into action' },
  { key: 'community_graph', label: 'Community Graph', description: 'Clubs, challenges, mentorship' },
] as const;

export type LifeGraphKey = (typeof LIFE_GRAPHS)[number]['key'];

export type JourneyStoryNode = {
  label: string;
  graph: LifeGraphKey;
  detail?: string;
};

/** Steve's bourbon journey — more valuable than any AI article */
export const EXAMPLE_STEVE_JOURNEY: JourneyStoryNode[] = [
  { label: 'Steve', graph: 'identity_graph' },
  { label: 'Road to Bourbon Master', graph: 'knowledge_graph', detail: '62% complete' },
  { label: 'Completed Project: Blind Tasting Night', graph: 'project_graph' },
  { label: 'Hosted Bourbon Tasting', graph: 'project_graph' },
  { label: 'Created Central Arkansas Bourbon Society', graph: 'community_graph' },
  { label: 'Mentored 12 Members', graph: 'community_graph' },
  { label: 'Earned Bourbon Steward', graph: 'identity_graph' },
];

/** Foundry remembers journeys — incredibly sticky */
export const EXAMPLE_STEVE_JOURNEY_TIMELINE: JourneyEvent[] = [
  { year: 2027, title: 'Knew nothing about bourbon', event_type: 'started', description: 'Curious beginner' },
  { year: 2028, title: 'Built first collection', event_type: 'milestone', description: '25 bottles cataloged' },
  { year: 2029, title: 'Hosted first tasting', event_type: 'project', description: 'Blind tasting night with 6 friends' },
  { year: 2030, title: 'Recognized Bourbon Steward', event_type: 'mastery', description: 'Road to Bourbon Steward complete' },
];

export function buildJourneyStory(nodes: JourneyStoryNode[]): string {
  return nodes.map((n) => n.label).join(' → ');
}
