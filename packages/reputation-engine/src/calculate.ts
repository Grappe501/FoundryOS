import type { EvidenceInput, ReputationRecord, ReputationVerificationStep } from './types';

/** Derive reputation from evidence — nothing bypasses evidence */
export function calculateReputationFromEvidence(
  evidence: EvidenceInput
): Omit<ReputationRecord, 'id'> {
  const verified =
    evidence.verification_status !== 'pending' && evidence.verification_status !== 'rejected';
  const domain = evidence.domain_slug ?? 'general';

  let reputation_title = 'Contributor';
  if (domain === 'public-speaking' && evidence.action_slug === 'deliver-first-speech' && verified) {
    reputation_title = 'Trusted Speaker Candidate';
  } else if (domain === 'bourbon' && evidence.action_slug === 'compare-four-bourbons-blind-tasting' && verified) {
    reputation_title = 'Trusted Bourbon Enthusiast Candidate';
  } else if (domain === 'bourbon' && verified) {
    reputation_title = 'Trusted Bourbon Enthusiast Candidate';
  } else if (domain === 'ai-building' && verified) {
    reputation_title = 'Trusted Builder';
  } else if (verified) {
    reputation_title = 'Trusted Practitioner';
  }

  const scope = domain === 'general' ? 'platform' : 'platform';

  return {
    user_slug: evidence.user_slug,
    evidence_submission_id: evidence.id ?? '',
    domain_slug: evidence.domain_slug,
    scope,
    reputation_title,
    trust_weight: evidence.trust_weight,
    identity_impact: verified
      ? `${reputation_title} — trust derived from verified evidence (${evidence.title})`
      : null,
    calculated_at: new Date().toISOString(),
  };
}

export function buildReputationVerificationChecklist(
  evidence: EvidenceInput | null,
  record: ReputationRecord | null
): ReputationVerificationStep[] {
  const evaluated = Boolean(evidence?.action_slug);
  const trustApplied = (record?.trust_weight ?? 0) > 0;
  const reputationUpdated = Boolean(record?.reputation_title);
  const identityUpdated = Boolean(record?.identity_impact);

  return [
    { key: 'evaluated', label: 'Evidence Evaluated', complete: evaluated },
    { key: 'trust', label: 'Trust Weight Applied', complete: trustApplied },
    { key: 'reputation', label: 'Reputation Updated', complete: reputationUpdated },
    { key: 'identity', label: 'Identity Updated', complete: identityUpdated },
  ];
}

export function isReputationVerificationComplete(steps: ReputationVerificationStep[]): boolean {
  return steps.every((s) => s.complete);
}
