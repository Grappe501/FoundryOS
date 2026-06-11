/**
 * Foundry mobile app — Human Operating System home screen.
 * Not Encyclopedia. Not Academy. Not Search.
 */

export const MOBILE_HOME_QUESTION = 'What are you becoming?';

export const MOBILE_HOME_SECTIONS = [
  { key: 'active_paths', label: 'Active Paths', priority: 1 },
  { key: 'current_projects', label: 'Current Projects', priority: 2 },
  { key: 'club_activity', label: 'Club Activity', priority: 3 },
  { key: 'new_knowledge', label: 'New Knowledge', priority: 4 },
  { key: 'recommended_next', label: 'Recommended Next Step', priority: 5 },
] as const;

/** NOT the home screen */
export const MOBILE_HOME_REJECTED = [
  'Search',
  'Browse Topics',
  'Discover Content',
  'Foundry Encyclopedia',
  'Foundry Academy',
] as const;

export const MOBILE_APP_NAME = 'Foundry';
