export type {
  CommunityCapability,
  CommunityType,
  CommunityOS,
  CommunityMember,
  CommunityProjectAssignment,
  CommunityEvidenceShare,
  CommunityVerificationStep,
  CommunityUseCase,
} from './types';

export {
  SPEAKER_CIRCLE,
  CENTRAL_ARKANSAS_BOURBON_SOCIETY,
  COMMUNITY_OS_CAPABILITIES,
  COMMUNITY_EXAMPLES,
} from './communities/speaker-circle';

export const COMMUNITY_OS_TAGLINE = 'Community OS — not a club feature.';

export {
  COMMUNITY_CORE_RULE,
  PASS_012_COMMUNITY_EXIT,
  PASS_012_COMMUNITY_TITLE,
  buildCommunityVerificationChecklist,
  isCommunityVerificationComplete,
} from './verification';

export {
  DEMO_COMMUNITY_SLUG,
  DEMO_USER_SLUG,
  buildDemoCommunityInstance,
  buildDemoCommunityMember,
  buildDemoCommunityProject,
  buildDemoCommunityEvidenceShare,
} from './demo-proof';

export {
  COMMUNITY_KPI_KEYS,
  getCommunityKpiSnapshot,
  type CommunityKpiSnapshot,
} from './kpis';
