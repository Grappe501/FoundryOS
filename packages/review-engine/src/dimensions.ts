import type { ReviewType } from './types';

/** World-configured review dimensions — qualitative notes, not scores */
export const WORLD_REVIEW_DIMENSIONS: Record<string, string[]> = {
  bourbon: [
    'taste',
    'value',
    'beginner_friendliness',
    'availability',
    'story',
    'collector_interest',
    'cocktail_use',
    'giftability',
  ],
  'ai-builder': [
    'usefulness',
    'learning_curve',
    'time_saved',
    'reliability',
    'repeatability',
    'business_value',
  ],
  'financial-independence': [
    'clarity',
    'practicality',
    'risk_awareness',
    'beginner_friendliness',
    'long_term_value',
  ],
  'public-speaking': [
    'clarity',
    'confidence_growth',
    'audience_response',
    'story_strength',
    'delivery_improvement',
  ],
  bbq: ['flavor', 'difficulty', 'repeatability', 'crowd_reaction', 'equipment_fit'],
  poker: ['decision_quality', 'risk_control', 'lesson_value', 'repeatability', 'bankroll_impact'],
  'civic-engagement': [
    'clarity',
    'public_value',
    'actionability',
    'trustworthiness',
    'local_relevance',
  ],
};

export const DEFAULT_REVIEW_TYPE_BY_ENTITY: Record<string, ReviewType> = {
  bottle: 'bottle_review',
  tool: 'tool_review',
  lesson: 'lesson_review',
  mission: 'mission_review',
  producer: 'producer_review',
  organization: 'producer_review',
  experience: 'experience_review',
  event: 'event_review',
  book: 'book_review',
  recipe: 'recipe_review',
  project: 'project_review',
  place: 'place_review',
};

export function dimensionsForWorld(worldSlug: string): string[] {
  return WORLD_REVIEW_DIMENSIONS[worldSlug] ?? [];
}

export function inferReviewType(worldSlug: string, entityType: string): ReviewType {
  if (worldSlug === 'bourbon' && entityType === 'bottle') return 'bottle_review';
  return DEFAULT_REVIEW_TYPE_BY_ENTITY[entityType] ?? 'experience_review';
}
