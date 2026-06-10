import type { TierLevel } from '../types';

export const TIER_PRICES: Record<TierLevel, number> = {
  1: 0,
  2: 4,
  3: 18,
};

export const TIER_FEATURES: Record<TierLevel, string[]> = {
  1: ['catalog', 'search', 'browse'],
  2: ['collections', 'rankings', 'notes', 'wishlist', 'export'],
  3: ['clubs', 'sharing', 'ai-pairing', 'cross-app', 'expert-badges'],
};

export const TIER_LABELS: Record<TierLevel, string> = {
  1: 'Free',
  2: 'Personal',
  3: 'Expert',
};
