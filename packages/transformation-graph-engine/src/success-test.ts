/**
 * PASS-010 success criteria — one sentence.
 */
export const PASS_010_SUCCESS_CRITERIA =
  'Can Foundry help a user make meaningful progress and explain why that progress matters?';

export const PASS_010_SUCCESS_CRITERIA_IMPLIES = [
  'The graph works',
  'The reflection engine works',
  'The momentum engine works',
  'The next-action engine works',
  'Everything else becomes scaling',
] as const;

/** PASS-010 demonstration goal — prove the core intelligence model */
export const PASS_010_DEMONSTRATION_GOAL =
  'Can we guide one person through one complete transformation cycle?';

export const PASS_010_NOT_THE_GOAL = 'Can we query the graph?';

export const PASS_010_SUCCESS_STEPS = [
  'Identify a goal',
  'Recommend an action',
  'Capture evidence',
  'Capture reflection',
  'Learn from the outcome',
  'Recommend the next action',
] as const;

export const PASS_010_SUCCESS_PROOF =
  'If that full loop works, Foundry has proven the core loop that academics, hobbies, careers, leadership, organizations, and communities will eventually run on.';

export type TransformationCycleStep = {
  step: string;
  slug: string;
  output: string;
  status: 'exemplar' | 'planned';
};

/** Exemplar: one complete cycle — Become a Better Public Speaker */
export const EXAMPLE_TRANSFORMATION_CYCLE: TransformationCycleStep[] = [
  {
    step: 'User Goal',
    slug: 'goal',
    output: 'Become a Better Public Speaker',
    status: 'exemplar',
  },
  {
    step: 'System generates',
    slug: 'system-generates',
    output: 'Outcome · Path · Project · Action',
    status: 'exemplar',
  },
  {
    step: 'User completes',
    slug: 'user-completes',
    output: 'Deliver First Speech',
    status: 'exemplar',
  },
  {
    step: 'System records',
    slug: 'evidence-reflection',
    output: 'Evidence · Reflection',
    status: 'exemplar',
  },
  {
    step: 'System derives',
    slug: 'insight',
    output: 'Insight from reflection + graph patterns',
    status: 'exemplar',
  },
  {
    step: 'System recommends',
    slug: 'next-action',
    output: 'Next Best Action — with transparent why',
    status: 'exemplar',
  },
];
