import type { CreateReviewInput, FoundryReview } from './types';
import { validateReview } from './validate';

function newReviewId(): string {
  return `rev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createReview(input: CreateReviewInput): { ok: true; review: FoundryReview } | { ok: false; errors: string[] } {
  const validation = validateReview(input);
  if (!validation.ok) return validation;

  const now = new Date().toISOString();
  const review: FoundryReview = {
    id: newReviewId(),
    user_id: input.user_id,
    world_slug: input.world_slug,
    entity_slug: input.entity_slug,
    entity_type: input.entity_type,
    review_type: input.review_type,
    title: input.title.trim(),
    body: input.body.trim(),
    who_this_is_for: input.who_this_is_for.trim(),
    who_should_skip: input.who_should_skip?.trim(),
    what_surprised_me: input.what_surprised_me.trim(),
    what_to_try_next: input.what_to_try_next.trim(),
    confidence_level: input.confidence_level ?? 'medium',
    experience_context: input.experience_context?.trim(),
    review_dimensions: input.review_dimensions ?? {},
    privacy: input.privacy ?? 'private',
    value_note: input.value_note?.trim(),
    beginner_note: input.beginner_note?.trim(),
    comparison_note: input.comparison_note?.trim(),
    serving_note: input.serving_note?.trim(),
    created_at: now,
    updated_at: now,
  };

  return { ok: true, review };
}
