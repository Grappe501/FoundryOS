import type { HumanOutcome } from '../types';

/** People don't say "I want to learn chemistry" — they say "I want to become a doctor." */
export const OUTCOME_DOCTOR: HumanOutcome = {
  slug: 'become-doctor',
  display_name: 'Become a Doctor',
  goal_statement: 'I want to heal people and practice medicine.',
  linked_domains: [
    'chemistry',
    'biology',
    'anatomy',
    'physiology',
    'calculus',
    'physics',
    'psychology',
  ],
  linked_paths: ['road-to-chemistry-mastery', 'road-to-physics-expert'],
  category: 'health',
  status: 'exemplar',
};
