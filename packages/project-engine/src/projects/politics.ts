import type { FoundryProject } from '../types';

export const POLITICS_PROJECTS: FoundryProject[] = [
  {
    slug: 'organize-town-hall',
    display_name: 'Organize Town Hall',
    tagline: 'Bring community together around issues',
    vertical_slug: 'politics',
    category: 'host',
    path_slug: 'road-to-arkansas-political-organizer',
    description: 'Organizing transforms political knowledge into action',
    estimated_days: 30,
    status: 'active',
    steps: [
      { slug: 'define-topic', title: 'Define topic and speakers', description: 'Clear agenda and goals', sort_order: 1 },
      { slug: 'secure-venue', title: 'Secure venue and promote', description: 'Outreach to community', sort_order: 2 },
      { slug: 'host-event', title: 'Host town hall', description: 'Document attendance and outcomes', sort_order: 3 },
    ],
  },
  {
    slug: 'register-100-voters',
    display_name: 'Register 100 Voters',
    tagline: 'Precinct-level impact',
    vertical_slug: 'politics',
    category: 'organize',
    path_slug: 'road-to-arkansas-political-organizer',
    description: 'Measurable civic contribution',
    estimated_days: 60,
    status: 'active',
    steps: [
      { slug: 'training', title: 'Complete registrar training', description: 'Know the rules', sort_order: 1 },
      { slug: 'register-fifty', title: 'Register 50 voters', description: 'Track in project log', sort_order: 2 },
      { slug: 'register-hundred', title: 'Reach 100 registrations', description: 'Celebrate milestone', sort_order: 3 },
    ],
  },
  {
    slug: 'build-precinct-team',
    display_name: 'Build Precinct Team',
    tagline: 'Organize your neighborhood',
    vertical_slug: 'politics',
    category: 'organize',
    description: 'Teams create lasting political infrastructure',
    estimated_days: 90,
    status: 'active',
    steps: [
      { slug: 'recruit-captain', title: 'Recruit precinct captain', description: 'Leadership structure', sort_order: 1 },
      { slug: 'canvass-plan', title: 'Build canvass plan', description: 'Routes, scripts, schedule', sort_order: 2 },
      { slug: 'run-canvass', title: 'Complete first canvass', description: 'Document contacts and follow-ups', sort_order: 3 },
    ],
  },
];
