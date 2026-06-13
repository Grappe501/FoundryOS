import type { CreateArtifactInput, FoundryArtifact } from '@foundry/artifact-engine';
import type { FoundryReview, ReviewListFilter } from './types';

const REVIEW_PAYLOAD_KEYS = [
  'id',
  'user_id',
  'world_slug',
  'entity_slug',
  'entity_type',
  'review_type',
  'title',
  'body',
  'who_this_is_for',
  'who_should_skip',
  'what_surprised_me',
  'what_to_try_next',
  'confidence_level',
  'experience_context',
  'review_dimensions',
  'privacy',
  'value_note',
  'beginner_note',
  'comparison_note',
  'serving_note',
  'created_at',
  'updated_at',
] as const;

export function reviewPayload(review: FoundryReview): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const key of REVIEW_PAYLOAD_KEYS) {
    payload[key] = review[key];
  }
  return payload;
}

export function extractReviewFromArtifact(artifact: FoundryArtifact): FoundryReview | null {
  if (artifact.type !== 'review') return null;
  const p = artifact.metadata.payload ?? {};
  if (typeof p.entity_slug !== 'string' || typeof p.who_this_is_for !== 'string') return null;

  return {
    id: (p.id as string) ?? artifact.id,
    user_id: artifact.user_id,
    world_slug: artifact.metadata.world_slug,
    entity_slug: p.entity_slug as string,
    entity_type: (p.entity_type as string) ?? 'entity',
    review_type: (p.review_type as FoundryReview['review_type']) ?? 'experience_review',
    title: artifact.metadata.title,
    body: (p.body as string) ?? artifact.metadata.summary ?? '',
    who_this_is_for: p.who_this_is_for as string,
    who_should_skip: p.who_should_skip as string | undefined,
    what_surprised_me: (p.what_surprised_me as string) ?? '',
    what_to_try_next: (p.what_to_try_next as string) ?? '',
    confidence_level: (p.confidence_level as FoundryReview['confidence_level']) ?? 'medium',
    experience_context: p.experience_context as string | undefined,
    review_dimensions: (p.review_dimensions as FoundryReview['review_dimensions']) ?? {},
    privacy: artifact.metadata.privacy,
    value_note: p.value_note as string | undefined,
    beginner_note: p.beginner_note as string | undefined,
    comparison_note: p.comparison_note as string | undefined,
    serving_note: p.serving_note as string | undefined,
    created_at: artifact.created_at,
    updated_at: artifact.updated_at,
  };
}

export function reviewsFromArtifacts(artifacts: FoundryArtifact[]): FoundryReview[] {
  return artifacts
    .filter((a) => a.type === 'review')
    .map(extractReviewFromArtifact)
    .filter((r): r is FoundryReview => r !== null);
}

export function listReviewsForEntity(
  artifacts: FoundryArtifact[],
  filter: ReviewListFilter,
): FoundryReview[] {
  let list = reviewsFromArtifacts(artifacts);

  list = list.filter(
    (r) =>
      r.world_slug === filter.world_slug &&
      r.entity_slug === filter.entity_slug &&
      r.entity_type === filter.entity_type,
  );

  if (filter.user_id) list = list.filter((r) => r.user_id === filter.user_id);
  if (filter.privacy) list = list.filter((r) => r.privacy === filter.privacy);
  if (filter.review_type) list = list.filter((r) => r.review_type === filter.review_type);

  return list.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function reviewToArtifact(
  review: FoundryReview,
  entityTitle?: string,
): CreateArtifactInput {
  const entityRef = {
    world_slug: review.world_slug,
    entity_type: review.entity_type,
    slug: review.entity_slug,
    title: entityTitle,
  };

  return {
    type: 'review',
    user_id: review.user_id,
    metadata: {
      world_slug: review.world_slug,
      title: review.title,
      summary: review.who_this_is_for.slice(0, 160),
      occurred_at: review.created_at,
      entities: [entityRef],
      topics: [review.review_type.replace('_review', '')],
      privacy: review.privacy,
      payload: reviewPayload(review),
    },
    relations: [
      { type: 'created_by', target: { artifact_id: review.user_id }, label: 'author' },
      { type: 'references', target: entityRef, label: 'reviewed' },
    ],
  };
}
