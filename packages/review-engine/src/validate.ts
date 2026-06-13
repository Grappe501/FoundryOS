import type { CreateReviewInput, FoundryReview } from './types';
import { dimensionsForWorld } from './dimensions';

export type ReviewValidationResult = { ok: true } | { ok: false; errors: string[] };

const REQUIRED_COPY: (keyof CreateReviewInput)[] = [
  'who_this_is_for',
  'what_surprised_me',
  'what_to_try_next',
  'title',
  'body',
];

export function validateReview(input: Partial<CreateReviewInput>): ReviewValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED_COPY) {
    const val = input[field];
    if (typeof val !== 'string' || val.trim().length === 0) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (!input.user_id?.trim()) errors.push('Missing user_id');
  if (!input.world_slug?.trim()) errors.push('Missing world_slug');
  if (!input.entity_slug?.trim()) errors.push('Missing entity_slug');
  if (!input.entity_type?.trim()) errors.push('Missing entity_type');
  if (!input.review_type?.trim()) errors.push('Missing review_type');

  if (input.privacy && !['private', 'community', 'public'].includes(input.privacy)) {
    errors.push('Invalid privacy — use private, community, or public');
  }

  const dims = input.review_dimensions ?? {};
  const allowed = dimensionsForWorld(input.world_slug ?? '');
  for (const key of Object.keys(dims)) {
    if (allowed.length > 0 && !allowed.includes(key)) {
      errors.push(`Unknown review dimension for ${input.world_slug}: ${key}`);
    }
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}
