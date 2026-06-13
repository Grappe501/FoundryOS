import type { FoundryReview, ReviewGraphEdge } from './types';

export function reviewToGraphEdges(review: FoundryReview, entityTitle?: string): ReviewGraphEdge[] {
  return [
    {
      from: { kind: 'user_review', review_id: review.id, user_id: review.user_id },
      to: {
        world_slug: review.world_slug,
        entity_type: review.entity_type,
        slug: review.entity_slug,
        title: entityTitle,
      },
      relation: 'reviewed',
      label: review.title,
    },
  ];
}

/** Chain signal for atlas: review → entity → producer → region → collection */
export function reviewGraphSignalChain(review: FoundryReview): string[] {
  const chain = [review.entity_slug];
  if (review.world_slug === 'bourbon') {
    if (review.entity_slug.includes('wild-turkey')) chain.push('wild-turkey', 'kentucky');
    if (review.review_dimensions.value || review.who_this_is_for.toLowerCase().includes('value')) {
      chain.push('value-bourbon-collection');
    }
  }
  return chain;
}
