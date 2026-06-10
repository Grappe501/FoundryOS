/**
 * @foundry/core — Platform Kernel
 *
 * Shared engine powering all 1000 FoundryOS apps.
 * Every module here must be replicable by @foundry/self-build.
 */

export type { Category, TierLevel, TierConfig, UserProfile } from './types';
export type {
  Entity,
  EntityType,
  EntityAttribute,
  EntityRelationship,
  Collection,
  UserReputation,
  UserExpertise,
  RelationshipType,
} from './entities/types';
export type { Vertical, AppSite, SiteContext, DeployStatus } from './sites/types';
export { TIER_PRICES, TIER_FEATURES } from './tiers/constants';
export { resolveSlugFromHost, buildSiteUrl, createPlaceholderSiteContext } from './sites/resolve';
