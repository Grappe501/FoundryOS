import type { FoundryLegacyProfile, LegacyMilestone } from './types';

/**
 * Foundry remembers — people spend years becoming something.
 * Most platforms forget. Legacy makes effort matter.
 */
export const LEGACY_TAGLINE = 'Foundry remembers.';

export function buildLegacyProfile(
  userId: string,
  profile: Omit<FoundryLegacyProfile, 'user_id'>
): FoundryLegacyProfile {
  return { user_id: userId, ...profile };
}

/** Legacy impact — not gamification, but meaning */
export function calculateLegacyImpact(stats: {
  paths_completed: number;
  projects_completed: number;
  people_mentored: number;
  communities_built: number;
  knowledge_contributions: number;
}): number {
  return (
    stats.paths_completed * 10 +
    stats.projects_completed * 5 +
    stats.people_mentored * 15 +
    stats.communities_built * 25 +
    Math.min(stats.knowledge_contributions, 5000) * 0.5
  );
}

/** Steve — Year 1 to Year 20 journey */
export const EXAMPLE_STEVE_LEGACY_MILESTONES: LegacyMilestone[] = [
  { year: 1, title: 'Road to Bourbon Enthusiast', milestone_type: 'path' },
  { year: 3, title: 'Road to Bourbon Steward', milestone_type: 'path' },
  { year: 7, title: 'Founded Central Arkansas Bourbon Society', milestone_type: 'community' },
  { year: 12, title: 'Mentored 150 enthusiasts', milestone_type: 'mentor' },
  { year: 20, title: 'Legacy Profile', milestone_type: 'legacy' },
];

export const EXAMPLE_STEVE_LEGACY: FoundryLegacyProfile = buildLegacyProfile('steve-grappe', {
  display_name: 'Steve Grappe',
  joined_year: 2027,
  paths_completed: 14,
  projects_completed: 92,
  people_mentored: 48,
  communities_built: 6,
  knowledge_contributions: 1142,
  legacy_impact_score: calculateLegacyImpact({
    paths_completed: 14,
    projects_completed: 92,
    people_mentored: 48,
    communities_built: 6,
    knowledge_contributions: 1142,
  }),
  milestones: EXAMPLE_STEVE_LEGACY_MILESTONES,
});
