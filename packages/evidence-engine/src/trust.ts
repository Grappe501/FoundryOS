import type { EvidenceSubmission } from './submissions';
import { EVIDENCE_TIERS } from './tiers';

export function getTrustWeightForTier(tier: EvidenceSubmission['tier']): number {
  return EVIDENCE_TIERS.find((t) => t.tier === tier)?.trust_weight ?? 20;
}

export function tierLabel(tier: EvidenceSubmission['tier']): string {
  return EVIDENCE_TIERS.find((t) => t.tier === tier)?.label ?? tier;
}
