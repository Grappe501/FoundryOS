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
  ensureWorldCommunity,
  joinWorldCommunity,
  getCommunityMember,
  listCommunityMembers,
  listCommunityPosts,
  submitCommunityPost,
  submitPeerFeedback,
  getCommunityActivationStats,
  getCommunityActivationMetrics,
  getWeekKey,
  type CommunityPostRow,
  type CommunityMemberRow,
  type CommunityActivationStats,
  type CommunityActivationMetrics,
} from './community-activation';
export {
  seedCommunityWorld,
  seedAllCommunities,
  ensureCommunitySeeded,
  isCommunitySeeded,
  listWeeklyChallenges,
  getCurrentWeeklyChallenge,
  type SeedWorldBundle,
  type SeedDiscussion,
  type SeedShowcase,
  type SeedWeeklyChallenge,
  type SeedMentor,
  type SeedMember,
  type WeeklyChallengeRow,
} from './community-seed';
export {
  getUserTierLevel,
  getSubscriptionStats,
  upsertSubscriptionFromCheckout,
  tierLevelForName,
  tierNameForLevel,
  type FoundryTier,
  type SubscriptionStats,
} from './subscriptions';
export {
  getRevenueValidationSnapshot,
  getBusinessDashboardSnapshot,
  type RevenueValidationSnapshot,
  type BusinessDashboardSnapshot,
  type RevenueFunnel,
  type WorldRevenueMetrics,
  type MissionRevenueMetrics,
  type CommunityUpgradeCorrelation,
  type PersonaPaymentRecord,
  type DashboardConsistencyCheck,
  getDashboardConsistencyCheck,
  fetchRevenueEvents,
  buildRevenueSnapshotFromEvents,
  normalizeTier,
  resolveWorldSlug,
} from './revenue-analytics';
export {
  REVENUE_TEST_PERSONAS,
  seedRevenueVerificationPersonas,
  runRevenueVerificationChecks,
  runFullRevenueVerification,
  type RevenuePersona,
  type VerificationCheck,
  type RevenueVerificationResult,
} from './revenue-verification';
export {
  upsertMissionCompletion,
  getMissionCompletionsForUser,
  getMissionCompletionStats,
  type MissionCompletionRow,
} from './mission-progress';
export {
  upsertUserArtifact,
  upsertUserArtifactsBulk,
  listUserArtifacts,
  upsertPortableMemoryState,
  upsertPortableCollectorState,
  insertGraphTraversal,
  listGraphHistory,
  hydratePortableIdentity,
  migrateLocalBundleToCloud,
  getPortableIdentityStats,
  type UserArtifactRow,
} from './portable-identity';
export {
  getGrowthFlywheelSnapshot,
  buildGrowthFlywheelFromEvents,
  FLYWHEEL_LOOP,
  type GrowthFlywheelSnapshot,
  type ConversionInsight,
  type MarketingAssetRecommendation,
  type SourceOutcomeAttribution,
  type RevenueEarner,
  type ProductBuildSignal,
  type DomainExpansionScore,
} from './growth-flywheel';
export { insertValidationEvent, categoryForEvent, getValidationDashboardMetrics } from './validation-events';
export type {
  ValidationEventType,
  ValidationCategory,
  ValidationEventInput,
  ValidationEventRow,
  ValidationDashboardMetrics,
} from './validation-events';
