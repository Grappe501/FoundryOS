import type { FoundryProject } from '../types';

export const BBQ_PROJECTS: FoundryProject[] = [
  {
    slug: 'smoke-first-brisket',
    display_name: 'Smoke Your First Brisket',
    tagline: 'From trim to slice',
    vertical_slug: 'bbq',
    category: 'experience',
    path_slug: 'road-to-backyard-pitmaster',
    description: 'The foundational backyard pitmaster project',
    estimated_days: 7,
    status: 'active',
    steps: [
      { slug: 'select-brisket', title: 'Select and trim brisket', description: 'Choice vs prime, fat cap', sort_order: 1 },
      { slug: 'smoke-brisket', title: 'Smoke to temp', description: 'Wrap decision, stall management', sort_order: 2 },
      { slug: 'rest-slice', title: 'Rest and slice', description: 'Document results and notes', sort_order: 3 },
    ],
  },
  {
    slug: 'competition-timeline',
    display_name: 'Build Competition Timeline',
    tagline: 'KCBS-ready prep schedule',
    vertical_slug: 'bbq',
    category: 'build',
    path_slug: 'road-to-competition-pitmaster',
    description: 'Competition pitmasters plan every minute',
    estimated_days: 30,
    status: 'draft',
    steps: [
      { slug: 'study-format', title: 'Study turn-in format', description: 'Boxes, garnish, timing', sort_order: 1 },
      { slug: 'build-timeline', title: 'Build cook timeline', description: 'Hour-by-hour competition day', sort_order: 2 },
    ],
  },
  {
    slug: 'enter-first-cookoff',
    display_name: 'Enter First Cookoff',
    tagline: 'Compete at a local event',
    vertical_slug: 'bbq',
    category: 'compete',
    path_slug: 'road-to-competition-pitmaster',
    description: 'Application transforms backyard skills',
    estimated_days: 90,
    status: 'draft',
    steps: [
      { slug: 'find-event', title: 'Find local cookoff', description: 'KCBS or regional event', sort_order: 1 },
      { slug: 'register-compete', title: 'Register and compete', description: 'Complete first turn-in', sort_order: 2 },
    ],
  },
  {
    slug: 'judge-competition',
    display_name: 'Judge a Competition',
    tagline: 'Earn judge certification',
    vertical_slug: 'bbq',
    category: 'compete',
    description: 'Judges are recognized experts',
    estimated_days: 60,
    status: 'draft',
    steps: [
      { slug: 'judge-training', title: 'Complete judge training', description: 'KCBS or equivalent', sort_order: 1 },
      { slug: 'judge-event', title: 'Judge first event', description: 'Document judging experience', sort_order: 2 },
    ],
  },
];
