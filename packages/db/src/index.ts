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
