export type {
  RecommendationType,
  RecommendationConfidence,
  FoundryRecommendation,
  CreateRecommendationInput,
  RecommendationListFilter,
  RecommendationSignalSummary,
  InfluenceSignalSummary,
  RecommendationGraphEdge,
  RecommendationIdentitySignal,
  RecommendationInfluenceSignal,
} from './types';

export { RECOMMENDATION_TYPES } from './types';
export {
  BOURBON_RECOMMENDATION_CONTEXTS,
  WORLD_RECOMMENDATION_CONTEXTS,
  DEFAULT_RECOMMENDATION_TYPE_BY_ENTITY,
  contextsForWorld,
  inferRecommendationType,
} from './contexts';

export { validateRecommendation, type RecommendationValidationResult } from './validate';
export { createRecommendation } from './create';

export {
  extractRecommendationFromArtifact,
  recommendationsFromArtifacts,
  listRecommendationsForEntity,
  listRecommendationsByUser,
  recommendationToArtifact,
  recommendationPayload,
  createRecommendationInputFromReview,
  recommendationFromReview,
} from './artifact';

export { recommendationToGraphEdges, recommendationGraphSignalChain } from './graph';
export { recommendationToIdentitySignals } from './identity';
export { recommendationToInfluenceSignal, buildInfluenceSummary, summarizeRecommendationSignals } from './summarize';
export { validateRecommendationEngine, getRecommendationEngineStats } from './validate-engine';
