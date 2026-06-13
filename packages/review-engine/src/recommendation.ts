import type { FoundryReview, ReviewRecommendationSeed } from './types';

export function reviewToRecommendationSeed(review: FoundryReview): ReviewRecommendationSeed {
  return {
    world_slug: review.world_slug,
    source_entity_slug: review.entity_slug,
    source_entity_type: review.entity_type,
    review_id: review.id,
    best_for: review.who_this_is_for,
    avoid_if: review.who_should_skip,
    surprise: review.what_surprised_me,
    next_try: review.what_to_try_next,
    confidence: review.confidence_level,
  };
}
