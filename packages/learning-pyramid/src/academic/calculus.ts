import type { AcademicDomain } from '../types';

export const CALCULUS_DOMAIN: AcademicDomain = {
  slug: 'calculus',
  display_name: 'Calculus',
  discipline: 'Mathematics',
  care_reason: 'Calculus is the language of change — mastery unlocks physics, engineering, and data science.',
  road_slug: 'road-to-calculus-mastery',
  status: 'exemplar',
  layers: {
    definitions: ['Derivative', 'Integral', 'Limit', 'Function'],
    concepts: ['Rate of change', 'Area under curve', 'Continuity', 'Convergence'],
    execution: ['Differentiate polynomials', 'Integration by parts', 'Limit proofs', 'Applied problems'],
    projects: ['Model population growth', 'Optimize real-world function', 'Physics motion lab'],
    mastery: ['Mentor calculus students', 'Create visual guides', 'Lead study group'],
  },
};
