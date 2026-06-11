import type { FoundryRole } from './types';

/**
 * People think in roles — roles become identity.
 * Paths earn roles. Projects prove roles. Communities assign leadership roles.
 */
export const ROLE_CATALOG: Record<string, string[]> = {
  bourbon: ['Enthusiast', 'Collector', 'Historian', 'Steward', 'Master'],
  bbq: ['Backyard Cook', 'Pitmaster', 'Competition Cook', 'Judge', 'Mentor'],
  books: ['Reader', 'Scholar', 'Critic', 'Curator', 'Teacher'],
  politics: ['Volunteer', 'Organizer', 'Leader', 'Trainer', 'Strategist'],
  movies: ['Viewer', 'Critic', 'Historian', 'Curator', 'Expert'],
  genealogy: ['Researcher', 'Documentarian', 'Historian', 'Curator', 'Guide'],
  poker: ['Recreational Player', 'Cash Winner', 'Tournament Grinder', 'Local Champion', 'Mentor'],
  'public-speaking': ['Speaker', 'Club Speaker', 'Keynoter', 'Trainer', 'Master Communicator'],
  'campaign-management': ['Volunteer', 'Precinct Captain', 'Field Director', 'Campaign Manager', 'Strategist'],
  'master-gardener': ['Home Gardener', 'Vegetable Grower', 'Orchard Steward', 'Garden Leader', 'Master Gardener'],
  'magic-the-gathering': ['New Player', 'Competitive Player', 'Deck Builder', 'Champion', 'Mentor'],
};

export function getRolesForVertical(verticalSlug: string): string[] {
  return ROLE_CATALOG[verticalSlug] ?? [];
}

export function roleFromPathTier(verticalSlug: string, tier: string): FoundryRole | undefined {
  const roles = getRolesForVertical(verticalSlug);
  const match = roles.find((r) => r.toLowerCase().includes(tier) || tier.includes(r.toLowerCase()));
  if (match) {
    return { role: match, vertical_slug: verticalSlug, earned_via: 'path' };
  }
  return roles[0] ? { role: roles[0], vertical_slug: verticalSlug, earned_via: 'path' } : undefined;
}

/** Steve's earned roles across verticals */
export const EXAMPLE_STEVE_ROLES: FoundryRole[] = [
  { role: 'Steward', vertical_slug: 'bourbon', earned_via: 'path' },
  { role: 'Pitmaster', vertical_slug: 'bbq', earned_via: 'project' },
  { role: 'Scholar', vertical_slug: 'books', earned_via: 'path' },
  { role: 'Strategist', vertical_slug: 'politics', earned_via: 'community' },
];
