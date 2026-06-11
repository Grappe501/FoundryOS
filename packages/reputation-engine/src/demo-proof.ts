import type { EvidenceInput } from './types';
import { calculateReputationFromEvidence } from './calculate';

export const DEMO_USER_SLUG = 'demo-user';
export const DEMO_ACTION_SLUG = 'deliver-first-speech';

export function buildDemoEvidenceInput(
  evidenceId: string,
  overrides?: Partial<EvidenceInput>
): EvidenceInput {
  return {
    id: evidenceId,
    user_slug: DEMO_USER_SLUG,
    action_slug: DEMO_ACTION_SLUG,
    domain_slug: 'public-speaking',
    tier: 'verified',
    verification_status: 'verified',
    trust_weight: 50,
    title: 'First speech delivered — Rotary Club',
    ...overrides,
  };
}

export function buildDemoReputationRecord(evidenceId: string) {
  return calculateReputationFromEvidence(buildDemoEvidenceInput(evidenceId));
}
