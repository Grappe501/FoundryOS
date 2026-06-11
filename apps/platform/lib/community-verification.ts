import { ensureDemoCommunity } from '@foundry/db';
import {
  buildCommunityVerificationChecklist,
  buildDemoCommunityEvidenceShare,
  buildDemoCommunityInstance,
  buildDemoCommunityMember,
  buildDemoCommunityProject,
  isCommunityVerificationComplete,
} from '@foundry/community-engine';

export async function loadPass012CommunityVerification() {
  const built = buildDemoCommunityInstance();
  const { community, member, project, evidenceShare, persisted, error } = await ensureDemoCommunity(
    () => buildDemoCommunityInstance(),
    (communityId) => buildDemoCommunityMember(communityId),
    (communityId) => buildDemoCommunityProject(communityId),
    (communityId, evidenceId) => buildDemoCommunityEvidenceShare(communityId, evidenceId)
  );

  const resolvedCommunity = community ?? built;
  const resolvedMember = member ?? buildDemoCommunityMember(undefined);
  const resolvedProject = project ?? buildDemoCommunityProject(undefined);
  const resolvedShare = evidenceShare ?? buildDemoCommunityEvidenceShare(undefined, '');

  const checklist = buildCommunityVerificationChecklist(
    resolvedCommunity,
    resolvedMember,
    resolvedProject,
    resolvedShare.evidence_submission_id ? resolvedShare : null
  );
  const complete = isCommunityVerificationComplete(checklist) && persisted;

  return {
    community: resolvedCommunity,
    member: resolvedMember,
    project: resolvedProject,
    evidenceShare: resolvedShare.evidence_submission_id ? resolvedShare : null,
    checklist,
    complete,
    db: {
      persisted,
      error: error ?? null,
      tables: [
        'community_instances',
        'community_members',
        'community_project_assignments',
        'community_evidence_shares',
      ],
    },
  };
}
