import type { EvidenceGuidance, EvidenceSubmission } from './submissions';
import { tierLabel } from './trust';

/** How attached evidence strengthens identity and next-step guidance */
export function deriveEvidenceGuidance(
  submission: Pick<
    EvidenceSubmission,
    'tier' | 'title' | 'action_text' | 'metadata' | 'trust_weight' | 'verification_status'
  >
): EvidenceGuidance {
  const tier = tierLabel(submission.tier);
  const audience =
    typeof submission.metadata.audience_size === 'number'
      ? submission.metadata.audience_size
      : null;
  const location =
    typeof submission.metadata.location === 'string' ? submission.metadata.location : null;

  return {
    identity_strength: `${tier} evidence (${submission.trust_weight}% trust): "${submission.title}" — expertise is earned, not self-declared.`,
    progress_signal: audience
      ? `Meaningful progress event: completed "${submission.action_text}" with audience of ${audience}${location ? ` at ${location}` : ''}.`
      : `Meaningful progress: completed "${submission.action_text}".`,
    next_step_influence:
      submission.verification_status === 'verified' || submission.trust_weight >= 50
        ? 'Next step upgraded: deliver second speech with prepared outline — transitions were the gap; verified first speech unlocks structured practice path.'
        : 'Next step unchanged until evidence is verified — attach proof to unlock stronger guidance.',
  };
}
