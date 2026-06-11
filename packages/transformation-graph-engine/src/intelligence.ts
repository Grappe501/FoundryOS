/**
 * Transformation Intelligence — the real moat (PASS-010+).
 * We know what actions help people grow.
 */
export const TRANSFORMATION_INTELLIGENCE = {
  headline: 'Transformation Intelligence',
  definition: 'We know what actions help people grow.',
  not: ['Content', 'AI', 'Courses', 'Communities alone', 'Knowledge alone', 'Projects alone'],
  compounds: [
    'Millions of transformations',
    'Millions of projects',
    'Millions of reflections',
    'Millions of insights',
  ],
  dataset:
    'Millions of people reflecting on transformation — accumulated human wisdom about how people actually grow.',
} as const;

export const FOUNDRY_HOME_VISION = {
  not: ['Browse', 'Search', 'Learn'],
  is: 'Your Next Best Step',
} as const;

export const TRANSFORMATION_FEEDBACK_LOOP = [
  'What should you do next?',
  'What did you learn?',
  'Did it help?',
] as const;
