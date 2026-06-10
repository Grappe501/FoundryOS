/**
 * @foundry/core — Platform Kernel
 *
 * Shared engine powering all 1000 FoundryOS apps.
 * Every module here must be replicable by @foundry/self-build.
 */

export type { Category, TierLevel, TierConfig, UserProfile } from './types';
export { TIER_PRICES, TIER_FEATURES } from './tiers/constants';
