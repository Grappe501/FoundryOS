export type { EvidenceItem, EvidenceProfile } from './types';
export type {
  EvidenceSubmission,
  EvidenceVerificationStatus,
  EvidenceSubmissionType,
  EvidenceVerificationStep,
  EvidenceGuidance,
} from './submissions';
export {
  EVIDENCE_PRINCIPLE,
  PASS_011_TITLE,
  EVIDENCE_REGISTRY,
  getEvidenceProfile,
  getEvidenceForDomain,
} from './registry';
export {
  EVIDENCE_TIERS,
  EVIDENCE_TIERS_PRINCIPLE,
  type EvidenceTier,
  type EvidenceTierDefinition,
} from './tiers';
export { getTrustWeightForTier, tierLabel } from './trust';
export { deriveEvidenceGuidance } from './guidance';
export {
  buildDemoEvidenceSubmission,
  DEMO_ACTION_SLUG,
  PASS_011_EXIT_CRITERIA,
} from './demo-proof';
export {
  PASS_011_VERIFICATION_TITLE,
  buildEvidenceVerificationChecklist,
  isEvidenceVerificationComplete,
} from './verification';
export {
  EVIDENCE_KPI_KEYS,
  getEvidenceKpiSnapshot,
  type EvidenceKpiSnapshot,
} from './kpis';
