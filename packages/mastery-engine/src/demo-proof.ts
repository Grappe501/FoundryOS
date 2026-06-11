import type { EvidenceInput } from '@foundry/reputation-engine';
import { assignMasteryFromEvidence } from './assign';

export const DEMO_USER_SLUG = 'demo-user';

export function buildDemoMasteryAssignment(
  evidenceId: string,
  reputation: { id?: string; reputation_title: string; trust_weight: number }
) {
  const evidence: EvidenceInput = {
    id: evidenceId,
    user_slug: DEMO_USER_SLUG,
    action_slug: 'deliver-first-speech',
    domain_slug: 'public-speaking',
    tier: 'verified',
    verification_status: 'verified',
    trust_weight: reputation.trust_weight,
    title: 'First speech delivered — Rotary Club',
  };
  return assignMasteryFromEvidence(evidence, reputation);
}
