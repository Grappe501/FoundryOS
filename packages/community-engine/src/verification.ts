import type {
  CommunityEvidenceShare,
  CommunityMember,
  CommunityOS,
  CommunityProjectAssignment,
  CommunityVerificationStep,
} from './types';

export const COMMUNITY_CORE_RULE = 'Transformation accelerates in community.';

export const PASS_012_COMMUNITY_EXIT =
  'A user can join a community, receive a project assignment, and share evidence that accelerates transformation.';

export const PASS_012_COMMUNITY_TITLE = 'PASS-012 Community Verification';

export function buildCommunityVerificationChecklist(
  community: CommunityOS | null,
  member: CommunityMember | null,
  project: CommunityProjectAssignment | null,
  evidenceShare: CommunityEvidenceShare | null
): CommunityVerificationStep[] {
  return [
    { key: 'created', label: 'Community Created', complete: Boolean(community?.slug) },
    { key: 'member', label: 'Member Joined', complete: Boolean(member?.user_slug) },
    { key: 'project', label: 'Project Assigned', complete: Boolean(project?.project_slug) },
    { key: 'evidence', label: 'Evidence Shared', complete: Boolean(evidenceShare?.evidence_submission_id) },
  ];
}

export function isCommunityVerificationComplete(steps: CommunityVerificationStep[]): boolean {
  return steps.every((s) => s.complete);
}
