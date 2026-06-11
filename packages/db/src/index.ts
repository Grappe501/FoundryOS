export { getSupabaseEnv, isSupabaseConfigured, type SupabaseEnv } from './env';
export { createAnonClient, createServiceClient } from './client';
export {
  getDatabaseStatus,
  getLivePlatformCounts,
  type DatabaseStatus,
  type RlsCheck,
} from './health';
export {
  getTransformationLoopByUserSlug,
  upsertTransformationLoop,
  ensureDemoUserLoop,
  type TransformationLoopRow,
} from './transformation-loop';
export {
  getEvidenceByActionSlug,
  upsertEvidenceSubmission,
  ensureDemoEvidenceSubmission,
  getEvidenceKpiCounts,
  type EvidenceSubmissionRow,
} from './evidence-submissions';
export {
  getKnowledgeAssetBySlug,
  upsertKnowledgeAssetWithItem,
  ensureDemoKnowledgeAsset,
  getCollectionKpiCounts,
  type KnowledgeAssetRow,
  type KnowledgeAssetItemRow,
} from './knowledge-assets';
export {
  getCommunityBySlug,
  ensureDemoCommunity,
  getCommunityKpiCounts,
  type CommunityInstanceRow,
} from './community-instances';
export {
  getReputationByUserAndEvidence,
  upsertReputationRecord,
  ensureDemoReputationRecord,
  getReputationKpiCounts,
  type ReputationRecordRow,
} from './reputation-records';
export {
  getMasteryByUserAndMilestone,
  upsertMasteryAssignment,
  ensureDemoMasteryAssignment,
  getMasteryKpiCounts,
  type MasteryAssignmentRow,
} from './mastery-assignments';
export {
  ensureDomainBlueprintSeeded,
  ensureBourbonDomainProof,
  getDomainProofKpiCounts,
  getDomainBlueprintFromDb,
} from './domain-proof';
export { ensureAiBuilderDomainProof } from './ai-builder-domain-proof';
export { insertBetaWaitlist, getBetaWaitlistStats, type BetaSegment, type BetaWaitlistEntry } from './beta-waitlist';
export {
  listBetaWaitlist,
  getBetaInviteByCode,
  approveBetaTester,
  declineBetaTester,
  markBetaTesterActive,
  getInviteOpsStats,
  type BetaInviteEntry,
  type BetaWaitlistStatus,
  type InviteOpsStats,
} from './beta-invites';
export {
  getTransformationAnalyticsSnapshot,
  type TransformationAnalyticsSnapshot,
  type TransformationFunnel,
  type WorldAnalytics,
  type MissionEffectiveness,
  type TransformationVelocity,
  type SuccessIndicator,
  type DomainReadinessScore,
} from './transformation-analytics';
export {
  insertTesterFeedback,
  listTesterFeedback,
  getTesterFeedbackStats,
  type TesterFeedbackRow,
} from './tester-feedback';
export {
  upsertMissionCompletion,
  getMissionCompletionsForUser,
  getMissionCompletionStats,
  type MissionCompletionRow,
} from './mission-progress';
export { insertValidationEvent, categoryForEvent, getValidationDashboardMetrics } from './validation-events';
export type {
  ValidationEventType,
  ValidationCategory,
  ValidationEventInput,
  ValidationEventRow,
  ValidationDashboardMetrics,
} from './validation-events';
