import type { FoundryReview, ReviewIdentitySignal } from './types';

export function reviewToIdentitySignals(review: FoundryReview): ReviewIdentitySignal[] {
  const signals: ReviewIdentitySignal[] = [
    {
      world_slug: review.world_slug,
      signal: `Reviewed ${review.entity_slug}: ${review.what_surprised_me.slice(0, 80)}`,
      topic: review.review_type.replace('_review', ''),
      evidence_type: 'review',
      entity_slug: review.entity_slug,
    },
  ];

  if (review.what_to_try_next.trim()) {
    signals.push({
      world_slug: review.world_slug,
      signal: `Next recommendation from review: ${review.what_to_try_next.slice(0, 80)}`,
      topic: 'recommendation',
      evidence_type: 'review',
      entity_slug: review.entity_slug,
    });
  }

  return signals;
}
