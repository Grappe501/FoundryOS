'use client';

import type { CreateRecommendationInput, FoundryRecommendation } from '@foundry/recommendation-engine-v2';
import type { FoundryReview } from '@foundry/review-engine';
import {
  createRecommendation,
  inferRecommendationType,
  listRecommendationsByUser,
  listRecommendationsForEntity,
  recommendationFromReview,
  recommendationToArtifact,
  summarizeRecommendationSignals,
} from '@foundry/recommendation-engine-v2';
import { createClientArtifact, getLocalUserId, listClientArtifacts } from '../artifacts/client-store';

export type RecommendationFormInput = Omit<CreateRecommendationInput, 'user_id' | 'recommendation_type'> & {
  recommendation_type?: CreateRecommendationInput['recommendation_type'];
};

export function submitRecommendation(
  input: RecommendationFormInput,
): { ok: true; recommendation: FoundryRecommendation } | { ok: false; errors: string[] } {
  const user_id = getLocalUserId();
  const recommendation_type =
    input.recommendation_type ?? inferRecommendationType(input.world_slug, input.entity_type);

  const created = createRecommendation({ ...input, user_id, recommendation_type });
  if (!created.ok) return created;

  const artifactInput = recommendationToArtifact(created.recommendation, input.entity_title);
  createClientArtifact(artifactInput);

  return created;
}

export function submitRecommendationFromReview(
  review: FoundryReview,
  overrides?: Partial<CreateRecommendationInput>,
) {
  const user_id = getLocalUserId();
  const created = recommendationFromReview(review, user_id, overrides);
  if (!created.ok) return created;

  const artifactInput = recommendationToArtifact(created.recommendation);
  createClientArtifact(artifactInput);
  return created;
}

export function getMyRecommendations(worldSlug?: string): FoundryRecommendation[] {
  return listRecommendationsByUser(listClientArtifacts({ user_id: getLocalUserId() }), getLocalUserId(), worldSlug);
}

export function getEntityRecommendations(
  worldSlug: string,
  entityType: string,
  entitySlug: string,
  opts?: { mineOnly?: boolean; publicOnly?: boolean },
): FoundryRecommendation[] {
  const artifacts = listClientArtifacts();
  const filter: Parameters<typeof listRecommendationsForEntity>[1] = {
    world_slug: worldSlug,
    entity_type: entityType,
    entity_slug: entitySlug,
  };
  if (opts?.mineOnly) filter.user_id = getLocalUserId();
  if (opts?.publicOnly) filter.privacy = 'public';
  return listRecommendationsForEntity(artifacts, filter);
}

export function getRecommendationSummary(userId?: string) {
  return summarizeRecommendationSignals(listClientArtifacts(), userId ?? getLocalUserId());
}
