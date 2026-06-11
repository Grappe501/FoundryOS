import type { EvidenceInput } from '@foundry/reputation-engine';
import type { MasteryAssignment, MasteryVerificationStep, ReputationRef } from './types';
import {
  DEMO_COMMUNITY_SLUG,
  DEMO_MILESTONE_SLUG,
  DEMO_PATH_SLUG,
} from './principle';

const BOURBON_COMMUNITY_SLUG = 'central-arkansas-bourbon-society';

/** Assign mastery from evidence + reputation — domain-specific, not platform-wide */
export function assignMasteryFromEvidence(
  evidence: EvidenceInput,
  reputation: ReputationRef | null
): Omit<MasteryAssignment, 'id'> {
  const verified =
    evidence.verification_status !== 'pending' && evidence.verification_status !== 'rejected';

  let path_slug = DEMO_PATH_SLUG;
  let path_display_name = 'Road to Confident Speaker';
  let milestone_slug = DEMO_MILESTONE_SLUG;
  let milestone_label = 'Milestone 1 Complete';
  let mastery_title = 'Speaker';

  if (evidence.domain_slug === 'public-speaking' && evidence.action_slug === 'deliver-first-speech') {
    path_slug = DEMO_PATH_SLUG;
    path_display_name = 'Road to Confident Speaker';
    milestone_slug = DEMO_MILESTONE_SLUG;
    milestone_label = 'Milestone 1 Complete';
    mastery_title = 'Speaker';
  } else if (
    evidence.domain_slug === 'bourbon' &&
    evidence.action_slug === 'compare-four-bourbons-blind-tasting'
  ) {
    path_slug = 'road-to-bourbon-enthusiast';
    path_display_name = 'Road to Bourbon Enthusiast';
    milestone_slug = 'milestone-1-blind-tasting';
    milestone_label = 'Milestone 1 Complete';
    mastery_title = 'Bourbon Enthusiast';
  }

  const communitySlug =
    evidence.domain_slug === 'bourbon' ? BOURBON_COMMUNITY_SLUG : DEMO_COMMUNITY_SLUG;
  const communityRecognitionUpdated = evidence.domain_slug === 'bourbon';

  return {
    user_slug: evidence.user_slug,
    evidence_submission_id: evidence.id ?? '',
    reputation_record_id: reputation?.id ?? null,
    domain_slug: evidence.domain_slug ?? 'general',
    path_slug,
    path_display_name,
    milestone_slug,
    milestone_label,
    mastery_title,
    identity_impact: verified
      ? evidence.domain_slug === 'bourbon'
        ? `Bourbon Enthusiast — ${milestone_label} on ${path_display_name}`
        : `Public Speaker Path Progress Increased — ${milestone_label} on ${path_display_name}`
      : null,
    community_instance_slug: communitySlug,
    community_recognition_updated: communityRecognitionUpdated,
    assigned_at: new Date().toISOString(),
  };
}

export function buildMasteryVerificationChecklist(
  evidenceLinked: boolean,
  reputationCalculated: boolean,
  assignment: MasteryAssignment | null
): MasteryVerificationStep[] {
  return [
    { key: 'evidence', label: 'Evidence Linked', complete: evidenceLinked },
    { key: 'reputation', label: 'Reputation Calculated', complete: reputationCalculated },
    { key: 'mastery', label: 'Mastery Assigned', complete: Boolean(assignment?.mastery_title) },
    {
      key: 'identity',
      label: 'Identity Updated',
      complete: Boolean(assignment?.identity_impact),
    },
    {
      key: 'community',
      label: 'Community Recognition Updated',
      complete: Boolean(assignment?.community_recognition_updated),
    },
  ];
}

export function isMasteryVerificationComplete(steps: MasteryVerificationStep[]): boolean {
  return steps.every((s) => s.complete);
}
