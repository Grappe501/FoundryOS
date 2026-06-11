/**
 * Future business model — three consumer products + organizations.
 */
export const FOUNDRY_PRODUCTS = [
  {
    slug: 'explore',
    name: 'Foundry Explore',
    price: 'Free',
    includes: ['Knowledge', 'Encyclopedia', 'Search', 'Academy previews'],
    tier: 'free' as const,
  },
  {
    slug: 'build',
    name: 'Foundry Build',
    price: '$4',
    includes: ['Collections', 'Paths', 'Projects', 'Progress', 'Identity'],
    tier: 'build' as const,
  },
  {
    slug: 'mastery',
    name: 'Foundry Mastery',
    price: '$18',
    includes: [
      'Communities',
      'Mentorship',
      'Advanced academies',
      'Transformation analytics',
      'Expert tools',
    ],
    tier: 'mastery' as const,
  },
  {
    slug: 'organizations',
    name: 'Foundry Organizations',
    price: 'Enterprise',
    includes: [
      'Schools',
      'Universities',
      'Associations',
      'Campaigns',
      'Professional societies',
      'Companies',
    ],
    tier: 'enterprise' as const,
  },
] as const;

export const ACADEMIC_OPPORTUNITY = {
  not: ['Math', 'Physics', 'Chemistry'],
  but: [
    'Road to Engineer',
    'Road to Scientist',
    'Road to Physician',
    'Road to Researcher',
    'Road to AI Builder',
  ],
  principle: 'Outcomes pull together many domains — more compelling than isolated courses.',
} as const;
