import { REVIEW_TYPES } from './types';
import { WORLD_REVIEW_DIMENSIONS } from './dimensions';
import { createReview } from './create';
import { validateReview } from './validate';
import { reviewToArtifact } from './artifact';

export function validateReviewEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  if (REVIEW_TYPES.length < 11) errors.push('REVIEW_TYPES incomplete');
  if (!WORLD_REVIEW_DIMENSIONS.bourbon?.includes('taste')) {
    errors.push('Missing bourbon review dimensions');
  }

  const sample = createReview({
    user_id: 'audit-user',
    world_slug: 'bourbon',
    entity_slug: 'wild-turkey-101',
    entity_type: 'bottle',
    review_type: 'bottle_review',
    title: 'Audit sample review',
    body: 'Structured review body for audit.',
    who_this_is_for: 'Value seekers who want proof without hype.',
    what_surprised_me: 'Balance of proof and everyday price.',
    what_to_try_next: 'Old Forester 100 or Rare Breed',
  });

  if (!sample.ok) errors.push('createReview failed audit sample');
  else {
    const artifact = reviewToArtifact(sample.review);
    if (artifact.type !== 'review') errors.push('reviewToArtifact must produce type review');
    if (!artifact.metadata.payload?.what_surprised_me) {
      errors.push('Review payload missing structured fields');
    }
  }

  const bad = validateReview({ user_id: 'x', world_slug: 'bourbon' });
  if (bad.ok) errors.push('validateReview should reject incomplete input');

  return { ok: errors.length === 0, errors };
}

export function getReviewEngineStats() {
  return {
    review_types: REVIEW_TYPES.length,
    worlds_with_dimensions: Object.keys(WORLD_REVIEW_DIMENSIONS).length,
    engine_ready: validateReviewEngine().ok,
  };
}
