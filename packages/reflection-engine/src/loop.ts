/**
 * Human Growth Loop — Learn → Do → Reflect → Adjust → Grow (PASS-010)
 */
export const HUMAN_GROWTH_LOOP = [
  'Learn',
  'Do',
  'Reflect',
  'Adjust',
  'Grow',
] as const;

export const HUMAN_GROWTH_LOOP_FLOW = 'Learn → Do → Reflect → Adjust → Grow';

/** Most platforms stop at Learn → Do */
export const PLATFORM_CEILING = ['Learn', 'Do'] as const;

/**
 * Transformation Intelligence Loop — repeats forever
 */
export const TRANSFORMATION_INTELLIGENCE_LOOP = [
  'Goal',
  'Path',
  'Project',
  'Action',
  'Evidence',
  'Reflection',
  'Insight',
  'Next Best Action',
] as const;

export const TRANSFORMATION_INTELLIGENCE_LOOP_FLOW =
  'Goal → Path → Project → Action → Evidence → Reflection → Insight → Next Best Action';

/** Every project completion ends with these three questions */
export const PROJECT_COMPLETION_REFLECTION = [
  'What happened?',
  'What did you learn?',
  'What should happen next?',
] as const;

export const REFLECTION_PRINCIPLE = {
  knows: ['What I want', 'What I know', 'What I did'],
  missing_without_reflection: 'What I learned',
  real_gold: 'Lessons learned — that is where wisdom lives.',
  moat:
    'Millions of people reflecting on transformation. Nobody owns that.',
} as const;
