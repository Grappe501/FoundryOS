export { leaderCopy, leaderMission, LEADER_MISSION_ID } from '../campaigns/leader/people';
export { isTalentFoundryDev, markLayer3DevSession, readLayer3DevIntent, seedLayer3DevSession } from './dev';
export {
  afterLayer3,
  allPlaced,
  applyLeaderPatch,
  canAdvanceLeader,
  canEnterLayer3,
  createLeaderRun,
  nextLeaderPhase,
  normalizeLeaderRun,
  PAID_REASON_MIN,
  persistCheckpoint,
  placementFor,
  setPlacement,
} from './engine';
export { alreadyHasLayer3Evidence, layer3Evidence } from './evidence';
export type { LeaderPhase, LeaderRunState } from './types';
