import { AI_BUILDER_SEED, FI_SEED, PS_SEED } from './worlds-life-leverage';
import { BOURBON_SEED, BBQ_SEED, POKER_SEED, CIVIC_SEED } from './worlds-trinity';
import type { SeedWorldBundle } from './types';
import { COMMUNITY_WORLDS } from '../community-worlds';

export const ALL_COMMUNITY_SEEDS: SeedWorldBundle[] = [
  AI_BUILDER_SEED,
  FI_SEED,
  PS_SEED,
  BOURBON_SEED,
  BBQ_SEED,
  POKER_SEED,
  CIVIC_SEED,
];

export function getSeedBundleForWorld(slug: string): SeedWorldBundle | undefined {
  return ALL_COMMUNITY_SEEDS.find((s) => s.world_slug === slug);
}

export function getCommunitySeedMeta() {
  return {
    worlds: ALL_COMMUNITY_SEEDS.length,
    discussions_per_world: 25,
    showcases_per_world: 10,
    weeks: 12,
    configs: COMMUNITY_WORLDS,
  };
}
