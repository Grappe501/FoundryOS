import { getActivePaths, MASTERY_PATH_CATALOG } from './paths/catalog';

/** Mission Control north star — transformations in progress, not pages published */
export type NorthStarMetrics = {
  transformations_in_progress: number;
  active_paths: number;
  total_paths_defined: number;
  academy_graduates: number;
  community_leaders: number;
  expert_contributors: number;
  club_hosts: number;
  users_on_paths: number;
};

export function getNorthStarMetrics(live?: Partial<NorthStarMetrics>): NorthStarMetrics {
  return {
    transformations_in_progress: live?.transformations_in_progress ?? live?.users_on_paths ?? 0,
    active_paths: getActivePaths().length,
    total_paths_defined: MASTERY_PATH_CATALOG.length,
    academy_graduates: live?.academy_graduates ?? 0,
    community_leaders: live?.community_leaders ?? 0,
    expert_contributors: live?.expert_contributors ?? 0,
    club_hosts: live?.club_hosts ?? 0,
    users_on_paths: live?.users_on_paths ?? 0,
  };
}

export const NORTH_STAR_QUESTION = 'How many transformations are in progress?';

export const NORTH_STAR_LABELS = [
  { key: 'transformations_in_progress', label: 'Transformations in Progress' },
  { key: 'active_paths', label: 'Active Paths' },
  { key: 'users_on_paths', label: 'Users on Paths' },
  { key: 'academy_graduates', label: 'Academy Graduates' },
  { key: 'community_leaders', label: 'Community Leaders' },
  { key: 'expert_contributors', label: 'Expert Contributors' },
  { key: 'club_hosts', label: 'Club Hosts' },
] as const;
