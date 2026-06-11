export type {
  PathTier,
  MilestoneCategory,
  PathMilestone,
  MasteryPath,
  UserPathProgress,
  ClubPathChallenge,
} from './types';

export { BOURBON_PATHS } from './paths/bourbon';
export { IDENTITY_DOMAIN_PATHS, POKER_PATHS, MAGIC_PATHS } from './paths/identity-domains';
export {
  MASTERY_PATH_CATALOG,
  getPath,
  getPathsForVertical,
  getActivePaths,
} from './paths/catalog';

export {
  assemblePath,
  calculateProgress,
  milestoneByCategory,
  type PathAssembly,
} from './assemble';

export {
  getNorthStarMetrics,
  NORTH_STAR_QUESTION,
  NORTH_STAR_LABELS,
  type NorthStarMetrics,
} from './north-star';

/** Expert Development — the real product */
export const EXPERT_DEVELOPMENT_PILLARS = [
  'Identity',
  'Progress',
  'Belonging',
  'Mastery',
  'Recognition',
  'Application',
] as const;
