import type { EvidenceSubmission } from './submissions';
import { deriveEvidenceGuidance } from './guidance';
import { getTrustWeightForTier } from './trust';

/** Aligned with @foundry/transformation-loop demo-user — no package import (avoids turbo cycle) */
const DEMO_USER = { slug: 'demo-user', display_name: 'Demo User' } as const;
const DEMO_EVIDENCE = {
  status: 'Speech completed',
  audience_size: 8,
  location: 'Rotary Club',
} as const;
export const DEMO_ACTION_SLUG = 'deliver-first-speech';

export const PASS_011_EXIT_CRITERIA =
  'A user can complete an action, attach evidence, and Foundry can use that evidence to strengthen identity, progress, and next-step guidance.';

/** Demo User — first speech evidence (PASS-010 action → PASS-011 proof) */
export function buildDemoEvidenceSubmission(
  loopId?: string | null
): Omit<EvidenceSubmission, 'id'> {
  const tier = 'verified' as const;
  const submission: Omit<EvidenceSubmission, 'id'> = {
    user_slug: DEMO_USER.slug,
    transformation_loop_id: loopId ?? null,
    action_slug: DEMO_ACTION_SLUG,
    action_text: 'Deliver a 5-minute speech',
    project_slug: 'deliver-first-speech',
    path_slug: 'road-to-confident-speaker',
    domain_slug: 'public-speaking',
    tier,
    verification_status: 'verified',
    title: 'First speech delivered — Rotary Club',
    description:
      'Delivered a 5-minute speech at Rotary Club to an audience of 8. Event recorded by club secretary.',
    evidence_type: 'event',
    metadata: {
      status: DEMO_EVIDENCE.status,
      audience_size: DEMO_EVIDENCE.audience_size,
      location: DEMO_EVIDENCE.location,
      recorded_by: 'Rotary Club secretary',
    },
    trust_weight: getTrustWeightForTier(tier),
    submitted_at: new Date().toISOString(),
    verified_at: new Date().toISOString(),
  };

  const guidance = deriveEvidenceGuidance(submission);
  return {
    ...submission,
    identity_impact: guidance.identity_strength,
    next_step_guidance: guidance.next_step_influence,
  };
}
