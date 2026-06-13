import type { RecommendationType } from './types';

/** Bourbon recommendation contexts — qualitative, not scores */
export const BOURBON_RECOMMENDATION_CONTEXTS = [
  'beginner shelf',
  'value hunt',
  'gift bottle',
  'cocktail bottle',
  'neat pour',
  'comparison bottle',
  'collector curiosity',
  'store-pick candidate',
  'blind tasting candidate',
] as const;

export type BourbonRecommendationContext = (typeof BOURBON_RECOMMENDATION_CONTEXTS)[number];

export const WORLD_RECOMMENDATION_CONTEXTS: Record<string, string[]> = {
  bourbon: [...BOURBON_RECOMMENDATION_CONTEXTS],
  'ai-builder': [
    'Recommended tool',
    'Recommended workflow',
    'Recommended project',
    'Recommended next mission',
  ],
  'financial-independence': [
    'Recommended habit',
    'Recommended worksheet',
    'Recommended learning path',
    'Recommended comparison',
  ],
  'public-speaking': [
    'Recommended drill',
    'Recommended speech exercise',
    'Recommended recording practice',
    'Recommended audience challenge',
  ],
  bbq: ['Recommended recipe', 'Recommended cook method', 'Recommended equipment', 'Recommended next cook'],
  poker: [
    'Recommended hand review',
    'Recommended drill',
    'Recommended bankroll habit',
    'Recommended strategy topic',
  ],
  'civic-engagement': [
    'Recommended meeting',
    'Recommended public record search',
    'Recommended office to learn',
    'Recommended civic action',
  ],
};

export const DEFAULT_RECOMMENDATION_TYPE_BY_ENTITY: Record<string, RecommendationType> = {
  bottle: 'bottle_recommendation',
  tool: 'tool_recommendation',
  mission: 'mission_recommendation',
  collection: 'collection_recommendation',
  event: 'event_recommendation',
  group: 'group_recommendation',
  experience: 'experience_recommendation',
  atlas_term: 'atlas_path_recommendation',
  producer: 'entity_recommendation',
  organization: 'entity_recommendation',
};

export function contextsForWorld(worldSlug: string): string[] {
  return WORLD_RECOMMENDATION_CONTEXTS[worldSlug] ?? [];
}

export function inferRecommendationType(worldSlug: string, entityType: string): RecommendationType {
  if (worldSlug === 'bourbon' && entityType === 'bottle') return 'bottle_recommendation';
  return DEFAULT_RECOMMENDATION_TYPE_BY_ENTITY[entityType] ?? 'entity_recommendation';
}
