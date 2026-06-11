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
