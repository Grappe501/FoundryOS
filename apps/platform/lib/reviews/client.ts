'use client';

import type { CreateReviewInput, FoundryReview } from '@foundry/review-engine';
import {
  createReview,
  inferReviewType,
  listReviewsForEntity,
  reviewToArtifact,
  reviewsFromArtifacts,
  summarizeReviewSignals,
} from '@foundry/review-engine';
import { createClientArtifact, getLocalUserId, listClientArtifacts } from '../artifacts/client-store';

export type ReviewFormInput = Omit<CreateReviewInput, 'user_id' | 'review_type'> & {
  review_type?: CreateReviewInput['review_type'];
};

export function submitReview(input: ReviewFormInput): { ok: true; review: FoundryReview } | { ok: false; errors: string[] } {
  const user_id = getLocalUserId();
  const review_type = input.review_type ?? inferReviewType(input.world_slug, input.entity_type);

  const created = createReview({ ...input, user_id, review_type });
  if (!created.ok) return created;

  const artifactInput = reviewToArtifact(created.review, input.entity_title);
  createClientArtifact(artifactInput);

  return created;
}

export function getMyReviews(worldSlug?: string): FoundryReview[] {
  const userId = getLocalUserId();
  let artifacts = listClientArtifacts({ user_id: userId });
  if (worldSlug) artifacts = artifacts.filter((a) => a.metadata.world_slug === worldSlug);
  return reviewsFromArtifacts(artifacts);
}

export function getEntityReviews(
  worldSlug: string,
  entityType: string,
  entitySlug: string,
  opts?: { mineOnly?: boolean; publicOnly?: boolean },
): FoundryReview[] {
  const artifacts = listClientArtifacts();
  const filter: Parameters<typeof listReviewsForEntity>[1] = {
    world_slug: worldSlug,
    entity_type: entityType,
    entity_slug: entitySlug,
  };
  if (opts?.mineOnly) filter.user_id = getLocalUserId();
  if (opts?.publicOnly) filter.privacy = 'public';

  return listReviewsForEntity(artifacts, filter);
}

export function getReviewSummary(userId?: string) {
  return summarizeReviewSignals(listClientArtifacts(), userId ?? getLocalUserId());
}
