/**
 * Registry expansion — lifelong identity domains, not apps.
 */
export type IdentityDomainCategory =
  | 'life_leverage'
  | 'academic'
  | 'skills'
  | 'hobbies'
  | 'careers'
  | 'lifestyles'
  | 'communities';

export type IdentityDomainCategoryDef = {
  slug: IdentityDomainCategory;
  display_name: string;
  description: string;
  examples: string[];
  tier?: 'primary' | 'standard';
};

export const IDENTITY_DOMAIN_CATEGORIES: IdentityDomainCategoryDef[] = [
  {
    slug: 'life_leverage',
    display_name: 'Life Leverage Domains',
    description: 'Domains that dramatically change life outcomes — parents pay, schools recommend, students spend years inside',
    tier: 'primary',
    examples: [
      'Financial Independence', 'AI Builder', 'Public Speaking', 'Civic Engagement',
      'Entrepreneurship', 'Leadership',
    ],
  },
  {
    slug: 'academic',
    display_name: 'Academic Domains',
    description: 'Foundry University — Road to Mastery, not courses',
    examples: [
      'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Literature',
      'Economics', 'Psychology', 'Philosophy', 'Computer Science',
    ],
  },
  {
    slug: 'skills',
    display_name: 'Skills',
    description: 'Transferable human capabilities',
    examples: ['Public Speaking', 'Negotiation', 'Sales', 'Writing', 'Leadership', 'Teaching', 'Coaching'],
  },
  {
    slug: 'hobbies',
    display_name: 'Hobbies',
    description: 'Lifelong pursuits and passions',
    examples: ['Poker', 'Magic: The Gathering', 'Chess', 'Woodworking', 'Photography', 'Birding', 'Gardening'],
  },
  {
    slug: 'careers',
    display_name: 'Careers',
    description: 'Professional identity domains',
    examples: ['Campaign Management', 'Project Management', 'Software Engineering', 'Marketing', 'Fundraising'],
  },
  {
    slug: 'lifestyles',
    display_name: 'Lifestyles',
    description: 'How people live',
    examples: ['Homesteading', 'Travel', 'Fitness', 'Preparedness', 'Parenting'],
  },
  {
    slug: 'communities',
    display_name: 'Communities',
    description: 'Shared mastery verticals',
    examples: ['Bourbon', 'BBQ', 'Books', 'Movies', 'Music', 'Genealogy'],
  },
];

export function getCategory(slug: IdentityDomainCategory): IdentityDomainCategoryDef | undefined {
  return IDENTITY_DOMAIN_CATEGORIES.find((c) => c.slug === slug);
}
