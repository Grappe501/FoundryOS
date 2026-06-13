import type { FoundryArtifact } from '@foundry/artifact-engine';
import type { FoundryReview, ReviewSignalSummary } from './types';
import { reviewsFromArtifacts } from './artifact';

export function summarizeReviewSignals(
  artifacts: FoundryArtifact[],
  userId?: string,
): ReviewSignalSummary {
  let reviews = reviewsFromArtifacts(artifacts);
  if (userId) reviews = reviews.filter((r) => r.user_id === userId);

  reviews = [...reviews].sort((a, b) => b.created_at.localeCompare(a.created_at));

  const by_world: Record<string, number> = {};
  const by_entity: Record<string, number> = {};
  const by_type: ReviewSignalSummary['by_type'] = {};
  let public_count = 0;
  let private_count = 0;

  for (const r of reviews) {
    by_world[r.world_slug] = (by_world[r.world_slug] ?? 0) + 1;
    const entityKey = `${r.world_slug}:${r.entity_type}:${r.entity_slug}`;
    by_entity[entityKey] = (by_entity[entityKey] ?? 0) + 1;
    by_type[r.review_type] = (by_type[r.review_type] ?? 0) + 1;
    if (r.privacy === 'public' || r.privacy === 'community') public_count += 1;
    else private_count += 1;
  }

  const latest = reviews[0] ?? null;
  const narrative = latest ? bourbonNarrativeFromReview(latest) : undefined;

  return {
    total: reviews.length,
    public_count,
    private_count,
    by_world,
    by_entity,
    by_type,
    latest,
    narrative,
  };
}

function bourbonNarrativeFromReview(review: FoundryReview): ReviewSignalSummary['narrative'] {
  if (review.world_slug !== 'bourbon') return undefined;
  return {
    best_for: review.who_this_is_for,
    avoid_if: review.who_should_skip ?? 'No specific avoid note',
    teaches: review.what_surprised_me,
    next_bottle: review.what_to_try_next,
  };
}

export function countReviewsByWorld(reviews: FoundryReview[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of reviews) {
    counts[r.world_slug] = (counts[r.world_slug] ?? 0) + 1;
  }
  return counts;
}
