/**
 * Graph Query Engine — questions Foundry must answer (PASS-010).
 */
export type GraphQuery = {
  slug: string;
  question: string;
  layers_traversed: string[];
  status: 'exemplar' | 'planned';
};

export const TRANSFORMATION_GRAPH_QUERIES: GraphQuery[] = [
  {
    slug: 'great-speakers',
    question: 'How do people become great speakers?',
    layers_traversed: ['outcomes', 'domains', 'paths', 'projects', 'mentors', 'results'],
    status: 'exemplar',
  },
  {
    slug: 'best-gardeners',
    question: 'What projects produce the best gardeners?',
    layers_traversed: ['domains', 'projects', 'results'],
    status: 'planned',
  },
  {
    slug: 'campaign-managers',
    question: 'What paths lead to successful campaign managers?',
    layers_traversed: ['outcomes', 'paths', 'projects', 'communities', 'results'],
    status: 'planned',
  },
  {
    slug: 'mentor-acceleration',
    question: 'Which mentors accelerate progress?',
    layers_traversed: ['mentors', 'paths', 'results'],
    status: 'planned',
  },
  {
    slug: 'community-retention',
    question: 'Which communities retain members longest?',
    layers_traversed: ['communities', 'projects', 'results'],
    status: 'planned',
  },
];

export const PASS_010_TITLE = 'Transformation Graph Engine';

export const PASS_010_DELIVERABLES = [
  'Graph Query Engine',
  'Relationship Weighting (Transformation Impact)',
  'Transformation Analytics',
  'Transformation Velocity',
  'Transformation Momentum Engine',
  'Reflection Engine',
  'Next Highest-Value Action Engine',
] as const;
