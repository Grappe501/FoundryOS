import type { EvidenceSubmission, EvidenceVerificationStep } from './submissions';

export const PASS_011_VERIFICATION_TITLE = 'PASS-011 Verification';

export function buildEvidenceVerificationChecklist(
  submission: EvidenceSubmission | null,
  loopLinked: boolean
): EvidenceVerificationStep[] {
  const hasSubmission = Boolean(submission?.action_slug);
  const hasTier = Boolean(submission?.tier);
  const hasStatus = Boolean(
    submission?.verification_status && submission.verification_status !== 'pending'
  );
  const hasTrust = (submission?.trust_weight ?? 0) > 0;
  const hasIdentity = Boolean(submission?.identity_impact);
  const hasNextStep = Boolean(submission?.next_step_guidance);

  return [
    { key: 'action', label: 'Action Completed', complete: Boolean(submission?.action_text) },
    { key: 'submitted', label: 'Evidence Submitted', complete: hasSubmission },
    { key: 'tier', label: 'Evidence Tier Assigned', complete: hasTier },
    { key: 'loop', label: 'Linked to Transformation Loop', complete: loopLinked },
    { key: 'status', label: 'Verification Status Set', complete: hasStatus },
    { key: 'trust', label: 'Trust Weight Calculated', complete: hasTrust },
    { key: 'identity', label: 'Identity Strengthened', complete: hasIdentity },
    { key: 'next_step', label: 'Next Step Informed by Evidence', complete: hasNextStep },
  ];
}

export function isEvidenceVerificationComplete(steps: EvidenceVerificationStep[]): boolean {
  return steps.every((s) => s.complete);
}
