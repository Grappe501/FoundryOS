import type { CreateRecommendationInput, FoundryRecommendation } from './types';
import { validateRecommendation } from './validate';

function newRecommendationId(): string {
  return `rec_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createRecommendation(
  input: CreateRecommendationInput,
): { ok: true; recommendation: FoundryRecommendation } | { ok: false; errors: string[] } {
  const validation = validateRecommendation(input);
  if (!validation.ok) return validation;

  const now = new Date().toISOString();
  const recommendation: FoundryRecommendation = {
    id: newRecommendationId(),
    user_id: input.user_id,
    world_slug: input.world_slug,
    entity_slug: input.entity_slug,
    entity_type: input.entity_type,
    recommendation_type: input.recommendation_type,
    title: input.title.trim(),
    recommendation_reason: input.recommendation_reason.trim(),
    who_this_is_for: input.who_this_is_for.trim(),
    best_next_action: input.best_next_action.trim(),
    what_to_watch_for: input.what_to_watch_for?.trim(),
    confidence_level: input.confidence_level ?? 'medium',
    based_on_artifacts: input.based_on_artifacts ?? [],
    based_on_reviews: input.based_on_reviews ?? [],
    based_on_collections: input.based_on_collections ?? [],
    related_graph_nodes: input.related_graph_nodes ?? [],
    privacy: input.privacy ?? 'private',
    comparison_note: input.comparison_note?.trim(),
    budget_note: input.budget_note?.trim(),
    beginner_note: input.beginner_note?.trim(),
    hosting_note: input.hosting_note?.trim(),
    collection_note: input.collection_note?.trim(),
    bourbon_context: input.bourbon_context?.trim(),
    created_at: now,
    updated_at: now,
  };

  return { ok: true, recommendation };
}
