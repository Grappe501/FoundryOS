/**
 * The Transformation Graph — what makes Foundry impossible to copy.
 * Not AI. Not content. Not courses. Not communities alone.
 */
export const GRAPH_COMPARISON = {
  google: { name: 'Google', graph: 'Information Graph' },
  linkedin: { name: 'LinkedIn', graph: 'Professional Graph' },
  facebook: { name: 'Facebook', graph: 'Social Graph' },
  foundry: { name: 'Foundry', graph: 'Transformation Graph' },
} as const;

/** Layers of the transformation graph — nobody owns this graph */
export const TRANSFORMATION_GRAPH_LAYERS = [
  'goals',
  'outcomes',
  'domains',
  'paths',
  'projects',
  'communities',
  'mentors',
  'results',
] as const;

export type TransformationGraphLayer = (typeof TRANSFORMATION_GRAPH_LAYERS)[number];

export const TRANSFORMATION_GRAPH_FLOW =
  'Goals → Outcomes → Domains → Paths → Projects → Communities → Mentors → Results';

export const DEFENSIBILITY_PRINCIPLE = {
  not: ['AI', 'Content', 'Courses', 'Communities alone'],
  is: 'Transformation Intelligence — we know what actions help people grow',
} as const;

/** Expanded pass gate — PASS-009+ */
export const TRANSFORMATION_PASS_GATE =
  'Can Foundry observe, support, measure, and remember the transformation?';

export const TRANSFORMATION_PASS_GATE_RULE =
  'If yes — core infrastructure. If no — likely just content. Content is a byproduct of the graph, not the center.';
