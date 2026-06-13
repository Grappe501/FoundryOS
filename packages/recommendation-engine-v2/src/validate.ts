import type { CreateRecommendationInput } from './types';
import { contextsForWorld } from './contexts';

export type RecommendationValidationResult = { ok: true } | { ok: false; errors: string[] };

const REQUIRED: (keyof CreateRecommendationInput)[] = [
  'recommendation_reason',
  'who_this_is_for',
  'best_next_action',
  'title',
];

export function validateRecommendation(
  input: Partial<CreateRecommendationInput>,
): RecommendationValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED) {
    const val = input[field];
    if (typeof val !== 'string' || val.trim().length === 0) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (!input.user_id?.trim()) errors.push('Missing user_id');
  if (!input.world_slug?.trim()) errors.push('Missing world_slug');
  if (!input.entity_slug?.trim()) errors.push('Missing entity_slug');
  if (!input.entity_type?.trim()) errors.push('Missing entity_type');
  if (!input.recommendation_type?.trim()) errors.push('Missing recommendation_type');

  if (input.privacy && !['private', 'community', 'public'].includes(input.privacy)) {
    errors.push('Invalid privacy — use private, community, or public');
  }

  if (input.bourbon_context && input.world_slug === 'bourbon') {
    const allowed = contextsForWorld('bourbon');
    if (!allowed.includes(input.bourbon_context)) {
      errors.push(`Unknown bourbon recommendation context: ${input.bourbon_context}`);
    }
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}
