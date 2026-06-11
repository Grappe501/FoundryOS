import type { CommunityEvidenceShare, CommunityMember, CommunityOS, CommunityProjectAssignment } from './types';
import { SPEAKER_CIRCLE } from './communities/speaker-circle';

export const DEMO_COMMUNITY_SLUG = SPEAKER_CIRCLE.slug;
export const DEMO_USER_SLUG = 'demo-user';

export function buildDemoCommunityInstance(): Omit<CommunityOS, 'member_count'> & { member_count: number } {
  return { ...SPEAKER_CIRCLE };
}

export function buildDemoCommunityMember(communityId?: string): Omit<CommunityMember, 'id'> {
  return {
    community_id: communityId,
    user_slug: DEMO_USER_SLUG,
    role: 'member',
    joined_at: new Date().toISOString(),
  };
}

export function buildDemoCommunityProject(communityId?: string): Omit<CommunityProjectAssignment, 'id'> {
  return {
    community_id: communityId,
    project_slug: 'peer-feedback-session-april',
    project_title: 'Peer Feedback Session — April',
    assigned_to_user_slug: DEMO_USER_SLUG,
    assigned_at: new Date().toISOString(),
  };
}

export function buildDemoCommunityEvidenceShare(
  communityId?: string,
  evidenceSubmissionId?: string
): Omit<CommunityEvidenceShare, 'id'> {
  return {
    community_id: communityId,
    evidence_submission_id: evidenceSubmissionId ?? '',
    shared_by_user_slug: DEMO_USER_SLUG,
    shared_at: new Date().toISOString(),
  };
}
